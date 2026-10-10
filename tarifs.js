/* ═══════════════════════════════════════════════════════════════════════════
   LA GRILLE TARIFAIRE — source unique de vérité pour tout le site.

   ─────────────────────────────────────────────────────────────────────────
   POURQUOI CE FICHIER EXISTE

   Le prix d'un collaborateur supplémentaire a été affiché à 15 € sur
   co-traitants.html pendant que la page de tarifs passait de 15 à 69 puis à
   39 €. Personne ne l'a vu, parce qu'il n'existait aucun lien entre les deux :
   un composant React d'un côté, du HTML écrit à la main de l'autre.

   Le même jour, un audit a trouvé DEUX autres montants morts :
     · « L'offre Agence se facture 69 € HT par mois et par personne » dans une
       réponse de FAQ — l'erreur exacte qu'on venait de corriger sur la carte,
       syndiquée en JSON-LD sur les DIX pages du site ;
     · « highPrice: 89 » dans les données structurées : le prix de l'offre
       300 Go, retirée de la vente.

   Trois occurrences, trois endroits différents, aucune ne se signalait. Un
   montant recopié est un montant qui finira par mentir : ce n'est pas une
   question de vigilance, c'est une question de temps.

   ─────────────────────────────────────────────────────────────────────────
   CE QUI LIT CE FICHIER

     · sections.jsx  — le composant Pricing (cartes et calculateur) ;
     · outils/offre-jsonld.mjs — les données structurées AggregateOffer ;
     · tests/montants.mjs — le garde-fou qui interdit qu'un montant en euros
       réapparaisse ailleurs que sur la page de tarifs.

   Les outils le lisent SANS l'exécuter dans leur contexte global, exactement
   comme contenu.js. C'est pour ça qu'il ne contient que des données : pas de
   calcul, pas de dépendance, pas d'effet de bord.

   ─────────────────────────────────────────────────────────────────────────
   ⚠️ CES MONTANTS SONT CEUX DE STRIPE

   Ils ne se déduisent d'aucune règle générale, et surtout pas d'un
   pourcentage : la remise annuelle vaut 18,6 % sur Atelier+, 18,4 % sur
   Atelier et sur la personne supplémentaire, mais 17,4 % sur le premier siège
   Agence (684 au lieu de 828). Quatre paliers, trois remises différentes. Un
   prix calculé depuis une formule finirait par diverger de Stripe sans que
   personne ne le voie. On les écrit, et on les vérifie là-bas.

   Modifier un montant ici, c'est le modifier partout. Ensuite :
       node outils/prerendre.mjs && node outils/anglais.mjs && node outils/prerendre.mjs
   ═══════════════════════════════════════════════════════════════════════════ */
window.ALBA_TARIFS = {

  /* Découverte : gratuite, un projet, une personne. Elle n'a pas de montant —
     c'est son argument. `palier: null` veut dire « aucun paiement ». */

  /* ── LES QUANTITÉS, AU MÊME ENDROIT QUE LES PRIX ──────────────────────────
     Elles vivaient dans neuf chaînes de contenu.js, recopiées à la main. Trois
     d'entre elles annonçaient des plafonds qui n'ont jamais existé — « 1 500 »
     et « 5 000 questions par mois » — et aucune ne mentionnait l'espace de
     fichiers. Un chiffre de quantité se périme exactement comme un prix ; il
     mérite la même source unique. */

  /* Découverte n'a pas de prix : c'est son argument. Elle a des quantités. */
  decouverte: {
    projets: 1,        // 1 projet AU TOTAL, et non « à la fois » — voir ci-dessous
    personnes: 1,
    go: 2,
    analyses: 10,      // analyses de documents par mois
    questionsParMois: 300,   // plafond mensuel, propre à l'offre gratuite
  },

  atelier: {
    mois: 49,          // 49 € HT par mois
    an: 480,           // 480 € HT par an, soit 40 € HT par mois
    projets: 5,        // menés de front : archiver un projet terminé libère une place
    personnes: 1,
    go: 100,
    analyses: 50,
  },

  /* ── LE PALIER INTERMÉDIAIRE ──────────────────────────────────────────────
     Passer du 5e au 6e projet coûtait +41 % : 49 € puis 69 €. C'était la marche
     la plus haute de toute la grille, et elle tombait sur le moment où un
     architecte indépendant commence à bien tourner — c'est-à-dire sur le cœur
     de cible, au moment où il a le plus de raisons de rester.

     Elle avait aussi un défaut de fond : l'offre Agence vend DEUX choses à la
     fois — les projets illimités ET l'équipe. Un indépendant seul avec six
     projets se faisait donc vendre une offre dont l'argument principal ne le
     concernait pas.

     Les trois premiers paliers sont désormais « vous, qui grandissez » ; Agence
     est « vous n'êtes plus seul ». Deux marches de +20 % et +17 % au lieu
     d'une de +41 %. */
  atelierPlus: {
    mois: 59,
    an: 576,           // 576 € HT par an, soit 48 € HT par mois (−18,6 %)
    projets: 10,
    personnes: 1,
    go: 150,
    analyses: 100,
  },

  /* Agence est DÉGRESSIVE, et ce n'est pas un détail de présentation : la page
     a annoncé « 69 € par personne » pendant une journée, soit 276 € pour
     quatre au lieu de 186. Elle nous faisait paraître 48 % plus chers que nous
     ne sommes, sur exactement le profil de client qu'on vise. */
  agence: {
    mois: { premiere: 69, suivante: 39 },
    an:   { premiere: 684, suivante: 384 },
    projets: null,     // illimités
    go: 250,
    analyses: 200,
  },

  /* ⚠️ LÉO RÉPOND AU MÊME RYTHME DANS TOUTES LES OFFRES.
     Les cartes annonçaient « 1 500 » puis « 5 000 questions par mois » selon
     l'offre : ces plafonds n'existent pas. La seule règle est un rythme
     quotidien, identique partout — c'est d'ailleurs cohérent avec la règle d'or
     de la page, qui ne borne que des quantités et ne réserve aucune fonction.
     Seule l'offre gratuite porte en plus un plafond mensuel. */
  leo: {
    questionsParJourParPersonne: 20,
  },

  /* ── LA TVA, POUR L'AFFICHAGE TTC ────────────────────────────────────────
     ⚠️ CE TAUX N'EST VRAI QUE POUR UNE AGENCE ASSUJETTIE EN FRANCE.
     Un client de l'Union européenne qui donne son numéro de TVA
     intracommunautaire est en autoliquidation : il paie le montant HT, et le
     TTC affiché ne le concerne pas. Hors Union, idem. C'est pourquoi le TTC
     est annoncé « en France » partout où il apparaît, et jamais comme le prix
     que tout le monde paiera. La TVA réelle est calculée par Stripe au
     paiement, selon le pays et le statut. */
  tva: 0.20,

  /* Le nombre maximum de personnes dans un espace. C'est une quantité, pas un
     prix, mais elle est écrite ici pour la même raison : elle apparaît sur la
     carte, dans le calculateur et sur co-traitants.html. */
  maxPersonnes: 4,
};
