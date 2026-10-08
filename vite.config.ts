import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes every asset path relative, so the site works on GitHub Pages
// whether it is served from https://user.github.io/ or https://user.github.io/repo-name/
// Navigation uses hash routes (#/work/...), so no server-side rewrites are needed.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false, chunkSizeWarningLimit: 700 },
});
