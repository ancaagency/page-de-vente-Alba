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
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';

const server = await demarrer(8790);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
let echecs = 0;

/**
 * Photos non encore fournies. Retirer une entrée dès que le fichier est déposé
 * dans images/ : le test exigera alors qu'elle s'affiche réellement.
 */
const PHOTOS_EN_ATTENTE = [
  // founder-portrait.jpg est fournie : elle est retirée de cette liste, donc son
  // emplacement doit désormais afficher « photo » et non « cartouche ». Un 404
  // sur ce fichier compterait maintenant comme une erreur.
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

    // Le formulaire de contact est eprouve dans tests/formulaire.mjs, qui
    // simule les reponses du serveur. C'est ce qui permet d'y verifier le cas
    // qui compte le plus : quand l'envoi echoue, AUCUNE confirmation ne doit
    // s'afficher. Un appel reel ne permettrait pas de provoquer cet echec.
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

/* ─────────────────────────────────────────────────────────────────────────────
 * La barre de navigation est-elle la MÊME sur toutes les pages ?
 *
 * La bascule de langue était stylée dans notifications.css. L'accueil charge
 * quatorze feuilles de style dont celle-là, la page tarifs seulement deux : la
 * pastille dorée y devenait deux boutons nus, et rien ne le signalait. Le HTML
 * était pourtant identique aux deux endroits — c'est la feuille qui manquait.
 *
 * On ne peut pas vérifier « chaque page charge ce qu'il lui faut » en général.
 * Mais la barre, elle, est écrite à l'identique partout : elle doit donc RENDRE
 * à l'identique. Toute divergence trahit une feuille oubliée.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== la barre rend-elle pareil sur toutes les pages ? =====');
{
  /* Propriétés qui trahissent une règle absente : sans la feuille, un <div>
     retombe sur `display: block` et un <button> sur les bordures du navigateur. */
  const RELEVE = `(() => {
    const q = (sel, props) => {
      const e = document.querySelector(sel);
      if (!e) return sel + ' : ABSENT';
      const st = getComputedStyle(e);
      return sel + ' ' + props.map((p) => p + '=' + st[p]).join(' ');
    };
    return [
      q('.lang-toggle', ['display', 'borderRadius', 'borderTopWidth', 'padding']),
      q('.lang-toggle button.is-active', ['backgroundColor', 'color', 'borderRadius']),
      q('.nav-login', ['color', 'fontSize']),
    ];
  })()`;

  const releves = {};
  for (const route of ['/', '/tarifs', '/mentions-legales.html']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8790' + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(3500);
    releves[route] = await page.evaluate(RELEVE);
    await page.close();
  }

  const reference = releves['/'];
  for (const [route, valeurs] of Object.entries(releves)) {
    if (route === '/') continue;
    valeurs.forEach((v, i) => {
      // La page des mentions légales n'a pas de bascule de langue : son absence
      // y est normale, et seule une DIVERGENCE de style compte.
      const absentPartout = v.includes('ABSENT') && route === '/mentions-legales.html' && v.startsWith('.lang-toggle');
      const identique = v === reference[i] || absentPartout;
      console.log(`   ${identique ? '✅' : '❌'} ${route} — ${v.slice(0, 96)}`);
      if (!identique) {
        console.log(`      accueil : ${reference[i].slice(0, 96)}`);
        echecs++;
      }
    });
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Le bouton flottant mène-t-il bien à l'essai, et pas à un formulaire ?
 *
 * Il s'appelait « Demander une démo » et pointait sur #contact : on réclamait
 * un nom et une adresse avant de montrer quoi que ce soit. Il s'appelle
 * désormais « Tester en 1 clic » et pointe sur le carrousel #fonctionnalites,
 * qui est le simulateur.
 *
 * Deux façons de casser ça sans que rien ne le signale : renommer la cible du
 * carrousel (l'ancre deviendrait un lien mort qui ne défile nulle part), ou
 * remettre l'ancienne destination en croyant réparer un lien. On vérifie donc
 * que la cible EXISTE et que le clic déplace réellement la page jusqu'à elle.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== « Tester en 1 clic » atteint-il le simulateur ? =====');
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(5000);

  /* Les boutons du hero passent par Txt(), et contenu.js REMPLACE le texte
     écrit dans le .jsx — c'est tout son intérêt, mais c'est aussi un piège :
     renommer un bouton dans le .jsx sans toucher contenu.js ne change RIEN à
     l'écran, et rien ne le signale. tests/contenu.mjs compte les clés, il ne
     lit pas ce qu'elles disent. C'est arrivé une fois : le hero annonçait
     encore « Demander une démo » alors que le code disait « Tester en 1 clic ».
     On lit donc le texte RENDU, pas le code. */
  const HERO = [
    ['.hero-actions .btn-primary', /tester en 1 clic/i, '#fonctionnalites'],
    ['.hero-actions .btn-ghost', /s'abonner/i, '#pricing'],
  ];
  for (const [sel, attendu, cible] of HERO) {
    const vu = await page.$eval(sel, (e) => ({
      texte: e.textContent.trim(), href: e.getAttribute('href'),
    })).catch(() => null);
    const bon = vu && attendu.test(vu.texte) && vu.href === cible;
    console.log(`   ${bon ? '✅' : '❌'} hero ${sel} → « ${vu ? vu.texte : 'ABSENT'} » vers ${vu ? vu.href : '—'}`);
    if (!bon) echecs++;
  }

  const cible = await page.$eval('.float-cta', (e) => e.getAttribute('href')).catch(() => null);
  const bon = cible === '#fonctionnalites';
  console.log(`   ${bon ? '✅' : '❌'} le bouton vise le simulateur (${cible || 'ABSENT'})`);
  if (!bon) echecs++;

  const libelle = await page.$eval('.float-cta', (e) => e.textContent.trim()).catch(() => '');
  const promet = /tester/i.test(libelle) && !/d[ée]mo/i.test(libelle);
  console.log(`   ${promet ? '✅' : '❌'} et il promet un essai, pas un rendez-vous (« ${libelle} »)`);
  if (!promet) echecs++;

  const existe = await page.locator('#fonctionnalites').count();
  console.log(`   ${existe ? '✅' : '❌'} la section visée existe (${existe})`);
  if (!existe) echecs++;

  /* Le point qui compte : une ancre peut être correcte et la page ne pas
     bouger — c'est le cas quand la cible a été renommée ailleurs, ou quand un
     gestionnaire de défilement avale le clic sans rien faire. */
  if (existe) {
    // On descend assez bas pour que le bouton s'affiche ET que la remontée
    // vers le carrousel soit mesurable.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
    await page.waitForTimeout(900);
    const avant = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => document.querySelector('.float-cta').click());
    await page.waitForTimeout(2500);
    const apres = await page.evaluate(() => window.scrollY);
    const dansLeCadre = await page.evaluate(() => {
      const r = document.getElementById('fonctionnalites').getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    const bouge = Math.abs(apres - avant) > 200;
    console.log(`   ${bouge && dansLeCadre ? '✅' : '❌'} le clic amène le simulateur à l'écran (${avant} → ${apres} px)`);
    if (!(bouge && dansLeCadre)) echecs++;
  }

  await page.close();
}

await browser.close();
server.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
