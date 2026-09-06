/**
 * Les images sont-elles servies à la taille où elles sont affichées ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Le parcours mobile pesait 1,8 Mo d'images. Pas parce qu'il y en avait
 * beaucoup — dix — mais parce que chacune partait dans sa taille d'origine.
 * `villa-interieur.jpg` faisait 1600 px de large et 382 Ko, pour un affichage
 * dans 350 px sur un téléphone.
 *
 * Rien ne le signalait. La page était juste, les photos nettes, et le coût
 * était payé par le visiteur — un architecte en 4G sur un chantier, c'est-à-dire
 * la cible. C'est une panne qui ne se voit qu'en pesant.
 *
 * Trois choses sont vérifiées ici, et les trois ont réellement échoué au moins
 * une fois pendant la mise en place :
 *
 *   · AUCUNE IMAGE N'EST TÉLÉCHARGÉE DEUX FOIS. Le <link rel=preload> du héros
 *     portait sa propre liste de largeurs, écrite à la main. Elle a divergé du
 *     manifeste au premier resserrement des paliers : le navigateur préchargeait
 *     le 1600 puis affichait le 1200. 94 Ko pour une image, sans un mot.
 *   · AUCUNE IMAGE N'EST SERVIE BEAUCOUP PLUS GRANDE QU'ELLE N'EST AFFICHÉE.
 *     C'est la panne d'origine.
 *   · CHAQUE DÉRIVÉE ANNONCÉE EXISTE. Un srcset qui pointe vers un fichier
 *     absent ne casse rien de visible : le navigateur retombe sur l'original,
 *     et on repaie exactement ce qu'on croyait avoir économisé.
 *
 * Les dérivées et le manifeste photos.js sont produits par outils/images.py.
 */
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';
import fs from 'node:fs';
import path from 'node:path';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8951);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/* Un téléphone à haute densité est le cas le plus exigeant : c'est lui qui
   réclame le plus de pixels tout en ayant le moins de débit. Le bureau sert de
   témoin — une règle qui ne tiendrait que sur mobile ne vaudrait rien. */
const VUES = [
  { nom: 'mobile 390 px, densité 3', w: 390, h: 844, mobile: true, densite: 3 },
  { nom: 'bureau 1280 px, densité 1', w: 1280, h: 900, mobile: false, densite: 1 },
];

/* Marge tolérée entre la largeur servie et la largeur affichée × densité.
   Elle n'est pas là pour être indulgente : les paliers étant discrets, le
   navigateur choisit forcément le premier palier AU-DESSUS de son besoin. Une
   marge de 1,6 laisse passer ce saut et rien de plus. */
const MARGE = 1.6;

for (const vue of VUES) {
  console.log(`\n===== ${vue.nom} =====`);
  const ctx = await navigateur.newContext({
    viewport: { width: vue.w, height: vue.h },
    isMobile: vue.mobile, hasTouch: vue.mobile, deviceScaleFactor: vue.densite,
  });
  const page = await ctx.newPage();

  const recues = [];
  page.on('response', (r) => {
    if (r.request().resourceType() !== 'image') return;
    recues.push(decodeURIComponent(new URL(r.url()).pathname.slice(1)));
  });

  await page.goto('http://localhost:8951/', { waitUntil: 'load', timeout: 40000 });
  /* On descend comme un visiteur : les images sont différées, un scrollTo
     direct n'en déclencherait qu'une partie. */
  for (let i = 0; i < 45; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(60); }
  await page.waitForTimeout(2500);

  /* ── Une image, un téléchargement ──────────────────────────────────────── */
  const familles = {};
  for (const chemin of recues) {
    const base = path.basename(chemin).replace(/-\d+\.(avif|webp)$/, '').replace(/\.[^.]+$/, '');
    familles[base] = familles[base] || new Set();
    familles[base].add(chemin);
  }
  const doubles = Object.entries(familles).filter(([, s]) => s.size > 1);
  ok(doubles.length === 0,
     `aucune image téléchargée deux fois${doubles.length ? ` — ${doubles.map(([b, s]) => `${b} : ${[...s].join(' + ')}`).join(' ; ')}` : ''}`);

  /* ── Le poids total, dit à voix haute ──────────────────────────────────── */
  const poids = [...new Set(recues)]
    .map((p) => { const f = path.join(ROOT, p); return fs.existsSync(f) ? fs.statSync(f).size : 0; })
    .reduce((a, b) => a + b, 0);
  console.log(`   ·  ${Math.round(poids / 1024)} Ko d'images sur le parcours complet`);
  /* Repère franc, pas une optimisation au gramme près : au-delà, quelque chose
     a cessé de fonctionner — une dérivée absente, un srcset perdu. */
  ok(poids < 700 * 1024, `le parcours reste sous 700 Ko d'images`);

  /* ── Chaque image affichée est-elle servie à sa taille ? ───────────────── */
  /* Le contrôle ne porte que sur les fichiers d'un certain poids. Ce n'est pas
     une indulgence : la règle vise le gaspillage d'octets, et sous 30 Ko il n'y
     en a pas à reprendre. Le logo en est le cas type — un seul fichier de 19 Ko
     sert huit emplacements, du bandeau d'intro à 52 px aux pastilles à 21 px.
     Le découper par taille ferait télécharger deux fichiers au lieu d'un, pour
     économiser quelques kilo-octets : ce serait plus lourd, pas plus léger.
     Le seuil laisserait passer une image de 25 Ko servie trop grande, et
     retiendrait la villa de 382 Ko qui a motivé tout ceci. */
  const POIDS_MINIMUM = 30 * 1024;
  const poidsDe = (chemin) => {
    const f = path.join(ROOT, decodeURIComponent(chemin));
    return fs.existsSync(f) ? fs.statSync(f).size : 0;
  };
  const trop = (await page.evaluate((marge) => {
    const dehors = [];
    for (const img of document.querySelectorAll('img')) {
      const r = img.getBoundingClientRect();
      const affichee = Math.round(r.width);
      if (affichee < 8) continue;                       // icônes, pixels de suivi
      const servie = img.currentSrc || img.src || '';
      const m = servie.match(/-(\d+)\.(avif|webp)$/);
      /* Sans dérivée, on juge sur la taille naturelle du fichier d'origine. */
      const largeurServie = m ? Number(m[1]) : img.naturalWidth;
      if (!largeurServie) continue;
      const besoin = affichee * (window.devicePixelRatio || 1);
      if (largeurServie > besoin * marge) {
        const chemin = servie.replace(location.origin + '/', '');
        dehors.push({ chemin, texte: `${chemin} : ${largeurServie} px servis pour ${affichee} px affichés (×${(window.devicePixelRatio || 1)})` });
      }
    }
    return dehors;
  }, MARGE)).filter((d) => poidsDe(d.chemin) >= POIDS_MINIMUM);
  ok(trop.length === 0,
     `aucune image de plus de 30 Ko servie plus de ${MARGE}× le besoin${trop.length ? `\n        ${trop.map((d) => d.texte).join('\n        ')}` : ''}`);

  await ctx.close();
}

/* ── Le manifeste et les fichiers disent-ils la même chose ? ─────────────── */
console.log('\n===== manifeste et dérivées =====');
{
  const manifeste = fs.readFileSync(path.join(ROOT, 'photos.js'), 'utf8');
  const declarees = [...manifeste.matchAll(/"([^"]+)":\s*\[([^\]]+)\]/g)];
  ok(declarees.length > 0, `photos.js déclare ${declarees.length} image(s)`);

  const manquantes = [];
  for (const [, src, larg] of declarees) {
    const base = path.basename(src).replace(/\.[^.]+$/, '');
    for (const l of larg.split(',').map((x) => x.trim())) {
      for (const ext of ['avif', 'webp']) {
        const f = path.join(ROOT, 'images', 'derivees', `${base}-${l}.${ext}`);
        if (!fs.existsSync(f)) manquantes.push(`${base}-${l}.${ext}`);
      }
    }
    if (!fs.existsSync(path.join(ROOT, src))) manquantes.push(`${src} (source)`);
  }
  ok(manquantes.length === 0, `toute dérivée déclarée existe${manquantes.length ? ` — ${manquantes.join(', ')}` : ''}`);

  /* Et l'inverse : une dérivée que plus personne ne déclare est un fichier mort
     dans le dépôt, que le prochain régénérateur ne recréera pas. */
  const attendues = new Set();
  for (const [, src, larg] of declarees) {
    const base = path.basename(src).replace(/\.[^.]+$/, '');
    for (const l of larg.split(',').map((x) => x.trim())) {
      attendues.add(`${base}-${l}.avif`); attendues.add(`${base}-${l}.webp`);
    }
  }
  const orphelines = fs.readdirSync(path.join(ROOT, 'images', 'derivees')).filter((f) => !attendues.has(f));
  ok(orphelines.length === 0, `aucune dérivée orpheline${orphelines.length ? ` — ${orphelines.join(', ')}` : ''}`);
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
