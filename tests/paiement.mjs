/**
 * Le bouton « S'abonner » ouvre-t-il vraiment le tunnel de paiement ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Ce bouton était un lien vers l'inscription. Il appelle désormais un point
 * d'entrée public qui ouvre Stripe Checkout, et il transporte le choix du
 * visiteur : palier de stockage, périodicité, nombre de sièges.
 *
 * Trois façons de casser ça sans que rien ne le signale :
 *
 *   · envoyer un MONTANT au lieu d'un palier — le serveur ne le lirait pas,
 *     mais la page se mettrait à croire qu'elle fixe les prix ;
 *   · envoyer le mauvais palier parce que la lecture du bouton de stockage a
 *     dérivé — le visiteur paierait autre chose que ce qu'il a coché ;
 *   · avaler une erreur du serveur en silence — le visiteur cliquerait dans le
 *     vide sans jamais savoir pourquoi.
 *
 * Ce test intercepte l'appel réseau, vérifie ce qui part, puis rejoue chaque
 * code d'erreur du contrat pour vérifier ce qui s'affiche.
 */
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';

const POINT = '**/functions/v1/creer-paiement-public';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8942);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/** Ouvre la page tarifs, prête à cliquer. */
async function ouvrir(reponse) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  const envois = [];
  await page.route(POINT, async (route) => {
    envois.push(JSON.parse(route.request().postData() || '{}'));
    await route.fulfill({ status: reponse.status, contentType: 'application/json',
                          body: JSON.stringify(reponse.corps) });
  });
  // La redirection vers Stripe ne doit pas emmener le test ailleurs.
  await page.route('https://checkout.stripe.com/**', (r) =>
    r.fulfill({ status: 200, contentType: 'text/html', body: '<p>tunnel simulé</p>' }));
  await page.goto('http://localhost:8942/tarifs', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(4000);
  return { page, envois };
}

console.log('\n===== ce qui part quand on clique =====');
{
  const { page, envois } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } });

  // Choix délibérément différent des valeurs par défaut : 300 Go, annuel,
  // 3 sièges. Un test qui ne change rien ne prouve rien.
  await page.click('.p-tier:nth-child(3)');
  await page.click('.pricing-toggle button:nth-child(2)');
  const plus = await page.$$('.p-seat-btn');
  await plus[1].click(); await plus[1].click();
  await page.waitForTimeout(400);

  await page.click('.pricing-cta');
  await page.waitForTimeout(1200);

  ok(envois.length === 1, `un seul appel émis (${envois.length})`);
  const corps = envois[0] || {};
  ok(corps.storage === 300, `le palier suit le bouton coché (storage = ${corps.storage})`);
  ok(corps.billing === 'yearly', `la périodicité suit la bascule (billing = ${corps.billing})`);
  ok(corps.seats === 3, `les sièges suivent le compteur (seats = ${corps.seats})`);

  // Le point crucial : aucun montant ne doit sortir d'ici.
  const interdits = ['price', 'amount', 'total', 'montant', 'prix', 'price_id'];
  const fautifs = Object.keys(corps).filter((k) => interdits.includes(k));
  ok(fautifs.length === 0,
     `aucun montant transmis${fautifs.length ? ` — trouvé : ${fautifs.join(', ')}` : ' (le serveur seul fixe les prix)'}`);

  ok(await page.evaluate(() => location.href.includes('checkout.stripe.com')),
     'le visiteur est bien redirigé vers Stripe');
  await page.close();
}

console.log('\n===== le double-clic ne consomme pas deux tentatives =====');
{
  const { page, envois } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } });
  await page.evaluate(() => {
    const b = document.querySelector('.pricing-cta');
    b.click(); b.click(); b.click();
  });
  await page.waitForTimeout(1200);
  // Le plafond est de cinq ouvertures par heure : trois clics nerveux en
  // brûleraient trois si rien ne les retenait.
  ok(envois.length === 1, `trois clics, un seul appel (${envois.length})`);
  await page.close();
}

console.log('\n===== chaque erreur du contrat dit quelque chose =====');
const CAS = [
  [429, 'trop_de_tentatives', /trop de tentatives/i],
  [503, 'tarif_indisponible', /momentanément indisponible/i],
  [503, 'cgu_non_configurees', /momentanément indisponible/i],
  [400, 'palier_inconnu', /r[ée]essayez/i],
];
for (const [status, code, attendu] of CAS) {
  const { page } = await ouvrir({ status, corps: { error: code } });
  await page.click('.pricing-cta');
  await page.waitForTimeout(900);
  const texte = await page.$eval('.pricing-erreur', (e) => e.textContent).catch(() => null);
  ok(texte !== null && attendu.test(texte),
     `${code} → « ${texte ? texte.slice(0, 52) : 'AUCUN MESSAGE'} »`);
  // Le bouton doit rester cliquable : une erreur passagère ne condamne pas la page.
  const rejouable = await page.evaluate(() => {
    const b = document.querySelector('.pricing-cta');
    return b && getComputedStyle(b).pointerEvents !== 'none';
  });
  ok(rejouable, `   et le bouton reste cliquable après ${code}`);
  await page.close();
}

console.log('\n===== la seconde porte reste ouverte =====');
{
  const { page } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } });
  const porte = await page.$eval('.pricing-porte-2', (e) => e.getAttribute('href')).catch(() => null);
  ok(porte !== null && porte.includes('/inscription'),
     `un lien vers l'inscription subsiste (${porte || 'ABSENT'})`);
  // Sans JavaScript, le bouton principal doit rester un lien utilisable.
  const repli = await page.$eval('.pricing-cta', (e) => e.getAttribute('href')).catch(() => null);
  ok(repli !== null && repli.includes('/inscription'),
     `le bouton garde un href de repli pour les visiteurs sans JavaScript`);
  await page.close();
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
