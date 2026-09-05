/**
 * Toutes les ancres de toutes les pages mènent-elles quelque part ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Un lien d'ancre cassé ne fait rien. Pas d'erreur, pas de 404, pas de ligne
 * rouge dans la console : on clique, la page ne bouge pas. C'est la panne la
 * plus silencieuse du site, et il y en avait onze.
 *
 * Deux causes, et les deux reviendront :
 *
 *   · UNE SECTION DISPARAÎT, SES LIENS RESTENT. « Une suite complète » a été
 *     retirée quand la page a été raccourcie ; les trois liens « La plateforme »
 *     vers #features sont restés, dans la barre de navigation, dans le menu
 *     mobile et dans le pied de page ;
 *   · UN COMPOSANT PARTAGÉ VOYAGE. Le pied de page et les badges App Store sont
 *     montés sur les trois pages. Leurs ancres visent des sections qui
 *     n'existent que sur l'accueil : elles étaient mortes sur /tarifs et sur les
 *     mentions légales, tout en fonctionnant parfaitement là où on les
 *     relisait.
 *
 * Ce contrôle regarde les trois pages, parce que c'est justement la page qu'on
 * ne regarde pas qui casse.
 */
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';
import { ROUTES } from '../outils/pages.mjs';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8949);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/* Les fragments que porte l'accueil : c'est là que vivent toutes les sections
   visées depuis les composants partagés. Un lien « index.html#… » est jugé
   valide si, et seulement si, l'accueil porte réellement la cible. */
const page0 = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
await page0.goto('http://localhost:8949/', { waitUntil: 'load', timeout: 40000 });
await page0.waitForTimeout(6000);
const ancresAccueil = new Set(await page0.evaluate(() =>
  [...document.querySelectorAll('[id]')].map((e) => e.id)));
await page0.close();
console.log(`\n===== ancres de l'accueil : ${ancresAccueil.size} =====`);

for (const route of ROUTES) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:8949' + route, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(6000);

  const liens = await page.evaluate(() => {
    const vus = new Map();
    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (!href || !href.includes('#')) continue;
      const frag = href.slice(href.indexOf('#') + 1);
      const cible = href.slice(0, href.indexOf('#'));
      if (vus.has(href)) continue;
      vus.set(href, {
        href, frag,
        // Vise-t-il CETTE page (fragment nu) ou l'accueil (index.html#…) ?
        interne: cible === '' || /(^|\/)index\.html$/.test(cible),
        versAccueil: /(^|\/)index\.html$/.test(cible),
        ici: frag ? !!document.getElementById(frag) : false,
        // Le logo de la marque porte href="#" et un gestionnaire qui recharge
        // la page : c'est voulu, et ce n'est pas une ancre.
        marque: a.id === 'brand-home',
        texte: (a.textContent || '').trim().slice(0, 26),
      });
    }
    return [...vus.values()];
  });

  console.log(`\n===== ${route} =====`);
  for (const l of liens) {
    if (l.marque) continue;

    if (!l.frag) {
      // href="#" : le navigateur ne va nulle part, et le gestionnaire d'ancres
      // l'ignore explicitement. C'est un lien mort, pas un raccourci.
      ok(false, `${l.href.padEnd(28)} fragment VIDE — « ${l.texte} »`);
      continue;
    }
    if (l.versAccueil) {
      ok(ancresAccueil.has(l.frag),
         `${l.href.padEnd(28)} → l'accueil porte #${l.frag}${ancresAccueil.has(l.frag) ? '' : ' — ABSENT DE L\'ACCUEIL'} — « ${l.texte} »`);
      continue;
    }
    if (l.interne) {
      /* Fragment nu : il DOIT exister sur cette page-ci. C'est le cas qui a
         cassé — le pied de page voyage, ses ancres non. */
      ok(l.ici,
         `${l.href.padEnd(28)} → présent sur cette page${l.ici ? '' : ' — CIBLE ABSENTE ICI'} — « ${l.texte} »`);
    }
  }
  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Et la barre de navigation ne doit pas viser une section retirée.
 * C'est elle qu'un visiteur essaie en premier, et elle qu'on oublie de relire
 * quand on commente une section dans page-accueil.jsx.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== la barre de navigation et le menu mobile =====');
{
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:8949/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(6000);
  for (const zone of ['#nav-links', '#mobile-menu-links']) {
    const morts = await page.evaluate((sel) => {
      const r = document.querySelector(sel);
      if (!r) return ['ZONE ABSENTE'];
      return [...r.querySelectorAll('a[href^="#"]')]
        .filter((a) => {
          const f = a.getAttribute('href').slice(1);
          return !f || !document.getElementById(f);
        })
        .map((a) => `${a.getAttribute('href')} (« ${a.textContent.trim()} »)`);
    }, zone);
    ok(morts.length === 0, `${zone.padEnd(22)} aucune ancre morte${morts.length ? ` — ${morts.join(', ')}` : ''}`);
  }

  /* Un clic doit AMENER la section à l'écran, sous la barre fixe. Une ancre
     correcte peut malgré tout mal atterrir : la barre est en position fixe, et
     sans décalage elle recouvre le titre visé. */
  const cible = '#pour-qui';
  await page.evaluate((f) => document.querySelector(`#nav-links a[href="${f}"]`).click(), cible);
  await page.waitForTimeout(2500);
  const pos = await page.evaluate((f) => {
    const r = document.querySelector(f).getBoundingClientRect();
    const nav = document.getElementById('nav');
    return { haut: Math.round(r.top), barre: nav ? Math.round(nav.getBoundingClientRect().height) : 0 };
  }, cible);
  const visible = pos.haut >= 0 && pos.haut < 200;
  ok(visible, `${cible} atterrit à ${pos.haut} px du haut (barre : ${pos.barre} px)`);
  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ARRIVER SUR L'ANCRE, PAS SEULEMENT CLIQUER DESSUS
 *
 * Le contrôle ci-dessus vérifie que la cible existe, et qu'un CLIC depuis
 * l'accueil atterrit bien. Il ne disait rien du cas qui a réellement cassé :
 * l'ARRIVÉE par l'adresse. « À propos » dans le pied de page de /tarifs, des
 * mentions légales ou des deux pages de fond vaut `index.html#fondateur` — une
 * vraie navigation, suivie d'un saut au fragment.
 *
 * Mesuré avant correction, à 390 px : arrivée sur index.html#fondateur à
 * 2 293 px, section à 15 671 px. Treize mille pixels. Sur index.html#faq,
 * treize mille huit cents. Sur index.html#securite, on restait à zéro.
 *
 * La cause est le calendrier, pas l'ancre : le navigateur saute dès l'analyse
 * du HTML prérendu, puis React monte, les images arrivent et GSAP épingle —
 * la page triple de hauteur et la cible s'en va. Le correctif vit en fin de
 * page-accueil.jsx : il reprend la cible tant qu'elle bouge.
 *
 * Ce contrôle-ci est celui qui a manqué. Il ouvre chaque fragment du pied de
 * page comme un visiteur le ferait, aux deux largeurs, et exige que la section
 * visée soit à l'écran.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log("\n===== arriver directement sur index.html#ancre =====");
{
  const FRAGMENTS = ['fonctionnalites', 'devices', 'faq', 'fondateur', 'manifeste', 'contact', 'securite'];
  for (const vue of [{ w: 390, h: 844, mobile: true }, { w: 1280, h: 900, mobile: false }]) {
    for (const frag of FRAGMENTS) {
      const page = await navigateur.newPage({
        viewport: { width: vue.w, height: vue.h },
        isMobile: vue.mobile, hasTouch: vue.mobile,
      });
      await page.goto(`http://localhost:8949/index.html#${frag}`, { waitUntil: 'load', timeout: 40000 });
      /* Le rideau d'intro dure ~2,4 s, la correction s'arrête au plus tard à
         6 s : on laisse la page finir de se poser avant de juger. */
      await page.waitForTimeout(8000);
      const r = await page.evaluate((f) => {
        const el = document.getElementById(f);
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { haut: Math.round(b.top), bas: Math.round(b.bottom), ecran: window.innerHeight };
      }, frag);
      if (!r) { ok(false, `${vue.w}px  #${frag} : section absente`); await page.close(); continue; }
      /* « À l'écran » se juge sur le haut de la section : elle doit être posée
         juste sous la barre fixe, pas seulement quelque part dans le champ. */
      const bon = r.haut >= -4 && r.haut < 220;
      ok(bon, `${String(vue.w).padStart(4)}px  #${frag.padEnd(16)} haut de section à ${String(r.haut).padStart(6)} px de l'écran`);
      await page.close();
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ET AUCUN LIEN DU PIED DE PAGE NE DOIT ÊTRE RECOUVERT
 *
 * Deuxième moitié de la même panne. Sur téléphone, la pile de notifications
 * barre l'écran sur toute sa largeur, de 70 à 274 px du haut. En bas de
 * l'accueil, trois liens du pied de page passaient dessous : on appuie, on
 * touche la notification, il ne se passe rien — et la notification étant en
 * haut de l'écran, on ne fait pas le rapprochement.
 *
 * `elementFromPoint` dit ce qui reçoit réellement l'appui. C'est la seule
 * mesure qui vaille : le lien est bien dans le document, bien visible, et
 * pourtant hors d'atteinte.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log("\n===== le pied de page reçoit vraiment les appuis =====");
{
  const page = await navigateur.newPage({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
  });
  await page.goto('http://localhost:8949/', { waitUntil: 'load', timeout: 40000 });
  /* On descend comme un doigt le ferait : c'est le passage devant #pricing qui
     déclenche la notification contextuelle. Un scrollTo direct ne la lèverait
     pas, et le test serait vert sans rien prouver. */
  for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const bloques = await page.evaluate(() => {
    const out = [];
    for (const a of document.querySelectorAll('.foot a')) {
      const r = a.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const y = r.top + r.height / 2;
      if (y <= 0 || y >= window.innerHeight) continue;   // hors écran : rien à dire
      const dessus = document.elementFromPoint(r.left + r.width / 2, y);
      if (dessus && (dessus === a || a.contains(dessus) || dessus.contains(a))) continue;
      out.push(`« ${a.textContent.trim()} » recouvert par <${dessus ? dessus.tagName.toLowerCase() : '?'}${dessus && dessus.className ? '.' + String(dessus.className).split(' ')[0] : ''}>`);
    }
    return out;
  });
  ok(bloques.length === 0, `aucun lien du pied de page recouvert${bloques.length ? ` — ${bloques.join(' ; ')}` : ''}`);
  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ET CHAQUE LIEN DE PAGE DOIT ÊTRE SERVI
 *
 * La panne qui a coûté le plus cher n'était pas une ancre : c'était un lien
 * ordinaire vers une page qui existe. Le pied de page visait
 * « co-traitants.html ». Le fichier était bien là, bien déployé — et le
 * visiteur recevait une erreur.
 *
 * Cloudflare Pages n'expose pas un fichier à son nom. Il le sert à son adresse
 * sans extension et renvoie /co-traitants.html vers /co-traitants. Ce renvoi
 * retombait sur la réécriture de _redirects (/co-traitants → /co-traitants.html)
 * qui repointait vers le fichier, lequel renvoyait de nouveau vers l'adresse
 * propre : une boucle. Les règles fautives étaient exactement celles dont la
 * source est l'adresse propre de leur propre cible.
 *
 * Rien de tout cela ne se voyait ici, parce que le serveur de test servait le
 * fichier tel quel. Il imite maintenant Pages (voir serveur.mjs), et ce
 * contrôle demande simplement : chaque lien interne répond-il ?
 *
 * C'est le contrôle le moins spectaculaire du dossier et le seul qui aurait
 * évité deux jours de liens morts en ligne.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log("\n===== chaque lien interne est servi =====");
{
  const vus = new Set();
  for (const route of ROUTES) {
    const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8949' + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(4000);
    const liens = await page.evaluate(() =>
      [...document.querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !h.startsWith('#') && !/^(https?:|mailto:|tel:)/.test(h)));
    await page.close();

    for (const href of liens) {
      /* Résolu depuis la page courante, comme le navigateur le ferait : c'est
         la résolution relative qui décide de l'adresse réellement demandée. */
      const url = new URL(href, 'http://localhost:8949' + route);
      const cle = url.pathname;
      if (vus.has(cle)) continue;
      vus.add(cle);
      const r = await fetch(url.origin + url.pathname, { redirect: 'manual' });
      ok(r.status === 200, `${cle.padEnd(26)} → ${r.status}${r.status === 200 ? '' : ' — NON SERVI'}`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * AUCUNE RÈGLE DE _redirects NE DOIT BOUCLER SUR ELLE-MÊME
 *
 * Le contrôle précédent vérifie qu'un fichier est là et servi. Il ne rejoue pas
 * _redirects — aucun test local ne le peut — et n'aurait donc pas vu la panne.
 * Celui-ci la voit, en lisant la règle plutôt que son effet.
 *
 * La forme fautive est reconnaissable à l'œil nu une fois qu'on la connaît :
 *
 *     /co-traitants     /co-traitants.html     200
 *
 * Cloudflare Pages sert un fichier à son adresse SANS extension et renvoie
 * l'adresse AVEC extension vers celle-là. Une règle dont la source est
 * exactement l'adresse propre de sa propre cible se remet donc en jeu à chaque
 * tour : /co-traitants → /co-traitants.html → /co-traitants → … Le fichier est
 * déployé, la page est juste, et le visiteur reçoit une erreur.
 *
 * La règle des tarifs a la même forme et ne boucle pas — /tarifs → /Tarifs.html,
 * la casse diffère, la source n'est pas l'adresse propre de la cible. C'est
 * pourquoi /Tarifs s'ouvrait pendant que /co-traitants échouait, et c'est ce
 * que cette comparaison doit distinguer.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log("\n===== _redirects : aucune règle ne boucle =====");
{
  const fs = await import('node:fs');
  const path = await import('node:path');
  const brut = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8');
  const regles = brut.split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/))
    .filter((c) => c.length >= 2);

  /* L'adresse à laquelle Cloudflare sert réellement une cible locale. */
  const adressePropre = (dest) => {
    if (!dest.startsWith('/') || !dest.endsWith('.html')) return null;
    return /\/index\.html$/.test(dest) ? dest.replace(/index\.html$/, '') : dest.slice(0, -5);
  };

  const boucles = regles.filter(([src, dest]) => adressePropre(dest) === src);
  ok(boucles.length === 0,
     `aucune règle dont la source est l'adresse propre de sa cible${boucles.length ? ` — ${boucles.map((r) => r.join(' ')).join(' ; ')}` : ''}`);

  /* Et toute cible locale doit exister : une règle vers un fichier absent est
     un lien mort qu'aucune page ne montre, donc que personne ne signale. */
  const absentes = regles
    .map(([, dest]) => dest)
    .filter((d) => d.startsWith('/') && d.endsWith('.html'))
    .filter((d) => !fs.existsSync(path.join(ROOT, d)));
  ok(absentes.length === 0, `toute cible locale existe${absentes.length ? ` — ${absentes.join(', ')}` : ''}`);
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
