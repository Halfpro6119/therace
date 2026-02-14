/**
 * Export Science Lab diagram blueprints to static SVG files.
 * Run: npx tsx scripts/export-flashcard-diagrams.ts
 *
 * Creates starter SVG files from the programmatic blueprints.
 * Replace each file with a hand-crafted diagram as you create them.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { CustomDiagramEngine } from '../src/diagrams/engine/customDiagramEngine';
import * as diagrams from '../src/config/scienceLabDiagrams';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'assets', 'diagrams', 'science-lab');

const diagramSlugs = Object.keys(diagrams) as (keyof typeof diagrams)[];

mkdirSync(OUT_DIR, { recursive: true });

let exported = 0;
for (const slug of diagramSlugs) {
  const blueprint = (diagrams as Record<string, unknown>)[slug];
  if (!blueprint || typeof blueprint !== 'object' || !('layers' in blueprint)) continue;

  try {
    const engine = new CustomDiagramEngine(blueprint as Parameters<typeof CustomDiagramEngine>[0]);
    const svg = engine.render();
    const path = join(OUT_DIR, `${slug}.svg`);
    writeFileSync(path, svg, 'utf-8');
    console.log(`  ✓ ${slug}.svg`);
    exported++;
  } catch (err) {
    console.error(`  ✗ ${slug}:`, err);
  }
}

console.log(`\nExported ${exported} diagrams to ${OUT_DIR}`);
console.log('\nNext steps:');
console.log('1. Add each slug to FLASHCARD_DIAGRAM_SLUGS in src/config/flashcardDiagramAssets.ts');
console.log('2. Replace SVG files with hand-crafted versions as you create them.');
