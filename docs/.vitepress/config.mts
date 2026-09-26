import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";

import getPort from "get-port";
import { DefaultTheme, UserConfig, defineConfig } from "vitepress";
import { type Plugin } from "vitepress";
import {
  BuildTimeDiagramPluginOptions,
  DiagramPluginOptions,
  configureDiagramsPlugin,
  createBuildTimeDiagramsPlugin,
} from "vitepress-plugin-diagrams";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { withSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";
import waitOn from "wait-on";

const REMOTE_KROKI_URL = "https://kroki.io";
const WIN32_EXECUTABLE_EXTENSIONS = [".exe", ".cmd", ".bat", ".com"];

const remoteKrokiUrl =
  process.env.DOCS_KROKI_URL?.trim() ||
  process.env.KROKI_SERVER_URL?.trim() ||
  undefined;

const forceLocalKroki = ["1", "true", "yes"].includes(
  (process.env.DOCS_LOCAL_KROKI ?? "").toLowerCase(),
);

const useLocalKroki = !remoteKrokiUrl && (forceLocalKroki || !process.env.CI);

const krokiPort = useLocalKroki ? await getPort({ port: 8000 }) : undefined;

const krokiServerUrl =
  remoteKrokiUrl ??
  (krokiPort ? `http://localhost:${krokiPort}` : REMOTE_KROKI_URL);

const diagramPluginOptions = {
  diagramsDir: "src/public/diagrams",
  publicPath: "/mastercookvn/diagrams",
  excludedDiagramTypes: ["mermaid"],
  krokiServerUrl,
} satisfies DiagramPluginOptions & BuildTimeDiagramPluginOptions;

type KrokiWrapperOptions = {
  port: number;
  docker?: boolean;
};

type KrokiCommand = {
  command: string;
  args: string[];
};

function isFile(candidate: string): boolean {
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}

function resolveOnPath(bin: string): string | null {
  const dirs = (process.env.PATH ?? "").split(path.delimiter).filter(Boolean);
  const names =
    process.platform === "win32"
      ? [bin, ...WIN32_EXECUTABLE_EXTENSIONS.map((ext) => `${bin}${ext}`)]
      : [bin];

  for (const dir of dirs) {
    for (const name of names) {
      const candidate = path.join(dir, name);
      if (isFile(candidate)) return candidate;
    }
  }
  return null;
}

function resolveWithMise(bin: string): string | null {
  try {
    const resolved = execFileSync("mise", ["which", bin], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return resolved && isFile(resolved) ? resolved : null;
  } catch {
    return null;
  }
}

function resolveKrokiCommand({
  port,
  docker,
}: KrokiWrapperOptions): KrokiCommand {
  if (docker) {
    return {
      command: "docker",
      args: [
        "run",
        "--rm",
        "-e",
        "DEBUG=true", // for d2
        "-p",
        `${port}:8000`,
        "yuzutech/kroki",
      ],
    };
  }

  const jarOverride = process.env.DOCS_KROKI_JAR?.trim();
  if (jarOverride) return { command: "java", args: ["-jar", jarOverride] };

  const krokiBin = resolveOnPath("kroki");
  if (krokiBin) return { command: krokiBin, args: [] };

  const jar = resolveWithMise("kroki-server.jar");
  if (jar) return { command: "java", args: ["-jar", jar] };

  throw new Error(
    "Kroki not found. Run `mise install` in docs/, put a `kroki` launcher on " +
      "PATH, set DOCS_KROKI_JAR to the standalone jar, or set DOCS_KROKI_URL " +
      "to a remote Kroki server.",
  );
}

export function createDiagramsWithKroki(options: KrokiWrapperOptions): Plugin {
  const krokiUrl = `http://localhost:${options.port}`;
  let krokiProcess: ChildProcess | null = null;
  let started = false;

  async function startKroki() {
    if (started) return;
    started = true;

    const { command, args } = resolveKrokiCommand(options);
    const child = spawn(command, args, {
      stdio: ["ignore", "ignore", "inherit"],
      env: {
        ...process.env,
        KROKI_PORT: String(options.port),
        DEBUG: "true", // for d2
      },
    });
    krokiProcess = child;

    const exitedEarly = new Promise<never>((_, reject) => {
      child.once("error", reject);
      child.once("exit", (code, signal) =>
        reject(
          new Error(
            `Kroki (${command}) exited with ${code ?? signal} ` +
              "before becoming healthy",
          ),
        ),
      );
    });

    await Promise.race([
      waitOn({
        resources: [`http-get://localhost:${options.port}/health`],
        timeout: 30_000,
      }),
      exitedEarly,
    ]);

    console.log(`🟢 Kroki started at ${krokiUrl}`);
  }

  function stopKroki() {
    if (krokiProcess) {
      krokiProcess.kill();
      krokiProcess = null;
      console.log("🔴 Kroki stopped");
    }
  }

  return {
    name: "vitepress-diagrams-kroki",

    async configureServer(server) {
      await startKroki();
      server.httpServer?.once("close", stopKroki);
    },

    async buildStart() {
      await startKroki();
    },

    closeBundle() {
      stopKroki();
    },
  };
}

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "Mastercookvn",
  description: "MastercookVN",
  lang: "en-GB",
  base: "/mastercookvn/",
  srcDir: "src",
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config: (md) => {
      configureDiagramsPlugin(md, diagramPluginOptions);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mastercookvn/mastercookvn",
      },
    ],
  },
  vite: {
    plugins: [
      ...(krokiPort ? [createDiagramsWithKroki({ port: krokiPort })] : []),
      pagefindPlugin(),
      createBuildTimeDiagramsPlugin(diagramPluginOptions),
    ],
  },
} satisfies UserConfig<NoInfer<DefaultTheme.Config>>;

const vitePressSidebarOptions = {
  documentRootPath: "src",
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
  collapsed: true,
  collapseDepth: 2,
} satisfies VitePressSidebarOptions;

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
);
