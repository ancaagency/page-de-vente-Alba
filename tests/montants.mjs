/**
 * UN MONTANT, UN SEUL ENDROIT.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI CE CONTRÔLE EXISTE
 *
 * Le 9 septembre 2026, un relevé de TOUS les montants affichés par le site a
 * trouvé le même prix écrit à quatre endroits, dont trois faux :
 *
 *   · co-traitants.html, FR et EN : « 15 €/mois HT » par collaborateur, deux
 *     fois par langue. La grille était passée de 15 à 69, puis à 39 € ;
 *   · une réponse de FAQ : « L'offre Agence se facture 69 € HT par mois et par
 *     personne » — soit 276 € pour quatre au lieu de 186. Injectée en JSON-LD
 *     sur les DIX pages du site, donc candidate à l'affichage direct dans les
 *     résultats de recherche ;
 *   · les données structurées : « highPrice: 89 », le prix du palier 300 Go
 *     RETIRÉ DE LA VENTE, annoncé à Google longtemps après sa disparition.
 *
 * Aucune ne se signalait. Il n'y avait aucun lien entre la grille et ces
 * endroits : un composant React d'un côté, du HTML écrit à la main de l'autre,
 * du texte dans contenu.js au milieu. Ce n'est pas un défaut de vigilance —
 * c'est qu'un montant recopié finit toujours par mentir, et que le seul remède
 * est de l'écrire une fois.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * LA RÈGLE
 *
 * Un prix d'abonnement en euros ne s'affiche QUE sur /tarifs et /en-tarifs.
 * Partout ailleurs — accueil comprise, hors sa propre section tarifaire — on
 * décrit la règle et on renvoie vers la page de tarifs.
 *
 * Et sur la page de tarifs, chaque montant affiché doit se retrouver dans
 * tarifs.js, la source unique. Un prix qui n'en vient pas est un prix écrit
 * en dur quelque part : c'est exactement ce qu'on interdit.
 */
import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';
import { ROUTES } from '../outils/pages.mjs';
import { lireTarifs } from '../outils/offre-jsonld.mjs';
import fs from 'node:fs';
import path from 'node:path';

let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const TARIFS = lireTarifs();

/* Tous les montants que la grille autorise, périodicités et totaux compris.
   Les totaux sont calculés ici comme la page les calcule : si l'un des deux
   changeait de formule, les deux listes cesseraient de coïncider. */
const AUTORISES = new Set();
{
  const a = TARIFS.agence;
  AUTORISES.add(TARIFS.atelier.mois);
  AUTORISES.add(TARIFS.atelier.an);
  AUTORISES.add(Math.round(TARIFS.atelier.an / 12));
  for (let n = 1; n <= TARIFS.maxPersonnes; n++) {
    const mois = a.mois.premiere + a.mois.suivante * (n - 1);
    const an = a.an.premiere + a.an.suivante * (n - 1);
    AUTORISES.add(mois); AUTORISES.add(an); AUTORISES.add(Math.round(an / 12));
  }
  AUTORISES.add(a.mois.premiere); AUTORISES.add(a.mois.suivante);
  AUTORISES.add(a.an.premiere); AUTORISES.add(a.an.suivante);
}

/* Les montants qui ne sont PAS des prix d'abonnement et qui ont le droit de
   vivre ailleurs. Chacun est nommé, et c'est volontaire : une liste
   d'exceptions anonyme finit par tout absorber. */
const HORS_ABONNEMENT = [
  { motif: /€\s*\/\s*m²|€\/m²|€\s*\/\s*ml|€\/ml|€\/u\b/i, quoi: 'un prix de matériau dans la maquette' },
  { motif: /taux horaire|hourly rate/i, quoi: 'le taux horaire du calculateur' },
  /* Le capital social est une mention obligatoire de l'article R.123-238 du
     code de commerce. Ce n'est pas un prix, et il doit figurer exactement tel
     qu'il est déposé au greffe. */
  { motif: /capital social|share capital/i, quoi: 'le capital social, mention légale obligatoire' },
];

const srv = await demarrer(8954);
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const BASE = 'http://localhost:8954';
const PAGES_TARIFAIRES = new Set(['/tarifs', '/en-tarifs']);

/* ═══════════════════════════════════════════════════════════════════════════
   1 · AUCUN PRIX D'ABONNEMENT HORS DE LA PAGE DE TARIFS
   ═══════════════════════════════════════════════════════════════════════════
   L'accueil est le cas particulier : elle PORTE la section tarifaire (#pricing),
   qui est le même composant. On l'écarte du relevé, et rien d'autre.
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== les prix ne vivent que sur la page de tarifs =====');
for (const route of ROUTES) {
  if (PAGES_TARIFAIRES.has(route)) continue;
  const ctx = await navigateur.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(3000);

  const trouves = await page.evaluate(() => {
    /* La section tarifaire de l'accueil est le composant Pricing lui-même :
       ses montants viennent de la grille, ils sont légitimes. On la retire du
       texte mesuré plutôt que d'exempter la page entière — sinon un prix écrit
       en dur dans le pied de page de l'accueil passerait aussi.

       ON RETIRE DU DOM VIVANT, PAS D'UN CLONE. `innerText` rend le texte TEL
       QU'IL EST AFFICHÉ, sauts de ligne compris ; sur un nœud détaché il n'y a
       pas de mise en page, et il retombe silencieusement sur `textContent` —
       la page entière devient UNE ligne, et le moindre « € » quelque part fait
       correspondre tout le reste. Ce contrôle a accusé l'accueil pour cette
       seule raison, alors qu'elle n'affiche aucun prix hors de #pricing. Le
       contexte est fermé juste après : muter la page ici n'affecte rien. */
    document.querySelectorAll('#pricing').forEach((n) => n.remove());
    const textes = [
      ['corps', document.body.innerText],
      ['meta description', document.querySelector('meta[name=description]')?.content || ''],
      ['og:description', document.querySelector('meta[property="og:description"]')?.content || ''],
      ['title', document.title],
      ['JSON-LD', [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).join('\n')],
    ];
    const out = [];
    for (const [ou, texte] of textes) {
      if (!texte) continue;
      const lignes = texte.split('\n');
      for (let k = 0; k < lignes.length; k++) {
        const ligne = lignes[k];
        /* Le libelle et sa valeur ne sont pas toujours sur la meme ligne : les
           mentions legales sont une liste de definitions, ou « Capital social »
           est un <dt> et « 1 000 € » le <dd> qui suit. Une exception qui ne
           regarde que la ligne du montant ne voit jamais ce qui le nomme. */
        const contexte = ((lignes[k - 1] || '') + ' ' + ligne).trim();
        /* « 49 € », « €49 », « 1 836 € », « €1,000 » — les ecritures du site,
           espaces fines et insecables comprises. */
        const m = ligne.match(/(?:€\s?\d[\d\s\u202f\u00a0,]*|\d[\d\s\u202f\u00a0,]*\s?€)/g);
        if (m) out.push({ ou, ligne: ligne.trim().slice(0, 130), contexte: contexte.slice(0, 200), montants: m });
      }
    }
    return out;
  });

  /* L'exception se juge sur le CONTEXTE — la ligne et celle qui la precede —
     et non sur la seule ligne du montant. */
  const fautifs = trouves.filter((t) => !HORS_ABONNEMENT.some((h) => h.motif.test(t.contexte)));
  ok(fautifs.length === 0,
     `${route.padEnd(24)} ${fautifs.length === 0 ? 'aucun prix affiché' : 'PRIX TROUVÉ — ' + fautifs.map((f) => `(${f.ou}) « ${f.ligne} »`).join(' · ')}`);
  await ctx.close();
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · SUR LA PAGE DE TARIFS, CHAQUE MONTANT VIENT DE LA GRILLE
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== et sur la page de tarifs, ils viennent tous de tarifs.js =====');
for (const route of PAGES_TARIFAIRES) {
  for (const annuel of [false, true]) {
    const ctx = await navigateur.newContext({ viewport: { width: 1280, height: 1200 } });
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 40000 });
    await page.waitForSelector('.tarif-carte', { timeout: 20000 });
    await page.waitForTimeout(700);
    if (annuel) {
      await page.evaluate(() => document.querySelectorAll('.tarif-bascule-btn')[1].click());
      await page.waitForTimeout(300);
    }
    /* Toutes les tailles d'équipe, pour balayer les totaux dégressifs. */
    const vus = new Set();
    for (let n = 1; n <= TARIFS.maxPersonnes; n++) {
      await page.evaluate((k) => {
        const b = [...document.querySelectorAll('.calc-bouton')].find((x) => x.textContent.trim() === String(k));
        if (b) b.click();
      }, n);
      await page.waitForTimeout(200);
      const m = await page.evaluate(() => {
        /* On ne mesure QUE ce que le site affirme : les cartes et la ligne de
           prix du calculateur. `.calc-entree` porte les curseurs — taux
           horaire, nombre de documents — dont les valeurs sont les HYPOTHESES
           DU VISITEUR, et `.calc-ligne-gain` en est le produit. Les compter
           reviendrait a reprocher au site d'afficher ce que son lecteur vient
           lui-meme de saisir. */
        const bloc = document.querySelector('#pricing').cloneNode(true);
        bloc.querySelectorAll('.calc-entree, .calc-ligne-gain').forEach((n) => n.remove());
        /* Le clone ne pose pas ici le probleme rencontre sur le corps entier :
           on ne decoupe pas en lignes, on releve des montants dans tout le
           texte, et `textContent` suffit a ca. */
        /* Le motif est ECRIT ICI, pas passe depuis le fichier : ce corps
           s'execute DANS LE NAVIGATEUR, ou les constantes du module
           n'existent pas. */
        return (bloc.textContent.match(/\d[\d\s\u202f\u00a0]*(?=\s?\u20ac)/g) || [])
          .map((x) => Number(x.replace(/[\s\u202f\u00a0]/g, '')));
      });
      m.forEach((x) => vus.add(x));
    }
    const intrus = [...vus].filter((x) => !AUTORISES.has(x));
    ok(intrus.length === 0,
       `${route.padEnd(12)} ${annuel ? 'annuel ' : 'mensuel'} — ${vus.size} montant(s) affiché(s)${intrus.length ? `, HORS GRILLE : ${intrus.join(', ')}` : ', tous dans la grille'}`);
    await ctx.close();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · LES DONNÉES STRUCTURÉES SUIVENT LA GRILLE ET LA LANGUE
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== les données structurées =====');
{
  for (const [fichier, lang] of [['index.html', 'fr'], ['en.html', 'en']]) {
    const html = fs.readFileSync(path.join(ROOT, fichier), 'utf8');
    const bloc = html.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"SoftwareApplication"[\s\S]*?)<\/script>/);
    const d = JSON.parse(bloc[1]);
    const o = d.offers || {};
    /* 89 € était le palier 300 Go, retiré de la vente. Le contrôle ne teste pas
       « pas 89 » — il teste que les bornes SONT celles de la grille, ce qui
       couvre aussi le prochain prix qu'on retirera. */
    const bornes = o.lowPrice === '0' && o.highPrice === String(TARIFS.agence.mois.premiere);
    ok(bornes, `${fichier.padEnd(11)} AggregateOffer ${o.lowPrice} € → ${o.highPrice} € (grille : 0 → ${TARIFS.agence.mois.premiere})`);
    const prix = (o.offers || []).map((x) => Number(x.price ?? x.priceSpecification?.price));
    ok(prix.every((p) => p === 0 || AUTORISES.has(p)),
       `${fichier.padEnd(11)} les ${prix.length} offres détaillées viennent de la grille (${prix.join(', ')})`);

    /* La FAQPage a servi en FRANÇAIS sur les cinq pages anglaises. */
    const faq = html.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?)<\/script>/);
    const f = JSON.parse(faq[1]);
    const attendue = lang === 'en' ? 'en-GB' : 'fr-FR';
    ok(f.inLanguage === attendue, `${fichier.padEnd(11)} FAQPage annoncée en « ${f.inLanguage} » (attendu ${attendue})`);
    /* Et le contenu suit vraiment, pas seulement l'étiquette. */
    const premiere = f.mainEntity[0].name;
    const francaise = /[àâéèêëîïôùûç]|Que comprend|Comment/.test(premiere);
    ok(lang === 'fr' ? francaise : !francaise,
       `${fichier.padEnd(11)} et son texte l'est aussi — « ${premiere.slice(0, 52)} »`);
  }
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
