/**
 * Le bouton « S'abonner » ouvre-t-il vraiment le tunnel de paiement ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Ce bouton était un lien vers l'inscription. Il appelle désormais un point
 * d'entrée public qui ouvre Stripe Checkout, et il transporte le choix du
 * visiteur : l'offre, et le nombre de personnes.
 *
 * Trois façons de casser ça sans que rien ne le signale :
 *
 *   · envoyer un MONTANT au lieu d'un palier — le serveur ne le lirait pas,
 *     mais la page se mettrait à croire qu'elle fixe les prix ;
 *   · envoyer le mauvais palier parce que la lecture de l'offre a dérivé — le
 *     visiteur paierait autre chose que ce qu'il a choisi ;
 *   · avaler une erreur du serveur en silence — le visiteur cliquerait dans le
 *     vide sans jamais savoir pourquoi.
 *
 * Ce test intercepte l'appel réseau, vérifie ce qui part, puis rejoue chaque
 * code d'erreur du contrat pour vérifier ce qui s'affiche.
 */
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';

const POINT = '**/functions/v1/creer-paiement-public';

/* `.tarif-cta` désigne les TROIS boutons, et le premier est celui de l'offre
   gratuite : il ne déclenche aucun paiement. Un clic dessus ne produisait donc
   ni appel, ni message d'erreur, et dix-huit contrôles se sont mis à échouer
   pour la meilleure des raisons — le test cliquait au mauvais endroit.
   On vise explicitement une offre payante. */
const CTA_PAYANT = '.tarif-carte:nth-child(2) .tarif-cta';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8942);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/** Ouvre la page tarifs, prête à cliquer. */
async function ouvrir(reponse, direct = true, route = '/tarifs') {
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
  // Le parcours d'inscription ne doit pas sortir du test : sans réseau, la
  // navigation échouerait et on ne saurait plus dire OÙ le clic a mené.
  await page.route('https://app.alba-studio.co/**', (r) =>
    r.fulfill({ status: 200, contentType: 'text/html', body: '<p>inscription simulée</p>' }));
  await page.goto('http://localhost:8942' + route, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(4000);
  /* L'interrupteur se pose APRÈS le chargement, jamais avant : config.js
     l'écrit lui-même, et il écraserait toute valeur posée en amont. Cet ordre
     n'est pas un détail de test — c'est la preuve que config.js fait autorité,
     et donc qu'un oubli d'interrupteur ne peut pas être contourné ailleurs. */
  if (direct) await page.evaluate(() => { window.ALBA_PAIEMENT_DIRECT = true; });
  return { page, envois };
}

/* Les deux pages montent le MÊME composant <Pricing/> — l'accueil et /tarifs.
   C'est vrai aujourd'hui ; rien ne garantit que ça le reste, et un tunnel de
   paiement qui ne fonctionne que sur une des deux pages est le genre de panne
   qu'on ne découvre qu'en lisant ses statistiques de vente. On rejoue donc le
   parcours complet sur les deux. */
for (const route of ['/tarifs', '/']) {
console.log(`\n===== ce qui part quand on clique — ${route} =====`);
{
  const { page, envois } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } }, true, route);

  /* Choix délibérément différent des valeurs par défaut : l'offre Agence, à
     trois personnes. Un test qui ne change rien ne prouve rien.

     L'ancien configurateur — trois paliers de stockage, un compteur de sièges —
     n'existe plus. On facture des projets et des personnes, et le palier 300
     est une offre retirée de la vente. Ce test suit la nouvelle page ; ce
     qu'il PROUVE n'a pas changé. */
  await page.click('.calc-bouton:nth-child(3)');          // 3 personnes
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const carte = [...document.querySelectorAll('.tarif-carte')]
      .find((c) => /Agence|Practice/.test(c.querySelector('.tarif-nom')?.textContent || ''));
    carte.querySelector('.tarif-cta').click();   // littéral : on est DANS le navigateur
  });
  await page.waitForTimeout(1200);

  ok(envois.length === 1, `un seul appel émis (${envois.length})`);
  const corps = envois[0] || {};
  ok(corps.storage === 150, `le palier suit l'offre choisie (storage = ${corps.storage})`);
  /* La bascule existe désormais, et elle est sur « Mensuel » à l'ouverture :
     on n'y a pas touché avant de cliquer, donc c'est bien « monthly » qui doit
     partir. Si la valeur par défaut basculait en douce, l'écran annoncerait
     49 € et le tunnel encaisserait un engagement d'un an.
     (Que la bascule change réellement `billing`, c'est tarifs.mjs qui l'éprouve,
     dans les deux sens et sur les deux offres payantes.) */
  ok(corps.billing === 'monthly', `sans toucher à la bascule, la périodicité est mensuelle (billing = ${corps.billing})`);
  ok(corps.seats === 3, `les personnes suivent le calculateur (seats = ${corps.seats})`);

  // Le point crucial : aucun montant ne doit sortir d'ici.
  const interdits = ['price', 'amount', 'total', 'montant', 'prix', 'price_id'];
  const fautifs = Object.keys(corps).filter((k) => interdits.includes(k));
  ok(fautifs.length === 0,
     `aucun montant transmis${fautifs.length ? ` — trouvé : ${fautifs.join(', ')}` : ' (le serveur seul fixe les prix)'}`);

  ok(await page.evaluate(() => location.href.includes('checkout.stripe.com')),
     'le visiteur est bien redirigé vers Stripe');
  await page.close();
}
}

console.log('\n===== le double-clic ne consomme pas deux tentatives =====');
{
  const { page, envois } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } });
  /* Le sélecteur est passé en ARGUMENT : le corps de la fonction s'exécute
     dans le navigateur, où les constantes de ce fichier n'existent pas. */
  await page.evaluate((sel) => {
    const b = document.querySelector(sel);
    b.click(); b.click(); b.click();
  }, CTA_PAYANT);
  await page.waitForTimeout(1200);
  // Le plafond est de cinq ouvertures par heure : trois clics nerveux en
  // brûleraient trois si rien ne les retenait.
  ok(envois.length === 1, `trois clics, un seul appel (${envois.length})`);
  await page.close();
}

console.log('\n===== chaque erreur du contrat dit quelque chose =====');
/* Les SEPT codes du contrat. Trois d'entre eux — paiement_indisponible,
   methode_non_autorisee, erreur_interne — existaient côté serveur depuis le
   début sans être listés ici : ils tombaient dans le message générique, et le
   visiteur lisait « Réessayez » là où réessayer ne servait à rien. C'est le
   genre d'écart qu'aucun essai manuel ne trouve, parce qu'il faut provoquer
   chaque code pour le voir. */
const CAS = [
  [429, 'trop_de_tentatives',    /trop de tentatives/i],
  [503, 'tarif_indisponible',    /momentanément indisponible/i],
  [503, 'cgu_non_configurees',   /momentanément indisponible/i],
  [503, 'paiement_indisponible', /momentanément indisponible/i],
  [500, 'erreur_interne',        /écrivez-nous/i],
  [405, 'methode_non_autorisee', /écrivez-nous/i],
  [400, 'palier_inconnu',        /r[ée]essayez/i],
];
for (const [status, code, attendu] of CAS) {
  const { page } = await ouvrir({ status, corps: { error: code } });
  await page.click(CTA_PAYANT);
  await page.waitForTimeout(900);
  const texte = await page.$eval('.pricing-erreur', (e) => e.textContent).catch(() => null);
  ok(texte !== null && attendu.test(texte),
     `${code} → « ${texte ? texte.slice(0, 52) : 'AUCUN MESSAGE'} »`);
  // Le bouton doit rester cliquable : une erreur passagère ne condamne pas la page.
  const rejouable = await page.evaluate((sel) => {
    const b = document.querySelector(sel);
    return b && getComputedStyle(b).pointerEvents !== 'none';
  }, CTA_PAYANT);
  ok(rejouable, `   et le bouton reste cliquable après ${code}`);
  await page.close();
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Une requête refusée AVANT le serveur ne doit pas accuser la connexion
 *
 * PANNE RÉELLE. Le bouton affichait « Vérifiez votre connexion » alors que la
 * connexion était parfaite : la requête avait été refusée avant d'atteindre le
 * serveur — CSP, contrôle d'origine, on ne peut pas savoir depuis JavaScript,
 * le navigateur renvoie le même « Failed to fetch » pour tout.
 *
 * Le message a envoyé Anthony regarder son wifi. On ne l'affirme donc plus que
 * si le navigateur confirme être hors ligne.
 * ───────────────────────────────────────────────────────────────────────────── */
console.log('\n===== une requête bloquée n\'accuse pas le wifi =====');
for (const [horsLigne, attendu, interdit] of [
  [false, /écrivez-nous/i, /v[ée]rifiez votre connexion/i],
  [true,  /hors ligne/i,   /écrivez-nous/i],
]) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  // La destination échoue au niveau réseau : c'est ce que produisent aussi un
  // refus de CSP et un refus d'origine, du point de vue du code.
  await page.route(POINT, (r) => r.abort('failed'));
  await page.route('https://app.alba-studio.co/**', (r) =>
    r.fulfill({ status: 200, contentType: 'text/html', body: '<p>inscription</p>' }));
  await page.goto('http://localhost:8942/tarifs', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(4000);
  await page.evaluate((h) => {
    window.ALBA_PAIEMENT_DIRECT = true;
    Object.defineProperty(window.navigator, 'onLine', { get: () => !h, configurable: true });
  }, horsLigne);
  await page.click(CTA_PAYANT);
  await page.waitForTimeout(1200);
  const texte = await page.$eval('.pricing-erreur', (e) => e.textContent).catch(() => null);
  ok(texte !== null && attendu.test(texte) && !interdit.test(texte),
     `${horsLigne ? 'hors ligne  ' : 'blocage     '} → « ${texte ? texte.slice(0, 62) : 'AUCUN MESSAGE'} »`);
  await page.close();
}

console.log('\n===== la seconde porte reste ouverte =====');
{
  const { page } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } });
  /* La « seconde porte » — le lien discret vers l'inscription, pour qui ne veut
     pas payer aujourd'hui. Elle s'appelait .pricing-porte-2 dans l'ancienne
     carte ; c'est .tarif-porte désormais. Ce qu'elle garantit n'a pas changé :
     personne ne doit se heurter à un mur. */
  const porte = await page.$eval('.tarif-porte a', (e) => e.getAttribute('href')).catch(() => null);
  ok(porte !== null && porte.includes('/inscription'),
     `un lien vers l'inscription subsiste (${porte || 'ABSENT'})`);
  // Sans JavaScript, le bouton principal doit rester un lien utilisable.
  const repli = await page.$eval(CTA_PAYANT, (e) => e.getAttribute('href')).catch(() => null);
  ok(repli !== null && repli.includes('/inscription'),
     `le bouton garde un href de repli pour les visiteurs sans JavaScript`);
  await page.close();
}

console.log('\n===== l\'interrupteur commande vraiment le parcours =====');
{
  /* Position réelle livrée par config.js. Elle est passée à `true` le jour où
     /bienvenue est entrée en ligne. Ce contrôle ne fige PAS la valeur — il
     vérifie qu'elle est explicite et que le comportement la suit : un
     interrupteur qui ne commanderait rien serait un faux filet. */
  const { page } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } }, false);
  const position = await page.evaluate(() => window.ALBA_PAIEMENT_DIRECT);
  ok(typeof position === 'boolean',
     `config.js livre une position explicite (${position})`);
  await page.close();
}

console.log('\n===== forcé à false : on retombe sur l\'inscription =====');
{
  const { page, envois } = await ouvrir({ status: 200, corps: { url: 'https://checkout.stripe.com/c/pay/cs_test' } }, false);
  // On le ferme explicitement, quelle que soit sa valeur livrée : c'est le
  // COMPORTEMENT de repli qu'on éprouve, pas la valeur du jour.
  await page.evaluate(() => { window.ALBA_PAIEMENT_DIRECT = false; });

  await page.click(CTA_PAYANT).catch(() => {});
  await page.waitForTimeout(900);
  ok(envois.length === 0, `aucun appel au tunnel de paiement (${envois.length})`);
  // Le point qui compte : le bouton ne doit pas être inerte, il doit MENER
  // quelque part. Un interrupteur fermé qui casse le bouton serait pire que
  // le risque qu'il évite.
  const arrivee = page.url();
  ok(arrivee.includes('/inscription') || arrivee.includes('app.alba-studio.co'),
     `le clic mène quand même à l'inscription (${arrivee.slice(0, 64)})`);
  await page.close();
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
