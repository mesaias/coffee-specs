/**
 * Syncs recipe .md files from the root repo into mobile_app/assets/recipes/.
 *
 * Rules:
 *  - Source dirs: metodos-presion, metodos-filtro, aeropress, experimentos
 *  - Filename: hyphens → underscores; aeropress/ files get "aeropress_" prefix
 *  - Strips "## 📸 Bitácora de Imágenes" sections (and their content until next ##)
 *  - Skips template placeholder files (contain "[NOMBRE DE LA RECETA]")
 *
 * Renames:
 *  - chemex-600ml-arabico-estandar.md → chemex_600ml_arabico_estandar.md
 *    (replaces the old chemex_600ml_arabico_daily.md in the app)
 *
 * Run from repo root:
 *   node scripts/sync-recipes-to-app.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEST = path.join(ROOT, 'mobile_app', 'assets', 'recipes');

const SOURCES = [
  { dir: 'metodos-presion', prefix: '' },
  { dir: 'metodos-filtro',  prefix: '' },
  { dir: 'aeropress',       prefix: 'aeropress_' },
  { dir: 'experimentos',    prefix: '' },
];

// Old mobile filenames that are superseded by a renamed root file.
// These will be removed from the destination.
const OBSOLETE = [
  'chemex_600ml_arabico_daily.md',
  'moka_3_tazas_induction_kirkland_tostado_medio.md',
  'moka_6_tazas_induction_arabico_estandar.md',
  'moka_6_tazas_induction_arabico_descafeinado.md',
  'moka-3-tazas-adaptador-induction-arabico-estandar.md',
];

// ── helpers ──────────────────────────────────────────────────────────────────

function stripImageSections(content) {
  // Remove ## 📸 ... sections: everything from that heading until the next ## or end of file
  return content.replace(/^##\s+📸[^\n]*\n[\s\S]*?(?=^##\s|\s*$)/gm, '').trimEnd() + '\n';
}

function isTemplate(content) {
  return content.includes('[NOMBRE DE LA RECETA]');
}

function toDestName(prefix, filename) {
  return prefix + filename.replace(/-/g, '_');
}

// ── main ─────────────────────────────────────────────────────────────────────

let copied = 0;
let skipped = 0;

for (const { dir, prefix } of SOURCES) {
  const srcDir = path.join(ROOT, dir);
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const raw = fs.readFileSync(srcPath, 'utf8');

    if (isTemplate(raw)) {
      console.log(`  SKIP  (template)  ${dir}/${file}`);
      skipped++;
      continue;
    }

    const cleaned = stripImageSections(raw);
    const destName = toDestName(prefix, file);
    const destPath = path.join(DEST, destName);

    fs.writeFileSync(destPath, cleaned, 'utf8');
    console.log(`  COPY  ${dir}/${file}  →  ${destName}`);
    copied++;
  }
}

// Remove obsolete files
for (const name of OBSOLETE) {
  const p = path.join(DEST, name);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`  DEL   (obsolete)  ${name}`);
  }
}

console.log(`\nDone: ${copied} copied, ${skipped} skipped.`);
