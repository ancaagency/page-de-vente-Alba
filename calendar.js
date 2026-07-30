/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : calendar.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez calendar.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Calendrier, interactive demo styled like the REAL app */

var CAL_TYPES = [{
  id: "phase",
  fr: "Échéance de phase",
  en: "Phase deadline",
  color: "#C9A86A"
}, {
  id: "reunion",
  fr: "Réunion",
  en: "Meeting",
  color: "#6E8CA8"
}, {
  id: "visite",
  fr: "Visite chantier",
  en: "Site visit",
  color: "#4E9668"
}, {
  id: "decision",
  fr: "Décision à valider",
  en: "Decision to approve",
  color: "#C0614F"
}, {
  id: "devis",
  fr: "Livraison devis",
  en: "Quote delivery",
  color: "#8A7AA8"
}, {
  id: "admin",
  fr: "RDV administratif",
  en: "Admin appointment",
  color: "#7A8296"
}, {
  id: "conges",
  fr: "Congés / absences",
  en: "Time off",
  color: "#B87FA2"
}, {
  id: "intervention",
  fr: "Intervention",
  en: "Intervention",
  color: "#C98A4B"
}];
var CAL_PROJECTS = [{
  name: "Grange Lissieu",
  dot: "#C9A86A"
}, {
  name: "Maison Écully",
  dot: "#7E9A7E"
}, {
  name: "Atelier Paris 11e",
  dot: "#6E8CA8"
}];
var CAL_EVENTS = [{
  id: 1,
  d: 2,
  type: "reunion",
  proj: "Maison Écully",
  time: "09:30",
  title: "Réunion MOA — cuisine"
}, {
  id: 2,
  d: 3,
  type: "devis",
  proj: "Atelier Paris 11e",
  time: null,
  title: "Devis lot 07 — menuiseries"
}, {
  id: 3,
  d: 6,
  type: "decision",
  proj: "Grange Lissieu",
  time: null,
  title: "Valider enduit chaux"
}, {
  id: 4,
  d: 8,
  type: "visite",
  proj: "Grange Lissieu",
  time: "08:00",
  title: "Visite chantier n°12"
}, {
  id: 5,
  d: 8,
  type: "decision",
  proj: "Grange Lissieu",
  time: null,
  title: "Valider châssis acier"
}, {
  id: 6,
  d: 9,
  type: "reunion",
  proj: "Atelier Paris 11e",
  time: "14:00",
  title: "Point BET structure"
}, {
  id: 7,
  d: 10,
  type: "phase",
  proj: "Maison Écully",
  time: null,
  title: "Fin de phase PRO"
}, {
  id: 8,
  d: 15,
  type: "visite",
  proj: "Maison Écully",
  time: "10:00",
  title: "Visite chantier n°4"
}, {
  id: 9,
  d: 16,
  type: "admin",
  proj: "Atelier Paris 11e",
  time: "11:00",
  title: "Dépôt DP — mairie du 11e"
}, {
  id: 10,
  d: 17,
  type: "decision",
  proj: "Grange Lissieu",
  time: null,
  title: "Choix robinetterie laiton"
}, {
  id: 11,
  d: 21,
  type: "reunion",
  proj: "Grange Lissieu",
  time: "18:00",
  title: "Réunion MOA — M. Lévy"
}, {
  id: 12,
  d: 22,
  type: "visite",
  proj: "Grange Lissieu",
  time: "08:00",
  title: "Visite chantier n°13"
}, {
  id: 13,
  d: 24,
  type: "phase",
  proj: "Atelier Paris 11e",
  time: null,
  title: "Rendu APD"
}, {
  id: 14,
  d: 28,
  type: "devis",
  proj: "Grange Lissieu",
  time: null,
  title: "Devis lot 03 — maçonnerie"
}, {
  id: 15,
  d: 30,
  type: "visite",
  proj: "Atelier Paris 11e",
  time: "09:00",
  title: "Visite chantier n°2"
}, {
  id: 16,
  d: 31,
  type: "phase",
  proj: "Grange Lissieu",
  time: null,
  title: "Fin de phase DCE"
}];

/* Juillet 2026 — le 1er tombe un mercredi, aujourd'hui = dimanche 12 */
var CAL_WEEKS = [{
  n: "S27",
  days: [{
    d: 29,
    out: true
  }, {
    d: 30,
    out: true
  }, {
    d: 1
  }, {
    d: 2
  }, {
    d: 3
  }, {
    d: 4
  }, {
    d: 5
  }]
}, {
  n: "S28",
  days: [{
    d: 6
  }, {
    d: 7
  }, {
    d: 8
  }, {
    d: 9
  }, {
    d: 10
  }, {
    d: 11
  }, {
    d: 12
  }]
}, {
  n: "S29",
  days: [{
    d: 13
  }, {
    d: 14
  }, {
    d: 15
  }, {
    d: 16
  }, {
    d: 17
  }, {
    d: 18
  }, {
    d: 19
  }]
}, {
  n: "S30",
  days: [{
    d: 20
  }, {
    d: 21
  }, {
    d: 22
  }, {
    d: 23
  }, {
    d: 24
  }, {
    d: 25
  }, {
    d: 26
  }]
}, {
  n: "S31",
  days: [{
    d: 27
  }, {
    d: 28
  }, {
    d: 29
  }, {
    d: 30
  }, {
    d: 31
  }, {
    d: 1,
    out: true
  }, {
    d: 2,
    out: true
  }]
}];
var CAL_TODAY = 12;
var CAL_SIDE_ITEMS_GET = function CAL_SIDE_ITEMS_GET() {
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
    icon: "calendar",
    active: true
  }, {
    label: L("E-mails automatiques", "Automatic emails"),
    icon: "chat"
  }, {
    label: L("Calculateur", "Calculator"),
    icon: "euro"
  }, {
    label: L("Bibliothèque matériaux", "Material library"),
    icon: "layers"
  }, {
    label: L("Archives", "Archives"),
    icon: "doc"
  }];
};
var CalendarDemo = function CalendarDemo() {
  var _React$useState = React.useState(8),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sel = _React$useState2[0],
    setSel = _React$useState2[1];
  var _React$useState3 = React.useState("mois"),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    view = _React$useState4[0],
    setView = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    evOpen = _React$useState6[0],
    setEvOpen = _React$useState6[1];
  var _React$useState7 = React.useState("Réunion"),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    evType = _React$useState8[0],
    setEvType = _React$useState8[1];
  var _React$useState9 = React.useState({
      "Grange Lissieu": true,
      "Maison Écully": true,
      "Atelier Paris 11e": true
    }),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    projOn = _React$useState0[0],
    setProjOn = _React$useState0[1];
  var _React$useState1 = React.useState(CAL_TYPES.reduce(function (a, t) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, t.id, true));
    }, {})),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    typeOn = _React$useState10[0],
    setTypeOn = _React$useState10[1];
  var typeOf = function typeOf(id) {
    return CAL_TYPES.find(function (t) {
      return t.id === id;
    });
  };
  var typeLabel = function typeLabel(id) {
    var t = typeOf(id);
    return L(t.fr, t.en);
  };
  var projDot = function projDot(name) {
    return (CAL_PROJECTS.find(function (p) {
      return p.name === name;
    }) || {}).dot;
  };
  var visible = CAL_EVENTS.filter(function (e) {
    return projOn[e.proj] && typeOn[e.type];
  });
  var evFor = function evFor(d) {
    return visible.filter(function (e) {
      return e.d === d;
    });
  };
  var statWeek = visible.filter(function (e) {
    return e.d >= 6 && e.d <= 12;
  }).length;
  var statVisites = visible.filter(function (e) {
    return e.type === "visite" && e.d >= CAL_TODAY;
  }).length;
  var statEch = visible.filter(function (e) {
    return e.type === "phase" || e.type === "decision";
  }).length;
  var statTotal = visible.filter(function (e) {
    return e.d >= CAL_TODAY;
  }).length;
  var upcoming = visible.filter(function (e) {
    return e.d >= CAL_TODAY && (e.type === "phase" || e.type === "decision" || e.type === "devis");
  }).sort(function (a, b) {
    return a.d - b.d;
  }).slice(0, 3);
  var agenda = _toConsumableArray(visible).sort(function (a, b) {
    return a.d - b.d || (a.time || "z").localeCompare(b.time || "z");
  });
  var DOWS = L(["LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM.", "DIM."], ["MON.", "TUE.", "WED.", "THU.", "FRI.", "SAT.", "SUN."]);
  var DOW_FULL_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  var DOW_FULL_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var DOW_SHORT_FR = ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."];
  var dowIdx = function dowIdx(d) {
    return new Date(2026, 6, d).getDay();
  };
  var dayTitle = function dayTitle(d) {
    return L("".concat(DOW_FULL_FR[dowIdx(d)], " ").concat(d, " juillet"), "".concat(DOW_FULL_EN[dowIdx(d)], ", July ").concat(d));
  };
  var selEvents = evFor(sel);
  var typeCount = function typeCount(id) {
    return CAL_EVENTS.filter(function (e) {
      return e.type === id;
    }).length;
  };
  var projOnCount = Object.values(projOn).filter(Boolean).length;
  var typeOnCount = Object.values(typeOn).filter(Boolean).length;
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var app = document.querySelector(".cal-app");
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
  var Check = function Check(_ref) {
    var on = _ref.on,
      onClick = _ref.onClick,
      dot = _ref.dot,
      label = _ref.label,
      count = _ref.count;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "cal-check ".concat(on ? "is-on" : ""),
      onClick: onClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "cc-box"
    }, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 8,
      stroke: 2.5
    })), dot && /*#__PURE__*/React.createElement("span", {
      className: "chip-dot",
      style: {
        background: dot
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "cc-label"
    }, label), count != null && /*#__PURE__*/React.createElement("em", null, count));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "calendar-section",
    id: "calendrier"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Coordination", "Coordination")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, L("Toutes vos échéances, ", "Every deadline, "), /*#__PURE__*/React.createElement("em", null, L("sur une seule vue.", "on a single view."))), /*#__PURE__*/React.createElement("p", null, L("Réunions MOA, visites de chantier, décisions à valider, fins de phase, le calendrier croise tous vos projets et se filtre en un clic.", "Client meetings, site visits, pending decisions, phase deadlines, the calendar spans all your projects and filters in one click."))), /*#__PURE__*/React.createElement("div", {
    className: "cal-app"
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
  }), " alba-studio.co/calendrier"), /*#__PURE__*/React.createElement("div", {
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
  }, CAL_SIDE_ITEMS_GET().map(function (it) {
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
  }, /*#__PURE__*/React.createElement("span", null, "Studio"), " \u203A ", /*#__PURE__*/React.createElement("span", null, L("Espace de travail", "Workspace")), " \u203A ", /*#__PURE__*/React.createElement("b", null, L("Calendrier", "Calendar")), /*#__PURE__*/React.createElement("button", {
    className: "cal-ghost-btn"
  }, L("Exporter", "Export")), /*#__PURE__*/React.createElement("button", {
    className: "ml-add-btn",
    style: {
      marginLeft: 0
    },
    onClick: function onClick() {
      return setEvOpen(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  }), " ", L("Nouvel événement", "New event"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-header-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-workspace"
  }, L("WORKSPACE · STUDIO ALBA", "WORKSPACE · STUDIO ALBA")), /*#__PURE__*/React.createElement("h3", {
    className: "ml-title"
  }, L("Calendrier", "Calendar")), /*#__PURE__*/React.createElement("p", {
    className: "ml-desc"
  }, L("Toutes les échéances, réunions et visites de vos projets en cours, sur une seule vue.", "Every deadline, meeting and site visit across your live projects, on one view."))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("CETTE SEMAINE", "THIS WEEK")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, statWeek), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("événements", "events"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("VISITES", "SITE VISITS")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, statVisites), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("à venir", "upcoming"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("ÉCHÉANCES", "DEADLINES")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, statEch), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("phases & décisions", "phases & decisions"))), /*#__PURE__*/React.createElement("div", {
    className: "ml-stat gold"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, L("AU TOTAL", "IN TOTAL")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, statTotal), /*#__PURE__*/React.createElement("div", {
    className: "f"
  }, L("événements à venir", "upcoming events"))))), /*#__PURE__*/React.createElement("div", {
    className: "cal-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-nav"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "pr\xE9c\xE9dent"
  }, "\u2039"), /*#__PURE__*/React.createElement("span", null, L("Aujourd'hui", "Today")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "suivant"
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    className: "cal-month"
  }, L("Juillet 2026", "July 2026")), /*#__PURE__*/React.createElement("div", {
    className: "cal-views"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: view === "mois" ? "is-active" : "",
    onClick: function onClick() {
      return setView("mois");
    }
  }, L("Mois", "Month")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "is-off",
    title: L("Disponible dans l'application", "Available in the app")
  }, L("Semaine", "Week")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: view === "agenda" ? "is-active" : "",
    onClick: function onClick() {
      return setView("agenda");
    }
  }, L("Agenda", "Agenda")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "is-off",
    title: L("Disponible dans l'application", "Available in the app")
  }, "Gantt"))), /*#__PURE__*/React.createElement("div", {
    className: "cal-body"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "cal-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-card cal-mini"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-mini-head"
  }, L("juillet 2026", "July 2026")), /*#__PURE__*/React.createElement("div", {
    className: "cal-mini-grid"
  }, L(["L", "M", "M", "J", "V", "S", "D"], ["M", "T", "W", "T", "F", "S", "S"]).map(function (d, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "mh"
    }, d);
  }), CAL_WEEKS.flatMap(function (w) {
    return w.days;
  }).map(function (c, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "md ".concat(c.out ? "out" : "", " ").concat(!c.out && c.d === CAL_TODAY ? "today" : "", " ").concat(!c.out && c.d === sel ? "sel" : ""),
      onClick: function onClick() {
        return !c.out && setSel(c.d);
      }
    }, c.d, !c.out && evFor(c.d).length > 0 && /*#__PURE__*/React.createElement("i", null));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-filter-head"
  }, L("PROJETS", "PROJECTS"), " ", /*#__PURE__*/React.createElement("em", null, projOnCount, "/", CAL_PROJECTS.length)), CAL_PROJECTS.map(function (p) {
    return /*#__PURE__*/React.createElement(Check, {
      key: p.name,
      on: projOn[p.name],
      dot: p.dot,
      label: p.name,
      onClick: function onClick() {
        return setProjOn(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, p.name, !o[p.name]));
        });
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "cal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-filter-head"
  }, L("TYPES D'ÉVÉNEMENTS", "EVENT TYPES"), " ", /*#__PURE__*/React.createElement("em", null, typeOnCount, "/", CAL_TYPES.length)), CAL_TYPES.map(function (t) {
    return /*#__PURE__*/React.createElement(Check, {
      key: t.id,
      on: typeOn[t.id],
      dot: t.color,
      label: typeLabel(t.id),
      count: typeCount(t.id),
      onClick: function onClick() {
        return setTypeOn(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, t.id, !o[t.id]));
        });
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "cal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-filter-head"
  }, L("COLLABORATEURS", "TEAM"), " ", /*#__PURE__*/React.createElement("em", null, "1/1")), /*#__PURE__*/React.createElement(Check, {
    on: true,
    dot: "#C9A86A",
    label: "Filipe De Sousa",
    onClick: function onClick() {}
  }))), view === "mois" ? /*#__PURE__*/React.createElement("div", {
    className: "cal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-grid-head"
  }, /*#__PURE__*/React.createElement("span", null), DOWS.map(function (d) {
    return /*#__PURE__*/React.createElement("span", {
      key: d
    }, d);
  })), CAL_WEEKS.map(function (w) {
    return /*#__PURE__*/React.createElement("div", {
      key: w.n,
      className: "cal-week"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cal-wnum"
    }, w.n), w.days.map(function (c, i) {
      var evs = c.out ? [] : evFor(c.d);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "cal-cell ".concat(c.out ? "out" : "", " ").concat(!c.out && c.d === CAL_TODAY ? "today" : "", " ").concat(!c.out && c.d === sel ? "sel" : ""),
        onClick: function onClick() {
          return !c.out && setSel(c.d);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "cal-cell-top"
      }, /*#__PURE__*/React.createElement("span", {
        className: "dnum"
      }, c.d), !c.out && c.d === CAL_TODAY && /*#__PURE__*/React.createElement("span", {
        className: "auj"
      }, L("AUJ.", "TODAY"))), evs.map(function (e) {
        return /*#__PURE__*/React.createElement("div", {
          key: e.id,
          className: "cal-ev",
          title: e.title
        }, /*#__PURE__*/React.createElement("span", {
          className: "ed",
          style: {
            background: typeOf(e.type).color
          }
        }), /*#__PURE__*/React.createElement("span", null, e.title));
      }));
    }));
  })) : /*#__PURE__*/React.createElement("div", {
    className: "cal-agenda"
  }, agenda.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cal-empty"
  }, L("Aucun événement, ajustez les filtres.", "No events, adjust the filters.")), agenda.map(function (e) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: e.id,
      className: "cal-ag-row ".concat(e.d < CAL_TODAY ? "past" : "", " ").concat(e.d === sel ? "sel" : ""),
      onClick: function onClick() {
        return setSel(e.d);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-date"
    }, DOW_SHORT_FR[dowIdx(e.d)], " ", e.d), /*#__PURE__*/React.createElement("span", {
      className: "ed",
      style: {
        background: typeOf(e.type).color
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "ag-title"
    }, e.title), /*#__PURE__*/React.createElement("span", {
      className: "ag-meta"
    }, e.time || L("Journée", "All day"), " \xB7 ", e.proj));
  })), /*#__PURE__*/React.createElement("aside", {
    className: "cal-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-filter-head"
  }, L("JOUR SÉLECTIONNÉ", "SELECTED DAY"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cal-plus",
    "aria-label": L("Ajouter", "Add")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cal-day-title"
  }, dayTitle(sel)), /*#__PURE__*/React.createElement("div", {
    className: "cal-day-count"
  }, selEvents.length, " ", selEvents.length > 1 ? L("événements", "events") : L("événement", "event")), selEvents.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cal-empty"
  }, L("Aucun événement ce jour.", "No events this day.")), selEvents.map(function (e) {
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      className: "cal-day-ev"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ed",
      style: {
        background: typeOf(e.type).color
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "de-title"
    }, e.title), /*#__PURE__*/React.createElement("div", {
      className: "de-meta"
    }, e.time || L("Journée", "All day"), " \xB7 ", e.proj, " \xB7 ", typeLabel(e.type))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "cal-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-filter-head"
  }, L("PROCHAINES ÉCHÉANCES", "NEXT DEADLINES")), /*#__PURE__*/React.createElement("div", {
    className: "cal-next-sub"
  }, L("Phases, décisions et devis à venir", "Upcoming phases, decisions & quotes")), upcoming.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "cal-empty"
  }, L("Rien à venir.", "Nothing upcoming.")), upcoming.map(function (e) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: e.id,
      className: "cal-next-row",
      onClick: function onClick() {
        return setSel(e.d);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nx-date"
    }, e.d, " ", L("JUIL.", "JUL")), /*#__PURE__*/React.createElement("span", {
      className: "ed",
      style: {
        background: typeOf(e.type).color
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "nx-title"
    }, e.title));
  })))))), evOpen && /*#__PURE__*/React.createElement("div", {
    className: "mam-overlay",
    onClick: function onClick() {
      return setEvOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mam-modal cal-ev-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mam-close",
    onClick: function onClick() {
      return setEvOpen(false);
    },
    "aria-label": L("Fermer", "Close")
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "mam-head"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mam-title",
    style: {
      marginTop: 0
    }
  }, L("Nouvel événement", "New event")), /*#__PURE__*/React.createElement("p", {
    className: "mam-sub",
    style: {
      maxWidth: "38ch"
    }
  }, L("Les événements sont créés dans la fiche du projet pour préserver le contexte (signatures, décisions, traçabilité). On vous y emmène.", "Events are created inside the project so context is preserved (signatures, decisions, traceability). We'll take you there."))), /*#__PURE__*/React.createElement("div", {
    className: "cal-ev-body"
  }, /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("TYPE", "TYPE")), /*#__PURE__*/React.createElement("div", {
    className: "cal-ev-types"
  }, [L("Réunion", "Meeting"), L("Visite", "Site visit"), L("Phase", "Phase")].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      className: evType === t ? "is-active" : "",
      onClick: function onClick() {
        return setEvType(t);
      }
    }, t);
  })), /*#__PURE__*/React.createElement("label", {
    className: "mam-label"
  }, L("PROJET", "PROJECT")), /*#__PURE__*/React.createElement("div", {
    className: "mam-input"
  }, "Grange Lissieu ", /*#__PURE__*/React.createElement("span", {
    className: "mam-caret"
  }, "\u25BE")), /*#__PURE__*/React.createElement("div", {
    className: "cal-ev-ref"
  }, L("Date de r\xE9f\xE9rence : ".concat(dayTitle(sel).toLowerCase(), " 2026"), "Reference date: ".concat(dayTitle(sel), ", 2026")))), /*#__PURE__*/React.createElement("div", {
    className: "mam-foot",
    style: {
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mam-cancel",
    onClick: function onClick() {
      return setEvOpen(false);
    }
  }, L("Annuler", "Cancel")), /*#__PURE__*/React.createElement("button", {
    className: "mam-submit",
    onClick: function onClick() {
      return setEvOpen(false);
    }
  }, L("Ouvrir le projet", "Open the project")))))), /*#__PURE__*/React.createElement("div", {
    className: "cal-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), L("Démo interactive, filtrez par projet ou par type, cliquez un jour : le panneau et les compteurs réagissent", "Interactive demo, filter by project or type, click a day: the panel and counters react"))));
};
window.CalendarDemo = CalendarDemo;
