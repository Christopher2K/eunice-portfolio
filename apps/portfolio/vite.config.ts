import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";

const config = defineConfig({
  optimizeDeps: {
    exclude: ["@payloadcms/live-preview"],
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    viteReact(),
    nitroV2Plugin({
      preset: "node-server",
      compatibilityDate: "2026-06-18",
    }),
    svgr({
      include: "**/*.svg",
    }),
  ],
});

export default config;
