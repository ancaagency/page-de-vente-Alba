/**
 * Les icônes du site sont-elles servies, décodables, et conformes ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Google affichait un globe gris à la place du logo dans ses résultats. Le HTML
 * déclarait pourtant bien une icône — c'est ce qui rendait la panne invisible :
 * la balise était là, le fichier existait, il s'affichait dans l'onglet du
 * navigateur. Deux exigences n'étaient simplement pas respectées :
 *
 *   · Google veut un carré MULTIPLE DE 48 px. Le fichier faisait 256×256 ;
 *   · /favicon.ico n'existait pas, et c'est le second recours de Google — le
 *     seul endroit que regardent beaucoup d'agrégateurs et de messageries.
 *
 * Un contrôle qui se contenterait de vérifier la présence des fichiers aurait
 * été vert AVANT comme APRÈS. Celui-ci vérifie donc les dimensions réelles,
 * telles que le navigateur les décode, et les sert par HTTP pour qu'un 404
 * apparaisse comme un 404.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { demarrer, ROOT } from './serveur.mjs';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8947);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await navigateur.newPage();
await page.goto('http://localhost:8947/', { waitUntil: 'load', timeout: 40000 });

/** Charge une image PAR LE RÉSEAU et rend ses dimensions décodées + son alpha.
 *
 *  Volontairement par <img>, et non par fetch() : `connect-src` ne nomme que
 *  Supabase, donc un fetch vers notre propre domaine est refusé par la CSP.
 *  Ce n'est pas une gêne, c'est la preuve que la directive fait son travail —
 *  et une balise image est de toute façon le chemin qu'emprunte réellement un
 *  navigateur pour une icône. */
const mesurer = (adresse) => page.evaluate((url) => new Promise((resoudre) => {
  const img = new Image();
  img.onerror = () => resoudre({ erreur: 'introuvable ou indécodable' });
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // Les quatre coins suffisent à dire si le fond est plein ou percé.
    const coins = [[0, 0], [c.width - 1, 0], [0, c.height - 1], [c.width - 1, c.height - 1]];
    const alphas = coins.map(([x, y]) => ctx.getImageData(x, y, 1, 1).data[3]);
    resoudre({ l: img.naturalWidth, h: img.naturalHeight, opaque: alphas.every((a) => a === 255) });
  };
  img.src = url;
}), adresse);

/** Taille sur disque, pour l'affichage seulement. */
const poids = (rel) => {
  try { return (fs.statSync(path.join(ROOT, rel)).size / 1024).toFixed(1) + ' Ko'; }
  catch (e) { return 'absent'; }
};

console.log('\n===== les icônes que Google accepte =====');
/* La règle qui manquait, et la seule qui explique le globe gris : Google
   n'accepte qu'un carré multiple de 48 px. */
for (const t of [48, 96, 192]) {
  const m = await mesurer(`http://localhost:8947/images/favicon-${t}.png`);
  if (m.erreur) { ok(false, `favicon-${t}.png — ${m.erreur}`); continue; }
  const carre = m.l === m.h;
  const bonneTaille = m.l === t;
  const multiple = m.l % 48 === 0;
  ok(carre && bonneTaille && multiple,
     `favicon-${t}.png → ${m.l}×${m.h}${carre && bonneTaille && multiple ? ` (multiple de 48 ✓, ${poids(`images/favicon-${t}.png`)})` : ' — CARRÉ MULTIPLE DE 48 ATTENDU'}`);
}

console.log('\n===== /favicon.ico, le second recours de Google =====');
{
  const m = await mesurer('http://localhost:8947/favicon.ico');
  ok(!m.erreur, `servi à la racine${m.erreur ? ` — ${m.erreur}` : ` (${poids('favicon.ico')})`}`);

  /* Un .ico est un conteneur : on lit son sommaire pour vérifier qu'il porte
     bien plusieurs tailles. Un fichier d'une seule taille fonctionne, mais
     laisse le navigateur rééchantillonner — et un « A » fin s'y détruit.

     La lecture est protégée : sans ça, un favicon.ico absent faisait LEVER
     readFileSync et le test s'arrêtait là, sans rapporter les contrôles
     suivants. Un contrôle doit diagnostiquer, pas s'écrouler au premier
     manque — c'est précisément quand tout va mal qu'on a besoin de tout voir. */
  const chemin = path.join(ROOT, 'favicon.ico');
  if (!fs.existsSync(chemin)) {
    ok(false, 'favicon.ico est absent du dépôt — rien à analyser');
  } else {
    const ico = fs.readFileSync(chemin);
    const type = ico.readUInt16LE(2);
    const nb = ico.readUInt16LE(4);
    const tailles = [];
    for (let i = 0; i < nb; i++) {
      const o = 6 + i * 16;
      tailles.push(`${ico[o] || 256}×${ico[o + 1] || 256}`);
    }
    ok(type === 1, `c'est bien une icône, pas un curseur (type ${type})`);
    ok(nb >= 3, `${nb} tailles dans le fichier : ${tailles.join(', ')}`);
  }
}

console.log('\n===== l\'icône iOS ne doit pas être percée =====');
{
  const m = await mesurer('http://localhost:8947/images/apple-touch-icon.png');
  if (m.erreur) { ok(false, `apple-touch-icon.png — ${m.erreur}`); }
  else {
    ok(m.l === 180 && m.h === 180, `180×180 (obtenu ${m.l}×${m.h})`);
    /* iOS ne gère pas la transparence sur l'écran d'accueil : il remplit le
       vide en NOIR. Une icône transparente y devient une tuile noire. */
    ok(m.opaque, `fond plein aux quatre coins${m.opaque ? '' : ' — iOS le remplirait en noir'}`);
  }
}

console.log('\n===== les pages déclarent ces fichiers-là =====');
const ATTENDUS = [
  '/favicon.ico',
  '/images/favicon-48.png',
  '/images/favicon-96.png',
  '/images/favicon-192.png',
  '/images/apple-touch-icon.png',
];
for (const f of ['index.html', 'Tarifs.html', 'mentions-legales.html']) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const declares = [...html.matchAll(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/g)].map((m) => m[0]);
  const href = (b) => (b.match(/href="([^"]+)"/) || [])[1];
  const adresses = declares.map(href);

  const manquants = ATTENDUS.filter((a) => !adresses.includes(a));
  ok(manquants.length === 0,
     `${f.padEnd(22)} ${declares.length} balises${manquants.length ? ` — MANQUE ${manquants.join(', ')}` : ''}`);

  /* Une adresse d'icône doit être ABSOLUE. « images/logo.png » se résout
     relativement à la page : la même balise ne désigne alors pas le même
     fichier sur / et sur /mentions-legales. */
  const relatives = adresses.filter((a) => a && !a.startsWith('/'));
  ok(relatives.length === 0,
     `${f.padEnd(22)} chemins absolus${relatives.length ? ` — RELATIF : ${relatives.join(', ')}` : ''}`);

  // L'ancien fichier ne doit plus être déclaré comme icône : 256×256, refusé.
  ok(!declares.some((d) => d.includes('logo-alba.png')),
     `${f.padEnd(22)} n'annonce plus logo-alba.png en 256×256`);
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
