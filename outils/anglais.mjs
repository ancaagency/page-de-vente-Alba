/**
 * Engendre les pages anglaises, et les liens réciproques entre les deux langues.
 *
 *     node outils/anglais.mjs             écrit en.html et en-tarifs.html
 *     node outils/anglais.mjs --verifier  n'écrit rien ; échoue si elles ont dérivé
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI
 *
 * Le site était bilingue depuis le début, et l'anglais n'existait pour personne.
 * Le choix de langue vivait dans localStorage : UNE seule adresse servait les
 * deux versions. Or un moteur de recherche indexe des ADRESSES. Tout le texte
 * anglais — la page entière, la grille tarifaire, la FAQ — était invisible à la
 * recherche. Personne ne pouvait tomber sur ce site en cherchant en anglais.
 *
 * Une langue sans adresse n'est pas une langue publiée. C'est une préférence
 * d'affichage.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI /en ET NON /en/
 *
 * `/en/` est plus joli. Il est aussi nettement plus risqué ici, et le risque ne
 * vaut pas la beauté.
 *
 * Toutes les adresses de ce site sont RELATIVES : « images/villa.jpg »,
 * « styles.css », « page-accueil.js ». Certaines sont écrites dans le HTML,
 * d'autres CONSTRUITES par le script à l'exécution — <Photo> assemble
 * « images/derivees/villa-1000.avif », image-slot.js fait de même. Depuis
 * `/en/`, toutes se résoudraient en `/en/images/…` : la page se chargerait sans
 * feuille de style, sans image, sans script.
 *
 * On pourrait tout passer en adresses absolues. On pourrait poser un
 * <base href="/">, mais il redirigerait aussi les ancres internes : depuis
 * `/en/`, un clic sur « #faq » emmènerait vers l'accueil FRANÇAIS.
 *
 * `/en` est un fichier à la racine, servi sans extension par Cloudflare Pages
 * exactement comme /tarifs l'est par Tarifs.html. Les adresses relatives s'y
 * résolvent depuis la racine, comme sur `/`. Rien à réécrire, rien à casser.
 * Le référencement n'y perd rien : le hreflang est explicite, et Google se
 * moque de la forme de l'adresse.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QUE CE SCRIPT ÉCRIT
 *
 *   · en.html et en-tarifs.html : copie de la page française, entête traduite,
 *     canonique propre, et les liens de la barre de navigation pointés vers les
 *     adresses anglaises ;
 *   · dans les QUATRE fichiers, les balises <link rel="alternate" hreflang>.
 *     Elles doivent être RÉCIPROQUES : une page qui déclare une alternative
 *     sans que celle-ci lui rende la pareille est ignorée par Google. C'est la
 *     première cause d'un hreflang qui ne sert à rien, et c'est justement le
 *     genre de détail qu'on ne peut pas vérifier à l'œil sur quatre fichiers.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DEUX NATURES DE PAGES ANGLAISES, ET C'EST VOULU
 *
 *   · ENGENDRÉES (en.html, en-tarifs.html) — leur corps vient de React, traduit
 *     à l'exécution par Txt() et L(). Le fichier entier est donc produit ici à
 *     partir du français : on ne le modifie jamais à la main, et le vérificateur
 *     signale toute dérive.
 *
 *   · TRADUITES (en-co-traitants.html, en-valeur-probante.html,
 *     en-mentions-legales.html) — leur corps est de la PROSE, écrite directement
 *     en HTML. Aucun outil ne traduit de la prose sans la trahir : ces pages
 *     sont donc de vraies sources, tenues à la main. Ce script n'y touche qu'à
 *     l'entête — canonique, alternatives, langue — parce que c'est la partie
 *     mécanique, et celle qu'on oublie.
 *
 * La distinction n'est pas de la paresse : elle place la frontière là où elle
 * doit être. Ce qui se déduit est déduit ; ce qui demande un jugement reste
 * écrit. tests/langues.mjs vérifie que les traduites n'ont pas divergé de leur
 * jumelle sur ce qui est vérifiable — nombre de sections, de titres, de liens.
 *
 * Le corps des ENGENDRÉES n'est pas traduit ici : il l'est à l'exécution, et
 * figé par outils/prerendre.mjs qui prérend chaque page à son adresse. C'est
 * pour cela que ce script doit tourner AVANT le prérendu.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const SITE = 'https://www.alba-studio.co';

const DEBUT = '<!-- ANGLAIS:DEBUT — produit par outils/anglais.mjs, ne pas modifier -->';
const FIN = '<!-- ANGLAIS:FIN -->';

/* Chaque paire : le fichier français, le fichier anglais, et ce qui change dans
   l'entête. Les titres et descriptions anglais sont ÉCRITS ICI parce qu'ils
   n'existent nulle part ailleurs : le corps de la page est traduit par Txt(),
   mais <title> et <meta name="description"> sont hors du rendu React. */
export const PAIRES = [
  {
    fr: 'index.html',
    en: 'en.html',
    routeFr: '/',
    routeEn: '/en',
    titre: 'The Platform for Demanding Architects - Alba Studio',
    description:
      'ALBA Studio brings projects, decisions, documents and messages together for independent architects and small practices. Your first project is free.',
    ogTitre: 'The Platform for Demanding Architects - Alba Studio',
    ogDescription:
      'Centralise your projects. Simplify client exchanges. The all-in-one platform for architects.',
  },
  {
    fr: 'Tarifs.html',
    en: 'en-tarifs.html',
    routeFr: '/tarifs',
    routeEn: '/en-tarifs',
    /* Exactement ce que page-tarifs.jsx écrit dans document.title à
       l'exécution — cadratin compris. Le titre servi aux robots et le titre
       affiché doivent être le MÊME : sinon le bon tient jusqu'au premier rendu
       puis se dégrade, sans que rien ne le signale. tests/langues.mjs compare
       les deux, et c'est lui qui a relevé l'écart. */
    titre: 'Pricing — ALBA Studio',
    description:
      'One all-inclusive subscription per practice: storage, unlimited projects, unlimited guests. Seats billed per collaborator. No commitment.',
    ogTitre: 'Pricing — ALBA Studio',
    ogDescription: 'One all-inclusive subscription per practice. No commitment.',
  },

  /* ── LES TROIS PAGES ÉDITORIALES ────────────────────────────────────────
     Leur corps est de la prose : il vit dans traductions/ et remplace le
     <main> français. Tout le reste — barre, pied de page, scripts, entête —
     reste déduit de la page française, ce qui interdit aux deux versions de
     diverger sur la structure. */
  {
    fr: 'co-traitants.html',
    en: 'en-co-traitants.html',
    corps: 'traductions/co-traitants.en.html',
    routeFr: '/co-traitants',
    routeEn: '/en-co-traitants',
    titre: 'Consultants & clients — ALBA Studio',
    description:
      'An architect invited you to a project on ALBA. No account to create, no subscription, nothing to install. What you can do, and what becomes of what you upload.',
    ogTitre: 'An architect invited you. It costs you nothing.',
    ogDescription: 'Guests are free and unlimited on ALBA Studio. Here is exactly what that means.',
  },
  {
    fr: 'valeur-probante.html',
    en: 'en-valeur-probante.html',
    corps: 'traductions/valeur-probante.en.html',
    routeFr: '/valeur-probante',
    routeEn: '/en-valeur-probante',
    titre: 'Evidential value — ALBA Studio',
    description:
      'What ALBA keeps with every decision, what an eIDAS simple signature is worth, what it is not worth, and why ten years is the real horizon.',
    ogTitre: 'A decision made by phone, disputed a year later.',
    ogDescription: 'What ALBA Studio keeps, what it is worth — and what it is not worth.',
  },
  {
    fr: 'mentions-legales.html',
    en: 'en-mentions-legales.html',
    corps: 'traductions/mentions-legales.en.html',
    routeFr: '/mentions-legales',
    routeEn: '/en-mentions-legales',
    titre: 'Legal notice — ALBA Studio',
    description: 'Publisher, hosting, intellectual property, personal data and cookies for the ALBA Studio site.',
    ogTitre: 'Legal notice — ALBA Studio',
    ogDescription: 'Publisher, hosting, personal data and cookies.',
  },
];

/* Libellés de la barre de navigation et du pied de page qui sont du HTML
   STATIQUE sur les pages éditoriales. Sur l'accueil et les tarifs, React les
   traduit à l'exécution ; ici personne ne le fait, et une page anglaise gardait
   une barre française. Ce sont des libellés fermés, pas de la prose : les
   traduire par correspondance est exact, et l'oubli est garanti autrement. */
const LIBELLES_NAV = [
  ['>Fonctionnalités<', '>Features<'],
  ['>Pour qui ?<', '>Who it is for<'],
  ['>Notre vision<', '>Our vision<'],
  ['>Tarif<', '>Pricing<'],
  ['>Se connecter<', '>Log in<'],
  ['>Essayer gratuitement<', '>Try for free<'],
];

/** Remplace le contenu d'une balise simple, ou signale son absence. */
function remplacerBalise(html, motif, remplacement, quoi, fichier) {
  if (!motif.test(html)) throw new Error(`${fichier} : ${quoi} introuvable`);
  return html.replace(motif, remplacement);
}

/**
 * Le bloc des alternatives, identique dans les quatre fichiers d'une paire.
 * `x-default` désigne la version servie à qui ne correspond à aucune langue
 * déclarée : c'est le français, puisque c'est le marché.
 */
function blocAlternatives(routeFr, routeEn) {
  return [
    DEBUT,
    '  <!-- Les deux langues se déclarent mutuellement. La réciprocité n\'est pas',
    '       une politesse : une page qui déclare une alternative sans que celle-ci',
    '       lui rende la pareille est purement ignorée. -->',
    `  <link rel="alternate" hreflang="fr" href="${SITE}${routeFr}">`,
    `  <link rel="alternate" hreflang="en" href="${SITE}${routeEn}">`,
    `  <link rel="alternate" hreflang="x-default" href="${SITE}${routeFr}">`,
    `  ${FIN}`,
  ].join('\n');
}

/** Retire un bloc d'alternatives existant, pour que l'opération soit idempotente. */
function sansAlternatives(html) {
  const i = html.indexOf(DEBUT);
  if (i === -1) return html;
  const j = html.indexOf(FIN, i);
  let debut = i;
  while (debut > 0 && html[debut - 1] === ' ') debut--;
  let fin = j + FIN.length;
  while (fin < html.length && html[fin] === '\n') fin++;
  return html.slice(0, debut) + html.slice(fin);
}

/** Pose le bloc d'alternatives juste après la canonique. */
function avecAlternatives(html, routeFr, routeEn, fichier) {
  const propre = sansAlternatives(html);
  const m = propre.match(/^([ \t]*)<link rel="canonical"[^>]*>\n/m);
  if (!m) throw new Error(`${fichier} : <link rel="canonical"> introuvable`);
  const i = m.index + m[0].length;
  return propre.slice(0, i) + blocAlternatives(routeFr, routeEn) + '\n' + propre.slice(i);
}

/**
 * Retire l'instantané de prérendu, s'il y en a un.
 *
 * Ce script tourne AVANT outils/prerendre.mjs, et produit donc une page
 * anglaise sans instantané ; le prérendu l'y pose ensuite. Comparer le fichier
 * engendré au fichier sur disque n'a donc de sens qu'en écartant ce bloc des
 * deux côtés — sans quoi la vérification échouerait systématiquement, ce qui
 * revient à ne rien vérifier du tout.
 *
 * La logique est écrite ici plutôt qu'importée de prerendre.mjs, qui charge
 * Playwright au chargement du module : un contrôle de fichiers texte n'a pas à
 * dépendre d'un navigateur.
 */
export function sansPrerendu(html) {
  const i = html.indexOf('<!-- PRERENDU:DEBUT');
  if (i === -1) return html;
  const j = html.indexOf('<!-- PRERENDU:FIN -->');
  /* Les sauts de ligne posés autour des repères sont repris eux aussi, et un
     seul est réinséré. Sans cela, une page qui a déjà été prérendue et une page
     qui ne l'a jamais été ne donnent pas le même texte une fois l'instantané
     retiré — elles diffèrent d'une ligne vide, et la comparaison échoue à
     chaque exécution. Même normalisation que outils/prerendre.mjs, à dessein :
     c'est ce qui rend les deux fichiers comparables. */
  let debut = i;
  while (debut > 0 && html[debut - 1] === '\n') debut--;
  let fin = j + '<!-- PRERENDU:FIN -->'.length;
  while (fin < html.length && html[fin] === '\n') fin++;
  return html.slice(0, debut) + '\n' + html.slice(fin);
}

/** Construit la page anglaise à partir de la page française. */
export function versAnglais(htmlFr, paire) {
  const { en, routeFr, routeEn, titre, description, ogTitre, ogDescription } = paire;

  /* Le prérendu FRANÇAIS n'a rien à faire dans la page anglaise : prerendre.mjs
     y posera le rendu anglais. Le laisser afficherait du français au premier
     affichage, avant que React ne reprenne la main. */
  let h = sansPrerendu(htmlFr);

  h = remplacerBalise(h, /<html lang="fr">/, '<html lang="en">', '<html lang>', en);
  h = remplacerBalise(h, /<title>[\s\S]*?<\/title>/, `<title>${titre}</title>`, '<title>', en);
  h = remplacerBalise(h, /(<meta name="description" content=")[^"]*(">)/, `$1${description}$2`, 'description', en);
  h = remplacerBalise(h, /(<meta property="og:title" content=")[^"]*(">)/, `$1${ogTitre}$2`, 'og:title', en);
  h = remplacerBalise(h, /(<meta property="og:description" content=")[^"]*(">)/, `$1${ogDescription}$2`, 'og:description', en);
  h = remplacerBalise(h, /(<meta property="og:url" content=")[^"]*(">)/, `$1${SITE}${routeEn}$2`, 'og:url', en);
  h = h.replace(/(<meta property="og:locale" content=")[^"]*(">)/, '$1en_GB$2');
  h = remplacerBalise(h, /(<link rel="canonical" href=")[^"]*(">)/, `$1${SITE}${routeEn}$2`, 'canonical', en);

  /* Les liens de la barre de navigation et de la marque sont du HTML statique :
     ils ne passent pas par le rendu React, et pointeraient donc vers les pages
     françaises. Un anglophone quittait l'anglais au premier clic. */
  h = h.replace(/href="index\.html"/g, 'href="/en"');
  h = h.replace(/href="index\.html#/g, 'href="/en#');
  h = h.replace(/href="Tarifs\.html"/g, 'href="/en-tarifs"');
  /* Et les liens entre pages éditoriales, qui existent maintenant en anglais. */
  for (const autre of PAIRES) {
    if (!autre.corps) continue;
    h = h.replace(new RegExp(`href="/${autre.fr.replace('.html', '')}"`, 'g'), `href="${autre.routeEn}"`);
    h = h.replace(new RegExp(`href="${autre.fr}"`, 'g'), `href="${autre.routeEn}"`);
  }
  for (const [fr, en] of LIBELLES_NAV) h = h.split(fr).join(en);

  /* L'état actif de la bascule, dans le HTML SERVI. i18n.js le corrige à
     l'exécution, mais entre l'affichage du prérendu et l'exécution du script il
     y a un instant où la page anglaise montre « FR » en surbrillance. Un détail,
     sauf qu'il se voit à chaque chargement. */
  h = h.replace('<button data-lang="fr" class="is-active">FR</button>', '<button data-lang="fr">FR</button>');
  h = h.replace('<button data-lang="en">EN</button>', '<button data-lang="en" class="is-active">EN</button>');

  /* ── LA PROSE ─────────────────────────────────────────────────────────────
     Les pages éditoriales ne passent pas par React : leur texte est écrit
     directement en HTML, et aucun outil ne traduit de la prose sans la trahir.
     Leur corps anglais vit donc dans traductions/, et vient REMPLACER le
     <main> français ici. Tout le reste du fichier — barre, pied de page,
     scripts, entête — continue d'être déduit du français, ce qui garantit que
     les deux versions ne divergeront jamais sur la structure. */
  if (paire.corps) {
    const cheminCorps = path.join(ROOT, paire.corps);
    if (!fs.existsSync(cheminCorps)) throw new Error(`${en} : traduction absente — ${paire.corps}`);
    const anglais = fs.readFileSync(cheminCorps, 'utf8').trim();
    /* `<main>` NU NE SUFFIT PAS : mentions-legales.html porte
       `<main class="legal-wrap">`. Chercher la chaîne littérale y échouait, et
       le corps français serait resté en place — une page annoncée anglaise,
       canonique anglaise, hreflang anglais, contenu français. Le pire des
       trois cas : elle aurait été indexée. */
    const m = h.match(/<main\b[^>]*>/);
    const i = m ? m.index : -1;
    const j = h.indexOf('</main>');
    if (i === -1 || j === -1) throw new Error(`${paire.fr} : <main> introuvable`);
    h = h.slice(0, i) + anglais + h.slice(j + '</main>'.length);
  }

  h = avecAlternatives(h, routeFr, routeEn, en);

  return (
    h.replace(
      /^<!DOCTYPE html>/,
      '<!DOCTYPE html>\n<!-- ENGENDRÉ PAR outils/anglais.mjs À PARTIR DE ' +
        paire.fr +
        ' — NE PAS MODIFIER À LA MAIN.\n' +
        '     Toute correction se fait dans la page française, puis :\n' +
        '       node outils/anglais.mjs && node outils/prerendre.mjs -->',
    )
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = process.argv.includes('--verifier');
  let ecarts = 0;

  for (const paire of PAIRES) {
    const cheminFr = path.join(ROOT, paire.fr);
    const cheminEn = path.join(ROOT, paire.en);
    const htmlFr = fs.readFileSync(cheminFr, 'utf8');

    /* La page française reçoit le même bloc d'alternatives — c'est la moitié
       qu'on oublie, et sans elle le hreflang ne vaut rien. */
    const frAttendu = avecAlternatives(htmlFr, paire.routeFr, paire.routeEn, paire.fr);
    const enAttendu = versAnglais(frAttendu, paire);

    if (verifier) {
      const frBon = htmlFr === frAttendu;
      /* Des deux côtés SANS l'instantané : celui du fichier sur disque a été
         posé par le prérendu, après ce script. */
      const enBon = fs.existsSync(cheminEn)
        && sansPrerendu(fs.readFileSync(cheminEn, 'utf8')) === sansPrerendu(enAttendu);
      console.log(`   ${frBon ? '✅' : '❌'} ${paire.fr.padEnd(18)} alternatives ${frBon ? 'à jour' : 'ABSENTES OU PÉRIMÉES'}`);
      console.log(`   ${enBon ? '✅' : '❌'} ${paire.en.padEnd(18)} ${enBon ? 'à jour' : 'PÉRIMÉE — node outils/anglais.mjs'}`);
      if (!frBon) ecarts++;
      if (!enBon) ecarts++;
    } else {
      if (htmlFr !== frAttendu) fs.writeFileSync(cheminFr, frAttendu);
      /* On préserve l'instantané anglais déjà en place : le réécrire à vide
         obligerait à relancer le prérendu pour toute retouche d'entête, et une
         exécution isolée de ce script laisserait la page anglaise nue pour les
         robots jusqu'au prochain prérendu. */
      const ancien = fs.existsSync(cheminEn) ? fs.readFileSync(cheminEn, 'utf8') : '';
      const iA = ancien.indexOf('<!-- PRERENDU:DEBUT');
      const instantane = iA === -1 ? '' : ancien.slice(iA, ancien.indexOf('<!-- PRERENDU:FIN -->') + '<!-- PRERENDU:FIN -->'.length);
      let sortie = enAttendu;
      if (instantane) {
        const m = sortie.match(/(<(?:main|div)[^>]*id="app"[^>]*>)/);
        if (m) sortie = sortie.slice(0, m.index + m[0].length) + '\n' + instantane + '\n' + sortie.slice(m.index + m[0].length);
      }
      fs.writeFileSync(cheminEn, sortie);
      console.log(`   ${paire.en.padEnd(18)} ← ${paire.fr}   (${paire.routeEn})`);
    }
  }

  if (verifier) {
    console.log(ecarts ? `\n❌ ${ecarts} écart(s) : node outils/anglais.mjs` : `\n✅ les pages anglaises correspondent aux françaises`);
    process.exit(ecarts ? 1 : 0);
  }
  console.log(`\n${PAIRES.length} pages anglaises engendrées, alternatives posées des deux côtés.`);
}
