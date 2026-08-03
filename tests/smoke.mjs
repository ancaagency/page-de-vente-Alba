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
  const primaire = await page.$eval('.hero-actions .btn-primary', (e) => ({
    texte: e.textContent.trim(), balise: e.tagName, type: e.getAttribute('type'),
  })).catch(() => null);
  const bonPrimaire = primaire && /tester en 1 clic/i.test(primaire.texte)
                      && primaire.balise === 'BUTTON' && primaire.type === 'submit';
  console.log(`   ${bonPrimaire ? '✅' : '❌'} hero bouton doré → « ${primaire ? primaire.texte : 'ABSENT'} » (<${primaire ? primaire.balise.toLowerCase() : '—'}>)`);
  if (!bonPrimaire) echecs++;

  const ghost = await page.$eval('.hero-actions .btn-ghost', (e) => ({
    texte: e.textContent.trim(), href: e.getAttribute('href'),
  })).catch(() => null);
  const bonGhost = ghost && /s'abonner/i.test(ghost.texte) && ghost.href === '#pricing';
  console.log(`   ${bonGhost ? '✅' : '❌'} hero bouton contour → « ${ghost ? ghost.texte : 'ABSENT'} » vers ${ghost ? ghost.href : '—'}`);
  if (!bonGhost) echecs++;

  const libelle = await page.$eval('.float-cta', (e) => e.textContent.trim()).catch(() => '');
  const promet = /tester/i.test(libelle) && !/d[ée]mo/i.test(libelle);
  console.log(`   ${promet ? '✅' : '❌'} le bouton flottant promet un essai, pas un rendez-vous (« ${libelle} »)`);
  if (!promet) echecs++;

  /* Les deux boutons portent le même libellé : ils doivent faire la même
     chose. Deux « Tester en 1 clic » qui mènent ailleurs l'un de l'autre est
     une façon sûre de perdre le visiteur. */
  const memeGeste = await page.evaluate(() => {
    const f = (el) => el && el.closest('form') && el.closest('form').getAttribute('action');
    return {
      hero: f(document.querySelector('.hero-actions .btn-primary')),
      flottant: f(document.querySelector('.float-cta')),
    };
  });
  const accord = memeGeste.hero && memeGeste.hero === memeGeste.flottant;
  console.log(`   ${accord ? '✅' : '❌'} les deux « Tester en 1 clic » postent au même endroit (${memeGeste.hero || 'ABSENT'} / ${memeGeste.flottant || 'ABSENT'})`);
  if (!accord) echecs++;

  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * L'essai express : un formulaire, jamais un lien
 *
 * demo-express CRÉE UN COMPTE. Écrit en <a href>, il en créerait un chaque fois
 * qu'un robot d'indexation suit le lien, qu'une messagerie déplie l'aperçu
 * d'une URL, ou qu'un antivirus d'entreprise vérifie une adresse : des
 * centaines de comptes sans qu'un humain ait cliqué.
 *
 * C'est le genre de régression qu'on introduit en croyant simplifier — « c'est
 * juste un bouton, autant en faire un lien ». Ce contrôle balaie donc TOUTES
 * les pages à la recherche d'un lien vers ce point d'entrée.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== l\'essai express ne peut pas être déclenché par un robot =====');
{
  for (const route of ['/', '/tarifs', '/mentions-legales.html']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8790' + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(4000);

    const liens = await page.evaluate(() => [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.includes('demo-express')));
    console.log(`   ${liens.length === 0 ? '✅' : '❌'} ${route} — aucun <a> vers demo-express${liens.length ? ` : ${liens.join(', ')}` : ''}`);
    if (liens.length) echecs++;

    // Et si un formulaire est présent, il doit poster.
    const formes = await page.evaluate(() => [...document.querySelectorAll('form')]
      .filter((f) => (f.getAttribute('action') || '').includes('demo-express'))
      .map((f) => (f.getAttribute('method') || 'get').toLowerCase()));
    const tousEnPost = formes.every((m) => m === 'post');
    console.log(`   ${tousEnPost ? '✅' : '❌'} ${route} — ${formes.length} formulaire(s) d'essai, tous en POST`);
    if (!tousEnPost) echecs++;

    await page.close();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * La CSP laisse-t-elle vraiment partir ce formulaire ?
 *
 * `form-action` valait 'self'. Cette directive ne se replie PAS sur
 * default-src : tant qu'elle était là, le navigateur bloquait l'envoi vers
 * Supabase, en silence côté visiteur — le bouton semblait simplement ne rien
 * faire. Rien dans le HTML ne l'aurait montré : il faut soumettre pour voir.
 *
 * Le serveur de test sert la CSP RÉELLE, lue dans _headers. On peut donc
 * soumettre pour de bon, en interceptant la destination.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== la CSP laisse partir le formulaire d\'essai =====');
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const refus = [];
  page.on('console', (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) refus.push(m.text());
  });
  let poste = null;
  await page.route('https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/demo-express', async (route) => {
    poste = route.request().method();
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>essai simulé</p>' });
  });
  await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(5000);
  refus.length = 0;   // on ne compte que ce qui suit la soumission

  await page.evaluate(() => document.querySelector('.hero-actions .btn-primary').click());
  await page.waitForTimeout(2500);

  console.log(`   ${poste === 'POST' ? '✅' : '❌'} la requête part, et elle part en POST (${poste || 'RIEN ENVOYÉ'})`);
  if (poste !== 'POST') echecs++;

  const bloque = refus.filter((r) => /form-action/i.test(r));
  console.log(`   ${bloque.length === 0 ? '✅' : '❌'} aucun refus form-action${bloque.length ? ` : ${bloque[0].slice(0, 90)}` : ''}`);
  if (bloque.length) echecs++;
  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Le retour d'un essai qui n'a pas pu s'ouvrir
 *
 * Le serveur renvoie le visiteur ici avec ?essai=trop_de_tentatives ou
 * ?essai=indisponible. Sans message, il revient sur l'accueil sans rien
 * comprendre et conclut que le bouton est cassé.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== le retour d\'un essai raté dit quelque chose =====');
{
  const CAS = [
    ['trop_de_tentatives', /r[ée]essayez dans une heure/i],
    ['indisponible', /n'a pas pu s'ouvrir/i],
    // Un code inconnu ne doit pas laisser le visiteur sans explication.
    ['code_jamais_vu', /n'a pas pu s'ouvrir/i],
  ];
  for (const [code, attendu] of CAS) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`http://localhost:8790/?essai=${code}`, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(4500);
    const texte = await page.$eval('.essai-message p', (e) => e.textContent).catch(() => null);
    const bon = texte !== null && attendu.test(texte);
    console.log(`   ${bon ? '✅' : '❌'} ${code} → « ${texte ? texte.slice(0, 56) : 'AUCUN MESSAGE'} »`);
    if (!bon) echecs++;

    /* L'adresse doit être nettoyée : sinon un rechargement, un partage du lien
       ou un retour en arrière rejoue un message qui n'a plus lieu d'être. */
    const url = await page.evaluate(() => window.location.search);
    const propre = !url.includes('essai=');
    console.log(`   ${propre ? '✅' : '❌'}    et l'adresse est nettoyée (${url || 'vide'})`);
    if (!propre) echecs++;
    await page.close();
  }

  // Sans paramètre, aucun bandeau ne doit apparaître.
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(4500);
  const n = await page.locator('.essai-message').count();
  console.log(`   ${n === 0 ? '✅' : '❌'} sans paramètre, aucun bandeau (${n})`);
  if (n !== 0) echecs++;
  await page.close();
}

await browser.close();
server.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
