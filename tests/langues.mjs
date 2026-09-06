/**
 * L'anglais a-t-il une adresse, et cette adresse tient-elle debout ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Le site était bilingue et l'anglais n'existait pour personne. Le choix de
 * langue vivait dans localStorage : une seule adresse servait les deux
 * versions. Un moteur de recherche indexe des ADRESSES — tout le texte anglais
 * était donc invisible à la recherche, y compris la grille tarifaire.
 *
 * Rien ne le signalait. La bascule FR/EN fonctionnait parfaitement, la
 * traduction était complète, et elle ne servait qu'aux visiteurs déjà arrivés.
 *
 * Ce contrôle vérifie les quatre choses qui peuvent redevenir fausses en
 * silence :
 *
 *   1. LA PAGE ANGLAISE SE CHARGE ENTIÈREMENT. C'est le risque numéro un de la
 *      structure choisie. Toutes les adresses du site sont relatives, y compris
 *      celles que le script construit à l'exécution. C'est pour cela que /en est
 *      un fichier à la racine et non un sous-dossier — depuis /en/, tout se
 *      serait résolu en /en/images/… et la page serait arrivée nue. Le jour où
 *      quelqu'un voudra la beauté de /en/, c'est ce contrôle qui l'arrêtera.
 *   2. ELLE EST EN ANGLAIS, y compris dans le HTML servi aux robots. Une page
 *      anglaise dont le prérendu est français ne trompe personne d'autre que
 *      Google, ce qui est précisément le problème qu'on cherchait à régler.
 *   3. LES ALTERNATIVES SONT RÉCIPROQUES. Une page qui en déclare une autre
 *      sans que celle-ci lui rende la pareille est purement ignorée : c'est la
 *      première cause d'un hreflang qui ne sert à rien.
 *   4. ON NE SORT PAS DE L'ANGLAIS AU PREMIER CLIC. La barre de navigation est
 *      du HTML statique, le pied de page vient de React : les deux pointaient
 *      vers les pages françaises.
 */
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';
import { PAIRES } from '../outils/anglais.mjs';
import fs from 'node:fs';
import path from 'node:path';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8952);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const paire of PAIRES) {
  console.log(`\n===== ${paire.routeEn} =====`);
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });

  /* Toute requête qui échoue, quelle qu'elle soit. C'est LE contrôle : une
     feuille de style absente ne lève aucune erreur JavaScript, la page
     s'affiche — nue — et rien ne le dit. */
  const ratees = [];
  page.on('response', (r) => { if (r.status() >= 400) ratees.push(`${r.status()} ${new URL(r.url()).pathname}`); });
  page.on('requestfailed', (r) => ratees.push(`échec ${new URL(r.url()).pathname}`));

  /* Et une mémoire de langue contraire, pour vérifier que l'adresse l'emporte.
     C'est le cas du visiteur français qui reçoit un lien anglais. */
  await page.addInitScript(() => { try { localStorage.setItem('alba_lang', 'fr'); } catch (e) {} });

  await page.goto('http://localhost:8952' + paire.routeEn, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(5000);

  ok(ratees.length === 0, `aucune requête en échec${ratees.length ? ` — ${[...new Set(ratees)].join(', ')}` : ''}`);

  const etat = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    langue: window.__albaLang,
    titre: document.title,
    canonique: document.querySelector('link[rel=canonical]')?.getAttribute('href') || '',
    /* La page est-elle habillée ? Un fond blanc par défaut et une police
       système trahissent une feuille de style absente. */
    police: getComputedStyle(document.body).fontFamily,
    /* La page porte-t-elle vraiment du contenu ? On compte les caractères et
       non les <section> : les mentions légales n'en ont aucune, leur corps est
       une suite de <h2> et de <p>. Compter les sections y donnait zéro, et le
       contrôle accusait une page parfaitement saine. Un contrôle qui se trompe
       de mesure ne prouve rien et fait perdre du temps à qui le lit. */
    texte: (document.body.innerText || '').trim().length,
  }));

  ok(etat.lang === 'en', `<html lang> vaut « ${etat.lang} »`);
  ok(etat.langue === 'en', `la langue d'exécution est « ${etat.langue} » malgré une mémoire réglée sur « fr »`);
  ok(etat.titre === paire.titre, `<title> anglais${etat.titre === paire.titre ? '' : ` — trouvé « ${etat.titre} »`}`);
  ok(etat.canonique.endsWith(paire.routeEn), `canonique → ${etat.canonique}`);
  ok(/Inter/i.test(etat.police), `la feuille de style est bien appliquée (police : ${etat.police.split(',')[0]})`);
  ok(etat.texte > 1500, `${etat.texte} caractères de texte affichés`);

  /* ── Du texte anglais, et pas de français résiduel ─────────────────────── */
  const texte = await page.evaluate(() => document.body.innerText);
  const marqueursFr = ['Centralisez vos projets', 'La plateforme tout-en-un', 'Tarif tout inclus', 'Questions fréquentes'];
  const restes = marqueursFr.filter((m) => texte.includes(m));
  ok(restes.length === 0, `aucun texte français résiduel${restes.length ? ` — « ${restes.join(' », « ')} »` : ''}`);

  /* ── On ne quitte pas l'anglais au premier clic ────────────────────────── */
  const fuites = await page.evaluate(() => {
    const dehors = [];
    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
      /* Une page sans jumelle anglaise reste en français : c'est voulu, et
         mieux qu'un 404. Seules les DEUX pages traduites sont en cause. */
      if (/^(\/)?(index\.html|Tarifs\.html)(#|$)/.test(href)) {
        dehors.push(`« ${a.textContent.trim().slice(0, 30)} » → ${href}`);
      }
    }
    return dehors;
  });
  ok(fuites.length === 0, `aucun lien ne renvoie vers la page française jumelle${fuites.length ? `\n        ${fuites.join('\n        ')}` : ''}`);

  await page.close();
}

/* ── LA BASCULE CHANGE-T-ELLE D'ADRESSE ? ─────────────────────────────────
 * Elle retraduisait la page en place. Tant qu'elle le fait, les deux adresses
 * existent sans que personne n'y aille : le visiteur qui choisit l'anglais
 * reste sur l'adresse française, et c'est celle-là qu'il partage.
 * On l'éprouve dans les deux sens, depuis les deux pages traduites. */
console.log('\n===== la bascule FR/EN mène à l\'autre adresse =====');
for (const paire of PAIRES) {
  for (const [depuis, vers, versLangue] of [[paire.routeFr, paire.routeEn, 'en'], [paire.routeEn, paire.routeFr, 'fr']]) {
    const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8952' + depuis, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(3000);
    await page.evaluate((l) => document.querySelector(`#lang-toggle button[data-lang="${l}"]`).click(), versLangue);
    await page.waitForTimeout(2500);
    const arrivee = new URL(page.url()).pathname;
    ok(arrivee === vers, `${depuis.padEnd(11)} + « ${versLangue.toUpperCase()} »  →  ${arrivee}`);
    await page.close();
  }
}

/* ── Le prérendu servi aux robots est-il anglais ? ───────────────────────── */
console.log('\n===== le HTML servi, sans exécuter le script =====');
/* On mesure le TEXTE DU FICHIER SERVI, pas le bloc de prérendu.
   Ce contrôle ne regardait que l'instantané, ce qui n'a de sens que pour les
   deux pages rendues par React. Les trois pages éditoriales portent leur texte
   en clair dans le HTML — leur instantané ne contient que le pied de page,
   610 caractères — et le contrôle les accusait toutes les trois alors qu'elles
   sont précisément celles qui n'ont RIEN à prérendre.
   Ce qui compte n'est pas où le texte se trouve, c'est qu'un robot qui n'exécute
   aucun script le voie. On lit donc le fichier, scripts et styles retirés. */
for (const paire of PAIRES) {
  const html = fs.readFileSync(path.join(ROOT, paire.en), 'utf8');
  const corps = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  ok(corps.length > 2000, `${paire.en.padEnd(24)} ${corps.length} caractères lisibles sans exécuter le script`);
  const fr = ['Centralisez vos projets', 'La plateforme tout-en-un', 'Tous droits réservés',
              'Qui paie quoi', 'Ce qui est conservé', 'Mentions légales'].filter((m) => corps.includes(m));
  ok(fr.length === 0, `${paire.en.padEnd(24)} ce texte est en anglais${fr.length ? ` — « ${fr.join(' », « ')} »` : ''}`);
}

/* ── Les alternatives se répondent-elles ? ───────────────────────────────── */
console.log('\n===== réciprocité des alternatives =====');
{
  const lire = (f) => {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const out = {};
    for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)) out[m[1]] = m[2];
    return { html, alt: out, canonique: (html.match(/<link rel="canonical" href="([^"]+)">/) || [])[1] };
  };
  for (const paire of PAIRES) {
    const a = lire(paire.fr);
    const b = lire(paire.en);
    ok(a.alt.fr && a.alt.en && b.alt.fr && b.alt.en,
       `${paire.fr} et ${paire.en} déclarent chacune les deux langues`);
    ok(a.alt.fr === b.alt.fr && a.alt.en === b.alt.en,
       `elles déclarent les MÊMES adresses (réciprocité)`);
    ok(a.alt.fr === a.canonique && b.alt.en === b.canonique,
       `chacune se désigne elle-même : ${a.canonique} et ${b.canonique}`);
    ok(a.alt['x-default'] === a.alt.fr, `x-default renvoie au français`);
  }

  /* Et l'inverse, qui est la règle générale : une page a une jumelle et le
     déclare, ou n'en a pas et ne déclare rien. Ce contrôle affirmait que les
     trois pages éditoriales ne devaient RIEN déclarer — c'était juste tant
     qu'elles n'étaient pas traduites, et faux dès qu'elles l'ont été. Une règle
     écrite en dur sur une liste de fichiers se périme à la première page
     ajoutée ; celle-ci se déduit de PAIRES, qui est la source de vérité. */
  const traduites = new Set(PAIRES.flatMap((p) => [p.fr, p.en]));
  const toutes = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  const orphelines = toutes.filter((f) => !traduites.has(f) && fs.readFileSync(path.join(ROOT, f), 'utf8').includes('hreflang'));
  ok(orphelines.length === 0,
     `aucune page sans jumelle ne déclare d'alternative${orphelines.length ? ` — ${orphelines.join(', ')}` : ''}`);
  ok(traduites.size / 2 === PAIRES.length, `${PAIRES.length} paires de pages, ${toutes.length} fichiers HTML au total`);
}

/* ── Et le sitemap connaît-il les deux adresses ? ────────────────────────── */
{
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  for (const paire of PAIRES) {
    ok(sitemap.includes(`>https://www.alba-studio.co${paire.routeEn}<`), `sitemap.xml annonce ${paire.routeEn}`);
  }
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
