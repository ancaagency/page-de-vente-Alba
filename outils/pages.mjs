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
 * `racine` est l'identifiant du conteneur que React monte, et c'est lui que le
 * prérendu instantanéise. Une page dont tout le corps est du HTML statique
 * n'expose que son pied de page : c'est `footer-root`.
 */
export const PAGES = [
  { fichier: 'index.html', route: '/', racine: 'app' },
  { fichier: 'Tarifs.html', route: '/tarifs', racine: 'app' },
  { fichier: 'co-traitants.html', route: '/co-traitants.html', racine: 'footer-root' },
  { fichier: 'valeur-probante.html', route: '/valeur-probante.html', racine: 'footer-root' },
  { fichier: 'mentions-legales.html', route: '/mentions-legales.html', racine: 'footer-root' },

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
  { fichier: 'en.html', route: '/en', racine: 'app' },
  { fichier: 'en-tarifs.html', route: '/en-tarifs', racine: 'app' },
  { fichier: 'en-co-traitants.html', route: '/en-co-traitants', racine: 'footer-root' },
  { fichier: 'en-valeur-probante.html', route: '/en-valeur-probante', racine: 'footer-root' },
  { fichier: 'en-mentions-legales.html', route: '/en-mentions-legales', racine: 'footer-root' },
];

/** Les routes servies, dans l'ordre. Pour les contrôles qui parcourent le site. */
export const ROUTES = PAGES.map((p) => p.route);

/** Les fichiers, dans l'ordre. Pour les contrôles qui lisent le HTML sur disque. */
export const FICHIERS = PAGES.map((p) => p.fichier);
