/**
 * Les bibliothèques de /vendor sont-elles toujours celles d'unpkg ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QUE CE CONTRÔLE REMPLACE
 *
 * React, GSAP et Lenis venaient d'unpkg, avec une empreinte `integrity` sur
 * chaque balise : un unpkg compromis ne pouvait pas leur substituer autre
 * chose, le navigateur aurait refusé. C'était la bonne protection tant que les
 * fichiers venaient de chez quelqu'un d'autre.
 *
 * Ils sont désormais servis depuis notre domaine, et l'empreinte SRI a été
 * retirée des balises — délibérément. Sur une ressource de même origine elle ne
 * protège de rien : qui peut modifier /vendor/react.js peut tout aussi bien
 * retirer l'attribut du HTML. En revanche, elle peut faire une page blanche
 * complète le jour où un intermédiaire recompresse un fichier.
 *
 * La garantie n'a donc pas disparu, elle a changé de place : elle s'exerce ICI,
 * avant publication. Le mode de panne passe de « le visiteur voit une page
 * blanche » à « le test échoue avant le déploiement ».
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QUE ÇA ATTRAPE VRAIMENT
 *
 *   · un fichier modifié à la main « pour corriger un bug » — c'est du code
 *     tiers minifié, toute retouche y est indétectable à la relecture ;
 *   · une mise à jour de version faite à moitié : fichier remplacé, empreinte
 *     oubliée, ou l'inverse ;
 *   · un fichier tronqué par un transfert incomplet.
 *
 * Les empreintes de vendor/EMPREINTES.txt sont celles qui figuraient dans les
 * balises <script> du temps d'unpkg. Elles ont été vérifiées identiques au
 * moment du rapatriement : ces fichiers SONT ceux qu'unpkg servait.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const DIR = path.join(ROOT, 'vendor');

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

console.log('\n===== bibliothèques hébergées =====');

const manifeste = path.join(DIR, 'EMPREINTES.txt');
if (!fs.existsSync(manifeste)) {
  console.log('   ❌ vendor/EMPREINTES.txt est absent — plus rien ne garantit ces fichiers');
  process.exit(1);
}

const attendues = new Map();
for (const l of fs.readFileSync(manifeste, 'utf8').split('\n')) {
  const t = l.trim();
  if (!t || t.startsWith('#')) continue;
  const [nom, empreinte] = t.split(/\s+/);
  if (nom && empreinte) attendues.set(nom, empreinte);
}
ok(attendues.size > 0, `${attendues.size} empreintes déclarées`);

const surDisque = fs.readdirSync(DIR).filter((f) => f.endsWith('.js')).sort();

// Un fichier présent mais non déclaré est aussi grave qu'un fichier modifié :
// c'est du code tiers que personne n'a validé, servi depuis notre domaine.
for (const f of surDisque) {
  ok(attendues.has(f), `${f} est déclaré au manifeste`);
}
for (const f of attendues.keys()) {
  ok(surDisque.includes(f), `${f} est bien présent sur le disque`);
}

for (const [nom, attendue] of attendues) {
  const p = path.join(DIR, nom);
  if (!fs.existsSync(p)) continue;
  const obtenue = 'sha384-' + crypto.createHash('sha384').update(fs.readFileSync(p)).digest('base64');
  ok(obtenue === attendue,
     `${nom.padEnd(26)} ${obtenue === attendue ? 'intact' : `MODIFIÉ\n        attendu : ${attendue}\n        obtenu  : ${obtenue}`}`);
}

/* Et les pages doivent effectivement pointer vers ces fichiers-là. Un <script>
 * qui redésignerait unpkg remettrait l'adresse IP du visiteur en circulation,
 * et le contrôle d'empreinte ci-dessus continuerait de passer sans rien voir. */
console.log('\n===== les pages ne rappellent plus de CDN =====');
for (const page of ['index.html', 'Tarifs.html', 'mentions-legales.html']) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const cdn = [...html.matchAll(/<script[^>]+src="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  ok(cdn.length === 0, `${page.padEnd(22)} aucun script distant${cdn.length ? ` — ${cdn.join(', ')}` : ''}`);

  // Et chaque fichier visé doit exister : un nom de version mal recopié
  // donnerait un 404 et une page morte.
  const locaux = [...html.matchAll(/<script[^>]+src="(vendor\/[^"]+)"/g)].map((m) => m[1]);
  for (const l of locaux) {
    ok(fs.existsSync(path.join(ROOT, l)), `${page.padEnd(22)} ${l} existe`);
  }
}

console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
