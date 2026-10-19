var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/web-tree-sitter/tree-sitter.cjs
var require_tree_sitter2 = __commonJS2({
  "node_modules/web-tree-sitter/tree-sitter.cjs"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
    var __commonJS = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export = (target, all) => {
      for (var name2 in all)
        __defProp(target, name2, { get: all[name2], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var require_tree_sitter = __commonJS({
      "lib/tree-sitter.cjs"(exports, module) {
        "use strict";
        var Module = (() => {
          var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
          if (typeof __filename != "undefined") _scriptName = _scriptName || __filename;
          return async function(moduleArg = {}) {
            var moduleRtn;
            var Module = moduleArg;
            var readyPromiseResolve, readyPromiseReject;
            var readyPromise = new Promise((resolve3, reject) => {
              readyPromiseResolve = resolve3;
              readyPromiseReject = reject;
            });
            var ENVIRONMENT_IS_WEB = typeof window == "object";
            var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
            var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
            var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
            if (ENVIRONMENT_IS_NODE) {
            }
            Module.currentQueryProgressCallback = null;
            Module.currentProgressCallback = null;
            Module.currentLogCallback = null;
            Module.currentParseCallback = null;
            var moduleOverrides = Object.assign({}, Module);
            var arguments_ = [];
            var thisProgram = "./this.program";
            var quit_ = /* @__PURE__ */ __name((status, toThrow) => {
              throw toThrow;
            }, "quit_");
            var scriptDirectory = "";
            function locateFile(path3) {
              if (Module["locateFile"]) {
                return Module["locateFile"](path3, scriptDirectory);
              }
              return scriptDirectory + path3;
            }
            __name(locateFile, "locateFile");
            var readAsync, readBinary;
            if (ENVIRONMENT_IS_NODE) {
              var fs = require("fs");
              var nodePath = require("path");
              scriptDirectory = __dirname + "/";
              readBinary = /* @__PURE__ */ __name((filename) => {
                filename = isFileURI(filename) ? new URL(filename) : filename;
                var ret = fs.readFileSync(filename);
                return ret;
              }, "readBinary");
              readAsync = /* @__PURE__ */ __name(async (filename, binary2 = true) => {
                filename = isFileURI(filename) ? new URL(filename) : filename;
                var ret = fs.readFileSync(filename, binary2 ? void 0 : "utf8");
                return ret;
              }, "readAsync");
              if (!Module["thisProgram"] && process.argv.length > 1) {
                thisProgram = process.argv[1].replace(/\\/g, "/");
              }
              arguments_ = process.argv.slice(2);
              quit_ = /* @__PURE__ */ __name((status, toThrow) => {
                process.exitCode = status;
                throw toThrow;
              }, "quit_");
            } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
              if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
              } else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
              }
              if (_scriptName) {
                scriptDirectory = _scriptName;
              }
              if (scriptDirectory.startsWith("blob:")) {
                scriptDirectory = "";
              } else {
                scriptDirectory = scriptDirectory.slice(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
              }
              {
                if (ENVIRONMENT_IS_WORKER) {
                  readBinary = /* @__PURE__ */ __name((url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.responseType = "arraybuffer";
                    xhr.send(null);
                    return new Uint8Array(
                      /** @type{!ArrayBuffer} */
                      xhr.response
                    );
                  }, "readBinary");
                }
                readAsync = /* @__PURE__ */ __name(async (url) => {
                  if (isFileURI(url)) {
                    return new Promise((resolve3, reject) => {
                      var xhr = new XMLHttpRequest();
                      xhr.open("GET", url, true);
                      xhr.responseType = "arraybuffer";
                      xhr.onload = () => {
                        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                          resolve3(xhr.response);
                          return;
                        }
                        reject(xhr.status);
                      };
                      xhr.onerror = reject;
                      xhr.send(null);
                    });
                  }
                  var response = await fetch(url, {
                    credentials: "same-origin"
                  });
                  if (response.ok) {
                    return response.arrayBuffer();
                  }
                  throw new Error(response.status + " : " + response.url);
                }, "readAsync");
              }
            } else {
            }
            var out = Module["print"] || console.log.bind(console);
            var err = Module["printErr"] || console.error.bind(console);
            Object.assign(Module, moduleOverrides);
            moduleOverrides = null;
            if (Module["arguments"]) arguments_ = Module["arguments"];
            if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
            var dynamicLibraries = Module["dynamicLibraries"] || [];
            var wasmBinary = Module["wasmBinary"];
            var wasmMemory;
            var ABORT = false;
            var EXITSTATUS;
            function assert(condition, text) {
              if (!condition) {
                abort(text);
              }
            }
            __name(assert, "assert");
            var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
            var HEAP_DATA_VIEW;
            var runtimeInitialized = false;
            var isFileURI = /* @__PURE__ */ __name((filename) => filename.startsWith("file://"), "isFileURI");
            function updateMemoryViews() {
              var b = wasmMemory.buffer;
              Module["HEAP_DATA_VIEW"] = HEAP_DATA_VIEW = new DataView(b);
              Module["HEAP8"] = HEAP8 = new Int8Array(b);
              Module["HEAP16"] = HEAP16 = new Int16Array(b);
              Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
              Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
              Module["HEAP32"] = HEAP32 = new Int32Array(b);
              Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
              Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
              Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
              Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
              Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
            }
            __name(updateMemoryViews, "updateMemoryViews");
            if (Module["wasmMemory"]) {
              wasmMemory = Module["wasmMemory"];
            } else {
              var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 33554432;
              wasmMemory = new WebAssembly.Memory({
                "initial": INITIAL_MEMORY / 65536,
                // In theory we should not need to emit the maximum if we want "unlimited"
                // or 4GB of memory, but VMs error on that atm, see
                // https://github.com/emscripten-core/emscripten/issues/14130
                // And in the pthreads case we definitely need to emit a maximum. So
                // always emit one.
                "maximum": 32768
              });
            }
            updateMemoryViews();
            var __RELOC_FUNCS__ = [];
            function preRun() {
              if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
                while (Module["preRun"].length) {
                  addOnPreRun(Module["preRun"].shift());
                }
              }
              callRuntimeCallbacks(onPreRuns);
            }
            __name(preRun, "preRun");
            function initRuntime() {
              runtimeInitialized = true;
              callRuntimeCallbacks(__RELOC_FUNCS__);
              wasmExports["__wasm_call_ctors"]();
              callRuntimeCallbacks(onPostCtors);
            }
            __name(initRuntime, "initRuntime");
            function preMain() {
            }
            __name(preMain, "preMain");
            function postRun() {
              if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
                while (Module["postRun"].length) {
                  addOnPostRun(Module["postRun"].shift());
                }
              }
              callRuntimeCallbacks(onPostRuns);
            }
            __name(postRun, "postRun");
            var runDependencies = 0;
            var dependenciesFulfilled = null;
            function getUniqueRunDependency(id) {
              return id;
            }
            __name(getUniqueRunDependency, "getUniqueRunDependency");
            function addRunDependency(id) {
              runDependencies++;
              Module["monitorRunDependencies"]?.(runDependencies);
            }
            __name(addRunDependency, "addRunDependency");
            function removeRunDependency(id) {
              runDependencies--;
              Module["monitorRunDependencies"]?.(runDependencies);
              if (runDependencies == 0) {
                if (dependenciesFulfilled) {
                  var callback = dependenciesFulfilled;
                  dependenciesFulfilled = null;
                  callback();
                }
              }
            }
            __name(removeRunDependency, "removeRunDependency");
            function abort(what) {
              Module["onAbort"]?.(what);
              what = "Aborted(" + what + ")";
              err(what);
              ABORT = true;
              what += ". Build with -sASSERTIONS for more info.";
              var e = new WebAssembly.RuntimeError(what);
              readyPromiseReject(e);
              throw e;
            }
            __name(abort, "abort");
            var wasmBinaryFile;
            function findWasmBinary() {
              return locateFile("tree-sitter.wasm");
            }
            __name(findWasmBinary, "findWasmBinary");
            function getBinarySync(file) {
              if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
              }
              if (readBinary) {
                return readBinary(file);
              }
              throw "both async and sync fetching of the wasm failed";
            }
            __name(getBinarySync, "getBinarySync");
            async function getWasmBinary(binaryFile) {
              if (!wasmBinary) {
                try {
                  var response = await readAsync(binaryFile);
                  return new Uint8Array(response);
                } catch {
                }
              }
              return getBinarySync(binaryFile);
            }
            __name(getWasmBinary, "getWasmBinary");
            async function instantiateArrayBuffer(binaryFile, imports) {
              try {
                var binary2 = await getWasmBinary(binaryFile);
                var instance2 = await WebAssembly.instantiate(binary2, imports);
                return instance2;
              } catch (reason) {
                err(`failed to asynchronously prepare wasm: ${reason}`);
                abort(reason);
              }
            }
            __name(instantiateArrayBuffer, "instantiateArrayBuffer");
            async function instantiateAsync(binary2, binaryFile, imports) {
              if (!binary2 && typeof WebAssembly.instantiateStreaming == "function" && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
                try {
                  var response = fetch(binaryFile, {
                    credentials: "same-origin"
                  });
                  var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
                  return instantiationResult;
                } catch (reason) {
                  err(`wasm streaming compile failed: ${reason}`);
                  err("falling back to ArrayBuffer instantiation");
                }
              }
              return instantiateArrayBuffer(binaryFile, imports);
            }
            __name(instantiateAsync, "instantiateAsync");
            function getWasmImports() {
              return {
                "env": wasmImports,
                "wasi_snapshot_preview1": wasmImports,
                "GOT.mem": new Proxy(wasmImports, GOTHandler),
                "GOT.func": new Proxy(wasmImports, GOTHandler)
              };
            }
            __name(getWasmImports, "getWasmImports");
            async function createWasm() {
              function receiveInstance(instance2, module2) {
                wasmExports = instance2.exports;
                wasmExports = relocateExports(wasmExports, 1024);
                var metadata2 = getDylinkMetadata(module2);
                if (metadata2.neededDynlibs) {
                  dynamicLibraries = metadata2.neededDynlibs.concat(dynamicLibraries);
                }
                mergeLibSymbols(wasmExports, "main");
                LDSO.init();
                loadDylibs();
                __RELOC_FUNCS__.push(wasmExports["__wasm_apply_data_relocs"]);
                removeRunDependency("wasm-instantiate");
                return wasmExports;
              }
              __name(receiveInstance, "receiveInstance");
              addRunDependency("wasm-instantiate");
              function receiveInstantiationResult(result2) {
                return receiveInstance(result2["instance"], result2["module"]);
              }
              __name(receiveInstantiationResult, "receiveInstantiationResult");
              var info2 = getWasmImports();
              if (Module["instantiateWasm"]) {
                return new Promise((resolve3, reject) => {
                  Module["instantiateWasm"](info2, (mod, inst) => {
                    receiveInstance(mod, inst);
                    resolve3(mod.exports);
                  });
                });
              }
              wasmBinaryFile ??= findWasmBinary();
              try {
                var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info2);
                var exports2 = receiveInstantiationResult(result);
                return exports2;
              } catch (e) {
                readyPromiseReject(e);
                return Promise.reject(e);
              }
            }
            __name(createWasm, "createWasm");
            var ASM_CONSTS = {};
            class ExitStatus {
              static {
                __name(this, "ExitStatus");
              }
              name = "ExitStatus";
              constructor(status) {
                this.message = `Program terminated with exit(${status})`;
                this.status = status;
              }
            }
            var GOT = {};
            var currentModuleWeakSymbols = /* @__PURE__ */ new Set([]);
            var GOTHandler = {
              get(obj, symName) {
                var rtn = GOT[symName];
                if (!rtn) {
                  rtn = GOT[symName] = new WebAssembly.Global({
                    "value": "i32",
                    "mutable": true
                  });
                }
                if (!currentModuleWeakSymbols.has(symName)) {
                  rtn.required = true;
                }
                return rtn;
              }
            };
            var LE_HEAP_LOAD_F32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat32(byteOffset, true), "LE_HEAP_LOAD_F32");
            var LE_HEAP_LOAD_F64 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat64(byteOffset, true), "LE_HEAP_LOAD_F64");
            var LE_HEAP_LOAD_I16 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt16(byteOffset, true), "LE_HEAP_LOAD_I16");
            var LE_HEAP_LOAD_I32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt32(byteOffset, true), "LE_HEAP_LOAD_I32");
            var LE_HEAP_LOAD_U16 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getUint16(byteOffset, true), "LE_HEAP_LOAD_U16");
            var LE_HEAP_LOAD_U32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getUint32(byteOffset, true), "LE_HEAP_LOAD_U32");
            var LE_HEAP_STORE_F32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat32(byteOffset, value, true), "LE_HEAP_STORE_F32");
            var LE_HEAP_STORE_F64 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat64(byteOffset, value, true), "LE_HEAP_STORE_F64");
            var LE_HEAP_STORE_I16 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt16(byteOffset, value, true), "LE_HEAP_STORE_I16");
            var LE_HEAP_STORE_I32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt32(byteOffset, value, true), "LE_HEAP_STORE_I32");
            var LE_HEAP_STORE_U16 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setUint16(byteOffset, value, true), "LE_HEAP_STORE_U16");
            var LE_HEAP_STORE_U32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setUint32(byteOffset, value, true), "LE_HEAP_STORE_U32");
            var callRuntimeCallbacks = /* @__PURE__ */ __name((callbacks) => {
              while (callbacks.length > 0) {
                callbacks.shift()(Module);
              }
            }, "callRuntimeCallbacks");
            var onPostRuns = [];
            var addOnPostRun = /* @__PURE__ */ __name((cb) => onPostRuns.unshift(cb), "addOnPostRun");
            var onPreRuns = [];
            var addOnPreRun = /* @__PURE__ */ __name((cb) => onPreRuns.unshift(cb), "addOnPreRun");
            var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
            var UTF8ArrayToString = /* @__PURE__ */ __name((heapOrArray, idx = 0, maxBytesToRead = NaN) => {
              var endIdx = idx + maxBytesToRead;
              var endPtr = idx;
              while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
              if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
                return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
              }
              var str = "";
              while (idx < endPtr) {
                var u0 = heapOrArray[idx++];
                if (!(u0 & 128)) {
                  str += String.fromCharCode(u0);
                  continue;
                }
                var u1 = heapOrArray[idx++] & 63;
                if ((u0 & 224) == 192) {
                  str += String.fromCharCode((u0 & 31) << 6 | u1);
                  continue;
                }
                var u2 = heapOrArray[idx++] & 63;
                if ((u0 & 240) == 224) {
                  u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                } else {
                  u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
                }
                if (u0 < 65536) {
                  str += String.fromCharCode(u0);
                } else {
                  var ch = u0 - 65536;
                  str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                }
              }
              return str;
            }, "UTF8ArrayToString");
            var getDylinkMetadata = /* @__PURE__ */ __name((binary2) => {
              var offset2 = 0;
              var end = 0;
              function getU8() {
                return binary2[offset2++];
              }
              __name(getU8, "getU8");
              function getLEB() {
                var ret = 0;
                var mul = 1;
                while (1) {
                  var byte = binary2[offset2++];
                  ret += (byte & 127) * mul;
                  mul *= 128;
                  if (!(byte & 128)) break;
                }
                return ret;
              }
              __name(getLEB, "getLEB");
              function getString() {
                var len = getLEB();
                offset2 += len;
                return UTF8ArrayToString(binary2, offset2 - len, len);
              }
              __name(getString, "getString");
              function failIf(condition, message) {
                if (condition) throw new Error(message);
              }
              __name(failIf, "failIf");
              var name2 = "dylink.0";
              if (binary2 instanceof WebAssembly.Module) {
                var dylinkSection = WebAssembly.Module.customSections(binary2, name2);
                if (dylinkSection.length === 0) {
                  name2 = "dylink";
                  dylinkSection = WebAssembly.Module.customSections(binary2, name2);
                }
                failIf(dylinkSection.length === 0, "need dylink section");
                binary2 = new Uint8Array(dylinkSection[0]);
                end = binary2.length;
              } else {
                var int32View = new Uint32Array(new Uint8Array(binary2.subarray(0, 24)).buffer);
                var magicNumberFound = int32View[0] == 1836278016 || int32View[0] == 6386541;
                failIf(!magicNumberFound, "need to see wasm magic number");
                failIf(binary2[8] !== 0, "need the dylink section to be first");
                offset2 = 9;
                var section_size = getLEB();
                end = offset2 + section_size;
                name2 = getString();
              }
              var customSection = {
                neededDynlibs: [],
                tlsExports: /* @__PURE__ */ new Set(),
                weakImports: /* @__PURE__ */ new Set()
              };
              if (name2 == "dylink") {
                customSection.memorySize = getLEB();
                customSection.memoryAlign = getLEB();
                customSection.tableSize = getLEB();
                customSection.tableAlign = getLEB();
                var neededDynlibsCount = getLEB();
                for (var i2 = 0; i2 < neededDynlibsCount; ++i2) {
                  var libname = getString();
                  customSection.neededDynlibs.push(libname);
                }
              } else {
                failIf(name2 !== "dylink.0");
                var WASM_DYLINK_MEM_INFO = 1;
                var WASM_DYLINK_NEEDED = 2;
                var WASM_DYLINK_EXPORT_INFO = 3;
                var WASM_DYLINK_IMPORT_INFO = 4;
                var WASM_SYMBOL_TLS = 256;
                var WASM_SYMBOL_BINDING_MASK = 3;
                var WASM_SYMBOL_BINDING_WEAK = 1;
                while (offset2 < end) {
                  var subsectionType = getU8();
                  var subsectionSize = getLEB();
                  if (subsectionType === WASM_DYLINK_MEM_INFO) {
                    customSection.memorySize = getLEB();
                    customSection.memoryAlign = getLEB();
                    customSection.tableSize = getLEB();
                    customSection.tableAlign = getLEB();
                  } else if (subsectionType === WASM_DYLINK_NEEDED) {
                    var neededDynlibsCount = getLEB();
                    for (var i2 = 0; i2 < neededDynlibsCount; ++i2) {
                      libname = getString();
                      customSection.neededDynlibs.push(libname);
                    }
                  } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
                    var count = getLEB();
                    while (count--) {
                      var symname = getString();
                      var flags2 = getLEB();
                      if (flags2 & WASM_SYMBOL_TLS) {
                        customSection.tlsExports.add(symname);
                      }
                    }
                  } else if (subsectionType === WASM_DYLINK_IMPORT_INFO) {
                    var count = getLEB();
                    while (count--) {
                      var modname = getString();
                      var symname = getString();
                      var flags2 = getLEB();
                      if ((flags2 & WASM_SYMBOL_BINDING_MASK) == WASM_SYMBOL_BINDING_WEAK) {
                        customSection.weakImports.add(symname);
                      }
                    }
                  } else {
                    offset2 += subsectionSize;
                  }
                }
              }
              return customSection;
            }, "getDylinkMetadata");
            function getValue(ptr, type = "i8") {
              if (type.endsWith("*")) type = "*";
              switch (type) {
                case "i1":
                  return HEAP8[ptr];
                case "i8":
                  return HEAP8[ptr];
                case "i16":
                  return LE_HEAP_LOAD_I16((ptr >> 1) * 2);
                case "i32":
                  return LE_HEAP_LOAD_I32((ptr >> 2) * 4);
                case "i64":
                  return HEAP64[ptr >> 3];
                case "float":
                  return LE_HEAP_LOAD_F32((ptr >> 2) * 4);
                case "double":
                  return LE_HEAP_LOAD_F64((ptr >> 3) * 8);
                case "*":
                  return LE_HEAP_LOAD_U32((ptr >> 2) * 4);
                default:
                  abort(`invalid type for getValue: ${type}`);
              }
            }
            __name(getValue, "getValue");
            var newDSO = /* @__PURE__ */ __name((name2, handle22, syms) => {
              var dso = {
                refcount: Infinity,
                name: name2,
                exports: syms,
                global: true
              };
              LDSO.loadedLibsByName[name2] = dso;
              if (handle22 != void 0) {
                LDSO.loadedLibsByHandle[handle22] = dso;
              }
              return dso;
            }, "newDSO");
            var LDSO = {
              loadedLibsByName: {},
              loadedLibsByHandle: {},
              init() {
                newDSO("__main__", 0, wasmImports);
              }
            };
            var ___heap_base = 78224;
            var alignMemory = /* @__PURE__ */ __name((size, alignment) => Math.ceil(size / alignment) * alignment, "alignMemory");
            var getMemory = /* @__PURE__ */ __name((size) => {
              if (runtimeInitialized) {
                return _calloc(size, 1);
              }
              var ret = ___heap_base;
              var end = ret + alignMemory(size, 16);
              ___heap_base = end;
              GOT["__heap_base"].value = end;
              return ret;
            }, "getMemory");
            var isInternalSym = /* @__PURE__ */ __name((symName) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(symName) || symName.startsWith("__em_js__"), "isInternalSym");
            var uleb128Encode = /* @__PURE__ */ __name((n, target) => {
              if (n < 128) {
                target.push(n);
              } else {
                target.push(n % 128 | 128, n >> 7);
              }
            }, "uleb128Encode");
            var sigToWasmTypes = /* @__PURE__ */ __name((sig) => {
              var typeNames = {
                "i": "i32",
                "j": "i64",
                "f": "f32",
                "d": "f64",
                "e": "externref",
                "p": "i32"
              };
              var type = {
                parameters: [],
                results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
              };
              for (var i2 = 1; i2 < sig.length; ++i2) {
                type.parameters.push(typeNames[sig[i2]]);
              }
              return type;
            }, "sigToWasmTypes");
            var generateFuncType = /* @__PURE__ */ __name((sig, target) => {
              var sigRet = sig.slice(0, 1);
              var sigParam = sig.slice(1);
              var typeCodes = {
                "i": 127,
                // i32
                "p": 127,
                // i32
                "j": 126,
                // i64
                "f": 125,
                // f32
                "d": 124,
                // f64
                "e": 111
              };
              target.push(96);
              uleb128Encode(sigParam.length, target);
              for (var i2 = 0; i2 < sigParam.length; ++i2) {
                target.push(typeCodes[sigParam[i2]]);
              }
              if (sigRet == "v") {
                target.push(0);
              } else {
                target.push(1, typeCodes[sigRet]);
              }
            }, "generateFuncType");
            var convertJsFunctionToWasm = /* @__PURE__ */ __name((func2, sig) => {
              if (typeof WebAssembly.Function == "function") {
                return new WebAssembly.Function(sigToWasmTypes(sig), func2);
              }
              var typeSectionBody = [1];
              generateFuncType(sig, typeSectionBody);
              var bytes = [
                0,
                97,
                115,
                109,
                // magic ("\0asm")
                1,
                0,
                0,
                0,
                // version: 1
                1
              ];
              uleb128Encode(typeSectionBody.length, bytes);
              bytes.push(...typeSectionBody);
              bytes.push(
                2,
                7,
                // import section
                // (import "e" "f" (func 0 (type 0)))
                1,
                1,
                101,
                1,
                102,
                0,
                0,
                7,
                5,
                // export section
                // (export "f" (func 0 (type 0)))
                1,
                1,
                102,
                0,
                0
              );
              var module2 = new WebAssembly.Module(new Uint8Array(bytes));
              var instance2 = new WebAssembly.Instance(module2, {
                "e": {
                  "f": func2
                }
              });
              var wrappedFunc = instance2.exports["f"];
              return wrappedFunc;
            }, "convertJsFunctionToWasm");
            var wasmTableMirror = [];
            var wasmTable = new WebAssembly.Table({
              "initial": 31,
              "element": "anyfunc"
            });
            var getWasmTableEntry = /* @__PURE__ */ __name((funcPtr) => {
              var func2 = wasmTableMirror[funcPtr];
              if (!func2) {
                if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
                wasmTableMirror[funcPtr] = func2 = wasmTable.get(funcPtr);
              }
              return func2;
            }, "getWasmTableEntry");
            var updateTableMap = /* @__PURE__ */ __name((offset2, count) => {
              if (functionsInTableMap) {
                for (var i2 = offset2; i2 < offset2 + count; i2++) {
                  var item = getWasmTableEntry(i2);
                  if (item) {
                    functionsInTableMap.set(item, i2);
                  }
                }
              }
            }, "updateTableMap");
            var functionsInTableMap;
            var getFunctionAddress = /* @__PURE__ */ __name((func2) => {
              if (!functionsInTableMap) {
                functionsInTableMap = /* @__PURE__ */ new WeakMap();
                updateTableMap(0, wasmTable.length);
              }
              return functionsInTableMap.get(func2) || 0;
            }, "getFunctionAddress");
            var freeTableIndexes = [];
            var getEmptyTableSlot = /* @__PURE__ */ __name(() => {
              if (freeTableIndexes.length) {
                return freeTableIndexes.pop();
              }
              try {
                wasmTable.grow(1);
              } catch (err2) {
                if (!(err2 instanceof RangeError)) {
                  throw err2;
                }
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
              }
              return wasmTable.length - 1;
            }, "getEmptyTableSlot");
            var setWasmTableEntry = /* @__PURE__ */ __name((idx, func2) => {
              wasmTable.set(idx, func2);
              wasmTableMirror[idx] = wasmTable.get(idx);
            }, "setWasmTableEntry");
            var addFunction = /* @__PURE__ */ __name((func2, sig) => {
              var rtn = getFunctionAddress(func2);
              if (rtn) {
                return rtn;
              }
              var ret = getEmptyTableSlot();
              try {
                setWasmTableEntry(ret, func2);
              } catch (err2) {
                if (!(err2 instanceof TypeError)) {
                  throw err2;
                }
                var wrapped = convertJsFunctionToWasm(func2, sig);
                setWasmTableEntry(ret, wrapped);
              }
              functionsInTableMap.set(func2, ret);
              return ret;
            }, "addFunction");
            var updateGOT = /* @__PURE__ */ __name((exports2, replace) => {
              for (var symName in exports2) {
                if (isInternalSym(symName)) {
                  continue;
                }
                var value = exports2[symName];
                GOT[symName] ||= new WebAssembly.Global({
                  "value": "i32",
                  "mutable": true
                });
                if (replace || GOT[symName].value == 0) {
                  if (typeof value == "function") {
                    GOT[symName].value = addFunction(value);
                  } else if (typeof value == "number") {
                    GOT[symName].value = value;
                  } else {
                    err(`unhandled export type for '${symName}': ${typeof value}`);
                  }
                }
              }
            }, "updateGOT");
            var relocateExports = /* @__PURE__ */ __name((exports2, memoryBase2, replace) => {
              var relocated = {};
              for (var e in exports2) {
                var value = exports2[e];
                if (typeof value == "object") {
                  value = value.value;
                }
                if (typeof value == "number") {
                  value += memoryBase2;
                }
                relocated[e] = value;
              }
              updateGOT(relocated, replace);
              return relocated;
            }, "relocateExports");
            var isSymbolDefined = /* @__PURE__ */ __name((symName) => {
              var existing = wasmImports[symName];
              if (!existing || existing.stub) {
                return false;
              }
              return true;
            }, "isSymbolDefined");
            var dynCall = /* @__PURE__ */ __name((sig, ptr, args2 = []) => {
              var rtn = getWasmTableEntry(ptr)(...args2);
              return rtn;
            }, "dynCall");
            var stackSave = /* @__PURE__ */ __name(() => _emscripten_stack_get_current(), "stackSave");
            var stackRestore = /* @__PURE__ */ __name((val) => __emscripten_stack_restore(val), "stackRestore");
            var createInvokeFunction = /* @__PURE__ */ __name((sig) => (ptr, ...args2) => {
              var sp = stackSave();
              try {
                return dynCall(sig, ptr, args2);
              } catch (e) {
                stackRestore(sp);
                if (e !== e + 0) throw e;
                _setThrew(1, 0);
                if (sig[0] == "j") return 0n;
              }
            }, "createInvokeFunction");
            var resolveGlobalSymbol = /* @__PURE__ */ __name((symName, direct = false) => {
              var sym;
              if (isSymbolDefined(symName)) {
                sym = wasmImports[symName];
              } else if (symName.startsWith("invoke_")) {
                sym = wasmImports[symName] = createInvokeFunction(symName.split("_")[1]);
              }
              return {
                sym,
                name: symName
              };
            }, "resolveGlobalSymbol");
            var onPostCtors = [];
            var addOnPostCtor = /* @__PURE__ */ __name((cb) => onPostCtors.unshift(cb), "addOnPostCtor");
            var UTF8ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "", "UTF8ToString");
            var loadWebAssemblyModule = /* @__PURE__ */ __name((binary, flags, libName, localScope, handle) => {
              var metadata = getDylinkMetadata(binary);
              currentModuleWeakSymbols = metadata.weakImports;
              function loadModule() {
                var memAlign = Math.pow(2, metadata.memoryAlign);
                var memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0;
                var tableBase = metadata.tableSize ? wasmTable.length : 0;
                if (handle) {
                  HEAP8[handle + 8] = 1;
                  LE_HEAP_STORE_U32((handle + 12 >> 2) * 4, memoryBase);
                  LE_HEAP_STORE_I32((handle + 16 >> 2) * 4, metadata.memorySize);
                  LE_HEAP_STORE_U32((handle + 20 >> 2) * 4, tableBase);
                  LE_HEAP_STORE_I32((handle + 24 >> 2) * 4, metadata.tableSize);
                }
                if (metadata.tableSize) {
                  wasmTable.grow(metadata.tableSize);
                }
                var moduleExports;
                function resolveSymbol(sym) {
                  var resolved = resolveGlobalSymbol(sym).sym;
                  if (!resolved && localScope) {
                    resolved = localScope[sym];
                  }
                  if (!resolved) {
                    resolved = moduleExports[sym];
                  }
                  return resolved;
                }
                __name(resolveSymbol, "resolveSymbol");
                var proxyHandler = {
                  get(stubs, prop) {
                    switch (prop) {
                      case "__memory_base":
                        return memoryBase;
                      case "__table_base":
                        return tableBase;
                    }
                    if (prop in wasmImports && !wasmImports[prop].stub) {
                      var res = wasmImports[prop];
                      return res;
                    }
                    if (!(prop in stubs)) {
                      var resolved;
                      stubs[prop] = (...args2) => {
                        resolved ||= resolveSymbol(prop);
                        return resolved(...args2);
                      };
                    }
                    return stubs[prop];
                  }
                };
                var proxy = new Proxy({}, proxyHandler);
                var info = {
                  "GOT.mem": new Proxy({}, GOTHandler),
                  "GOT.func": new Proxy({}, GOTHandler),
                  "env": proxy,
                  "wasi_snapshot_preview1": proxy
                };
                function postInstantiation(module, instance) {
                  updateTableMap(tableBase, metadata.tableSize);
                  moduleExports = relocateExports(instance.exports, memoryBase);
                  if (!flags.allowUndefined) {
                    reportUndefinedSymbols();
                  }
                  function addEmAsm(addr, body) {
                    var args = [];
                    var arity = 0;
                    for (; arity < 16; arity++) {
                      if (body.indexOf("$" + arity) != -1) {
                        args.push("$" + arity);
                      } else {
                        break;
                      }
                    }
                    args = args.join(",");
                    var func = `(${args}) => { ${body} };`;
                    ASM_CONSTS[start] = eval(func);
                  }
                  __name(addEmAsm, "addEmAsm");
                  if ("__start_em_asm" in moduleExports) {
                    var start = moduleExports["__start_em_asm"];
                    var stop = moduleExports["__stop_em_asm"];
                    while (start < stop) {
                      var jsString = UTF8ToString(start);
                      addEmAsm(start, jsString);
                      start = HEAPU8.indexOf(0, start) + 1;
                    }
                  }
                  function addEmJs(name, cSig, body) {
                    var jsArgs = [];
                    cSig = cSig.slice(1, -1);
                    if (cSig != "void") {
                      cSig = cSig.split(",");
                      for (var i in cSig) {
                        var jsArg = cSig[i].split(" ").pop();
                        jsArgs.push(jsArg.replace("*", ""));
                      }
                    }
                    var func = `(${jsArgs}) => ${body};`;
                    moduleExports[name] = eval(func);
                  }
                  __name(addEmJs, "addEmJs");
                  for (var name in moduleExports) {
                    if (name.startsWith("__em_js__")) {
                      var start = moduleExports[name];
                      var jsString = UTF8ToString(start);
                      var parts = jsString.split("<::>");
                      addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]);
                      delete moduleExports[name];
                    }
                  }
                  var applyRelocs = moduleExports["__wasm_apply_data_relocs"];
                  if (applyRelocs) {
                    if (runtimeInitialized) {
                      applyRelocs();
                    } else {
                      __RELOC_FUNCS__.push(applyRelocs);
                    }
                  }
                  var init = moduleExports["__wasm_call_ctors"];
                  if (init) {
                    if (runtimeInitialized) {
                      init();
                    } else {
                      addOnPostCtor(init);
                    }
                  }
                  return moduleExports;
                }
                __name(postInstantiation, "postInstantiation");
                if (flags.loadAsync) {
                  if (binary instanceof WebAssembly.Module) {
                    var instance = new WebAssembly.Instance(binary, info);
                    return Promise.resolve(postInstantiation(binary, instance));
                  }
                  return WebAssembly.instantiate(binary, info).then((result) => postInstantiation(result.module, result.instance));
                }
                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary);
                var instance = new WebAssembly.Instance(module, info);
                return postInstantiation(module, instance);
              }
              __name(loadModule, "loadModule");
              if (flags.loadAsync) {
                return metadata.neededDynlibs.reduce((chain, dynNeeded) => chain.then(() => loadDynamicLibrary(dynNeeded, flags, localScope)), Promise.resolve()).then(loadModule);
              }
              metadata.neededDynlibs.forEach((needed) => loadDynamicLibrary(needed, flags, localScope));
              return loadModule();
            }, "loadWebAssemblyModule");
            var mergeLibSymbols = /* @__PURE__ */ __name((exports2, libName2) => {
              for (var [sym, exp] of Object.entries(exports2)) {
                const setImport = /* @__PURE__ */ __name((target) => {
                  if (!isSymbolDefined(target)) {
                    wasmImports[target] = exp;
                  }
                }, "setImport");
                setImport(sym);
                const main_alias = "__main_argc_argv";
                if (sym == "main") {
                  setImport(main_alias);
                }
                if (sym == main_alias) {
                  setImport("main");
                }
              }
            }, "mergeLibSymbols");
            var asyncLoad = /* @__PURE__ */ __name(async (url) => {
              var arrayBuffer = await readAsync(url);
              return new Uint8Array(arrayBuffer);
            }, "asyncLoad");
            function loadDynamicLibrary(libName2, flags2 = {
              global: true,
              nodelete: true
            }, localScope2, handle22) {
              var dso = LDSO.loadedLibsByName[libName2];
              if (dso) {
                if (!flags2.global) {
                  if (localScope2) {
                    Object.assign(localScope2, dso.exports);
                  }
                } else if (!dso.global) {
                  dso.global = true;
                  mergeLibSymbols(dso.exports, libName2);
                }
                if (flags2.nodelete && dso.refcount !== Infinity) {
                  dso.refcount = Infinity;
                }
                dso.refcount++;
                if (handle22) {
                  LDSO.loadedLibsByHandle[handle22] = dso;
                }
                return flags2.loadAsync ? Promise.resolve(true) : true;
              }
              dso = newDSO(libName2, handle22, "loading");
              dso.refcount = flags2.nodelete ? Infinity : 1;
              dso.global = flags2.global;
              function loadLibData() {
                if (handle22) {
                  var data = LE_HEAP_LOAD_U32((handle22 + 28 >> 2) * 4);
                  var dataSize = LE_HEAP_LOAD_U32((handle22 + 32 >> 2) * 4);
                  if (data && dataSize) {
                    var libData = HEAP8.slice(data, data + dataSize);
                    return flags2.loadAsync ? Promise.resolve(libData) : libData;
                  }
                }
                var libFile = locateFile(libName2);
                if (flags2.loadAsync) {
                  return asyncLoad(libFile);
                }
                if (!readBinary) {
                  throw new Error(`${libFile}: file not found, and synchronous loading of external files is not available`);
                }
                return readBinary(libFile);
              }
              __name(loadLibData, "loadLibData");
              function getExports() {
                if (flags2.loadAsync) {
                  return loadLibData().then((libData) => loadWebAssemblyModule(libData, flags2, libName2, localScope2, handle22));
                }
                return loadWebAssemblyModule(loadLibData(), flags2, libName2, localScope2, handle22);
              }
              __name(getExports, "getExports");
              function moduleLoaded(exports2) {
                if (dso.global) {
                  mergeLibSymbols(exports2, libName2);
                } else if (localScope2) {
                  Object.assign(localScope2, exports2);
                }
                dso.exports = exports2;
              }
              __name(moduleLoaded, "moduleLoaded");
              if (flags2.loadAsync) {
                return getExports().then((exports2) => {
                  moduleLoaded(exports2);
                  return true;
                });
              }
              moduleLoaded(getExports());
              return true;
            }
            __name(loadDynamicLibrary, "loadDynamicLibrary");
            var reportUndefinedSymbols = /* @__PURE__ */ __name(() => {
              for (var [symName, entry] of Object.entries(GOT)) {
                if (entry.value == 0) {
                  var value = resolveGlobalSymbol(symName, true).sym;
                  if (!value && !entry.required) {
                    continue;
                  }
                  if (typeof value == "function") {
                    entry.value = addFunction(value, value.sig);
                  } else if (typeof value == "number") {
                    entry.value = value;
                  } else {
                    throw new Error(`bad export type for '${symName}': ${typeof value}`);
                  }
                }
              }
            }, "reportUndefinedSymbols");
            var loadDylibs = /* @__PURE__ */ __name(() => {
              if (!dynamicLibraries.length) {
                reportUndefinedSymbols();
                return;
              }
              addRunDependency("loadDylibs");
              dynamicLibraries.reduce((chain, lib) => chain.then(() => loadDynamicLibrary(lib, {
                loadAsync: true,
                global: true,
                nodelete: true,
                allowUndefined: true
              })), Promise.resolve()).then(() => {
                reportUndefinedSymbols();
                removeRunDependency("loadDylibs");
              });
            }, "loadDylibs");
            var noExitRuntime = Module["noExitRuntime"] || true;
            function setValue(ptr, value, type = "i8") {
              if (type.endsWith("*")) type = "*";
              switch (type) {
                case "i1":
                  HEAP8[ptr] = value;
                  break;
                case "i8":
                  HEAP8[ptr] = value;
                  break;
                case "i16":
                  LE_HEAP_STORE_I16((ptr >> 1) * 2, value);
                  break;
                case "i32":
                  LE_HEAP_STORE_I32((ptr >> 2) * 4, value);
                  break;
                case "i64":
                  HEAP64[ptr >> 3] = BigInt(value);
                  break;
                case "float":
                  LE_HEAP_STORE_F32((ptr >> 2) * 4, value);
                  break;
                case "double":
                  LE_HEAP_STORE_F64((ptr >> 3) * 8, value);
                  break;
                case "*":
                  LE_HEAP_STORE_U32((ptr >> 2) * 4, value);
                  break;
                default:
                  abort(`invalid type for setValue: ${type}`);
              }
            }
            __name(setValue, "setValue");
            var ___memory_base = new WebAssembly.Global({
              "value": "i32",
              "mutable": false
            }, 1024);
            var ___stack_pointer = new WebAssembly.Global({
              "value": "i32",
              "mutable": true
            }, 78224);
            var ___table_base = new WebAssembly.Global({
              "value": "i32",
              "mutable": false
            }, 1);
            var __abort_js = /* @__PURE__ */ __name(() => abort(""), "__abort_js");
            __abort_js.sig = "v";
            var _emscripten_get_now = /* @__PURE__ */ __name(() => performance.now(), "_emscripten_get_now");
            _emscripten_get_now.sig = "d";
            var _emscripten_date_now = /* @__PURE__ */ __name(() => Date.now(), "_emscripten_date_now");
            _emscripten_date_now.sig = "d";
            var nowIsMonotonic = 1;
            var checkWasiClock = /* @__PURE__ */ __name((clock_id) => clock_id >= 0 && clock_id <= 3, "checkWasiClock");
            var INT53_MAX = 9007199254740992;
            var INT53_MIN = -9007199254740992;
            var bigintToI53Checked = /* @__PURE__ */ __name((num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num), "bigintToI53Checked");
            function _clock_time_get(clk_id, ignored_precision, ptime) {
              ignored_precision = bigintToI53Checked(ignored_precision);
              if (!checkWasiClock(clk_id)) {
                return 28;
              }
              var now;
              if (clk_id === 0) {
                now = _emscripten_date_now();
              } else if (nowIsMonotonic) {
                now = _emscripten_get_now();
              } else {
                return 52;
              }
              var nsec = Math.round(now * 1e3 * 1e3);
              HEAP64[ptime >> 3] = BigInt(nsec);
              return 0;
            }
            __name(_clock_time_get, "_clock_time_get");
            _clock_time_get.sig = "iijp";
            var getHeapMax = /* @__PURE__ */ __name(() => (
              // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
              // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
              // for any code that deals with heap sizes, which would require special
              // casing all heap size related code to treat 0 specially.
              2147483648
            ), "getHeapMax");
            var growMemory = /* @__PURE__ */ __name((size) => {
              var b = wasmMemory.buffer;
              var pages = (size - b.byteLength + 65535) / 65536 | 0;
              try {
                wasmMemory.grow(pages);
                updateMemoryViews();
                return 1;
              } catch (e) {
              }
            }, "growMemory");
            var _emscripten_resize_heap = /* @__PURE__ */ __name((requestedSize) => {
              var oldSize = HEAPU8.length;
              requestedSize >>>= 0;
              var maxHeapSize = getHeapMax();
              if (requestedSize > maxHeapSize) {
                return false;
              }
              for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
                overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
                var replacement = growMemory(newSize);
                if (replacement) {
                  return true;
                }
              }
              return false;
            }, "_emscripten_resize_heap");
            _emscripten_resize_heap.sig = "ip";
            var _fd_close = /* @__PURE__ */ __name((fd) => 52, "_fd_close");
            _fd_close.sig = "ii";
            function _fd_seek(fd, offset2, whence, newOffset) {
              offset2 = bigintToI53Checked(offset2);
              return 70;
            }
            __name(_fd_seek, "_fd_seek");
            _fd_seek.sig = "iijip";
            var printCharBuffers = [null, [], []];
            var printChar = /* @__PURE__ */ __name((stream, curr) => {
              var buffer = printCharBuffers[stream];
              if (curr === 0 || curr === 10) {
                (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
                buffer.length = 0;
              } else {
                buffer.push(curr);
              }
            }, "printChar");
            var flush_NO_FILESYSTEM = /* @__PURE__ */ __name(() => {
              if (printCharBuffers[1].length) printChar(1, 10);
              if (printCharBuffers[2].length) printChar(2, 10);
            }, "flush_NO_FILESYSTEM");
            var SYSCALLS = {
              varargs: void 0,
              getStr(ptr) {
                var ret = UTF8ToString(ptr);
                return ret;
              }
            };
            var _fd_write = /* @__PURE__ */ __name((fd, iov, iovcnt, pnum) => {
              var num = 0;
              for (var i2 = 0; i2 < iovcnt; i2++) {
                var ptr = LE_HEAP_LOAD_U32((iov >> 2) * 4);
                var len = LE_HEAP_LOAD_U32((iov + 4 >> 2) * 4);
                iov += 8;
                for (var j = 0; j < len; j++) {
                  printChar(fd, HEAPU8[ptr + j]);
                }
                num += len;
              }
              LE_HEAP_STORE_U32((pnum >> 2) * 4, num);
              return 0;
            }, "_fd_write");
            _fd_write.sig = "iippp";
            function _tree_sitter_log_callback(isLexMessage, messageAddress) {
              if (Module.currentLogCallback) {
                const message = UTF8ToString(messageAddress);
                Module.currentLogCallback(message, isLexMessage !== 0);
              }
            }
            __name(_tree_sitter_log_callback, "_tree_sitter_log_callback");
            function _tree_sitter_parse_callback(inputBufferAddress, index, row, column, lengthAddress) {
              const INPUT_BUFFER_SIZE = 10 * 1024;
              const string = Module.currentParseCallback(index, {
                row,
                column
              });
              if (typeof string === "string") {
                setValue(lengthAddress, string.length, "i32");
                stringToUTF16(string, inputBufferAddress, INPUT_BUFFER_SIZE);
              } else {
                setValue(lengthAddress, 0, "i32");
              }
            }
            __name(_tree_sitter_parse_callback, "_tree_sitter_parse_callback");
            function _tree_sitter_progress_callback(currentOffset, hasError) {
              if (Module.currentProgressCallback) {
                return Module.currentProgressCallback({
                  currentOffset,
                  hasError
                });
              }
              return false;
            }
            __name(_tree_sitter_progress_callback, "_tree_sitter_progress_callback");
            function _tree_sitter_query_progress_callback(currentOffset) {
              if (Module.currentQueryProgressCallback) {
                return Module.currentQueryProgressCallback({
                  currentOffset
                });
              }
              return false;
            }
            __name(_tree_sitter_query_progress_callback, "_tree_sitter_query_progress_callback");
            var runtimeKeepaliveCounter = 0;
            var keepRuntimeAlive = /* @__PURE__ */ __name(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive");
            var _proc_exit = /* @__PURE__ */ __name((code) => {
              EXITSTATUS = code;
              if (!keepRuntimeAlive()) {
                Module["onExit"]?.(code);
                ABORT = true;
              }
              quit_(code, new ExitStatus(code));
            }, "_proc_exit");
            _proc_exit.sig = "vi";
            var exitJS = /* @__PURE__ */ __name((status, implicit) => {
              EXITSTATUS = status;
              _proc_exit(status);
            }, "exitJS");
            var handleException = /* @__PURE__ */ __name((e) => {
              if (e instanceof ExitStatus || e == "unwind") {
                return EXITSTATUS;
              }
              quit_(1, e);
            }, "handleException");
            var lengthBytesUTF8 = /* @__PURE__ */ __name((str) => {
              var len = 0;
              for (var i2 = 0; i2 < str.length; ++i2) {
                var c = str.charCodeAt(i2);
                if (c <= 127) {
                  len++;
                } else if (c <= 2047) {
                  len += 2;
                } else if (c >= 55296 && c <= 57343) {
                  len += 4;
                  ++i2;
                } else {
                  len += 3;
                }
              }
              return len;
            }, "lengthBytesUTF8");
            var stringToUTF8Array = /* @__PURE__ */ __name((str, heap, outIdx, maxBytesToWrite) => {
              if (!(maxBytesToWrite > 0)) return 0;
              var startIdx = outIdx;
              var endIdx = outIdx + maxBytesToWrite - 1;
              for (var i2 = 0; i2 < str.length; ++i2) {
                var u = str.charCodeAt(i2);
                if (u >= 55296 && u <= 57343) {
                  var u1 = str.charCodeAt(++i2);
                  u = 65536 + ((u & 1023) << 10) | u1 & 1023;
                }
                if (u <= 127) {
                  if (outIdx >= endIdx) break;
                  heap[outIdx++] = u;
                } else if (u <= 2047) {
                  if (outIdx + 1 >= endIdx) break;
                  heap[outIdx++] = 192 | u >> 6;
                  heap[outIdx++] = 128 | u & 63;
                } else if (u <= 65535) {
                  if (outIdx + 2 >= endIdx) break;
                  heap[outIdx++] = 224 | u >> 12;
                  heap[outIdx++] = 128 | u >> 6 & 63;
                  heap[outIdx++] = 128 | u & 63;
                } else {
                  if (outIdx + 3 >= endIdx) break;
                  heap[outIdx++] = 240 | u >> 18;
                  heap[outIdx++] = 128 | u >> 12 & 63;
                  heap[outIdx++] = 128 | u >> 6 & 63;
                  heap[outIdx++] = 128 | u & 63;
                }
              }
              heap[outIdx] = 0;
              return outIdx - startIdx;
            }, "stringToUTF8Array");
            var stringToUTF8 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite), "stringToUTF8");
            var stackAlloc = /* @__PURE__ */ __name((sz) => __emscripten_stack_alloc(sz), "stackAlloc");
            var stringToUTF8OnStack = /* @__PURE__ */ __name((str) => {
              var size = lengthBytesUTF8(str) + 1;
              var ret = stackAlloc(size);
              stringToUTF8(str, ret, size);
              return ret;
            }, "stringToUTF8OnStack");
            var AsciiToString = /* @__PURE__ */ __name((ptr) => {
              var str = "";
              while (1) {
                var ch = HEAPU8[ptr++];
                if (!ch) return str;
                str += String.fromCharCode(ch);
              }
            }, "AsciiToString");
            var stringToUTF16 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => {
              maxBytesToWrite ??= 2147483647;
              if (maxBytesToWrite < 2) return 0;
              maxBytesToWrite -= 2;
              var startPtr = outPtr;
              var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
              for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
                var codeUnit = str.charCodeAt(i2);
                LE_HEAP_STORE_I16((outPtr >> 1) * 2, codeUnit);
                outPtr += 2;
              }
              LE_HEAP_STORE_I16((outPtr >> 1) * 2, 0);
              return outPtr - startPtr;
            }, "stringToUTF16");
            var wasmImports = {
              /** @export */
              __heap_base: ___heap_base,
              /** @export */
              __indirect_function_table: wasmTable,
              /** @export */
              __memory_base: ___memory_base,
              /** @export */
              __stack_pointer: ___stack_pointer,
              /** @export */
              __table_base: ___table_base,
              /** @export */
              _abort_js: __abort_js,
              /** @export */
              clock_time_get: _clock_time_get,
              /** @export */
              emscripten_resize_heap: _emscripten_resize_heap,
              /** @export */
              fd_close: _fd_close,
              /** @export */
              fd_seek: _fd_seek,
              /** @export */
              fd_write: _fd_write,
              /** @export */
              memory: wasmMemory,
              /** @export */
              tree_sitter_log_callback: _tree_sitter_log_callback,
              /** @export */
              tree_sitter_parse_callback: _tree_sitter_parse_callback,
              /** @export */
              tree_sitter_progress_callback: _tree_sitter_progress_callback,
              /** @export */
              tree_sitter_query_progress_callback: _tree_sitter_query_progress_callback
            };
            var wasmExports = await createWasm();
            var ___wasm_call_ctors = wasmExports["__wasm_call_ctors"];
            var _malloc = Module["_malloc"] = wasmExports["malloc"];
            var _calloc = Module["_calloc"] = wasmExports["calloc"];
            var _realloc = Module["_realloc"] = wasmExports["realloc"];
            var _free = Module["_free"] = wasmExports["free"];
            var _memcmp = Module["_memcmp"] = wasmExports["memcmp"];
            var _ts_language_symbol_count = Module["_ts_language_symbol_count"] = wasmExports["ts_language_symbol_count"];
            var _ts_language_state_count = Module["_ts_language_state_count"] = wasmExports["ts_language_state_count"];
            var _ts_language_version = Module["_ts_language_version"] = wasmExports["ts_language_version"];
            var _ts_language_abi_version = Module["_ts_language_abi_version"] = wasmExports["ts_language_abi_version"];
            var _ts_language_metadata = Module["_ts_language_metadata"] = wasmExports["ts_language_metadata"];
            var _ts_language_name = Module["_ts_language_name"] = wasmExports["ts_language_name"];
            var _ts_language_field_count = Module["_ts_language_field_count"] = wasmExports["ts_language_field_count"];
            var _ts_language_next_state = Module["_ts_language_next_state"] = wasmExports["ts_language_next_state"];
            var _ts_language_symbol_name = Module["_ts_language_symbol_name"] = wasmExports["ts_language_symbol_name"];
            var _ts_language_symbol_for_name = Module["_ts_language_symbol_for_name"] = wasmExports["ts_language_symbol_for_name"];
            var _strncmp = Module["_strncmp"] = wasmExports["strncmp"];
            var _ts_language_symbol_type = Module["_ts_language_symbol_type"] = wasmExports["ts_language_symbol_type"];
            var _ts_language_field_name_for_id = Module["_ts_language_field_name_for_id"] = wasmExports["ts_language_field_name_for_id"];
            var _ts_lookahead_iterator_new = Module["_ts_lookahead_iterator_new"] = wasmExports["ts_lookahead_iterator_new"];
            var _ts_lookahead_iterator_delete = Module["_ts_lookahead_iterator_delete"] = wasmExports["ts_lookahead_iterator_delete"];
            var _ts_lookahead_iterator_reset_state = Module["_ts_lookahead_iterator_reset_state"] = wasmExports["ts_lookahead_iterator_reset_state"];
            var _ts_lookahead_iterator_reset = Module["_ts_lookahead_iterator_reset"] = wasmExports["ts_lookahead_iterator_reset"];
            var _ts_lookahead_iterator_next = Module["_ts_lookahead_iterator_next"] = wasmExports["ts_lookahead_iterator_next"];
            var _ts_lookahead_iterator_current_symbol = Module["_ts_lookahead_iterator_current_symbol"] = wasmExports["ts_lookahead_iterator_current_symbol"];
            var _ts_parser_delete = Module["_ts_parser_delete"] = wasmExports["ts_parser_delete"];
            var _ts_parser_reset = Module["_ts_parser_reset"] = wasmExports["ts_parser_reset"];
            var _ts_parser_set_language = Module["_ts_parser_set_language"] = wasmExports["ts_parser_set_language"];
            var _ts_parser_timeout_micros = Module["_ts_parser_timeout_micros"] = wasmExports["ts_parser_timeout_micros"];
            var _ts_parser_set_timeout_micros = Module["_ts_parser_set_timeout_micros"] = wasmExports["ts_parser_set_timeout_micros"];
            var _ts_parser_set_included_ranges = Module["_ts_parser_set_included_ranges"] = wasmExports["ts_parser_set_included_ranges"];
            var _ts_query_new = Module["_ts_query_new"] = wasmExports["ts_query_new"];
            var _ts_query_delete = Module["_ts_query_delete"] = wasmExports["ts_query_delete"];
            var _iswspace = Module["_iswspace"] = wasmExports["iswspace"];
            var _iswalnum = Module["_iswalnum"] = wasmExports["iswalnum"];
            var _ts_query_pattern_count = Module["_ts_query_pattern_count"] = wasmExports["ts_query_pattern_count"];
            var _ts_query_capture_count = Module["_ts_query_capture_count"] = wasmExports["ts_query_capture_count"];
            var _ts_query_string_count = Module["_ts_query_string_count"] = wasmExports["ts_query_string_count"];
            var _ts_query_capture_name_for_id = Module["_ts_query_capture_name_for_id"] = wasmExports["ts_query_capture_name_for_id"];
            var _ts_query_capture_quantifier_for_id = Module["_ts_query_capture_quantifier_for_id"] = wasmExports["ts_query_capture_quantifier_for_id"];
            var _ts_query_string_value_for_id = Module["_ts_query_string_value_for_id"] = wasmExports["ts_query_string_value_for_id"];
            var _ts_query_predicates_for_pattern = Module["_ts_query_predicates_for_pattern"] = wasmExports["ts_query_predicates_for_pattern"];
            var _ts_query_start_byte_for_pattern = Module["_ts_query_start_byte_for_pattern"] = wasmExports["ts_query_start_byte_for_pattern"];
            var _ts_query_end_byte_for_pattern = Module["_ts_query_end_byte_for_pattern"] = wasmExports["ts_query_end_byte_for_pattern"];
            var _ts_query_is_pattern_rooted = Module["_ts_query_is_pattern_rooted"] = wasmExports["ts_query_is_pattern_rooted"];
            var _ts_query_is_pattern_non_local = Module["_ts_query_is_pattern_non_local"] = wasmExports["ts_query_is_pattern_non_local"];
            var _ts_query_is_pattern_guaranteed_at_step = Module["_ts_query_is_pattern_guaranteed_at_step"] = wasmExports["ts_query_is_pattern_guaranteed_at_step"];
            var _ts_query_disable_capture = Module["_ts_query_disable_capture"] = wasmExports["ts_query_disable_capture"];
            var _ts_query_disable_pattern = Module["_ts_query_disable_pattern"] = wasmExports["ts_query_disable_pattern"];
            var _ts_tree_copy = Module["_ts_tree_copy"] = wasmExports["ts_tree_copy"];
            var _ts_tree_delete = Module["_ts_tree_delete"] = wasmExports["ts_tree_delete"];
            var _ts_init = Module["_ts_init"] = wasmExports["ts_init"];
            var _ts_parser_new_wasm = Module["_ts_parser_new_wasm"] = wasmExports["ts_parser_new_wasm"];
            var _ts_parser_enable_logger_wasm = Module["_ts_parser_enable_logger_wasm"] = wasmExports["ts_parser_enable_logger_wasm"];
            var _ts_parser_parse_wasm = Module["_ts_parser_parse_wasm"] = wasmExports["ts_parser_parse_wasm"];
            var _ts_parser_included_ranges_wasm = Module["_ts_parser_included_ranges_wasm"] = wasmExports["ts_parser_included_ranges_wasm"];
            var _ts_language_type_is_named_wasm = Module["_ts_language_type_is_named_wasm"] = wasmExports["ts_language_type_is_named_wasm"];
            var _ts_language_type_is_visible_wasm = Module["_ts_language_type_is_visible_wasm"] = wasmExports["ts_language_type_is_visible_wasm"];
            var _ts_language_supertypes_wasm = Module["_ts_language_supertypes_wasm"] = wasmExports["ts_language_supertypes_wasm"];
            var _ts_language_subtypes_wasm = Module["_ts_language_subtypes_wasm"] = wasmExports["ts_language_subtypes_wasm"];
            var _ts_tree_root_node_wasm = Module["_ts_tree_root_node_wasm"] = wasmExports["ts_tree_root_node_wasm"];
            var _ts_tree_root_node_with_offset_wasm = Module["_ts_tree_root_node_with_offset_wasm"] = wasmExports["ts_tree_root_node_with_offset_wasm"];
            var _ts_tree_edit_wasm = Module["_ts_tree_edit_wasm"] = wasmExports["ts_tree_edit_wasm"];
            var _ts_tree_included_ranges_wasm = Module["_ts_tree_included_ranges_wasm"] = wasmExports["ts_tree_included_ranges_wasm"];
            var _ts_tree_get_changed_ranges_wasm = Module["_ts_tree_get_changed_ranges_wasm"] = wasmExports["ts_tree_get_changed_ranges_wasm"];
            var _ts_tree_cursor_new_wasm = Module["_ts_tree_cursor_new_wasm"] = wasmExports["ts_tree_cursor_new_wasm"];
            var _ts_tree_cursor_copy_wasm = Module["_ts_tree_cursor_copy_wasm"] = wasmExports["ts_tree_cursor_copy_wasm"];
            var _ts_tree_cursor_delete_wasm = Module["_ts_tree_cursor_delete_wasm"] = wasmExports["ts_tree_cursor_delete_wasm"];
            var _ts_tree_cursor_reset_wasm = Module["_ts_tree_cursor_reset_wasm"] = wasmExports["ts_tree_cursor_reset_wasm"];
            var _ts_tree_cursor_reset_to_wasm = Module["_ts_tree_cursor_reset_to_wasm"] = wasmExports["ts_tree_cursor_reset_to_wasm"];
            var _ts_tree_cursor_goto_first_child_wasm = Module["_ts_tree_cursor_goto_first_child_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_wasm"];
            var _ts_tree_cursor_goto_last_child_wasm = Module["_ts_tree_cursor_goto_last_child_wasm"] = wasmExports["ts_tree_cursor_goto_last_child_wasm"];
            var _ts_tree_cursor_goto_first_child_for_index_wasm = Module["_ts_tree_cursor_goto_first_child_for_index_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_for_index_wasm"];
            var _ts_tree_cursor_goto_first_child_for_position_wasm = Module["_ts_tree_cursor_goto_first_child_for_position_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_for_position_wasm"];
            var _ts_tree_cursor_goto_next_sibling_wasm = Module["_ts_tree_cursor_goto_next_sibling_wasm"] = wasmExports["ts_tree_cursor_goto_next_sibling_wasm"];
            var _ts_tree_cursor_goto_previous_sibling_wasm = Module["_ts_tree_cursor_goto_previous_sibling_wasm"] = wasmExports["ts_tree_cursor_goto_previous_sibling_wasm"];
            var _ts_tree_cursor_goto_descendant_wasm = Module["_ts_tree_cursor_goto_descendant_wasm"] = wasmExports["ts_tree_cursor_goto_descendant_wasm"];
            var _ts_tree_cursor_goto_parent_wasm = Module["_ts_tree_cursor_goto_parent_wasm"] = wasmExports["ts_tree_cursor_goto_parent_wasm"];
            var _ts_tree_cursor_current_node_type_id_wasm = Module["_ts_tree_cursor_current_node_type_id_wasm"] = wasmExports["ts_tree_cursor_current_node_type_id_wasm"];
            var _ts_tree_cursor_current_node_state_id_wasm = Module["_ts_tree_cursor_current_node_state_id_wasm"] = wasmExports["ts_tree_cursor_current_node_state_id_wasm"];
            var _ts_tree_cursor_current_node_is_named_wasm = Module["_ts_tree_cursor_current_node_is_named_wasm"] = wasmExports["ts_tree_cursor_current_node_is_named_wasm"];
            var _ts_tree_cursor_current_node_is_missing_wasm = Module["_ts_tree_cursor_current_node_is_missing_wasm"] = wasmExports["ts_tree_cursor_current_node_is_missing_wasm"];
            var _ts_tree_cursor_current_node_id_wasm = Module["_ts_tree_cursor_current_node_id_wasm"] = wasmExports["ts_tree_cursor_current_node_id_wasm"];
            var _ts_tree_cursor_start_position_wasm = Module["_ts_tree_cursor_start_position_wasm"] = wasmExports["ts_tree_cursor_start_position_wasm"];
            var _ts_tree_cursor_end_position_wasm = Module["_ts_tree_cursor_end_position_wasm"] = wasmExports["ts_tree_cursor_end_position_wasm"];
            var _ts_tree_cursor_start_index_wasm = Module["_ts_tree_cursor_start_index_wasm"] = wasmExports["ts_tree_cursor_start_index_wasm"];
            var _ts_tree_cursor_end_index_wasm = Module["_ts_tree_cursor_end_index_wasm"] = wasmExports["ts_tree_cursor_end_index_wasm"];
            var _ts_tree_cursor_current_field_id_wasm = Module["_ts_tree_cursor_current_field_id_wasm"] = wasmExports["ts_tree_cursor_current_field_id_wasm"];
            var _ts_tree_cursor_current_depth_wasm = Module["_ts_tree_cursor_current_depth_wasm"] = wasmExports["ts_tree_cursor_current_depth_wasm"];
            var _ts_tree_cursor_current_descendant_index_wasm = Module["_ts_tree_cursor_current_descendant_index_wasm"] = wasmExports["ts_tree_cursor_current_descendant_index_wasm"];
            var _ts_tree_cursor_current_node_wasm = Module["_ts_tree_cursor_current_node_wasm"] = wasmExports["ts_tree_cursor_current_node_wasm"];
            var _ts_node_symbol_wasm = Module["_ts_node_symbol_wasm"] = wasmExports["ts_node_symbol_wasm"];
            var _ts_node_field_name_for_child_wasm = Module["_ts_node_field_name_for_child_wasm"] = wasmExports["ts_node_field_name_for_child_wasm"];
            var _ts_node_field_name_for_named_child_wasm = Module["_ts_node_field_name_for_named_child_wasm"] = wasmExports["ts_node_field_name_for_named_child_wasm"];
            var _ts_node_children_by_field_id_wasm = Module["_ts_node_children_by_field_id_wasm"] = wasmExports["ts_node_children_by_field_id_wasm"];
            var _ts_node_first_child_for_byte_wasm = Module["_ts_node_first_child_for_byte_wasm"] = wasmExports["ts_node_first_child_for_byte_wasm"];
            var _ts_node_first_named_child_for_byte_wasm = Module["_ts_node_first_named_child_for_byte_wasm"] = wasmExports["ts_node_first_named_child_for_byte_wasm"];
            var _ts_node_grammar_symbol_wasm = Module["_ts_node_grammar_symbol_wasm"] = wasmExports["ts_node_grammar_symbol_wasm"];
            var _ts_node_child_count_wasm = Module["_ts_node_child_count_wasm"] = wasmExports["ts_node_child_count_wasm"];
            var _ts_node_named_child_count_wasm = Module["_ts_node_named_child_count_wasm"] = wasmExports["ts_node_named_child_count_wasm"];
            var _ts_node_child_wasm = Module["_ts_node_child_wasm"] = wasmExports["ts_node_child_wasm"];
            var _ts_node_named_child_wasm = Module["_ts_node_named_child_wasm"] = wasmExports["ts_node_named_child_wasm"];
            var _ts_node_child_by_field_id_wasm = Module["_ts_node_child_by_field_id_wasm"] = wasmExports["ts_node_child_by_field_id_wasm"];
            var _ts_node_next_sibling_wasm = Module["_ts_node_next_sibling_wasm"] = wasmExports["ts_node_next_sibling_wasm"];
            var _ts_node_prev_sibling_wasm = Module["_ts_node_prev_sibling_wasm"] = wasmExports["ts_node_prev_sibling_wasm"];
            var _ts_node_next_named_sibling_wasm = Module["_ts_node_next_named_sibling_wasm"] = wasmExports["ts_node_next_named_sibling_wasm"];
            var _ts_node_prev_named_sibling_wasm = Module["_ts_node_prev_named_sibling_wasm"] = wasmExports["ts_node_prev_named_sibling_wasm"];
            var _ts_node_descendant_count_wasm = Module["_ts_node_descendant_count_wasm"] = wasmExports["ts_node_descendant_count_wasm"];
            var _ts_node_parent_wasm = Module["_ts_node_parent_wasm"] = wasmExports["ts_node_parent_wasm"];
            var _ts_node_child_with_descendant_wasm = Module["_ts_node_child_with_descendant_wasm"] = wasmExports["ts_node_child_with_descendant_wasm"];
            var _ts_node_descendant_for_index_wasm = Module["_ts_node_descendant_for_index_wasm"] = wasmExports["ts_node_descendant_for_index_wasm"];
            var _ts_node_named_descendant_for_index_wasm = Module["_ts_node_named_descendant_for_index_wasm"] = wasmExports["ts_node_named_descendant_for_index_wasm"];
            var _ts_node_descendant_for_position_wasm = Module["_ts_node_descendant_for_position_wasm"] = wasmExports["ts_node_descendant_for_position_wasm"];
            var _ts_node_named_descendant_for_position_wasm = Module["_ts_node_named_descendant_for_position_wasm"] = wasmExports["ts_node_named_descendant_for_position_wasm"];
            var _ts_node_start_point_wasm = Module["_ts_node_start_point_wasm"] = wasmExports["ts_node_start_point_wasm"];
            var _ts_node_end_point_wasm = Module["_ts_node_end_point_wasm"] = wasmExports["ts_node_end_point_wasm"];
            var _ts_node_start_index_wasm = Module["_ts_node_start_index_wasm"] = wasmExports["ts_node_start_index_wasm"];
            var _ts_node_end_index_wasm = Module["_ts_node_end_index_wasm"] = wasmExports["ts_node_end_index_wasm"];
            var _ts_node_to_string_wasm = Module["_ts_node_to_string_wasm"] = wasmExports["ts_node_to_string_wasm"];
            var _ts_node_children_wasm = Module["_ts_node_children_wasm"] = wasmExports["ts_node_children_wasm"];
            var _ts_node_named_children_wasm = Module["_ts_node_named_children_wasm"] = wasmExports["ts_node_named_children_wasm"];
            var _ts_node_descendants_of_type_wasm = Module["_ts_node_descendants_of_type_wasm"] = wasmExports["ts_node_descendants_of_type_wasm"];
            var _ts_node_is_named_wasm = Module["_ts_node_is_named_wasm"] = wasmExports["ts_node_is_named_wasm"];
            var _ts_node_has_changes_wasm = Module["_ts_node_has_changes_wasm"] = wasmExports["ts_node_has_changes_wasm"];
            var _ts_node_has_error_wasm = Module["_ts_node_has_error_wasm"] = wasmExports["ts_node_has_error_wasm"];
            var _ts_node_is_error_wasm = Module["_ts_node_is_error_wasm"] = wasmExports["ts_node_is_error_wasm"];
            var _ts_node_is_missing_wasm = Module["_ts_node_is_missing_wasm"] = wasmExports["ts_node_is_missing_wasm"];
            var _ts_node_is_extra_wasm = Module["_ts_node_is_extra_wasm"] = wasmExports["ts_node_is_extra_wasm"];
            var _ts_node_parse_state_wasm = Module["_ts_node_parse_state_wasm"] = wasmExports["ts_node_parse_state_wasm"];
            var _ts_node_next_parse_state_wasm = Module["_ts_node_next_parse_state_wasm"] = wasmExports["ts_node_next_parse_state_wasm"];
            var _ts_query_matches_wasm = Module["_ts_query_matches_wasm"] = wasmExports["ts_query_matches_wasm"];
            var _ts_query_captures_wasm = Module["_ts_query_captures_wasm"] = wasmExports["ts_query_captures_wasm"];
            var _memset = Module["_memset"] = wasmExports["memset"];
            var _memcpy = Module["_memcpy"] = wasmExports["memcpy"];
            var _memmove = Module["_memmove"] = wasmExports["memmove"];
            var _iswalpha = Module["_iswalpha"] = wasmExports["iswalpha"];
            var _iswblank = Module["_iswblank"] = wasmExports["iswblank"];
            var _iswdigit = Module["_iswdigit"] = wasmExports["iswdigit"];
            var _iswlower = Module["_iswlower"] = wasmExports["iswlower"];
            var _iswupper = Module["_iswupper"] = wasmExports["iswupper"];
            var _iswxdigit = Module["_iswxdigit"] = wasmExports["iswxdigit"];
            var _memchr = Module["_memchr"] = wasmExports["memchr"];
            var _strlen = Module["_strlen"] = wasmExports["strlen"];
            var _strcmp = Module["_strcmp"] = wasmExports["strcmp"];
            var _strncat = Module["_strncat"] = wasmExports["strncat"];
            var _strncpy = Module["_strncpy"] = wasmExports["strncpy"];
            var _towlower = Module["_towlower"] = wasmExports["towlower"];
            var _towupper = Module["_towupper"] = wasmExports["towupper"];
            var _setThrew = wasmExports["setThrew"];
            var __emscripten_stack_restore = wasmExports["_emscripten_stack_restore"];
            var __emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"];
            var _emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"];
            var ___wasm_apply_data_relocs = wasmExports["__wasm_apply_data_relocs"];
            Module["setValue"] = setValue;
            Module["getValue"] = getValue;
            Module["UTF8ToString"] = UTF8ToString;
            Module["stringToUTF8"] = stringToUTF8;
            Module["lengthBytesUTF8"] = lengthBytesUTF8;
            Module["AsciiToString"] = AsciiToString;
            Module["stringToUTF16"] = stringToUTF16;
            Module["loadWebAssemblyModule"] = loadWebAssemblyModule;
            function callMain(args2 = []) {
              var entryFunction = resolveGlobalSymbol("main").sym;
              if (!entryFunction) return;
              args2.unshift(thisProgram);
              var argc = args2.length;
              var argv = stackAlloc((argc + 1) * 4);
              var argv_ptr = argv;
              args2.forEach((arg) => {
                LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, stringToUTF8OnStack(arg));
                argv_ptr += 4;
              });
              LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, 0);
              try {
                var ret = entryFunction(argc, argv);
                exitJS(
                  ret,
                  /* implicit = */
                  true
                );
                return ret;
              } catch (e) {
                return handleException(e);
              }
            }
            __name(callMain, "callMain");
            function run(args2 = arguments_) {
              if (runDependencies > 0) {
                dependenciesFulfilled = run;
                return;
              }
              preRun();
              if (runDependencies > 0) {
                dependenciesFulfilled = run;
                return;
              }
              function doRun() {
                Module["calledRun"] = true;
                if (ABORT) return;
                initRuntime();
                preMain();
                readyPromiseResolve(Module);
                Module["onRuntimeInitialized"]?.();
                var noInitialRun = Module["noInitialRun"];
                if (!noInitialRun) callMain(args2);
                postRun();
              }
              __name(doRun, "doRun");
              if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(() => {
                  setTimeout(() => Module["setStatus"](""), 1);
                  doRun();
                }, 1);
              } else {
                doRun();
              }
            }
            __name(run, "run");
            if (Module["preInit"]) {
              if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
              while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
              }
            }
            run();
            moduleRtn = readyPromise;
            return moduleRtn;
          };
        })();
        if (typeof exports === "object" && typeof module === "object") {
          module.exports = Module;
          module.exports.default = Module;
        } else if (typeof define === "function" && define["amd"])
          define([], () => Module);
      }
    });
    var index_exports = {};
    __export(index_exports, {
      CaptureQuantifier: () => CaptureQuantifier,
      LANGUAGE_VERSION: () => LANGUAGE_VERSION,
      Language: () => Language,
      LookaheadIterator: () => LookaheadIterator,
      MIN_COMPATIBLE_VERSION: () => MIN_COMPATIBLE_VERSION,
      Node: () => Node,
      Parser: () => Parser,
      Query: () => Query,
      Tree: () => Tree,
      TreeCursor: () => TreeCursor
    });
    module.exports = __toCommonJS(index_exports);
    var SIZE_OF_SHORT = 2;
    var SIZE_OF_INT = 4;
    var SIZE_OF_CURSOR = 4 * SIZE_OF_INT;
    var SIZE_OF_NODE = 5 * SIZE_OF_INT;
    var SIZE_OF_POINT = 2 * SIZE_OF_INT;
    var SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT;
    var ZERO_POINT = { row: 0, column: 0 };
    var INTERNAL = Symbol("INTERNAL");
    function assertInternal(x) {
      if (x !== INTERNAL) throw new Error("Illegal constructor");
    }
    __name(assertInternal, "assertInternal");
    function isPoint(point) {
      return !!point && typeof point.row === "number" && typeof point.column === "number";
    }
    __name(isPoint, "isPoint");
    function setModule(module2) {
      C = module2;
    }
    __name(setModule, "setModule");
    var C;
    var LookaheadIterator = class {
      static {
        __name(this, "LookaheadIterator");
      }
      /** @internal */
      [0] = 0;
      // Internal handle for WASM
      /** @internal */
      language;
      /** @internal */
      constructor(internal, address, language) {
        assertInternal(internal);
        this[0] = address;
        this.language = language;
      }
      /** Get the current symbol of the lookahead iterator. */
      get currentTypeId() {
        return C._ts_lookahead_iterator_current_symbol(this[0]);
      }
      /** Get the current symbol name of the lookahead iterator. */
      get currentType() {
        return this.language.types[this.currentTypeId] || "ERROR";
      }
      /** Delete the lookahead iterator, freeing its resources. */
      delete() {
        C._ts_lookahead_iterator_delete(this[0]);
        this[0] = 0;
      }
      /**
       * Reset the lookahead iterator.
       *
       * This returns `true` if the language was set successfully and `false`
       * otherwise.
       */
      reset(language, stateId) {
        if (C._ts_lookahead_iterator_reset(this[0], language[0], stateId)) {
          this.language = language;
          return true;
        }
        return false;
      }
      /**
       * Reset the lookahead iterator to another state.
       *
       * This returns `true` if the iterator was reset to the given state and
       * `false` otherwise.
       */
      resetState(stateId) {
        return Boolean(C._ts_lookahead_iterator_reset_state(this[0], stateId));
      }
      /**
       * Returns an iterator that iterates over the symbols of the lookahead iterator.
       *
       * The iterator will yield the current symbol name as a string for each step
       * until there are no more symbols to iterate over.
       */
      [Symbol.iterator]() {
        return {
          next: /* @__PURE__ */ __name(() => {
            if (C._ts_lookahead_iterator_next(this[0])) {
              return { done: false, value: this.currentType };
            }
            return { done: true, value: "" };
          }, "next")
        };
      }
    };
    function getText(tree, startIndex, endIndex, startPosition) {
      const length = endIndex - startIndex;
      let result = tree.textCallback(startIndex, startPosition);
      if (result) {
        startIndex += result.length;
        while (startIndex < endIndex) {
          const string = tree.textCallback(startIndex, startPosition);
          if (string && string.length > 0) {
            startIndex += string.length;
            result += string;
          } else {
            break;
          }
        }
        if (startIndex > endIndex) {
          result = result.slice(0, length);
        }
      }
      return result ?? "";
    }
    __name(getText, "getText");
    var Tree = class _Tree {
      static {
        __name(this, "Tree");
      }
      /** @internal */
      [0] = 0;
      // Internal handle for WASM
      /** @internal */
      textCallback;
      /** The language that was used to parse the syntax tree. */
      language;
      /** @internal */
      constructor(internal, address, language, textCallback) {
        assertInternal(internal);
        this[0] = address;
        this.language = language;
        this.textCallback = textCallback;
      }
      /** Create a shallow copy of the syntax tree. This is very fast. */
      copy() {
        const address = C._ts_tree_copy(this[0]);
        return new _Tree(INTERNAL, address, this.language, this.textCallback);
      }
      /** Delete the syntax tree, freeing its resources. */
      delete() {
        C._ts_tree_delete(this[0]);
        this[0] = 0;
      }
      /** Get the root node of the syntax tree. */
      get rootNode() {
        C._ts_tree_root_node_wasm(this[0]);
        return unmarshalNode(this);
      }
      /**
       * Get the root node of the syntax tree, but with its position shifted
       * forward by the given offset.
       */
      rootNodeWithOffset(offsetBytes, offsetExtent) {
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        C.setValue(address, offsetBytes, "i32");
        marshalPoint(address + SIZE_OF_INT, offsetExtent);
        C._ts_tree_root_node_with_offset_wasm(this[0]);
        return unmarshalNode(this);
      }
      /**
       * Edit the syntax tree to keep it in sync with source code that has been
       * edited.
       *
       * You must describe the edit both in terms of byte offsets and in terms of
       * row/column coordinates.
       */
      edit(edit) {
        marshalEdit(edit);
        C._ts_tree_edit_wasm(this[0]);
      }
      /** Create a new {@link TreeCursor} starting from the root of the tree. */
      walk() {
        return this.rootNode.walk();
      }
      /**
       * Compare this old edited syntax tree to a new syntax tree representing
       * the same document, returning a sequence of ranges whose syntactic
       * structure has changed.
       *
       * For this to work correctly, this syntax tree must have been edited such
       * that its ranges match up to the new tree. Generally, you'll want to
       * call this method right after calling one of the [`Parser::parse`]
       * functions. Call it on the old tree that was passed to parse, and
       * pass the new tree that was returned from `parse`.
       */
      getChangedRanges(other) {
        if (!(other instanceof _Tree)) {
          throw new TypeError("Argument must be a Tree");
        }
        C._ts_tree_get_changed_ranges_wasm(this[0], other[0]);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = unmarshalRange(address);
            address += SIZE_OF_RANGE;
          }
          C._free(buffer);
        }
        return result;
      }
      /** Get the included ranges that were used to parse the syntax tree. */
      getIncludedRanges() {
        C._ts_tree_included_ranges_wasm(this[0]);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = unmarshalRange(address);
            address += SIZE_OF_RANGE;
          }
          C._free(buffer);
        }
        return result;
      }
    };
    var TreeCursor = class _TreeCursor {
      static {
        __name(this, "TreeCursor");
      }
      /** @internal */
      // @ts-expect-error: never read
      [0] = 0;
      // Internal handle for Wasm
      /** @internal */
      // @ts-expect-error: never read
      [1] = 0;
      // Internal handle for Wasm
      /** @internal */
      // @ts-expect-error: never read
      [2] = 0;
      // Internal handle for Wasm
      /** @internal */
      // @ts-expect-error: never read
      [3] = 0;
      // Internal handle for Wasm
      /** @internal */
      tree;
      /** @internal */
      constructor(internal, tree) {
        assertInternal(internal);
        this.tree = tree;
        unmarshalTreeCursor(this);
      }
      /** Creates a deep copy of the tree cursor. This allocates new memory. */
      copy() {
        const copy = new _TreeCursor(INTERNAL, this.tree);
        C._ts_tree_cursor_copy_wasm(this.tree[0]);
        unmarshalTreeCursor(copy);
        return copy;
      }
      /** Delete the tree cursor, freeing its resources. */
      delete() {
        marshalTreeCursor(this);
        C._ts_tree_cursor_delete_wasm(this.tree[0]);
        this[0] = this[1] = this[2] = 0;
      }
      /** Get the tree cursor's current {@link Node}. */
      get currentNode() {
        marshalTreeCursor(this);
        C._ts_tree_cursor_current_node_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /**
       * Get the numerical field id of this tree cursor's current node.
       *
       * See also {@link TreeCursor#currentFieldName}.
       */
      get currentFieldId() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
      }
      /** Get the field name of this tree cursor's current node. */
      get currentFieldName() {
        return this.tree.language.fields[this.currentFieldId];
      }
      /**
       * Get the depth of the cursor's current node relative to the original
       * node that the cursor was constructed with.
       */
      get currentDepth() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_depth_wasm(this.tree[0]);
      }
      /**
       * Get the index of the cursor's current node out of all of the
       * descendants of the original node that the cursor was constructed with.
       */
      get currentDescendantIndex() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]);
      }
      /** Get the type of the cursor's current node. */
      get nodeType() {
        return this.tree.language.types[this.nodeTypeId] || "ERROR";
      }
      /** Get the type id of the cursor's current node. */
      get nodeTypeId() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
      }
      /** Get the state id of the cursor's current node. */
      get nodeStateId() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]);
      }
      /** Get the id of the cursor's current node. */
      get nodeId() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
      }
      /**
       * Check if the cursor's current node is *named*.
       *
       * Named nodes correspond to named rules in the grammar, whereas
       * *anonymous* nodes correspond to string literals in the grammar.
       */
      get nodeIsNamed() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1;
      }
      /**
       * Check if the cursor's current node is *missing*.
       *
       * Missing nodes are inserted by the parser in order to recover from
       * certain kinds of syntax errors.
       */
      get nodeIsMissing() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1;
      }
      /** Get the string content of the cursor's current node. */
      get nodeText() {
        marshalTreeCursor(this);
        const startIndex = C._ts_tree_cursor_start_index_wasm(this.tree[0]);
        const endIndex = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
        C._ts_tree_cursor_start_position_wasm(this.tree[0]);
        const startPosition = unmarshalPoint(TRANSFER_BUFFER);
        return getText(this.tree, startIndex, endIndex, startPosition);
      }
      /** Get the start position of the cursor's current node. */
      get startPosition() {
        marshalTreeCursor(this);
        C._ts_tree_cursor_start_position_wasm(this.tree[0]);
        return unmarshalPoint(TRANSFER_BUFFER);
      }
      /** Get the end position of the cursor's current node. */
      get endPosition() {
        marshalTreeCursor(this);
        C._ts_tree_cursor_end_position_wasm(this.tree[0]);
        return unmarshalPoint(TRANSFER_BUFFER);
      }
      /** Get the start index of the cursor's current node. */
      get startIndex() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_start_index_wasm(this.tree[0]);
      }
      /** Get the end index of the cursor's current node. */
      get endIndex() {
        marshalTreeCursor(this);
        return C._ts_tree_cursor_end_index_wasm(this.tree[0]);
      }
      /**
       * Move this cursor to the first child of its current node.
       *
       * This returns `true` if the cursor successfully moved, and returns
       * `false` if there were no children.
       */
      gotoFirstChild() {
        marshalTreeCursor(this);
        const result = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move this cursor to the last child of its current node.
       *
       * This returns `true` if the cursor successfully moved, and returns
       * `false` if there were no children.
       *
       * Note that this function may be slower than
       * {@link TreeCursor#gotoFirstChild} because it needs to
       * iterate through all the children to compute the child's position.
       */
      gotoLastChild() {
        marshalTreeCursor(this);
        const result = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move this cursor to the parent of its current node.
       *
       * This returns `true` if the cursor successfully moved, and returns
       * `false` if there was no parent node (the cursor was already on the
       * root node).
       *
       * Note that the node the cursor was constructed with is considered the root
       * of the cursor, and the cursor cannot walk outside this node.
       */
      gotoParent() {
        marshalTreeCursor(this);
        const result = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move this cursor to the next sibling of its current node.
       *
       * This returns `true` if the cursor successfully moved, and returns
       * `false` if there was no next sibling node.
       *
       * Note that the node the cursor was constructed with is considered the root
       * of the cursor, and the cursor cannot walk outside this node.
       */
      gotoNextSibling() {
        marshalTreeCursor(this);
        const result = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move this cursor to the previous sibling of its current node.
       *
       * This returns `true` if the cursor successfully moved, and returns
       * `false` if there was no previous sibling node.
       *
       * Note that this function may be slower than
       * {@link TreeCursor#gotoNextSibling} due to how node
       * positions are stored. In the worst case, this will need to iterate
       * through all the children up to the previous sibling node to recalculate
       * its position. Also note that the node the cursor was constructed with is
       * considered the root of the cursor, and the cursor cannot walk outside this node.
       */
      gotoPreviousSibling() {
        marshalTreeCursor(this);
        const result = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move the cursor to the node that is the nth descendant of
       * the original node that the cursor was constructed with, where
       * zero represents the original node itself.
       */
      gotoDescendant(goalDescendantIndex) {
        marshalTreeCursor(this);
        C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], goalDescendantIndex);
        unmarshalTreeCursor(this);
      }
      /**
       * Move this cursor to the first child of its current node that contains or
       * starts after the given byte offset.
       *
       * This returns `true` if the cursor successfully moved to a child node, and returns
       * `false` if no such child was found.
       */
      gotoFirstChildForIndex(goalIndex) {
        marshalTreeCursor(this);
        C.setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, goalIndex, "i32");
        const result = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Move this cursor to the first child of its current node that contains or
       * starts after the given byte offset.
       *
       * This returns the index of the child node if one was found, and returns
       * `null` if no such child was found.
       */
      gotoFirstChildForPosition(goalPosition) {
        marshalTreeCursor(this);
        marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, goalPosition);
        const result = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
        return result === 1;
      }
      /**
       * Re-initialize this tree cursor to start at the original node that the
       * cursor was constructed with.
       */
      reset(node) {
        marshalNode(node);
        marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE);
        C._ts_tree_cursor_reset_wasm(this.tree[0]);
        unmarshalTreeCursor(this);
      }
      /**
       * Re-initialize a tree cursor to the same position as another cursor.
       *
       * Unlike {@link TreeCursor#reset}, this will not lose parent
       * information and allows reusing already created cursors.
       */
      resetTo(cursor) {
        marshalTreeCursor(this, TRANSFER_BUFFER);
        marshalTreeCursor(cursor, TRANSFER_BUFFER + SIZE_OF_CURSOR);
        C._ts_tree_cursor_reset_to_wasm(this.tree[0], cursor.tree[0]);
        unmarshalTreeCursor(this);
      }
    };
    var Node = class {
      static {
        __name(this, "Node");
      }
      /** @internal */
      // @ts-expect-error: never read
      [0] = 0;
      // Internal handle for Wasm
      /** @internal */
      _children;
      /** @internal */
      _namedChildren;
      /** @internal */
      constructor(internal, {
        id,
        tree,
        startIndex,
        startPosition,
        other
      }) {
        assertInternal(internal);
        this[0] = other;
        this.id = id;
        this.tree = tree;
        this.startIndex = startIndex;
        this.startPosition = startPosition;
      }
      /**
       * The numeric id for this node that is unique.
       *
       * Within a given syntax tree, no two nodes have the same id. However:
       *
       * * If a new tree is created based on an older tree, and a node from the old tree is reused in
       *   the process, then that node will have the same id in both trees.
       *
       * * A node not marked as having changes does not guarantee it was reused.
       *
       * * If a node is marked as having changed in the old tree, it will not be reused.
       */
      id;
      /** The byte index where this node starts. */
      startIndex;
      /** The position where this node starts. */
      startPosition;
      /** The tree that this node belongs to. */
      tree;
      /** Get this node's type as a numerical id. */
      get typeId() {
        marshalNode(this);
        return C._ts_node_symbol_wasm(this.tree[0]);
      }
      /**
       * Get the node's type as a numerical id as it appears in the grammar,
       * ignoring aliases.
       */
      get grammarId() {
        marshalNode(this);
        return C._ts_node_grammar_symbol_wasm(this.tree[0]);
      }
      /** Get this node's type as a string. */
      get type() {
        return this.tree.language.types[this.typeId] || "ERROR";
      }
      /**
       * Get this node's symbol name as it appears in the grammar, ignoring
       * aliases as a string.
       */
      get grammarType() {
        return this.tree.language.types[this.grammarId] || "ERROR";
      }
      /**
       * Check if this node is *named*.
       *
       * Named nodes correspond to named rules in the grammar, whereas
       * *anonymous* nodes correspond to string literals in the grammar.
       */
      get isNamed() {
        marshalNode(this);
        return C._ts_node_is_named_wasm(this.tree[0]) === 1;
      }
      /**
       * Check if this node is *extra*.
       *
       * Extra nodes represent things like comments, which are not required
       * by the grammar, but can appear anywhere.
       */
      get isExtra() {
        marshalNode(this);
        return C._ts_node_is_extra_wasm(this.tree[0]) === 1;
      }
      /**
       * Check if this node represents a syntax error.
       *
       * Syntax errors represent parts of the code that could not be incorporated
       * into a valid syntax tree.
       */
      get isError() {
        marshalNode(this);
        return C._ts_node_is_error_wasm(this.tree[0]) === 1;
      }
      /**
       * Check if this node is *missing*.
       *
       * Missing nodes are inserted by the parser in order to recover from
       * certain kinds of syntax errors.
       */
      get isMissing() {
        marshalNode(this);
        return C._ts_node_is_missing_wasm(this.tree[0]) === 1;
      }
      /** Check if this node has been edited. */
      get hasChanges() {
        marshalNode(this);
        return C._ts_node_has_changes_wasm(this.tree[0]) === 1;
      }
      /**
       * Check if this node represents a syntax error or contains any syntax
       * errors anywhere within it.
       */
      get hasError() {
        marshalNode(this);
        return C._ts_node_has_error_wasm(this.tree[0]) === 1;
      }
      /** Get the byte index where this node ends. */
      get endIndex() {
        marshalNode(this);
        return C._ts_node_end_index_wasm(this.tree[0]);
      }
      /** Get the position where this node ends. */
      get endPosition() {
        marshalNode(this);
        C._ts_node_end_point_wasm(this.tree[0]);
        return unmarshalPoint(TRANSFER_BUFFER);
      }
      /** Get the string content of this node. */
      get text() {
        return getText(this.tree, this.startIndex, this.endIndex, this.startPosition);
      }
      /** Get this node's parse state. */
      get parseState() {
        marshalNode(this);
        return C._ts_node_parse_state_wasm(this.tree[0]);
      }
      /** Get the parse state after this node. */
      get nextParseState() {
        marshalNode(this);
        return C._ts_node_next_parse_state_wasm(this.tree[0]);
      }
      /** Check if this node is equal to another node. */
      equals(other) {
        return this.tree === other.tree && this.id === other.id;
      }
      /**
       * Get the node's child at the given index, where zero represents the first child.
       *
       * This method is fairly fast, but its cost is technically log(n), so if
       * you might be iterating over a long list of children, you should use
       * {@link Node#children} instead.
       */
      child(index) {
        marshalNode(this);
        C._ts_node_child_wasm(this.tree[0], index);
        return unmarshalNode(this.tree);
      }
      /**
       * Get this node's *named* child at the given index.
       *
       * See also {@link Node#isNamed}.
       * This method is fairly fast, but its cost is technically log(n), so if
       * you might be iterating over a long list of children, you should use
       * {@link Node#namedChildren} instead.
       */
      namedChild(index) {
        marshalNode(this);
        C._ts_node_named_child_wasm(this.tree[0], index);
        return unmarshalNode(this.tree);
      }
      /**
       * Get this node's child with the given numerical field id.
       *
       * See also {@link Node#childForFieldName}. You can
       * convert a field name to an id using {@link Language#fieldIdForName}.
       */
      childForFieldId(fieldId) {
        marshalNode(this);
        C._ts_node_child_by_field_id_wasm(this.tree[0], fieldId);
        return unmarshalNode(this.tree);
      }
      /**
       * Get the first child with the given field name.
       *
       * If multiple children may have the same field name, access them using
       * {@link Node#childrenForFieldName}.
       */
      childForFieldName(fieldName) {
        const fieldId = this.tree.language.fields.indexOf(fieldName);
        if (fieldId !== -1) return this.childForFieldId(fieldId);
        return null;
      }
      /** Get the field name of this node's child at the given index. */
      fieldNameForChild(index) {
        marshalNode(this);
        const address = C._ts_node_field_name_for_child_wasm(this.tree[0], index);
        if (!address) return null;
        return C.AsciiToString(address);
      }
      /** Get the field name of this node's named child at the given index. */
      fieldNameForNamedChild(index) {
        marshalNode(this);
        const address = C._ts_node_field_name_for_named_child_wasm(this.tree[0], index);
        if (!address) return null;
        return C.AsciiToString(address);
      }
      /**
       * Get an array of this node's children with a given field name.
       *
       * See also {@link Node#children}.
       */
      childrenForFieldName(fieldName) {
        const fieldId = this.tree.language.fields.indexOf(fieldName);
        if (fieldId !== -1 && fieldId !== 0) return this.childrenForFieldId(fieldId);
        return [];
      }
      /**
        * Get an array of this node's children with a given field id.
        *
        * See also {@link Node#childrenForFieldName}.
        */
      childrenForFieldId(fieldId) {
        marshalNode(this);
        C._ts_node_children_by_field_id_wasm(this.tree[0], fieldId);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = unmarshalNode(this.tree, address);
            address += SIZE_OF_NODE;
          }
          C._free(buffer);
        }
        return result;
      }
      /** Get the node's first child that contains or starts after the given byte offset. */
      firstChildForIndex(index) {
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        C.setValue(address, index, "i32");
        C._ts_node_first_child_for_byte_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the node's first named child that contains or starts after the given byte offset. */
      firstNamedChildForIndex(index) {
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        C.setValue(address, index, "i32");
        C._ts_node_first_named_child_for_byte_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get this node's number of children. */
      get childCount() {
        marshalNode(this);
        return C._ts_node_child_count_wasm(this.tree[0]);
      }
      /**
       * Get this node's number of *named* children.
       *
       * See also {@link Node#isNamed}.
       */
      get namedChildCount() {
        marshalNode(this);
        return C._ts_node_named_child_count_wasm(this.tree[0]);
      }
      /** Get this node's first child. */
      get firstChild() {
        return this.child(0);
      }
      /**
       * Get this node's first named child.
       *
       * See also {@link Node#isNamed}.
       */
      get firstNamedChild() {
        return this.namedChild(0);
      }
      /** Get this node's last child. */
      get lastChild() {
        return this.child(this.childCount - 1);
      }
      /**
       * Get this node's last named child.
       *
       * See also {@link Node#isNamed}.
       */
      get lastNamedChild() {
        return this.namedChild(this.namedChildCount - 1);
      }
      /**
       * Iterate over this node's children.
       *
       * If you're walking the tree recursively, you may want to use the
       * {@link TreeCursor} APIs directly instead.
       */
      get children() {
        if (!this._children) {
          marshalNode(this);
          C._ts_node_children_wasm(this.tree[0]);
          const count = C.getValue(TRANSFER_BUFFER, "i32");
          const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
          this._children = new Array(count);
          if (count > 0) {
            let address = buffer;
            for (let i2 = 0; i2 < count; i2++) {
              this._children[i2] = unmarshalNode(this.tree, address);
              address += SIZE_OF_NODE;
            }
            C._free(buffer);
          }
        }
        return this._children;
      }
      /**
       * Iterate over this node's named children.
       *
       * See also {@link Node#children}.
       */
      get namedChildren() {
        if (!this._namedChildren) {
          marshalNode(this);
          C._ts_node_named_children_wasm(this.tree[0]);
          const count = C.getValue(TRANSFER_BUFFER, "i32");
          const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
          this._namedChildren = new Array(count);
          if (count > 0) {
            let address = buffer;
            for (let i2 = 0; i2 < count; i2++) {
              this._namedChildren[i2] = unmarshalNode(this.tree, address);
              address += SIZE_OF_NODE;
            }
            C._free(buffer);
          }
        }
        return this._namedChildren;
      }
      /**
       * Get the descendants of this node that are the given type, or in the given types array.
       *
       * The types array should contain node type strings, which can be retrieved from {@link Language#types}.
       *
       * Additionally, a `startPosition` and `endPosition` can be passed in to restrict the search to a byte range.
       */
      descendantsOfType(types, startPosition = ZERO_POINT, endPosition = ZERO_POINT) {
        if (!Array.isArray(types)) types = [types];
        const symbols = [];
        const typesBySymbol = this.tree.language.types;
        for (const node_type of types) {
          if (node_type == "ERROR") {
            symbols.push(65535);
          }
        }
        for (let i2 = 0, n = typesBySymbol.length; i2 < n; i2++) {
          if (types.includes(typesBySymbol[i2])) {
            symbols.push(i2);
          }
        }
        const symbolsAddress = C._malloc(SIZE_OF_INT * symbols.length);
        for (let i2 = 0, n = symbols.length; i2 < n; i2++) {
          C.setValue(symbolsAddress + i2 * SIZE_OF_INT, symbols[i2], "i32");
        }
        marshalNode(this);
        C._ts_node_descendants_of_type_wasm(
          this.tree[0],
          symbolsAddress,
          symbols.length,
          startPosition.row,
          startPosition.column,
          endPosition.row,
          endPosition.column
        );
        const descendantCount = C.getValue(TRANSFER_BUFFER, "i32");
        const descendantAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(descendantCount);
        if (descendantCount > 0) {
          let address = descendantAddress;
          for (let i2 = 0; i2 < descendantCount; i2++) {
            result[i2] = unmarshalNode(this.tree, address);
            address += SIZE_OF_NODE;
          }
        }
        C._free(descendantAddress);
        C._free(symbolsAddress);
        return result;
      }
      /** Get this node's next sibling. */
      get nextSibling() {
        marshalNode(this);
        C._ts_node_next_sibling_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get this node's previous sibling. */
      get previousSibling() {
        marshalNode(this);
        C._ts_node_prev_sibling_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /**
       * Get this node's next *named* sibling.
       *
       * See also {@link Node#isNamed}.
       */
      get nextNamedSibling() {
        marshalNode(this);
        C._ts_node_next_named_sibling_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /**
       * Get this node's previous *named* sibling.
       *
       * See also {@link Node#isNamed}.
       */
      get previousNamedSibling() {
        marshalNode(this);
        C._ts_node_prev_named_sibling_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the node's number of descendants, including one for the node itself. */
      get descendantCount() {
        marshalNode(this);
        return C._ts_node_descendant_count_wasm(this.tree[0]);
      }
      /**
       * Get this node's immediate parent.
       * Prefer {@link Node#childWithDescendant} for iterating over this node's ancestors.
       */
      get parent() {
        marshalNode(this);
        C._ts_node_parent_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /**
       * Get the node that contains `descendant`.
       *
       * Note that this can return `descendant` itself.
       */
      childWithDescendant(descendant) {
        marshalNode(this);
        marshalNode(descendant, 1);
        C._ts_node_child_with_descendant_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the smallest node within this node that spans the given byte range. */
      descendantForIndex(start2, end = start2) {
        if (typeof start2 !== "number" || typeof end !== "number") {
          throw new Error("Arguments must be numbers");
        }
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        C.setValue(address, start2, "i32");
        C.setValue(address + SIZE_OF_INT, end, "i32");
        C._ts_node_descendant_for_index_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the smallest named node within this node that spans the given byte range. */
      namedDescendantForIndex(start2, end = start2) {
        if (typeof start2 !== "number" || typeof end !== "number") {
          throw new Error("Arguments must be numbers");
        }
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        C.setValue(address, start2, "i32");
        C.setValue(address + SIZE_OF_INT, end, "i32");
        C._ts_node_named_descendant_for_index_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the smallest node within this node that spans the given point range. */
      descendantForPosition(start2, end = start2) {
        if (!isPoint(start2) || !isPoint(end)) {
          throw new Error("Arguments must be {row, column} objects");
        }
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        marshalPoint(address, start2);
        marshalPoint(address + SIZE_OF_POINT, end);
        C._ts_node_descendant_for_position_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /** Get the smallest named node within this node that spans the given point range. */
      namedDescendantForPosition(start2, end = start2) {
        if (!isPoint(start2) || !isPoint(end)) {
          throw new Error("Arguments must be {row, column} objects");
        }
        marshalNode(this);
        const address = TRANSFER_BUFFER + SIZE_OF_NODE;
        marshalPoint(address, start2);
        marshalPoint(address + SIZE_OF_POINT, end);
        C._ts_node_named_descendant_for_position_wasm(this.tree[0]);
        return unmarshalNode(this.tree);
      }
      /**
       * Create a new {@link TreeCursor} starting from this node.
       *
       * Note that the given node is considered the root of the cursor,
       * and the cursor cannot walk outside this node.
       */
      walk() {
        marshalNode(this);
        C._ts_tree_cursor_new_wasm(this.tree[0]);
        return new TreeCursor(INTERNAL, this.tree);
      }
      /**
       * Edit this node to keep it in-sync with source code that has been edited.
       *
       * This function is only rarely needed. When you edit a syntax tree with
       * the {@link Tree#edit} method, all of the nodes that you retrieve from
       * the tree afterward will already reflect the edit. You only need to
       * use {@link Node#edit} when you have a specific {@link Node} instance that
       * you want to keep and continue to use after an edit.
       */
      edit(edit) {
        if (this.startIndex >= edit.oldEndIndex) {
          this.startIndex = edit.newEndIndex + (this.startIndex - edit.oldEndIndex);
          let subbedPointRow;
          let subbedPointColumn;
          if (this.startPosition.row > edit.oldEndPosition.row) {
            subbedPointRow = this.startPosition.row - edit.oldEndPosition.row;
            subbedPointColumn = this.startPosition.column;
          } else {
            subbedPointRow = 0;
            subbedPointColumn = this.startPosition.column;
            if (this.startPosition.column >= edit.oldEndPosition.column) {
              subbedPointColumn = this.startPosition.column - edit.oldEndPosition.column;
            }
          }
          if (subbedPointRow > 0) {
            this.startPosition.row += subbedPointRow;
            this.startPosition.column = subbedPointColumn;
          } else {
            this.startPosition.column += subbedPointColumn;
          }
        } else if (this.startIndex > edit.startIndex) {
          this.startIndex = edit.newEndIndex;
          this.startPosition.row = edit.newEndPosition.row;
          this.startPosition.column = edit.newEndPosition.column;
        }
      }
      /** Get the S-expression representation of this node. */
      toString() {
        marshalNode(this);
        const address = C._ts_node_to_string_wasm(this.tree[0]);
        const result = C.AsciiToString(address);
        C._free(address);
        return result;
      }
    };
    function unmarshalCaptures(query, tree, address, patternIndex, result) {
      for (let i2 = 0, n = result.length; i2 < n; i2++) {
        const captureIndex = C.getValue(address, "i32");
        address += SIZE_OF_INT;
        const node = unmarshalNode(tree, address);
        address += SIZE_OF_NODE;
        result[i2] = { patternIndex, name: query.captureNames[captureIndex], node };
      }
      return address;
    }
    __name(unmarshalCaptures, "unmarshalCaptures");
    function marshalNode(node, index = 0) {
      let address = TRANSFER_BUFFER + index * SIZE_OF_NODE;
      C.setValue(address, node.id, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, node.startIndex, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, node.startPosition.row, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, node.startPosition.column, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, node[0], "i32");
    }
    __name(marshalNode, "marshalNode");
    function unmarshalNode(tree, address = TRANSFER_BUFFER) {
      const id = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      if (id === 0) return null;
      const index = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const row = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const column = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const other = C.getValue(address, "i32");
      const result = new Node(INTERNAL, {
        id,
        tree,
        startIndex: index,
        startPosition: { row, column },
        other
      });
      return result;
    }
    __name(unmarshalNode, "unmarshalNode");
    function marshalTreeCursor(cursor, address = TRANSFER_BUFFER) {
      C.setValue(address + 0 * SIZE_OF_INT, cursor[0], "i32");
      C.setValue(address + 1 * SIZE_OF_INT, cursor[1], "i32");
      C.setValue(address + 2 * SIZE_OF_INT, cursor[2], "i32");
      C.setValue(address + 3 * SIZE_OF_INT, cursor[3], "i32");
    }
    __name(marshalTreeCursor, "marshalTreeCursor");
    function unmarshalTreeCursor(cursor) {
      cursor[0] = C.getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32");
      cursor[1] = C.getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32");
      cursor[2] = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
      cursor[3] = C.getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32");
    }
    __name(unmarshalTreeCursor, "unmarshalTreeCursor");
    function marshalPoint(address, point) {
      C.setValue(address, point.row, "i32");
      C.setValue(address + SIZE_OF_INT, point.column, "i32");
    }
    __name(marshalPoint, "marshalPoint");
    function unmarshalPoint(address) {
      const result = {
        row: C.getValue(address, "i32") >>> 0,
        column: C.getValue(address + SIZE_OF_INT, "i32") >>> 0
      };
      return result;
    }
    __name(unmarshalPoint, "unmarshalPoint");
    function marshalRange(address, range) {
      marshalPoint(address, range.startPosition);
      address += SIZE_OF_POINT;
      marshalPoint(address, range.endPosition);
      address += SIZE_OF_POINT;
      C.setValue(address, range.startIndex, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, range.endIndex, "i32");
      address += SIZE_OF_INT;
    }
    __name(marshalRange, "marshalRange");
    function unmarshalRange(address) {
      const result = {};
      result.startPosition = unmarshalPoint(address);
      address += SIZE_OF_POINT;
      result.endPosition = unmarshalPoint(address);
      address += SIZE_OF_POINT;
      result.startIndex = C.getValue(address, "i32") >>> 0;
      address += SIZE_OF_INT;
      result.endIndex = C.getValue(address, "i32") >>> 0;
      return result;
    }
    __name(unmarshalRange, "unmarshalRange");
    function marshalEdit(edit, address = TRANSFER_BUFFER) {
      marshalPoint(address, edit.startPosition);
      address += SIZE_OF_POINT;
      marshalPoint(address, edit.oldEndPosition);
      address += SIZE_OF_POINT;
      marshalPoint(address, edit.newEndPosition);
      address += SIZE_OF_POINT;
      C.setValue(address, edit.startIndex, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, edit.oldEndIndex, "i32");
      address += SIZE_OF_INT;
      C.setValue(address, edit.newEndIndex, "i32");
      address += SIZE_OF_INT;
    }
    __name(marshalEdit, "marshalEdit");
    function unmarshalLanguageMetadata(address) {
      const major_version = C.getValue(address, "i32");
      const minor_version = C.getValue(address += SIZE_OF_INT, "i32");
      const patch_version = C.getValue(address += SIZE_OF_INT, "i32");
      return { major_version, minor_version, patch_version };
    }
    __name(unmarshalLanguageMetadata, "unmarshalLanguageMetadata");
    var PREDICATE_STEP_TYPE_CAPTURE = 1;
    var PREDICATE_STEP_TYPE_STRING = 2;
    var QUERY_WORD_REGEX = /[\w-]+/g;
    var CaptureQuantifier = {
      Zero: 0,
      ZeroOrOne: 1,
      ZeroOrMore: 2,
      One: 3,
      OneOrMore: 4
    };
    var isCaptureStep = /* @__PURE__ */ __name((step) => step.type === "capture", "isCaptureStep");
    var isStringStep = /* @__PURE__ */ __name((step) => step.type === "string", "isStringStep");
    var QueryErrorKind = {
      Syntax: 1,
      NodeName: 2,
      FieldName: 3,
      CaptureName: 4,
      PatternStructure: 5
    };
    var QueryError = class _QueryError extends Error {
      constructor(kind, info2, index, length) {
        super(_QueryError.formatMessage(kind, info2));
        this.kind = kind;
        this.info = info2;
        this.index = index;
        this.length = length;
        this.name = "QueryError";
      }
      static {
        __name(this, "QueryError");
      }
      /** Formats an error message based on the error kind and info */
      static formatMessage(kind, info2) {
        switch (kind) {
          case QueryErrorKind.NodeName:
            return `Bad node name '${info2.word}'`;
          case QueryErrorKind.FieldName:
            return `Bad field name '${info2.word}'`;
          case QueryErrorKind.CaptureName:
            return `Bad capture name @${info2.word}`;
          case QueryErrorKind.PatternStructure:
            return `Bad pattern structure at offset ${info2.suffix}`;
          case QueryErrorKind.Syntax:
            return `Bad syntax at offset ${info2.suffix}`;
        }
      }
    };
    function parseAnyPredicate(steps, index, operator, textPredicates) {
      if (steps.length !== 3) {
        throw new Error(
          `Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}`
        );
      }
      if (!isCaptureStep(steps[1])) {
        throw new Error(
          `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}"`
        );
      }
      const isPositive = operator === "eq?" || operator === "any-eq?";
      const matchAll = !operator.startsWith("any-");
      if (isCaptureStep(steps[2])) {
        const captureName1 = steps[1].name;
        const captureName2 = steps[2].name;
        textPredicates[index].push((captures) => {
          const nodes1 = [];
          const nodes2 = [];
          for (const c of captures) {
            if (c.name === captureName1) nodes1.push(c.node);
            if (c.name === captureName2) nodes2.push(c.node);
          }
          const compare = /* @__PURE__ */ __name((n1, n2, positive) => {
            return positive ? n1.text === n2.text : n1.text !== n2.text;
          }, "compare");
          return matchAll ? nodes1.every((n1) => nodes2.some((n2) => compare(n1, n2, isPositive))) : nodes1.some((n1) => nodes2.some((n2) => compare(n1, n2, isPositive)));
        });
      } else {
        const captureName = steps[1].name;
        const stringValue2 = steps[2].value;
        const matches = /* @__PURE__ */ __name((n) => n.text === stringValue2, "matches");
        const doesNotMatch = /* @__PURE__ */ __name((n) => n.text !== stringValue2, "doesNotMatch");
        textPredicates[index].push((captures) => {
          const nodes = [];
          for (const c of captures) {
            if (c.name === captureName) nodes.push(c.node);
          }
          const test = isPositive ? matches : doesNotMatch;
          return matchAll ? nodes.every(test) : nodes.some(test);
        });
      }
    }
    __name(parseAnyPredicate, "parseAnyPredicate");
    function parseMatchPredicate(steps, index, operator, textPredicates) {
      if (steps.length !== 3) {
        throw new Error(
          `Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}.`
        );
      }
      if (steps[1].type !== "capture") {
        throw new Error(
          `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`
        );
      }
      if (steps[2].type !== "string") {
        throw new Error(
          `Second argument of \`#${operator}\` predicate must be a string. Got @${steps[2].name}.`
        );
      }
      const isPositive = operator === "match?" || operator === "any-match?";
      const matchAll = !operator.startsWith("any-");
      const captureName = steps[1].name;
      const regex = new RegExp(steps[2].value);
      textPredicates[index].push((captures) => {
        const nodes = [];
        for (const c of captures) {
          if (c.name === captureName) nodes.push(c.node.text);
        }
        const test = /* @__PURE__ */ __name((text, positive) => {
          return positive ? regex.test(text) : !regex.test(text);
        }, "test");
        if (nodes.length === 0) return !isPositive;
        return matchAll ? nodes.every((text) => test(text, isPositive)) : nodes.some((text) => test(text, isPositive));
      });
    }
    __name(parseMatchPredicate, "parseMatchPredicate");
    function parseAnyOfPredicate(steps, index, operator, textPredicates) {
      if (steps.length < 2) {
        throw new Error(
          `Wrong number of arguments to \`#${operator}\` predicate. Expected at least 1. Got ${steps.length - 1}.`
        );
      }
      if (steps[1].type !== "capture") {
        throw new Error(
          `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`
        );
      }
      const isPositive = operator === "any-of?";
      const captureName = steps[1].name;
      const stringSteps = steps.slice(2);
      if (!stringSteps.every(isStringStep)) {
        throw new Error(
          `Arguments to \`#${operator}\` predicate must be strings.".`
        );
      }
      const values = stringSteps.map((s) => s.value);
      textPredicates[index].push((captures) => {
        const nodes = [];
        for (const c of captures) {
          if (c.name === captureName) nodes.push(c.node.text);
        }
        if (nodes.length === 0) return !isPositive;
        return nodes.every((text) => values.includes(text)) === isPositive;
      });
    }
    __name(parseAnyOfPredicate, "parseAnyOfPredicate");
    function parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties) {
      if (steps.length < 2 || steps.length > 3) {
        throw new Error(
          `Wrong number of arguments to \`#${operator}\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`
        );
      }
      if (!steps.every(isStringStep)) {
        throw new Error(
          `Arguments to \`#${operator}\` predicate must be strings.".`
        );
      }
      const properties = operator === "is?" ? assertedProperties : refutedProperties;
      if (!properties[index]) properties[index] = {};
      properties[index][steps[1].value] = steps[2]?.value ?? null;
    }
    __name(parseIsPredicate, "parseIsPredicate");
    function parseSetDirective(steps, index, setProperties) {
      if (steps.length < 2 || steps.length > 3) {
        throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`);
      }
      if (!steps.every(isStringStep)) {
        throw new Error(`Arguments to \`#set!\` predicate must be strings.".`);
      }
      if (!setProperties[index]) setProperties[index] = {};
      setProperties[index][steps[1].value] = steps[2]?.value ?? null;
    }
    __name(parseSetDirective, "parseSetDirective");
    function parsePattern(index, stepType, stepValueId, captureNames, stringValues, steps, textPredicates, predicates, setProperties, assertedProperties, refutedProperties) {
      if (stepType === PREDICATE_STEP_TYPE_CAPTURE) {
        const name2 = captureNames[stepValueId];
        steps.push({ type: "capture", name: name2 });
      } else if (stepType === PREDICATE_STEP_TYPE_STRING) {
        steps.push({ type: "string", value: stringValues[stepValueId] });
      } else if (steps.length > 0) {
        if (steps[0].type !== "string") {
          throw new Error("Predicates must begin with a literal value");
        }
        const operator = steps[0].value;
        switch (operator) {
          case "any-not-eq?":
          case "not-eq?":
          case "any-eq?":
          case "eq?":
            parseAnyPredicate(steps, index, operator, textPredicates);
            break;
          case "any-not-match?":
          case "not-match?":
          case "any-match?":
          case "match?":
            parseMatchPredicate(steps, index, operator, textPredicates);
            break;
          case "not-any-of?":
          case "any-of?":
            parseAnyOfPredicate(steps, index, operator, textPredicates);
            break;
          case "is?":
          case "is-not?":
            parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties);
            break;
          case "set!":
            parseSetDirective(steps, index, setProperties);
            break;
          default:
            predicates[index].push({ operator, operands: steps.slice(1) });
        }
        steps.length = 0;
      }
    }
    __name(parsePattern, "parsePattern");
    var Query = class {
      static {
        __name(this, "Query");
      }
      /** @internal */
      [0] = 0;
      // Internal handle for WASM
      /** @internal */
      exceededMatchLimit;
      /** @internal */
      textPredicates;
      /** The names of the captures used in the query. */
      captureNames;
      /** The quantifiers of the captures used in the query. */
      captureQuantifiers;
      /**
       * The other user-defined predicates associated with the given index.
       *
       * This includes predicates with operators other than:
       * - `match?`
       * - `eq?` and `not-eq?`
       * - `any-of?` and `not-any-of?`
       * - `is?` and `is-not?`
       * - `set!`
       */
      predicates;
      /** The properties for predicates with the operator `set!`. */
      setProperties;
      /** The properties for predicates with the operator `is?`. */
      assertedProperties;
      /** The properties for predicates with the operator `is-not?`. */
      refutedProperties;
      /** The maximum number of in-progress matches for this cursor. */
      matchLimit;
      /**
       * Create a new query from a string containing one or more S-expression
       * patterns.
       *
       * The query is associated with a particular language, and can only be run
       * on syntax nodes parsed with that language. References to Queries can be
       * shared between multiple threads.
       *
       * @link {@see https://tree-sitter.github.io/tree-sitter/using-parsers/queries}
       */
      constructor(language, source) {
        const sourceLength = C.lengthBytesUTF8(source);
        const sourceAddress = C._malloc(sourceLength + 1);
        C.stringToUTF8(source, sourceAddress, sourceLength + 1);
        const address = C._ts_query_new(
          language[0],
          sourceAddress,
          sourceLength,
          TRANSFER_BUFFER,
          TRANSFER_BUFFER + SIZE_OF_INT
        );
        if (!address) {
          const errorId = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
          const errorByte = C.getValue(TRANSFER_BUFFER, "i32");
          const errorIndex = C.UTF8ToString(sourceAddress, errorByte).length;
          const suffix = source.slice(errorIndex, errorIndex + 100).split("\n")[0];
          const word = suffix.match(QUERY_WORD_REGEX)?.[0] ?? "";
          C._free(sourceAddress);
          switch (errorId) {
            case QueryErrorKind.Syntax:
              throw new QueryError(QueryErrorKind.Syntax, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0);
            case QueryErrorKind.NodeName:
              throw new QueryError(errorId, { word }, errorIndex, word.length);
            case QueryErrorKind.FieldName:
              throw new QueryError(errorId, { word }, errorIndex, word.length);
            case QueryErrorKind.CaptureName:
              throw new QueryError(errorId, { word }, errorIndex, word.length);
            case QueryErrorKind.PatternStructure:
              throw new QueryError(errorId, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0);
          }
        }
        const stringCount = C._ts_query_string_count(address);
        const captureCount = C._ts_query_capture_count(address);
        const patternCount = C._ts_query_pattern_count(address);
        const captureNames = new Array(captureCount);
        const captureQuantifiers = new Array(patternCount);
        const stringValues = new Array(stringCount);
        for (let i2 = 0; i2 < captureCount; i2++) {
          const nameAddress = C._ts_query_capture_name_for_id(
            address,
            i2,
            TRANSFER_BUFFER
          );
          const nameLength = C.getValue(TRANSFER_BUFFER, "i32");
          captureNames[i2] = C.UTF8ToString(nameAddress, nameLength);
        }
        for (let i2 = 0; i2 < patternCount; i2++) {
          const captureQuantifiersArray = new Array(captureCount);
          for (let j = 0; j < captureCount; j++) {
            const quantifier = C._ts_query_capture_quantifier_for_id(address, i2, j);
            captureQuantifiersArray[j] = quantifier;
          }
          captureQuantifiers[i2] = captureQuantifiersArray;
        }
        for (let i2 = 0; i2 < stringCount; i2++) {
          const valueAddress = C._ts_query_string_value_for_id(
            address,
            i2,
            TRANSFER_BUFFER
          );
          const nameLength = C.getValue(TRANSFER_BUFFER, "i32");
          stringValues[i2] = C.UTF8ToString(valueAddress, nameLength);
        }
        const setProperties = new Array(patternCount);
        const assertedProperties = new Array(patternCount);
        const refutedProperties = new Array(patternCount);
        const predicates = new Array(patternCount);
        const textPredicates = new Array(patternCount);
        for (let i2 = 0; i2 < patternCount; i2++) {
          const predicatesAddress = C._ts_query_predicates_for_pattern(address, i2, TRANSFER_BUFFER);
          const stepCount = C.getValue(TRANSFER_BUFFER, "i32");
          predicates[i2] = [];
          textPredicates[i2] = [];
          const steps = new Array();
          let stepAddress = predicatesAddress;
          for (let j = 0; j < stepCount; j++) {
            const stepType = C.getValue(stepAddress, "i32");
            stepAddress += SIZE_OF_INT;
            const stepValueId = C.getValue(stepAddress, "i32");
            stepAddress += SIZE_OF_INT;
            parsePattern(
              i2,
              stepType,
              stepValueId,
              captureNames,
              stringValues,
              steps,
              textPredicates,
              predicates,
              setProperties,
              assertedProperties,
              refutedProperties
            );
          }
          Object.freeze(textPredicates[i2]);
          Object.freeze(predicates[i2]);
          Object.freeze(setProperties[i2]);
          Object.freeze(assertedProperties[i2]);
          Object.freeze(refutedProperties[i2]);
        }
        C._free(sourceAddress);
        this[0] = address;
        this.captureNames = captureNames;
        this.captureQuantifiers = captureQuantifiers;
        this.textPredicates = textPredicates;
        this.predicates = predicates;
        this.setProperties = setProperties;
        this.assertedProperties = assertedProperties;
        this.refutedProperties = refutedProperties;
        this.exceededMatchLimit = false;
      }
      /** Delete the query, freeing its resources. */
      delete() {
        C._ts_query_delete(this[0]);
        this[0] = 0;
      }
      /**
       * Iterate over all of the matches in the order that they were found.
       *
       * Each match contains the index of the pattern that matched, and a list of
       * captures. Because multiple patterns can match the same set of nodes,
       * one match may contain captures that appear *before* some of the
       * captures from a previous match.
       *
       * @param {Node} node - The node to execute the query on.
       *
       * @param {QueryOptions} options - Options for query execution.
       */
      matches(node, options2 = {}) {
        const startPosition = options2.startPosition ?? ZERO_POINT;
        const endPosition = options2.endPosition ?? ZERO_POINT;
        const startIndex = options2.startIndex ?? 0;
        const endIndex = options2.endIndex ?? 0;
        const matchLimit = options2.matchLimit ?? 4294967295;
        const maxStartDepth = options2.maxStartDepth ?? 4294967295;
        const timeoutMicros = options2.timeoutMicros ?? 0;
        const progressCallback = options2.progressCallback;
        if (typeof matchLimit !== "number") {
          throw new Error("Arguments must be numbers");
        }
        this.matchLimit = matchLimit;
        if (endIndex !== 0 && startIndex > endIndex) {
          throw new Error("`startIndex` cannot be greater than `endIndex`");
        }
        if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || startPosition.row === endPosition.row && startPosition.column > endPosition.column)) {
          throw new Error("`startPosition` cannot be greater than `endPosition`");
        }
        if (progressCallback) {
          C.currentQueryProgressCallback = progressCallback;
        }
        marshalNode(node);
        C._ts_query_matches_wasm(
          this[0],
          node.tree[0],
          startPosition.row,
          startPosition.column,
          endPosition.row,
          endPosition.column,
          startIndex,
          endIndex,
          matchLimit,
          maxStartDepth,
          timeoutMicros
        );
        const rawCount = C.getValue(TRANSFER_BUFFER, "i32");
        const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
        const result = new Array(rawCount);
        this.exceededMatchLimit = Boolean(didExceedMatchLimit);
        let filteredCount = 0;
        let address = startAddress;
        for (let i2 = 0; i2 < rawCount; i2++) {
          const patternIndex = C.getValue(address, "i32");
          address += SIZE_OF_INT;
          const captureCount = C.getValue(address, "i32");
          address += SIZE_OF_INT;
          const captures = new Array(captureCount);
          address = unmarshalCaptures(this, node.tree, address, patternIndex, captures);
          if (this.textPredicates[patternIndex].every((p) => p(captures))) {
            result[filteredCount] = { pattern: patternIndex, patternIndex, captures };
            const setProperties = this.setProperties[patternIndex];
            result[filteredCount].setProperties = setProperties;
            const assertedProperties = this.assertedProperties[patternIndex];
            result[filteredCount].assertedProperties = assertedProperties;
            const refutedProperties = this.refutedProperties[patternIndex];
            result[filteredCount].refutedProperties = refutedProperties;
            filteredCount++;
          }
        }
        result.length = filteredCount;
        C._free(startAddress);
        C.currentQueryProgressCallback = null;
        return result;
      }
      /**
       * Iterate over all of the individual captures in the order that they
       * appear.
       *
       * This is useful if you don't care about which pattern matched, and just
       * want a single, ordered sequence of captures.
       *
       * @param {Node} node - The node to execute the query on.
       *
       * @param {QueryOptions} options - Options for query execution.
       */
      captures(node, options2 = {}) {
        const startPosition = options2.startPosition ?? ZERO_POINT;
        const endPosition = options2.endPosition ?? ZERO_POINT;
        const startIndex = options2.startIndex ?? 0;
        const endIndex = options2.endIndex ?? 0;
        const matchLimit = options2.matchLimit ?? 4294967295;
        const maxStartDepth = options2.maxStartDepth ?? 4294967295;
        const timeoutMicros = options2.timeoutMicros ?? 0;
        const progressCallback = options2.progressCallback;
        if (typeof matchLimit !== "number") {
          throw new Error("Arguments must be numbers");
        }
        this.matchLimit = matchLimit;
        if (endIndex !== 0 && startIndex > endIndex) {
          throw new Error("`startIndex` cannot be greater than `endIndex`");
        }
        if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || startPosition.row === endPosition.row && startPosition.column > endPosition.column)) {
          throw new Error("`startPosition` cannot be greater than `endPosition`");
        }
        if (progressCallback) {
          C.currentQueryProgressCallback = progressCallback;
        }
        marshalNode(node);
        C._ts_query_captures_wasm(
          this[0],
          node.tree[0],
          startPosition.row,
          startPosition.column,
          endPosition.row,
          endPosition.column,
          startIndex,
          endIndex,
          matchLimit,
          maxStartDepth,
          timeoutMicros
        );
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
        const result = new Array();
        this.exceededMatchLimit = Boolean(didExceedMatchLimit);
        const captures = new Array();
        let address = startAddress;
        for (let i2 = 0; i2 < count; i2++) {
          const patternIndex = C.getValue(address, "i32");
          address += SIZE_OF_INT;
          const captureCount = C.getValue(address, "i32");
          address += SIZE_OF_INT;
          const captureIndex = C.getValue(address, "i32");
          address += SIZE_OF_INT;
          captures.length = captureCount;
          address = unmarshalCaptures(this, node.tree, address, patternIndex, captures);
          if (this.textPredicates[patternIndex].every((p) => p(captures))) {
            const capture = captures[captureIndex];
            const setProperties = this.setProperties[patternIndex];
            capture.setProperties = setProperties;
            const assertedProperties = this.assertedProperties[patternIndex];
            capture.assertedProperties = assertedProperties;
            const refutedProperties = this.refutedProperties[patternIndex];
            capture.refutedProperties = refutedProperties;
            result.push(capture);
          }
        }
        C._free(startAddress);
        C.currentQueryProgressCallback = null;
        return result;
      }
      /** Get the predicates for a given pattern. */
      predicatesForPattern(patternIndex) {
        return this.predicates[patternIndex];
      }
      /**
       * Disable a certain capture within a query.
       *
       * This prevents the capture from being returned in matches, and also
       * avoids any resource usage associated with recording the capture.
       */
      disableCapture(captureName) {
        const captureNameLength = C.lengthBytesUTF8(captureName);
        const captureNameAddress = C._malloc(captureNameLength + 1);
        C.stringToUTF8(captureName, captureNameAddress, captureNameLength + 1);
        C._ts_query_disable_capture(this[0], captureNameAddress, captureNameLength);
        C._free(captureNameAddress);
      }
      /**
       * Disable a certain pattern within a query.
       *
       * This prevents the pattern from matching, and also avoids any resource
       * usage associated with the pattern. This throws an error if the pattern
       * index is out of bounds.
       */
      disablePattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
          throw new Error(
            `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
          );
        }
        C._ts_query_disable_pattern(this[0], patternIndex);
      }
      /**
       * Check if, on its last execution, this cursor exceeded its maximum number
       * of in-progress matches.
       */
      didExceedMatchLimit() {
        return this.exceededMatchLimit;
      }
      /** Get the byte offset where the given pattern starts in the query's source. */
      startIndexForPattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
          throw new Error(
            `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
          );
        }
        return C._ts_query_start_byte_for_pattern(this[0], patternIndex);
      }
      /** Get the byte offset where the given pattern ends in the query's source. */
      endIndexForPattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
          throw new Error(
            `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
          );
        }
        return C._ts_query_end_byte_for_pattern(this[0], patternIndex);
      }
      /** Get the number of patterns in the query. */
      patternCount() {
        return C._ts_query_pattern_count(this[0]);
      }
      /** Get the index for a given capture name. */
      captureIndexForName(captureName) {
        return this.captureNames.indexOf(captureName);
      }
      /** Check if a given pattern within a query has a single root node. */
      isPatternRooted(patternIndex) {
        return C._ts_query_is_pattern_rooted(this[0], patternIndex) === 1;
      }
      /** Check if a given pattern within a query has a single root node. */
      isPatternNonLocal(patternIndex) {
        return C._ts_query_is_pattern_non_local(this[0], patternIndex) === 1;
      }
      /**
       * Check if a given step in a query is 'definite'.
       *
       * A query step is 'definite' if its parent pattern will be guaranteed to
       * match successfully once it reaches the step.
       */
      isPatternGuaranteedAtStep(byteIndex) {
        return C._ts_query_is_pattern_guaranteed_at_step(this[0], byteIndex) === 1;
      }
    };
    var LANGUAGE_FUNCTION_REGEX = /^tree_sitter_\w+$/;
    var Language = class _Language {
      static {
        __name(this, "Language");
      }
      /** @internal */
      [0] = 0;
      // Internal handle for WASM
      /**
       * A list of all node types in the language. The index of each type in this
       * array is its node type id.
       */
      types;
      /**
       * A list of all field names in the language. The index of each field name in
       * this array is its field id.
       */
      fields;
      /** @internal */
      constructor(internal, address) {
        assertInternal(internal);
        this[0] = address;
        this.types = new Array(C._ts_language_symbol_count(this[0]));
        for (let i2 = 0, n = this.types.length; i2 < n; i2++) {
          if (C._ts_language_symbol_type(this[0], i2) < 2) {
            this.types[i2] = C.UTF8ToString(C._ts_language_symbol_name(this[0], i2));
          }
        }
        this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
        for (let i2 = 0, n = this.fields.length; i2 < n; i2++) {
          const fieldName = C._ts_language_field_name_for_id(this[0], i2);
          if (fieldName !== 0) {
            this.fields[i2] = C.UTF8ToString(fieldName);
          } else {
            this.fields[i2] = null;
          }
        }
      }
      /**
       * Gets the name of the language.
       */
      get name() {
        const ptr = C._ts_language_name(this[0]);
        if (ptr === 0) return null;
        return C.UTF8ToString(ptr);
      }
      /**
       * @deprecated since version 0.25.0, use {@link Language#abiVersion} instead
       * Gets the version of the language.
       */
      get version() {
        return C._ts_language_version(this[0]);
      }
      /**
       * Gets the ABI version of the language.
       */
      get abiVersion() {
        return C._ts_language_abi_version(this[0]);
      }
      /**
      * Get the metadata for this language. This information is generated by the
      * CLI, and relies on the language author providing the correct metadata in
      * the language's `tree-sitter.json` file.
      */
      get metadata() {
        C._ts_language_metadata(this[0]);
        const length = C.getValue(TRANSFER_BUFFER, "i32");
        const address = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        if (length === 0) return null;
        return unmarshalLanguageMetadata(address);
      }
      /**
       * Gets the number of fields in the language.
       */
      get fieldCount() {
        return this.fields.length - 1;
      }
      /**
       * Gets the number of states in the language.
       */
      get stateCount() {
        return C._ts_language_state_count(this[0]);
      }
      /**
       * Get the field id for a field name.
       */
      fieldIdForName(fieldName) {
        const result = this.fields.indexOf(fieldName);
        return result !== -1 ? result : null;
      }
      /**
       * Get the field name for a field id.
       */
      fieldNameForId(fieldId) {
        return this.fields[fieldId] ?? null;
      }
      /**
       * Get the node type id for a node type name.
       */
      idForNodeType(type, named) {
        const typeLength = C.lengthBytesUTF8(type);
        const typeAddress = C._malloc(typeLength + 1);
        C.stringToUTF8(type, typeAddress, typeLength + 1);
        const result = C._ts_language_symbol_for_name(this[0], typeAddress, typeLength, named ? 1 : 0);
        C._free(typeAddress);
        return result || null;
      }
      /**
       * Gets the number of node types in the language.
       */
      get nodeTypeCount() {
        return C._ts_language_symbol_count(this[0]);
      }
      /**
       * Get the node type name for a node type id.
       */
      nodeTypeForId(typeId) {
        const name2 = C._ts_language_symbol_name(this[0], typeId);
        return name2 ? C.UTF8ToString(name2) : null;
      }
      /**
       * Check if a node type is named.
       *
       * @see {@link https://tree-sitter.github.io/tree-sitter/using-parsers/2-basic-parsing.html#named-vs-anonymous-nodes}
       */
      nodeTypeIsNamed(typeId) {
        return C._ts_language_type_is_named_wasm(this[0], typeId) ? true : false;
      }
      /**
       * Check if a node type is visible.
       */
      nodeTypeIsVisible(typeId) {
        return C._ts_language_type_is_visible_wasm(this[0], typeId) ? true : false;
      }
      /**
       * Get the supertypes ids of this language.
       *
       * @see {@link https://tree-sitter.github.io/tree-sitter/using-parsers/6-static-node-types.html?highlight=supertype#supertype-nodes}
       */
      get supertypes() {
        C._ts_language_supertypes_wasm(this[0]);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = C.getValue(address, "i16");
            address += SIZE_OF_SHORT;
          }
        }
        return result;
      }
      /**
       * Get the subtype ids for a given supertype node id.
       */
      subtypes(supertype) {
        C._ts_language_subtypes_wasm(this[0], supertype);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = C.getValue(address, "i16");
            address += SIZE_OF_SHORT;
          }
        }
        return result;
      }
      /**
       * Get the next state id for a given state id and node type id.
       */
      nextState(stateId, typeId) {
        return C._ts_language_next_state(this[0], stateId, typeId);
      }
      /**
       * Create a new lookahead iterator for this language and parse state.
       *
       * This returns `null` if state is invalid for this language.
       *
       * Iterating {@link LookaheadIterator} will yield valid symbols in the given
       * parse state. Newly created lookahead iterators will return the `ERROR`
       * symbol from {@link LookaheadIterator#currentType}.
       *
       * Lookahead iterators can be useful for generating suggestions and improving
       * syntax error diagnostics. To get symbols valid in an `ERROR` node, use the
       * lookahead iterator on its first leaf node state. For `MISSING` nodes, a
       * lookahead iterator created on the previous non-extra leaf node may be
       * appropriate.
       */
      lookaheadIterator(stateId) {
        const address = C._ts_lookahead_iterator_new(this[0], stateId);
        if (address) return new LookaheadIterator(INTERNAL, address, this);
        return null;
      }
      /**
       * @deprecated since version 0.25.0, call `new` on a {@link Query} instead
       *
       * Create a new query from a string containing one or more S-expression
       * patterns.
       *
       * The query is associated with a particular language, and can only be run
       * on syntax nodes parsed with that language. References to Queries can be
       * shared between multiple threads.
       *
       * @link {@see https://tree-sitter.github.io/tree-sitter/using-parsers/queries}
       */
      query(source) {
        console.warn("Language.query is deprecated. Use new Query(language, source) instead.");
        return new Query(this, source);
      }
      /**
       * Load a language from a WebAssembly module.
       * The module can be provided as a path to a file or as a buffer.
       */
      static async load(input) {
        let bytes;
        if (input instanceof Uint8Array) {
          bytes = Promise.resolve(input);
        } else {
          if (globalThis.process?.versions.node) {
            const fs22 = await import("fs/promises");
            bytes = fs22.readFile(input);
          } else {
            bytes = fetch(input).then((response) => response.arrayBuffer().then((buffer) => {
              if (response.ok) {
                return new Uint8Array(buffer);
              } else {
                const body2 = new TextDecoder("utf-8").decode(buffer);
                throw new Error(`Language.load failed with status ${response.status}.

${body2}`);
              }
            }));
          }
        }
        const mod = await C.loadWebAssemblyModule(await bytes, { loadAsync: true });
        const symbolNames = Object.keys(mod);
        const functionName = symbolNames.find((key) => LANGUAGE_FUNCTION_REGEX.test(key) && !key.includes("external_scanner_"));
        if (!functionName) {
          console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(symbolNames, null, 2)}`);
          throw new Error("Language.load failed: no language function found in WASM file");
        }
        const languageAddress = mod[functionName]();
        return new _Language(INTERNAL, languageAddress);
      }
    };
    var import_tree_sitter = __toESM(require_tree_sitter(), 1);
    var Module2 = null;
    async function initializeBinding(moduleOptions) {
      if (!Module2) {
        Module2 = await (0, import_tree_sitter.default)(moduleOptions);
      }
      return Module2;
    }
    __name(initializeBinding, "initializeBinding");
    function checkModule() {
      return !!Module2;
    }
    __name(checkModule, "checkModule");
    var TRANSFER_BUFFER;
    var LANGUAGE_VERSION;
    var MIN_COMPATIBLE_VERSION;
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      /** @internal */
      [0] = 0;
      // Internal handle for WASM
      /** @internal */
      [1] = 0;
      // Internal handle for WASM
      /** @internal */
      logCallback = null;
      /** The parser's current language. */
      language = null;
      /**
       * This must always be called before creating a Parser.
       *
       * You can optionally pass in options to configure the WASM module, the most common
       * one being `locateFile` to help the module find the `.wasm` file.
       */
      static async init(moduleOptions) {
        setModule(await initializeBinding(moduleOptions));
        TRANSFER_BUFFER = C._ts_init();
        LANGUAGE_VERSION = C.getValue(TRANSFER_BUFFER, "i32");
        MIN_COMPATIBLE_VERSION = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
      }
      /**
       * Create a new parser.
       */
      constructor() {
        this.initialize();
      }
      /** @internal */
      initialize() {
        if (!checkModule()) {
          throw new Error("cannot construct a Parser before calling `init()`");
        }
        C._ts_parser_new_wasm();
        this[0] = C.getValue(TRANSFER_BUFFER, "i32");
        this[1] = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
      }
      /** Delete the parser, freeing its resources. */
      delete() {
        C._ts_parser_delete(this[0]);
        C._free(this[1]);
        this[0] = 0;
        this[1] = 0;
      }
      /**
       * Set the language that the parser should use for parsing.
       *
       * If the language was not successfully assigned, an error will be thrown.
       * This happens if the language was generated with an incompatible
       * version of the Tree-sitter CLI. Check the language's version using
       * {@link Language#version} and compare it to this library's
       * {@link LANGUAGE_VERSION} and {@link MIN_COMPATIBLE_VERSION} constants.
       */
      setLanguage(language) {
        let address;
        if (!language) {
          address = 0;
          this.language = null;
        } else if (language.constructor === Language) {
          address = language[0];
          const version = C._ts_language_version(address);
          if (version < MIN_COMPATIBLE_VERSION || LANGUAGE_VERSION < version) {
            throw new Error(
              `Incompatible language version ${version}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${LANGUAGE_VERSION}.`
            );
          }
          this.language = language;
        } else {
          throw new Error("Argument must be a Language");
        }
        C._ts_parser_set_language(this[0], address);
        return this;
      }
      /**
       * Parse a slice of UTF8 text.
       *
       * @param {string | ParseCallback} callback - The UTF8-encoded text to parse or a callback function.
       *
       * @param {Tree | null} [oldTree] - A previous syntax tree parsed from the same document. If the text of the
       *   document has changed since `oldTree` was created, then you must edit `oldTree` to match
       *   the new text using {@link Tree#edit}.
       *
       * @param {ParseOptions} [options] - Options for parsing the text.
       *  This can be used to set the included ranges, or a progress callback.
       *
       * @returns {Tree | null} A {@link Tree} if parsing succeeded, or `null` if:
       *  - The parser has not yet had a language assigned with {@link Parser#setLanguage}.
       *  - The progress callback returned true.
       */
      parse(callback, oldTree, options2) {
        if (typeof callback === "string") {
          C.currentParseCallback = (index) => callback.slice(index);
        } else if (typeof callback === "function") {
          C.currentParseCallback = callback;
        } else {
          throw new Error("Argument must be a string or a function");
        }
        if (options2?.progressCallback) {
          C.currentProgressCallback = options2.progressCallback;
        } else {
          C.currentProgressCallback = null;
        }
        if (this.logCallback) {
          C.currentLogCallback = this.logCallback;
          C._ts_parser_enable_logger_wasm(this[0], 1);
        } else {
          C.currentLogCallback = null;
          C._ts_parser_enable_logger_wasm(this[0], 0);
        }
        let rangeCount = 0;
        let rangeAddress = 0;
        if (options2?.includedRanges) {
          rangeCount = options2.includedRanges.length;
          rangeAddress = C._calloc(rangeCount, SIZE_OF_RANGE);
          let address = rangeAddress;
          for (let i2 = 0; i2 < rangeCount; i2++) {
            marshalRange(address, options2.includedRanges[i2]);
            address += SIZE_OF_RANGE;
          }
        }
        const treeAddress = C._ts_parser_parse_wasm(
          this[0],
          this[1],
          oldTree ? oldTree[0] : 0,
          rangeAddress,
          rangeCount
        );
        if (!treeAddress) {
          C.currentParseCallback = null;
          C.currentLogCallback = null;
          C.currentProgressCallback = null;
          return null;
        }
        if (!this.language) {
          throw new Error("Parser must have a language to parse");
        }
        const result = new Tree(INTERNAL, treeAddress, this.language, C.currentParseCallback);
        C.currentParseCallback = null;
        C.currentLogCallback = null;
        C.currentProgressCallback = null;
        return result;
      }
      /**
       * Instruct the parser to start the next parse from the beginning.
       *
       * If the parser previously failed because of a timeout, cancellation,
       * or callback, then by default, it will resume where it left off on the
       * next call to {@link Parser#parse} or other parsing functions.
       * If you don't want to resume, and instead intend to use this parser to
       * parse some other document, you must call `reset` first.
       */
      reset() {
        C._ts_parser_reset(this[0]);
      }
      /** Get the ranges of text that the parser will include when parsing. */
      getIncludedRanges() {
        C._ts_parser_included_ranges_wasm(this[0]);
        const count = C.getValue(TRANSFER_BUFFER, "i32");
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
        const result = new Array(count);
        if (count > 0) {
          let address = buffer;
          for (let i2 = 0; i2 < count; i2++) {
            result[i2] = unmarshalRange(address);
            address += SIZE_OF_RANGE;
          }
          C._free(buffer);
        }
        return result;
      }
      /**
       * @deprecated since version 0.25.0, prefer passing a progress callback to {@link Parser#parse}
       *
       * Get the duration in microseconds that parsing is allowed to take.
       *
       * This is set via {@link Parser#setTimeoutMicros}.
       */
      getTimeoutMicros() {
        return C._ts_parser_timeout_micros(this[0]);
      }
      /**
       * @deprecated since version 0.25.0, prefer passing a progress callback to {@link Parser#parse}
       *
       * Set the maximum duration in microseconds that parsing should be allowed
       * to take before halting.
       *
       * If parsing takes longer than this, it will halt early, returning `null`.
       * See {@link Parser#parse} for more information.
       */
      setTimeoutMicros(timeout) {
        C._ts_parser_set_timeout_micros(this[0], 0, timeout);
      }
      /** Set the logging callback that a parser should use during parsing. */
      setLogger(callback) {
        if (!callback) {
          this.logCallback = null;
        } else if (typeof callback !== "function") {
          throw new Error("Logger callback must be a function");
        } else {
          this.logCallback = callback;
        }
        return this;
      }
      /** Get the parser's current logger. */
      getLogger() {
        return this.logCallback;
      }
    };
  }
});

// node_modules/ignore/index.js
var require_ignore = __commonJS2({
  "node_modules/ignore/index.js"(exports2, module2) {
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var UNDEFINED = void 0;
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_TEST_BLANK_LINE = /^\s+$/;
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var REGEX_TEST_INVALID_PATH = /^\.{0,2}\/|^\.{1,2}$/;
    var REGEX_TEST_TRAILING_SLASH = /\/$/;
    var SLASH2 = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define2 = (object, key, value) => {
      Object.defineProperty(object, key, { value });
      return value;
    };
    var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    var RETURN_FALSE = () => false;
    var sanitizeRange = (range) => range.replace(
      REGEX_REGEXP_RANGE,
      (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
    );
    var cleanRangeBackSlash = (slashes) => {
      const { length } = slashes;
      return slashes.slice(0, length - length % 2);
    };
    var REPLACERS = [
      [
        // Remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => EMPTY
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a ) -> (a)
        // (a \ ) -> (a  )
        /((?:\\\\)*?)(\\?\s+)$/,
        (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
      ],
      // Replace (\ ) with ' '
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        /(\\+?)\s/g,
        (_, m1) => {
          const { length } = m1;
          return m1.slice(0, length - length % 2) + SPACE;
        }
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function startingReplacer() {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ]
    ];
    var REGEX_REPLACE_TRAILING_WILDCARD = /(^|\\\/)?\\\*$/;
    var MODE_IGNORE = "regex";
    var MODE_CHECK_IGNORE = "checkRegex";
    var UNDERSCORE = "_";
    var TRAILING_WILD_CARD_REPLACERS = {
      [MODE_IGNORE](_, p1) {
        const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      },
      [MODE_CHECK_IGNORE](_, p1) {
        const prefix = p1 ? `${p1}[^/]*` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      }
    };
    var makeRegexPrefix = (pattern) => REPLACERS.reduce(
      (prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)),
      pattern
    );
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF).filter(Boolean);
    var IgnoreRule = class {
      constructor(pattern, mark, body2, ignoreCase, negative, prefix) {
        this.pattern = pattern;
        this.mark = mark;
        this.negative = negative;
        define2(this, "body", body2);
        define2(this, "ignoreCase", ignoreCase);
        define2(this, "regexPrefix", prefix);
      }
      get regex() {
        const key = UNDERSCORE + MODE_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_IGNORE, key);
      }
      get checkRegex() {
        const key = UNDERSCORE + MODE_CHECK_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_CHECK_IGNORE, key);
      }
      _make(mode, key) {
        const str = this.regexPrefix.replace(
          REGEX_REPLACE_TRAILING_WILDCARD,
          // It does not need to bind pattern
          TRAILING_WILD_CARD_REPLACERS[mode]
        );
        const regex = this.ignoreCase ? new RegExp(str, "i") : new RegExp(str);
        return define2(this, key, regex);
      }
    };
    var createRule = ({
      pattern,
      mark
    }, ignoreCase) => {
      let negative = false;
      let body2 = pattern;
      if (body2.indexOf("!") === 0) {
        negative = true;
        body2 = body2.substr(1);
      }
      body2 = body2.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regexPrefix = makeRegexPrefix(body2);
      return new IgnoreRule(
        pattern,
        mark,
        body2,
        ignoreCase,
        negative,
        regexPrefix
      );
    };
    var RuleManager = class {
      constructor(ignoreCase) {
        this._ignoreCase = ignoreCase;
        this._rules = [];
      }
      _add(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules._rules);
          this._added = true;
          return;
        }
        if (isString(pattern)) {
          pattern = {
            pattern
          };
        }
        if (checkPattern(pattern.pattern)) {
          const rule = createRule(pattern, this._ignoreCase);
          this._added = true;
          this._rules.push(rule);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._add, this);
        return this._added;
      }
      // Test one single path without recursively checking parent directories
      //
      // - checkUnignored `boolean` whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // - check `string` either `MODE_IGNORE` or `MODE_CHECK_IGNORE`
      // @returns {TestResult} true if a file is ignored
      test(path3, checkUnignored, mode) {
        let ignored = false;
        let unignored = false;
        let matchedRule;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule[mode].test(path3);
          if (!matched) {
            return;
          }
          ignored = !negative;
          unignored = negative;
          matchedRule = negative ? UNDEFINED : rule;
        });
        const ret = {
          ignored,
          unignored
        };
        if (matchedRule) {
          ret.rule = matchedRule;
        }
        return ret;
      }
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path3, originalPath, doThrow) => {
      if (!isString(path3)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path3) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path3)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path3) => REGEX_TEST_INVALID_PATH.test(path3);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define2(this, KEY_IGNORE, true);
        this._rules = new RuleManager(ignoreCase);
        this._strictPathCheck = !allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      add(pattern) {
        if (this._rules.add(pattern)) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      // @returns {TestResult}
      _test(originalPath, cache, checkUnignored, slices) {
        const path3 = originalPath && checkPath.convert(originalPath);
        checkPath(
          path3,
          originalPath,
          this._strictPathCheck ? throwError : RETURN_FALSE
        );
        return this._t(path3, cache, checkUnignored, slices);
      }
      checkIgnore(path3) {
        if (!REGEX_TEST_TRAILING_SLASH.test(path3)) {
          return this.test(path3);
        }
        const slices = path3.split(SLASH2).filter(Boolean);
        slices.pop();
        if (slices.length) {
          const parent = this._t(
            slices.join(SLASH2) + SLASH2,
            this._testCache,
            true,
            slices
          );
          if (parent.ignored) {
            return parent;
          }
        }
        return this._rules.test(path3, false, MODE_CHECK_IGNORE);
      }
      _t(path3, cache, checkUnignored, slices) {
        if (path3 in cache) {
          return cache[path3];
        }
        if (!slices) {
          slices = path3.split(SLASH2).filter(Boolean);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path3] = this._rules.test(path3, checkUnignored, MODE_IGNORE);
        }
        const parent = this._t(
          slices.join(SLASH2) + SLASH2,
          cache,
          checkUnignored,
          slices
        );
        return cache[path3] = parent.ignored ? parent : this._rules.test(path3, checkUnignored, MODE_IGNORE);
      }
      ignores(path3) {
        return this._test(path3, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path3) => !this.ignores(path3);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path3) {
        return this._test(path3, this._testCache, true);
      }
    };
    var factory = (options2) => new Ignore(options2);
    var isPathValid = (path3) => checkPath(path3 && checkPath.convert(path3), path3, RETURN_FALSE);
    var setupWindows = () => {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path3) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path3) || isNotRelative(path3);
    };
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && process.platform === "win32"
    ) {
      setupWindows();
    }
    module2.exports = factory;
    factory.default = factory;
    module2.exports.isPathValid = isPathValid;
    define2(module2.exports, Symbol.for("setupWindows"), setupWindows);
  }
});

// server/server.mjs
var import_node_fs = __toESM2(require("node:fs"), 1);
var import_node_path3 = __toESM2(require("node:path"), 1);
var import_node_os = __toESM2(require("node:os"), 1);
var import_node_url2 = require("node:url");

// server/java.mjs
var import_promises = __toESM2(require("node:fs/promises"), 1);
var import_web_tree_sitter = __toESM2(require_tree_sitter2(), 1);
var SPRING = "org.springframework.web.bind.annotation.";
var VERBS = { GetMapping: "GET", PostMapping: "POST", PutMapping: "PUT", DeleteMapping: "DELETE", PatchMapping: "PATCH" };
var HTTP = /* @__PURE__ */ new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"]);
var TYPES = /* @__PURE__ */ new Set(["class_declaration", "interface_declaration", "enum_declaration", "record_declaration"]);
var initialized;
async function createJavaParser(options2 = {}) {
  initialized ??= import_promises.default.readFile(options2.runtimeWasm ?? "node_modules/web-tree-sitter/tree-sitter.wasm").then((wasmBinary2) => import_web_tree_sitter.Parser.init({ wasmBinary: wasmBinary2 }));
  await initialized;
  const grammar = await import_web_tree_sitter.Language.load(await import_promises.default.readFile(options2.grammarWasm ?? "node_modules/tree-sitter-java/tree-sitter-java.wasm"));
  const parser2 = new import_web_tree_sitter.Parser();
  parser2.setLanguage(grammar);
  return {
    parse(source) {
      if (!/\b(?:Request|Get|Post|Put|Delete|Patch)Mapping\b/.test(source)) return [];
      const tree = parser2.parse(source);
      try {
        return extract(tree.rootNode);
      } finally {
        tree.delete();
      }
    },
    close() {
      parser2.delete();
    }
  };
}
function extract(root) {
  const imports = /* @__PURE__ */ new Map();
  let wildcard = false;
  for (const child of root.namedChildren) {
    if (child.type !== "import_declaration") continue;
    const name2 = child.text.replace(/^import\s+(?:static\s+)?/, "").replace(/;\s*$/, "").trim();
    if (name2 === `${SPRING}*`) wildcard = true;
    else imports.set(name2.split(".").at(-1), name2);
  }
  const entries = [];
  function visit(node) {
    if (TYPES.has(node.type)) {
      const className = node.childForFieldName("name")?.text ?? "?";
      const body2 = node.childForFieldName("body");
      const constants = /* @__PURE__ */ new Map();
      for (const member of body2?.namedChildren ?? []) {
        if (member.type !== "field_declaration") continue;
        const modifiers = member.namedChildren.find((n) => n.type === "modifiers")?.text ?? "";
        if (node.type !== "interface_declaration" && (!/\bstatic\b/.test(modifiers) || !/\bfinal\b/.test(modifiers))) continue;
        for (const declaration of member.namedChildren.filter((n) => n.type === "variable_declarator")) {
          constants.set(declaration.childForFieldName("name")?.text, declaration.childForFieldName("value"));
        }
      }
      const context = { imports, wildcard, className, constants };
      const parents = mappings(node, context);
      for (const member of body2?.namedChildren ?? []) {
        if (member.type === "method_declaration") {
          for (const mapping of mappings(member, context)) {
            for (const parent of parents.length ? parents : [{ paths: [{ value: "" }], verbs: [] }]) {
              for (const base of parent.paths) for (const leaf of mapping.paths) {
                const unresolved = base.value == null || leaf.value == null || /\$\{|#\{/.test(base.value + leaf.value);
                const combinedVerbs = [.../* @__PURE__ */ new Set([...parent.verbs, ...mapping.verbs])];
                for (const httpMethod of combinedVerbs.length ? combinedVerbs : ["ANY"]) {
                  entries.push({
                    path: unresolved ? null : joinPath(base.value, leaf.value),
                    httpMethod,
                    unresolved,
                    expression: unresolved ? [base.expression ?? base.value, leaf.expression ?? leaf.value].filter(Boolean).join(" + ") : null,
                    className,
                    methodName: member.childForFieldName("name")?.text ?? "?",
                    line: mapping.node.startPosition.row,
                    character: mapping.node.startPosition.column
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
  return [...new Map(entries.map((e) => [JSON.stringify(e), e])).values()];
}
function mappings(declaration, context) {
  const annotations = declaration.namedChildren.find((n) => n.type === "modifiers")?.namedChildren ?? [];
  const results = [];
  for (const annotation of annotations) {
    if (annotation.type !== "annotation" && annotation.type !== "marker_annotation") continue;
    const full = annotation.childForFieldName("name")?.text ?? "";
    const name2 = full.split(".").at(-1);
    if (!(name2 in VERBS) && name2 !== "RequestMapping") continue;
    const resolved = full.includes(".") ? full : context.imports.get(name2) ?? (context.wildcard ? SPRING + name2 : null);
    if (resolved !== SPRING + name2) continue;
    const args2 = annotation.childForFieldName("arguments")?.namedChildren ?? [];
    let paths = [{ value: "" }];
    let verbs = VERBS[name2] ? [VERBS[name2]] : [];
    for (const arg of args2) {
      const key = arg.type === "element_value_pair" ? arg.childForFieldName("key")?.text : "value";
      const value = arg.type === "element_value_pair" ? arg.childForFieldName("value") : arg;
      const values = value?.type === "element_value_array_initializer" ? value.namedChildren : [value];
      if (key === "value" || key === "path") {
        paths = values.length ? values.map((n) => ({ value: stringValue(n, context), expression: n?.text ?? "?" })) : [{ value: "" }];
      } else if (key === "method" && name2 === "RequestMapping") {
        verbs = values.map((n) => n?.text.split(".").at(-1)).filter((v) => HTTP.has(v));
        if (!verbs.length && values.length) verbs = ["UNKNOWN"];
      }
    }
    results.push({ paths, verbs, node: annotation });
  }
  return results;
}
function stringValue(node, context, seen = /* @__PURE__ */ new Set()) {
  if (!node || node.hasError) return null;
  if (node.type === "string_literal") {
    if (node.text.startsWith('"""')) return null;
    return node.text.slice(1, -1).replace(/\\(u+[0-9a-fA-F]{4}|[0-7]{1,3}|.)/gs, (_, code) => {
      if (code.startsWith("u")) return String.fromCharCode(parseInt(code.replace(/^u+/, ""), 16));
      if (/^[0-7]/.test(code)) return String.fromCharCode(parseInt(code, 8));
      return { b: "\b", t: "	", n: "\n", f: "\f", r: "\r", s: " ", '"': '"', "'": "'", "\\": "\\" }[code] ?? `\\${code}`;
    });
  }
  if (node.type === "parenthesized_expression") return stringValue(node.namedChildren[0], context, seen);
  if (node.type === "binary_expression" && node.childForFieldName("operator")?.text === "+") {
    const left = stringValue(node.childForFieldName("left"), context, seen);
    const right = stringValue(node.childForFieldName("right"), context, seen);
    return left == null || right == null ? null : left + right;
  }
  let key = node.type === "identifier" ? node.text : null;
  if (node.type === "field_access" && node.childForFieldName("object")?.text === context.className) key = node.childForFieldName("field")?.text;
  if (key && context.constants.has(key) && !seen.has(key)) return stringValue(context.constants.get(key), context, /* @__PURE__ */ new Set([...seen, key]));
  return null;
}
function joinPath(base, leaf) {
  if (!leaf) return base ? base.startsWith("/") ? base : `/${base}` : "/";
  const normalized = base.replace(/^\//, "").replace(/\/$/, "");
  const prefix = normalized ? `/${normalized}` : "";
  return `${prefix}/${leaf.replace(/^\//, "")}`;
}

// server/index.mjs
var import_promises5 = __toESM2(require("node:fs/promises"), 1);
var import_node_path2 = __toESM2(require("node:path"), 1);
var import_node_crypto = require("node:crypto");
var import_node_url = require("node:url");
var import_promises6 = require("node:timers/promises");

// node_modules/chokidar/esm/index.js
var import_fs2 = require("fs");
var import_promises4 = require("fs/promises");
var import_events = require("events");
var sysPath2 = __toESM2(require("path"), 1);

// node_modules/readdirp/esm/index.js
var import_promises2 = require("node:fs/promises");
var import_node_stream = require("node:stream");
var import_node_path = require("node:path");
var EntryTypes = {
  FILE_TYPE: "files",
  DIR_TYPE: "directories",
  FILE_DIR_TYPE: "files_directories",
  EVERYTHING_TYPE: "all"
};
var defaultOptions = {
  root: ".",
  fileFilter: (_entryInfo) => true,
  directoryFilter: (_entryInfo) => true,
  type: EntryTypes.FILE_TYPE,
  lstat: false,
  depth: 2147483648,
  alwaysStat: false,
  highWaterMark: 4096
};
Object.freeze(defaultOptions);
var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
var ALL_TYPES = [
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
];
var DIR_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE
]);
var FILE_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
]);
var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
var wantBigintFsStats = process.platform === "win32";
var emptyFn = (_entryInfo) => true;
var normalizeFilter = (filter) => {
  if (filter === void 0)
    return emptyFn;
  if (typeof filter === "function")
    return filter;
  if (typeof filter === "string") {
    const fl = filter.trim();
    return (entry) => entry.basename === fl;
  }
  if (Array.isArray(filter)) {
    const trItems = filter.map((item) => item.trim());
    return (entry) => trItems.some((f) => entry.basename === f);
  }
  return emptyFn;
};
var ReaddirpStream = class extends import_node_stream.Readable {
  constructor(options2 = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options2.highWaterMark
    });
    const opts = { ...defaultOptions, ...options2 };
    const { root, type } = opts;
    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);
    const statMethod = opts.lstat ? import_promises2.lstat : import_promises2.stat;
    if (wantBigintFsStats) {
      this._stat = (path3) => statMethod(path3, { bigint: true });
    } else {
      this._stat = statMethod;
    }
    this._maxDepth = opts.depth ?? defaultOptions.depth;
    this._wantsDir = type ? DIR_TYPES.has(type) : false;
    this._wantsFile = type ? FILE_TYPES.has(type) : false;
    this._wantsEverything = type === EntryTypes.EVERYTHING_TYPE;
    this._root = (0, import_node_path.resolve)(root);
    this._isDirent = !opts.alwaysStat;
    this._statsProp = this._isDirent ? "dirent" : "stats";
    this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = void 0;
  }
  async _read(batch) {
    if (this.reading)
      return;
    this.reading = true;
    try {
      while (!this.destroyed && batch > 0) {
        const par = this.parent;
        const fil = par && par.files;
        if (fil && fil.length > 0) {
          const { path: path3, depth } = par;
          const slice = fil.splice(0, batch).map((dirent) => this._formatEntry(dirent, path3));
          const awaited = await Promise.all(slice);
          for (const entry of awaited) {
            if (!entry)
              continue;
            if (this.destroyed)
              return;
            const entryType = await this._getEntryType(entry);
            if (entryType === "directory" && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }
              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed)
            return;
        }
      }
    } catch (error) {
      this.destroy(error);
    } finally {
      this.reading = false;
    }
  }
  async _exploreDir(path3, depth) {
    let files;
    try {
      files = await (0, import_promises2.readdir)(path3, this._rdOptions);
    } catch (error) {
      this._onError(error);
    }
    return { files, depth, path: path3 };
  }
  async _formatEntry(dirent, path3) {
    let entry;
    const basename3 = this._isDirent ? dirent.name : dirent;
    try {
      const fullPath = (0, import_node_path.resolve)((0, import_node_path.join)(path3, basename3));
      entry = { path: (0, import_node_path.relative)(this._root, fullPath), fullPath, basename: basename3 };
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err2) {
      this._onError(err2);
      return;
    }
    return entry;
  }
  _onError(err2) {
    if (isNormalFlowError(err2) && !this.destroyed) {
      this.emit("warn", err2);
    } else {
      this.destroy(err2);
    }
  }
  async _getEntryType(entry) {
    if (!entry && this._statsProp in entry) {
      return "";
    }
    const stats = entry[this._statsProp];
    if (stats.isFile())
      return "file";
    if (stats.isDirectory())
      return "directory";
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await (0, import_promises2.realpath)(full);
        const entryRealPathStats = await (0, import_promises2.lstat)(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return "file";
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === import_node_path.sep) {
            const recursiveError = new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
            recursiveError.code = RECURSIVE_ERROR_CODE;
            return this._onError(recursiveError);
          }
          return "directory";
        }
      } catch (error) {
        this._onError(error);
        return "";
      }
    }
  }
  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];
    return stats && this._wantsEverything && !stats.isDirectory();
  }
};
function readdirp(root, options2 = {}) {
  let type = options2.entryType || options2.type;
  if (type === "both")
    type = EntryTypes.FILE_DIR_TYPE;
  if (type)
    options2.type = type;
  if (!root) {
    throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
  } else if (typeof root !== "string") {
    throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
  }
  options2.root = root;
  return new ReaddirpStream(options2);
}

// node_modules/chokidar/esm/handler.js
var import_fs = require("fs");
var import_promises3 = require("fs/promises");
var sysPath = __toESM2(require("path"), 1);
var import_os = require("os");
var STR_DATA = "data";
var STR_END = "end";
var STR_CLOSE = "close";
var EMPTY_FN = () => {
};
var pl = process.platform;
var isWindows = pl === "win32";
var isMacos = pl === "darwin";
var isLinux = pl === "linux";
var isFreeBSD = pl === "freebsd";
var isIBMi = (0, import_os.type)() === "OS400";
var EVENTS = {
  ALL: "all",
  READY: "ready",
  ADD: "add",
  CHANGE: "change",
  ADD_DIR: "addDir",
  UNLINK: "unlink",
  UNLINK_DIR: "unlinkDir",
  RAW: "raw",
  ERROR: "error"
};
var EV = EVENTS;
var THROTTLE_MODE_WATCH = "watch";
var statMethods = { lstat: import_promises3.lstat, stat: import_promises3.stat };
var KEY_LISTENERS = "listeners";
var KEY_ERR = "errHandlers";
var KEY_RAW = "rawEmitters";
var HANDLER_KEYS = [KEY_LISTENERS, KEY_ERR, KEY_RAW];
var binaryExtensions = /* @__PURE__ */ new Set([
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "afdesign",
  "afphoto",
  "afpub",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "odp",
  "ods",
  "odt",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "ott",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
]);
var isBinaryPath = (filePath) => binaryExtensions.has(sysPath.extname(filePath).slice(1).toLowerCase());
var foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};
var addAndConvert = (main, prop, item) => {
  let container = main[prop];
  if (!(container instanceof Set)) {
    main[prop] = container = /* @__PURE__ */ new Set([container]);
  }
  container.add(item);
};
var clearItem = (cont) => (key) => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};
var delFromSet = (main, prop, item) => {
  const container = main[prop];
  if (container instanceof Set) {
    container.delete(item);
  } else if (container === item) {
    delete main[prop];
  }
};
var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
var FsWatchInstances = /* @__PURE__ */ new Map();
function createFsWatchInstance(path3, options2, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path3);
    emitRaw(rawEvent, evPath, { watchedPath: path3 });
    if (evPath && path3 !== evPath) {
      fsWatchBroadcast(sysPath.resolve(path3, evPath), KEY_LISTENERS, sysPath.join(path3, evPath));
    }
  };
  try {
    return (0, import_fs.watch)(path3, {
      persistent: options2.persistent
    }, handleEvent);
  } catch (error) {
    errHandler(error);
    return void 0;
  }
}
var fsWatchBroadcast = (fullPath, listenerType, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont)
    return;
  foreach(cont[listenerType], (listener) => {
    listener(val1, val2, val3);
  });
};
var setFsWatchListener = (path3, fullPath, options2, handlers) => {
  const { listener, errHandler, rawEmitter } = handlers;
  let cont = FsWatchInstances.get(fullPath);
  let watcher;
  if (!options2.persistent) {
    watcher = createFsWatchInstance(path3, options2, listener, errHandler, rawEmitter);
    if (!watcher)
      return;
    return watcher.close.bind(watcher);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher = createFsWatchInstance(
      path3,
      options2,
      fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
      errHandler,
      // no need to use broadcast here
      fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
    );
    if (!watcher)
      return;
    watcher.on(EV.ERROR, async (error) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      if (cont)
        cont.watcherUnusable = true;
      if (isWindows && error.code === "EPERM") {
        try {
          const fd = await (0, import_promises3.open)(path3, "r");
          await fd.close();
          broadcastErr(error);
        } catch (err2) {
        }
      } else {
        broadcastErr(error);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher
    };
    FsWatchInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      cont.watcher.close();
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var FsWatchFileInstances = /* @__PURE__ */ new Map();
var setFsWatchFileListener = (path3, fullPath, options2, handlers) => {
  const { listener, rawEmitter } = handlers;
  let cont = FsWatchFileInstances.get(fullPath);
  const copts = cont && cont.options;
  if (copts && (copts.persistent < options2.persistent || copts.interval > options2.interval)) {
    (0, import_fs.unwatchFile)(fullPath);
    cont = void 0;
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options: options2,
      watcher: (0, import_fs.watchFile)(fullPath, options2, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter2) => {
          rawEmitter2(EV.CHANGE, fullPath, { curr, prev });
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener2) => listener2(path3, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      (0, import_fs.unwatchFile)(fullPath);
      cont.options = cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var NodeFsHandler = class {
  constructor(fsW) {
    this.fsw = fsW;
    this._boundHandleError = (error) => fsW._handleError(error);
  }
  /**
   * Watch file for changes with fs_watchFile or fs_watch.
   * @param path to file or dir
   * @param listener on fs change
   * @returns closer for the watcher instance
   */
  _watchWithNodeFs(path3, listener) {
    const opts = this.fsw.options;
    const directory = sysPath.dirname(path3);
    const basename3 = sysPath.basename(path3);
    const parent = this.fsw._getWatchedDir(directory);
    parent.add(basename3);
    const absolutePath = sysPath.resolve(path3);
    const options2 = {
      persistent: opts.persistent
    };
    if (!listener)
      listener = EMPTY_FN;
    let closer;
    if (opts.usePolling) {
      const enableBin = opts.interval !== opts.binaryInterval;
      options2.interval = enableBin && isBinaryPath(basename3) ? opts.binaryInterval : opts.interval;
      closer = setFsWatchFileListener(path3, absolutePath, options2, {
        listener,
        rawEmitter: this.fsw._emitRaw
      });
    } else {
      closer = setFsWatchListener(path3, absolutePath, options2, {
        listener,
        errHandler: this._boundHandleError,
        rawEmitter: this.fsw._emitRaw
      });
    }
    return closer;
  }
  /**
   * Watch a file and emit add event if warranted.
   * @returns closer for the watcher instance
   */
  _handleFile(file, stats, initialAdd) {
    if (this.fsw.closed) {
      return;
    }
    const dirname3 = sysPath.dirname(file);
    const basename3 = sysPath.basename(file);
    const parent = this.fsw._getWatchedDir(dirname3);
    let prevStats = stats;
    if (parent.has(basename3))
      return;
    const listener = async (path3, newStats) => {
      if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
        return;
      if (!newStats || newStats.mtimeMs === 0) {
        try {
          const newStats2 = await (0, import_promises3.stat)(file);
          if (this.fsw.closed)
            return;
          const at = newStats2.atimeMs;
          const mt = newStats2.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV.CHANGE, file, newStats2);
          }
          if ((isMacos || isLinux || isFreeBSD) && prevStats.ino !== newStats2.ino) {
            this.fsw._closeFile(path3);
            prevStats = newStats2;
            const closer2 = this._watchWithNodeFs(file, listener);
            if (closer2)
              this.fsw._addPathCloser(path3, closer2);
          } else {
            prevStats = newStats2;
          }
        } catch (error) {
          this.fsw._remove(dirname3, basename3);
        }
      } else if (parent.has(basename3)) {
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV.CHANGE, file, newStats);
        }
        prevStats = newStats;
      }
    };
    const closer = this._watchWithNodeFs(file, listener);
    if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
      if (!this.fsw._throttle(EV.ADD, file, 0))
        return;
      this.fsw._emit(EV.ADD, file, stats);
    }
    return closer;
  }
  /**
   * Handle symlinks encountered while reading a dir.
   * @param entry returned by readdirp
   * @param directory path of dir being read
   * @param path of this item
   * @param item basename of this item
   * @returns true if no more processing is needed for this entry.
   */
  async _handleSymlink(entry, directory, path3, item) {
    if (this.fsw.closed) {
      return;
    }
    const full = entry.fullPath;
    const dir = this.fsw._getWatchedDir(directory);
    if (!this.fsw.options.followSymlinks) {
      this.fsw._incrReadyCount();
      let linkPath;
      try {
        linkPath = await (0, import_promises3.realpath)(path3);
      } catch (e) {
        this.fsw._emitReady();
        return true;
      }
      if (this.fsw.closed)
        return;
      if (dir.has(item)) {
        if (this.fsw._symlinkPaths.get(full) !== linkPath) {
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV.CHANGE, path3, entry.stats);
        }
      } else {
        dir.add(item);
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV.ADD, path3, entry.stats);
      }
      this.fsw._emitReady();
      return true;
    }
    if (this.fsw._symlinkPaths.has(full)) {
      return true;
    }
    this.fsw._symlinkPaths.set(full, true);
  }
  _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
    directory = sysPath.join(directory, "");
    throttler = this.fsw._throttle("readdir", directory, 1e3);
    if (!throttler)
      return;
    const previous = this.fsw._getWatchedDir(wh.path);
    const current = /* @__PURE__ */ new Set();
    let stream = this.fsw._readdirp(directory, {
      fileFilter: (entry) => wh.filterPath(entry),
      directoryFilter: (entry) => wh.filterDir(entry)
    });
    if (!stream)
      return;
    stream.on(STR_DATA, async (entry) => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const item = entry.path;
      let path3 = sysPath.join(directory, item);
      current.add(item);
      if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path3, item)) {
        return;
      }
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      if (item === target || !target && !previous.has(item)) {
        this.fsw._incrReadyCount();
        path3 = sysPath.join(dir, sysPath.relative(dir, path3));
        this._addToNodeFs(path3, initialAdd, wh, depth + 1);
      }
    }).on(EV.ERROR, this._boundHandleError);
    return new Promise((resolve3, reject) => {
      if (!stream)
        return reject();
      stream.once(STR_END, () => {
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        const wasThrottled = throttler ? throttler.clear() : false;
        resolve3(void 0);
        previous.getChildren().filter((item) => {
          return item !== directory && !current.has(item);
        }).forEach((item) => {
          this.fsw._remove(directory, item);
        });
        stream = void 0;
        if (wasThrottled)
          this._handleRead(directory, false, wh, target, dir, depth, throttler);
      });
    });
  }
  /**
   * Read directory to add / remove files from `@watched` list and re-read it on change.
   * @param dir fs path
   * @param stats
   * @param initialAdd
   * @param depth relative to user-supplied path
   * @param target child path targeted for watch
   * @param wh Common watch helpers for this path
   * @param realpath
   * @returns closer for the watcher instance.
   */
  async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath2) {
    const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
    const tracked = parentDir.has(sysPath.basename(dir));
    if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
      this.fsw._emit(EV.ADD_DIR, dir, stats);
    }
    parentDir.add(sysPath.basename(dir));
    this.fsw._getWatchedDir(dir);
    let throttler;
    let closer;
    const oDepth = this.fsw.options.depth;
    if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath2)) {
      if (!target) {
        await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
        if (this.fsw.closed)
          return;
      }
      closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
        if (stats2 && stats2.mtimeMs === 0)
          return;
        this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
      });
    }
    return closer;
  }
  /**
   * Handle added file, directory, or glob pattern.
   * Delegates call to _handleFile / _handleDir after checks.
   * @param path to file or ir
   * @param initialAdd was the file added at watch instantiation?
   * @param priorWh depth relative to user-supplied path
   * @param depth Child path actually targeted for watch
   * @param target Child path actually targeted for watch
   */
  async _addToNodeFs(path3, initialAdd, priorWh, depth, target) {
    const ready = this.fsw._emitReady;
    if (this.fsw._isIgnored(path3) || this.fsw.closed) {
      ready();
      return false;
    }
    const wh = this.fsw._getWatchHelpers(path3);
    if (priorWh) {
      wh.filterPath = (entry) => priorWh.filterPath(entry);
      wh.filterDir = (entry) => priorWh.filterDir(entry);
    }
    try {
      const stats = await statMethods[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        ready();
        return false;
      }
      const follow = this.fsw.options.followSymlinks;
      let closer;
      if (stats.isDirectory()) {
        const absPath = sysPath.resolve(path3);
        const targetPath = follow ? await (0, import_promises3.realpath)(path3) : path3;
        if (this.fsw.closed)
          return;
        closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (absPath !== targetPath && targetPath !== void 0) {
          this.fsw._symlinkPaths.set(absPath, targetPath);
        }
      } else if (stats.isSymbolicLink()) {
        const targetPath = follow ? await (0, import_promises3.realpath)(path3) : path3;
        if (this.fsw.closed)
          return;
        const parent = sysPath.dirname(wh.watchPath);
        this.fsw._getWatchedDir(parent).add(wh.watchPath);
        this.fsw._emit(EV.ADD, wh.watchPath, stats);
        closer = await this._handleDir(parent, stats, initialAdd, depth, path3, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (targetPath !== void 0) {
          this.fsw._symlinkPaths.set(sysPath.resolve(path3), targetPath);
        }
      } else {
        closer = this._handleFile(wh.watchPath, stats, initialAdd);
      }
      ready();
      if (closer)
        this.fsw._addPathCloser(path3, closer);
      return false;
    } catch (error) {
      if (this.fsw._handleError(error)) {
        ready();
        return path3;
      }
    }
  }
};

// node_modules/chokidar/esm/index.js
var SLASH = "/";
var SLASH_SLASH = "//";
var ONE_DOT = ".";
var TWO_DOTS = "..";
var STRING_TYPE = "string";
var BACK_SLASH_RE = /\\/g;
var DOUBLE_SLASH_RE = /\/\//;
var DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
var REPLACER_RE = /^\.[/\\]/;
function arrify(item) {
  return Array.isArray(item) ? item : [item];
}
var isMatcherObject = (matcher) => typeof matcher === "object" && matcher !== null && !(matcher instanceof RegExp);
function createPattern(matcher) {
  if (typeof matcher === "function")
    return matcher;
  if (typeof matcher === "string")
    return (string) => matcher === string;
  if (matcher instanceof RegExp)
    return (string) => matcher.test(string);
  if (typeof matcher === "object" && matcher !== null) {
    return (string) => {
      if (matcher.path === string)
        return true;
      if (matcher.recursive) {
        const relative3 = sysPath2.relative(matcher.path, string);
        if (!relative3) {
          return false;
        }
        return !relative3.startsWith("..") && !sysPath2.isAbsolute(relative3);
      }
      return false;
    };
  }
  return () => false;
}
function normalizePath(path3) {
  if (typeof path3 !== "string")
    throw new Error("string expected");
  path3 = sysPath2.normalize(path3);
  path3 = path3.replace(/\\/g, "/");
  let prepend = false;
  if (path3.startsWith("//"))
    prepend = true;
  const DOUBLE_SLASH_RE2 = /\/\//;
  while (path3.match(DOUBLE_SLASH_RE2))
    path3 = path3.replace(DOUBLE_SLASH_RE2, "/");
  if (prepend)
    path3 = "/" + path3;
  return path3;
}
function matchPatterns(patterns, testString, stats) {
  const path3 = normalizePath(testString);
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    if (pattern(path3, stats)) {
      return true;
    }
  }
  return false;
}
function anymatch(matchers, testString) {
  if (matchers == null) {
    throw new TypeError("anymatch: specify first argument");
  }
  const matchersArray = arrify(matchers);
  const patterns = matchersArray.map((matcher) => createPattern(matcher));
  if (testString == null) {
    return (testString2, stats) => {
      return matchPatterns(patterns, testString2, stats);
    };
  }
  return matchPatterns(patterns, testString);
}
var unifyPaths = (paths_) => {
  const paths = arrify(paths_).flat();
  if (!paths.every((p) => typeof p === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};
var toUnix = (string) => {
  let str = string.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  while (str.match(DOUBLE_SLASH_RE)) {
    str = str.replace(DOUBLE_SLASH_RE, SLASH);
  }
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};
var normalizePathToUnix = (path3) => toUnix(sysPath2.normalize(toUnix(path3)));
var normalizeIgnored = (cwd = "") => (path3) => {
  if (typeof path3 === "string") {
    return normalizePathToUnix(sysPath2.isAbsolute(path3) ? path3 : sysPath2.join(cwd, path3));
  } else {
    return path3;
  }
};
var getAbsolutePath = (path3, cwd) => {
  if (sysPath2.isAbsolute(path3)) {
    return path3;
  }
  return sysPath2.join(cwd, path3);
};
var EMPTY_SET = Object.freeze(/* @__PURE__ */ new Set());
var DirEntry = class {
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    this.items = /* @__PURE__ */ new Set();
  }
  add(item) {
    const { items } = this;
    if (!items)
      return;
    if (item !== ONE_DOT && item !== TWO_DOTS)
      items.add(item);
  }
  async remove(item) {
    const { items } = this;
    if (!items)
      return;
    items.delete(item);
    if (items.size > 0)
      return;
    const dir = this.path;
    try {
      await (0, import_promises4.readdir)(dir);
    } catch (err2) {
      if (this._removeWatcher) {
        this._removeWatcher(sysPath2.dirname(dir), sysPath2.basename(dir));
      }
    }
  }
  has(item) {
    const { items } = this;
    if (!items)
      return;
    return items.has(item);
  }
  getChildren() {
    const { items } = this;
    if (!items)
      return [];
    return [...items.values()];
  }
  dispose() {
    this.items.clear();
    this.path = "";
    this._removeWatcher = EMPTY_FN;
    this.items = EMPTY_SET;
    Object.freeze(this);
  }
};
var STAT_METHOD_F = "stat";
var STAT_METHOD_L = "lstat";
var WatchHelper = class {
  constructor(path3, follow, fsw) {
    this.fsw = fsw;
    const watchPath = path3;
    this.path = path3 = path3.replace(REPLACER_RE, "");
    this.watchPath = watchPath;
    this.fullWatchPath = sysPath2.resolve(watchPath);
    this.dirParts = [];
    this.dirParts.forEach((parts2) => {
      if (parts2.length > 1)
        parts2.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }
  entryPath(entry) {
    return sysPath2.join(this.watchPath, sysPath2.relative(this.watchPath, entry.fullPath));
  }
  filterPath(entry) {
    const { stats } = entry;
    if (stats && stats.isSymbolicLink())
      return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    return this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
  }
  filterDir(entry) {
    return this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
};
var FSWatcher = class extends import_events.EventEmitter {
  // Not indenting methods for history sake; for now.
  constructor(_opts = {}) {
    super();
    this.closed = false;
    this._closers = /* @__PURE__ */ new Map();
    this._ignoredPaths = /* @__PURE__ */ new Set();
    this._throttled = /* @__PURE__ */ new Map();
    this._streams = /* @__PURE__ */ new Set();
    this._symlinkPaths = /* @__PURE__ */ new Map();
    this._watched = /* @__PURE__ */ new Map();
    this._pendingWrites = /* @__PURE__ */ new Map();
    this._pendingUnlinks = /* @__PURE__ */ new Map();
    this._readyCount = 0;
    this._readyEmitted = false;
    const awf = _opts.awaitWriteFinish;
    const DEF_AWF = { stabilityThreshold: 2e3, pollInterval: 100 };
    const opts = {
      // Defaults
      persistent: true,
      ignoreInitial: false,
      ignorePermissionErrors: false,
      interval: 100,
      binaryInterval: 300,
      followSymlinks: true,
      usePolling: false,
      // useAsync: false,
      atomic: true,
      // NOTE: overwritten later (depends on usePolling)
      ..._opts,
      // Change format
      ignored: _opts.ignored ? arrify(_opts.ignored) : arrify([]),
      awaitWriteFinish: awf === true ? DEF_AWF : typeof awf === "object" ? { ...DEF_AWF, ...awf } : false
    };
    if (isIBMi)
      opts.usePolling = true;
    if (opts.atomic === void 0)
      opts.atomic = !opts.usePolling;
    const envPoll = process.env.CHOKIDAR_USEPOLLING;
    if (envPoll !== void 0) {
      const envLower = envPoll.toLowerCase();
      if (envLower === "false" || envLower === "0")
        opts.usePolling = false;
      else if (envLower === "true" || envLower === "1")
        opts.usePolling = true;
      else
        opts.usePolling = !!envLower;
    }
    const envInterval = process.env.CHOKIDAR_INTERVAL;
    if (envInterval)
      opts.interval = Number.parseInt(envInterval, 10);
    let readyCalls = 0;
    this._emitReady = () => {
      readyCalls++;
      if (readyCalls >= this._readyCount) {
        this._emitReady = EMPTY_FN;
        this._readyEmitted = true;
        process.nextTick(() => this.emit(EVENTS.READY));
      }
    };
    this._emitRaw = (...args2) => this.emit(EVENTS.RAW, ...args2);
    this._boundRemove = this._remove.bind(this);
    this.options = opts;
    this._nodeFsHandler = new NodeFsHandler(this);
    Object.freeze(opts);
  }
  _addIgnoredPath(matcher) {
    if (isMatcherObject(matcher)) {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher.path && ignored.recursive === matcher.recursive) {
          return;
        }
      }
    }
    this._ignoredPaths.add(matcher);
  }
  _removeIgnoredPath(matcher) {
    this._ignoredPaths.delete(matcher);
    if (typeof matcher === "string") {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher) {
          this._ignoredPaths.delete(ignored);
        }
      }
    }
  }
  // Public methods
  /**
   * Adds paths to be watched on an existing FSWatcher instance.
   * @param paths_ file or file list. Other arguments are unused
   */
  add(paths_, _origAdd, _internal) {
    const { cwd } = this.options;
    this.closed = false;
    this._closePromise = void 0;
    let paths = unifyPaths(paths_);
    if (cwd) {
      paths = paths.map((path3) => {
        const absPath = getAbsolutePath(path3, cwd);
        return absPath;
      });
    }
    paths.forEach((path3) => {
      this._removeIgnoredPath(path3);
    });
    this._userIgnored = void 0;
    if (!this._readyCount)
      this._readyCount = 0;
    this._readyCount += paths.length;
    Promise.all(paths.map(async (path3) => {
      const res = await this._nodeFsHandler._addToNodeFs(path3, !_internal, void 0, 0, _origAdd);
      if (res)
        this._emitReady();
      return res;
    })).then((results) => {
      if (this.closed)
        return;
      results.forEach((item) => {
        if (item)
          this.add(sysPath2.dirname(item), sysPath2.basename(_origAdd || item));
      });
    });
    return this;
  }
  /**
   * Close watchers or start ignoring events from specified paths.
   */
  unwatch(paths_) {
    if (this.closed)
      return this;
    const paths = unifyPaths(paths_);
    const { cwd } = this.options;
    paths.forEach((path3) => {
      if (!sysPath2.isAbsolute(path3) && !this._closers.has(path3)) {
        if (cwd)
          path3 = sysPath2.join(cwd, path3);
        path3 = sysPath2.resolve(path3);
      }
      this._closePath(path3);
      this._addIgnoredPath(path3);
      if (this._watched.has(path3)) {
        this._addIgnoredPath({
          path: path3,
          recursive: true
        });
      }
      this._userIgnored = void 0;
    });
    return this;
  }
  /**
   * Close watchers and remove all listeners from watched paths.
   */
  close() {
    if (this._closePromise) {
      return this._closePromise;
    }
    this.closed = true;
    this.removeAllListeners();
    const closers = [];
    this._closers.forEach((closerList) => closerList.forEach((closer) => {
      const promise = closer();
      if (promise instanceof Promise)
        closers.push(promise);
    }));
    this._streams.forEach((stream) => stream.destroy());
    this._userIgnored = void 0;
    this._readyCount = 0;
    this._readyEmitted = false;
    this._watched.forEach((dirent) => dirent.dispose());
    this._closers.clear();
    this._watched.clear();
    this._streams.clear();
    this._symlinkPaths.clear();
    this._throttled.clear();
    this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
    return this._closePromise;
  }
  /**
   * Expose list of watched paths
   * @returns for chaining
   */
  getWatched() {
    const watchList = {};
    this._watched.forEach((entry, dir) => {
      const key = this.options.cwd ? sysPath2.relative(this.options.cwd, dir) : dir;
      const index = key || ONE_DOT;
      watchList[index] = entry.getChildren().sort();
    });
    return watchList;
  }
  emitWithAll(event, args2) {
    this.emit(event, ...args2);
    if (event !== EVENTS.ERROR)
      this.emit(EVENTS.ALL, event, ...args2);
  }
  // Common helpers
  // --------------
  /**
   * Normalize and emit events.
   * Calling _emit DOES NOT MEAN emit() would be called!
   * @param event Type of event
   * @param path File or directory path
   * @param stats arguments to be passed with event
   * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  async _emit(event, path3, stats) {
    if (this.closed)
      return;
    const opts = this.options;
    if (isWindows)
      path3 = sysPath2.normalize(path3);
    if (opts.cwd)
      path3 = sysPath2.relative(opts.cwd, path3);
    const args2 = [path3];
    if (stats != null)
      args2.push(stats);
    const awf = opts.awaitWriteFinish;
    let pw;
    if (awf && (pw = this._pendingWrites.get(path3))) {
      pw.lastChange = /* @__PURE__ */ new Date();
      return this;
    }
    if (opts.atomic) {
      if (event === EVENTS.UNLINK) {
        this._pendingUnlinks.set(path3, [event, ...args2]);
        setTimeout(() => {
          this._pendingUnlinks.forEach((entry, path4) => {
            this.emit(...entry);
            this.emit(EVENTS.ALL, ...entry);
            this._pendingUnlinks.delete(path4);
          });
        }, typeof opts.atomic === "number" ? opts.atomic : 100);
        return this;
      }
      if (event === EVENTS.ADD && this._pendingUnlinks.has(path3)) {
        event = EVENTS.CHANGE;
        this._pendingUnlinks.delete(path3);
      }
    }
    if (awf && (event === EVENTS.ADD || event === EVENTS.CHANGE) && this._readyEmitted) {
      const awfEmit = (err2, stats2) => {
        if (err2) {
          event = EVENTS.ERROR;
          args2[0] = err2;
          this.emitWithAll(event, args2);
        } else if (stats2) {
          if (args2.length > 1) {
            args2[1] = stats2;
          } else {
            args2.push(stats2);
          }
          this.emitWithAll(event, args2);
        }
      };
      this._awaitWriteFinish(path3, awf.stabilityThreshold, event, awfEmit);
      return this;
    }
    if (event === EVENTS.CHANGE) {
      const isThrottled = !this._throttle(EVENTS.CHANGE, path3, 50);
      if (isThrottled)
        return this;
    }
    if (opts.alwaysStat && stats === void 0 && (event === EVENTS.ADD || event === EVENTS.ADD_DIR || event === EVENTS.CHANGE)) {
      const fullPath = opts.cwd ? sysPath2.join(opts.cwd, path3) : path3;
      let stats2;
      try {
        stats2 = await (0, import_promises4.stat)(fullPath);
      } catch (err2) {
      }
      if (!stats2 || this.closed)
        return;
      args2.push(stats2);
    }
    this.emitWithAll(event, args2);
    return this;
  }
  /**
   * Common handler for errors
   * @returns The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  _handleError(error) {
    const code = error && error.code;
    if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
      this.emit(EVENTS.ERROR, error);
    }
    return error || this.closed;
  }
  /**
   * Helper utility for throttling
   * @param actionType type being throttled
   * @param path being acted upon
   * @param timeout duration of time to suppress duplicate actions
   * @returns tracking object or false if action should be suppressed
   */
  _throttle(actionType, path3, timeout) {
    if (!this._throttled.has(actionType)) {
      this._throttled.set(actionType, /* @__PURE__ */ new Map());
    }
    const action = this._throttled.get(actionType);
    if (!action)
      throw new Error("invalid throttle");
    const actionPath = action.get(path3);
    if (actionPath) {
      actionPath.count++;
      return false;
    }
    let timeoutObject;
    const clear = () => {
      const item = action.get(path3);
      const count = item ? item.count : 0;
      action.delete(path3);
      clearTimeout(timeoutObject);
      if (item)
        clearTimeout(item.timeoutObject);
      return count;
    };
    timeoutObject = setTimeout(clear, timeout);
    const thr = { timeoutObject, clear, count: 0 };
    action.set(path3, thr);
    return thr;
  }
  _incrReadyCount() {
    return this._readyCount++;
  }
  /**
   * Awaits write operation to finish.
   * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
   * @param path being acted upon
   * @param threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
   * @param event
   * @param awfEmit Callback to be called when ready for event to be emitted.
   */
  _awaitWriteFinish(path3, threshold, event, awfEmit) {
    const awf = this.options.awaitWriteFinish;
    if (typeof awf !== "object")
      return;
    const pollInterval = awf.pollInterval;
    let timeoutHandler;
    let fullPath = path3;
    if (this.options.cwd && !sysPath2.isAbsolute(path3)) {
      fullPath = sysPath2.join(this.options.cwd, path3);
    }
    const now = /* @__PURE__ */ new Date();
    const writes = this._pendingWrites;
    function awaitWriteFinishFn(prevStat) {
      (0, import_fs2.stat)(fullPath, (err2, curStat) => {
        if (err2 || !writes.has(path3)) {
          if (err2 && err2.code !== "ENOENT")
            awfEmit(err2);
          return;
        }
        const now2 = Number(/* @__PURE__ */ new Date());
        if (prevStat && curStat.size !== prevStat.size) {
          writes.get(path3).lastChange = now2;
        }
        const pw = writes.get(path3);
        const df = now2 - pw.lastChange;
        if (df >= threshold) {
          writes.delete(path3);
          awfEmit(void 0, curStat);
        } else {
          timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval, curStat);
        }
      });
    }
    if (!writes.has(path3)) {
      writes.set(path3, {
        lastChange: now,
        cancelWait: () => {
          writes.delete(path3);
          clearTimeout(timeoutHandler);
          return event;
        }
      });
      timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval);
    }
  }
  /**
   * Determines whether user has asked to ignore this path.
   */
  _isIgnored(path3, stats) {
    if (this.options.atomic && DOT_RE.test(path3))
      return true;
    if (!this._userIgnored) {
      const { cwd } = this.options;
      const ign = this.options.ignored;
      const ignored = (ign || []).map(normalizeIgnored(cwd));
      const ignoredPaths = [...this._ignoredPaths];
      const list = [...ignoredPaths.map(normalizeIgnored(cwd)), ...ignored];
      this._userIgnored = anymatch(list, void 0);
    }
    return this._userIgnored(path3, stats);
  }
  _isntIgnored(path3, stat4) {
    return !this._isIgnored(path3, stat4);
  }
  /**
   * Provides a set of common helpers and properties relating to symlink handling.
   * @param path file or directory pattern being watched
   */
  _getWatchHelpers(path3) {
    return new WatchHelper(path3, this.options.followSymlinks, this);
  }
  // Directory helpers
  // -----------------
  /**
   * Provides directory tracking objects
   * @param directory path of the directory
   */
  _getWatchedDir(directory) {
    const dir = sysPath2.resolve(directory);
    if (!this._watched.has(dir))
      this._watched.set(dir, new DirEntry(dir, this._boundRemove));
    return this._watched.get(dir);
  }
  // File helpers
  // ------------
  /**
   * Check for read permissions: https://stackoverflow.com/a/11781404/1358405
   */
  _hasReadPermissions(stats) {
    if (this.options.ignorePermissionErrors)
      return true;
    return Boolean(Number(stats.mode) & 256);
  }
  /**
   * Handles emitting unlink events for
   * files and directories, and via recursion, for
   * files and directories within directories that are unlinked
   * @param directory within which the following item is located
   * @param item      base path of item/directory
   */
  _remove(directory, item, isDirectory) {
    const path3 = sysPath2.join(directory, item);
    const fullPath = sysPath2.resolve(path3);
    isDirectory = isDirectory != null ? isDirectory : this._watched.has(path3) || this._watched.has(fullPath);
    if (!this._throttle("remove", path3, 100))
      return;
    if (!isDirectory && this._watched.size === 1) {
      this.add(directory, item, true);
    }
    const wp = this._getWatchedDir(path3);
    const nestedDirectoryChildren = wp.getChildren();
    nestedDirectoryChildren.forEach((nested) => this._remove(path3, nested));
    const parent = this._getWatchedDir(directory);
    const wasTracked = parent.has(item);
    parent.remove(item);
    if (this._symlinkPaths.has(fullPath)) {
      this._symlinkPaths.delete(fullPath);
    }
    let relPath = path3;
    if (this.options.cwd)
      relPath = sysPath2.relative(this.options.cwd, path3);
    if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
      const event = this._pendingWrites.get(relPath).cancelWait();
      if (event === EVENTS.ADD)
        return;
    }
    this._watched.delete(path3);
    this._watched.delete(fullPath);
    const eventName = isDirectory ? EVENTS.UNLINK_DIR : EVENTS.UNLINK;
    if (wasTracked && !this._isIgnored(path3))
      this._emit(eventName, path3);
    this._closePath(path3);
  }
  /**
   * Closes all watchers for a path
   */
  _closePath(path3) {
    this._closeFile(path3);
    const dir = sysPath2.dirname(path3);
    this._getWatchedDir(dir).remove(sysPath2.basename(path3));
  }
  /**
   * Closes only file-specific watchers
   */
  _closeFile(path3) {
    const closers = this._closers.get(path3);
    if (!closers)
      return;
    closers.forEach((closer) => closer());
    this._closers.delete(path3);
  }
  _addPathCloser(path3, closer) {
    if (!closer)
      return;
    let list = this._closers.get(path3);
    if (!list) {
      list = [];
      this._closers.set(path3, list);
    }
    list.push(closer);
  }
  _readdirp(root, opts) {
    if (this.closed)
      return;
    const options2 = { type: EVENTS.ALL, alwaysStat: true, lstat: true, ...opts, depth: 0 };
    let stream = readdirp(root, options2);
    this._streams.add(stream);
    stream.once(STR_CLOSE, () => {
      stream = void 0;
    });
    stream.once(STR_END, () => {
      if (stream) {
        this._streams.delete(stream);
        stream = void 0;
      }
    });
    return stream;
  }
};
function watch(paths, options2 = {}) {
  const watcher = new FSWatcher(options2);
  watcher.add(paths);
  return watcher;
}
var esm_default = { watch, FSWatcher };

// server/index.mjs
var import_ignore = __toESM2(require_ignore(), 1);
var VERSION = 1;
var SKIP = /* @__PURE__ */ new Set([".git", ".idea", ".zed", ".gradle", ".settings", ".tmp", "node_modules", "target", "build", "out", "bin"]);
var MAX_SOURCE = 4 * 1024 * 1024;
var EndpointIndex = class {
  constructor({ root, cacheDir: cacheDir2, parser: parser2, log: log2 = () => {
  }, reconcileMs = 3e4 }) {
    this.root = import_node_path2.default.resolve(root);
    this.parser = parser2;
    this.log = log2;
    this.reconcileMs = reconcileMs;
    const identity = process.platform === "win32" ? this.root.toLowerCase() : this.root;
    this.cacheFile = import_node_path2.default.join(cacheDir2, `${(0, import_node_crypto.createHash)("sha256").update(identity).digest("hex").slice(0, 24)}.json`);
    this.records = /* @__PURE__ */ new Map();
    this.documents = /* @__PURE__ */ new Map();
    this.queue = Promise.resolve();
    this.ready = Promise.resolve();
    this.ignores = (0, import_ignore.default)();
    this.pending = /* @__PURE__ */ new Set();
    this.closed = false;
    this.stats = { files: 0, parsed: 0, cached: 0, scanMs: 0, restored: 0 };
  }
  async start({ watch: watch2 = true } = {}) {
    await this.loadIgnores();
    try {
      const stat4 = await import_promises5.default.stat(this.cacheFile);
      if (stat4.size > 32 * 1024 * 1024) throw Error("Cache exceeds 32 MiB");
      const cache = JSON.parse(await import_promises5.default.readFile(this.cacheFile, "utf8"));
      if (cache.version === VERSION && cache.root === this.root && Array.isArray(cache.records)) {
        for (const [relative3, record] of cache.records) {
          if (typeof relative3 !== "string" || !this.accepts(import_node_path2.default.resolve(this.root, relative3)) || !validRecord(record)) continue;
          this.records.set(relative3, record);
        }
      }
      this.stats.restored = this.records.size;
    } catch (error) {
      if (error.code !== "ENOENT") this.log(`Cache ignored: ${error.message}`);
    }
    if (watch2) {
      this.watcher = esm_default.watch(this.root, {
        ignoreInitial: true,
        followSymlinks: false,
        ignored: (file, stat4) => this.isIgnored(file, stat4?.isDirectory()),
        awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 25 }
      });
      this.watcher.on("all", (_event, file) => this.schedule(file));
      const watching = new Promise((resolve3) => {
        this.watchingResolve = resolve3;
        this.watcher.once("ready", resolve3);
        this.watcher.once("error", resolve3);
      });
      this.watcher.on("error", (error) => this.log(`File watcher: ${error.message}; periodic scan remains active`));
      this.ready = watching.then(() => this.closed ? void 0 : this.reconcile());
      this.interval = setInterval(() => {
        if (!this.closed) void this.reconcile();
      }, this.reconcileMs);
      this.interval.unref();
    } else this.ready = this.reconcile();
    return this;
  }
  relative(file) {
    return import_node_path2.default.relative(this.root, import_node_path2.default.resolve(file)).split(import_node_path2.default.sep).join("/");
  }
  isIgnored(file, directory = false) {
    const relative3 = this.relative(file);
    if (!relative3) return false;
    if (relative3 === ".." || relative3.startsWith("../") || import_node_path2.default.isAbsolute(relative3)) return true;
    if (relative3.split("/").some((part) => SKIP.has(part))) return true;
    return this.ignores.ignores(relative3 + (directory ? "/" : ""));
  }
  accepts(file) {
    return file.endsWith(".java") && !this.isIgnored(file);
  }
  async loadIgnores() {
    this.ignores = (0, import_ignore.default)();
    try {
      this.ignores.add(await import_promises5.default.readFile(import_node_path2.default.join(this.root, ".gitignore"), "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") this.log(`Reading .gitignore: ${error.message}`);
    }
  }
  enqueue(action) {
    const task = this.queue.then(action);
    this.queue = task.catch((error) => this.log(error.message));
    return this.queue;
  }
  reconcile() {
    return this.enqueue(() => this.scan());
  }
  async scan() {
    const started2 = performance.now();
    await this.loadIgnores();
    const seen = /* @__PURE__ */ new Set();
    let parsed = 0, cached = 0;
    const visit = async (directory) => {
      let children;
      try {
        children = await import_promises5.default.readdir(directory, { withFileTypes: true });
      } catch (error) {
        if (error.code !== "ENOENT") {
          this.log(`Scan ${directory}: ${error.message}`);
          const prefix = this.relative(directory);
          for (const key of this.records.keys()) if (!prefix || key.startsWith(prefix + "/")) seen.add(key);
        }
        return;
      }
      for (const child of children) {
        const file = import_node_path2.default.join(directory, child.name);
        if (child.isSymbolicLink() || this.isIgnored(file, child.isDirectory())) continue;
        if (child.isDirectory()) await visit(file);
        else if (child.isFile() && this.accepts(file)) {
          seen.add(this.relative(file));
          const result = await this.refreshFile(file);
          if (result === "cached") cached++;
          else if (result === "parsed") parsed++;
          if (seen.size % 32 === 0) await (0, import_promises6.setImmediate)();
        }
      }
    };
    await visit(this.root);
    for (const relative3 of this.records.keys()) if (!seen.has(relative3)) this.records.delete(relative3);
    this.stats = { ...this.stats, files: this.records.size, parsed, cached, scanMs: Math.round(performance.now() - started2) };
    await this.saveCache();
    this.log(`Index ready: ${this.stats.files} Java files, ${parsed} parsed, ${cached} cached, ${this.stats.scanMs} ms`);
  }
  async refreshFile(file, force = false) {
    const relative3 = this.relative(file);
    if (!this.accepts(file)) {
      this.records.delete(relative3);
      return;
    }
    try {
      const stat4 = await import_promises5.default.lstat(file);
      if (!stat4.isFile() || stat4.isSymbolicLink() || stat4.size > MAX_SOURCE) {
        this.records.delete(relative3);
        return;
      }
      const old = this.records.get(relative3);
      if (!force && old && old.mtimeMs === stat4.mtimeMs && old.ctimeMs === stat4.ctimeMs && old.size === stat4.size) return "cached";
      const source = await import_promises5.default.readFile(file, "utf8");
      const entries = this.parser.parse(source);
      this.records.set(relative3, { mtimeMs: stat4.mtimeMs, ctimeMs: stat4.ctimeMs, size: stat4.size, entries });
      return "parsed";
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") this.records.delete(relative3);
      else this.log(`Index ${relative3}: ${error.message}`);
    }
  }
  schedule(file) {
    if (this.closed) return;
    if (!file.endsWith(".java") && import_node_path2.default.basename(file) !== ".gitignore") return;
    this.pending.add(file);
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      const pending = [...this.pending];
      this.pending.clear();
      void this.enqueue(async () => {
        if (pending.some((file2) => import_node_path2.default.basename(file2) === ".gitignore")) await this.scan();
        else {
          for (const file2 of pending) await this.refreshFile(file2, true);
          await this.saveCache();
        }
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
  search(query = "", limit = 500) {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const results = [];
    const records = new Map([...this.records].map(([key, record]) => [key, record.entries]));
    for (const [key, entries] of this.documents) records.set(key, entries);
    for (const [relative3, entries] of records) {
      if (this.isIgnored(import_node_path2.default.join(this.root, relative3))) continue;
      for (const entry of entries) {
        const name2 = entry.unresolved ? `@? ${entry.expression} -- ${entry.httpMethod} [unresolved]` : `@${entry.path} -- ${entry.httpMethod}`;
        const containerName = `${entry.className}.${entry.methodName} \xB7 ${relative3}`;
        const label = name2.toLowerCase();
        const context = containerName.toLowerCase();
        const score = terms.reduce((sum, term) => sum + Math.min(
          matchScore(label, term),
          2e3 + matchScore(context, term)
        ), 0);
        if (!Number.isFinite(score)) continue;
        results.push({ score, symbol: { name: name2, kind: 6, containerName, location: {
          uri: (0, import_node_url.pathToFileURL)(import_node_path2.default.join(this.root, relative3)).href,
          range: { start: { line: entry.line, character: entry.character }, end: { line: entry.line, character: entry.character } }
        } } });
      }
    }
    return results.sort((a, b) => a.score - b.score || a.symbol.name.localeCompare(b.symbol.name) || a.symbol.location.uri.localeCompare(b.symbol.location.uri)).slice(0, limit).map((result) => result.symbol);
  }
  async saveCache() {
    const temporary = `${this.cacheFile}.${process.pid}.${(0, import_node_crypto.randomUUID)()}.tmp`;
    try {
      await import_promises5.default.mkdir(import_node_path2.default.dirname(this.cacheFile), { recursive: true });
      await import_promises5.default.writeFile(temporary, JSON.stringify({ version: VERSION, root: this.root, records: [...this.records] }));
      await import_promises5.default.rename(temporary, this.cacheFile);
    } catch (error) {
      this.log(`Saving index cache: ${error.message}`);
    } finally {
      await import_promises5.default.unlink(temporary).catch(() => {
      });
    }
  }
  async close() {
    this.closed = true;
    clearInterval(this.interval);
    clearTimeout(this.debounce);
    this.watchingResolve?.();
    await this.watcher?.close();
    await this.ready;
    await this.queue;
    for (const file of this.pending) await this.refreshFile(file, true);
    this.pending.clear();
    await this.saveCache();
  }
};
function matchScore(text, query) {
  const contiguous = text.indexOf(query);
  if (contiguous >= 0) return (contiguous === 0 ? 0 : 100) + Math.min(contiguous, 100);
  let next = 0, first = -1, last = -1;
  for (let i2 = 0; i2 < text.length && next < query.length; i2++) {
    if (text[i2] !== query[next]) continue;
    if (first < 0) first = i2;
    last = i2;
    next++;
  }
  return next === query.length ? 1e3 + (last - first + 1 - query.length) + first / 1e3 : Infinity;
}
function validRecord(record) {
  return record && Number.isFinite(record.mtimeMs) && Number.isFinite(record.ctimeMs) && Number.isFinite(record.size) && Array.isArray(record.entries) && record.entries.every((e) => e && typeof e.className === "string" && typeof e.methodName === "string" && typeof e.httpMethod === "string" && typeof e.unresolved === "boolean" && (e.unresolved ? typeof e.expression === "string" : typeof e.path === "string") && Number.isInteger(e.line) && e.line >= 0 && Number.isInteger(e.character) && e.character >= 0);
}

// server/protocol.mjs
function encode(message) {
  const body2 = Buffer.from(JSON.stringify(message), "utf8");
  return Buffer.concat([Buffer.from(`Content-Length: ${body2.length}\r
\r
`, "ascii"), body2]);
}
var Decoder = class {
  buffer = Buffer.alloc(0);
  length = null;
  push(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const messages = [];
    while (true) {
      if (this.length == null) {
        const end = this.buffer.indexOf("\r\n\r\n");
        if (end < 0) {
          if (this.buffer.length > 16384) throw Error("LSP header exceeds 16 KiB");
          break;
        }
        const header = this.buffer.subarray(0, end).toString("ascii");
        const match = /^Content-Length:\s*(\d+)\s*$/im.exec(header);
        if (!match) throw Error("Missing Content-Length");
        this.length = Number(match[1]);
        if (this.length > 16 * 1024 * 1024) throw Error("LSP frame exceeds 16 MiB");
        this.buffer = this.buffer.subarray(end + 4);
      }
      if (this.buffer.length < this.length) break;
      messages.push(JSON.parse(this.buffer.subarray(0, this.length).toString("utf8")));
      this.buffer = this.buffer.subarray(this.length);
      this.length = null;
    }
    return messages;
  }
};
function applyChanges(text, changes) {
  for (const change of changes) {
    if (!change.range) text = change.text;
    else {
      const start2 = offset(text, change.range.start), end = offset(text, change.range.end);
      text = text.slice(0, start2) + change.text + text.slice(end);
    }
  }
  return text;
}
function offset(text, position) {
  let start2 = 0;
  for (let line = 0; line < position.line; line++) {
    const next = text.indexOf("\n", start2);
    if (next < 0) return text.length;
    start2 = next + 1;
  }
  let end = text.indexOf("\n", start2);
  if (end < 0) end = text.length;
  if (text[end - 1] === "\r") end--;
  return Math.min(end, start2 + Math.max(0, position.character));
}

// server/server.mjs
var options = {};
for (let i2 = 2; i2 < process.argv.length; i2 += 2) {
  if (!["--worktree", "--cache-dir"].includes(process.argv[i2]) || !process.argv[i2 + 1]) throw Error("Usage: endpoint-server [--worktree DIRECTORY] [--cache-dir DIRECTORY]");
  options[process.argv[i2].slice(2)] = process.argv[i2 + 1];
}
var cacheDir = import_node_path3.default.resolve(options["cache-dir"] ?? import_node_path3.default.join(process.env.LOCALAPPDATA ?? process.env.XDG_CACHE_HOME ?? import_node_path3.default.join(import_node_os.default.homedir(), ".cache"), "zed-endpoint-search"));
var assets = import_node_path3.default.dirname(import_node_path3.default.resolve(process.argv[1]));
var bundled = import_node_fs.default.existsSync(import_node_path3.default.join(assets, "tree-sitter-java.wasm"));
var started = performance.now();
var projects = /* @__PURE__ */ new Map();
var documents = /* @__PURE__ */ new Map();
var parser;
var initialized2 = false;
var shuttingDown = false;
var disposal;
var send = (message) => process.stdout.write(encode({ jsonrpc: "2.0", ...message }));
var log = (message) => process.stderr.write(`[endpoint-search] ${message}
`);
var toPath = (uri) => typeof uri === "string" && uri.startsWith("file:") ? (0, import_node_url2.fileURLToPath)(uri) : null;
async function addProject(root) {
  root = import_node_path3.default.resolve(root);
  if (projects.has(root)) return;
  const index = new EndpointIndex({ root, cacheDir, parser, log });
  await index.start();
  projects.set(root, index);
  log(`Search available: ${root}; ${index.stats.restored} cached files; ${Math.round(performance.now() - started)} ms since launch`);
}
function indexFor(file) {
  return [...projects.values()].sort((a, b) => b.root.length - a.root.length).find((index) => index.accepts(file));
}
async function dispose() {
  disposal ??= (async () => {
    await Promise.all([...projects.values()].map((index) => index.close()));
    parser?.close();
  })();
  return disposal;
}
function finish(code) {
  process.exitCode = code;
  process.stdin.destroy();
  process.stdout.end();
}
async function handle2(message) {
  const { method, params = {} } = message;
  if (method === "exit") {
    await dispose();
    finish(shuttingDown ? 0 : 1);
    return;
  }
  if (method === "initialize") {
    if (initialized2) throw Object.assign(Error("Already initialized"), { code: -32600 });
    parser = await createJavaParser(bundled ? {
      runtimeWasm: import_node_path3.default.join(assets, "tree-sitter.wasm"),
      grammarWasm: import_node_path3.default.join(assets, "tree-sitter-java.wasm")
    } : {});
    const roots = options.worktree ? [options.worktree] : params.workspaceFolders?.map((folder) => toPath(folder.uri)).filter(Boolean);
    for (const root of roots?.length ? roots : [toPath(params.rootUri) ?? process.cwd()]) await addProject(root);
    initialized2 = true;
    return { capabilities: {
      positionEncoding: "utf-16",
      workspaceSymbolProvider: true,
      textDocumentSync: { openClose: true, change: 2, save: { includeText: false } },
      workspace: { workspaceFolders: { supported: true, changeNotifications: true } },
      executeCommandProvider: { commands: ["endpointSearch.reindex"] }
    }, serverInfo: { name: "Endpoint Search", version: "0.1.0" } };
  }
  if (!initialized2) throw Object.assign(Error("Server not initialized"), { code: -32002 });
  if (method === "shutdown") {
    shuttingDown = true;
    await dispose();
    return null;
  }
  if (shuttingDown) throw Object.assign(Error("Server is shutting down"), { code: -32600 });
  if (method === "workspace/symbol") {
    const all = [...projects.values()].flatMap((index2) => index2.search(params.query ?? ""));
    return [...new Map(all.map((item) => [`${item.location.uri}:${item.location.range.start.line}:${item.name}`, item])).values()].slice(0, 500);
  }
  if (method === "endpointSearch/status") return { projects: [...projects.values()].map((index2) => ({ root: index2.root, ...index2.stats })) };
  if (method === "workspace/executeCommand" && params.command === "endpointSearch.reindex") {
    await Promise.all([...projects.values()].map((index2) => index2.reconcile()));
    return null;
  }
  if (method === "workspace/didChangeWorkspaceFolders") {
    for (const folder of params.event?.removed ?? []) {
      const root = toPath(folder.uri);
      const index2 = root && projects.get(import_node_path3.default.resolve(root));
      if (index2) {
        await index2.close();
        projects.delete(index2.root);
      }
    }
    for (const folder of params.event?.added ?? []) {
      const root = toPath(folder.uri);
      if (root) await addProject(root);
    }
    return;
  }
  if (method === "workspace/didChangeWatchedFiles") {
    for (const change of params.changes ?? []) {
      const file2 = toPath(change.uri);
      if (file2) {
        for (const index2 of projects.values()) if (!index2.isIgnored(file2)) index2.schedule(file2);
      }
    }
    return;
  }
  const file = toPath(params?.textDocument?.uri);
  const index = file && indexFor(file);
  if (method === "textDocument/didOpen" && index) {
    documents.set(file, { text: params.textDocument.text, version: params.textDocument.version });
    index.setDocument(file, params.textDocument.text);
    return;
  }
  if (method === "textDocument/didChange" && index) {
    const document2 = documents.get(file);
    if (document2 && params.textDocument.version > document2.version) {
      document2.text = applyChanges(document2.text, params.contentChanges);
      document2.version = params.textDocument.version;
      index.setDocument(file, document2.text);
    }
    return;
  }
  if (method === "textDocument/didClose") {
    documents.delete(file);
    await index?.closeDocument(file);
    return;
  }
  if (method === "textDocument/didSave" && index) {
    index.schedule(file);
    return;
  }
  if (message.id !== void 0) throw Object.assign(Error(`Method not found: ${method}`), { code: -32601 });
}
var queue = Promise.resolve();
var decoder = new Decoder();
process.stdin.on("data", (chunk) => {
  try {
    for (const message of decoder.push(chunk)) {
      if (!message.method) continue;
      queue = queue.then(async () => {
        try {
          const result = await handle2(message);
          if (message.id !== void 0) send({ id: message.id, result: result ?? null });
        } catch (error) {
          if (message.id !== void 0) send({ id: message.id, error: { code: error.code ?? -32603, message: error.message } });
          else log(`${message.method}: ${error.message}`);
        }
      });
    }
  } catch (error) {
    log(`Protocol error: ${error.message}`);
    void dispose().then(() => finish(1));
  }
});
process.stdin.on("end", () => {
  void queue.then(dispose).then(() => finish(0));
});
process.stdout.on("error", () => {
  void dispose().then(() => finish(1));
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => {
  void dispose().then(() => finish(0));
});
/*! Bundled license information:

chokidar/esm/index.js:
  (*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) *)
*/
