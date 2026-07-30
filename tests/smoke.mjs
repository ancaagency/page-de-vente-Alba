/**
 * Test de fumée RÉEL : la page s'exécute pour de bon.
 *
 * Le bac à sable bloque unpkg, donc React, Babel, GSAP et Lenis ne se
 * chargeaient jamais dans mes essais précédents : ils ne prouvaient que le
 * chargement des ressources locales, jamais que la page FONCTIONNE. C'est ce
 * trou qui a laissé passer « useTweaks is not defined », lequel bloquait la
 * page entière sur son rideau d'introduction.
 *
 * Ici on sert les mêmes bibliothèques depuis npm, on applique la vraie CSP,
 * et on vérifie que les sections sont réellement montées dans le DOM.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const NM = path.resolve(new URL('.', import.meta.url).pathname, 'node_modules');

/** URL unpkg → fichier npm local. */
const CDN = {
  '/vendor/react.js': `${NM}/react/umd/react.production.min.js`,
  '/vendor/react-dom.js': `${NM}/react-dom/umd/react-dom.production.min.js`,
  '/vendor/babel.js': `${NM}/@babel/standalone/babel.min.js`,
  '/vendor/gsap.js': `${NM}/gsap/dist/gsap.min.js`,
  '/vendor/scrolltrigger.js': `${NM}/gsap/dist/ScrollTrigger.min.js`,
  '/vendor/lenis.js': `${NM}/lenis/dist/lenis.min.js`,
};

const CSP = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8')
  .split('\n').find((l) => l.trim().startsWith('Content-Security-Policy:'))
  .replace(/^\s*Content-Security-Policy:\s*/, '').trim()
  // Les bibliothèques sont servies depuis 'self' pendant le test ; on retire
  // unpkg pour ne rien assouplir par rapport à la production.
  .replace(/https:\/\/unpkg\.com/g, '');

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jsx': 'text/babel', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.xml': 'application/xml', '.txt': 'text/plain',
};

function reecrireHtml(html) {
  return html
    .replace(/https:\/\/unpkg\.com\/react@[^"]*/g, '/vendor/react.js')
    .replace(/https:\/\/unpkg\.com\/react-dom@[^"]*/g, '/vendor/react-dom.js')
    .replace(/https:\/\/unpkg\.com\/@babel\/standalone@[^"]*/g, '/vendor/babel.js')
    .replace(/https:\/\/unpkg\.com\/gsap@[^"]*ScrollTrigger\.min\.js/g, '/vendor/scrolltrigger.js')
    .replace(/https:\/\/unpkg\.com\/gsap@[^"]*gsap\.min\.js/g, '/vendor/gsap.js')
    .replace(/https:\/\/unpkg\.com\/lenis@[^"]*/g, '/vendor/lenis.js')
    // Les empreintes SRI sont CONSERVÉES : les fichiers servis proviennent du
    // même paquet npm que ceux d'unpkg, donc les empreintes doivent
    // correspondre. Une empreinte fausse fait refuser le script par Chromium,
    // ce qui est précisément ce qu'on veut détecter ici. Seuls GSAP et Lenis,
    // qui n'en portent pas, sont laissés tels quels.
    // Les polices Google restent externes ; on les neutralise pour que le test
    // ne dépende pas du réseau.
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, '');
}

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);

  if (CDN[p]) {
    res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Security-Policy': CSP });
    return res.end(fs.readFileSync(CDN[p]));
  }

  let rel = p === '/' ? '/index.html' : p === '/tarifs' ? '/Tarifs.html' : p;
  const f = path.join(ROOT, rel);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    res.writeHead(404); return res.end('not found');
  }

  const ext = path.extname(f);
  let body = fs.readFileSync(f);
  if (ext === '.html') body = Buffer.from(reecrireHtml(body.toString('utf8')));

  res.writeHead(200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Content-Security-Policy': CSP,
  });
  res.end(body);
});

await new Promise((r) => server.listen(8790, r));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let echecs = 0;

/**
 * Photos non encore fournies. Retirer une entrée dès que le fichier est déposé
 * dans images/ : le test exigera alors qu'elle s'affiche réellement.
 */
const PHOTOS_EN_ATTENTE = [
  'founder-portrait.jpg',
  'testi-camille.jpg',
  'testi-marc.jpg',
  'testi-sophie.jpg',
];

/** Les quatre emplacements <image-slot> de la page d'accueil. */
const EMPLACEMENTS = ['founder-portrait', 'testi-camille', 'testi-marc', 'testi-sophie'];

/** Sections attendues sur la page d'accueil, par ancre ou classe. */
const ATTENDU_ACCUEIL = [
  ['#fonctionnalites', 'section Fonctionnalités'],
  ['#pour-qui', 'section Pour qui ?'],
  ['#fondateur', 'section Fondateur'],
  ['#securite', 'bloc Sécurité'],
  ['#faq', 'FAQ'],
  ['#contact', 'Contact'],
  ['.pricing-card', 'carte tarifaire'],
  ['footer', 'pied de page'],
];

for (const [route, attendus] of [
  ['/', ATTENDU_ACCUEIL],
  ['/tarifs', [['.pricing-card', 'carte tarifaire'], ['#securite', 'bloc Sécurité'], ['footer', 'pied de page']]],
  // Cette page monte son pied de page via React : sans lui, les liens
  // légaux et le contact disparaissent sans que rien ne le signale.
  ['/mentions-legales.html', [['.legal-wrap', 'corps des mentions'], ['footer', 'pied de page'], ['.foot-col', 'colonnes du pied']]],
]) {
  const page = await browser.newPage();
  const erreurs = [];
  const cspRefus = [];
  const photosAbsentes = [];
  page.on('console', (m) => {
    const t = m.text();
    // Pour une ressource qui échoue, Chromium écrit « Failed to load resource…»
    // et ne met PAS l'URL dans le texte : elle est dans location().url. Filtrer
    // sur le seul texte laissait donc passer les quatre 404 attendus dans les
    // erreurs — c'est ce qui faisait échouer ce test sans rien afficher.
    const url = m.location()?.url || '';
    if (/Content Security Policy|Refused to/i.test(t)) cspRefus.push(t);
    // Les quatre emplacements photo sont câblés sur leur nom de fichier
    // définitif avant que les photos n'arrivent (voir image-slot.js). Le 404 est
    // donc attendu, et attendu de ces quatre fichiers UNIQUEMENT : il est compté
    // à part plutôt que d'être noyé dans les erreurs, pour qu'on voie d'un coup
    // d'œil ce qui manque encore — et pour qu'un 404 sur autre chose échoue.
    else if (PHOTOS_EN_ATTENTE.some((f) => t.includes(f) || url.includes(f))) photosAbsentes.push(url || t);
    else if (m.type() === 'error') erreurs.push(`${t}${url ? ` — ${url}` : ''}`);
  });
  page.on('pageerror', (e) => erreurs.push(`${e.name}: ${e.message}`));

  await page.goto('http://localhost:8790' + route, { waitUntil: 'load', timeout: 40000 });
  // Babel transpile dans le navigateur : il faut lui laisser le temps.
  await page.waitForTimeout(6000);

  console.log(`\n===== ${route} =====`);

  // La preuve qui compte : le contenu est-il réellement dans le DOM ?
  for (const [sel, nom] of attendus) {
    const n = await page.locator(sel).count();
    console.log(`   ${n > 0 ? '✅' : '❌'} ${nom.padEnd(26)} (${sel}) → ${n}`);
    if (n === 0) echecs++;
  }

  // Le rideau d'introduction doit s'être levé.
  if (route === '/') {
    const intro = await page.evaluate(() => {
      const el = document.getElementById('intro');
      if (!el) return 'absent';
      const s = getComputedStyle(el);
      return `display=${s.display} opacity=${s.opacity} visibility=${s.visibility}`;
    });
    console.log(`   rideau d'intro : ${intro}`);

    // Le CTA du configurateur doit porter les paramètres d'abonnement.
    const cta = await page.locator('a.pricing-cta').first().getAttribute('href').catch(() => null);
    const ok = cta && /[?&]plan=studio&storage=\d+&billing=(monthly|yearly)&seats=\d/.test(cta);
    console.log(`   ${ok ? '✅' : '❌'} CTA tarifaire paramétré → ${cta || 'introuvable'}`);
    if (!ok) echecs++;

    // Les emplacements photo doivent TOUJOURS montrer quelque chose : la photo
    // si elle est là, sinon le cartouche neutre. Jamais l'icône d'image cassée
    // du navigateur, qui est ce qu'on obtient si le repli de image-slot lâche.
    //
    // Les images portent loading="lazy" : hors de l'écran, le navigateur ne les
    // demande même pas — ni chargement, ni échec, ni repli. Il faut donc les
    // amener dans le champ de vision, comme le fait un visiteur, sinon le test
    // mesure un état qui n'existe pas encore. (Première version de ce test :
    // elle rapportait « image cassée » pour les quatre, sans qu'aucune requête
    // n'ait été émise.)
    for (const id of EMPLACEMENTS) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded().catch(() => {});
    }
    await page.waitForTimeout(1500);

    const etats = await page.evaluate((ids) => ids.map((id) => {
      const el = document.getElementById(id);
      if (!el || !el.shadowRoot) return { id, etat: 'emplacement absent' };
      const img = el.shadowRoot.querySelector('img');
      if (img) return { id, etat: img.naturalWidth > 0 ? 'photo' : 'image cassée' };
      return { id, etat: el.shadowRoot.querySelector('.ph') ? 'cartouche' : 'vide' };
    }), EMPLACEMENTS);

    for (const { id, etat } of etats) {
      const bon = etat === 'photo' || etat === 'cartouche';
      console.log(`   ${bon ? '✅' : '❌'} emplacement ${id.padEnd(17)} → ${etat}`);
      if (!bon) echecs++;
    }
  }

  if (photosAbsentes.length) {
    console.log(`   ⏳ photos encore attendues : ${
      PHOTOS_EN_ATTENTE.filter((f) => photosAbsentes.some((t) => t.includes(f))).join(', ')}`);
  }

  // Le bilan console est imprimé EN DERNIER, et non juste après le chargement :
  // le défilement déclenche des requêtes (images en loading="lazy"), donc un
  // bilan affiché trop tôt annonce « aucune erreur » alors que le compteur en
  // voit quatre. C'est exactement l'écart qu'on avait ici.
  console.log(`   Erreurs JavaScript (${erreurs.length}) ${erreurs.length ? '❌' : '✅ aucune'}`);
  erreurs.slice(0, 8).forEach((t) => console.log('      ' + t.slice(0, 200)));

  console.log(`   Refus CSP (${cspRefus.length}) ${cspRefus.length ? '❌' : '✅ aucun'}`);
  cspRefus.slice(0, 5).forEach((t) => console.log('      ' + t.slice(0, 200)));

  if (erreurs.length || cspRefus.length) echecs++;
  await page.close();
}

await browser.close();
server.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
