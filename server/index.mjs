import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { setImmediate as yieldTurn } from 'node:timers/promises';
import chokidar from 'chokidar';
import ignore from 'ignore';

const VERSION = 1;
const SKIP = new Set(['.git', '.idea', '.zed', '.gradle', '.settings', '.tmp', 'node_modules', 'target', 'build', 'out', 'bin']);
const MAX_SOURCE = 4 * 1024 * 1024;

export class EndpointIndex {
  constructor({ root, cacheDir, parser, log = () => {}, reconcileMs = 30000 }) {
    this.root = path.resolve(root);
    this.parser = parser;
    this.log = log;
    this.reconcileMs = reconcileMs;
    const identity = process.platform === 'win32' ? this.root.toLowerCase() : this.root;
    this.cacheFile = path.join(cacheDir, `${createHash('sha256').update(identity).digest('hex').slice(0, 24)}.json`);
    this.records = new Map(); this.documents = new Map();
    this.queue = Promise.resolve(); this.ready = Promise.resolve();
    this.ignores = ignore(); this.pending = new Set(); this.closed = false;
    this.stats = { files: 0, parsed: 0, cached: 0, scanMs: 0, restored: 0 };
  }

  async start({ watch = true } = {}) {
    await this.loadIgnores();
    try {
      const stat = await fs.stat(this.cacheFile);
      if (stat.size > 32 * 1024 * 1024) throw Error('Cache exceeds 32 MiB');
      const cache = JSON.parse(await fs.readFile(this.cacheFile, 'utf8'));
      if (cache.version === VERSION && cache.root === this.root && Array.isArray(cache.records)) {
        for (const [relative, record] of cache.records) {
          if (typeof relative !== 'string' || !this.accepts(path.resolve(this.root, relative)) || !validRecord(record)) continue;
          this.records.set(relative, record);
        }
      }
      this.stats.restored = this.records.size;
    } catch (error) { if (error.code !== 'ENOENT') this.log(`Cache ignored: ${error.message}`); }
    if (watch) {
      this.watcher = chokidar.watch(this.root, {
        ignoreInitial: true, followSymlinks: false,
        ignored: (file, stat) => this.isIgnored(file, stat?.isDirectory()),
        awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 25 },
      });
      this.watcher.on('all', (_event, file) => this.schedule(file));
      const watching = new Promise(resolve => {
        this.watchingResolve = resolve;
        this.watcher.once('ready', resolve);
        this.watcher.once('error', resolve);
      });
      this.watcher.on('error', error => this.log(`File watcher: ${error.message}; periodic scan remains active`));
      // Cache-backed search is available while chokidar discovers the directories.
      this.ready = watching.then(() => this.closed ? undefined : this.reconcile());
      this.interval = setInterval(() => { if (!this.closed) void this.reconcile(); }, this.reconcileMs);
      this.interval.unref();
    } else this.ready = this.reconcile();
    return this;
  }

  relative(file) { return path.relative(this.root, path.resolve(file)).split(path.sep).join('/'); }
  isIgnored(file, directory = false) {
    const relative = this.relative(file);
    if (!relative) return false;
    if (relative === '..' || relative.startsWith('../') || path.isAbsolute(relative)) return true;
    if (relative.split('/').some(part => SKIP.has(part))) return true;
    return this.ignores.ignores(relative + (directory ? '/' : ''));
  }
  accepts(file) { return file.endsWith('.java') && !this.isIgnored(file); }
  async loadIgnores() {
    this.ignores = ignore();
    try { this.ignores.add(await fs.readFile(path.join(this.root, '.gitignore'), 'utf8')); }
    catch (error) { if (error.code !== 'ENOENT') this.log(`Reading .gitignore: ${error.message}`); }
  }

  enqueue(action) {
    const task = this.queue.then(action);
    this.queue = task.catch(error => this.log(error.message));
    return this.queue;
  }

  reconcile() { return this.enqueue(() => this.scan()); }
  async scan() {
    const started = performance.now();
    await this.loadIgnores();
    const seen = new Set();
    let parsed = 0, cached = 0;
    const visit = async directory => {
      let children;
      try { children = await fs.readdir(directory, { withFileTypes: true }); }
      catch (error) {
        if (error.code !== 'ENOENT') {
          this.log(`Scan ${directory}: ${error.message}`);
          // Keep known entries under temporarily inaccessible directories.
          const prefix = this.relative(directory);
          for (const key of this.records.keys()) if (!prefix || key.startsWith(prefix + '/')) seen.add(key);
        }
        return;
      }
      for (const child of children) {
        const file = path.join(directory, child.name);
        if (child.isSymbolicLink() || this.isIgnored(file, child.isDirectory())) continue;
        if (child.isDirectory()) await visit(file);
        else if (child.isFile() && this.accepts(file)) {
          seen.add(this.relative(file));
          const result = await this.refreshFile(file);
          if (result === 'cached') cached++; else if (result === 'parsed') parsed++;
          if (seen.size % 32 === 0) await yieldTurn();
        }
      }
    };
    await visit(this.root);
    for (const relative of this.records.keys()) if (!seen.has(relative)) this.records.delete(relative);
    this.stats = { ...this.stats, files: this.records.size, parsed, cached, scanMs: Math.round(performance.now() - started) };
    await this.saveCache();
    this.log(`Index ready: ${this.stats.files} Java files, ${parsed} parsed, ${cached} cached, ${this.stats.scanMs} ms`);
  }

  async refreshFile(file, force = false) {
    const relative = this.relative(file);
    if (!this.accepts(file)) { this.records.delete(relative); return; }
    try {
      const stat = await fs.lstat(file);
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_SOURCE) { this.records.delete(relative); return; }
      const old = this.records.get(relative);
      if (!force && old && old.mtimeMs === stat.mtimeMs && old.ctimeMs === stat.ctimeMs && old.size === stat.size) return 'cached';
      const source = await fs.readFile(file, 'utf8');
      const entries = this.parser.parse(source);
      this.records.set(relative, { mtimeMs: stat.mtimeMs, ctimeMs: stat.ctimeMs, size: stat.size, entries });
      return 'parsed';
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') this.records.delete(relative);
      else this.log(`Index ${relative}: ${error.message}`);
    }
  }

  schedule(file) {
    if (this.closed) return;
    if (!file.endsWith('.java') && path.basename(file) !== '.gitignore') return;
    this.pending.add(file);
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      const pending = [...this.pending]; this.pending.clear();
      void this.enqueue(async () => {
        if (pending.some(file => path.basename(file) === '.gitignore')) await this.scan();
        else { for (const file of pending) await this.refreshFile(file, true); await this.saveCache(); }
      });
    }, 75);
  }

  setDocument(file, source) {
    if (!this.accepts(file)) return;
    this.documents.set(this.relative(file), this.parser.parse(source));
  }
  async closeDocument(file) {
    this.documents.delete(this.relative(file));
    await this.enqueue(() => this.refreshFile(file, true));
  }

  search(query = '', limit = 500) {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const results = [];
    const records = new Map([...this.records].map(([key, record]) => [key, record.entries]));
    for (const [key, entries] of this.documents) records.set(key, entries);
    for (const [relative, entries] of records) {
      if (this.isIgnored(path.join(this.root, relative))) continue;
      for (const entry of entries) {
        const name = entry.unresolved ? `@? ${entry.expression} -- ${entry.httpMethod} [unresolved]` : `@${entry.path} -- ${entry.httpMethod}`;
        const containerName = `${entry.className}.${entry.methodName} · ${relative}`;
        const label = name.toLowerCase();
        const context = containerName.toLowerCase();
        const score = terms.reduce((sum, term) => sum + Math.min(
          matchScore(label, term),
          2000 + matchScore(context, term),
        ), 0);
        if (!Number.isFinite(score)) continue;
        results.push({ score, symbol: { name, kind: 6, containerName, location: {
          uri: pathToFileURL(path.join(this.root, relative)).href,
          range: { start: { line: entry.line, character: entry.character }, end: { line: entry.line, character: entry.character } },
        } } });
      }
    }
    return results.sort((a, b) => a.score - b.score || a.symbol.name.localeCompare(b.symbol.name) || a.symbol.location.uri.localeCompare(b.symbol.location.uri))
      .slice(0, limit).map(result => result.symbol);
  }

  async saveCache() {
    const temporary = `${this.cacheFile}.${process.pid}.${randomUUID()}.tmp`;
    try {
      await fs.mkdir(path.dirname(this.cacheFile), { recursive: true });
      await fs.writeFile(temporary, JSON.stringify({ version: VERSION, root: this.root, records: [...this.records] }));
      await fs.rename(temporary, this.cacheFile);
    } catch (error) { this.log(`Saving index cache: ${error.message}`); }
    finally { await fs.unlink(temporary).catch(() => {}); }
  }

  async close() {
    this.closed = true;
    clearInterval(this.interval); clearTimeout(this.debounce);
    this.watchingResolve?.();
    await this.watcher?.close();
    await this.ready; await this.queue;
    // Include the last debounced changes before shutdown, but never persist buffer overlays.
    for (const file of this.pending) await this.refreshFile(file, true);
    this.pending.clear();
    await this.saveCache();
  }
}

// Zed fuzzy-filters the returned labels again. Never discard a candidate simply
// because the query skips a slash or characters inside the path. Lower is better;
// contiguous matches stay ahead of loose subsequences before the result limit.
function matchScore(text, query) {
  const contiguous = text.indexOf(query);
  if (contiguous >= 0) return (contiguous === 0 ? 0 : 100) + Math.min(contiguous, 100);
  let next = 0, first = -1, last = -1;
  for (let i = 0; i < text.length && next < query.length; i++) {
    if (text[i] !== query[next]) continue;
    if (first < 0) first = i;
    last = i;
    next++;
  }
  return next === query.length ? 1000 + (last - first + 1 - query.length) + first / 1000 : Infinity;
}

function validRecord(record) {
  return record && Number.isFinite(record.mtimeMs) && Number.isFinite(record.ctimeMs) && Number.isFinite(record.size) &&
    Array.isArray(record.entries) && record.entries.every(e => e && typeof e.className === 'string' && typeof e.methodName === 'string' &&
      typeof e.httpMethod === 'string' && typeof e.unresolved === 'boolean' && (e.unresolved ? typeof e.expression === 'string' : typeof e.path === 'string') &&
      Number.isInteger(e.line) && e.line >= 0 && Number.isInteger(e.character) && e.character >= 0);
}
