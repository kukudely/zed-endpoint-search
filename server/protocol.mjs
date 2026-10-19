export function encode(message) {
  const body = Buffer.from(JSON.stringify(message), 'utf8');
  return Buffer.concat([Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, 'ascii'), body]);
}

export class Decoder {
  buffer = Buffer.alloc(0);
  length = null;
  push(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const messages = [];
    while (true) {
      if (this.length == null) {
        const end = this.buffer.indexOf('\r\n\r\n');
        if (end < 0) {
          if (this.buffer.length > 16384) throw Error('LSP header exceeds 16 KiB');
          break;
        }
        const header = this.buffer.subarray(0, end).toString('ascii');
        const match = /^Content-Length:\s*(\d+)\s*$/im.exec(header);
        if (!match) throw Error('Missing Content-Length');
        this.length = Number(match[1]);
        if (this.length > 16 * 1024 * 1024) throw Error('LSP frame exceeds 16 MiB');
        this.buffer = this.buffer.subarray(end + 4);
      }
      if (this.buffer.length < this.length) break;
      messages.push(JSON.parse(this.buffer.subarray(0, this.length).toString('utf8')));
      this.buffer = this.buffer.subarray(this.length); this.length = null;
    }
    return messages;
  }
}

export function applyChanges(text, changes) {
  for (const change of changes) {
    if (!change.range) text = change.text;
    else {
      const start = offset(text, change.range.start), end = offset(text, change.range.end);
      text = text.slice(0, start) + change.text + text.slice(end);
    }
  }
  return text;
}

function offset(text, position) {
  let start = 0;
  for (let line = 0; line < position.line; line++) {
    const next = text.indexOf('\n', start);
    if (next < 0) return text.length;
    start = next + 1;
  }
  let end = text.indexOf('\n', start);
  if (end < 0) end = text.length;
  if (text[end - 1] === '\r') end--;
  return Math.min(end, start + Math.max(0, position.character));
}
