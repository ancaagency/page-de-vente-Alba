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
  ["img-src", "'self' data: blob:"],
  ["media-src", "'self'"],
];
for (const [nom, valeur] of EXIGES) {
  ok(directive(nom) === valeur, `${nom} ${valeur}`);
}

ok(directive('upgrade-insecure-requests') === '', 'upgrade-insecure-requests');

// connect-src doit nommer UNE destination et une seule : celle du formulaire de
// contact. Un 'self' ou un joker rouvriraient une voie d'exfiltration si un
// script venait a etre altere. La directive etait a 'none' avant que le
// formulaire ne soit branche.
const connect = directive('connect-src') || '';
console.log(`   connect-src ${connect}`);
ok(/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(connect),
   'connect-src nomme exactement l’origine du point d’entree du formulaire');
ok(!connect.includes('*') && !connect.includes("'self'"),
   'sans joker ni \'self\'');

/* form-action : le bouton « Tester en 1 clic » est un <form method="post"> vers
 * demo-express. Cette directive valait 'self' — le navigateur bloquait donc
 * l'envoi purement et simplement, sans que rien sur la page ne le laisse voir.
 *
 * Elle doit nommer les origines, jamais un joker : form-action est la dernière
 * barrière contre l'exfiltration par formulaire injecté, et un `https:` ou un
 * `*` la rendrait décorative. */
const formAction = directive('form-action') || '';
console.log(`   form-action ${formAction}`);
const ORIGINES_FORM = ["'self'", 'https://fhrkkjvbzgkbmlnlnxce.supabase.co', 'https://app.alba-studio.co'];
const sources = formAction.split(/\s+/).filter(Boolean);
ok(sources.length === ORIGINES_FORM.length && ORIGINES_FORM.every((o) => sources.includes(o)),
   'form-action nomme self et les deux origines de l’essai express, et rien d’autre');
ok(!formAction.includes('*') && !/\bhttps:(?!\/\/)/.test(formAction),
   'form-action sans joker');

/* L'origine de l'application est admise dans form-action, et LÀ SEULEMENT.
 * L'ajouter à script-src ou connect-src élargirait la surface sans raison :
 * la page ne charge rien depuis l'application et ne lui parle pas en fetch. */
for (const d of ['script-src', 'connect-src', 'style-src', 'img-src']) {
  ok(!(directive(d) || '').includes('app.alba-studio.co'),
     `${d} ne mentionne pas l’origine de l’application`);
}

// LE point de tout l'exercice de transpilation préalable. Ces deux mots-clés
// rendaient la CSP inopérante contre l'injection de script. Les réintroduire
// annulerait le gain, et il n'y a plus aucune raison technique de le faire.
ok(!(directive('script-src') || '').includes("'unsafe-eval'"), "script-src sans 'unsafe-eval'");
ok(!(directive('script-src') || '').includes("'unsafe-inline'"), "script-src sans 'unsafe-inline'");

// Aucune source ne doit pouvoir réintroduire d'assouplissement par une autre
// directive que script-src, ni par le repli de default-src.
ok(!(directive('default-src') || '').includes('unsafe'), "default-src sans 'unsafe-*'");

/* Les polices viennent de chez nous. `font-src 'self'` est ce qui rend un
   retour en arrière impossible en silence : remettre un <link> vers Google
   sans toucher à la CSP donnerait une police qui ne charge pas. */
ok(directive('font-src') === "'self'", "font-src 'self' — polices hébergées par nous");
ok(!(directive('style-src') || '').includes('fonts.googleapis'),
   'style-src ne va plus chercher de feuille chez Google');
ok(!(directive('style-src') || '').includes('unsafe-eval'), "style-src sans 'unsafe-eval'");

// Les origines tierces autorisées, énumérées : toute nouvelle doit être un choix
// explicite, pas un ajout qui passe inaperçu.
const TIERS_ADMIS = new Set([
  'https://unpkg.com',                              // React, GSAP, Lenis (avec empreintes)
  /* Les deux origines Google Fonts ont été RETIRÉES, pas oubliées : Inter est
     hébergée sur notre domaine. Si elles réapparaissent ici, c'est que
     quelqu'un a remis un <link> vers Google — et avec lui la transmission de
     l'adresse IP de chaque visiteur. Ne les rajoutez pas pour faire passer le
     contrôle : retirez le <link>. */
  'https://fhrkkjvbzgkbmlnlnxce.supabase.co',       // formulaire de contact, paiement, essai express
  // Notre propre application. Elle ne figure QUE dans form-action, et
  // uniquement parce que l'essai express y aboutit après deux redirections :
  // les navigateurs ne s'accordent pas sur l'application de form-action aux
  // redirections. Elle n'a rien à faire dans script-src ni connect-src.
  'https://app.alba-studio.co',
]);
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
