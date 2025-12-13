import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";

const config = defineConfig({
  optimizeDeps: {
    exclude: ["@payloadcms/live-preview"],
  },
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    nitroV2Plugin({
      preset: "node-server",
    }),
    svgr({
      include: "**/*.svg",
    }),
  ],
});

export default config;
