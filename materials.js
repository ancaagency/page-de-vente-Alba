/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : materials.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez materials.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Matériauthèque, interactive demo styled like the REAL app + Manifesto */

var MAT_CATS_DEF = [{
  name: "Sols",
  dot: "#C9A86A"
}, {
  name: "Murs & peintures",
  dot: "#7E9A7E"
}, {
  name: "Menuiseries",
  dot: "#8B6F4E"
}, {
  name: "Sanitaire & robinetterie",
  dot: "#6E8CA8"
}, {
  name: "Luminaires",
  dot: "#D9B36B"
}, {
  name: "Mobilier fixe",
  dot: "#A87E5C"
}, {
  name: "Autre",
  dot: "#9AA0AC"
}];

/* Display label for a category in the current language */
var matCatLabel = function matCatLabel(c) {
  return {
    "Sols": L("Sols", "Flooring"),
    "Murs & peintures": L("Murs & peintures", "Walls & paint"),
    "Menuiseries": L("Menuiseries", "Joinery"),
    "Sanitaire & robinetterie": L("Sanitaire & robinetterie", "Sanitary & taps"),
    "Luminaires": L("Luminaires", "Lighting"),
    "Mobilier fixe": L("Mobilier fixe", "Fixed furniture"),
    "Autre": L("Autre", "Other")
  }[c] || c;
};
var MAT_DATA = [{
  id: 1,
  size: "240×21",
  name: "Parquet chêne massif brossé",
  marque: "Ets Bercot & Fils",
  ref: "CHB-240-NAT",
  cat: "Sols",
  prix: "84 €/m²",
  delai: "3 sem.",
  projets: ["Grange Lissieu"],
  champ: true,
  tags: ["durable", "haut de gamme"],
  bg: "repeating-linear-gradient(90deg, rgba(60,35,10,0.14) 0 2px, transparent 2px 11px), linear-gradient(135deg, #C9A876, #96733F)"
}, {
  id: 2,
  size: "60×40",
  name: "Pierre de Bourgogne adoucie",
  marque: "Carrières Sauvanet",
  ref: "PBG-060-ADO",
  cat: "Sols",
  prix: "146 €/m²",
  delai: "6 sem.",
  projets: ["Grange Lissieu", "Maison Écully"],
  champ: true,
  bg: "radial-gradient(ellipse at 30% 30%, #C7CCD7, transparent 60%), linear-gradient(135deg, #BCC1CE, #858FA7)"
}, {
  id: 3,
  name: "Béton ciré minéral gris",
  marque: "Mercadier",
  ref: "BCM-020-GRA",
  cat: "Sols",
  prix: "92 €/m²",
  delai: "2 sem.",
  projets: ["Maison Écully"],
  bg: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(135deg, #9DA3AB, #686E78)"
}, {
  id: 4,
  size: "30×30",
  name: "Terre cuite artisanale rosée",
  marque: "Briqueterie Chimot",
  ref: "TCA-110-ROS",
  cat: "Sols",
  prix: "88 €/m²",
  delai: "7 sem.",
  projets: [],
  tags: ["artisanal"],
  bg: "radial-gradient(ellipse at 60% 30%, rgba(255,200,160,0.25), transparent 55%), linear-gradient(135deg, #B4633E, #8A4628)"
}, {
  id: 5,
  name: "Enduit chaux ferré sable",
  marque: "Argilus",
  ref: "ECF-010-SAB",
  cat: "Murs & peintures",
  prix: "46 €/m²",
  delai: "1 sem.",
  projets: ["Grange Lissieu", "Maison Écully"],
  champ: true,
  tags: ["biosourcé"],
  bg: "radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.25), transparent 55%), linear-gradient(135deg, #D5D9E1, #AEB5C5)"
}, {
  id: 6,
  name: "Chanvre projeté isolant",
  marque: "Technichanvre",
  ref: "CHP-200-ISO",
  cat: "Murs & peintures",
  prix: "39 €/m²",
  delai: "2 sem.",
  projets: [],
  tags: ["biosourcé", "isolant"],
  bg: "radial-gradient(ellipse at 30% 70%, rgba(200,190,150,0.3), transparent 50%), linear-gradient(135deg, #919AAF, #8F865F)"
}, {
  id: 7,
  size: "H240×L60",
  name: "Menuiserie noyer fumé huilé",
  marque: "Scierie Delatour",
  ref: "NYF-180-FUM",
  cat: "Menuiseries",
  prix: "128 €/m²",
  delai: "5 sem.",
  projets: ["Atelier Paris 11e"],
  bg: "repeating-linear-gradient(90deg, rgba(30,15,5,0.2) 0 2px, transparent 2px 9px), linear-gradient(135deg, #7A5636, #2D323D)"
}, {
  id: 8,
  size: "Sur mesure",
  name: "Châssis acier thermolaqué",
  marque: "Métallerie Bruyère",
  ref: "ATN-030-RAL9005",
  cat: "Menuiseries",
  prix: "168 €/ml",
  delai: "5 sem.",
  projets: ["Grange Lissieu"],
  bg: "linear-gradient(160deg, #33363D 0%, #17191D 70%, #2A2D33 100%)"
}, {
  id: 9,
  size: "8 mm",
  name: "Verre cannelé clair 8 mm",
  marque: "Miroiterie Grand Lyon",
  ref: "VCC-008-CAN",
  cat: "Menuiseries",
  prix: "310 €/m²",
  delai: "4 sem.",
  projets: ["Atelier Paris 11e"],
  bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 3px, rgba(190,212,220,0.18) 3px 11px), linear-gradient(135deg, #B9CDD4, #93ABB4)"
}, {
  id: 10,
  name: "Robinetterie laiton brossé",
  marque: "Atelier Fontaine",
  ref: "LTB-015-BRO",
  cat: "Sanitaire & robinetterie",
  prix: "215 €/u",
  delai: "4 sem.",
  projets: ["Atelier Paris 11e"],
  bg: "linear-gradient(120deg, #D9B36B 0%, #A67C3B 40%, #E8CD8F 65%, #B98F4C 100%)"
}, {
  id: 11,
  size: "Ø35",
  name: "Suspension zinc prépatiné",
  marque: "VMZinc Édition",
  ref: "ZNP-070-QTZ",
  cat: "Luminaires",
  prix: "74 €/u",
  delai: "3 sem.",
  projets: ["Maison Écully"],
  bg: "linear-gradient(145deg, #A8AFB6 0%, #8B929A 50%, #B7BEC4 100%)"
}, {
  id: 12,
  size: "L140",
  name: "Voilage lin naturel écru",
  marque: "Toiles de Mayenne",
  ref: "LNT-140-ECR",
  cat: "Autre",
  prix: "58 €/ml",
  delai: "2 sem.",
  projets: ["Grange Lissieu"],
  bg: "repeating-linear-gradient(0deg, rgba(120,100,70,0.12) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(120,100,70,0.12) 0 1px, transparent 1px 4px), linear-gradient(135deg, #C4C9D4, #A5ACBD)"
}];
var MAT_SIDE_ITEMS_GET = function MAT_SIDE_ITEMS_GET() {
  return [{
    label: L("Tableau de bord", "Dashboard"),
    icon: "menu-grid"
  }, {
    label: L("Projets", "Projects"),
    icon: "folder"
  }, {
    label: L("Maîtres d'ouvrage", "Clients"),
    icon: "users"
  }, {
    label: L("Calendrier", "Calendar"),
    icon: "calendar"
  }, {
    label: L("Calculateur", "Calculator"),
    icon: "euro"
  }, {
    label: L("Bibliothèque matériaux", "Material library"),
    icon: "layers",
    active: true
  }, {
    label: L("Archives", "Archives"),
    icon: "doc"
  }];
};
var Materials = function Materials() {
  var _React$useState = React.useState("Tous"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    cat = _React$useState2[0],
    setCat = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    addOpen = _React$useState4[0],
    setAddOpen = _React$useState4[1];
  var gridRef = React.useRef(null);
  var list = (cat === "Tous" ? MAT_DATA : MAT_DATA.filter(function (m) {
    return m.cat === cat;
  })).slice(0, 6);
  var countFor = function countFor(c) {
    return c === "Tous" ? MAT_DATA.length : MAT_DATA.filter(function (m) {
      return m.cat === c;
    }).length;
  };
  var usedInProject = MAT_DATA.filter(function (m) {
    return m.projets.length > 0;
  }).length;
  var champions = MAT_DATA.filter(function (m) {
    return m.champ;
  }).length;
  var activeCats = new Set(MAT_DATA.map(function (m) {
    return m.cat;
  })).size;
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cards = gridRef.current ? gridRef.current.querySelectorAll(".ml-card") : [];
    if (!cards.length) return;
    gsap.fromTo(cards, {
      autoAlpha: 0,
      y: 22,
      scale: 0.97
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.045,
      ease: "power3.out",
      overwrite: true
    });
  }, [cat]);
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var app = document.querySelector(".mat-app");
    if (!app) return;
    gsap.from(app, {
      autoAlpha: 0,
      y: 90,
      rotateX: 6,
      transformPerspective: 1600,
      transformOrigin: "center top",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: app,
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);
  var catDot = function catDot(c) {
    return (MAT_CATS_DEF.find(function (d) {
      return d.name === c;
    }) || {}).dot || "#9AA0AC";
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "materials-section",
    id: "materiaux"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Nouvelle fonctionnalité", "New feature"), /*#__PURE__*/React.createElement("span", {
    className: "mat-badge-new"
  }, L("NOUVEAU", "NEW"))), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, L("La bibliothèque matériaux, ", "The material library, "), /*#__PURE__*/React.createElement("em", null, L("reliée à vos projets.", "linked to your projects."))), /*#__PURE__*/React.createElement("p", null, L("Marques, références, prix, tags, chaque matériau est capitalisé une fois, puis réutilisé en deux clics dans un circuit de décision. Sans tout ressaisir à chaque chantier.", "Brands, references, prices, tags, each material is captured once, then reused in two clicks inside a decision flow. No retyping on every project."))), /*#__PURE__*/React.createElement("div", {
    className: "mat-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mockup-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mockup-dots"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FF5F57"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FEBC2E"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#28C840"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mockup-url"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 11
  }), " alba-studio.co/bibliotheque"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-shell is-rail"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ml-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-rail-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/logo-alba.png",
    alt: "ALBA Studio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-rail-items"
  }, MAT_SIDE_ITEMS_GET().map(function (it) {
    return /*#__PURE__*/React.createElement("span", {
      key: it.label,
      className: "ml-rail-item ".concat(it.active ? "is-active" : ""),
      title: it.label
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 14
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-avatar sm rail-foot"
  }, "A")), /*#__PURE__*/React.createElement("main", {
    className: "ml-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ml-top-create"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " ", L("Créer un projet", "Create a project")), /*#__PURE__*/React.createElement("span", {
    className: "ml-top-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 13
  })), /*#__PURE__*/React.createElement("span", {
    className: "ml-top-ico bell"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 13
  }), /*#__PURE__*/React.createElement("i", null, "17")), /*#__PURE__*/React.createElement("span", {
    className: "ml-top-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ml-crumbs"
  }, /*#__PURE__*/React.createElement("span", null, "Studio"), " \u203A ", /*#__PURE__*/React.createElement("span", null, L("Capitalisation", "Knowledge base")), " \u203A ", /*#__PURE__*/React.createElement("b", null, L("Bibliothèque matériaux", "Material library")), /*#__PURE__*/React.createElement("button", {
    className: "ml-import-btn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 11
  }), " ", L("Importer d'un projet", "Import from a project")), /*#__PURE__*/React.createElement("button", {
    className: "ml-import-btn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 11
  }), " ", L("Importer une URL", "Import a URL")), /*#__PURE__*/React.createElement("button", {
    className: "ml-add-btn",
    style: {
      marginLeft: 0
    },
    onClick: function onClick() {
      return setAddOpen(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  }), " ", L("Ajouter", "Add"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-header-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-workspace"
  }, L("WORKSPACE · ALBA STUDIO · CAPITALISATION", "WORKSPACE · ALBA STUDIO · KNOWLEDGE BASE")), /*#__PURE__*/React.createElement("h3", {
    className: "ml-title"
  }, L("Ma ", "My "), /*#__PURE__*/React.createElement("em", null, L("bibliothèque", "library"))), /*#__PURE__*/React.createElement("p", {
    className: "ml-desc"
  }, L("Vos matériaux favoris, capitalisés au fil des projets. Réutilisez-les en deux clics dans un circuit de décision.", "Your favourite materials, captured across projects. Reuse them in two clicks inside a decision flow."))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("MATÉRIAUX RÉFÉRENCÉS", "MATERIALS ON FILE")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, MAT_DATA.length), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("+3 ce mois", "+3 this month"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("CATÉGORIES ACTIVES", "ACTIVE CATEGORIES")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, activeCats), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("Sur 7 disponibles", "Out of 7 available"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("UTILISÉS EN PROJET", "USED IN PROJECTS")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, usedInProject), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("".concat(Math.round(usedInProject / MAT_DATA.length * 100), " % de votre biblio"), "".concat(Math.round(usedInProject / MAT_DATA.length * 100), "% of your library")))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat gold"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("CHAMPIONS", "CHAMPIONS")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, champions), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("Réutilisés > 5 fois", "Reused > 5 times"))))), /*#__PURE__*/React.createElement("div", {
    className: "ml-search-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 13
  }), " ", L("Rechercher un matériau, une marque, un tag…", "Search a material, brand or tag…")), /*#__PURE__*/React.createElement("div", {
    className: "ml-select"
  }, L("Plus utilisés", "Most used"), " ", /*#__PURE__*/React.createElement("span", null, "\u25BE")), /*#__PURE__*/React.createElement("div", {
    className: "ml-select"
  }, L("Filtres", "Filters")), /*#__PURE__*/React.createElement("div", {
    className: "ml-viewtoggle"
  }, /*#__PURE__*/React.createElement("span", {
    className: "is-active"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu-grid",
    size: 12
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 12
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ml-chips"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ml-chip ".concat(cat === "Tous" ? "is-active" : ""),
    onClick: function onClick() {
      return setCat("Tous");
    }
  }, L("Tous", "All"), " ", /*#__PURE__*/React.createElement("em", null, countFor("Tous"))), MAT_CATS_DEF.map(function (c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c.name,
      className: "ml-chip ".concat(cat === c.name ? "is-active" : ""),
      onClick: function onClick() {
        return setCat(c.name);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip-dot",
      style: {
        background: c.dot
      }
    }), " ", matCatLabel(c.name), " ", /*#__PURE__*/React.createElement("em", null, countFor(c.name)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-grid is-wide",
    ref: gridRef
  }, list.map(function (m) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      className: "ml-card"
    }, m.champ && /*#__PURE__*/React.createElement("span", {
      className: "ml-champ",
      title: "Champion"
    }, "\u2605"), /*#__PURE__*/React.createElement("div", {
      className: "ml-swatch",
      style: {
        background: m.bg
      }
    }, m.projets.length === 0 && /*#__PURE__*/React.createElement("span", {
      className: "ml-unused"
    }, L("Jamais utilisé", "Never used")), /*#__PURE__*/React.createElement("div", {
      className: "ml-hover-actions"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mha-champ"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "10",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
    })), " ", L("CHAMPION", "CHAMPION")), /*#__PURE__*/React.createElement("span", {
      className: "mha-ico",
      title: L("Modifier", "Edit")
    }, /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 3l4 4L7 21H3v-4z"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "mha-ico",
      title: L("Dupliquer", "Duplicate")
    }, /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "9",
      width: "12",
      height: "12",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 15V5a2 2 0 012-2h10"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "mha-use"
    }, "\u2192 ", L("Utiliser", "Use")), /*#__PURE__*/React.createElement("span", {
      className: "mha-ico",
      title: L("Supprimer", "Delete")
    }, /*#__PURE__*/React.createElement("svg", {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "ml-card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ml-card-cat"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip-dot",
      style: {
        background: catDot(m.cat)
      }
    }), matCatLabel(m.cat).toUpperCase()), /*#__PURE__*/React.createElement("div", {
      className: "ml-card-name"
    }, m.name), m.size && /*#__PURE__*/React.createElement("div", {
      className: "ml-card-size"
    }, m.size), /*#__PURE__*/React.createElement("div", {
      className: "ml-card-desc"
    }, m.marque, " \xB7 ", m.ref, " \xB7 ", /*#__PURE__*/React.createElement("b", null, m.prix)), m.tags && /*#__PURE__*/React.createElement("div", {
      className: "ml-card-tags"
    }, m.tags.map(function (t) {
      return /*#__PURE__*/React.createElement("span", {
        key: t
      }, t);
    }))));
  }))))), addOpen && /*#__PURE__*/React.createElement(MatAddModal, {
    onClose: function onClose() {
      return setAddOpen(false);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mat-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), L("Démo interactive, filtrez par catégorie et ouvrez « Ajouter » pour créer une fiche matériau", "Interactive demo, filter by category and open “Add” to create a material sheet"))));
};

/* Popup « Ajouter un matériau », réplique du vrai écran */
var MatAddModal = function MatAddModal(_ref) {
  var onClose = _ref.onClose;
  var _React$useState5 = React.useState("manuel"),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    mode = _React$useState6[0],
    setMode = _React$useState6[1];
  var _React$useState7 = React.useState("Sols"),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selCat = _React$useState8[0],
    setSelCat = _React$useState8[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "mam-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mam-close",
    onClick: onClose,
    "aria-label": L("Fermer", "Close")
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "mam-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-eyebrow"
  }, L("BIBLIOTHÈQUE · NOUVEAU MATÉRIAU", "LIBRARY · NEW MATERIAL")), /*#__PURE__*/React.createElement("h4", {
    className: "mam-title"
  }, L("Ajouter un ", "Add a "), /*#__PURE__*/React.createElement("em", null, L("matériau", "material"))), /*#__PURE__*/React.createElement("p", {
    className: "mam-sub"
  }, L("Capitalisez un favori, réutilisable en un clic dans tous vos projets.", "Capture a favourite, reusable in one click across all your projects."))), /*#__PURE__*/React.createElement("div", {
    className: "mam-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: mode === "manuel" ? "is-active" : "",
    onClick: function onClick() {
      return setMode("manuel");
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "doc",
    size: 11
  }), " ", L("Saisie manuelle", "Manual entry")), /*#__PURE__*/React.createElement("button", {
    className: mode === "url" ? "is-active" : "",
    onClick: function onClick() {
      return setMode("url");
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 11
  }), " ", L("Depuis une URL", "From a URL"))), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("NOM DU MATÉRIAU *", "MATERIAL NAME *")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input ph"
  }, L("Carrelage grès cérame mat 60×60", "Matte porcelain tile 60×60")), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("CATÉGORIE", "CATEGORY")), /*#__PURE__*/React.createElement("div", {
    className: "mam-cats"
  }, MAT_CATS_DEF.map(function (c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c.name,
      className: "mam-cat ".concat(selCat === c.name ? "is-active" : ""),
      onClick: function onClick() {
        return setSelCat(c.name);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip-dot",
      style: {
        background: c.dot
      }
    }), " ", matCatLabel(c.name));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mam-row2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("MARQUE", "BRAND")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input ph"
  }, "Mutina")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("RÉFÉRENCE", "REFERENCE")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input ph mono"
  }, "PUDDLE-AVENA"))), /*#__PURE__*/React.createElement("div", {
    className: "mam-row2 price"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("PRIX", "PRICE")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input ph"
  }, "0,00")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "mam-input"
  }, "\u20AC/u ", /*#__PURE__*/React.createElement("span", {
    className: "mam-caret"
  }, "\u25BE")))), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("TAILLE (facultatif)", "SIZE (optional)")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input ph"
  }, L("Ex : 40×40, 60×60, H200×L80…", "E.g. 40×40, 60×60, H200×W80…")), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("DESCRIPTION", "DESCRIPTION")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input area ph"
  }, L("Notes, finitions, calepinage…", "Notes, finishes, layout…"))), /*#__PURE__*/React.createElement("div", {
    className: "mam-photos"
  }, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("PHOTO PRINCIPALE", "MAIN PHOTO")), /*#__PURE__*/React.createElement("div", {
    className: "mam-drop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-drop-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15,
    style: {
      transform: "rotate(-90deg)"
    }
  })), /*#__PURE__*/React.createElement("b", null, L("Glissez une photo ou cliquez", "Drop a photo or click")), /*#__PURE__*/React.createElement("span", null, L("JPG ou PNG, ratio 4/5 recommandé", "JPG or PNG, 4/5 ratio recommended"))), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("PHOTO SECONDAIRE (facultatif · visible au survol)", "SECONDARY PHOTO (optional · shown on hover)")), /*#__PURE__*/React.createElement("div", {
    className: "mam-drop sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-drop-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15,
    style: {
      transform: "rotate(-90deg)"
    }
  })), /*#__PURE__*/React.createElement("b", null, L("Glissez une 2ᵉ photo ou cliquez", "Drop a 2nd photo or click")), /*#__PURE__*/React.createElement("span", null, L("Apparaît au survol / toucher de la carte", "Appears on card hover / touch"))), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("APERÇU DE LA CARTE", "CARD PREVIEW")), /*#__PURE__*/React.createElement("div", {
    className: "mam-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-preview-img"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 16
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mam-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mam-foot-note"
  }, L("Enregistré dans votre bibliothèque, réutilisable sur tous vos projets", "Saved to your library, reusable across all your projects")), /*#__PURE__*/React.createElement("button", {
    className: "mam-cancel",
    onClick: onClose
  }, L("Annuler", "Cancel")), /*#__PURE__*/React.createElement("button", {
    className: "mam-submit",
    onClick: onClose
  }, L("Ajouter à ma bibliothèque", "Add to my library")))));
};

/* Manifesto, words fill in as you scroll */
var Manifesto = function Manifesto() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    var el = ref.current;
    if (!el) return;
    var words = el.querySelectorAll(".mword");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach(function (w) {
        return w.style.opacity = 1;
      });
      return;
    }
    gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.6
      }
    });
  }, []);
  var parts = [{
    t: L("Votre métier, c'est de dessiner des lieux qui durent.", "Your craft is designing places that last.")
  }, {
    t: L("Pas de relancer des emails,", "Not chasing emails,")
  }, {
    t: L("ni de chercher une référence dans trois carnets.", "nor hunting a reference through three notebooks.")
  }, {
    t: L("ALBA reprend la charge mentale du projet —", "ALBA takes over the project's mental load —")
  }, {
    t: L("vous reprenez le crayon.", "you take back the pencil."),
    gold: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "manifesto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "manifesto-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Notre conviction", "What we believe"))), /*#__PURE__*/React.createElement("p", {
    className: "manifesto-text",
    ref: ref
  }, parts.map(function (part, pi) {
    return part.t.split(" ").map(function (w, wi) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: "".concat(pi, "-").concat(wi)
      }, /*#__PURE__*/React.createElement("span", {
        className: "mword ".concat(part.gold ? "gold" : "")
      }, w), " ");
    });
  }))), /*#__PURE__*/React.createElement(PainScroll, null));
};

/* Pain scroll, pinned, one pain at a time, scroll-driven */
var PAIN_ITEMS_FR = [
/* « 3e » et non « 3ᵉ ». Le second est U+1D49, un caractère de compatibilité
   qui n'appartient qu'au sous-ensemble latin-ext d'Inter : sa seule présence
   ici faisait télécharger ce sous-ensemble — 85 Ko — à chaque visiteur qui
   n'a pas de police système Apple. 85 Ko pour un exposant, dans une ligne qui
   défile. « 3e » est de toute façon la forme courante en français. */
"Relancer un client pour la 3e fois sur la même validation.", "Retrouver « plan-final-V7-DEF-ok(2).pdf » dans les emails.", "Un arbitrage oral contesté un an plus tard.", "Ressaisir la même référence matériau à chaque projet.", "Des appels à 21h pour savoir où en est le chantier.", "Trois Drive, deux boîtes mail, zéro source de vérité.", "Un BET qui travaille sur une version périmée des plans."];
var PAIN_ITEMS_EN = ["Chasing a client for the 3rd time on the same approval.", "Digging “plan-final-V7-DEF-ok(2).pdf” out of your inbox.", "A verbal decision disputed a year later.", "Re-typing the same material reference on every project.", "9pm calls asking where the site is at.", "Three Drives, two inboxes, zero source of truth.", "An engineer working from outdated plans."];
var PainScroll = function PainScroll() {
  var items = L(PAIN_ITEMS_FR, PAIN_ITEMS_EN);
  var n = items.length;
  var sectionRef = React.useRef(null);
  var _React$useState9 = React.useState(0),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    active = _React$useState0[0],
    setActive = _React$useState0[1];
  var _React$useState1 = React.useState(0),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    prog = _React$useState10[0],
    setProg = _React$useState10[1];
  React.useEffect(function () {
    var onScroll = function onScroll() {
      var el = sectionRef.current;
      if (!el) return;
      var total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      var p = -el.getBoundingClientRect().top / total;
      p = Math.max(0, Math.min(1, p));
      setProg(p);
      setActive(Math.min(n, Math.floor(p * (n + 1))));
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return function () {
      return window.removeEventListener("scroll", onScroll);
    };
  }, [n]);
  var scrollBy = function scrollBy(steps) {
    var el = sectionRef.current;
    if (!el) return;
    var total = el.offsetHeight - window.innerHeight;
    var top = el.getBoundingClientRect().top + window.scrollY;
    var target = steps >= n ? top + total + 8 : top + total * Math.min(1, (active + 1 + 0.5) / (n + 1));
    if (window.__lenis) window.__lenis.scrollTo(target, {
      duration: steps >= n ? 1.1 : 0.9
    });else window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pain-scroll",
    ref: sectionRef,
    style: {
      height: "".concat((n + 1) * 60, "vh")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pain-stage ".concat(active === n ? "is-final" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "pain-stage-eyebrow pain-eyebrow-pains"
  }, L("Votre quotidien, aujourd'hui", "Your daily grind, today")), /*#__PURE__*/React.createElement("div", {
    className: "pain-stage-body"
  }, items.map(function (p, i) {
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      className: "pain-line ".concat(active === i ? "is-active" : active > i ? "is-past" : "")
    }, p);
  }), /*#__PURE__*/React.createElement("p", {
    className: "pain-line pain-final ".concat(active === n ? "is-active" : "")
  }, L(/*#__PURE__*/React.createElement(React.Fragment, null, "ALBA efface ", /*#__PURE__*/React.createElement("em", null, "chacune"), " de ces frictions."), /*#__PURE__*/React.createElement(React.Fragment, null, "ALBA erases ", /*#__PURE__*/React.createElement("em", null, "every one"), " of these frictions.")))), /*#__PURE__*/React.createElement("div", {
    className: "pain-stage-foot",
    style: {
      opacity: active === n ? 0 : 1,
      pointerEvents: active === n ? "none" : "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pain-count"
  }, String(Math.min(active + 1, n)).padStart(2, "0"), " / ", String(n).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "pain-bar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "".concat(prog * 100, "%")
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "pain-controls"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pain-next",
    onClick: function onClick() {
      return scrollBy(1);
    },
    "aria-label": L("Suivant", "Next")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 13,
    style: {
      transform: "rotate(90deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pain-skip",
    onClick: function onClick() {
      return scrollBy(n);
    }
  }, L("Passer", "Skip"))))));
};
window.Materials = Materials;
window.Manifesto = Manifesto;
