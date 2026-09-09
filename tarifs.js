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
   pourcentage : la remise annuelle vaut 18 % sur Atelier et sur la personne
   supplémentaire, mais 17,4 % sur le premier siège Agence (684 au lieu de
   828). Un prix calculé depuis une formule finirait par diverger de Stripe
   sans que personne ne le voie. On les écrit, et on les vérifie là-bas.

   Modifier un montant ici, c'est le modifier partout. Ensuite :
       node outils/prerendre.mjs && node outils/anglais.mjs && node outils/prerendre.mjs
   ═══════════════════════════════════════════════════════════════════════════ */
window.ALBA_TARIFS = {

  /* Découverte : gratuite, un projet, une personne. Elle n'a pas de montant —
     c'est son argument. `palier: null` veut dire « aucun paiement ». */

  atelier: {
    mois: 49,          // 49 € HT par mois
    an: 480,           // 480 € HT par an, soit 40 € HT par mois
  },

  /* Agence est DÉGRESSIVE, et ce n'est pas un détail de présentation : la page
     a annoncé « 69 € par personne » pendant une journée, soit 276 € pour
     quatre au lieu de 186. Elle nous faisait paraître 48 % plus chers que nous
     ne sommes, sur exactement le profil de client qu'on vise. */
  agence: {
    mois: { premiere: 69, suivante: 39 },
    an:   { premiere: 684, suivante: 384 },
  },

  /* Le nombre maximum de personnes dans un espace. C'est une quantité, pas un
     prix, mais elle est écrite ici pour la même raison : elle apparaît sur la
     carte, dans le calculateur et sur co-traitants.html. */
  maxPersonnes: 4,
};
