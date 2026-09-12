/**
 * Régénère le bloc `offers` des données structurées SoftwareApplication à
 * partir de tarifs.js.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Ce bloc a été écrit une fois, à la main, et n'a plus jamais bougé :
 *
 *     "lowPrice": "49", "highPrice": "89", "offerCount": "3"
 *
 * 89 €, c'était le palier 300 Go — une offre RETIRÉE DE LA VENTE. Elle a
 * continué d'être annoncée à Google pendant tout le temps où elle n'existait
 * plus, sur / et sur /en. Et 49 € était faux dans l'autre sens : l'offre
 * d'entrée est gratuite.
 *
 * Personne ne relit un JSON-LD. C'est précisément pour ça qu'il ne doit pas
 * être écrit à la main : une donnée structurée périmée peut faire afficher un
 * prix mort directement dans les résultats de recherche, là où le visiteur le
 * lit AVANT d'arriver sur la page qui le dément.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QUE lowPrice ET highPrice DÉSIGNENT ICI
 *
 * Le prix d'ENTRÉE de chacune des trois offres, c'est-à-dire exactement ce que
 * les trois cartes affichent : 0 €, 49 €, « à partir de 69 € ».
 *
 * Ce n'est pas le total qu'un cabinet de quatre personnes paiera (186 €). Un
 * siège supplémentaire est une quantité qu'on ajoute à une offre, pas une
 * quatrième offre — et annoncer 186 € comme borne haute laisserait croire que
 * l'offre Agence coûte ça pour tout le monde. On annonce ce qui est affiché,
 * et le détail dégressif est sur la page, à un clic.
 *
 * Les montants MENSUELS servent de bornes : c'est la périodicité par défaut de
 * la page, et celle qu'un visiteur compare à un concurrent.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const SITE = 'https://alba-studio.co';
const DEBUT = '<!-- OFFRE-JSONLD:DEBUT — dérivé de tarifs.js, ne pas modifier à la main -->';
const FIN = '<!-- OFFRE-JSONLD:FIN -->';

/** Lit tarifs.js sans l'exécuter dans le contexte global — comme contenu.js. */
export function lireTarifs() {
  const src = fs.readFileSync(path.join(ROOT, 'tarifs.js'), 'utf8');
  const bac = {};
  new Function('window', src)(bac);
  if (!bac.ALBA_TARIFS) throw new Error('tarifs.js ne définit pas window.ALBA_TARIFS');
  return bac.ALBA_TARIFS;
}

/** Une offre payante, avec sa périodicité dite explicitement. */
const abonnement = (nom, prix, url) => ({
  '@type': 'Offer',
  name: nom,
  priceCurrency: 'EUR',
  url,
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: String(prix),
    priceCurrency: 'EUR',
    /* Sans ça, « 49 » ne dit pas s'il s'agit d'un mois, d'un an ou d'un achat
       unique. `MON` est le code UN/CEFACT du mois. */
    billingIncrement: 1,
    unitCode: 'MON',
  },
});

export function offres(tarifs = lireTarifs()) {
  const url = `${SITE}/tarifs`;
  const bas = 0;                                   // Découverte est gratuite
  const haut = tarifs.agence.mois.premiere;        // le prix d'entrée le plus élevé
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: String(bas),
    highPrice: String(haut),
    offerCount: '3',
    url,
    offers: [
      { '@type': 'Offer', name: 'Découverte', price: '0', priceCurrency: 'EUR', url },
      abonnement('Atelier', tarifs.atelier.mois, url),
      abonnement('Agence', tarifs.agence.mois.premiere, url),
    ],
  };
}

/**
 * Remplace le bloc SoftwareApplication d'un HTML par le même, `offers` refait.
 * Le reste du bloc — description, éditeur, catégorie — est écrit à la main dans
 * la page et n'est pas touché : seuls les montants sont dérivés.
 */
export function injecter(html) {
  const i = html.indexOf(DEBUT);
  let avant = html;
  let debut = i;
  let fin = -1;

  if (i !== -1) {
    fin = html.indexOf(FIN, i) + FIN.length;
  } else {
    /* Première exécution : on retrouve le bloc écrit à la main. */
    const m = html.match(/\s*<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"SoftwareApplication"[\s\S]*?<\/script>/);
    if (!m) return html;                            // page sans SoftwareApplication
    debut = m.index;
    fin = m.index + m[0].length;
  }

  const brut = avant.slice(debut, fin).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const donnees = JSON.parse(brut[1]);
  donnees.offers = offres();
  const bloc = `${DEBUT}\n  <script type="application/ld+json">${JSON.stringify(donnees)}</script>\n  ${FIN}`;
  return avant.slice(0, debut) + (i === -1 ? '\n  ' : '') + bloc + avant.slice(fin);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = lireTarifs();
  const o = offres(t);
  console.log(`AggregateOffer : ${o.lowPrice} € → ${o.highPrice} € HT/mois, ${o.offerCount} offres — dérivé de tarifs.js`);
}
