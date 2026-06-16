import { defineConfig } from "vite";

// Base config. When deploying to GitHub Pages under a project path,
// set `base` to "/biomedical-world-graph/" (see TODO.md → Deployment).
export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    open: true,
  },
});
