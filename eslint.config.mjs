import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const scopeToWeb = (config) => {
  if (config.ignores) {
    return config;
  }

  return {
    ...config,
    files: (config.files ?? ["**/*.{js,mjs,cjs,jsx,ts,tsx}"]).map((pattern) =>
      pattern.startsWith("**/") ? `web/${pattern}` : pattern
    ),
  };
};

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/out/**",
    "**/out-tsc/**",
    "**/coverage/**",
    "**/*.tsbuildinfo",
    "docs/**",
  ]),

  ...[...nextCoreWebVitals, ...nextTypescript].map(scopeToWeb),

  {
    files: ["web/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    settings: {
      next: {
        rootDir: path.join(repoRoot, "web"),
      },
    },
  },

  {
    files: ["web/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@phosphor-icons/*",
                "simple-icons",
                "simple-icons/*",
                "lucide-react",
                "react-icons",
                "react-icons/*",
                "@heroicons/*",
              ],
              message: 'Project icons are custom: "@/components/icons".',
            },
          ],
        },
      ],
    },
  },

  {
    ...prettierRecommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}"],
  },
]);
