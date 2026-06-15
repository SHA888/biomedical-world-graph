# Biomedical World Graph

A live, evergrowing conceptual map of the biomedical landscape in 2026. This repository contains a taxonomy of interconnected biomedical fields, highlighting both foundational research areas and emerging hotspots.

## What Is This?

The biomedical world is vast and fragmented. This graph organizes it into **nine core limbs**:

1. **Foundational Sciences** — Biology, biochemistry, biophysics, systems biology
2. **Biomedical Engineering** — Biomaterials, tissue engineering, bioelectronics, lab-on-chip
3. **Biomedical Informatics** — EHR, clinical decision support, ontologies, foundation models
4. **Biomedical Research** — Genomics, proteomics, pharmacology, translational medicine
5. **Therapeutics & Interventions** — Drug discovery, gene editing, cell & gene therapy
6. **Clinical Practice** — Specialties, point-of-care diagnostics, wearables, software as medical device
7. **Public Health & Epidemiology** — Surveillance, precision public health, biostatistics
8. **Data & Methods** — Multi-omics, spatial biology, bioinformatics
9. **Regulatory, Ethics & Governance** — FDA guidance, IRB, reproducibility, funding landscape

**AI/ML** is drawn as a cross-cutting force, touching every limb simultaneously.

## Two Layers: Skeleton and Snapshot

- **Skeleton** (durable): The nine limbs and their structure are expected to remain valid for 5+ years. Changes here signal paradigm shifts.
- **Snapshot** (2026): Items marked with `*` represent active areas *right now* — hot topics from 2026 publications, funding, and regulatory moves. These will drift within a year.

## How to Use

### View the Interactive Map

Open `biomedical-world-graph.html` in a web browser. You can:

- **Pan and zoom** — Drag to move, scroll to zoom
- **Hover** — Dimming highlights one node and its immediate connections
- **Click nodes** — Inspect labels and relationships

### Explore the Taxonomy

Read `TAXONOMY.md` for:

- The full Mermaid graph (machine-readable, renderable in GitHub, VS Code, Obsidian, etc.)
- An outline form for quick scanning
- Evidence notes — where each 2026 hotspot is sourced from (publications, conferences, regulatory reporting)
- Honest limitations — where the map is incomplete or skewed

## Key Design Choices

- **Presence, not intensity.** Nodes are marked binary: active or not. True weighting (by publication volume, funding, team size) would need a separate quantitative pass.
- **Grounded in evidence.** Each 2026 hotspot points to a source: a recent publication, CVPR workshop, NIH funding trend, or regulatory announcement.
- **Conceptual, not exhaustive.** This is a landscape map, not a field registry. It prioritizes connectivity and signal over completeness.
- **Geographic skew.** Sources lean US-centric (NIH, FDA, major US conferences). EU/Asia dynamics are under-sampled.

## Keeping It Current

This graph is alive. As the biomedical landscape shifts:

1. Snapshot items are reviewed annually
2. Hot areas that matured are downgraded to the skeleton
3. New emerging signals are added and sourced
4. The evidence table is refreshed with the latest publications and regulatory moves

See `CLAUDE.md` for contribution guidelines.

## Files

- `TAXONOMY.md` — Single source of truth: Mermaid graph, outline, evidence, limitations
- `biomedical-world-graph.html` — Interactive SVG visualization with D3/vanilla JS
- `CLAUDE.md` — Developer guidance for editing and maintaining the taxonomy
- `.gitignore` — Standard exclusions (Claude Code state, node_modules, OS files)

## License

This taxonomy is open and evergrowing. Use it, cite it, fork it, extend it.

---

**Last updated:** June 2026  
**Scope note:** Conceptual/landscape map grounded in current sources for 2026-specific items; skeleton definitions are durable.
