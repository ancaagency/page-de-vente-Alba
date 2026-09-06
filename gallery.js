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
  /* `sizes` par vignette, et non une valeur unique : la mosaïque leur donne
     des largeurs différentes sur grand écran — 679, 481, 381 et 779 px,
     mesurées. Une valeur commune faisait choisir au navigateur la dérivée du
     plus grand pour toutes, soit 1000 px servis pour une vignette de 381.
     Sur mobile elles font toutes 350 px : c'est le second terme qui varie. */
  var tiles = [{
    cls: "g-1",
    img: "images/chateau-a-renover.jpg",
    sizes: "(max-width: 760px) 94vw, 690px",
    eyebrow: L("RÉNOVATION · VAL DE LOIRE", "RENOVATION · LOIRE VALLEY"),
    h: L("Château à rénover, suivi complet dans ALBA", "Château to renovate, fully tracked in ALBA"),
    alt: "Château Renaissance au bord de l'eau, projet de rénovation",
    gain: L("Six mois après, on sait encore qui a validé quoi", "Six months on, you still know who approved what")
  }, {
    cls: "g-2",
    img: "images/pause-lecture.jpg",
    sizes: "(max-width: 760px) 94vw, 490px",
    eyebrow: L("L'ESPRIT ALBA", "THE ALBA SPIRIT"),
    h: L("Le temps repris sur la paperasse", "Time won back from paperwork"),
    alt: "Tasse de thé posée sur des livres devant une fenêtre",
    gain: L("Les comptes-rendus s\u2019\xE9crivent depuis les notes de visite", "Site reports write themselves from your visit notes")
  }, {
    cls: "g-4",
    quote: true,
    text: L("« La mémoire du projet, enfin au même endroit que le projet. »", "\"The project's memory, finally in the same place as the project.\""),
    by: "M. NOIRET · STUDIO MN"
  }, {
    cls: "g-3",
    img: "images/escalier-spirale.jpg",
    sizes: "(max-width: 760px) 94vw, 390px",
    eyebrow: L("DÉTAIL D'EXÉCUTION", "CONSTRUCTION DETAIL"),
    h: L("Escalier hélicoïdal, béton & chêne", "Spiral staircase, concrete & oak"),
    alt: "Escalier en spirale vu du dessus, béton et bois",
    gain: L("Une seule version du détail : celle qui a été validée", "One version of the detail: the one that was approved")
  }, {
    cls: "g-5",
    img: "images/villa-interieur.jpg",
    sizes: "(max-width: 760px) 94vw, 790px",
    eyebrow: L("LIVRAISON", "DELIVERED"),
    h: L("Villa contemporaine, bois & lumière", "Contemporary villa, timber & light"),
    alt: "Intérieur de villa contemporaine, plafond bois et grandes baies",
    gain: L("Le PV de réception signé le jour même, diffusé à tous", "Handover report signed the same day, sent to everyone")
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
    }, /*#__PURE__*/React.createElement(Photo, {
      src: t.img,
      alt: t.alt,
      sizes: t.sizes
    }), /*#__PURE__*/React.createElement("div", {
      className: "gtile-overlay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, t.eyebrow), /*#__PURE__*/React.createElement("h4", null, t.h), t.gain && /*#__PURE__*/React.createElement("p", {
      className: "gtile-gain"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    }), " ", t.gain)));
  })));
};
window.Gallery = Gallery;
