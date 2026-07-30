/**
 * Transpile les .jsx en .js, une fois pour toutes, avant publication.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI
 *
 * La page transpilait son JSX DANS LE NAVIGATEUR, avec Babel standalone. Cela
 * imposait `'unsafe-eval'` et `'unsafe-inline'` dans la politique de sécurité du
 * contenu — de l'évaluation de code à la volée, littéralement. Une CSP qui
 * autorise l'eval ne protège de rien contre une injection de script.
 *
 * Transpiler avant publication supprime les deux : `script-src` n'a plus besoin
 * ni de l'un ni de l'autre. Accessoirement, les visiteurs cessent de télécharger
 * 2,8 Mo de Babel et d'attendre qu'il compile quarante fichiers.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * LES PRÉRÉGLAGES NE SONT PAS UN CHOIX, C'EST UNE MESURE
 *
 * `['env', 'react']` reproduit ce que Babel standalone faisait réellement dans
 * le navigateur — vérifié en inspectant le code exécuté sur la page en
 * production : `window.Founder` y était compilé en ES5 (`function`, `var`), et
 * pas seulement débarrassé de son JSX.
 *
 * Se contenter de `react` aurait produit du code plus court et plus moderne,
 * mais aurait relevé sans le dire le niveau de navigateur exigé : la page
 * emploie `?.` et `??`, qui excluraient tout Safari antérieur à 13.4. On ne
 * change pas la compatibilité d'une page validée au détour d'un correctif de
 * sécurité.
 *
 * `modules: false` : ces fichiers sont des scripts classiques qui posent des
 * globaux (`window.Founder = …`). Les envelopper en modules casserait tout.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * UTILISATION
 *
 *   node outils/transpiler.mjs            met à jour les .js
 *   node outils/transpiler.mjs --verifier n'écrit rien ; sort en erreur si un
 *                                         .js ne correspond plus à son .jsx
 *
 * Le second mode est utilisé par tests/transpile.mjs : c'est lui qui empêche
 * qu'un .jsx modifié soit publié sans son .js régénéré — auquel cas la page
 * servirait silencieusement l'ancienne version.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

// Babel vient des dépendances de tests/ : c'est le seul endroit du dépôt qui a
// un node_modules, et le site lui-même n'a toujours aucune dépendance.
const require = createRequire(path.join(ROOT, 'tests', 'package.json'));
let Babel;
try {
  Babel = require('@babel/standalone');
} catch {
  console.error(`\n⛔ @babel/standalone est introuvable.\n\n   Il vit dans les dépendances des tests :\n\n     cd tests && npm install\n`);
  process.exit(2);
}

export const PRESETS = ['env', 'react'];

/** Le .jsx tel qu'il doit être compilé. Une seule définition, partagée. */
export function transpiler(source, nomFichier) {
  const { code } = Babel.transform(source, {
    presets: PRESETS,
    sourceType: 'script',
    // Empêche preset-env d'envelopper le fichier en module CommonJS.
    plugins: [],
    filename: nomFichier,
    compact: false,
    comments: true,
    babelrc: false,
    configFile: false,
    sourceMaps: false,
  });
  return code;
}

const ENTETE = (nomJsx) => `/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : ${nomJsx}
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez ${nomJsx}, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
`;

export function listerSources() {
  return fs.readdirSync(ROOT)
    .filter((f) => f.endsWith('.jsx'))
    .sort();
}

export function attendu(nomJsx) {
  const source = fs.readFileSync(path.join(ROOT, nomJsx), 'utf8');
  return ENTETE(nomJsx) + transpiler(source, nomJsx) + '\n';
}

/* ─────────────────────────────── exécution ─────────────────────────────── */

if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = process.argv.includes('--verifier');
  const sources = listerSources();
  let ecarts = 0;

  for (const jsx of sources) {
    const js = jsx.replace(/\.jsx$/, '.js');
    const cible = path.join(ROOT, js);
    const contenu = attendu(jsx);

    if (verifier) {
      const actuel = fs.existsSync(cible) ? fs.readFileSync(cible, 'utf8') : null;
      const bon = actuel === contenu;
      console.log(`   ${bon ? '✅' : '❌'} ${js.padEnd(24)} ${bon ? 'à jour' : actuel === null ? 'MANQUANT' : 'PÉRIMÉ'}`);
      if (!bon) ecarts++;
    } else {
      fs.writeFileSync(cible, contenu);
      console.log(`   ${js.padEnd(24)} ${(contenu.length / 1024).toFixed(0)} Ko`);
    }
  }

  if (verifier) {
    console.log(ecarts
      ? `\n❌ ${ecarts} fichier(s) à régénérer : node outils/transpiler.mjs`
      : `\n✅ les ${sources.length} fichiers produits correspondent à leur source`);
    process.exit(ecarts ? 1 : 0);
  }
  console.log(`\n${sources.length} fichiers transpilés.`);
}
