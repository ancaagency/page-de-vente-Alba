/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : gallery.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez gallery.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
/* Gallery — Humain & Architecture */

var Gallery = function Gallery() {
  var tiles = [{
    cls: "g-1",
    img: "images/chateau-a-renover.jpg",
    eyebrow: L("RÉNOVATION · VAL DE LOIRE", "RENOVATION · LOIRE VALLEY"),
    h: L("Château à rénover, suivi complet dans ALBA", "Château to renovate, fully tracked in ALBA"),
    alt: "Château Renaissance au bord de l'eau, projet de rénovation"
  }, {
    cls: "g-2",
    img: "images/pause-lecture.jpg",
    eyebrow: L("L'ESPRIT ALBA", "THE ALBA SPIRIT"),
    h: L("Le temps repris sur la paperasse", "Time won back from paperwork"),
    alt: "Tasse de thé posée sur des livres devant une fenêtre"
  }, {
    cls: "g-4",
    quote: true,
    text: L("« La mémoire du projet, enfin au même endroit que le projet. »", "\"The project's memory, finally in the same place as the project.\""),
    by: "M. NOIRET · STUDIO MN"
  }, {
    cls: "g-3",
    img: "images/escalier-spirale.jpg",
    eyebrow: L("DÉTAIL D'EXÉCUTION", "CONSTRUCTION DETAIL"),
    h: L("Escalier hélicoïdal, béton & chêne", "Spiral staircase, concrete & oak"),
    alt: "Escalier en spirale vu du dessus, béton et bois"
  }, {
    cls: "g-5",
    img: "images/villa-interieur.jpg",
    eyebrow: L("LIVRAISON", "DELIVERED"),
    h: L("Villa contemporaine, bois & lumière", "Contemporary villa, timber & light"),
    alt: "Intérieur de villa contemporaine, plafond bois et grandes baies"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "gallery-embed"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "gallery-intertitle"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gi-rule"
  }), /*#__PURE__*/React.createElement("span", null, L("Dans les coulisses de leurs projets", "Behind the scenes of their projects")), /*#__PURE__*/React.createElement("span", {
    className: "gi-rule"
  })), /*#__PURE__*/React.createElement(Reveal, {
    className: "gallery-grid"
  }, tiles.map(function (t, i) {
    return t.quote ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "gtile quote ".concat(t.cls)
    }, /*#__PURE__*/React.createElement("div", {
      className: "mark"
    }, "\""), /*#__PURE__*/React.createElement("p", null, t.text), /*#__PURE__*/React.createElement("div", {
      className: "by"
    }, t.by)) : /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "gtile ".concat(t.cls)
    }, /*#__PURE__*/React.createElement("img", {
      src: t.img,
      alt: t.alt,
      loading: "lazy"
    }), /*#__PURE__*/React.createElement("div", {
      className: "gtile-overlay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, t.eyebrow), /*#__PURE__*/React.createElement("h4", null, t.h)));
  })));
};
window.Gallery = Gallery;
