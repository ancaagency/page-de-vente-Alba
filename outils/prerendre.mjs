/**
 * Prérend les pages : le HTML servi contient la page, pas une coquille vide.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI
 *
 * Mesuré avant d'écrire une ligne : le HTML de `/` contenait **323 caractères**
 * de texte — le menu de navigation, et rien d'autre. Les 803 lignes de la page
 * de vente n'existaient qu'après exécution de React.
 *
 * Google sait rendre le JavaScript, mais il le fait en différé et une seule
 * anicroche donne une page vide indexée. Bing, DuckDuckGo, LinkedIn, Slack et
 * WhatsApp, eux, n'exécutent rien du tout : ils voyaient le menu.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COMMENT, ET POURQUOI C'EST SANS RISQUE ICI
 *
 * Chaque page a UN point de montage (`#app`, `#footer-root`) et utilise
 * `createRoot().render()`, qui vide le conteneur avant de rendre. Le prérendu
 * n'est donc jamais « hydraté » : React le remplace par un rendu identique. Pas
 * de risque d'incohérence d'hydratation, et le visiteur voit le contenu plus tôt.
 *
 * Deux retouches sont appliquées à l'instantané :
 *   · la classe `in` est posée sur tous les `.reveal`. Sans elle ils restent à
 *     `opacity: 0` — invisibles pour un visiteur sans JavaScript ;
 *   · le rideau d'introduction est neutralisé par un `<noscript>`, sinon il
 *     recouvre la page tant que le script ne l'a pas levé.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * UTILISATION
 *
 *   node outils/prerendre.mjs             met à jour les instantanés
 *   node outils/prerendre.mjs --verifier  n'écrit rien ; échoue s'ils ont dérivé
 *
 * À relancer après toute modification des .jsx ou de contenu.js — comme le
 * transpileur, et pour la même raison : sans cela le HTML servi montre l'ancienne
 * version aux robots, sans que rien ne le signale.
 */
import fs from 'node:fs';
import { injecter as injecterFaqJsonLd } from './faq-jsonld.mjs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { demarrer } from '../tests/serveur.mjs';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

// Playwright vit dans les dépendances de tests/ : c'est le seul node_modules du
// dépôt, et le site lui-même n'a toujours aucune dépendance. Node ne le trouve
// pas depuis outils/, d'où la résolution explicite — même procédé que le
// transpileur.
const require = createRequire(path.join(ROOT, 'tests', 'package.json'));
let chromium;
try {
  // playwright-core est un module CommonJS : selon la façon dont Node l'expose,
  // `chromium` arrive soit en export nommé, soit sous `default`.
  const mod = await import(pathToFileURL(require.resolve('playwright-core')).href);
  chromium = mod.chromium ?? mod.default?.chromium;
  if (!chromium) throw new Error('chromium introuvable dans playwright-core');
} catch {
  console.error(`\n⛔ playwright-core est introuvable.\n\n   Il vit dans les dépendances des tests :\n\n     cd tests && npm install\n`);
  process.exit(2);
}

import { PAGES } from './pages.mjs';

const DEBUT = '<!-- PRERENDU:DEBUT — produit par outils/prerendre.mjs, ne pas modifier -->';
const FIN = '<!-- PRERENDU:FIN -->';

/* La liste vit dans outils/pages.mjs, sans dépendance, pour que les contrôles
   qui ne pilotent aucun navigateur puissent l'importer eux aussi. */
export { PAGES };

/** Retire un instantané existant, pour que l'opération soit idempotente. */
export function sansPrerendu(html) {
  const i = html.indexOf(DEBUT);
  if (i === -1) return html;
  const j = html.indexOf(FIN, i);
  // Les sauts de ligne posés autour des marqueurs sont repris eux aussi : sans
  // cela ils s'accumulaient à chaque régénération, et deux exécutions de suite
  // ne donnaient jamais le même fichier.
  let debut = i;
  while (debut > 0 && html[debut - 1] === '\n') debut--;
  let fin = j + FIN.length;
  while (fin < html.length && html[fin] === '\n') fin++;
  return html.slice(0, debut) + '\n' + html.slice(fin);
}

async function instantanes() {
  const srv = await demarrer(8910);
  const navigateur = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  });
  const out = new Map();

  for (const { fichier, route, racine } of PAGES) {
    const page = await navigateur.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:8910' + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForFunction(
      (id) => (document.getElementById(id)?.childElementCount ?? 0) > 0,
      racine,
      { timeout: 30000 },
    );
    // Laisser les effets se poser : le configurateur tarifaire, le carrousel et
    // les listes sont montés dans des useEffect.
    await page.waitForTimeout(3500);

    const html = await page.evaluate((id) => {
      const el = document.getElementById(id);

      // Les blocs révélés au défilement restent à opacity: 0 tant qu'ils n'ont
      // pas la classe `in`. Dans un instantané destiné à être lu sans
      // JavaScript, ils doivent être visibles.
      el.querySelectorAll('.reveal').forEach((r) => r.classList.add('in'));

      // GSAP écrit ses animations dans l'attribut `style`. Un instantané pris
      // pendant qu'elles tournent fige une frame ARBITRAIRE : le fichier changeait
      // à chaque exécution (opacity 1.0284 puis 1.0715…), donc impossible à
      // vérifier, et un visiteur sans JavaScript aurait vu les éléments décalés.
      // On retire ces propriétés : les feuilles de style rétablissent l'état de
      // repos. Les propriétés personnalisées (--reveal-delay, --mq-dur) et les
      // styles écrits dans le JSX sont conservés.
      const ANIMEES = ['transform', 'translate', 'rotate', 'scale', 'opacity',
                       'visibility', 'transition', 'will-change', 'perspective'];
      el.querySelectorAll('[style]').forEach((n) => {
        ANIMEES.forEach((prop) => n.style.removeProperty(prop));
        if (!n.getAttribute('style')) n.removeAttribute('style');
      });

      // Les notifications flottantes apparaissent sur minuterie : leur nombre
      // varie d'un instantané à l'autre. Ce sont des éléments d'ambiance, pas du
      // contenu — elles n'ont rien à faire dans un HTML destiné aux robots.
      el.querySelectorAll('.notif').forEach((n) => n.remove());

      return el.innerHTML;
    }, racine);

    out.set(fichier, html);
    await page.close();
  }

  await navigateur.close();
  srv.close();
  return out;
}

/** Insère l'instantané dans le conteneur, entre les marqueurs. */
export function injecter(html, racine, contenu) {
  const propre = sansPrerendu(html);
  const ouvrante = new RegExp(`(<(?:main|div)[^>]*id="${racine}"[^>]*>)`);
  const m = propre.match(ouvrante);
  if (!m) throw new Error(`conteneur #${racine} introuvable`);
  const i = m.index + m[0].length;
  return propre.slice(0, i) + '\n' + DEBUT + '\n' + contenu + '\n' + FIN + '\n' + propre.slice(i);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = process.argv.includes('--verifier');
  const rendus = await instantanes();
  let ecarts = 0;

  for (const { fichier, racine } of PAGES) {
    const chemin = path.join(ROOT, fichier);
    const actuel = fs.readFileSync(chemin, 'utf8');
    const attendu = injecter(actuel, racine, rendus.get(fichier));

    if (verifier) {
      const bon = actuel === attendu;
      console.log(`   ${bon ? '✅' : '❌'} ${fichier.padEnd(24)} ${bon ? 'à jour' : 'PÉRIMÉ'}`);
      if (!bon) ecarts++;
    } else {
      // Les donnees structurees de la FAQ sont derivees de contenu.js a chaque
      // passage : sans ca, elles restent figees pendant que la page evolue.
      fs.writeFileSync(chemin, injecterFaqJsonLd(attendu));
      const texte = rendus.get(fichier).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`   ${fichier.padEnd(24)} ${(rendus.get(fichier).length / 1024).toFixed(0)} Ko — ${texte.length} caractères de texte`);
    }
  }

  if (verifier) {
    console.log(ecarts
      ? `\n❌ ${ecarts} instantané(s) à régénérer : node outils/prerendre.mjs`
      : `\n✅ les ${PAGES.length} instantanés correspondent au rendu`);
    process.exit(ecarts ? 1 : 0);
  }
  console.log(`\n${PAGES.length} pages prérendues.`);
}
