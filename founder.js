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
  }, Txt("fondateur.le-mot-du-fondateur", "Le mot du fondateur", "A word from the founder")), /*#__PURE__*/React.createElement("h2", null, Txt("fondateur.alba-est-ne-sur-un-chantier", "Au départ, ", "At the start, "), /*#__PURE__*/React.createElement("em", null, Txt("fondateur.pas-dans-un-open-space", "je venais juste mesurer les murs.", "I just came to measure the walls."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.pendant-des-annees-j-ai-vu", "Je fais des relevés de mesures. Une maison, un appartement, parfois un immeuble entier. Je mesure tout et je livre un modèle 3D, des plans 2D, et les photos quand on me les demande. Mes clients sont des architectes. Ça fait deux ans, et j'ai fini par apprendre leur métier de l'intérieur.", "I do measured surveys. A house, a flat, sometimes a whole building. I measure everything and deliver a 3D model, 2D drawings, and the photographs when they're asked for. My clients are architects. It's been two years, and I've ended up learning their trade from the inside.")), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.ce-temps-la-ne-produit-rien", "Ce que je vois chez eux est toujours pareil. Le travail est bon. C'est ce qu'il y a autour qui lâche. Un plan livré en mars qu'on ne retrouve plus en juin. Trois versions d'un même fichier dans une boîte mail. Un accord donné au téléphone dont il ne reste aucune trace.", "What I see at their practices is always the same. The work is good. It's everything around it that gives way. A drawing delivered in March that can't be found in June. Three versions of the same file in an inbox. An agreement made over the phone with no trace left of it."), " ", /*#__PURE__*/React.createElement("b", null, Txt("fondateur.alba-existe-pour-le-rendre-a", "À chaque fois, c'est du travail déjà fait qu'il faut refaire.", "Every time, it means redoing work that was already done."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "J'ai fait ALBA pour ça. Tout ce qui concerne un projet reste au même endroit : les documents, les décisions, les échanges avec le client. Je continue les relevés à côté, donc je vois encore ce qui coince et je corrige au fur et à mesure. Et quand vous écrivez au support, c'est moi qui réponds.", "That's why I made ALBA. Everything about a project stays in one place: the documents, the decisions, the exchanges with the client. I still do surveys alongside it, so I still see what jams, and I fix it as I go. And when you write to support, I'm the one who answers.")), /*#__PURE__*/React.createElement("div", {
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
