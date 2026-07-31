/**
 * La page tient-elle dans un écran de téléphone ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * La page défilait horizontalement sur iPhone : le contenu partait à droite et
 * se coupait à gauche. Un seul élément trop large suffit, et rien ne le signale
 * — sur un écran large personne ne le voit jamais.
 *
 * Ce test échoue au moindre pixel de débordement, à trois largeurs de téléphone
 * courantes, et après avoir déroulé toute la page : certains débordements
 * n'apparaissent qu'une fois une animation déclenchée.
 *
 * Il vérifie aussi que deux blocs restent dans leur section — ils en sortaient :
 *   · la maquette tablette recouvrait le paragraphe au-dessus et mordait sur la
 *     section suivante (rapport d'image 1,58 dans une boîte trop basse) ;
 *   · les cinq onglets du carrousel revenaient à la ligne en grille déchiquetée.
 *
 * Et que la section « La plateforme » sert bien les captures de l'application
 * mobile. Elle affichait les maquettes d'écran d'ordinateur : barre latérale de
 * 168 px fixes, il ne restait qu'environ 180 px pour le contenu, tout était
 * tronqué. Rien ne débordait pour autant — le contrôle ci-dessus ne l'aurait
 * jamais vu — d'où un contrôle dédié.
 */
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';

const LARGEURS = [
  [360, 'Android courant'],
  [390, 'iPhone 14 / 15'],
  [430, 'iPhone Pro Max'],
];

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8940);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [largeur, nom] of LARGEURS) {
  console.log(`\n===== ${nom} — ${largeur} px =====`);
  const page = await navigateur.newPage({
    viewport: { width: largeur, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
  });
  await page.goto('http://localhost:8940/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(6000);

  // Le pire débordement peut n'apparaître qu'à un certain point du défilement :
  // on parcourt toute la page en mesurant à chaque palier.
  const mesure = await page.evaluate(async () => {
    const W = document.documentElement.clientWidth;
    let max = W, ou = 0;
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
      const sw = document.documentElement.scrollWidth;
      if (sw > max) { max = sw; ou = y; }
    }
    window.scrollTo(0, 0);
    return { W, max, ou };
  });
  ok(mesure.max <= mesure.W,
     `aucun défilement horizontal${mesure.max > mesure.W ? ` — déborde de ${mesure.max - mesure.W} px à y=${mesure.ou}` : ''}`);

  // La maquette tablette doit rester dans sa section.
  const maquette = await page.evaluate(() => {
    const d = document.querySelector('.dev-duo');
    if (!d) return null;
    const section = d.closest('section');
    const img = d.querySelector('.tablet-shot');
    if (!section || !img) return null;
    const s = section.getBoundingClientRect(), i = img.getBoundingClientRect();
    return { debordeHaut: Math.round(s.top - i.top), debordeBas: Math.round(i.bottom - s.bottom) };
  });
  if (maquette) {
    // Une tolérance de 2 px absorbe les arrondis de sous-pixel.
    ok(maquette.debordeHaut <= 2, `la maquette ne recouvre pas ce qui la précède (${maquette.debordeHaut} px)`);
    ok(maquette.debordeBas <= 2, `la maquette ne mord pas sur la section suivante (${maquette.debordeBas} px)`);
  }

  // Les onglets du carrousel : une seule ligne, qui défile.
  const onglets = await page.evaluate(() => {
    const t = document.querySelector('.fc-tabs');
    if (!t) return null;
    const boutons = [...t.querySelectorAll('.fc-tab')];
    if (!boutons.length) return null;
    const lignes = new Set(boutons.map((b) => Math.round(b.getBoundingClientRect().top)));
    return { lignes: lignes.size, defile: t.scrollWidth > t.clientWidth + 1, nb: boutons.length };
  });
  if (onglets) {
    ok(onglets.lignes === 1,
       `les ${onglets.nb} onglets tiennent sur une seule ligne (${onglets.lignes})`);
    ok(onglets.defile, 'et la bande défile horizontalement');
  }

  // « La plateforme » : captures de l'app mobile, pas maquettes d'ordinateur.
  const plateforme = await page.evaluate(async () => {
    const sec = document.querySelector('#features');
    if (!sec) return null;
    sec.scrollIntoView();
    const onglets = [...sec.querySelectorAll('.f-tab')];
    const vues = [];
    // Les images sont paresseuses et les volets inactifs sont en display:none :
    // elles ne sont demandées qu'une fois leur onglet ouvert. On les ouvre tous.
    for (const onglet of onglets) {
      onglet.click();
      await new Promise((r) => setTimeout(r, 700));
      const img = sec.querySelector('.f-stage-pane.is-active .f-shot img');
      const large = document.documentElement.clientWidth;
      vues.push(img
        ? { chargee: img.complete && img.naturalWidth > 0, src: img.src.split('/').pop(),
            alt: (img.alt || '').length, deborde: Math.round(img.getBoundingClientRect().width) > large }
        : null);
    }
    return { vues, maquettes: sec.querySelectorAll('.mockup').length };
  });
  if (plateforme) {
    const { vues, maquettes } = plateforme;
    ok(vues.length === 3 && vues.every(Boolean),
       `les 3 onglets montrent une capture mobile (${vues.filter(Boolean).length}/3)`);
    ok(vues.every((v) => v && v.chargee),
       `les 3 captures se chargent${vues.some((v) => v && !v.chargee) ? ` — en échec : ${vues.filter((v) => v && !v.chargee).map((v) => v.src).join(', ')}` : ''}`);
    ok(vues.every((v) => v && !v.deborde), 'aucune capture plus large que l\'écran');
    ok(vues.every((v) => v && v.alt > 20), 'chaque capture porte une description alternative');
    ok(maquettes === 0, `aucune maquette d'ordinateur ne subsiste (${maquettes})`);
  }

  await page.close();
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
