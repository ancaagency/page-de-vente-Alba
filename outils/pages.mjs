/**
 * LES PAGES DU SITE — source unique de vérité.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI CE FICHIER EXISTE
 *
 * Cette liste était recopiée DIX FOIS, dans six fichiers de test :
 *
 *     ['/', '/tarifs', '/mentions-legales.html']
 *
 * Tant qu'il n'y avait que trois pages, personne n'en souffrait. Mais ajouter
 * une page voulait dire retrouver ces dix endroits — et en oublier un, ce
 * n'est pas un test qui échoue, c'est un test qui NE REGARDE PAS. La page
 * partirait en production sans ancre vérifiée, sans icône vérifiée, sans
 * contrôle de traceurs, et tout serait vert.
 *
 * C'est la même erreur que celle qui a laissé des ancres mortes pendant des
 * semaines : un composant partagé voyage, et ce qu'on ne pense pas à regarder
 * ne se signale jamais tout seul.
 *
 * Ce fichier n'a AUCUNE dépendance, volontairement : il est importé aussi bien
 * par les outils qui pilotent un navigateur que par les contrôles qui se
 * contentent de lire des fichiers.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * AJOUTER UNE PAGE
 *
 * Ajoutez son entrée ici, et rien d'autre côté contrôles : la prérendre, les
 * ancres, les icônes, les traceurs, les bibliothèques et la bascule de langue
 * la prendront d'office.
 *
 * Restent quatre gestes qu'aucun code ne peut deviner à votre place :
 *   · la règle d'adresse dans `_redirects` (route jolie → fichier) ;
 *   · l'entrée dans `sitemap.xml` ;
 *   · la balise `<link rel="canonical">` de la page ;
 *   · le lien depuis le pied de page, sans quoi personne n'y arrivera jamais.
 *
 * ⚠️ `route` EST L'ADRESSE QUE LE VISITEUR DEMANDE, PAS LE NOM DU FICHIER.
 *
 * Les trois pages éditoriales portaient ici « /co-traitants.html » alors que le
 * canonique, le hreflang, le plan du site et les liens du pied de page disent
 * tous « /co-traitants ». Cloudflare Pages sert le fichier à l'adresse SANS
 * extension et renvoie l'autre en 301 : l'adresse listée ici n'était donc
 * demandée par personne — ni visiteur, ni robot.
 *
 * Ça n'a pas fait que fausser des contrôles. La politique de cache est dérivée
 * de cette liste : les règles ont été posées sur « /co-traitants.html », et les
 * trois adresses réellement servies sont restées SANS règle de cache. Le
 * garde-fou censé empêcher exactement ça était aveugle, parce que sa source de
 * vérité ne disait pas la vérité.
 *
 * `lang` dit dans quelle langue la page est SERVIE. Elle ne sert pas qu'à
 * l'affichage : les données structurées de la FAQ en dépendent. Les cinq pages
 * anglaises ont servi une FAQPage en français parce que rien ne portait cette
 * information — l'entête anglaise est déduite de la française, et le prérendu
 * réinjectait le bloc français par-dessus.
 *
 * `racine` est l'identifiant du conteneur que React monte, et c'est lui que le
 * prérendu instantanéise. Une page dont tout le corps est du HTML statique
 * n'expose que son pied de page : c'est `footer-root`.
 */
export const PAGES = [
  { fichier: 'index.html', route: '/', racine: 'app', lang: 'fr' },
  { fichier: 'Tarifs.html', route: '/tarifs', racine: 'app', lang: 'fr' },
  { fichier: 'co-traitants.html', route: '/co-traitants', racine: 'footer-root', lang: 'fr' },
  { fichier: 'valeur-probante.html', route: '/valeur-probante', racine: 'footer-root', lang: 'fr' },
  { fichier: 'mentions-legales.html', route: '/mentions-legales', racine: 'footer-root', lang: 'fr' },

  /* Les deux pages anglaises. Elles sont ENGENDRÉES par outils/anglais.mjs à
     partir de leurs jumelles françaises : on ne les modifie jamais à la main.
     Elles figurent ici parce que tout le reste doit les regarder — le prérendu
     (qui doit les instantanéiser EN ANGLAIS, d'où leur route), les ancres, les
     icônes, les traceurs, le poids des images.

     Leur adresse est plate — /en et non /en/ — et c'est délibéré : toutes les
     adresses du site sont relatives, y compris celles que le script construit
     à l'exécution. Depuis un sous-dossier elles se résoudraient en /en/images/…
     et la page arriverait sans feuille de style ni image. Le détail est
     développé en tête de outils/anglais.mjs.

     Les trois pages éditoriales ont maintenant leur jumelle, dont le corps est
     une VRAIE traduction (traductions/*.en.html) : leur texte est de la prose,
     qu'aucun outil ne traduit sans la trahir. Seule leur entête est déduite. */
  { fichier: 'en.html', route: '/en', racine: 'app', lang: 'en' },
  { fichier: 'en-tarifs.html', route: '/en-tarifs', racine: 'app', lang: 'en' },
  { fichier: 'en-co-traitants.html', route: '/en-co-traitants', racine: 'footer-root', lang: 'en' },
  { fichier: 'en-valeur-probante.html', route: '/en-valeur-probante', racine: 'footer-root', lang: 'en' },
  { fichier: 'en-mentions-legales.html', route: '/en-mentions-legales', racine: 'footer-root', lang: 'en' },
];

/** Les routes servies, dans l'ordre. Pour les contrôles qui parcourent le site. */
export const ROUTES = PAGES.map((p) => p.route);

/** Les fichiers, dans l'ordre. Pour les contrôles qui lisent le HTML sur disque. */
export const FICHIERS = PAGES.map((p) => p.fichier);
