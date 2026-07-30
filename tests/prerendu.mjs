/**
 * Le HTML servi contient-il la page, ou une coquille vide ?
 *
 * Mesuré avant d'écrire l'outil de prérendu : `/` servait **323 caractères** de
 * texte — le menu de navigation, rien d'autre. Google sait rendre le JavaScript,
 * mais en différé ; Bing, DuckDuckGo, LinkedIn, Slack et WhatsApp n'exécutent
 * rien du tout et ne voyaient donc pas la page de vente.
 *
 * Deux contrôles :
 *   · les instantanés correspondent au rendu réel — sinon le HTML montre
 *     l'ancienne version aux robots, sans que rien ne le signale ;
 *   · le HTML porte assez de texte pour être indexable, et les repères qui
 *     comptent (un seul h1, les données structurées).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

console.log('\n===== les instantanés sont-ils à jour ? =====');
const r = spawnSync('node', [path.join(ROOT, 'outils/prerendre.mjs'), '--verifier'], { encoding: 'utf8' });
process.stdout.write(r.stdout.split('\n').filter((l) => l.trim()).map((l) => '   ' + l.trim()).join('\n') + '\n');
if (r.status !== 0) echecs++;

console.log('\n===== ce qu’un robot sans JavaScript reçoit =====');
const MINIMA = { 'index.html': 8000, 'Tarifs.html': 2000, 'mentions-legales.html': 2000 };
for (const [fichier, minimum] of Object.entries(MINIMA)) {
  const html = fs.readFileSync(path.join(ROOT, fichier), 'utf8');
  const corps = html.slice(html.indexOf('<body'))
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const texte = corps.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  ok(texte.length >= minimum, `${fichier.padEnd(24)} ${texte.length} caractères (minimum ${minimum})`);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  ok(h1 === 1, `${fichier.padEnd(24)} exactement un <h1> (${h1})`);
}

console.log('\n===== données structurées =====');
const accueil = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const blocs = [...accueil.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const types = [];
for (const b of blocs) {
  try { types.push(JSON.parse(b[1])['@type']); }
  catch (e) { ok(false, `JSON-LD invalide : ${e.message}`); }
}
for (const attendu of ['Organization', 'SoftwareApplication', 'FAQPage']) {
  ok(types.includes(attendu), `${attendu} présent et valide`);
}

// Sans ce <noscript>, le rideau d'introduction (position: fixed, z-index 5000)
// recouvre la page prérendue pour qui n'exécute pas de JavaScript.
ok(/<noscript>[\s\S]*#intro\{display:none/.test(accueil),
   'le rideau d’introduction est neutralisé sans JavaScript');

console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
