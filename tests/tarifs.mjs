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
  await page.waitForSelector('.conf', { timeout: 20000 });
  await page.waitForTimeout(600);
  return { ctx, page };
}

/** Désigne une offre à la main, par sa tuile du rail. */
async function choisir(page, nom) {
  await page.evaluate((n) => {
    const t = [...document.querySelectorAll('.conf-tuile')]
      .find((el) => el.querySelector('.tarif-nom')?.textContent.trim() === n);
    if (!t) throw new Error(`tuile « ${n} » introuvable`);
    t.click();
  }, nom);
  /* Deux évaluations séparées, jamais une seule : React ne rend qu'après le
     clic, et cliquer le bouton dans la même passe viserait l'offre d'AVANT. */
  await page.waitForTimeout(250);
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

/** Bascule la périodicité. `annuel` vrai = tarif à l'année. */
async function periodicite(page, annuel) {
  await page.evaluate((a) => {
    const b = [...document.querySelectorAll('.tarif-bascule-btn')][a ? 1 : 0];
    b.click();
  }, annuel);
  await page.waitForTimeout(250);
}

/** Ce que la sortie du calculateur affiche, tel que le visiteur le lit. */
const lireSortie = (page) => page.evaluate(() => {
  /* Une seule ligne de détail sous le prix : « facturé … par an » et/ou
     l'addition dégressive « 69 € + 3 × 39 € ». On la lit entière, et on ne
     l'appelle « annuel » que si elle parle de facturation à l'année. */
  const detail = document.querySelector('.conf-detail')?.textContent.replace(/\s/g, '') || '';
  return {
    nom: document.querySelector('.conf-nom')?.textContent.trim() || '',
    montant: document.querySelector('.conf-montant')?.textContent.replace(/\s/g, '') || '',
    annuel: /facturé|billed/.test(detail) ? detail : '',
    detail,
    gain: document.querySelector('.calc-montant-gain')?.textContent.replace(/\s/g, '') || '',
  };
});

/* ═══════════════════════════════════════════════════════════════════════════
   1 · LE CALCULATEUR DÉSIGNE-T-IL LA BONNE OFFRE, AU BON PRIX ?
   ═══════════════════════════════════════════════════════════════════════════
   AGENCE N'EST PAS UN PRIX PAR PERSONNE. Elle l'a été sur cette page pendant
   une journée : la carte annonçait « 69 € par personne », soit 276 € pour
   quatre, quand le tarif réel est dégressif — 69 puis 39 — soit 186 €. La page
   nous faisait paraître 48 % plus chers que nous ne sommes, sur exactement le
   profil de client qu'on vise. Ces montants sont ceux de Stripe ; ils sont
   écrits ici un par un parce que rien d'autre ne fait autorité.
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== le calculateur, au mois =====');
{
  const { ctx, page } = await ouvrirTarifs();
  /* Bornes comprises. Celle de 5 projets est la plus fragile d'un refactor :
     c'est elle qui sépare Atelier d'Agence. */
  const CAS = [
    { personnes: 1, projets: 1,  offre: 'Découverte', prix: 0,   quoi: 'seul, un seul projet → l’offre gratuite d’abord' },
    { personnes: 1, projets: 2,  offre: 'Atelier',    prix: 49,  quoi: 'seul, deux projets' },
    { personnes: 1, projets: 5,  offre: 'Atelier',    prix: 49,  quoi: 'seul, cinq projets — la borne haute' },
    { personnes: 1, projets: 6,  offre: 'Agence',     prix: 69,  quoi: 'seul, six projets — on bascule' },
    { personnes: 1, projets: 30, offre: 'Agence',     prix: 69,  quoi: 'seul, trente projets' },
    { personnes: 2, projets: 1,  offre: 'Agence',     prix: 108, quoi: 'deux personnes → 69 + 39' },
    { personnes: 3, projets: 12, offre: 'Agence',     prix: 147, quoi: 'trois personnes → 69 + 2 × 39' },
    { personnes: 4, projets: 12, offre: 'Agence',     prix: 186, quoi: 'quatre personnes → 69 + 3 × 39' },
  ];
  for (const c of CAS) {
    await regler(page, c.personnes, c.projets);
    const vu = await lireSortie(page);
    const bonNom = vu.nom === c.offre;
    const bonPrix = c.prix === 0 ? /Gratuit/i.test(vu.montant) : vu.montant.startsWith(String(c.prix));
    /* Au mois, aucune ligne « facturé … par an » : elle n'appartient qu'au
       tarif annuel, et l'afficher ici ferait croire à un engagement. */
    const sansAnnuel = vu.annuel === '';
    ok(bonNom && bonPrix && sansAnnuel,
       `${c.quoi} → ${vu.nom} ${vu.montant}${bonNom && bonPrix && sansAnnuel ? '' : `  ATTENDU ${c.offre} ${c.prix || 'gratuit'}${sansAnnuel ? '' : ', sans ligne annuelle'}`}`);
  }
  /* ── LES TROIS CARTES RESTENT VISIBLES QUAND LE BADGE CHANGE DE CARTE ───
     Cliquer « 2 personnes » a fait DISPARAÎTRE Atelier et Agence : le badge
     « correspond à vos réponses » changeait de carte, donc la prop className
     changeait, donc React réécrivait l'attribut — en effaçant la classe `in`
     que Reveal avait posée à la main. Deux cartes sur trois à opacity: 0,
     sur exactement le geste qu'on invite le visiteur à faire. On mesure
     l'opacité CALCULÉE, pas la classe : c'est ce que l'œil voit. */
  /* Le rail est SOUS le configurateur, hors d'un écran de 1 000 px : il n'a
     pas encore été révélé au défilement, et son opacité de repos est 0. On
     l'amène à l'écran d'abord — on mesure une disparition, pas un défilement. */
  await page.evaluate(() => document.querySelector('.conf-rail').scrollIntoView({ block: 'center' }));
  /* On attend que l'apparition soit FINIE, pas un délai : la transition dure
     plus que les 500 ms qu'on lui laissait, et les deux premières mesures
     tombaient en plein fondu — un rouge qui n'accusait rien. */
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.conf-rail')).opacity === '1', null, { timeout: 5000 });
  for (const n of [1, 2, 3, 4, 1]) {
    await regler(page, n, 3);
    const vus = await page.evaluate(() => [
      ...[...document.querySelectorAll('.conf, .conf-rail')].map((el) => ({ nom: el.className.split(' ')[1] || el.className, op: getComputedStyle(el).opacity })),
      ...[...document.querySelectorAll('.conf-tuile')].map((t) => ({ nom: t.querySelector('.tarif-nom')?.textContent.trim(), op: getComputedStyle(t).opacity })),
    ]);
    const invisibles = vus.filter((c) => Number(c.op) < 1).map((c) => c.nom);
    ok(vus.length === 5 && invisibles.length === 0,
       `${n} personne(s) → le configurateur et les 3 tuiles restent affichés${invisibles.length ? ` — DISPARUS : ${invisibles.join(', ')}` : ''}`);
  }

  /* Le détail de l'addition est affiché : « 69 € + 3 × 39 € ». Un total
     dégressif qu'on ne peut pas refaire de tête ressemble à une erreur. */
  await regler(page, 4, 12);
  const { detail } = await lireSortie(page);
  ok(/69/.test(detail) && /3×39/.test(detail), `l’addition est montrée — « ${detail} »`);
  await ctx.close();
}

console.log('\n===== le calculateur, à l’année =====');
{
  const { ctx, page } = await ouvrirTarifs();
  await periodicite(page, true);
  /* Ce que le visiteur paie CHAQUE MOIS reste le grand chiffre, et le total
     annuel est dit juste dessous. L'inverse — annoncer 1 836 € en gros —
     comparerait un montant annuel à un prix mensuel concurrent. */
  const CAS = [
    { personnes: 1, projets: 2,  offre: 'Atelier', mois: 40,  an: 480,  quoi: 'Atelier à l’année → 40 €/mois, facturé 480 €' },
    { personnes: 2, projets: 1,  offre: 'Agence',  mois: 89,  an: 1068, quoi: 'Agence 2 pers. → 684 + 384 = 1 068 €/an' },
    { personnes: 4, projets: 12, offre: 'Agence',  mois: 153, an: 1836, quoi: 'Agence 4 pers. → 1 836 €/an, soit 153 €/mois' },
  ];
  for (const c of CAS) {
    await regler(page, c.personnes, c.projets);
    const vu = await lireSortie(page);
    const bonNom = vu.nom === c.offre;
    const bonMois = vu.montant.startsWith(String(c.mois));
    const bonAn = vu.annuel.includes(String(c.an));
    ok(bonNom && bonMois && bonAn,
       `${c.quoi} → ${vu.nom} ${vu.montant} / ${vu.annuel}${bonNom && bonMois && bonAn ? '' : `  ATTENDU ${c.offre} ${c.mois} et ${c.an}`}`);
  }
  /* La remise est annoncée « jusqu'à » : elle vaut 18 % sur Atelier et sur
     chaque personne supplémentaire, mais 17,4 % sur le premier siège Agence
     (684 au lieu de 828). « −18 % » tout court serait faux sur le montant que
     tout le monde regarde en premier. */
  const remise = await page.evaluate(() => document.querySelector('.tarif-remise')?.textContent.trim() || '');
  ok(/jusqu|up to/i.test(remise), `la remise est annoncée comme un maximum — « ${remise} »`);
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
    /* La périodicité voyage dans `billing`. Les tarifs annuels existaient dans
       Stripe et étaient inatteignables depuis cette page : personne ne pouvait
       les acheter. Si la bascule cessait d'être lue, l'écran annoncerait 40 €
       et le tunnel encaisserait 49 € — l'écart le plus difficile à voir. */
    { carte: 'Atelier', personnes: 1, annuel: true, attendu: { storage: 50,  billing: 'yearly', seats: 1 } },
    { carte: 'Agence',  personnes: 4, annuel: true, attendu: { storage: 150, billing: 'yearly', seats: 4 } },
  ];
  for (const c of CAS) {
    const { ctx, page } = await ouvrirTarifs();
    let envoye = null;
    await page.route('**/creer-paiement-public', async (route) => {
      envoye = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ url: 'about:blank#stripe' }) });
    });
    if (c.annuel) await periodicite(page, true);
    /* Les réponses D'ABORD, la tuile ENSUITE : une réponse nouvelle rend la
       main à la recommandation, et effacerait un choix fait avant elle. */
    await regler(page, c.personnes, 3);
    await choisir(page, c.carte);
    await page.evaluate(() => document.querySelector('.conf-reponse .tarif-cta').click());
    await page.waitForTimeout(900);
    const juste = envoye && JSON.stringify(envoye) === JSON.stringify(c.attendu);
    ok(juste, `${c.carte}, ${c.personnes} pers., ${c.annuel ? 'annuel ' : 'mensuel'} → ${JSON.stringify(envoye)}${juste ? '' : `  ATTENDU ${JSON.stringify(c.attendu)}`}`);
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
    await choisir(page, 'Découverte');
    await page.evaluate(() => {
      const lien = document.querySelector('.conf-reponse .tarif-cta');
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
    await choisir(page, 'Atelier');
    await page.evaluate(() => document.querySelector('.conf-reponse .tarif-cta').click());
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

  /* ── LES VALEURS PAR DÉFAUT ──────────────────────────────────────────────
     Elles étaient de 20 documents par mois : un CCTP par jour ouvré, un usage
     qu'aucun architecte seul ne reconnaît. Le résultat affichait 1 500 € de
     gain, trente fois le prix de l'offre — un chiffre auquel personne ne croit
     ne convainc pas, il jette le doute sur tout le reste de la page.
     Quatre documents donnent 300 €, six fois le prix d'Atelier. C'est le
     réglage que 95 % des visiteurs verront : il est éprouvé ici. */
  /* Les curseurs sont repliés derrière « Ajuster l'estimation » : ils sont
     pour le sceptique. Le RÉSULTAT, lui, est visible sans rien déplier — c'est
     vérifié plus bas, avant d'ouvrir quoi que ce soit. */
  const gainSansDeplier = await page.evaluate(() => document.querySelector('.calc-montant-gain')?.textContent.replace(/\s/g, '') || '');
  ok(/300/.test(gainSansDeplier), `le gain est visible sans rien déplier — « ${gainSansDeplier} »`);
  /* Et l'argument est dit en une phrase : « soit 6 × votre abonnement ». Avec
     les valeurs par défaut sur Atelier, 300 / 49 = 6,1 → « 6 × ». Mesuré ICI,
     avant de toucher aux curseurs : après, le rapport suit ce qu'on a réglé
     (20 documents × 1,5 h × 80 € donne « 49 × », ce qui est juste). */
  const phrase = await page.evaluate(() => document.querySelector('.conf-leo-texte')?.textContent.replace(/\s+/g, ' ') || '');
  ok(/6 × (votre abonnement|your subscription)/.test(phrase), `le rapport est dit en une phrase — « ${phrase.slice(0, 80)} »`);
  await page.click('.calc-ajuster');
  await page.waitForTimeout(250);
  const defauts = await page.evaluate(() => ({
    docs: document.getElementById('calc-docs')?.value,
    taux: document.getElementById('calc-taux')?.value,
    heures: document.getElementById('calc-heures')?.value,
    gain: document.querySelector('.calc-montant-gain')?.textContent.replace(/\s/g, '') || '',
  }));
  ok(defauts.docs === '4' && defauts.taux === '75' && defauts.heures === '1',
     `valeurs par défaut : ${defauts.docs} doc × ${defauts.heures} h × ${defauts.taux} € (attendu 4 × 1 × 75)`);
  ok(/300/.test(defauts.gain), `par défaut, le gain affiché vaut 300 € — « ${defauts.gain} »`);
  /* Pas de « HT » sur cette ligne : hors-taxes n'a aucun sens sur du temps
     gagné, et le mot y transformait une estimation en facture. */
  ok(!/HT/.test(defauts.gain), `le gain ne porte pas « HT » — « ${defauts.gain} »`);

  await regle('calc-docs', 20);
  await regle('calc-taux', 80);
  await regle('calc-heures', 1.5);
  await page.waitForTimeout(300);
  const vu = await page.evaluate(() => ({
    montant: document.querySelector('.calc-montant-gain')?.textContent.replace(/\s/g, '') || '',
    operation: document.querySelector('.calc-operation')?.textContent.replace(/\s/g, '') || '',
    mentions: document.querySelector('.calc-mentions')?.textContent || '',
  }));
  /* 20 documents × 1,5 h × 80 € = 2 400 €. Le résultat est une multiplication
     de ce que le visiteur a saisi, et rien d'autre. */
  ok(/2400/.test(vu.montant), `20 doc × 1,5 h × 80 € → ${vu.montant} (attendu 2 400)`);
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

  /* ── UN SEUL BLOC ────────────────────────────────────────────────────────
     Le prix et le gain vivaient dans deux encarts que séparait un défilement.
     La comparaison entre les deux est TOUT l'argument, et elle ne se faisait
     jamais dans l'œil du visiteur : il fallait se souvenir du premier chiffre
     en lisant le second. Les redissocier annulerait la refonte sans qu'aucun
     autre contrôle ne s'en aperçoive. */
  const disposition = await page.evaluate(() => ({
    blocs: document.querySelectorAll('#pricing .conf').length,
    /* Le prix et le gain vivent dans la MÊME colonne de réponse : c'est là
       que la comparaison se fait, dans l'œil, sans mémoire. */
    ensemble: !!document.querySelector('.conf-reponse .conf-montant') && !!document.querySelector('.conf-reponse .calc-montant-gain'),
  }));
  ok(disposition.blocs === 1 && disposition.ensemble,
     `prix et gain dans la même colonne de réponse (${disposition.blocs} configurateur)`);
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

/* ═══════════════════════════════════════════════════════════════════════════
   6 · « TOUT CE QUE FAIT ALBA » — LA FENÊTRE S'OUVRE, ET SURTOUT SE FERME
   ═══════════════════════════════════════════════════════════════════════════
   Une fenêtre modale dont on ne sort pas au clavier est un piège : la
   tabulation part dans une page que le voile rend invisible, et il n'y a plus
   aucun moyen de savoir où l'on est. Les quatre sorties — Échap, le bouton
   « Fermer », le clic en dehors, et le retour du focus — sont éprouvées une
   par une, parce qu'aucune ne se déduit des autres.
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== la fenêtre « Tout ce que fait Alba » =====');
{
  const { ctx, page } = await ouvrirTarifs();
  const dialogue = () => page.evaluate(() => !!document.querySelector('[role="dialog"][aria-modal="true"]'));

  /* Une icône muette ne se dit pas. Le bouton porte son nom. */
  const bouton = await page.evaluate(() => {
    const b = document.querySelector('.fen-plus');
    return b && { nom: (b.getAttribute('aria-label') || b.textContent).trim(), popup: b.getAttribute('aria-haspopup') };
  });
  ok(bouton && /toutes les fonctionnalités|every feature/i.test(bouton.nom),
     `le « + » porte un nom — « ${bouton ? bouton.nom : 'BOUTON ABSENT'} »`);

  await page.click('.fen-plus');
  await page.waitForTimeout(400);

  const vue = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return null;
    const t = document.getElementById(d.getAttribute('aria-labelledby') || '');
    return {
      titre: t ? t.textContent.trim() : '',
      groupes: [...document.querySelectorAll('.fen-groupe-titre')].length,
      lignes: document.querySelectorAll('.fen-groupe li').length,
      focusDedans: d.contains(document.activeElement),
      /* La page derrière ne défile pas. */
      figee: getComputedStyle(document.body).overflow === 'hidden',
      /* AUCUN PRIX ici : ce n'est pas un tableau comparatif entre offres. */
      montants: (d.innerText.match(/\d[\d\s  ]*\s?€|€\s?\d/g) || []).length,
    };
  });
  ok(vue !== null, `role="dialog" aria-modal="true" à l'ouverture`);
  ok(vue && vue.titre.length > 0, `aria-labelledby désigne le titre — « ${vue ? vue.titre : ''} »`);
  /* Six groupes et trente lignes : la liste vient de l'application, et une
     troncature silencieuse (un groupe qui saute au refactor) ne se verrait
     pas autrement. */
  ok(vue && vue.groupes === 6 && vue.lignes === 30,
     `${vue ? vue.groupes : 0} groupes, ${vue ? vue.lignes : 0} lignes (attendu 6 et 30)`);
  ok(vue && vue.focusDedans, `le focus entre dans la fenêtre`);
  ok(vue && vue.figee, `la page derrière ne défile plus`);
  ok(vue && vue.montants === 0, `aucun montant dans la fenêtre (${vue ? vue.montants : '?'} trouvé(s))`);

  /* Le piège à focus : depuis le premier élément, Maj+Tab doit revenir au
     DERNIER de la fenêtre, et jamais sortir. */
  await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift');
  const boucle = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    const f = [...d.querySelectorAll('a[href], button:not([disabled])')];
    return d.contains(document.activeElement) && document.activeElement === f[f.length - 1];
  });
  ok(boucle, `Maj+Tab depuis le premier revient au dernier, sans sortir`);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const apres = await page.evaluate(() => ({
    fermee: !document.querySelector('[role="dialog"]'),
    focusRendu: document.activeElement && document.activeElement.classList.contains('fen-plus'),
    libre: (document.body.style.overflow || '') !== 'hidden',
  }));
  ok(apres.fermee, `Échap ferme`);
  /* Sans ça le focus retombe sur <body>, et la tabulation reprend au tout
     début de la page — on a perdu sa place. */
  ok(apres.focusRendu, `le focus revient au bouton qui a ouvert`);
  ok(apres.libre, `la page redéfile après fermeture`);

  await page.click('.fen-plus'); await page.waitForTimeout(300);
  await page.mouse.click(12, 12); await page.waitForTimeout(300);
  ok(await dialogue() === false, `un clic en dehors ferme`);

  /* Et un clic DEDANS ne ferme pas : le voile ne doit pas avaler les clics de
     la fenêtre elle-même. */
  await page.click('.fen-plus'); await page.waitForTimeout(300);
  await page.click('.fen-titre'); await page.waitForTimeout(250);
  ok(await dialogue() === true, `un clic dans la fenêtre ne la ferme pas`);

  const nomFermer = await page.evaluate(() => (document.querySelector('.fen-fermer') || {}).textContent);
  ok(nomFermer && /fermer|close/i.test(nomFermer), `le bouton de fermeture est nommé — « ${(nomFermer || '').trim()} »`);
  await page.evaluate(() => document.querySelector('.fen-fermer').click());
  await page.waitForTimeout(300);
  ok(await dialogue() === false, `le bouton « Fermer » ferme`);

  await ctx.close();
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
