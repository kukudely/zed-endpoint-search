import { build } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

await fs.mkdir('dist', { recursive: true });
await build({
  entryPoints: ['server/server.mjs'], outfile: 'dist/server.cjs', bundle: true,
  platform: 'node', format: 'cjs', target: 'node20', legalComments: 'eof',
  alias: { 'web-tree-sitter': path.resolve('node_modules/web-tree-sitter/tree-sitter.cjs') },
});
await fs.copyFile('node_modules/web-tree-sitter/tree-sitter.wasm', 'dist/tree-sitter.wasm');
await fs.copyFile('node_modules/tree-sitter-java/tree-sitter-java.wasm', 'dist/tree-sitter-java.wasm');
const hash = createHash('sha256');
for (const file of ['server.cjs', 'tree-sitter.wasm', 'tree-sitter-java.wasm']) hash.update(await fs.readFile(`dist/${file}`));
await fs.writeFile('dist/build-id.txt', hash.digest('hex').slice(0, 16));
const notices = [];
for (const name of ['web-tree-sitter', 'tree-sitter-java', 'chokidar', 'readdirp', 'ignore']) {
  const files = await fs.readdir(`node_modules/${name}`);
  const license = files.find(file => /^licen[cs]e(?:\.|$)/i.test(file));
  notices.push(`## ${name}\n\n${license ? await fs.readFile(`node_modules/${name}/${license}`, 'utf8') : 'See package metadata for license.'}`);
}
await fs.writeFile('dist/THIRD-PARTY-NOTICES.txt', notices.join('\n\n'));
console.log('Built dist/server.cjs and standalone parser assets.');
