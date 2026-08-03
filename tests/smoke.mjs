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
 * La page reste-t-elle dispensée de bandeau de consentement ?
 *
 * Il n'y a pas de bandeau, et c'est un CHOIX étayé : la page ne dépose aucun
 * cookie, et les deux seules choses qu'elle conserve — la langue choisie et le
 * fait que l'animation d'accueil a été jouée — relèvent des traceurs dispensés
 * de consentement par l'article 82 de la loi Informatique et Libertés.
 *
 * Ce choix ne tient que tant que l'inventaire ne bouge pas. Un jour, quelqu'un
 * ajoutera une mesure d'audience, un pixel, une carte, une vidéo intégrée — et
 * personne ne fera le lien avec les mentions légales qui affirment le
 * contraire. Ce contrôle échoue à ce moment-là, pas six mois plus tard.
 *
 * Il liste ce qui est ADMIS. Tout le reste fait échouer, y compris un cookie.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== inventaire des traceurs : rien de nouveau ? =====');
{
  const CLES_ADMISES = {
    local: ['alba_lang'],          // choix de langue — dispensé (CNIL)
    session: ['alba_intro_seen'],  // rideau d'intro, durée de l'onglet
  };
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(5000);
  // On exerce la page : c'est en s'en servant qu'on déclenche les écritures.
  await page.evaluate(() => { const b = document.querySelector('#lang-toggle button[data-lang="en"]'); if (b) b.click(); });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2500);

  const cookies = await ctx.cookies();
  console.log(`   ${cookies.length === 0 ? '✅' : '❌'} aucun cookie déposé (${cookies.length}${cookies.length ? ' : ' + cookies.map((c) => c.name).join(', ') : ''})`);
  if (cookies.length) echecs++;

  const stock = await page.evaluate(() => ({
    local: Object.keys(localStorage), session: Object.keys(sessionStorage),
  }));
  for (const zone of ['local', 'session']) {
    const inconnues = stock[zone].filter((k) => !CLES_ADMISES[zone].includes(k));
    console.log(`   ${inconnues.length === 0 ? '✅' : '❌'} ${zone}Storage : ${stock[zone].join(', ') || 'vide'}${inconnues.length ? ` — NON PRÉVU : ${inconnues.join(', ')}` : ''}`);
    if (inconnues.length) echecs++;
  }

  /* Et la page légale doit continuer de dire la vérité : si elle n'affirme plus
     l'absence de cookie, c'est que quelqu'un a modifié l'un sans l'autre. */
  const legal = await page.goto('http://localhost:8790/mentions-legales.html', { waitUntil: 'load', timeout: 40000 })
    .then(() => page.evaluate(() => document.body.textContent)).catch(() => '');
  const affirme = /aucun cookie/i.test(legal);
  console.log(`   ${affirme ? '✅' : '❌'} les mentions légales l'affirment toujours`);
  if (!affirme) echecs++;
  await ctx.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Le pixel publicitaire dort-il vraiment jusqu'au consentement ?
 *
 * Le pixel Facebook arrive à la rentrée. Tout est écrit, éteint par un
 * interrupteur dans config.js. Ce contrôle éprouve les DEUX états, parce que
 * les deux peuvent se casser indépendamment :
 *
 *   éteint  — aucun bandeau (demander un consentement sans objet est trompeur
 *             et coûte des conversions), et rien vers Facebook ;
 *   allumé  — un bandeau, et RIEN vers Facebook tant que le visiteur n'a pas
 *             cliqué « Tout accepter ». Ni au chargement, ni « pour préparer ».
 *
 * Le piège que ça garde : un jour, quelqu'un ajoutera un <link preconnect> vers
 * Facebook « pour accélérer ». La connexion transmet déjà l'adresse IP — le
 * consentement arriverait après. Ce contrôle compte TOUTE requête sortante vers
 * facebook, quelle qu'en soit la nature.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== le pixel publicitaire dort jusqu\'au consentement =====');
{
  /** Charge l'accueil en forçant l'identifiant de pixel, et compte ce qui part.
   *  `cspOuverte` applique l'étape 1 de la « recette pixel » de _headers. */
  const ouvrir = async (identifiant, cspOuverte = false) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const versFacebook = [];
    const refusCSP = [];
    ctx.on('request', (r) => {
      if (/facebook|fbcdn/i.test(new URL(r.url()).hostname)) versFacebook.push(r.url());
    });
    // Rien ne doit réellement sortir, même si un défaut laissait passer.
    await ctx.route('**://*.facebook.net/**', (r) => r.fulfill({ status: 200, body: '' }));
    await ctx.route('**://*.facebook.com/**', (r) => r.fulfill({ status: 200, body: '' }));
    if (identifiant) {
      await ctx.route('**/config.js', async (r) => {
        const src = await r.fetch().then((x) => x.text());
        await r.fulfill({ status: 200, contentType: 'text/javascript',
          body: src.replace('window.ALBA_PIXEL_FACEBOOK = null;',
                            `window.ALBA_PIXEL_FACEBOOK = ${JSON.stringify(identifiant)};`) });
      });
    }
    if (cspOuverte) {
      await ctx.route('http://localhost:8790/', async (r) => {
        const rep = await r.fetch();
        const ent = { ...rep.headers() };
        const cle = Object.keys(ent).find((k) => k.toLowerCase() === 'content-security-policy');
        if (cle) {
          ent[cle] = ent[cle]
            .replace(/script-src ([^;]*)/, "script-src $1 https://connect.facebook.net")
            .replace(/img-src ([^;]*)/, 'img-src $1 https://www.facebook.com')
            .replace(/connect-src ([^;]*)/, 'connect-src $1 https://www.facebook.com');
        }
        await r.fulfill({ response: rep, headers: ent });
      });
    }
    const page = await ctx.newPage();
    /* Playwright enregistre une requête MÊME quand la CSP la refuse : le
       compteur de requêtes ne prouve donc pas que le script a été chargé. Sans
       cette lecture des refus, le contrôle affichait « le pixel se charge »
       alors que Chromium répondait « Refused to load the script ». */
    page.on('console', (m) => {
      const t = m.text();
      if (/Content Security Policy|Refused to/i.test(t) && /facebook/i.test(t)) refusCSP.push(t);
    });
    await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(5000);
    return { ctx, page, versFacebook, refusCSP };
  };

  { // ── état livré : éteint ──────────────────────────────────────────────────
    const { ctx, page, versFacebook } = await ouvrir(null);
    const bandeau = await page.locator('.consentement').count();
    console.log(`   ${bandeau === 0 ? '✅' : '❌'} éteint — aucun bandeau de consentement (${bandeau})`);
    if (bandeau !== 0) echecs++;
    console.log(`   ${versFacebook.length === 0 ? '✅' : '❌'} éteint — rien vers Facebook (${versFacebook.length})`);
    if (versFacebook.length) echecs++;
    const lien = await page.locator('.foot-col a', { hasText: /^Cookies$/ }).count();
    console.log(`   ${lien === 0 ? '✅' : '❌'} éteint — pas de lien « Cookies » qui n'ouvrirait rien (${lien})`);
    if (lien !== 0) echecs++;
    await ctx.close();
  }

  { // ── allumé, sans réponse ────────────────────────────────────────────────
    const { ctx, page, versFacebook } = await ouvrir('123456789012345');
    const bandeau = await page.locator('.consentement').count();
    console.log(`   ${bandeau === 1 ? '✅' : '❌'} allumé — le bandeau apparaît (${bandeau})`);
    if (bandeau !== 1) echecs++;
    console.log(`   ${versFacebook.length === 0 ? '✅' : '❌'} allumé, sans réponse — TOUJOURS rien vers Facebook (${versFacebook.length})`);
    if (versFacebook.length) echecs++;

    /* Refuser doit être aussi simple qu'accepter : mêmes dimensions, même
       couleur, même niveau. C'est mesuré, pas relu — une retouche de style
       suffit à créer un déséquilibre que personne ne remarque. */
    const boutons = await page.$$eval('.consentement-choix .btn', (els) => els.map((e) => {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      return { texte: e.textContent.trim(), l: Math.round(r.width), h: Math.round(r.height),
               fond: s.backgroundColor, couleur: s.color, taille: s.fontSize };
    }));
    const [refus, accepte] = boutons;
    const equilibre = boutons.length === 2
      && Math.abs(refus.l - accepte.l) < 40 && refus.h === accepte.h
      && refus.fond === accepte.fond && refus.couleur === accepte.couleur
      && refus.taille === accepte.taille;
    console.log(`   ${equilibre ? '✅' : '❌'} refuser pèse autant qu'accepter (${boutons.map((b) => `${b.texte} ${b.l}×${b.h}`).join(' | ')})`);
    if (!equilibre) echecs++;
    // Et le refus doit venir en premier : on ne cache pas la sortie derrière l'entrée.
    console.log(`   ${/refuser/i.test(refus.texte) ? '✅' : '❌'} « Tout refuser » est le premier des deux`);
    if (!/refuser/i.test(refus.texte)) echecs++;

    // ── on refuse ──
    await page.click('.consentement-choix .btn:nth-child(1)');
    await page.waitForTimeout(1500);
    console.log(`   ${versFacebook.length === 0 ? '✅' : '❌'} après un refus — rien vers Facebook (${versFacebook.length})`);
    if (versFacebook.length) echecs++;
    const apresRefus = await page.locator('.consentement').count();
    console.log(`   ${apresRefus === 0 ? '✅' : '❌'} et le bandeau ne revient pas (${apresRefus})`);
    if (apresRefus !== 0) echecs++;
    await ctx.close();
  }

  { // ── allumé, on accepte, CSP telle qu'elle est LIVRÉE ────────────────────
    /* La CSP de production n'autorise pas encore Facebook, et c'est délibéré :
       ouvrir une porte pour un pixel qui n'existe pas serait absurde. Ce
       contrôle constate donc l'état réel — le chargeur fait son travail, et le
       navigateur refuse. C'est très exactement l'étape 1 de la « recette
       pixel » de _headers, et la preuve qu'elle n'est pas décorative : sans
       elle, le pixel serait silencieux sans que rien ne le montre à l'écran. */
    const { ctx, page, versFacebook, refusCSP } = await ouvrir('123456789012345');
    await page.click('.consentement-choix .btn:nth-child(2)');
    await page.waitForTimeout(2500);
    const tente = versFacebook.some((u) => u.includes('fbevents.js'));
    console.log(`   ${tente ? '✅' : '❌'} après acceptation — le chargeur tente le pixel (${versFacebook.length} requête(s))`);
    if (!tente) echecs++;
    console.log(`   ${refusCSP.length > 0 ? '✅' : '❌'} et la CSP livrée le refuse encore, comme prévu (recette, étape 1)`);
    if (refusCSP.length === 0) echecs++;
    await ctx.close();
  }

  { // ── la recette de _headers fonctionne-t-elle vraiment ? ─────────────────
    /* On applique l'étape 1 telle qu'elle est écrite dans _headers et on vérifie
       qu'il ne reste AUCUN refus. Sans ça, la recette ne serait qu'une
       intention : on la découvrirait fausse le jour de la rentrée, pixel muet
       et personne pour comprendre pourquoi. */
    const { ctx, page, versFacebook, refusCSP } = await ouvrir('123456789012345', true);
    await page.click('.consentement-choix .btn:nth-child(2)');
    await page.waitForTimeout(2500);
    const charge = versFacebook.some((u) => u.includes('fbevents.js'));
    console.log(`   ${charge && refusCSP.length === 0 ? '✅' : '❌'} CSP ouverte selon la recette — le pixel passe (${versFacebook.length} requête(s), ${refusCSP.length} refus)`);
    if (!(charge && refusCSP.length === 0)) { echecs++; refusCSP.forEach((r) => console.log(`      ${r.slice(0, 110)}`)); }
    await ctx.close();
  }

  { // ── persistance et retrait ──────────────────────────────────────────────
    const { ctx, page } = await ouvrir('123456789012345');
    await page.click('.consentement-choix .btn:nth-child(2)');
    await page.waitForTimeout(1200);

    // Le choix doit survivre au rechargement, sinon on redemande à chaque page.
    await page.reload({ waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(4000);
    const reste = await page.locator('.consentement').count();
    console.log(`   ${reste === 0 ? '✅' : '❌'} le choix survit au rechargement (${reste} bandeau)`);
    if (reste !== 0) echecs++;

    // Et il doit pouvoir être repris : le retrait doit être aussi simple.
    const lien = await page.locator('.foot-col a', { hasText: /^Cookies$/ }).count();
    console.log(`   ${lien === 1 ? '✅' : '❌'} le lien « Cookies » du pied de page permet d'y revenir (${lien})`);
    if (lien !== 1) echecs++;
    if (lien === 1) {
      await page.locator('.foot-col a', { hasText: /^Cookies$/ }).click();
      await page.waitForTimeout(1200);
      const rouvert = await page.locator('.consentement').count();
      console.log(`   ${rouvert === 1 ? '✅' : '❌'}    et il rouvre effectivement le choix (${rouvert})`);
      if (rouvert !== 1) echecs++;
    }
    await ctx.close();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Trois taps ne consomment pas trois essais
 *
 * PANNE RÉELLE. Le serveur crée un compte, un espace, deux chantiers avec leurs
 * décisions et leurs réserves : plusieurs secondes pendant lesquelles la page
 * ne bouge pas. Anthony a tapé plusieurs fois — n'importe qui l'aurait fait —
 * et le plafond étant de TROIS essais par heure, il s'est verrouillé lui-même
 * sur un bouton qui fonctionnait.
 *
 * Le verrou doit être synchrone (un useState est appliqué au rendu suivant,
 * donc deux taps rapprochés le liraient tous les deux à false) et PARTAGÉ entre
 * le bouton du hero et le bouton flottant, qui font la même chose.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== les taps répétés ne brûlent pas le plafond d\'essais =====');
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const envois = [];
  /* On répond 204. Face à un 204 sur une navigation, le navigateur RESTE sur la
     page courante : c'est très exactement « on clique et rien ne s'ouvre », le
     cas qui fait retaper — et le document reste intact, donc interrogeable.
     (Une réponse lente ferait retaper aussi, mais la page serait en cours de
     navigation et son DOM inaccessible ; un `abort` ferait basculer Chromium
     sur sa page d'erreur, où le bouton n'existe plus.) */
  await page.route('**/functions/v1/demo-express', async (r) => {
    envois.push(r.request().method());
    await r.fulfill({ status: 204 });
  });
  await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(5000);

  /* Les trois taps sont ESPACÉS, et ce n'est pas un détail : trois `click()`
     dans la même tâche ne produisent qu'une navigation de toute façon — le
     navigateur les fusionne — et le contrôle passerait même sans verrou.
     Vérifié en neutralisant le verrou : la version groupée restait au vert.
     Un humain qui s'impatiente tape à un rythme, pas dans la même milliseconde. */
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => document.querySelector('.hero-actions .btn-primary').click());
    await page.waitForTimeout(700);
  }
  console.log(`   ${envois.length === 1 ? '✅' : '❌'} trois taps espacés sur le bouton du hero, un seul envoi (${envois.length})`);
  if (envois.length !== 1) echecs++;

  // Le libellé doit dire que ça travaille, sinon on retape par réflexe.
  const libelle = await page.$eval('.hero-actions .btn-primary', (e) => e.textContent.trim()).catch(() => '');
  const parle = /ouverture/i.test(libelle);
  console.log(`   ${parle ? '✅' : '❌'} et le bouton dit ce qu'il fait (« ${libelle} »)`);
  if (!parle) echecs++;

  /* Le verrou doit être PARTAGÉ : le bouton flottant porte le même libellé et
     fait la même chose. Un verrou par instance laisserait passer un envoi par
     bouton, soit deux des trois essais de l'heure. */
  await page.evaluate(() => {
    const f = document.querySelector('.float-cta');
    if (f) f.click();
  });
  await page.waitForTimeout(1200);
  console.log(`   ${envois.length === 1 ? '✅' : '❌'} le bouton flottant ne relance rien non plus (${envois.length})`);
  if (envois.length !== 1) echecs++;

  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Le bouton résiste-t-il à un config.js périmé ?
 *
 * PANNE RÉELLE, remontée par Anthony : « on clique, on reste sur la page ».
 *
 * <BoutonEssai/> lisait window.ALBA_POINT_ESSAI et, à défaut, rendait un
 * <a href="#fonctionnalites">. Un config.js d'avant l'ajout de cette constante
 * — resté dans le cache du navigateur ou en périphérie — suffisait donc à
 * transformer le bouton en ancre : React montait, remplaçait le formulaire
 * correct du HTML prérendu, et le clic se contentait de faire défiler la page.
 * Rien à l'écran ne distinguait les deux boutons.
 *
 * Le repli a été supprimé : l'adresse vit dans le composant, config.js ne fait
 * que la remplacer. Ce contrôle rejoue la page avec un config.js amputé de la
 * constante et exige quand même un formulaire qui poste.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== un config.js périmé ne peut plus rendre le bouton inerte =====');
{
  for (const [nom, transformer] of [
    ['sans ALBA_POINT_ESSAI', (s) => s.replace(/window\.ALBA_POINT_ESSAI[\s\S]*?;/, '')],
    ['ALBA_POINT_ESSAI vide', (s) => s.replace(/window\.ALBA_POINT_ESSAI[\s\S]*?;/, 'window.ALBA_POINT_ESSAI = "";')],
    ['config.js absent', null],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    let envoye = null;
    await page.route('**/functions/v1/demo-express', async (r) => {
      envoye = r.request().method();
      await r.fulfill({ status: 200, contentType: 'text/html', body: 'ok' });
    });
    await page.route('**/config.js', async (r) => {
      if (!transformer) return r.fulfill({ status: 404, body: '' });
      const src = await r.fetch().then((x) => x.text());
      await r.fulfill({ status: 200, contentType: 'text/javascript', body: transformer(src) });
    });
    await page.goto('http://localhost:8790/', { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(5000);

    const rendu = await page.$eval('.hero-actions .btn-primary', (e) => ({
      balise: e.tagName,
      action: e.closest('form') ? e.closest('form').getAttribute('action') : null,
    })).catch(() => null);
    const estFormulaire = rendu && rendu.balise === 'BUTTON' && (rendu.action || '').includes('demo-express');
    console.log(`   ${estFormulaire ? '✅' : '❌'} ${nom} — rendu <${rendu ? rendu.balise.toLowerCase() : 'absent'}>, action ${rendu ? rendu.action : '—'}`);
    if (!estFormulaire) echecs++;

    await page.click('.hero-actions .btn-primary').catch(() => {});
    await page.waitForTimeout(1500);
    console.log(`   ${envoye === 'POST' ? '✅' : '❌'}    et le clic poste quand même (${envoye || 'RIEN ENVOYÉ'})`);
    if (envoye !== 'POST') echecs++;
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
