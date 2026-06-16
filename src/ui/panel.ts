/**
 * Node inspector panel.
 *
 * STUB — not yet migrated. Port the `showPanel`/`hidePanel` logic from
 * `biomedical-world-graph.html` here (see TODO.md → Migrate the UI). It should
 * render: tag (term / limb / 2026 movement / sub-field / cross-cutting force),
 * name, NOTES[id], and the list of child leaves for limb nodes.
 */

import type { TaxonomyNode } from "../data/taxonomy.ts";

export class InspectorPanel {
  constructor(_root: HTMLElement) {
    // TODO(migration): cache element references.
  }

  show(_node: TaxonomyNode): void {
    // TODO(migration): populate and reveal the panel.
  }

  hide(): void {
    // TODO(migration): hide the panel.
  }
}
