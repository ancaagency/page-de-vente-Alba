/* config.js est-il vraiment le SEUL point à changer ?

   Ce test servait à préparer la bascule vers app.alba-studio.co. Elle a eu lieu :
   config.js porte désormais cette origine. Continuer à substituer cette
   valeur-là ne mordrait plus sur rien, et le test passerait sans rien vérifier.

   Il sert donc une origine FICTIVE et contrôle que tous les liens vers
   l'application la suivent, sans toucher aux adresses e-mail. C'est la propriété
   qui compte : un jour où il faudra changer de domaine, une seule ligne suffira.
   Un premier passage avait justement révélé que les liens des mentions légales
   ne suivaient pas. */
import { chromium } from 'playwright-core';
import { ROUTES } from '../outils/pages.mjs';
import { demarrer } from './serveur.mjs';
const NOUVELLE = 'https://essai-de-bascule.example';

/* Ce contrôle avait SON PROPRE serveur HTTP, recopié de serveur.mjs.
   Il a divergé au premier changement, comme toute copie : serveur.mjs a appris
   à servir les adresses propres — /en pour en.html, comme le fait Cloudflare —
   et la copie ne l'a pas appris. Les deux pages anglaises tombaient donc en 404
   ici, sur un site où elles fonctionnent.

   C'est exactement la duplication que outils/pages.mjs avait supprimée pour la
   liste des pages, et elle était revenue par la porte du serveur. Le paramètre
   `remplacements` de demarrer() existait déjà pour ce besoin : réécrire un
   fichier servi sans toucher au dépôt. On l'utilise, et la copie disparaît. */
const srv = await demarrer(8788, {
  // Le seul changement du jour J : la valeur dans config.js.
  '/config.js': (corps) => corps.replace('https://app.alba-studio.co', NOUVELLE),
});
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const page = await b.newPage();
let ko = 0;
for (const route of ROUTES) {
  await page.goto('http://localhost:8788'+route,{waitUntil:'load',timeout:30000});
  await page.waitForTimeout(400);
  const liens = await page.$$eval('a[href*="alba-studio.co"]', as => as.map(a=>a.getAttribute('href')));
  const restants = liens.filter(h => h && !h.startsWith('mailto:') && !h.startsWith('https://app.alba-studio.co'));
  console.log(`\n===== ${route} =====`);
  console.log(`liens vers l'app trouvés : ${liens.length}`);
  console.log(restants.length ? `❌ NON BASCULÉS (${restants.length}) : ${restants.join(' , ')}`
                              : `✅ tous bascules vers ${NOUVELLE}`);
  if (restants.length) ko++;
}
await b.close(); srv.close();
process.exit(ko ? 1 : 0);
