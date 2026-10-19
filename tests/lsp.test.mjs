import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { encode, Decoder, applyChanges } from '../server/protocol.mjs';

test('LSP framing supports split UTF-8 messages and multiple frames', () => {
  const message = { jsonrpc: '2.0', method: 'hello', params: { text: '中文😀' } };
  const bytes = Buffer.concat([encode(message), encode({ id: 2, result: [] })]);
  const decoder = new Decoder();
  const decoded = [];
  for (const byte of bytes) decoded.push(...decoder.push(Buffer.from([byte])));
  assert.deepEqual(decoded, [message, { id: 2, result: [] }]);
});

test('incremental edits use UTF-16 positions and CRLF lines', () => {
  assert.equal(applyChanges('中文😀\r\nhello', [{ range: { start: { line: 1, character: 1 }, end: { line: 1, character: 4 } }, text: 'i' }]), '中文😀\r\nhio');
  assert.equal(applyChanges('中文😀 ok', [{ range: { start: { line: 0, character: 2 }, end: { line: 0, character: 4 } }, text: '字' }]), '中文字 ok');
});

test('stdio server starts, discovers unopened modules, updates and shuts down', { timeout: 20000 }, async t => {
  const base = path.resolve('.tmp/tests'); await fs.mkdir(base, { recursive: true });
  const folder = await fs.mkdtemp(path.join(base, 'lsp-'));
  const root = path.join(folder, 'project'); await fs.mkdir(path.join(root, 'module'), { recursive: true });
  const file = path.join(root, 'module', 'C.java');
  const source = 'import org.springframework.web.bind.annotation.*; class C { @GetMapping("/cold") void get() {} }';
  await fs.writeFile(file, source);
  const server = process.env.ENDPOINT_TEST_SERVER ?? 'server/server.mjs';
  const child = spawn(process.execPath, [server, '--worktree', root, '--cache-dir', path.join(folder, 'cache')], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
  let stderr = ''; child.stderr.on('data', data => { stderr += data; });
  const pending = new Map(); const decoder = new Decoder(); let id = 0;
  const exit = new Promise(resolve => child.on('exit', code => resolve(code)));
  t.after(async () => { child.kill(); await exit; await fs.rm(folder, { recursive: true, force: true }); });
  child.stdout.on('data', chunk => {
    for (const message of decoder.push(chunk)) {
      if (pending.has(message.id)) { const callback = pending.get(message.id); pending.delete(message.id); callback(message); }
    }
  });
  const notify = (method, params) => child.stdin.write(encode({ jsonrpc: '2.0', method, params }));
  const request = (method, params) => new Promise((resolve, reject) => {
    const requestId = ++id;
    const timer = setTimeout(() => { pending.delete(requestId); reject(Error(`${method} timeout: ${stderr}`)); }, 5000);
    pending.set(requestId, message => { clearTimeout(timer); message.error ? reject(Error(JSON.stringify(message.error))) : resolve(message.result); });
    child.stdin.write(encode({ jsonrpc: '2.0', id: requestId, method, params }));
  });
  const initialized = await request('initialize', { rootUri: pathToFileURL(root).href, capabilities: {} });
  assert.equal(initialized.capabilities.workspaceSymbolProvider, true);
  notify('initialized', {});
  let entries = [];
  for (let i = 0; i < 60; i++) {
    entries = await request('workspace/symbol', { query: '/cold' });
    if (entries.length) break;
    await new Promise(r => setTimeout(r, 50));
  }
  assert.equal(entries.length, 1, stderr);
  assert.equal(entries[0].location.uri, pathToFileURL(file).href);
  assert.equal((await request('workspace/symbol', { query: '@/cld' })).length, 1, 'fuzzy candidates must survive the LSP boundary');
  const uri = pathToFileURL(file).href;
  notify('textDocument/didOpen', { textDocument: { uri, languageId: 'java', version: 1, text: source } });
  notify('textDocument/didChange', { textDocument: { uri, version: 2 }, contentChanges: [{ text: source.replace('/cold', '/live') }] });
  assert.equal((await request('workspace/symbol', { query: '/live' })).length, 1);
  assert.equal((await request('workspace/symbol', { query: '/cold' })).length, 0);
  notify('textDocument/didClose', { textDocument: { uri } });
  assert.equal((await request('workspace/symbol', { query: '/cold' })).length, 1);
  const status = await request('endpointSearch/status', {});
  assert.equal(status.projects[0].files, 1);
  assert.equal(await request('shutdown', null), null);
  notify('exit');
  assert.equal(await exit, 0, stderr);
});
