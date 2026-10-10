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
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QUE LES TROIS PREMIERS CONTRÔLES NE VOYAIENT PAS
 *
 * Ils mesurent la page TELLE QU'ELLE S'AFFICHE. Or chaque texte de la page
 * existe en DEUX exemplaires : l'entrée de contenu.js, et le littéral écrit
 * dans le .jsx qui sert de repli si contenu.js ne se charge pas. La réponse de
 * FAQ ci-dessus a été corrigée dans contenu.js — et son repli, dans
 * sections.jsx, a continué de porter « 69 € HT par mois et par personne »
 * pendant un mois. Invisible à l'écran, invisible à ces contrôles, et prêt à
 * réapparaître exactement le jour où quelque chose casse.
 *
 * Un filet de sécurité qui rattrape la panne en remettant l'erreur d'origine
 * n'est pas un filet. D'où le quatrième contrôle : AUCUN MONTANT EN EUROS DANS
 * UN TEXTE ÉDITABLE, ni dans contenu.js, ni dans un repli Txt(). Les montants
 * de la page de tarifs ne sont pas des textes : ils sont composés à partir de
 * tarifs.js au moment de l'affichage.
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
/* Deux décimales, parce qu'un TTC en a : 58,8 et 58.80 doivent tomber sur la
   même valeur, et 49 × 1,2 vaut 58.800000000000004 en binaire. */
const sou = (n) => Math.round(n * 100) / 100;
{
  const a = TARIFS.agence;
  /* Les offres à palier fixe se parcourent, elles ne se nomment pas une par
     une : cette liste énumérait Atelier seul, et le jour où Atelier+ est né
     elle a continué de n'en connaître qu'une — 59 € serait passé pour un
     intrus, ou pire, aurait été ajouté à la main ici en recopiant le chiffre
     que ce fichier existe précisément pour ne pas recopier. */
  for (const o of [TARIFS.atelier, TARIFS.atelierPlus]) {
    AUTORISES.add(o.mois);
    AUTORISES.add(o.an);
    AUTORISES.add(Math.round(o.an / 12));
  }
  for (let n = 1; n <= TARIFS.maxPersonnes; n++) {
    const mois = a.mois.premiere + a.mois.suivante * (n - 1);
    const an = a.an.premiere + a.an.suivante * (n - 1);
    AUTORISES.add(mois); AUTORISES.add(an); AUTORISES.add(Math.round(an / 12));
  }
  AUTORISES.add(a.mois.premiere); AUTORISES.add(a.mois.suivante);
  AUTORISES.add(a.an.premiere); AUTORISES.add(a.an.suivante);
  /* Le TTC de chacun. La page l'affiche à côté du grand chiffre (« soit
     58,80 € TTC en France ») : c'est un montant dérivé, pas un montant écrit,
     et le taux vient de la grille comme le reste. Sans cette ligne, le
     contrôle accuserait la page d'afficher un prix hors grille — alors qu'il
     n'en existe aucun autre. */
  for (const n of [...AUTORISES]) AUTORISES.add(sou(n * (1 + TARIFS.tva)));
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
    await page.waitForSelector('.conf', { timeout: 20000 });
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
      const m = await page.evaluate((anglais) => {
        /* On ne mesure QUE ce que le site affirme : les cartes et la ligne de
           prix du calculateur. `.calc-entree` porte les curseurs — taux
           horaire, nombre de documents — dont les valeurs sont les HYPOTHESES
           DU VISITEUR, et `.calc-ligne-gain` en est le produit. Les compter
           reviendrait a reprocher au site d'afficher ce que son lecteur vient
           lui-meme de saisir. */
        const bloc = document.querySelector('#pricing').cloneNode(true);
        bloc.querySelectorAll('.conf-questions, .conf-leo').forEach((n) => n.remove());
        /* Le clone ne pose pas ici le probleme rencontre sur le corps entier :
           on ne decoupe pas en lignes, on releve des montants dans tout le
           texte, et `textContent` suffit a ca. */
        /* Le motif est ECRIT ICI, pas passe depuis le fichier : ce corps
           s'execute DANS LE NAVIGATEUR, ou les constantes du module
           n'existent pas.

           LES DEUX ORDRES ET LES DEUX SEPARATEURS. Le motif ne reconnaissait
           que "49 EUR" avec l'euro APRES le nombre, comme en francais. La
           ligne TTC anglaise s'ecrit euro devant et point decimal : elle
           n'etait donc pas relevee du tout sur /en-tarifs, et le controle
           affirmait verifier une page dont il ne lisait pas les montants. Les
           centimes comptent aussi : sans eux, "58,80" se lisait "80".

           LA VIRGULE N'A PAS LE MEME SENS DANS LES DEUX LANGUES : "1,836"
           est mille huit cent trente-six en anglais et un virgule huit cent
           trente-six en francais. On ne devine pas, on sait de quelle page il
           s'agit - la langue est passee en argument. */
        /* UN NOMBRE NE TRAVERSE PAS UNE FIN DE PHRASE. Ecrit large
           ("chiffres, espaces, virgules et points"), le motif collait la
           reponse au prix : dans textContent, "For a team of 2." touche
           "108 EUR" sans espace, et on relevait un montant de 2,108 qui
           n'existe nulle part. La forme est donc dite exactement : des
           milliers par groupes de trois, et au plus deux decimales. */
        const NOMBRE = '\\d{1,3}(?:[\\s\\u202f\\u00a0,]\\d{3})*(?:[.,]\\d{1,2})?|\\d+';
        const motif = new RegExp(`(?:\u20ac\\s?(${NOMBRE})|(${NOMBRE})\\s?\u20ac)`, 'g');
        const out = [];
        for (const m of bloc.textContent.matchAll(motif)) {
          const brut = (m[1] ?? m[2]).replace(/[\s\u202f\u00a0]/g, '');
          const nombre = anglais ? brut.replace(/,/g, '') : brut.replace(/\./g, '').replace(',', '.');
          out.push(Math.round(Number(nombre) * 100) / 100);
        }
        return out;
      }, route.startsWith('/en'));
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
    /* `offerCount` était écrit « 3 » à la main. Il a continué d'annoncer trois
       offres à Google le jour où la quatrième est née : un compte qui ne se
       déduit pas de ce qu'il compte finit toujours par compter faux. */
    ok(o.offerCount === String(prix.length),
       `${fichier.padEnd(11)} offerCount annonce ${o.offerCount} offre(s), la liste en contient ${prix.length}`);

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

/* ═══════════════════════════════════════════════════════════════════════════
   4 · AUCUN MONTANT DANS UN TEXTE ÉDITABLE — NI DANS SON REPLI
   ═══════════════════════════════════════════════════════════════════════════
   Les trois contrôles précédents lisent la page affichée. Ils ne voient donc
   QUE la couche gagnante : contenu.js. Le littéral du .jsx, lui, ne s'affiche
   que le jour où contenu.js tombe — c'est-à-dire le jour où personne ne
   regarde. C'est là que « 69 € HT par mois et par personne » a survécu un mois
   après sa correction.

   Aucun navigateur ici : on lit les fichiers. Un contrôle qui coûte trente
   millisecondes n'a aucune raison d'être rare.
   ═══════════════════════════════════════════════════════════════════════════ */
console.log('\n===== aucun montant dans un texte éditable =====');
{
  /* Un montant, dans les deux ordres et les deux langues. */
  const MONTANT = /\d[\d\s  .,]*\s?€|€\s?\d/;

  /* Retire commentaires de ligne et de bloc SANS casser les chaînes : un
     commentaire qui cite le prix fautif pour expliquer pourquoi il ne doit pas
     revenir — il y en a trois dans ce dépôt — ferait échouer le contrôle, et
     la réaction serait de supprimer l'explication. */
  const sansCommentaires = (src) => {
    let out = '';
    for (let i = 0; i < src.length; i++) {
      const c = src[i], d = src[i + 1];
      if (c === '/' && d === '/') { while (i < src.length && src[i] !== '\n') i++; out += '\n'; continue; }
      if (c === '/' && d === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++; i++; continue; }
      if (c === '"' || c === "'" || c === '`') {
        out += c;
        for (i++; i < src.length; i++) {
          out += src[i];
          if (src[i] === '\\') { out += src[++i]; continue; }
          if (src[i] === c) break;
        }
        continue;
      }
      out += c;
    }
    return out;
  };

  /** Chaque appel Txt(…) d'un fichier, parenthèses équilibrées. */
  const appelsTxt = (src) => {
    const out = [];
    for (let i = src.indexOf('Txt('); i !== -1; i = src.indexOf('Txt(', i + 1)) {
      if (i > 0 && /[A-Za-z0-9_$.]/.test(src[i - 1])) continue;   // pas `MonTxt(`
      let niveau = 0, q = null, j = i + 3;
      for (; j < src.length; j++) {
        const c = src[j];
        if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '(') niveau++;
        else if (c === ')') { niveau--; if (niveau === 0) { j++; break; } }
      }
      out.push(src.slice(i, j));
    }
    return out;
  };

  const FICHIERS = fs.readdirSync(ROOT).filter((f) => f.endsWith('.jsx')).sort();
  const coupables = [];
  for (const f of FICHIERS) {
    const src = sansCommentaires(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    for (const appel of appelsTxt(src)) {
      if (MONTANT.test(appel)) coupables.push(`${f} — ${appel.replace(/\s+/g, ' ').slice(0, 110)}`);
    }
  }
  ok(coupables.length === 0,
     `les replis du code ne portent aucun montant${coupables.length ? ` — ${coupables.join(' · ')}` : ` (${FICHIERS.length} fichiers .jsx relus)`}`);

  /* Et la couche de contenu, qui est éditable à la main et donc tout aussi
     capable de figer un prix. */
  const bac = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'contenu.js'), 'utf8'))(bac);
  const entrees = Object.entries(bac.ALBA_CONTENU || {});
  const figes = entrees.filter(([, v]) => MONTANT.test(v.fr || '') || MONTANT.test(v.en || ''));
  ok(figes.length === 0,
     `contenu.js ne porte aucun montant${figes.length ? ` — ${figes.map(([c]) => c).join(', ')}` : ` (${entrees.length} entrées relues)`}`);
}

await navigateur.close();
srv.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
