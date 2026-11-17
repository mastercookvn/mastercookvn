// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import { useData } from "vitepress";
import { createMermaidRenderer } from "vitepress-mermaid-renderer";

import DefaultTheme from "vitepress/theme";
import { h, nextTick, watch } from "vue";

// sort-imports-ignore
import "@catppuccin/vitepress/theme/mocha/lavender.css";
import "./mermaid.css";
import "./header-counter.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { isDark } = useData();
    const initMermaid = () => {
      const mermaidRenderer = createMermaidRenderer({
        theme: isDark.value ? "redux-dark-color" : "redux-color",
        startOnLoad: false,
        sequence: {
          showSequenceNumbers: true,
          useMaxWidth: true,
        },
      });
      mermaidRenderer.setToolbar({
        showLanguageLabel: false,
        downloadFormat: "svg",
        desktop: {
          download: "enabled",
        },
        mobile: {
          download: "enabled",
        },
      });
    };
    nextTick(initMermaid);
    watch(() => isDark.value, initMermaid);

    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
} satisfies Theme;
