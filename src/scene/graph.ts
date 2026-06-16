/**
 * 3D force-directed graph scene.
 *
 * STUB — not yet migrated. The working Three.js implementation currently lives
 * inline in `biomedical-world-graph.html`. The migration (see TODO.md → Migrate
 * the renderer) will port that code here as a `GraphScene` class:
 *
 *   - construct nodes/links/beams from `buildGraph()` (src/data/taxonomy.ts)
 *   - run the force simulation each frame
 *   - own the WebGLRenderer + CSS2DRenderer + camera + interaction
 *   - expose start()/dispose()/onSelect() so main.ts can wire the UI panel
 *
 * Known bug to fix during migration: the legacy file references `nodeData` in
 * its label-building block before the `const nodeData` declaration (temporal
 * dead zone) — labels must be built after nodeData exists.
 */

import type { TaxonomyNode, TaxonomyLink } from "../data/taxonomy.ts";

export interface GraphSceneOptions {
  canvas: HTMLCanvasElement;
  nodes: TaxonomyNode[];
  links: TaxonomyLink[];
  onSelect?: (node: TaxonomyNode | null) => void;
}

export class GraphScene {
  constructor(_options: GraphSceneOptions) {
    // TODO(migration): initialize Three.js scene, simulation, and interaction.
  }

  start(): void {
    throw new Error("GraphScene.start() not yet implemented — see TODO.md");
  }

  dispose(): void {
    // TODO(migration): tear down renderers, listeners, and animation frame.
  }
}
