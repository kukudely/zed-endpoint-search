import test from 'node:test';
import assert from 'node:assert/strict';
import { createJavaParser } from '../server/java.mjs';

const parser = await createJavaParser();
const imports = 'import org.springframework.web.bind.annotation.*;\n';
test.after(() => parser.close());

test('combines class and method path arrays, aliases and verbs', () => {
  const entries = parser.parse(imports + `
    @RestController @RequestMapping(path={"/api", "/v2"})
    class Users {
      @RequestMapping(value={"/users", "/people"}, method={RequestMethod.GET, RequestMethod.POST})
      public void users() {}
      @DeleteMapping("/users/{id}") public void remove() {}
    }`);
  assert.equal(entries.length, 10);
  assert.ok(entries.some(e => e.path === '/v2/people' && e.httpMethod === 'POST'));
  assert.ok(entries.some(e => e.path === '/api/users/{id}' && e.httpMethod === 'DELETE'));
});

test('resolves same-class static final string constants and concatenation', () => {
  const entries = parser.parse(imports + `
    @RestController @RequestMapping(ROOT) class C {
      static final String PREFIX="/api"; static final String ROOT=PREFIX + "/v1";
      @GetMapping(C.ROOT + "/users") void get() {}
    }`);
  assert.equal(entries[0].path, '/api/v1/api/v1/users');
  assert.equal(entries[0].unresolved, false);
});

test('reports unknown expressions instead of inventing an endpoint', () => {
  const entries = parser.parse(imports + '@RestController class C { @GetMapping(Routes.ROOT + "/users") void get() {} }');
  assert.equal(entries.length, 1);
  assert.equal(entries[0].path, null);
  assert.equal(entries[0].unresolved, true);
  assert.match(entries[0].expression, /Routes\.ROOT/);
});

test('ignores comments, strings and annotations imported from other packages', () => {
  const entries = parser.parse('import example.GetMapping;\n' + `
    // @GetMapping("/comment") void fake() {}
    class C { String fake="@GetMapping(\\"/string\\")";
      @GetMapping("/wrong") void wrong() {}
    }`);
  assert.deepEqual(entries, []);
});

test('supports fully qualified annotations and UTF-16 navigation locations', () => {
  const source = 'class C { String 中文="😀"; @org.springframework.web.bind.annotation.GetMapping("/hello") void hello() {} }';
  const entry = parser.parse(source)[0];
  assert.equal(entry.path, '/hello');
  assert.equal(entry.line, 0);
  assert.equal(entry.character, source.indexOf('@org'));
  assert.equal(entry.className, 'C');
  assert.equal(entry.methodName, 'hello');
});

test('handles no-argument annotations, nested classes and request methods', () => {
  const entries = parser.parse(imports + `
    @RequestMapping(value="/root", method=RequestMethod.PUT) class Outer {
      @RequestMapping void root() {}
      @RestController class Inner { @PatchMapping("/inner") void inner() {} }
    }`);
  assert.deepEqual(entries.map(e => [e.path, e.httpMethod]), [['/root', 'PUT'], ['/inner', 'PATCH']]);
});

test('unresolvable and circular constants terminate and retain explicit placeholders', () => {
  const entries = parser.parse(imports + `class C {
    static final String A=B; static final String B=A;
    @GetMapping(A) void cyclic() {}
    @GetMapping("/users/\u0024{version}") void property() {}
  }`);
  assert.equal(entries[0].unresolved, true);
  assert.equal(entries[1].unresolved, true);
});

test('root class mapping joins without double slash and combines method conditions', () => {
  const entries = parser.parse(imports + '@RequestMapping(value="/", method=RequestMethod.GET) class C { @PostMapping("/x") void x() {} }');
  assert.deepEqual(entries.map(e => [e.path, e.httpMethod]), [['/x', 'GET'], ['/x', 'POST']]);
});
