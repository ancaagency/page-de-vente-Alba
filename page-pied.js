/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : page-pied.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez page-pied.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
/* Montage du PIED DE PAGE seul.

   Partagé par toutes les pages dont le corps est du HTML statique : les
   mentions légales, /co-traitants, /valeur-probante. Elles n'ont besoin de
   React que pour leur pied de page — lequel porte les liens légaux, les badges
   d'application et le lien de retrait du consentement, et doit donc rester
   identique partout.

   Le fichier s'appelait page-mentions.jsx quand une seule page l'utilisait.
   Renommé le jour où il en a servi trois : un nom qui décrit une page ne
   survit pas à sa deuxième utilisation. */

// Le reste de ces pages est du HTML statique : il s'affiche sans React.
ReactDOM.createRoot(document.getElementById("footer-root")).render(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(BandeauConsentement, null)));
