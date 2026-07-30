/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : founder.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez founder.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
/* Founder letter, the human behind ALBA */

var Founder = function Founder() {
  return /*#__PURE__*/React.createElement("section", {
    className: "founder-section",
    id: "fondateur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "founder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "founder-photo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "frame"
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "founder-portrait",
    shape: "rect",
    src: "images/founder-portrait.jpg",
    alt: "Anthony Cardona, fondateur d'ALBA Studio",
    placeholder: Txt("fondateur.glissez-votre-portrait-ici", "Glissez votre portrait ici", "Drop your portrait here")
  })), /*#__PURE__*/React.createElement("div", {
    className: "founder-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/logo-alba.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fb-name"
  }, Txt("fondateur.nom", "Anthony Cardona", "Anthony Cardona")), /*#__PURE__*/React.createElement("div", {
    className: "fb-role"
  }, Txt("fondateur.fondateur-alba-studio", "Fondateur · ALBA Studio", "Founder · ALBA Studio"))))), /*#__PURE__*/React.createElement("div", {
    className: "founder-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("fondateur.le-mot-du-fondateur", "Le mot du fondateur", "A word from the founder")), /*#__PURE__*/React.createElement("h2", null, Txt("fondateur.alba-est-ne-sur-un-chantier", "ALBA est né sur un chantier, ", "ALBA was born on a building site, "), /*#__PURE__*/React.createElement("em", null, Txt("fondateur.pas-dans-un-open-space", "pas dans un open space.", "not in an open space."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.pendant-des-annees-j-ai-vu", "Pendant des années, j'ai vu des architectes brillants perdre leurs soirées à chercher un email, relancer une validation, reconstituer l'historique d'une décision prise six mois plus tôt.", "For years, I watched brilliant architects lose their evenings hunting for an email, chasing an approval, piecing together the history of a decision made six months earlier.")), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.ce-temps-la-ne-produit-rien", "Ce temps-là ne produit rien. Il ne dessine rien. Il use.", "That time produces nothing. It draws nothing. It wears you down."), " ", /*#__PURE__*/React.createElement("b", null, Txt("fondateur.alba-existe-pour-le-rendre-a", "ALBA existe pour le rendre à ceux qui construisent.", "ALBA exists to give it back to the people who build."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "Chaque fonctionnalité est testée avec de vraies agences, sur de vrais projets, et si vous nous écrivez, c'est moi qui réponds.", "Every feature is tested with real practices, on real projects, and if you write to us, I'm the one who replies.")), /*#__PURE__*/React.createElement("div", {
    className: "founder-sign"
  }, /*#__PURE__*/React.createElement("img", {
    className: "sig-img",
    src: "images/signature-anthony.png",
    alt: "Anthony Cardona"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "who"
  }, Txt("fondateur.fondateur", "Fondateur", "Founder"), /*#__PURE__*/React.createElement("br", null), Txt("fondateur.ville", "Lyon, France", "Lyon, France"), " ", /*#__PURE__*/React.createElement("span", {
    className: "fr-flag",
    title: "Made in France"
  })))))));
};
window.Founder = Founder;
