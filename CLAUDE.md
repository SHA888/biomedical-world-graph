# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Biomedical World Graph** is a live, evergrowing conceptual map of the biomedical landscape. It distinguishes between:

- **Skeleton** (durable): The limb structure and naming hierarchy — foundational sciences, engineering, informatics, research, therapeutics, clinical practice, public health, data & methods, regulatory/governance
- **Snapshot** (2026 hotspots): Items marked with `*` in the graph represent live movement as of 2026 and will drift within a year

The taxonomy is grounded in evidence: each year's active areas are sourced from current publications, funding signals, and regulatory developments.

## Project Structure

- `TAXONOMY.md` — Mermaid graph, outline form, evidence notes, and limitations. This is the single source of truth.
- `biomedical-world-graph.html` — Interactive D3/SVG visualization. Shows the same taxonomy with:
  - Core node (Biomedical, central yellow)
  - Limb nodes (primary buckets, blue)
  - Leaf nodes (2026 snapshot items, orange with pulse animation; stable items, gray)
  - AI/ML cross-cutting force (blue dotted lines with animated flow)
  - Click/drag interactions and hover dimming

## Editing the Taxonomy

### Adding or Moving a Node

1. Edit the Mermaid graph in TAXONOMY.md (`## Graph` section)
2. Simultaneously update the outline (`## Taxonomy (outline form)` section)
3. If 2026-snapshot, mark with `*` and add the corresponding `classDef hot` CSS class
4. Update `## 2026 evidence notes` table with the source signal (publication, conference, reporting)
5. Test the HTML visualization (open in a browser; drag to pan, click nodes to inspect)

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

## Refreshing the HTML Visualization

The HTML file is hand-maintained alongside TAXONOMY.md. After editing the taxonomy:

1. Verify the Mermaid graph renders correctly in a markdown preview or online Mermaid editor
2. Manually synchronize node positions and styling in the HTML SVG if the graph structure changed significantly
3. Test interaction: pan/zoom should work; hover dimming should highlight one node's neighborhood

The HTML is not auto-generated; keep both files in sync during edits.

## Key Design Notes

- **Scope**: This is a conceptual/landscape map (not an exhaustive field registry). It prioritizes connectivity and 2026 signals over comprehensiveness
- **Durable skeleton**: The nine limbs and their immediate children are expected to remain valid for 5+ years. Add new limbs only for paradigm shifts
- **Snapshot honesty**: Limitations section (end of TAXONOMY.md) openly states: skeleton vs. snapshot, presence (not intensity/weighting), geographic US-centric skew

## Development Workflow

Since there are no tests or build tools, the workflow is:

1. Edit `TAXONOMY.md` (graph + outline + evidence)
2. Verify markdown renders
3. Optionally sync `biomedical-world-graph.html` if structure changed
4. Commit both files together with a message like `Update 2026 snapshot: add X, deprecate Y`

No linting, building, or testing is needed; clarity and accuracy are the only quality gates.

## Commit Guidelines

- **Do not include `Co-Authored-By:` trailers** in commit messages. This applies to all assistant-generated commits. Commit attribution stays with the human author.
- All commit messages must be in **English only**.

## English-Only Requirement

All tracked files must follow this constraint:

- All Plans.md content must be in English (headers, table columns, task descriptions, status markers)
- No Japanese characters in Plans.md status markers (use `cc:done` instead of `cc:完了`, `cc:wip` instead of `cc:WIP`, etc.)
- All harness output and documentation must be in English
- TAXONOMY.md and biomedical-world-graph.html must remain in English
