/**
 * Le formulaire de contact envoie-t-il vraiment quelque chose ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Ce formulaire n'envoyait RIEN. Il validait les champs, affichait « Merci, nous
 * vous recontactons sous 24 h », et jetait la demande : aucune requête réseau
 * n'existait dans toute la page. La panne était invisible — pour le visiteur,
 * qui lisait une confirmation, comme pour l'éditeur, qui ne voyait rien arriver
 * sans savoir pourquoi.
 *
 * Le test le plus important de ce fichier n'est donc pas celui du succès : c'est
 * celui de l'ÉCHEC. Une confirmation affichée alors que rien n'est parti, c'est
 * exactement le défaut d'origine.
 *
 * Les réponses de la fonction sont simulées : on ne dépend d'aucun réseau, et on
 * peut provoquer l'échec à volonté — ce qu'aucun appel réel ne permettrait.
 */
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';

const POINT_CONTACT = '**/functions/v1/contact-vitrine';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8870);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

/**
 * Ouvre l'accueil, remplit le formulaire, l'envoie, et rend ce qui s'est passé.
 * @param {(route) => void} repondre  simulation de la réponse du serveur
 */
async function envoyer(repondre) {
  const page = await browser.newPage();
  const appels = [];
  const refusCsp = [];

  page.on('console', (m) => {
    if (/Content Security Policy|Refused to connect/i.test(m.text())) refusCsp.push(m.text());
  });

  await page.route(POINT_CONTACT, async (route) => {
    appels.push(JSON.parse(route.request().postData() || '{}'));
    await repondre(route);
  });

  await page.goto('http://localhost:8870/', { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(6000);
  await page.locator('#contact').scrollIntoViewIfNeeded();

  for (const champ of await page.locator('#contact form input, #contact form textarea').all()) {
    if (await champ.getAttribute('name') === 'website') continue;   // le champ-piège
    const type = await champ.getAttribute('type');
    if (type === 'checkbox') { await champ.check().catch(() => {}); continue; }
    const id = ((await champ.getAttribute('name')) || '') + (type || '');
    if (/mail/i.test(id)) await champ.fill('essai@exemple.fr').catch(() => {});
    else if (/tel|phone/i.test(id)) await champ.fill('0600000000').catch(() => {});
    else await champ.fill('Camille Lavigne').catch(() => {});
  }

  // Le serveur refuse un envoi survenu moins de deux secondes après l'affichage.
  // On attend donc, comme un humain le ferait.
  await page.waitForTimeout(2200);
  await page.locator('#contact form button[type=submit]').first().click();
  await page.waitForTimeout(1200);

  const succes = await page.locator('.form-success').count();
  const erreur = await page.locator('.form-error').count();
  const texteSucces = succes ? await page.locator('.form-success').innerText() : '';
  const texteErreur = erreur ? await page.locator('.form-error').innerText() : '';

  await page.close();
  return { appels, succes, erreur, texteSucces, texteErreur, refusCsp };
}

// ── 1. Le cas nominal ───────────────────────────────────────────────────────
console.log('\n===== envoi accepté par le serveur =====');
{
  const r = await envoyer((route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"recu":true}' }));

  ok(r.appels.length === 1, `une requête est bien partie (${r.appels.length})`);
  ok(r.refusCsp.length === 0,
     `aucun refus de CSP${r.refusCsp.length ? ` — ${r.refusCsp[0].slice(0, 120)}` : ''}`);
  ok(r.succes === 1 && r.erreur === 0, 'la confirmation s’affiche, pas d’erreur');
  // Le message de confirmation s'affichait autrefois en code brut : l'appel L()
  // n'était pas entre accolades dans le paquet d'origine.
  ok(r.texteSucces.includes('Merci') && !/L\(|\$\{|`/.test(r.texteSucces),
     `message propre → « ${r.texteSucces.replace(/\s+/g, ' ').trim().slice(0, 58)} »`);

  const c = r.appels[0] || {};
  ok(c.name === 'Camille Lavigne', `le nom part bien (${c.name})`);
  ok(c.email === 'essai@exemple.fr', `l’e-mail part bien (${c.email})`);
  ok(c.locale === 'fr', `la langue est transmise (${c.locale})`);
  ok(c.website === '', 'le champ-piège part vide — un visiteur ne le remplit pas');
  ok(typeof c.affiche_a === 'number' && c.affiche_a > 0,
     'l’instant d’affichage est transmis, pour le contrôle de délai côté serveur');
}

// ── 2. LE cas qui compte : le serveur refuse ────────────────────────────────
console.log('\n===== le serveur répond une erreur =====');
{
  const r = await envoyer((route) =>
    route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"boom"}' }));

  ok(r.succes === 0, 'AUCUNE confirmation affichée — c’est le défaut d’origine');
  ok(r.erreur === 1, 'un message d’erreur est affiché à la place');
  ok(/contact@alba-studio\.co/.test(r.texteErreur),
     'l’erreur donne une porte de sortie (adresse e-mail)');
}

// ── 3. Le réseau tombe ──────────────────────────────────────────────────────
console.log('\n===== le réseau est coupé =====');
{
  const r = await envoyer((route) => route.abort('failed'));
  ok(r.succes === 0, 'aucune confirmation quand la requête n’aboutit pas');
  ok(r.erreur === 1, 'le visiteur est prévenu qu’il doit réessayer');
}

// ── 4. La CSP autorise-t-elle réellement cette destination ? ────────────────
console.log('\n===== la CSP laisse-t-elle passer l’envoi ? =====');
{
  const csp = (await import('./serveur.mjs')).CSP;
  const connect = csp.split(';').map((s) => s.trim()).find((s) => s.startsWith('connect-src'));
  console.log(`   ${connect}`);
  // Sans cette directive, le navigateur bloque l'envoi et le visiteur voit une
  // erreur alors que le code est juste. Le cas 1 le prouve déjà en pratique
  // (aucun refus de CSP), celui-ci le rend lisible.
  ok(/supabase\.co/.test(connect || ''), 'connect-src nomme l’origine du point d’entrée');
  ok(!/\*/.test(connect || ''), 'et ne l’ouvre pas par un joker');
}

await browser.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
