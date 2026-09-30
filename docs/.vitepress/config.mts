import { spawn, type ChildProcess } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";

import getPort from "get-port";
import { DefaultTheme, UserConfig, defineConfig } from "vitepress";
import { type Plugin } from "vitepress";
import {
  BuildTimeDiagramPluginOptions,
  DiagramPluginOptions,
  createBuildTimeDiagramsPlugin,
} from "vitepress-plugin-diagrams";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { withSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";
import waitOn from "wait-on";

const COMPOSE_KROKI_URL = "http://localhost:8002";
const PUBLIC_KROKI_URL = "https://kroki.io";
const KROKI_PROBE_TIMEOUT = 3_000;
const WIN32_EXECUTABLE_EXTENSIONS = [".exe", ".cmd", ".bat", ".com"];

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

const configuredKrokiUrl =
  process.env.DOCS_KROKI_URL?.trim() ||
  process.env.KROKI_SERVER_URL?.trim() ||
  undefined;

const krokiBin = configuredKrokiUrl ? null : resolveOnPath("kroki");

const krokiPort = krokiBin ? await getPort({ port: 8000 }) : undefined;

function krokiHealthResource(url: string): string {
  return `${url.replace(/^https?/, (scheme) => `${scheme}-get`)}/health`;
}

async function isKrokiHealthy(
  url: string,
  timeout = KROKI_PROBE_TIMEOUT,
): Promise<boolean> {
  try {
    await waitOn({ resources: [krokiHealthResource(url)], timeout });
    return true;
  } catch {
    return false;
  }
}

async function resolveKrokiServerUrl(): Promise<string | undefined> {
  if (configuredKrokiUrl) return configuredKrokiUrl;

  if (krokiPort) return `http://localhost:${krokiPort}`;

  if (await isKrokiHealthy(COMPOSE_KROKI_URL)) return COMPOSE_KROKI_URL;

  console.warn(
    `⚠️  No local Kroki at ${COMPOSE_KROKI_URL}, falling back to ` +
      `${PUBLIC_KROKI_URL}. Diagram sources leave your machine and rendering ` +
      "is rate limited; run `docker compose up -d` in docs/ or set " +
      "DOCS_KROKI_URL to use a Kroki you control.",
  );
  return undefined;
}

const krokiServerUrl = await resolveKrokiServerUrl();

const diagramPluginOptions = {
  diagramsDir: "src/public/diagrams",
  publicPath: "/mastercookvn/diagrams",
  diagramsDistDir: "diagrams",
  excludedDiagramTypes: ["mermaid"],
  ...(krokiServerUrl ? { krokiServerUrl } : {}),
} satisfies DiagramPluginOptions & BuildTimeDiagramPluginOptions;

const diagrams = createBuildTimeDiagramsPlugin(diagramPluginOptions);

type KrokiWrapperOptions = {
  bin: string;
  port: number;
};

function waitForKroki(url: string): Plugin {
  const health = krokiHealthResource(url);

  return {
    name: "vitepress-diagrams-kroki-wait",
    apply: "build",

    async buildStart() {
      try {
        await waitOn({ resources: [health], timeout: 30_000 });
      } catch {
        throw new Error(
          `Kroki is not reachable at ${url}, configured via DOCS_KROKI_URL / ` +
            "KROKI_SERVER_URL. Start that server, point the variable at a " +
            "running one, or unset it to fall back to " +
            `${PUBLIC_KROKI_URL}.`,
        );
      }
    },
  };
}

export function createDiagramsWithKroki({
  bin,
  port,
}: KrokiWrapperOptions): Plugin {
  const krokiUrl = `http://localhost:${port}`;
  let krokiProcess: ChildProcess | null = null;
  let started = false;

  async function startKroki() {
    if (started) return;
    started = true;

    const child = spawn(bin, {
      stdio: ["ignore", "ignore", "inherit"],
      env: {
        ...process.env,
        KROKI_PORT: String(port),
        DEBUG: "true", // for d2
      },
    });
    krokiProcess = child;

    const exitedEarly = new Promise<never>((_, reject) => {
      child.once("error", reject);
      child.once("exit", (code, signal) =>
        reject(
          new Error(
            `Kroki (${bin}) exited with ${code ?? signal} ` +
              "before becoming healthy",
          ),
        ),
      );
    });

    await Promise.race([
      waitOn({
        resources: [`http-get://localhost:${port}/health`],
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
      diagrams.configureMarkdown(md);
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
      ...(krokiBin && krokiPort
        ? [createDiagramsWithKroki({ bin: krokiBin, port: krokiPort })]
        : configuredKrokiUrl
          ? [waitForKroki(configuredKrokiUrl)]
          : []),
      pagefindPlugin(),
      diagrams.vitePlugin(),
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
