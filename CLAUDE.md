# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Biomedical World Graph** is a live, evergrowing conceptual map of the biomedical landscape. It distinguishes between:

- **Skeleton** (durable): The limb structure and naming hierarchy — foundational sciences, engineering, informatics, research, therapeutics, clinical practice, public health, data & methods, regulatory/governance
- **Snapshot** (2026 hotspots): Items marked with `*` in the graph represent live movement as of 2026 and will drift within a year

The taxonomy is grounded in evidence: each year's active areas are sourced from current publications, funding signals, and regulatory developments.

## Project Structure

The project is a **Vite + TypeScript** web app (package manager: **pnpm**). A renderer migration is in progress — see `TODO.md` for the phased roadmap.

- `TAXONOMY.md` — Mermaid graph, outline form, evidence notes, and limitations. This is the **human-facing single source of truth** for the taxonomy.
- `src/data/taxonomy.ts` — Typed runtime SSOT mirrored from `TAXONOMY.md` (`HOT`, `AI_TARGETS`, `NOTES`, `LIMBS`, and `buildGraph()`). Consumed by the app.
- `src/scene/graph.ts`, `src/ui/panel.ts` — 3D scene + inspector panel (currently documented stubs awaiting Phase 2 migration).
- `src/main.ts`, `src/style.css`, `index.html` — Vite entry / landing shell.
- `biomedical-world-graph.html` — **Legacy** interactive 3D Three.js visualization (CDN-loaded). Still live and untouched until the Phase 2 migration ports it into `src/`, after which it is retired. Shows the same taxonomy with:
  - Core node (Biomedical, central yellow)
  - Limb nodes (primary buckets, blue)
  - Leaf nodes (2026 snapshot items, orange with pulse animation; stable items, gray)
  - AI/ML cross-cutting force (blue dotted lines with animated flow)
  - Click/drag interactions and hover dimming
- `TODO.md` — Migration roadmap (Scaffold → Tooling → Migrate renderer → Data pipeline → Deployment → Polish).

## Editing the Taxonomy

### Adding or Moving a Node

1. Edit the Mermaid graph in TAXONOMY.md (`## Graph` section)
2. Simultaneously update the outline (`## Taxonomy (outline form)` section)
3. If 2026-snapshot, mark with `*` and add the corresponding `classDef hot` CSS class
4. Update `## 2026 evidence notes` table with the source signal (publication, conference, reporting)
5. Mirror the change into `src/data/taxonomy.ts` (the typed runtime SSOT: `LIMBS`, `HOT`, `AI_TARGETS`, `NOTES`). Until the Phase 3 data pipeline lands, these two files are kept in sync by hand.
6. Test the app (`pnpm dev`) and verify `pnpm typecheck` still passes

### Seasonal Updates (Annual)

The `*` snapshot items are the mutable layer. Each year:

1. Review recent publications, funding announcements, and regulatory moves
2. Reclassify snapshot items: keep hot (still moving), downgrade to skeleton (matured/stable), or remove (activity dropped)
3. Add emerging hot areas
4. Update the evidence table with latest sources
5. Adjust the "Honest limitations" section if geographic or intensity skew changes

### Graph Semantics

- **Hierarchy**: Edges show "Biomedical → (limb) → (leaf)" structure. A node belongs to exactly one parent. AI/ML is the exception — it connects as a cross-cutting force (dotted lines), not a limb
- **Color coding** (in HTML/CSS):
  - Yellow: Core ("Biomedical")
  - Blue: Limbs
  - Gray: Stable leaves (mature, not 2026-hot)
  - Orange (with glow/pulse): 2026 snapshot nodes (active right now)
  - Cyan: AI/ML cross-cutting force

## Refreshing the Visualization

The visualization reads from `src/data/taxonomy.ts`, which is mirrored from `TAXONOMY.md`. After editing the taxonomy:

1. Verify the Mermaid graph renders correctly in a markdown preview or online Mermaid editor
2. Confirm `src/data/taxonomy.ts` reflects the same nodes/links (see step 5 of "Adding or Moving a Node")
3. Run `pnpm dev` and test interaction: drag to rotate, scroll to zoom, click a node to inspect

While the legacy `biomedical-world-graph.html` is still the live renderer, also sync its inline data literals during edits. Once Phase 2 retires it, `src/data/taxonomy.ts` is the only place to touch.

## Key Design Notes

- **Scope**: This is a conceptual/landscape map (not an exhaustive field registry). It prioritizes connectivity and 2026 signals over comprehensiveness
- **Durable skeleton**: The nine limbs and their immediate children are expected to remain valid for 5+ years. Add new limbs only for paradigm shifts
- **Snapshot honesty**: Limitations section (end of TAXONOMY.md) openly states: skeleton vs. snapshot, presence (not intensity/weighting), geographic US-centric skew

## Development Workflow

The project uses **pnpm** + **Vite** + **TypeScript**.

```bash
pnpm install      # install dependencies (run once)
pnpm dev          # start the Vite dev server (HMR)
pnpm typecheck    # tsc --noEmit
pnpm build        # typecheck + production build to dist/
pnpm preview      # preview the production build
```

Typical taxonomy-change workflow:

1. Edit `TAXONOMY.md` (graph + outline + evidence)
2. Mirror the change into `src/data/taxonomy.ts`
3. Verify markdown renders, then run `pnpm dev` and `pnpm typecheck`
4. Commit related files together with a message like `Update 2026 snapshot: add X, deprecate Y`

For code changes, `pnpm typecheck` (and `pnpm build`) must pass before committing. See `TODO.md` for the migration roadmap and remaining quality gates (lint, tests).

## Commit Guidelines

**Do not include `Co-Authored-By:` trailers in commit messages.** This applies to all assistant-generated commits, including those produced by Claude Code or any other AI tool. Commit attribution stays with the human author. Boilerplate trailers add noise to the history without conveying meaningful authorship and have been retroactively stripped from past commits.

## English-Only Requirement

- All Plans.md content must be in English (headers, table columns, task descriptions, status markers).
- No Japanese characters in Plans.md status markers (use `cc:done` instead of `cc:完了`, `cc:wip` instead of `cc:WIP`, etc).
- All harness output and documentation must be in English.
- TAXONOMY.md and biomedical-world-graph.html must remain in English.
- This applies strictly to tracked files; commit to this constraint when editing Plans.md.
