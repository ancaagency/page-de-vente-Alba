/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : page-mentions.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez page-mentions.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
/* Script de page : montage du pied de page des mentions légales.
   Sorti de mentions-legales.html pour la même raison. */

// On ne monte que le pied de page : le reste de la page est du HTML statique,
// qui n'a besoin ni de React ni de Babel pour s'afficher.
ReactDOM.createRoot(document.getElementById("footer-root")).render(/*#__PURE__*/React.createElement(Footer, null));
