/**
 * La page tarifs dit-elle la vérité, et envoie-t-elle la bonne chose ?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * La grille précédente vendait du stockage : 49 / 69 / 89 € pour 50, 150 et
 * 300 Go. Mesuré en production le 9 septembre 2026, l'ensemble des comptes
 * occupait 0,143 Go — l'offre d'entrée en promettait 350 fois plus que tout ce
 * qui existait. On facture désormais des projets menés de front et des
 * personnes.
 *
 * Trois familles de contrôles, et aucune n'est décorative :
 *
 *   1. AUCUN GIGAOCTET, AUCUN « STOCKAGE » VISIBLE. Sur toutes les pages, dans
 *      les deux langues. C'est une interdiction, pas une préférence : un
 *      visiteur qui lit « 50 Go » sur une page et « projets illimités » sur une
 *      autre ne sait plus ce qu'il achète.
 *
 *   2. LE CONTRAT DE PAIEMENT, AU CHAMP PRÈS. Le champ s'appelle encore
 *      « storage » côté serveur pour des raisons historiques, mais c'est un
 *      SÉLECTEUR D'OFFRE : Atelier vaut 50, Agence vaut 150. La valeur 300 est
 *      une offre retirée de la vente et ne doit JAMAIS repartir. `seats` est le
 *      nombre total de personnes, première incluse. Une erreur ici ne se voit
 *      pas à l'écran : le visiteur paie, et découvre l'autre offre.
 *
 *   3. AUCUN CHIFFRE DE PERFORMANCE AFFIRMÉ. Alba a trois clients payants et
 *      aucune mesure de temps gagné. L'estimation de la page est calculée à
 *      partir des valeurs saisies, son hypothèse est réglable, et le résultat
 *      porte « estimation indicative ». Un pourcentage présenté comme un fait
 *      serait une pratique commerciale trompeuse pour un gain nul.
 */
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';
import { ROUTES } from '../outils/pages.mjs';
import fs from 'node:fs';
import path from 'node:path';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const srv = await demarrer(8953);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const BASE = 'http://localhost:8953';

/** Ouvre /tarifs et rend la page, prête à être pilotée. */
async function ouvrirTarifs(largeur = 1280) {
  const ctx = await navigateur.newContext({ viewport: { width: largeur, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/tarifs', { waitUntil: 'load', timeout: 40000 });
  await page.waitForSelector('.tarif-carte', { timeout: 20000 });
  await page.waitForTimeout(600);
  return { ctx, page };
}

/** Règle le calculateur : nombre de personnes, puis nombre de projets. */
async function regler(page, personnes, projets) {
  await page.evaluate((n) => {
    const b = [...document.querySelectorAll('.calc-bouton')].find((x) => x.textContent.trim() === String(n));
    if (b) b.click();
  }, personnes);
  /* Un curseur ne se règle pas en écrivant `value` : React ne verrait rien.
     On passe par le setter natif puis on émet l'événement, ce qui est la seule
     façon de faire bouger un état React depuis l'extérieur. */
  await page.evaluate((v) => {
    const el = document.getElementById('calc-projets');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, String(v));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, projets);
  await page.waitForTimeout(250);
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 · LE CALCULATEUR DÉSIGNE-T-IL LA BONNE OFFRE ?
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== le calculateur =====');
{
  const { ctx, page } = await ouvrirTarifs();
  /* Les quatre cas de la règle, bornes comprises. La borne à 5 projets est
     celle qui se déplace le plus facilement d'un refactor : c'est elle qui
     sépare 49 € de 69 €. */
  const CAS = [
    { personnes: 1, projets: 1,  offre: 'Découverte', prix: 0,   quoi: 'seul, un seul projet → l’offre gratuite d’abord' },
    { personnes: 1, projets: 2,  offre: 'Atelier',    prix: 49,  quoi: 'seul, deux projets' },
    { personnes: 1, projets: 5,  offre: 'Atelier',    prix: 49,  quoi: 'seul, cinq projets — la borne haute' },
    { personnes: 1, projets: 6,  offre: 'Agence',     prix: 69,  quoi: 'seul, six projets — on bascule' },
    { personnes: 1, projets: 30, offre: 'Agence',     prix: 69,  quoi: 'seul, trente projets' },
    { personnes: 2, projets: 1,  offre: 'Agence',     prix: 138, quoi: 'deux personnes, un projet' },
    { personnes: 4, projets: 12, offre: 'Agence',     prix: 276, quoi: 'quatre personnes' },
  ];
  for (const c of CAS) {
    await regler(page, c.personnes, c.projets);
    const vu = await page.evaluate(() => ({
      nom: document.querySelector('.calc-nom')?.textContent.trim() || '',
      montant: document.querySelector('.calc-montant')?.textContent.replace(/\s/g, '') || '',
      annuel: document.querySelector('.calc-annuel')?.textContent.replace(/\s/g, '') || '',
    }));
    const bonNom = vu.nom === c.offre;
    const bonPrix = c.prix === 0
      ? /Gratuit/i.test(vu.montant)
      : vu.montant.startsWith(String(c.prix));
    /* L'équivalent annuel est une multiplication affichée, pas une offre :
       tant que la remise n'est pas confirmée ET vérifiée dans Stripe, il ne
       doit jamais valoir autre chose que douze fois le mensuel. */
    const bonAnnuel = c.prix === 0 || vu.annuel.includes(String(c.prix * 12));
    ok(bonNom && bonPrix && bonAnnuel,
       `${c.quoi} → ${vu.nom} ${vu.montant}${bonNom && bonPrix && bonAnnuel ? '' : `  ATTENDU ${c.offre} ${c.prix || 'gratuit'}`}`);
  }
  await ctx.close();
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · LE CONTRAT DE PAIEMENT
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== ce qui part au serveur de paiement =====');
{
  /* On intercepte la requête plutôt que de la laisser sortir : le test ne doit
     ni toucher Stripe, ni consommer le plafond horaire du serveur. */
  const CAS = [
    { carte: 'Atelier', personnes: 1, attendu: { storage: 50,  billing: 'monthly', seats: 1 } },
    { carte: 'Agence',  personnes: 1, attendu: { storage: 150, billing: 'monthly', seats: 1 } },
    { carte: 'Agence',  personnes: 3, attendu: { storage: 150, billing: 'monthly', seats: 3 } },
    { carte: 'Agence',  personnes: 4, attendu: { storage: 150, billing: 'monthly', seats: 4 } },
  ];
  for (const c of CAS) {
    const { ctx, page } = await ouvrirTarifs();
    let envoye = null;
    await page.route('**/creer-paiement-public', async (route) => {
      envoye = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ url: 'about:blank#stripe' }) });
    });
    await regler(page, c.personnes, 3);
    await page.evaluate((nom) => {
      const carte = [...document.querySelectorAll('.tarif-carte')]
        .find((el) => el.querySelector('.tarif-nom')?.textContent.trim() === nom);
      carte.querySelector('.tarif-cta').click();
    }, c.carte);
    await page.waitForTimeout(900);
    const juste = envoye && JSON.stringify(envoye) === JSON.stringify(c.attendu);
    ok(juste, `${c.carte}, ${c.personnes} personne(s) → ${JSON.stringify(envoye)}${juste ? '' : `  ATTENDU ${JSON.stringify(c.attendu)}`}`);
    await ctx.close();
  }

  /* L'ancienne offre 300 ne doit repartir sous aucun prétexte : elle n'est plus
     vendue, et le serveur la refuserait — mais le visiteur, lui, aurait déjà
     cliqué. */
  const jsx = fs.readFileSync(path.join(ROOT, 'sections.jsx'), 'utf8');
  const paliers = [...jsx.matchAll(/palier:\s*(\d+|null)/g)].map((m) => m[1]);
  ok(!paliers.includes('300'), `aucune offre ne porte le palier 300 (paliers déclarés : ${paliers.join(', ')})`);

  /* Découverte est gratuite : elle ne doit appeler AUCUN paiement. */
  {
    const { ctx, page } = await ouvrirTarifs();
    let appele = false;
    await page.route('**/creer-paiement-public', async (route) => { appele = true; await route.abort(); });
    await page.evaluate(() => {
      const carte = [...document.querySelectorAll('.tarif-carte')]
        .find((el) => /Découverte/.test(el.querySelector('.tarif-nom')?.textContent || ''));
      const lien = carte.querySelector('.tarif-cta');
      lien.setAttribute('target', '_blank');   // on ne quitte pas la page de test
      lien.click();
    });
    await page.waitForTimeout(700);
    ok(!appele, "l'offre gratuite n'ouvre aucun paiement");
    await ctx.close();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · LES ERREURS SE DISENT-ELLES AU VISITEUR ?
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== les codes d’erreur du paiement =====');
{
  const CAS = [
    { code: 'trop_de_tentatives',  statut: 429, attendu: /Trop de tentatives/i },
    { code: 'tarif_indisponible',  statut: 503, attendu: /momentanément indisponible/i },
    { code: 'cgu_non_configurees', statut: 503, attendu: /momentanément indisponible/i },
    /* Un défaut de la page : le visiteur ne doit pas lire notre bogue, mais il
       doit lire QUELQUE CHOSE — un bouton muet est pire qu'un message. */
    { code: 'palier_inconnu',      statut: 400, attendu: /.+/, muet: true },
  ];
  for (const c of CAS) {
    const { ctx, page } = await ouvrirTarifs();
    await page.route('**/creer-paiement-public', async (route) => {
      await route.fulfill({ status: c.statut, contentType: 'application/json', body: JSON.stringify({ error: c.code }) });
    });
    await page.evaluate(() => {
      const carte = [...document.querySelectorAll('.tarif-carte')]
        .find((el) => /Atelier/.test(el.querySelector('.tarif-nom')?.textContent || ''));
      carte.querySelector('.tarif-cta').click();
    });
    await page.waitForTimeout(900);
    const message = await page.evaluate(() => document.querySelector('.pricing-erreur')?.textContent.trim() || '');
    const juste = c.attendu.test(message);
    /* Et le code technique ne doit jamais s'afficher tel quel : « palier_inconnu »
       devant un architecte ne veut rien dire et fait mauvais effet. */
    const nuFuite = !message.includes(c.code);
    ok(juste && nuFuite, `${c.code.padEnd(22)} → « ${message.slice(0, 60)} »${nuFuite ? '' : '  LE CODE TECHNIQUE FUITE'}`);
    await ctx.close();
  }

  /* Aucune case à cocher avant la redirection : le consentement aux CGU est
     recueilli dans le tunnel Stripe, deux écrans plus loin. Un second
     consentement au mauvais endroit serait une faute, pas une précaution. */
  const { ctx, page } = await ouvrirTarifs();
  const cases = await page.evaluate(() =>
    [...document.querySelectorAll('#pricing input[type="checkbox"]')].length);
  ok(cases === 0, `aucune case à cocher avant le paiement (${cases} trouvée(s))`);
  await ctx.close();
}

/* ═══════════════════════════════════════════════════════════════════════════
   4 · L'ESTIMATION RESTE UNE ESTIMATION
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== l’estimation de temps =====');
{
  const { ctx, page } = await ouvrirTarifs();
  const regle = async (id, v) => page.evaluate(({ id, v }) => {
    const el = document.getElementById(id);
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(el, String(v));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, { id, v });

  await regle('calc-docs', 20);
  await regle('calc-taux', 80);
  await regle('calc-heures', 1.5);
  await page.waitForTimeout(300);
  const vu = await page.evaluate(() => ({
    montant: document.querySelector('.calc-temps .calc-montant')?.textContent.replace(/\s/g, '') || '',
    operation: document.querySelector('.calc-operation')?.textContent.replace(/\s/g, '') || '',
    mentions: document.querySelector('.calc-mentions')?.textContent || '',
  }));
  /* 20 documents × 1,5 h × 80 € = 2 400 €. Le résultat est une multiplication
     de ce que le visiteur a saisi, et rien d'autre. */
  ok(vu.montant.startsWith('2400'), `20 doc × 1,5 h × 80 € → ${vu.montant} (attendu 2 400)`);
  /* L'opération est AFFICHÉE : c'est ce qui permet au visiteur de la refaire,
     et de la contredire. Un résultat sans son calcul est une affirmation. */
  ok(/20documents/.test(vu.operation) && /1\.5h/.test(vu.operation) && /80/.test(vu.operation),
     `le calcul est affiché en toutes lettres — « ${vu.operation.slice(0, 50)} »`);
  ok(/estimation indicative/i.test(vu.mentions) && /HT/.test(vu.mentions),
     `la mention « Montants HT · Estimation indicative » est présente`);

  /* L'hypothèse doit être RÉGLABLE : c'est ce qui distingue une estimation
     d'une promesse. Un chiffre figé serait une affirmation déguisée. */
  const reglable = await page.evaluate(() => !!document.getElementById('calc-heures'));
  ok(reglable, `le temps par document est réglable par le visiteur`);
  await ctx.close();
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 · PLUS UN SEUL GIGAOCTET, NULLE PART
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== aucun stockage visible sur le site =====');
{
  /* On lit le TEXTE RENDU, pas les fichiers : un mot peut vivre dans un
     commentaire de code sans que personne ne le voie, et c'est le cas du champ
     historique du contrat de paiement. Ce qui est interdit, c'est ce que le
     visiteur lit. */
  const INTERDITS = [
    { motif: /\b\d+\s*Go\b/i, quoi: 'un nombre de gigaoctets' },
    { motif: /\b\d+\s*GB\b/i, quoi: 'un nombre de gigaoctets (anglais)' },
    { motif: /stockage/i,     quoi: 'le mot « stockage »' },
    { motif: /\bstorage\b/i,  quoi: 'le mot « storage »' },
  ];
  /* Les mentions légales décrivent l'hébergement des fichiers : « stockage des
     fichiers déposés par les utilisateurs » y est un terme technique exact, pas
     un argument de vente. C'est la seule page exemptée, et elle est nommée. */
  const EXEMPTES = new Set(['/mentions-legales.html', '/en-mentions-legales']);

  for (const route of ROUTES) {
    if (EXEMPTES.has(route)) continue;
    const ctx = await navigateur.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForTimeout(3000);
    /* Le CORPS et les MÉTADONNÉES. Le contrôle ne lisait que le corps, et il a
       laissé passer la description de /en-tarifs, qui vendait encore « storage ».
       C'est pourtant elle que Google affiche sous le titre : le seul texte de la
       page que beaucoup de gens liront avant de cliquer. */
    const texte = await page.evaluate(() => [
      document.body.innerText,
      document.querySelector('meta[name=description]')?.content || '',
      document.querySelector('meta[property="og:description"]')?.content || '',
      document.title,
    ].join('\n'));
    const trouves = INTERDITS.filter((i) => i.motif.test(texte));
    ok(trouves.length === 0,
       `${route.padEnd(24)} ${trouves.length === 0 ? 'rien à signaler' : 'CONTIENT ' + trouves.map((t) => t.quoi).join(', ')}`);
    await ctx.close();
  }
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
