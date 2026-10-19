import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createJavaParser } from './java.mjs';
import { EndpointIndex } from './index.mjs';
import { encode, Decoder, applyChanges } from './protocol.mjs';

const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  if (!['--worktree', '--cache-dir'].includes(process.argv[i]) || !process.argv[i + 1]) throw Error('Usage: endpoint-server [--worktree DIRECTORY] [--cache-dir DIRECTORY]');
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const cacheDir = path.resolve(options['cache-dir'] ?? path.join(process.env.LOCALAPPDATA ?? process.env.XDG_CACHE_HOME ?? path.join(os.homedir(), '.cache'), 'zed-endpoint-search'));
const assets = path.dirname(path.resolve(process.argv[1]));
const bundled = fs.existsSync(path.join(assets, 'tree-sitter-java.wasm'));
const started = performance.now();
const projects = new Map(), documents = new Map();
let parser, initialized = false, shuttingDown = false, disposal;
const send = message => process.stdout.write(encode({ jsonrpc: '2.0', ...message }));
const log = message => process.stderr.write(`[endpoint-search] ${message}\n`);
const toPath = uri => typeof uri === 'string' && uri.startsWith('file:') ? fileURLToPath(uri) : null;

async function addProject(root) {
  root = path.resolve(root);
  if (projects.has(root)) return;
  const index = new EndpointIndex({ root, cacheDir, parser, log });
  await index.start();
  projects.set(root, index);
  log(`Search available: ${root}; ${index.stats.restored} cached files; ${Math.round(performance.now() - started)} ms since launch`);
}
function indexFor(file) {
  return [...projects.values()].sort((a, b) => b.root.length - a.root.length).find(index => index.accepts(file));
}
async function dispose() {
  disposal ??= (async () => {
    await Promise.all([...projects.values()].map(index => index.close()));
    parser?.close();
  })();
  return disposal;
}
function finish(code) {
  process.exitCode = code;
  process.stdin.destroy();
  process.stdout.end();
}

async function handle(message) {
  const { method, params = {} } = message;
  if (method === 'exit') { await dispose(); finish(shuttingDown ? 0 : 1); return; }
  if (method === 'initialize') {
    if (initialized) throw Object.assign(Error('Already initialized'), { code: -32600 });
    parser = await createJavaParser(bundled ? {
      runtimeWasm: path.join(assets, 'tree-sitter.wasm'), grammarWasm: path.join(assets, 'tree-sitter-java.wasm'),
    } : {});
    const roots = options.worktree ? [options.worktree] : params.workspaceFolders?.map(folder => toPath(folder.uri)).filter(Boolean);
    for (const root of roots?.length ? roots : [toPath(params.rootUri) ?? process.cwd()]) await addProject(root);
    initialized = true;
    return { capabilities: {
      positionEncoding: 'utf-16', workspaceSymbolProvider: true,
      textDocumentSync: { openClose: true, change: 2, save: { includeText: false } },
      workspace: { workspaceFolders: { supported: true, changeNotifications: true } },
      executeCommandProvider: { commands: ['endpointSearch.reindex'] },
    }, serverInfo: { name: 'Endpoint Search', version: '0.1.0' } };
  }
  if (!initialized) throw Object.assign(Error('Server not initialized'), { code: -32002 });
  if (method === 'shutdown') { shuttingDown = true; await dispose(); return null; }
  if (shuttingDown) throw Object.assign(Error('Server is shutting down'), { code: -32600 });
  if (method === 'workspace/symbol') {
    const all = [...projects.values()].flatMap(index => index.search(params.query ?? ''));
    return [...new Map(all.map(item => [`${item.location.uri}:${item.location.range.start.line}:${item.name}`, item])).values()].slice(0, 500);
  }
  if (method === 'endpointSearch/status') return { projects: [...projects.values()].map(index => ({ root: index.root, ...index.stats })) };
  if (method === 'workspace/executeCommand' && params.command === 'endpointSearch.reindex') {
    await Promise.all([...projects.values()].map(index => index.reconcile())); return null;
  }
  if (method === 'workspace/didChangeWorkspaceFolders') {
    for (const folder of params.event?.removed ?? []) {
      const root = toPath(folder.uri); const index = root && projects.get(path.resolve(root));
      if (index) { await index.close(); projects.delete(index.root); }
    }
    for (const folder of params.event?.added ?? []) { const root = toPath(folder.uri); if (root) await addProject(root); }
    return;
  }
  if (method === 'workspace/didChangeWatchedFiles') {
    for (const change of params.changes ?? []) { const file = toPath(change.uri); if (file) for (const index of projects.values()) if (!index.isIgnored(file)) index.schedule(file); }
    return;
  }
  const file = toPath(params?.textDocument?.uri);
  const index = file && indexFor(file);
  if (method === 'textDocument/didOpen' && index) {
    documents.set(file, { text: params.textDocument.text, version: params.textDocument.version });
    index.setDocument(file, params.textDocument.text); return;
  }
  if (method === 'textDocument/didChange' && index) {
    const document = documents.get(file);
    if (document && params.textDocument.version > document.version) {
      document.text = applyChanges(document.text, params.contentChanges);
      document.version = params.textDocument.version;
      index.setDocument(file, document.text);
    }
    return;
  }
  if (method === 'textDocument/didClose') {
    documents.delete(file); await index?.closeDocument(file); return;
  }
  if (method === 'textDocument/didSave' && index) { index.schedule(file); return; }
  if (message.id !== undefined) throw Object.assign(Error(`Method not found: ${method}`), { code: -32601 });
}

let queue = Promise.resolve();
const decoder = new Decoder();
process.stdin.on('data', chunk => {
  try {
    for (const message of decoder.push(chunk)) {
      if (!message.method) continue;
      queue = queue.then(async () => {
        try {
          const result = await handle(message);
          if (message.id !== undefined) send({ id: message.id, result: result ?? null });
        } catch (error) {
          if (message.id !== undefined) send({ id: message.id, error: { code: error.code ?? -32603, message: error.message } });
          else log(`${message.method}: ${error.message}`);
        }
      });
    }
  } catch (error) { log(`Protocol error: ${error.message}`); void dispose().then(() => finish(1)); }
});
process.stdin.on('end', () => { void queue.then(dispose).then(() => finish(0)); });
process.stdout.on('error', () => { void dispose().then(() => finish(1)); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { void dispose().then(() => finish(0)); });
