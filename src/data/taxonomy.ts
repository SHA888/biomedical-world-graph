/**
 * Typed taxonomy data — the runtime SSOT for the visualization.
 *
 * Transcribed verbatim from `biomedical-world-graph.html` and kept in sync with
 * `TAXONOMY.md`. Nothing here is invented: `*` (HOT) marks the 2026 snapshot
 * layer, and AI_TARGETS lists the 8 explicit cross-cutting targets from source.
 *
 * NOTE: TAXONOMY.md remains the human-facing source of truth. When the taxonomy
 * changes, edit TAXONOMY.md first, then mirror the change here. A future task
 * (see TODO.md → Data pipeline) may generate this file from TAXONOMY.md.
 */

export type NodeType = "core" | "limb" | "leaf" | "hot" | "aihub";

export interface TaxonomyNode {
  id: string;
  name: string;
  type: NodeType;
  /** Present on limb nodes: [id, name] pairs of child leaves. */
  kids?: ReadonlyArray<readonly [string, string]>;
}

export interface TaxonomyLink {
  source: string;
  target: string;
  /** 1 = core→limb, 2 = limb→leaf. */
  tier: 1 | 2;
}

interface LimbDef {
  id: string;
  name: string;
  kids: ReadonlyArray<readonly [string, string]>;
}

/** Node ids that are live 2026 movement (the `*` snapshot layer). */
export const HOT: ReadonlySet<string> = new Set([
  "sysbio", "biomat", "tissue", "bioelec", "loc", "fmodels", "dtwin", "drug",
  "gened", "cellgene", "degrad", "diag", "wear", "samd", "surv", "precph",
  "datastrat", "spatial", "reg", "repro", "fund",
]);

/** The 8 explicit cross-cutting targets where AI/ML pushes (per source). */
export const AI_TARGETS: ReadonlyArray<string> = [
  "fmodels", "tissue", "surv", "drug", "biomat", "dtwin", "spatial", "diag",
];

/** Inspector-panel notes, keyed by node id. */
export const NOTES: Readonly<Record<string, string>> = {
  bm: 'A graph of what connects to the term "biomedical." The limb structure is definitional and durable; the 2026 items are a snapshot.',
  found: "Foundational sciences underpinning all of biomedicine.",
  eng: "Devices, materials, and instrumentation at the bio–engineering boundary.",
  info: "Biomedical informatics, framed per AMIA — data, decisions, standards.",
  research: "The discovery bench: molecular through translational.",
  ther: "Therapeutics & interventions — how disease is acted on.",
  clin: "Clinical practice — care delivery at the point of the patient.",
  ph: "Population-scale health, surveillance, and statistics.",
  data: "Cross-cutting data substrates and methods.",
  gov: "The rules of the game: regulation, ethics, reproducibility, funding.",
  aix: "AI/ML pushes into informatics, engineering, public health, research, therapeutics, diagnostics, and data simultaneously. Source marks 8 explicit targets.",
  sysbio: "Systems biology as an active integrative frame.",
};

/** The nine durable limbs and their leaves. */
export const LIMBS: ReadonlyArray<LimbDef> = [
  { id: "found", name: "Foundational Sciences", kids: [
    ["bio", "Biology"], ["chem", "Biochemistry"], ["phys", "Biophysics"], ["sysbio", "Systems Biology"],
  ] },
  { id: "eng", name: "Biomedical Engineering", kids: [
    ["biomat", "Smart Nanomaterials"], ["tissue", "Tissue Eng / 3D Bioprinting"],
    ["bioelec", "Bioelectronics / Soft Robotics"], ["loc", "Lab-on-Chip / Organ-on-Chip"],
    ["imgdev", "Imaging Instrumentation"],
  ] },
  { id: "info", name: "Biomedical Informatics", kids: [
    ["ehr", "EHR"], ["cds", "Clinical Decision Support"],
    ["onto", "Ontologies (FHIR, SNOMED, UMLS)"], ["fmodels", "Foundation Models / Agentic"],
  ] },
  { id: "research", name: "Biomedical Research", kids: [
    ["genom", "Genomics"], ["prot", "Proteomics"], ["pharm", "Pharmacology"],
    ["trans", "Translational Medicine"], ["dtwin", "Digital Twins"],
  ] },
  { id: "ther", name: "Therapeutics & Interventions", kids: [
    ["drug", "Drug Discovery"], ["gened", "Genome Editing (Prime, N-of-1)"],
    ["cellgene", "Cell & Gene Therapy"], ["degrad", "Molecular Glues / Degradation"],
  ] },
  { id: "clin", name: "Clinical Practice", kids: [
    ["specs", "Specialties (Critical Care, Radiology, Path)"], ["diag", "Point-of-Care Diagnostics"],
    ["wear", "Wearables / Monitoring"], ["samd", "Software as Medical Device"],
  ] },
  { id: "ph", name: "Public Health & Epidemiology", kids: [
    ["surv", "Wastewater / Genomic Surveillance"], ["precph", "Precision Public Health"],
    ["biostat", "Biostatistics"], ["datastrat", "PH Data Modernization"],
  ] },
  { id: "data", name: "Data & Methods", kids: [
    ["omics", "Multi-omics"], ["spatial", "Spatial Biology (commercial)"], ["bioinf", "Bioinformatics"],
  ] },
  { id: "gov", name: "Regulatory, Ethics & Governance", kids: [
    ["reg", "Regulatory (AI credibility, IND/BLA)"], ["irb", "IRB / Ethics / GCP"],
    ["repro", "Reproducibility / Data Gov"], ["fund", "Funding (US NIH/NSF cuts)"],
  ] },
];

/**
 * Build the flat node + link sets the renderer consumes.
 * Mirrors the original construction in biomedical-world-graph.html.
 */
export function buildGraph(): { nodes: TaxonomyNode[]; links: TaxonomyLink[] } {
  const nodes: TaxonomyNode[] = [{ id: "bm", name: "Biomedical", type: "core" }];
  const links: TaxonomyLink[] = [];

  for (const limb of LIMBS) {
    nodes.push({ id: limb.id, name: limb.name, type: "limb", kids: limb.kids });
    links.push({ source: "bm", target: limb.id, tier: 1 });
    for (const [id, name] of limb.kids) {
      nodes.push({ id, name, type: HOT.has(id) ? "hot" : "leaf" });
      links.push({ source: limb.id, target: id, tier: 2 });
    }
  }

  nodes.push({ id: "aix", name: "AI / ML", type: "aihub" });
  return { nodes, links };
}
