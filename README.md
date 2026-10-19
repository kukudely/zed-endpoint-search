# Endpoint Search for Zed

面向「Agent 写代码、人在 Zed 搜索和浏览接口」的轻量 Spring 接口索引插件。直接解析 Java 源码，通过 `Ctrl+T` 搜索并跳到映射注解；**不启动 JVM、不导入 Maven/Gradle、不下载项目依赖**。

## 使用

打开项目中的任意一个 Java 文件，让 Zed 启动该语言的服务。之后索引器自动扫描整个工作树，**不需要逐个打开 Maven 子模块**。

按 **Ctrl+T** 输入：

```text
@/api/users/settings
@/users
```

结果例如 `@/users/{id} -- GET`，回车跳到源文件。`ANY` 表示注解没有限制 HTTP 方法。支持不区分大小写的连续片段和按顺序跳字匹配：`users/settings`、`usersettings`、`@/usersettings`、`@/settings` 均能匹配 `/api/users/settings/...`。字符必须保持顺序；这不是拼写纠错或正则搜索。连续匹配优先于宽松匹配进入候选列表，Zed 会再次进行模糊排序。

服务也检索类名、方法名和文件名，但 Zed 会对显示的接口名称再次过滤，因此这些附加字段的查询结果不一定能在 Ctrl+T 中显示。最多返回 500 条，请输入更具体的路径缩小范围。

索引更新不依赖 Spring 应用运行。保存文件、Agent 在外部修改文件、增加/删除 Controller 都会触发更新；Zed 中未保存的修改也参与搜索。已打开的搜索弹窗是否主动刷新由 Zed 控制，必要时改一下搜索词或重新打开。

## 本机开发安装

当前通过 GitHub 分发，尚未上架 Zed 扩展市场。先克隆仓库：

```powershell
git clone https://github.com/kukudely/zed-endpoint-search.git
cd zed-endpoint-search
```

要求 Node.js >=20、Rust（构建扩展时）和 Zed 的 Java 扩展（提供 Java 语言识别）。接口索引本身不需要 JDK；Java 扩展的补全/诊断服务仍有自己的 JDK 要求。

```powershell
npm.cmd ci --ignore-scripts --registry=https://registry.npmjs.org
npm.cmd test
npm.cmd run build
rustup target add wasm32-wasip2
cargo build --target wasm32-wasip2 --release --offline
```

如果本机尚未缓存 Rust 依赖，第一次构建去掉 `--offline`。

在 Zed 命令面板执行 `zed: install dev extension`，选择本项目根目录。Zed 会编译并注册开发扩展；构建时 `cargo` 必须在 Zed 的 PATH 中。`dist/` 已包含 JS 和 WASM 运行资产，因此插件运行时不需要 npm install。

修改服务源码后执行 `npm.cmd run build`，再在扩展页面重建开发扩展。只修改源码而不重建不会更新已加载的插件。开发安装保留对本目录的引用，请勿移动/删除此目录。

## 与现有 Java / Spring Tools 共存

保留 Java 补全，关闭原 Spring 服务，避免重复结果和慢启动。在项目 `.zed/settings.json` 的现有配置中合并：

```json
{
  "languages": {
    "Java": {
      "language_servers": ["endpoint-search", "!spring-tools", "..."]
    }
  }
}
```

如只需要浏览、文件搜索、接口搜索，也可用 `["endpoint-search"]`。这样该项目的 Java 补全、类型检查等 JDTLS 能力不会启动；这不是插件默认行为。

本插件通过 Zed 的标准 `workspace/symbol` 接口提供结果，没有独立面板。首次自动启动仍取决于 Zed 是否打开 Java 文件。

## 能力范围

- `@RequestMapping`、`@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping`、`@PatchMapping`。
- 类/方法路径组合，`value` / `path`，路径数组，多个 HTTP 方法，完全限定注解名。
- 同一个类内的 `static final` 字符串常量及字符串拼接；接口字段的隐式常量。
- Tree-sitter 语法解析，忽略注释中的假注解和显式导入自其他包的同名注解。
- 工作树独立缓存、冷启动扫描、缓存先响应后校正、外部文件监听、30 秒兜底扫描。
- 忽略生成目录及根目录 `.gitignore`；不跟随符号链接；跳过超过 4 MiB 的 Java 文件。

这是**源码声明导航**，不是运行时生效路由清单：例如 Feign 接口中的 Spring 映射也会出现。当前不推断继承映射、自定义组合注解、跨类常量、依赖 JAR、Kotlin 或运行时路由。`${...}` / `#{...}` 和无法求值的路径显示为 `@? ... [unresolved]`；组合注解等未识别结构可能没有条目。不自动拼接 servlet context path、网关前缀或按 Spring Profile 判断启用状态。

仅支持根目录 `.gitignore`，不解释嵌套 `.gitignore`。缓存恢复后短暂显示旧内容是预期行为，后台扫描会校正。文件监听丢失事件时由 30 秒扫描恢复；保留修改时间与大小不变的特殊写入可能需要重建索引。

## 性能验证与排查

```powershell
npm.cmd run benchmark -- C:\projects\spring-demo
$env:ENDPOINT_TEST_SERVER = 'dist/server.cjs'
node --test tests/lsp.test.mjs
```

基准只读源码，独立缓存写在本项目 `.tmp/benchmarks/`；结果保存在 `.tmp/benchmarks/latest.json`。它测量服务组件，不包含 Zed UI、Rust/WASM 启动器或 JDTLS 的耗时。

Zed 内通过 `dev: open language server logs` 选择 **Endpoint Search** 排查。日志只写 stderr，LSP stdout 保持协议格式。初始化后 `endpointSearch/status` 可供调试客户端读取索引统计，`workspace/executeCommand` 的 `endpointSearch.reindex` 可触发扫描。

扩展缓存位于 Zed 的 `extensions/work/endpoint-search/indexes/<build-id>/`，按工作树绝对路径隔离；安装新构建自动使用新缓存。源码路径、路由和位置保存在本地缓存中，不上传。关闭 Zed 后删除对应缓存文件即可强制首次扫描。

## 目录

- `server/java.mjs`：Java 注解解析。
- `server/index.mjs`：文件扫描、缓存、监听和查询。
- `server/protocol.mjs`、`server/server.mjs`：stdio LSP 与编辑器事件。
- `src/lib.rs`、`extension.toml`：Zed 扩展启动器。
- `tests/`：解析、缓存/文件事件和 stdio 回归测试。
- `scripts/build.mjs`：打包运行资产；第三方许可见 `dist/THIRD-PARTY-NOTICES.txt`。
