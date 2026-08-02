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
  }, Txt("fondateur.le-mot-du-fondateur", "Le mot du fondateur", "A word from the founder")), /*#__PURE__*/React.createElement("h2", null, Txt("fondateur.alba-est-ne-sur-un-chantier", "Je ne suis pas architecte. ", "I'm not an architect. "), /*#__PURE__*/React.createElement("em", null, Txt("fondateur.pas-dans-un-open-space", "Je travaille avec eux depuis deux ans.", "I've been working alongside them for two years."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.pendant-des-annees-j-ai-vu", "Mon métier, c'est le relevé de mesures. Je vais sur site, je relève l'existant, j'en tire un modèle 3D et des plans 2D, souvent les photos qui vont avec. Ce sont des architectes qui me commandent ce travail — c'est comme ça que je suis entré dans leurs agences.", "My trade is measured surveys. I go on site, record the existing building, and produce a 3D model and 2D drawings from it, often the photographs too. Architects are the ones who commission that work — that's how I ended up inside their practices.")), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.ce-temps-la-ne-produit-rien", "En deux ans, j'ai vu la même scène se répéter : le plan que je viens de livrer dort dans un WeTransfer expiré, la version validée se trouve quelque part dans un fil de mails, et ce qui a été décidé en réunion n'est écrit nulle part.", "In two years I've watched the same scene repeat itself: the drawing I've just delivered sits in an expired WeTransfer, the approved version is somewhere in an email thread, and what was decided in the meeting is written down nowhere."), " ", /*#__PURE__*/React.createElement("b", null, Txt("fondateur.alba-existe-pour-le-rendre-a", "Personne ne travaille mal : c'est l'outil qui manque.", "Nobody is doing their job badly: the tool is what's missing."))), /*#__PURE__*/React.createElement("p", null, Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "C'est de là qu'est venu ALBA. Chaque écran part d'une demande précise, formulée par quelqu'un qui avait le problème sous les yeux. Et si vous écrivez, c'est moi qui réponds.", "That's where ALBA came from. Every screen starts from a specific request, made by someone who had the problem in front of them. And if you write in, I'm the one who answers.")), /*#__PURE__*/React.createElement("div", {
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
