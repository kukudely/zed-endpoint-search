use std::{env, fs, path::Path};
use zed_extension_api as zed;

const ASSETS: &[(&str, &[u8])] = &[
    ("server.cjs", include_bytes!("../dist/server.cjs")),
    (
        "tree-sitter.wasm",
        include_bytes!("../dist/tree-sitter.wasm"),
    ),
    (
        "tree-sitter-java.wasm",
        include_bytes!("../dist/tree-sitter-java.wasm"),
    ),
];
const BUILD_ID: &str = include_str!("../dist/build-id.txt");

struct EndpointSearch;

impl zed::Extension for EndpointSearch {
    fn new() -> Self {
        Self
    }

    fn language_server_command(
        &mut self,
        _language_server_id: &zed::LanguageServerId,
        worktree: &zed::Worktree,
    ) -> zed::Result<zed::Command> {
        let home = env::current_dir().map_err(|error| error.to_string())?;
        let runtime = home.join("runtime").join(BUILD_ID.trim());
        fs::create_dir_all(&runtime).map_err(|error| error.to_string())?;
        for (name, contents) in ASSETS {
            let target = runtime.join(name);
            if fs::read(&target).ok().as_deref() == Some(*contents) {
                continue;
            }
            let temporary = runtime.join(format!("{name}.{}.tmp", worktree.id()));
            fs::write(&temporary, contents).map_err(|error| error.to_string())?;
            fs::rename(&temporary, &target).map_err(|error| error.to_string())?;
        }
        Ok(zed::Command {
            command: zed::node_binary_path()?,
            args: vec![
                string_path(&runtime.join("server.cjs"))?,
                "--worktree".into(),
                worktree.root_path(),
                "--cache-dir".into(),
                string_path(&home.join("indexes").join(BUILD_ID.trim()))?,
            ],
            env: vec![],
        })
    }
}

fn string_path(path: &Path) -> Result<String, String> {
    path.to_str()
        .map(str::to_owned)
        .ok_or_else(|| "Path is not valid UTF-8".into())
}

zed::register_extension!(EndpointSearch);
