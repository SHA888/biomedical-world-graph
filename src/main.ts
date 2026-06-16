import "./style.css";
import { buildGraph, LIMBS, HOT } from "./data/taxonomy.ts";

/**
 * Scaffold entry point.
 *
 * For now this renders a landing shell that proves the Vite + TypeScript +
 * data pipeline works end-to-end, and links to the still-live legacy
 * visualization. The 3D renderer migration replaces this body — see TODO.md.
 */
function main(): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error('Missing #app mount point');

  const { nodes, links } = buildGraph();
  const hotCount = nodes.filter((n) => n.type === "hot").length;

  app.innerHTML = `
    <main class="shell">
      <h1>Biomedical World Graph</h1>
      <p class="sub">Vite + TypeScript scaffold — renderer migration in progress.</p>
      <ul class="stats">
        <li><strong>${LIMBS.length}</strong> durable limbs</li>
        <li><strong>${nodes.length}</strong> nodes</li>
        <li><strong>${links.length}</strong> links</li>
        <li><strong>${hotCount}</strong> / ${HOT.size} live 2026 nodes</li>
      </ul>
      <p class="legacy">
        The interactive 3D map is still served by the legacy build:
        <a href="/biomedical-world-graph.html">open it →</a>
      </p>
    </main>
  `;
}

main();
