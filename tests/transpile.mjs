/**
 * Les .js publiés correspondent-ils encore à leurs .jsx ?
 *
 * C'est le prix de la transpilation préalable, et il faut le payer explicitement :
 * il y a désormais deux versions de chaque composant dans le dépôt, la source et
 * le produit. Si quelqu'un modifie un .jsx sans relancer le transpileur, le site
 * continue de servir l'ancienne version — sans erreur, sans page blanche, sans
 * rien qui le signale. C'est exactement le genre de panne silencieuse qu'on ne
 * découvre qu'en se demandant pourquoi une correction « ne prend pas ».
 *
 * Ce test rejoue la transpilation en mémoire et compare au fichier versionné.
 *
 * Il vérifie aussi qu'aucune page ne charge encore Babel ni un .jsx, et qu'il ne
 * reste aucun script en ligne : ce sont les trois conditions qui permettent à la
 * CSP de se passer de 'unsafe-eval' et de 'unsafe-inline'. Les rompre ferait
 * refuser la page entière par le navigateur, pas seulement le script fautif.
 */
import fs from 'node:fs';
import path from 'node:path';
import { listerSources, attendu } from '../outils/transpiler.mjs';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const PAGES = ['index.html', 'Tarifs.html', 'mentions-legales.html'];

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

console.log('\n===== les .js correspondent-ils à leurs .jsx ? =====');

const sources = listerSources();
ok(sources.length > 0, `${sources.length} sources .jsx trouvées`);

const perimes = [];
for (const jsx of sources) {
  const js = jsx.replace(/\.jsx$/, '.js');
  const chemin = path.join(ROOT, js);
  const actuel = fs.existsSync(chemin) ? fs.readFileSync(chemin, 'utf8') : null;
  if (actuel !== attendu(jsx)) perimes.push(actuel === null ? `${js} (manquant)` : js);
}
ok(perimes.length === 0,
   perimes.length
     ? `à régénérer avec « node outils/transpiler.mjs » : ${perimes.join(', ')}`
     : `les ${sources.length} fichiers produits sont à jour`);

console.log('\n===== plus rien qui exige unsafe-eval ou unsafe-inline =====');

for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');

  ok(!/text\/babel/.test(html), `${page} : aucun script type="text/babel"`);
  ok(!/@babel\/standalone/.test(html), `${page} : Babel n'est plus chargé`);
  ok(!/<script[^>]*src="[^"]*\.jsx"/.test(html), `${page} : aucun .jsx chargé`);

  // Un seul script en ligne suffirait à rendre 'unsafe-inline' nécessaire.
  const enLigne = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((m) => !/\ssrc=/.test(m[1]) && m[2].trim() !== '');
  ok(enLigne.length === 0,
     `${page} : aucun script en ligne${enLigne.length ? ` (${enLigne.length} trouvé(s))` : ''}`);

  // Tout script tiers doit porter une empreinte : sans elle, une bibliothèque
  // substituée chez le CDN s'exécuterait sans que rien ne l'arrête.
  const tiers = [...html.matchAll(/<script[^>]*src="(https?:\/\/[^"]+)"[^>]*>/g)];
  const sansEmpreinte = tiers.filter((m) => !/integrity=/.test(m[0])).map((m) => m[1]);
  ok(sansEmpreinte.length === 0,
     `${page} : les ${tiers.length} scripts tiers portent une empreinte${
       sansEmpreinte.length ? ` — sans : ${sansEmpreinte.join(', ')}` : ''}`);
}

console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
