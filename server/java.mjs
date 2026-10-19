import fs from 'node:fs/promises';
import { Parser, Language } from 'web-tree-sitter';

const SPRING = 'org.springframework.web.bind.annotation.';
const VERBS = { GetMapping: 'GET', PostMapping: 'POST', PutMapping: 'PUT', DeleteMapping: 'DELETE', PatchMapping: 'PATCH' };
const HTTP = new Set(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE']);
const TYPES = new Set(['class_declaration', 'interface_declaration', 'enum_declaration', 'record_declaration']);
let initialized;

export async function createJavaParser(options = {}) {
  initialized ??= fs.readFile(options.runtimeWasm ?? 'node_modules/web-tree-sitter/tree-sitter.wasm')
    .then(wasmBinary => Parser.init({ wasmBinary }));
  await initialized;
  const grammar = await Language.load(await fs.readFile(options.grammarWasm ?? 'node_modules/tree-sitter-java/tree-sitter-java.wasm'));
  const parser = new Parser();
  parser.setLanguage(grammar);
  return {
    parse(source) {
      if (!/\b(?:Request|Get|Post|Put|Delete|Patch)Mapping\b/.test(source)) return [];
      const tree = parser.parse(source);
      try { return extract(tree.rootNode); } finally { tree.delete(); }
    },
    close() { parser.delete(); },
  };
}

function extract(root) {
  const imports = new Map();
  let wildcard = false;
  for (const child of root.namedChildren) {
    if (child.type !== 'import_declaration') continue;
    const name = child.text.replace(/^import\s+(?:static\s+)?/, '').replace(/;\s*$/, '').trim();
    if (name === `${SPRING}*`) wildcard = true;
    else imports.set(name.split('.').at(-1), name);
  }
  const entries = [];
  function visit(node) {
    if (TYPES.has(node.type)) {
      const className = node.childForFieldName('name')?.text ?? '?';
      const body = node.childForFieldName('body');
      const constants = new Map();
      for (const member of body?.namedChildren ?? []) {
        if (member.type !== 'field_declaration') continue;
        const modifiers = member.namedChildren.find(n => n.type === 'modifiers')?.text ?? '';
        // Interface fields are implicitly static final.
        if (node.type !== 'interface_declaration' && (!/\bstatic\b/.test(modifiers) || !/\bfinal\b/.test(modifiers))) continue;
        for (const declaration of member.namedChildren.filter(n => n.type === 'variable_declarator')) {
          constants.set(declaration.childForFieldName('name')?.text, declaration.childForFieldName('value'));
        }
      }
      const context = { imports, wildcard, className, constants };
      const parents = mappings(node, context);
      for (const member of body?.namedChildren ?? []) {
        if (member.type === 'method_declaration') {
          for (const mapping of mappings(member, context)) {
            for (const parent of parents.length ? parents : [{ paths: [{ value: '' }], verbs: [] }]) {
              for (const base of parent.paths) for (const leaf of mapping.paths) {
                const unresolved = base.value == null || leaf.value == null || /\$\{|#\{/.test(base.value + leaf.value);
                const combinedVerbs = [...new Set([...parent.verbs, ...mapping.verbs])];
                for (const httpMethod of combinedVerbs.length ? combinedVerbs : ['ANY']) {
                  entries.push({
                    path: unresolved ? null : joinPath(base.value, leaf.value), httpMethod,
                    unresolved, expression: unresolved ? [base.expression ?? base.value, leaf.expression ?? leaf.value].filter(Boolean).join(' + ') : null,
                    className, methodName: member.childForFieldName('name')?.text ?? '?',
                    line: mapping.node.startPosition.row, character: mapping.node.startPosition.column,
                  });
                }
              }
            }
          }
        } else if (TYPES.has(member.type)) visit(member);
      }
      return;
    }
    for (const child of node.namedChildren) visit(child);
  }
  visit(root);
  return [...new Map(entries.map(e => [JSON.stringify(e), e])).values()];
}

function mappings(declaration, context) {
  const annotations = declaration.namedChildren.find(n => n.type === 'modifiers')?.namedChildren ?? [];
  const results = [];
  for (const annotation of annotations) {
    if (annotation.type !== 'annotation' && annotation.type !== 'marker_annotation') continue;
    const full = annotation.childForFieldName('name')?.text ?? '';
    const name = full.split('.').at(-1);
    if (!(name in VERBS) && name !== 'RequestMapping') continue;
    const resolved = full.includes('.') ? full : context.imports.get(name) ?? (context.wildcard ? SPRING + name : null);
    if (resolved !== SPRING + name) continue;
    const args = annotation.childForFieldName('arguments')?.namedChildren ?? [];
    let paths = [{ value: '' }];
    let verbs = VERBS[name] ? [VERBS[name]] : [];
    for (const arg of args) {
      const key = arg.type === 'element_value_pair' ? arg.childForFieldName('key')?.text : 'value';
      const value = arg.type === 'element_value_pair' ? arg.childForFieldName('value') : arg;
      const values = value?.type === 'element_value_array_initializer' ? value.namedChildren : [value];
      if (key === 'value' || key === 'path') {
        paths = values.length ? values.map(n => ({ value: stringValue(n, context), expression: n?.text ?? '?' })) : [{ value: '' }];
      } else if (key === 'method' && name === 'RequestMapping') {
        verbs = values.map(n => n?.text.split('.').at(-1)).filter(v => HTTP.has(v));
        if (!verbs.length && values.length) verbs = ['UNKNOWN'];
      }
    }
    results.push({ paths, verbs, node: annotation });
  }
  return results;
}

function stringValue(node, context, seen = new Set()) {
  if (!node || node.hasError) return null;
  if (node.type === 'string_literal') {
    if (node.text.startsWith('"""')) return null;
    return node.text.slice(1, -1).replace(/\\(u+[0-9a-fA-F]{4}|[0-7]{1,3}|.)/gs, (_, code) => {
      if (code.startsWith('u')) return String.fromCharCode(parseInt(code.replace(/^u+/, ''), 16));
      if (/^[0-7]/.test(code)) return String.fromCharCode(parseInt(code, 8));
      return ({ b: '\b', t: '\t', n: '\n', f: '\f', r: '\r', s: ' ', '"': '"', "'": "'", '\\': '\\' })[code] ?? `\\${code}`;
    });
  }
  if (node.type === 'parenthesized_expression') return stringValue(node.namedChildren[0], context, seen);
  if (node.type === 'binary_expression' && node.childForFieldName('operator')?.text === '+') {
    const left = stringValue(node.childForFieldName('left'), context, seen);
    const right = stringValue(node.childForFieldName('right'), context, seen);
    return left == null || right == null ? null : left + right;
  }
  let key = node.type === 'identifier' ? node.text : null;
  if (node.type === 'field_access' && node.childForFieldName('object')?.text === context.className) key = node.childForFieldName('field')?.text;
  if (key && context.constants.has(key) && !seen.has(key)) return stringValue(context.constants.get(key), context, new Set([...seen, key]));
  return null;
}

function joinPath(base, leaf) {
  if (!leaf) return base ? (base.startsWith('/') ? base : `/${base}`) : '/';
  const normalized = base.replace(/^\//, '').replace(/\/$/, '');
  const prefix = normalized ? `/${normalized}` : '';
  return `${prefix}/${leaf.replace(/^\//, '')}`;
}
