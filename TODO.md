# TODO — Web App Migration

Roadmap for turning the Biomedical World Graph from a single hand-maintained HTML
file into a proper Vite + TypeScript web app. Status markers: `[ ]` todo,
`[~]` in progress, `[x]` done.

The live visualization currently still lives in `biomedical-world-graph.html`
(loaded from CDN Three.js). It keeps working untouched until the renderer
migration (Phase 2) lands.

---

## Phase 0 — Scaffold ✅ (this pass)

- [x] `package.json` with Vite + TypeScript + Three.js, scripts (`dev`, `build`, `preview`, `typecheck`)
- [x] `tsconfig.json` / `tsconfig.node.json` (strict mode, bundler resolution)
- [x] `vite.config.ts`
- [x] `index.html` Vite entry mounting `#app`
- [x] `src/main.ts` landing shell (exercises the data pipeline end-to-end)
- [x] `src/style.css`
- [x] `src/data/taxonomy.ts` — typed extraction of the graph data + `buildGraph()`
- [x] `src/scene/graph.ts`, `src/ui/panel.ts` — documented stubs
- [x] `.gitignore` updated (commit `pnpm-lock.yaml`, ignore `dist/` + other lockfiles)
- [x] `pnpm install` and confirm `pnpm dev` / `pnpm build` / `pnpm typecheck` succeed

## Phase 1 — Tooling & quality gates

- [ ] Add ESLint (typescript-eslint) + config
- [ ] Add Prettier + `format` script; reconcile with `.editorconfig`
- [ ] Add a `lint` script and wire `typecheck` + `lint` into a single `check` script
- [ ] Add Vitest for unit tests; first test covers `buildGraph()` node/link counts
- [ ] Pre-commit hook (husky + lint-staged) — optional

## Phase 2 — Migrate the renderer

- [ ] Port the inline Three.js code from `biomedical-world-graph.html` into `src/scene/graph.ts` as a `GraphScene` class
  - [ ] Consume `buildGraph()` output instead of the inline data literals
  - [ ] **Fix latent bug:** legacy file builds CSS2D labels referencing `nodeData` before its `const` declaration (temporal dead zone). Build labels after `nodeData` exists.
  - [ ] Move the force simulation, raycasting, drag-rotate, and zoom into the class
  - [ ] Expose `start()`, `dispose()`, and an `onSelect` callback
- [ ] Port `showPanel`/`hidePanel` into `src/ui/panel.ts` as `InspectorPanel`
- [ ] Port the HUD (title, legend, AI/ML toggle, hint) into typed components
- [ ] Move the inline `<style>` from the legacy HTML into CSS modules / `style.css`
- [ ] Replace the landing shell in `main.ts` with the real app wiring
- [ ] Verify visual + interaction parity with the legacy file, then retire `biomedical-world-graph.html`

## Phase 3 — Data pipeline (SSOT)

- [ ] Decide canonical source: keep `TAXONOMY.md` human-facing and `src/data/taxonomy.ts` generated, OR invert
- [ ] Write a small generator/parser so the Mermaid graph in `TAXONOMY.md` and `src/data/taxonomy.ts` cannot drift
- [ ] Add a CI check that fails if the two are out of sync
- [ ] Move inspector `NOTES` and 2026 evidence into the data layer with sources

## Phase 4 — Deployment (deferred)

- [ ] Set `base: "/biomedical-world-graph/"` in `vite.config.ts` for project Pages
- [ ] GitHub Actions workflow: build on push to `main`, publish `dist/` to Pages
- [ ] Update README "Live on GitHub Pages" link / screenshot if the URL changes
- [ ] Confirm the legacy `biomedical-world-graph.png` is still accurate or regenerate

## Phase 5 — Polish & docs

- [ ] Responsive / mobile interaction (touch drag + pinch zoom)
- [ ] Accessibility pass (keyboard nav for nodes, reduced-motion, ARIA on panel)
- [ ] Loading state + error boundary if WebGL is unavailable
- [ ] Update `README.md` with the new dev workflow (`npm install`, `npm run dev`)
- [ ] Update `CLAUDE.md` — it currently says "no tests or build tools"; document the new toolchain and the "edit TAXONOMY.md first" data rule

---

## Notes / decisions

- **Stack:** Vite + TypeScript + vanilla Three.js (no UI framework — the app is a single canvas + HUD).
- **Package manager:** pnpm (declared via `packageManager` in `package.json`). Commit `pnpm-lock.yaml`.
- **Three.js version:** pinned to `^0.160`. The legacy file used r128; the API for `CSS2DRenderer`/examples imports differs in modern versions — account for this during Phase 2 (`three/examples/jsm/renderers/CSS2DRenderer.js`).
- **English-only:** all files must stay English per `CLAUDE.md`.
- **Commits:** no `Co-Authored-By:` trailers (per `CLAUDE.md`).
