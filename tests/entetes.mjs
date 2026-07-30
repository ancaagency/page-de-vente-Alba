/**
 * Vérifie la posture de sécurité déclarée dans `_headers`.
 *
 * Sans navigateur et sans réseau : c'est de l'analyse de fichier, donc rapide,
 * et ça tourne partout. Le rôle de ce test n'est pas de prouver que la page
 * fonctionne — `smoke.mjs` le fait en appliquant cette même CSP dans Chromium —
 * mais d'empêcher qu'un durcissement soit défait sans qu'on le remarque.
 *
 * Chaque assertion correspond à une décision prise et argumentée dans
 * `_headers`. Si une directive doit disparaître, il faut retirer la ligne ici
 * aussi : c'est le geste délibéré qu'on veut rendre obligatoire.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const brut = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8');

// Seules les lignes d'en-tête comptent ; les commentaires en # sont ignorés.
const lignes = brut.split('\n').filter((l) => !l.trim().startsWith('#'));
const entete = (nom) => {
  const l = lignes.find((x) => x.trim().toLowerCase().startsWith(nom.toLowerCase() + ':'));
  return l ? l.slice(l.indexOf(':') + 1).trim() : null;
};

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

console.log('\n===== en-têtes de sécurité =====');

const ATTENDUS = [
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
];
for (const [nom, valeur] of ATTENDUS) {
  ok(entete(nom) === valeur, `${nom}: ${valeur}`);
}

const hsts = entete('Strict-Transport-Security');
ok(!!hsts && /max-age=(\d+)/.test(hsts) && Number(hsts.match(/max-age=(\d+)/)[1]) >= 31536000,
   `HSTS d'au moins un an (${hsts})`);
// `preload` engage le domaine entier, apex compris, et se défait mal. L'apex
// sert l'application, dont nous ne maîtrisons pas les en-têtes.
ok(!/preload/i.test(hsts || ''), 'HSTS sans `preload` (décision assumée, voir _headers)');

const permissions = entete('Permissions-Policy') || '';
for (const f of ['geolocation', 'microphone', 'camera', 'payment', 'usb']) {
  ok(new RegExp(`${f}=\\(\\)`).test(permissions), `Permissions-Policy refuse ${f}`);
}

console.log('\n===== politique de sécurité du contenu =====');

const csp = entete('Content-Security-Policy');
ok(!!csp, 'la CSP est déclarée');

const directive = (nom) => {
  const m = (csp || '').split(';').map((s) => s.trim()).find((s) => s === nom || s.startsWith(nom + ' '));
  return m === undefined ? null : m.slice(nom.length).trim();
};

const EXIGES = [
  ["default-src", "'self'"],
  ["object-src", "'none'"],
  ["frame-src", "'none'"],
  ["worker-src", "'none'"],
  ["frame-ancestors", "'none'"],
  ["base-uri", "'self'"],
  ["form-action", "'self'"],
  ["connect-src", "'self'"],
  ["img-src", "'self' data: blob:"],
  ["media-src", "'self'"],
];
for (const [nom, valeur] of EXIGES) {
  ok(directive(nom) === valeur, `${nom} ${valeur}`);
}

ok(directive('upgrade-insecure-requests') === '', 'upgrade-insecure-requests');

// unpkg n'a rien à faire ailleurs que dans script-src : les bibliothèques y sont
// chargées par <script src>, jamais par fetch. Une origine joignable de moins,
// c'est une voie d'exfiltration de moins si un script était altéré.
ok(!(directive('connect-src') || '').includes('unpkg'), "connect-src ne joint pas unpkg");

// 'unsafe-eval' est assumé (Babel transpile dans le navigateur) mais doit rester
// cantonné aux scripts : nulle part ailleurs, et jamais dans default-src.
ok(!(directive('default-src') || '').includes('unsafe'), "default-src sans 'unsafe-*'");
ok(!(directive('style-src') || '').includes('unsafe-eval'), "style-src sans 'unsafe-eval'");

// Les origines tierces autorisées, énumérées : toute nouvelle doit être un choix
// explicite, pas un ajout qui passe inaperçu.
const TIERS_ADMIS = new Set(['https://unpkg.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']);
const tiers = [...new Set((csp || '').match(/https?:\/\/[^\s;]+/g) || [])];
const inconnus = tiers.filter((t) => !TIERS_ADMIS.has(t));
console.log(`   origines tierces autorisées : ${tiers.join(', ') || 'aucune'}`);
ok(inconnus.length === 0, `aucune origine tierce inattendue${inconnus.length ? ` — ${inconnus.join(', ')}` : ''}`);

console.log('\n===== cache =====');
// Aucun nom de fichier ne porte d'empreinte : un cache long sur le code figerait
// la page chez les visiteurs après chaque mise à jour.
for (const motif of ['/*.html', '/*.css', '/*.js', '/*.jsx']) {
  const i = lignes.findIndex((l) => l.trim() === motif);
  const suite = i >= 0 ? lignes.slice(i + 1, i + 4).join(' ') : '';
  ok(/max-age=0/.test(suite) && /must-revalidate/.test(suite), `${motif} revalidé à chaque visite`);
}

console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
