import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const event = JSON.parse(readFileSync(0, "utf8"));
const patch = event.tool_input.command;
const hook = fileURLToPath(
  new URL("../../.claude/hooks/post-edit.js", import.meta.url)
);
const files = new Set();

for (const line of patch.split("\n")) {
  const match = /^\*\*\* (?:Add File|Update File|Move to): (.+)$/.exec(line);
  if (match) {
    files.add(path.resolve(event.cwd, match[1]));
  }
}

for (const file of files) {
  if (!existsSync(file)) {
    continue;
  }
  execFileSync(process.execPath, [hook, file], {
    cwd: event.cwd,
    stdio: "inherit",
  });
}
