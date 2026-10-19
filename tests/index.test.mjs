import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createJavaParser } from '../server/java.mjs';
import { EndpointIndex } from '../server/index.mjs';

const parser = await createJavaParser();
test.after(() => parser.close());
const source = route => `import org.springframework.web.bind.annotation.*; class C { @GetMapping("${route}") void get() {} }`;
async function fixture(t) {
  const base = path.resolve('.tmp/tests');
  await fs.mkdir(base, { recursive: true });
  const folder = await fs.mkdtemp(path.join(base, 'endpoint-test-'));
  const root = path.join(folder, 'project');
  const cacheDir = path.join(folder, 'cache');
  await fs.mkdir(root);
  t.after(() => fs.rm(folder, { recursive: true, force: true }));
  return { folder, root, cacheDir };
}
async function eventually(predicate, message) {
  const end = Date.now() + 5000;
  while (Date.now() < end) {
    if (await predicate()) return;
    await new Promise(r => setTimeout(r, 40));
  }
  assert.fail(message);
}

test('cold index, warm cache and deletion reconciliation', async t => {
  const { root, cacheDir } = await fixture(t);
  const file = path.join(root, 'C.java');
  await fs.writeFile(file, source('/users'));
  const first = new EndpointIndex({ root, cacheDir, parser });
  await first.start({ watch: false }); await first.ready;
  assert.match(first.search('users')[0].name, /GET/);
  assert.equal(first.search('@/users')[0].location.uri, pathToFileURL(file).href);
  await first.close();
  let parses = 0;
  const second = new EndpointIndex({ root, cacheDir, parser: { parse(text) { parses++; return parser.parse(text); } } });
  await second.start({ watch: false });
  assert.equal(second.search('users').length, 1, 'cache is searchable before reconcile finishes');
  await second.ready;
  assert.equal(parses, 0, 'unchanged sources must not be parsed');
  await fs.unlink(file); await second.reconcile();
  assert.deepEqual(second.search('users'), []);
  await second.close();
});

test('external add/change/delete updates without editor notifications', async t => {
  const { root, cacheDir } = await fixture(t);
  const index = new EndpointIndex({ root, cacheDir, parser });
  await index.start(); await index.ready;
  t.after(() => index.close());
  const nested = path.join(root, 'module', 'src'); await fs.mkdir(nested, { recursive: true });
  const file = path.join(nested, 'C.java');
  await fs.writeFile(file, source('/one'));
  await eventually(() => index.search('/one').length === 1, 'new controller not indexed');
  await fs.writeFile(file, source('/two'));
  await eventually(() => index.search('/two').length === 1 && index.search('/one').length === 0, 'changed route not replaced');
  await fs.unlink(file);
  await eventually(() => index.search('/two').length === 0, 'deleted controller retained');
});

test('ignores generated/hidden files and root gitignore, isolates worktree caches', async t => {
  const { folder, root, cacheDir } = await fixture(t);
  await fs.writeFile(path.join(root, '.gitignore'), 'ignored/\n');
  for (const dir of ['target', '.git', 'node_modules', 'ignored']) {
    await fs.mkdir(path.join(root, dir));
    await fs.writeFile(path.join(root, dir, 'C.java'), source('/bad'));
  }
  await fs.writeFile(path.join(root, 'C.java'), source('/good'));
  const first = new EndpointIndex({ root, cacheDir, parser });
  await first.start({ watch: false }); await first.ready;
  assert.equal(first.search('').length, 1); await first.close();
  const otherRoot = path.join(folder, 'worktree'); await fs.mkdir(otherRoot);
  const other = new EndpointIndex({ root: otherRoot, cacheDir, parser });
  await other.start({ watch: false }); await other.ready;
  assert.equal(other.search('').length, 0); await other.close();
});

test('unsaved document overlays survive disk changes and disappear on close', async t => {
  const { root, cacheDir } = await fixture(t);
  const file = path.join(root, 'C.java');
  await fs.writeFile(file, source('/disk'));
  const index = new EndpointIndex({ root, cacheDir, parser });
  await index.start({ watch: false }); await index.ready;
  index.setDocument(file, source('/buffer'));
  assert.equal(index.search('/buffer').length, 1);
  await fs.writeFile(file, source('/changed')); await index.reconcile();
  assert.equal(index.search('/buffer').length, 1);
  assert.equal(index.search('/changed').length, 0);
  await index.closeDocument(file);
  assert.equal(index.search('/buffer').length, 0);
  assert.equal(index.search('/changed').length, 1);
  await index.close();
});

test('corrupt cache recovers by scanning and outside-root documents are rejected', async t => {
  const { root, cacheDir, folder } = await fixture(t);
  const index = new EndpointIndex({ root, cacheDir, parser });
  await fs.mkdir(cacheDir); await fs.writeFile(index.cacheFile, '{broken');
  await fs.writeFile(path.join(root, 'C.java'), source('/real'));
  await index.start({ watch: false }); await index.ready;
  index.setDocument(path.join(folder, 'outside.java'), source('/outside'));
  assert.equal(index.search('').length, 1);
  await index.close();
});

test('closing immediately after startup does not wait forever for watcher readiness', { timeout: 2000 }, async t => {
  const { root, cacheDir } = await fixture(t);
  const index = new EndpointIndex({ root, cacheDir, parser });
  await index.start();
  await index.close();
});

test('endpoint search accepts ordered non-contiguous characters and optional route prefixes', async t => {
  const { root, cacheDir } = await fixture(t);
  await fs.writeFile(path.join(root, 'C.java'), source('/api/skills/setting/selected'));
  const index = new EndpointIndex({ root, cacheDir, parser });
  await index.start({ watch: false }); await index.ready;
  try {
    for (const query of ['skills/setting', 'skillsetting', '@/skillsetting', '@/setting', 'SKILLSETTING', 'skstsl']) {
      assert.equal(index.search(query).length, 1, query);
    }
    assert.equal(index.search('zzzzzz').length, 0);
    assert.equal(index.search('gnittes').length, 0, 'character order still matters');
  } finally { await index.close(); }
});

test('contiguous route matches rank before loose subsequences when limiting results', async t => {
  const { root, cacheDir } = await fixture(t);
  await fs.writeFile(path.join(root, 'A.java'), source('/a/something/keep/list'));
  await fs.writeFile(path.join(root, 'B.java'), source('/z/skl'));
  const index = new EndpointIndex({ root, cacheDir, parser });
  await index.start({ watch: false }); await index.ready;
  try {
    const results = index.search('skl');
    assert.equal(results.length, 2);
    assert.match(results[0].name, /\/z\/skl/);
    assert.match(index.search('skl', 1)[0].name, /\/z\/skl/);
  } finally { await index.close(); }
});
