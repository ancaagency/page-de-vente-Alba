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
import { demarrer } from './serveur.mjs';

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

for (const route of ['/', '/tarifs', '/mentions-legales.html']) {
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

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
