import { execSync } from "child_process";
import path from "path";
import prettier from "prettier";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide a file path.");
  process.exit(1);
}

async function formatFile() {
  try {
    const absolutePath = path.resolve(filePath);

    const info = await prettier.getFileInfo(absolutePath, {
      resolveConfig: true,
      ignorePath: ".prettierignore",
    });

    if (info.inferredParser) {
      execSync(`pnpm exec prettier --write "${absolutePath}"`, {
        stdio: "inherit",
      });
    }
  } catch (error) {
    console.error(`Error checking/formatting file: ${error.message}`);
    process.exit(1);
  }
}

formatFile();
