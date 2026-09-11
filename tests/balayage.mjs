/**
 * BALAYAGE EXPLORATOIRE — on cherche là où les autres contrôles ne regardent pas.
 *
 * Il est né exploratoire — un relevé, pas une promesse. Il a trouvé, du premier
 * coup, treize points sur dix pages : dix sauts de niveau de titre, et surtout
 * trois adresses déclarées dans le plan du site que outils/pages.mjs ne
 * connaissait pas sous leur vraie forme, ce qui avait privé de règle de cache
 * les trois pages que les visiteurs demandent réellement.
 *
 * Il fait donc désormais ÉCHOUER la suite. Tout ce qu'il vérifie est un défaut
 * réel, et aucun ne se voit à l'œil : une erreur JS, une requête morte, un lien
 * mort, un débordement horizontal, un identifiant en double, un contrôle sans
 * nom accessible, un saut de titre, un plan du site qui ment.
 *
 * Si un relevé est un faux positif, on ne l'ignore pas : on le NOMME ici, avec
 * la raison. Un garde-fou qui accuse à tort finit contourné, puis retiré.
 *
 *     node tests/balayage.mjs
 */
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';
import { ROUTES, PAGES } from '../outils/pages.mjs';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:8956';
const LARGEURS = [320, 390, 768, 1024, 1440];
const trouvailles = [];
const noter = (gravite, ou, quoi) => trouvailles.push({ gravite, ou, quoi });

const srv = await demarrer(8956);
const nav = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/* ── 1 · CHAQUE PAGE : ERREURS, REQUÊTES MORTES, DÉBORDEMENT, DOM ───────── */
for (const route of ROUTES) {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const erreurs = [];
  const mortes = [];
  page.on('pageerror', (e) => erreurs.push(String(e.message).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') erreurs.push('console: ' + m.text().slice(0, 160)); });
  page.on('response', (r) => { if (r.status() >= 400) mortes.push(`${r.status()} ${r.url().replace(BASE, '')}`); });

  await page.goto(BASE + route, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(3000);

  for (const e of new Set(erreurs)) noter('ERREUR JS', route, e);
  for (const m of new Set(mortes)) noter('REQUÊTE MORTE', route, m);

  /* Structure du document — ces défauts ne se voient jamais à l'œil. */
  const dom = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((n) => n.id);
    const doublons = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];

    const sansAlt = [...document.querySelectorAll('img')]
      .filter((i) => !i.hasAttribute('alt')).map((i) => i.getAttribute('src') || '?');

    /* Un bouton ou un lien sans nom accessible est muet au lecteur d'écran. */
    const muets = [...document.querySelectorAll('a[href], button')].filter((n) => {
      if (n.offsetParent === null) return false;
      const nom = (n.getAttribute('aria-label') || n.getAttribute('title') || n.textContent || '').trim();
      return nom === '' && !n.querySelector('img[alt]:not([alt=""])');
    }).map((n) => `<${n.tagName.toLowerCase()}> class="${n.className}"`);

    /* Sauts de niveau de titre : h2 → h4 désoriente la navigation par titres. */
    const niveaux = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter((h) => h.offsetParent !== null).map((h) => +h.tagName[1]);
    const sauts = [];
    for (let i = 1; i < niveaux.length; i++) {
      if (niveaux[i] - niveaux[i - 1] > 1) sauts.push(`h${niveaux[i - 1]} → h${niveaux[i]}`);
    }

    const h1 = document.querySelectorAll('h1').length;

    /* Liens externes en nouvel onglet sans rel : fuite de window.opener. */
    const opener = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !/noopener/.test(a.getAttribute('rel') || '')).map((a) => a.href);

    const lang = document.documentElement.lang;
    const canonical = document.querySelector('link[rel=canonical]')?.href || '';
    const titre = document.title;
    const desc = document.querySelector('meta[name=description]')?.content || '';

    const liens = [...new Set([...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !/^(https?:|mailto:|tel:|#)/.test(h)))];

    return { doublons, sansAlt, muets: [...new Set(muets)], sauts, h1, opener, lang, canonical, titre, desc, liens };
  });

  if (dom.doublons.length) noter('ID EN DOUBLE', route, dom.doublons.join(', '));
  if (dom.sansAlt.length) noter('IMG SANS alt', route, dom.sansAlt.join(', '));
  if (dom.muets.length) noter('CONTRÔLE MUET', route, dom.muets.join(' · '));
  if (dom.sauts.length) noter('SAUT DE TITRE', route, [...new Set(dom.sauts)].join(', '));
  if (dom.h1 !== 1) noter('H1', route, `${dom.h1} <h1> (attendu 1)`);
  if (dom.opener.length) noter('target=_blank SANS noopener', route, dom.opener.join(', '));
  if (!dom.titre || dom.titre.length > 65) noter('TITRE', route, `${dom.titre.length} caractères — « ${dom.titre} »`);
  if (!dom.desc || dom.desc.length > 165) noter('DESCRIPTION', route, `${dom.desc.length} caractères`);
  const langAttendue = route.startsWith('/en') ? 'en' : 'fr';
  if (dom.lang !== langAttendue) noter('LANG', route, `<html lang="${dom.lang}"> (attendu ${langAttendue})`);

  /* Les liens internes mènent-ils quelque part ? */
  for (const href of dom.liens) {
    const cible = new URL(href, BASE + route).pathname;
    const r = await page.request.get(BASE + cible).catch(() => null);
    if (!r || r.status() >= 400) noter('LIEN MORT', route, `${href} → ${r ? r.status() : 'échec'}`);
  }

  /* Débordement horizontal, à cinq largeurs. */
  for (const w of LARGEURS) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(500);
    const deborde = await page.evaluate(() => {
      const trop = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      if (trop <= 1) return null;
      const coupables = [...document.querySelectorAll('body *')]
        .filter((n) => n.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
        .slice(0, 3).map((n) => `<${n.tagName.toLowerCase()} class="${String(n.className).slice(0, 40)}">`);
      return { trop, coupables };
    });
    if (deborde) noter('DÉBORDEMENT', `${route} @${w}px`, `${deborde.trop}px — ${deborde.coupables.join(' ')}`);
  }
  await ctx.close();
}

/* ── 2 · LE PLAN DU SITE DIT-IL LA VÉRITÉ ? ─────────────────────────────── */
{
  const plan = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const declarees = [...plan.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  /* `horsPlan` écarte la page d'erreur : elle répond à toutes les adresses
     inconnues et n'en a aucune à elle, donc elle n'a rien à faire dans un plan
     de site — elle porte d'ailleurs noindex. L'exception est NOMMÉE ici plutôt
     que devinée : un garde-fou dont on ne sait plus ce qu'il laisse passer ne
     protège plus de rien. */
  const servies = PAGES.filter((p) => !p.horsPlan).map((p) => p.route);
  for (const d of declarees) {
    const r = await (await nav.newContext()).request.get(BASE + d).catch(() => null);
    if (!r || r.status() >= 400) noter('SITEMAP', d, `déclarée mais ${r ? r.status() : 'injoignable'}`);
  }
  for (const s of servies) {
    if (!declarees.includes(s)) noter('SITEMAP', s, 'servie mais absente du plan du site');
  }
}

/* ── 3 · LA PAGE D'ERREUR REND-ELLE UN CHEMIN ? ─────────────────────────── */
{
  /* Il n'y en avait pas : Cloudflare servait la sienne, blanche, sans marque ni
     navigation. On n'atterrit pas sur un 404 par curiosité — on y arrive par
     une adresse mal recopiée ou un vieux lien, donc par quelqu'un qui voulait
     déjà venir. Ce qui compte n'est pas qu'elle soit jolie : c'est qu'elle
     dise où aller, et qu'elle ne se fasse pas indexer. */
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const rep = await page.goto(BASE + '/une-adresse-qui-n-existe-pas', { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  if (rep.status() !== 404) noter('404', '/adresse-inconnue', `statut ${rep.status()} au lieu de 404`);

  const vu = await page.evaluate(() => ({
    robots: document.querySelector('meta[name=robots]')?.content || '',
    titre: document.title,
    h1: document.querySelector('h1')?.textContent.trim() || '',
    /* Au moins l'accueil et les tarifs : sans chemin de retour, la page ne
       sert à rien de plus que celle de l'hébergeur. */
    retours: [...document.querySelectorAll('main a[href]')].map((a) => new URL(a.href).pathname),
    pied: !!document.querySelector('footer a[href]'),
  }));
  if (!/noindex/.test(vu.robots)) noter('404', '/adresse-inconnue', `robots « ${vu.robots} » — une page d'erreur ne doit pas s'indexer`);
  if (!vu.h1) noter('404', '/adresse-inconnue', 'aucun <h1>');
  for (const attendu of ['/', '/tarifs']) {
    if (!vu.retours.includes(attendu)) noter('404', '/adresse-inconnue', `aucun chemin de retour vers ${attendu}`);
  }
  if (!vu.pied) noter('404', '/adresse-inconnue', 'pas de pied de page');

  /* Elle n'a pas d'adresse à elle : elle ne doit pas figurer au plan du site. */
  const plan = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  if (/404/.test(plan)) noter('404', 'sitemap.xml', 'la page d\'erreur est déclarée au plan du site');

  /* Un seul fichier répond dans les deux langues : le texte doit basculer SUR
     PLACE, sans changer d'adresse — il n'y a pas de jumelle à rejoindre. */
  const avant = await page.evaluate(() => document.querySelector('h1').textContent.trim());
  await page.evaluate(() => document.querySelector('#lang-toggle button[data-lang=en]').click());
  await page.waitForTimeout(600);
  const apres = await page.evaluate(() => ({
    h1: document.querySelector('h1').textContent.trim(),
    lang: document.documentElement.lang,
    chemin: location.pathname,
  }));
  if (apres.h1 === avant || apres.lang !== 'en') {
    noter('404', '/adresse-inconnue', `la bascule EN ne traduit pas sur place (« ${apres.h1} », lang=${apres.lang})`);
  }
  if (apres.chemin !== '/une-adresse-qui-n-existe-pas') {
    noter('404', '/adresse-inconnue', `la bascule a quitté l'adresse (${apres.chemin})`);
  }
  await ctx.close();
}

/* ── 3 bis · ELLE TIENT DEBOUT À N'IMPORTE QUELLE PROFONDEUR ────────────── */
{
  /* CE QUI S'EST PASSÉ, ET QUI NE DOIT PAS REVENIR.
     La page d'erreur a été livrée avec toutes ses références en RELATIF —
     « sections.css », « photos.js », « index.html#contact ». Or Cloudflare la
     sert à TOUTE adresse inconnue sans changer l'adresse affichée : à
     /blog/mon-article, le navigateur va chercher /blog/sections.css. Mesuré à
     la livraison : 20 requêtes mortes, aucune feuille de style, une page nue.

     Le premier contrôle ne l'a pas vu parce qu'il testait /adresse-inconnue,
     à UN seul niveau — la seule profondeur où le relatif tombe juste. On
     éprouve donc plusieurs formes, dont une avec barre finale et une à deux
     niveaux, parce que c'est la profondeur qui décide. */
  for (const chemin of ['/y/', '/a/b', '/blog/mon-article']) {
    const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const mortes = [];
    page.on('response', (r) => {
      const u = r.url().replace(BASE, '');
      /* Le document lui-même répond 404, c'est le but : on ne compte que ses
         ressources. */
      if (r.status() >= 400 && u !== chemin) mortes.push(u);
    });
    await page.goto(BASE + chemin, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(2200);
    if (mortes.length) {
      noter('404 PROFONDEUR', chemin, `${mortes.length} ressource(s) morte(s) — ${mortes.slice(0, 3).join(' ')}`);
    }
    /* Et la preuve que la feuille de style est bien arrivée : sans elle, les
       pistes ne sont plus des cartes mais du texte au fil de l'eau. */
    const applique = await page.evaluate(() => {
      const p = document.querySelector('.e404-piste');
      return p ? getComputedStyle(p).display : 'ABSENT';
    });
    if (applique !== 'flex') noter('404 PROFONDEUR', chemin, `mise en forme absente (.e404-piste display=${applique})`);
    await ctx.close();
  }
}

/* ── 4 · LA CONTRAINTE QUI NE DOIT JAMAIS CÉDER ─────────────────────────── */
{
  /* demo-express CRÉE UN COMPTE : un <a href> serait suivi par les robots et
     les antivirus, qui créeraient des comptes en visitant la page. Ça doit
     rester un formulaire POST. */
  const ctx = await nav.newContext();
  const page = await ctx.newPage();
  for (const route of ['/', '/en']) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(2500);
    const etat = await page.evaluate(() => {
      const a = [...document.querySelectorAll('a[href*="demo-express"]')].map((x) => x.href);
      const f = [...document.querySelectorAll('form')].filter((x) => /demo-express/.test(x.action))
        .map((x) => (x.method || '').toLowerCase());
      return { liens: a, formulaires: f };
    });
    if (etat.liens.length) noter('⚠️ CONTRAINTE', route, `demo-express en <a href> : ${etat.liens.join(', ')}`);
    for (const m of etat.formulaires) if (m !== 'post') noter('⚠️ CONTRAINTE', route, `formulaire demo-express en ${m}`);
  }
  await ctx.close();
}

await nav.close();
srv.close();

/* ── LE RELEVÉ ──────────────────────────────────────────────────────────── */
console.log(`\n${'═'.repeat(78)}\nBALAYAGE — ${trouvailles.length} point(s) relevé(s)\n${'═'.repeat(78)}`);
const parType = {};
for (const t of trouvailles) (parType[t.gravite] ||= []).push(t);
for (const [type, liste] of Object.entries(parType)) {
  console.log(`\n── ${type} (${liste.length}) ──`);
  for (const t of liste) console.log(`   ${t.ou.padEnd(26)} ${t.quoi}`);
}
if (!trouvailles.length) console.log('\n✅ rien à signaler');
process.exit(trouvailles.length ? 1 : 0);
