/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : components.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez components.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["name", "size", "stroke"],
  _excluded2 = ["src", "alt", "sizes", "className", "loading", "fetchPriority"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* Shared UI atoms, icons, image placeholders, app mockups */

var Icon = function Icon(_ref) {
  var name = _ref.name,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 18 : _ref$size,
    _ref$stroke = _ref.stroke,
    stroke = _ref$stroke === void 0 ? 1.5 : _ref$stroke,
    rest = _objectWithoutProperties(_ref, _excluded);
  var s = _objectSpread({
    width: size,
    height: size
  }, rest.style);
  var common = _objectSpread({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, rest);
  switch (name) {
    case "arrow-right":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14M13 6l6 6-6 6"
      }));
    case "arrow-up-right":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M7 17 17 7M8 7h9v9"
      }));
    case "check":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M4 12.5 9 17.5 20 6.5"
      }));
    case "x":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M6 6l12 12M6 18 18 6"
      }));
    case "plus":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }));
    case "minus":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14"
      }));
    case "sparkle":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"
      }));
    case "folder":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
      }));
    case "chat":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M21 12a8 8 0 0 1-12.5 6.6L3 20l1.4-5.5A8 8 0 1 1 21 12Z"
      }));
    case "calendar":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "5",
        width: "18",
        height: "16",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 9h18M8 3v4M16 3v4"
      }));
    case "doc":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M14 3v6h6M9 14h6M9 17h4"
      }));
    case "shield":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z"
      }));
    case "compass":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m15 9-2 5-5 2 2-5z"
      }));
    case "layers":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m12 3 9 5-9 5-9-5z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m3 13 9 5 9-5M3 17l9 5 9-5"
      }));
    case "users":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "8",
        r: "3.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 19c0-3 2.5-5 6-5s6 2 6 5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "17",
        cy: "9",
        r: "2.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 18c0-2-1.5-3.5-4-3.5"
      }));
    case "bell":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M6 17h12l-1.5-2v-4a4.5 4.5 0 1 0-9 0v4Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 20a2 2 0 0 0 4 0"
      }));
    case "search":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m20 20-4.5-4.5"
      }));
    case "menu-grid":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "3",
        width: "7",
        height: "7",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "14",
        width: "7",
        height: "7",
        rx: "1"
      }));
    case "wave":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 12c2 0 2-3 4-3s2 6 4 6 2-9 4-9 2 6 4 6 2-3 2-3"
      }));
    case "pulse":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 12h4l3-7 4 14 3-7h4"
      }));
    case "euro":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M19 6a8 8 0 1 0 0 12M3 10h10M3 14h10"
      }));
    case "clock":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 7v5l3 2"
      }));
    case "star":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m12 3 2.6 5.4 6 .9-4.3 4.2 1 6L12 16.8 6.7 19.5l1-6L3.4 9.3l6-.9z"
      }));
    case "lock":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "4",
        y: "11",
        width: "16",
        height: "10",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 11V8a4 4 0 1 1 8 0v3"
      }));
    case "globe":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
      }));
    case "sun":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4.2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
      }));
    case "cloud":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 6.97Z"
      }));
    case "cloud-sun":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M6 8.5a3 3 0 0 1 5.9-.8M4 5.5l1 1M9.5 3v1.4M14 5.5l-1 1M2.5 11H4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 20a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 19 11.5a3.5 3.5 0 0 1 .5 6.97Z"
      }));
    case "rain":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 6.5a3.5 3.5 0 0 1 .5 6.97"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5"
      }));
    case "storm":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 6.5a3.5 3.5 0 0 1 .5 6.97"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m12 14-2 3.5h3L11 21"
      }));
    case "wind":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 9h11a2.5 2.5 0 1 0-2.5-2.5M3 14h15a2.5 2.5 0 1 1-2.5 2.5M3 12h7"
      }));
    case "droplet":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z"
      }));
    case "bot":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "4",
        y: "8",
        width: "16",
        height: "11",
        rx: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 4v4M8.5 13v1.5M15.5 13v1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "3.2",
        r: "1.2"
      }));
    case "send":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M4 12 20 4l-6 16-2.5-6.5z"
      }));
    /* Ajouté pour le message de retour de l'essai express. Sans lui, `default`
       renvoie null : l'icône disparaissait sans que rien ne le signale. */
    case "info":
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 11v5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "7.8",
        r: ".9",
        fill: "currentColor",
        stroke: "none"
      }));
    default:
      return null;
  }
};

/* Photo placeholder, tonal, no real photos used (architecture vibe) */
var PhotoPlaceholder = function PhotoPlaceholder(_ref2) {
  var _ref2$label = _ref2.label,
    label = _ref2$label === void 0 ? "ARCHITECTURE" : _ref2$label,
    _ref2$tone = _ref2.tone,
    tone = _ref2$tone === void 0 ? "stone" : _ref2$tone,
    _ref2$ratio = _ref2.ratio,
    ratio = _ref2$ratio === void 0 ? "16/9" : _ref2$ratio,
    style = _ref2.style;
  var tones = {
    stone: {
      a: "#59637A",
      b: "#2C313D",
      c: "#A8987A"
    },
    forest: {
      a: "#3B4E3D",
      b: "#1F2E25",
      c: "#5C7560"
    },
    terracotta: {
      a: "#A86547",
      b: "#5C2E1E",
      c: "#D08F6E"
    },
    sky: {
      a: "#5C7088",
      b: "#2A3850",
      c: "#8AA0BB"
    },
    night: {
      a: "#1F2A45",
      b: "#0E1729",
      c: "#3B4A6E"
    },
    sand: {
      a: "#C4A87B",
      b: "#7E6741",
      c: "#E0CB9F"
    }
  };
  var t = tones[tone] || tones.stone;
  return /*#__PURE__*/React.createElement("div", {
    className: "photo-ph",
    style: _objectSpread({
      aspectRatio: ratio
    }, style)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 400 225",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "g-".concat(tone),
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: t.c
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: t.a
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: t.b
  })), /*#__PURE__*/React.createElement("pattern", {
    id: "p-".concat(tone),
    width: "3",
    height: "3",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "3",
    height: "3",
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0.5",
    cy: "0.5",
    r: "0.4",
    fill: "rgba(255,255,255,0.06)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "225",
    fill: "url(#g-".concat(tone, ")")
  }), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "225",
    fill: "url(#p-".concat(tone, ")")
  }), /*#__PURE__*/React.createElement("g", {
    opacity: "0.35",
    fill: t.b
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0,225 0,160 90,120 160,150 220,110 300,140 400,100 400,225"
  })), /*#__PURE__*/React.createElement("g", {
    opacity: "0.18",
    fill: "#000"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "200",
    width: "400",
    height: "25"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "photo-ph-label"
  }, label));
};

/* Badges App Store / Google Play */
/* Les deux badges pointent vers #contact, la section « parlons-en » de
   l'accueil. Ils sont aussi montés dans le pied de page des mentions légales,
   qui n'a pas de section #contact : on y cliquait sans que rien ne se passe.
   Le fragment nu est conservé sur l'accueil — c'est lui qui déclenche le
   défilement doux ; ailleurs il devient une vraie navigation. */
var versContact = function versContact() {
  if (typeof window === "undefined") return "index.html#contact";
  var p = window.location.pathname;
  /* /en est un accueil au même titre que / : le fragment nu y déclenche le
     défilement doux, et ne doit pas renvoyer vers la version française. */
  if (p === "/" || /\/index\.html$/.test(p) || p === "/en" || p === "/en.html") return "#contact";
  var accueil = typeof window !== "undefined" && window.__albaLien ? window.__albaLien("/") : "/";
  return "".concat(accueil === "/" ? "index.html" : accueil, "#contact");
};
var StoreBadges = function StoreBadges(_ref3) {
  var _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    _ref3$theme = _ref3.theme,
    theme = _ref3$theme === void 0 ? "dark" : _ref3$theme;
  return /*#__PURE__*/React.createElement("div", {
    className: "store-badges ".concat(theme, " ").concat(className)
  }, /*#__PURE__*/React.createElement("a", {
    href: versContact(),
    className: "store-badge",
    "aria-label": "App Store"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "19",
    height: "19",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.3zM14.3 5.5c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2z"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", null, L("Télécharger sur", "Download on the")), /*#__PURE__*/React.createElement("b", null, "App Store"))), /*#__PURE__*/React.createElement("a", {
    href: versContact(),
    className: "store-badge",
    "aria-label": "Google Play"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M4.3 21.2c-.2-.2-.3-.5-.3-.9l8.3-8.3 2.6 2.6-9.8 5.6c-.3.2-.6.2-.8 0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M14.9 14.6 12.3 12l2.6-2.6 3.3 1.9c.7.4.7 1.4 0 1.8l-3.3 1.5z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC04",
    d: "M4.3 2.8c.2-.2.5-.2.8 0l9.8 5.6-2.6 2.6L4 3.7c0-.4.1-.7.3-.9z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M4 3.7 12.3 12 4 20.3c-.1-.2-.2-.5-.2-.8V4.5c0-.3.1-.6.2-.8z"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", null, L("Disponible sur", "Get it on")), /*#__PURE__*/React.createElement("b", null, "Google Play"))), /*#__PURE__*/React.createElement("p", {
    className: "store-note"
  }, L("L'application accompagne votre compte. La souscription et la gestion de l'abonnement se font depuis le web.", "The app companions your account. Subscription and billing are managed on the web.")));
};

/* App mockup, full cockpit */
var AppMockup = function AppMockup(_ref4) {
  var _ref4$variant = _ref4.variant,
    variant = _ref4$variant === void 0 ? "cockpit" : _ref4$variant,
    _ref4$scale = _ref4.scale,
    scale = _ref4$scale === void 0 ? 1 : _ref4$scale;
  if (variant === "cockpit") return /*#__PURE__*/React.createElement(MockupCockpit, null);
  if (variant === "project") return /*#__PURE__*/React.createElement(MockupProject, null);
  if (variant === "decisions") return /*#__PURE__*/React.createElement(MockupDecisions, null);
  if (variant === "messagerie") return /*#__PURE__*/React.createElement(MockupMessagerie, null);
  if (variant === "materiaux") return /*#__PURE__*/React.createElement(MockupMateriaux, null);
  if (variant === "chantier") return /*#__PURE__*/React.createElement(MockupChantier, null);
  return /*#__PURE__*/React.createElement(MockupCockpit, null);
};
var MockupShell = function MockupShell(_ref5) {
  var children = _ref5.children,
    _ref5$title = _ref5.title,
    title = _ref5$title === void 0 ? "alba-studio.co" : _ref5$title;
  return /*#__PURE__*/React.createElement("div", {
    className: "mockup"
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
  }), " ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mockup-body"
  }, children));
};
var MockupSidebar = function MockupSidebar(_ref6) {
  var _ref6$active = _ref6.active,
    active = _ref6$active === void 0 ? "Cockpit" : _ref6$active,
    _ref6$mode = _ref6.mode,
    mode = _ref6$mode === void 0 ? "project" : _ref6$mode;
  var workspaceItems = [{
    label: "Tableau de bord",
    icon: "menu-grid"
  }, {
    label: "Projets",
    icon: "folder"
  }, {
    label: "Maîtres d'ouvrage",
    icon: "users"
  }, {
    label: "Calendrier",
    icon: "calendar"
  }, {
    label: "Calculateur",
    icon: "euro"
  }, {
    label: "Bibliothèque matériaux",
    icon: "layers"
  }, {
    label: "Archives",
    icon: "doc"
  }];
  var projectGroups = [{
    name: "CONFIGURATION",
    items: [{
      label: "Lots & corps d'état",
      icon: "layers"
    }, {
      label: "Paramètres projet",
      icon: "compass"
    }, {
      label: "Cockpit",
      icon: "menu-grid"
    }, {
      label: "Existant",
      icon: "folder"
    }]
  }, {
    name: "SUIVI",
    items: [{
      label: "Projet",
      icon: "pulse",
      badge: "16"
    }, {
      label: "Décisions & budget",
      icon: "check"
    }, {
      label: "Documents",
      icon: "doc"
    }]
  }, {
    name: "PERSONNES & ACCÈS",
    items: [{
      label: "Accès & équipe",
      icon: "users"
    }, {
      label: "Chat",
      icon: "chat"
    }]
  }];
  var groups = mode === "workspace" ? [{
    name: null,
    items: workspaceItems
  }] : projectGroups;
  return /*#__PURE__*/React.createElement("aside", {
    className: "m-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-brand-mark"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/logo-alba.png",
    alt: "ALBA Studio",
    style: {
      width: "72%",
      height: "72%",
      objectFit: "contain",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-brand-name"
  }, "ALBA Studio"), /*#__PURE__*/React.createElement("div", {
    className: "m-brand-sub"
  }, "\u2014 Made in France"))), mode === "project" && /*#__PURE__*/React.createElement("div", {
    className: "m-side-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 8,
      letterSpacing: "0.08em",
      color: "rgba(233, 236, 242,0.5)",
      marginBottom: 5
    }
  }, "\u2039 TOUS LES PROJETS"), /*#__PURE__*/React.createElement("div", {
    className: "m-side-title"
  }, "Grange Lissieu"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(233, 236, 242,0.6)",
      margin: "2px 0 7px"
    }
  }, "340 m\xB2 \xB7 Lissieu"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-mono)",
      fontSize: 7.5,
      letterSpacing: "0.07em",
      color: "#7ED9A0",
      background: "rgba(74,222,128,0.1)",
      border: "1px solid rgba(74,222,128,0.25)",
      borderRadius: 999,
      padding: "2px 7px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill ok"
  }), " ESPACE PUBLI\xC9")), groups.map(function (g, gi) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: gi
    }, g.name && /*#__PURE__*/React.createElement("div", {
      className: "m-side-eyebrow",
      style: {
        marginTop: 12
      }
    }, g.name), /*#__PURE__*/React.createElement("ul", {
      className: "m-side-list",
      style: !g.name ? {
        marginTop: 12
      } : null
    }, g.items.map(function (it) {
      return /*#__PURE__*/React.createElement("li", {
        key: it.label,
        className: active === it.label ? "is-active" : ""
      }, /*#__PURE__*/React.createElement(Icon, {
        name: it.icon,
        size: 14
      }), " ", /*#__PURE__*/React.createElement("span", null, it.label), it.badge && /*#__PURE__*/React.createElement("span", {
        className: "m-badge"
      }, it.badge));
    })));
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-side-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-avatar"
  }, "A"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500
    }
  }, "Anthony"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(233, 236, 242,0.66)"
    }
  }, "Phase courante \xB7 APS"))));
};
var MockupCockpit = function MockupCockpit() {
  return /*#__PURE__*/React.createElement(MockupShell, {
    title: "alba-studio.co/grange-lissieu/cockpit"
  }, /*#__PURE__*/React.createElement(MockupSidebar, {
    active: "Cockpit"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-crumbs",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, "Projets ", /*#__PURE__*/React.createElement("span", null, "\u203A"), " Grange Lissieu ", /*#__PURE__*/React.createElement("span", null, "\u203A"), " ", /*#__PURE__*/React.createElement("b", null, "Cockpit"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light xs",
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 10
  }), " Nouvelle action")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: "hidden",
      background: "#10182C",
      border: "1px solid rgba(255,255,255,0.06)",
      display: "grid",
      gridTemplateColumns: "1.45fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 14px",
      background: "radial-gradient(120% 140% at 0% 0%, rgba(201,168,106,0.16), transparent 55%)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-mono)",
      fontSize: 6.5,
      letterSpacing: "0.12em",
      color: "rgba(233, 236, 242,0.8)",
      border: "1px solid rgba(255,255,255,0.16)",
      borderRadius: 999,
      padding: "3px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill ok"
  }), " LISSIEU, 69380 \xB7 R\xC9NOVATION"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      fontWeight: 500,
      color: "#E9ECF2",
      margin: "8px 0 3px",
      letterSpacing: "-0.01em"
    }
  }, "Grange Lissieu"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "rgba(233, 236, 242,0.65)",
      marginBottom: 12
    }
  }, "R\xE9novation \xE0 Lissieu (340 m\xB2) \u2014 Suivi pilot\xE9 pour Marine Armand."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light xs"
  }, "Demander une validation"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini ghost xs",
    style: {
      borderColor: "rgba(255,255,255,0.22)",
      color: "#E9ECF2"
    }
  }, "Aper\xE7u c\xF4t\xE9 MO"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini ghost xs",
    style: {
      borderColor: "rgba(255,255,255,0.22)",
      color: "#E9ECF2"
    }
  }, "Mettre en pause"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.03)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px 14px",
      alignContent: "center"
    }
  }, [{
    k: "AVANCEMENT GLOBAL",
    v: "43",
    u: "%",
    f: "Permis en retard de 113 j",
    warn: true
  }, {
    k: "PHASE COURANTE",
    v: "APS",
    f: "Échéance · 27 mars"
  }, {
    k: "BUDGET GLOBAL",
    v: "217",
    u: "k€",
    f: "↗ +1 avenant"
  }, {
    k: "DÉCISIONS EN ATTENTE",
    v: "1",
    f: "APS — Choix confirmé"
  }].map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 6.5,
        letterSpacing: "0.12em",
        color: "rgba(233, 236, 242,0.5)",
        whiteSpace: "nowrap"
      }
    }, s.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 19,
        color: "#E9ECF2",
        margin: "3px 0 2px"
      }
    }, s.v, s.u && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "rgba(233, 236, 242,0.6)"
      }
    }, " ", s.u)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 7.5,
        color: s.warn ? "#FF9C8A" : "rgba(233, 236, 242,0.55)"
      }
    }, s.f));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-stats"
  }, [{
    k: "PHASES",
    v: "3",
    d: "/7",
    f: "◇ 1 phase en retard",
    warn: true
  }, {
    k: "DÉCISIONS",
    v: "1",
    d: "/5",
    f: "1 à décider par le MO"
  }, {
    k: "BUDGET CONSOMMÉ",
    v: "0 €",
    f: "sur 18 000 € d'honoraires"
  }, {
    k: "LIVRAISON ESTIMÉE",
    v: "8 mai 26",
    f: "déduit fin de Chantier"
  }].map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.k,
      className: "m-stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-stat-eyebrow"
    }, s.k), /*#__PURE__*/React.createElement("div", {
      className: "m-stat-val",
      style: s.v.length > 4 ? {
        fontSize: 16
      } : null
    }, s.v, s.d && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#98A0B0"
      }
    }, s.d)), /*#__PURE__*/React.createElement("div", {
      className: "m-stat-foot",
      style: s.warn ? {
        color: "#C0614F"
      } : null
    }, s.f));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card",
    style: {
      borderTop: "2px solid #C9A86A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card-title",
    style: {
      margin: 0
    }
  }, "Actions de la semaine"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini ghost xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 9
  }), " Ajouter")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: "#6E7890",
      marginBottom: 8
    }
  }, "Ce qu'il reste \xE0 faire pour avancer"), /*#__PURE__*/React.createElement("div", {
    className: "m-task"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-task-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 10.5
    }
  }, "D\xE9cision APS \u2014 Choix confirm\xE9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: "#6E7890"
    }
  }, "Equa : Plan 1, Plan 2, Plan 3")), /*#__PURE__*/React.createElement("span", {
    className: "m-tag-warn xs"
  }, "URGENT \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "m-task"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-task-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 10.5
    }
  }, "Phase Permis en retard de 113 j"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: "#6E7890"
    }
  }, "Marquer termin\xE9e ou reporter")), /*#__PURE__*/React.createElement("span", {
    className: "m-tag-warn xs"
  }, "URGENT \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "m-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card-title",
    style: {
      margin: 0
    }
  }, "\xC9quipe projet"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini ghost xs"
  }, "Inviter")), [{
    i: "FD",
    n: "Filipe De Sousa",
    r: "Maçon · DSX Freres"
  }, {
    i: "DC",
    n: "Didier Clément",
    r: "Droniste · My Drone solution"
  }].map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        borderBottom: "1px solid rgba(11,18,36,0.05)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-avatar sm"
    }, p.i), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 500,
        color: "#0B1224"
      }
    }, p.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8.5,
        color: "#6E7890"
      }
    }, p.r)), /*#__PURE__*/React.createElement("span", {
      className: "m-pill ok"
    }));
  })))));
};
var MockupProject = function MockupProject() {
  return /*#__PURE__*/React.createElement(MockupShell, {
    title: "alba-studio.co"
  }, /*#__PURE__*/React.createElement(MockupSidebar, {
    mode: "workspace",
    active: "Tableau de bord"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-greet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-grid-pattern"
  }), /*#__PURE__*/React.createElement("h3", null, "Bonjour, Anthony ", /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC4B")), /*#__PURE__*/React.createElement("p", null, "G\xE9rez vos projets et priorisez vos actions."), /*#__PURE__*/React.createElement("div", {
    className: "m-week"
  }, ["L 4", "M 5", "M 6", "J 7", "V 8", "S 9", "D 10"].map(function (d, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: i === 0 ? "is-today" : ""
    }, d);
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-greet-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  }), " Cr\xE9er un projet"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 12
  }), " Voir tous les projets"))), /*#__PURE__*/React.createElement("div", {
    className: "m-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-stat-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill alert"
  }), " URGENCES"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-val"
  }, "1"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-foot"
  }, "\xC0 traiter en priorit\xE9")), /*#__PURE__*/React.createElement("div", {
    className: "m-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-stat-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill ok"
  }), " \xC0 TRAITER"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-val"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-foot"
  }, "Actions du jour")), /*#__PURE__*/React.createElement("div", {
    className: "m-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-stat-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill"
  }), " D\xC9CISIONS"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-val"
  }, "1"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-foot"
  }, "En attente")), /*#__PURE__*/React.createElement("div", {
    className: "m-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-stat-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill"
  }), " SOLDE"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-val"
  }, "600 \u20AC"), /*#__PURE__*/React.createElement("div", {
    className: "m-stat-foot"
  }, "Aucun impay\xE9")))));
};
var MDEC_CHIP = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontFamily: "var(--font-mono)",
  fontSize: 7,
  letterSpacing: "0.05em",
  borderRadius: 999,
  padding: "2px 7px",
  whiteSpace: "nowrap"
};
var MockupDecisions = function MockupDecisions() {
  return /*#__PURE__*/React.createElement(MockupShell, {
    title: "alba-studio.co/grange-lissieu/decisions"
  }, /*#__PURE__*/React.createElement(MockupSidebar, {
    active: "D\xE9cisions & budget"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-page-h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-page-title"
  }, "Vue ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "#C9A86A",
      fontWeight: 400
    }
  }, "d\xE9cisions")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 7.5,
      letterSpacing: "0.05em",
      color: "#6E7890",
      marginTop: 3
    }
  }, "Chaque d\xE9cision mat\xE9rialise un arbitrage financier. Les deux vues sont li\xE9es.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#0B1224",
      color: "#E9ECF2"
    })
  }, "Vue d\xE9cisions ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#C9A86A"
    }
  }, "5")), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.12)",
      color: "#3A445C"
    })
  }, "\u20AC Vue financi\xE8re"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.5fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card-eyebrow"
  }, "D\xC9CISIONS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "#0B1224",
      margin: "4px 0 7px"
    }
  }, "3", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#98A0B0"
    }
  }, "/5")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "rgba(201,168,106,0.14)",
      border: "1px solid rgba(201,168,106,0.4)",
      color: "#A98C50"
    })
  }, "1 \xE0 d\xE9cider"), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "rgba(74,222,128,0.1)",
      border: "1px solid rgba(74,222,128,0.3)",
      color: "#3E8E5A"
    })
  }, "3 valid\xE9es"))), /*#__PURE__*/React.createElement("div", {
    className: "m-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card-eyebrow"
  }, "IMPACT FINANCIER DES D\xC9CISIONS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 8,
      marginTop: 6
    }
  }, [{
    k: "Validées",
    v: "−600 €",
    red: true
  }, {
    k: "En attente",
    v: "0 €"
  }, {
    k: "Avenants validés",
    v: "0 €"
  }].map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#98A0B0"
      }
    }, s.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 16,
        color: s.red ? "#C0614F" : "#0B1224",
        marginTop: 2
      }
    }, s.v));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#0B1224",
      color: "#E9ECF2"
    })
  }, "Toutes ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#C9A86A"
    }
  }, "5")), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.12)",
      color: "#3A445C"
    })
  }, "\xC0 d\xE9cider 1"), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.12)",
      color: "#3A445C"
    })
  }, "Valid\xE9es 3"), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light xs",
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 9
  }), " Cr\xE9er une d\xE9cision")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, [{
    t: "Photo partagée",
    sent: "Envoyée le 24 juin 2026",
    status: "Validée — 25 juin 2026",
    ok: true,
    option: true
  }, {
    t: "Décisions structurées — APD",
    sent: "Envoyée le 24 avr. 2026",
    status: "Validée — 3 mai 2026",
    ok: true
  }, {
    t: "Décisions structurées — Esquisse",
    sent: "Envoyée le 24 avr. 2026",
    status: "Refusée — 25 juin 2026",
    ok: false
  }, {
    t: "Permis — Choix confirmé",
    sent: "Envoyée le 21 mars 2026",
    status: "Validée — 21 mars 2026",
    ok: true,
    impact: "Impact −600 €"
  }].map(function (d, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "#fff",
        border: "1px solid rgba(11,18,36,0.07)",
        borderLeft: d.ok ? "3px solid #4E9668" : "3px solid #C0614F",
        borderRadius: 10,
        padding: "9px 11px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 12.5,
        fontWeight: 500,
        color: "#0B1224",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, d.t), /*#__PURE__*/React.createElement("button", {
      className: "btn-mini ghost xs",
      style: {
        flex: "none"
      }
    }, "Relancer le MO")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        margin: "6px 0 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
        background: "#ECEEF2",
        color: "#6E7890"
      })
    }, d.sent), /*#__PURE__*/React.createElement("span", {
      style: d.ok ? _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
        background: "rgba(74,222,128,0.1)",
        border: "1px solid rgba(74,222,128,0.3)",
        color: "#3E8E5A"
      }) : _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
        background: "rgba(192,97,79,0.1)",
        border: "1px solid rgba(192,97,79,0.35)",
        color: "#C0614F"
      })
    }, d.ok ? "✓ " : "✕ ", d.status)), d.option && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 7,
        background: "rgba(201,168,106,0.1)",
        border: "1px solid rgba(201,168,106,0.35)",
        borderRadius: 7,
        padding: "5px 8px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "doc",
      size: 10,
      style: {
        color: "#A98C50"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8.5,
        color: "#0B1224",
        fontWeight: 500
      }
    }, "Photo du chat.jpg"), /*#__PURE__*/React.createElement("span", {
      style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
        background: "#fff",
        border: "1px solid rgba(201,168,106,0.5)",
        color: "#A98C50",
        marginLeft: "auto"
      })
    }, "\u2713 Choisi")), d.impact && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8.5,
        color: "#C0614F",
        fontWeight: 600,
        marginTop: 7
      }
    }, d.impact));
  }))));
};
var MockupMessagerie = function MockupMessagerie() {
  return /*#__PURE__*/React.createElement(MockupShell, null, /*#__PURE__*/React.createElement(MockupSidebar, {
    active: "Chat"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main m-msg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-page-h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-card-eyebrow"
  }, "MESSAGERIE"), /*#__PURE__*/React.createElement("div", {
    className: "m-page-title"
  }, "Grange Lissieu"))), /*#__PURE__*/React.createElement("div", {
    className: "m-thread"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-msg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-avatar sm"
  }, "ML"), /*#__PURE__*/React.createElement("div", {
    className: "m-bubble"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-bubble-h"
  }, "Marc L\xE9vy \xB7 Architecte ", /*#__PURE__*/React.createElement("span", null, "\xB7 14:32")), /*#__PURE__*/React.createElement("p", null, "Bonjour Marie, je vous joins les 3 propositions d'am\xE9nagement pour la cuisine. H\xE2te d'avoir votre retour."), /*#__PURE__*/React.createElement("div", {
    className: "m-attach"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "doc",
    size: 12
  }), " propositions-cuisine.pdf"))), /*#__PURE__*/React.createElement("div", {
    className: "m-msg-row me"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-bubble me"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-bubble-h"
  }, "Vous ", /*#__PURE__*/React.createElement("span", null, "\xB7 14:48")), /*#__PURE__*/React.createElement("p", null, "Merci Marc, la proposition n\xB02 est ma pr\xE9f\xE9r\xE9e. On peut caler un point demain ?")), /*#__PURE__*/React.createElement("div", {
    className: "m-avatar sm gold"
  }, "MA")))));
};
var MockupMateriaux = function MockupMateriaux() {
  var swatches = [{
    n: "Chêne massif brossé",
    r: "CHB-240-NAT",
    p: "84 €/m²",
    bg: "repeating-linear-gradient(90deg, rgba(60,35,10,0.14) 0 2px, transparent 2px 11px), linear-gradient(135deg, #C9A876, #96733F)"
  }, {
    n: "Pierre de Bourgogne",
    r: "PBG-060-ADO",
    p: "146 €/m²",
    bg: "linear-gradient(135deg, #BCC1CE, #858FA7)"
  }, {
    n: "Laiton brossé",
    r: "LTB-015-BRO",
    p: "215 €/ml",
    bg: "linear-gradient(120deg, #D9B36B, #A67C3B 40%, #E8CD8F 65%, #B98F4C)"
  }, {
    n: "Béton ciré minéral",
    r: "BCM-020-GRA",
    p: "92 €/m²",
    bg: "linear-gradient(135deg, #9DA3AB, #686E78)"
  }, {
    n: "Verre cannelé clair",
    r: "VCC-008-CAN",
    p: "310 €/m²",
    bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 3px, rgba(190,212,220,0.18) 3px 11px), linear-gradient(135deg, #B9CDD4, #93ABB4)"
  }, {
    n: "Enduit chaux ferré",
    r: "ECF-010-SAB",
    p: "46 €/m²",
    bg: "linear-gradient(135deg, #D5D9E1, #AEB5C5)"
  }];
  return /*#__PURE__*/React.createElement(MockupShell, {
    title: "alba-studio.co/materiautheque"
  }, /*#__PURE__*/React.createElement(MockupSidebar, {
    mode: "workspace",
    active: "Biblioth\xE8que mat\xE9riaux"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-page-h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-card-eyebrow"
  }, "MAT\xC9RIAUTH\xC8QUE \xB7 AGENCE"), /*#__PURE__*/React.createElement("div", {
    className: "m-page-title"
  }, "12 mat\xE9riaux \xB7 8 fournisseurs")), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " Ajouter")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10
    }
  }, swatches.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "#fff",
        border: "1px solid rgba(11,18,36,0.06)",
        borderRadius: 10,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 52,
        background: s.bg
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        fontWeight: 500,
        color: "#0B1224"
      }
    }, s.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 8.5,
        letterSpacing: "0.08em",
        color: "#6E7890",
        margin: "2px 0 4px"
      }
    }, s.r), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9.5,
        color: "#C9A86A",
        fontWeight: 600
      }
    }, s.p)));
  }))));
};
var MockupChantier = function MockupChantier() {
  return /*#__PURE__*/React.createElement(MockupShell, {
    title: "alba-studio.co/grange-lissieu/terrain"
  }, /*#__PURE__*/React.createElement(MockupSidebar, {
    active: "Projet"
  }), /*#__PURE__*/React.createElement("main", {
    className: "m-main"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      justifyContent: "flex-end"
    }
  }, ["Visuels 16", "Phases", "Calendrier", "Terrain", "Réserves"].map(function (t) {
    return /*#__PURE__*/React.createElement("span", {
      key: t,
      style: _objectSpread(_objectSpread({}, MDEC_CHIP), t === "Terrain" ? {
        background: "#0B1224",
        color: "#E9ECF2"
      } : {
        background: "#fff",
        border: "1px solid rgba(11,18,36,0.12)",
        color: "#3A445C"
      })
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-page-h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-page-title"
  }, "Sur le ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "#C9A86A",
      fontWeight: 400
    }
  }, "terrain")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 7.5,
      letterSpacing: "0.05em",
      color: "#6E7890",
      marginTop: 3
    }
  }, "18 \xE9v\xE9nements \xB7 3 remarques \xB7 sur Grange Lissieu")), /*#__PURE__*/React.createElement("button", {
    className: "btn-mini light xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 10
  }), " Nouveau")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#0B1224",
      color: "#E9ECF2"
    })
  }, "Chronologie ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#C9A86A"
    }
  }, "18")), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.12)",
      color: "#3A445C"
    })
  }, "Remarques 3")), /*#__PURE__*/React.createElement("div", {
    className: "m-stats"
  }, [{
    k: "ÉVÉNEMENTS CE MOIS",
    v: "0",
    f: "18 au total"
  }, {
    k: "INTERVENTIONS",
    v: "1",
    f: "En cours sur chantier"
  }, {
    k: "VISITES DE CHANTIER",
    v: "2",
    f: "3 remarques soulevées"
  }, {
    k: "COMPTES-RENDUS",
    v: "3",
    f: "À jour"
  }].map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.k,
      className: "m-stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-stat-eyebrow"
    }, s.k), /*#__PURE__*/React.createElement("div", {
      className: "m-stat-val"
    }, s.v), /*#__PURE__*/React.createElement("div", {
      className: "m-stat-foot"
    }, s.f));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 7.5,
      letterSpacing: "0.1em",
      color: "#6E7890"
    }
  }, "JEUDI 25 JUIN 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.07)",
      borderRadius: 10,
      padding: "9px 11px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-mono)",
      fontSize: 7,
      letterSpacing: "0.1em",
      color: "#6E7890"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill"
  }), " PR\xC9-R\xC9CEPTION (OPR)"), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#ECEEF2",
      color: "#6E7890"
    })
  }, "Brouillon")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 13,
      fontWeight: 500,
      color: "#0B1224",
      marginTop: 4
    }
  }, "Nouvelle pr\xE9-r\xE9ception (OPR)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid rgba(11,18,36,0.07)",
      borderRadius: 10,
      padding: "9px 11px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "rgba(201,168,106,0.16)",
      border: "1px solid rgba(201,168,106,0.45)",
      color: "#A98C50"
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "doc",
    size: 8
  }), " PV R\xC9CEPTION"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 7,
      letterSpacing: "0.1em",
      color: "#6E7890"
    }
  }, "ACTE JURIDIQUE"), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, MDEC_CHIP), {}, {
      background: "#ECEEF2",
      color: "#6E7890",
      marginLeft: "auto"
    })
  }, "Brouillon")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 13,
      fontWeight: 500,
      color: "#0B1224",
      margin: "5px 0 2px"
    }
  }, "R\xE9ception finale"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      color: "#6E7890"
    }
  }, "25 juin 2026 \xB7 0 r\xE9serve retenue \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3E8E5A",
      fontWeight: 600
    }
  }, "Sans r\xE9serve")))));
};

/* Real app screenshot in a browser frame */
var RealShot = function RealShot(_ref7) {
  var src = _ref7.src,
    _ref7$title = _ref7.title,
    title = _ref7$title === void 0 ? "alba-studio.co" : _ref7$title,
    _ref7$alt = _ref7.alt,
    alt = _ref7$alt === void 0 ? "Interface ALBA Studio" : _ref7$alt;
  return /*#__PURE__*/React.createElement("div", {
    className: "mockup realshot"
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
  }), " ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46
    }
  })), /*#__PURE__*/React.createElement(Photo, {
    src: src,
    alt: alt,
    loading: "eager",
    fetchPriority: "high",
    sizes: "(max-width: 760px) 92vw, 1020px",
    style: {
      display: "block",
      width: "100%",
      height: "auto"
    }
  }));
};

/* ═════════════════════════════════════════════════════════════════════════════
   « Tester en 1 clic » — un FORMULAIRE, jamais un lien

   Ce bouton poste vers demo-express, qui CRÉE UN COMPTE et renvoie le visiteur
   dedans, déjà connecté. Écrit en <a href>, il en créerait un chaque fois qu'un
   robot d'indexation suit le lien, qu'une messagerie déplie l'aperçu d'une URL,
   ou qu'un antivirus d'entreprise vérifie une adresse : des centaines de comptes
   sans qu'un humain ait cliqué. Le serveur refuse d'ailleurs les GET en 405.

   Un <form method="post"> suffit, et il n'a besoin d'AUCUN JavaScript : les
   robots ne postent pas. C'est aussi ce qui le rend fonctionnel avant même que
   React ne soit monté, et chez un visiteur qui a coupé les scripts.

   `display: contents` sur le <form> (styles.css) le rend transparent à la mise
   en page : le <button> se comporte comme s'il était l'enfant direct de
   `.hero-actions`, sans quoi il sortirait de la disposition en flex.

   ─────────────────────────────────────────────────────────────────────────────
   L'ADRESSE EST ÉCRITE ICI, ET config.js NE FAIT QUE LA REMPLACER

   Ce composant lisait `window.ALBA_POINT_ESSAI` et, à défaut, rendait un
   <a href="#fonctionnalites"> — un repli qui paraissait prudent. Il ne l'était
   pas : il produisait un bouton d'apparence identique qui se contentait de
   faire défiler la page. Symptôme exact remonté par Anthony, « on clique, on
   reste sur la page ».

   Et il suffisait pour ça d'un config.js d'avant l'ajout de la constante,
   resté dans le cache du navigateur ou en périphérie Cloudflare. La page se
   chargeait, React montait, et remplaçait le formulaire correct du HTML
   prérendu par une ancre inerte.

   D'où l'inversion : l'adresse est la valeur par défaut du composant, et
   config.js ne peut que la REMPLACER. Un config.js absent, périmé ou muet
   laisse désormais un formulaire qui marche. Il n'existe plus aucun chemin de
   code qui transforme ce bouton en lien — tests/smoke.mjs le vérifie en
   rejouant la page avec un config.js amputé.
   ═════════════════════════════════════════════════════════════════════════════ */
var POINT_ESSAI_PAR_DEFAUT = "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/demo-express";

/* ─────────────────────────────────────────────────────────────────────────────
 * UN SEUL ENVOI, ET IL FAUT QUE ÇA SE VOIE
 *
 * Le serveur ne se contente pas d'ouvrir une session : il crée un compte, un
 * espace de travail, deux chantiers avec leurs phases, leurs décisions, leur
 * budget et leurs réserves. Sur un téléphone en 5G moyenne, ça prend plusieurs
 * secondes pendant lesquelles la page ne bouge pas d'un pixel.
 *
 * Anthony a tapé plusieurs fois — n'importe qui l'aurait fait. Chaque tap
 * relance un POST, et le plafond est de TROIS essais par heure : trois taps
 * nerveux et le visiteur est verrouillé pour une heure, sur un bouton qui
 * fonctionnait.
 *
 * Deux corrections, et le verrou compte plus que l'affichage :
 *
 *   · un verrou SYNCHRONE, hors de l'état React. Un `useState` est appliqué au
 *     rendu suivant : deux taps rapprochés le liraient tous les deux à `false`
 *     et partiraient tous les deux. C'est la même erreur que sur le bouton de
 *     paiement, où tests/paiement.mjs l'avait attrapée ;
 *   · il est PARTAGÉ par tous les boutons de la page — le hero et le flottant
 *     portent le même libellé et le même geste, un verrou par instance
 *     laisserait passer un envoi par bouton.
 *
 * Ce qu'on ne fait SURTOUT pas : `disabled` sur le bouton. Désactiver un bouton
 * de soumission pendant que l'événement `submit` se propage annule la
 * soumission dans plusieurs navigateurs — on empêcherait le second envoi en
 * supprimant le premier. Le verrou bloque dans `onSubmit`, le reste n'est que
 * du visuel.
 *
 * Et le filet : si la navigation n'aboutit pas — réseau coupé, serveur muet —
 * le verrou se relâche au bout de 25 secondes. Sans quoi un échec silencieux
 * laisserait un bouton mort jusqu'au rechargement.
 * ───────────────────────────────────────────────────────────────────────────── */
var ESSAI_EN_COURS = false; // partagé par tous les boutons
var EVENEMENT_ESSAI = "alba:essai-en-cours"; // pour que tous l'affichent

var BoutonEssai = function BoutonEssai(_ref8) {
  var _ref8$className = _ref8.className,
    className = _ref8$className === void 0 ? "btn btn-primary" : _ref8$className,
    children = _ref8.children;
  var remplacement = typeof window !== "undefined" ? window.ALBA_POINT_ESSAI : null;
  // Une valeur vide, nulle ou non textuelle ne remplace rien.
  var point = typeof remplacement === "string" && remplacement.trim() ? remplacement.trim() : POINT_ESSAI_PAR_DEFAUT;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    ouverture = _React$useState2[0],
    setOuverture = _React$useState2[1];
  React.useEffect(function () {
    var suivre = function suivre() {
      return setOuverture(ESSAI_EN_COURS);
    };
    /* Retour par le bouton « précédent » : iOS restitue la page telle qu'elle
       était, verrou compris. Sans cette remise à zéro, le visiteur revient sur
       un bouton qui annonce « Ouverture… » et ne répond plus. */
    var reprise = function reprise() {
      ESSAI_EN_COURS = false;
      setOuverture(false);
    };
    window.addEventListener(EVENEMENT_ESSAI, suivre);
    window.addEventListener("pageshow", reprise);
    return function () {
      window.removeEventListener(EVENEMENT_ESSAI, suivre);
      window.removeEventListener("pageshow", reprise);
    };
  }, []);
  var envoyer = function envoyer(ev) {
    if (ESSAI_EN_COURS) {
      ev.preventDefault();
      return;
    } // le tap de trop
    ESSAI_EN_COURS = true;
    // Pas de preventDefault ici : le formulaire DOIT partir.
    window.dispatchEvent(new Event(EVENEMENT_ESSAI));
    window.setTimeout(function () {
      ESSAI_EN_COURS = false;
      window.dispatchEvent(new Event(EVENEMENT_ESSAI));
    }, 25000);
  };
  return /*#__PURE__*/React.createElement("form", {
    className: "essai-express",
    method: "post",
    action: point,
    onSubmit: envoyer
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "".concat(className).concat(ouverture ? " est-en-ouverture" : ""),
    "aria-busy": ouverture ? "true" : "false"
  }, ouverture ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "essai-rouet",
    "aria-hidden": "true"
  }), L("Ouverture de votre espace…", "Opening your workspace…")) : children));
};

/* Message de retour de l'essai express.
 *
 * Quand le serveur ne peut pas ouvrir d'espace, il renvoie le visiteur ICI avec
 * `?essai=trop_de_tentatives` ou `?essai=indisponible`. Sans ce composant, il
 * revient sur la page d'accueil sans la moindre explication et croit que le
 * bouton est cassé.
 *
 * L'adresse est nettoyée aussitôt (replaceState) : un rechargement ou un
 * partage du lien ne doit pas rejouer un message qui n'a plus lieu d'être. */
var MessageEssai = function MessageEssai() {
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    code = _React$useState4[0],
    setCode = _React$useState4[1];
  React.useEffect(function () {
    var vu = null;
    try {
      vu = new URLSearchParams(window.location.search).get("essai");
    } catch (e) {
      return;
    }
    if (!vu || vu === "1") return; // `essai=1` est le succès, côté application
    setCode(vu);
    try {
      var u = new URL(window.location.href);
      u.searchParams["delete"]("essai");
      window.history.replaceState({}, "", u.pathname + u.search + u.hash);
    } catch (e) {/* adresse exotique : le message reste, c'est le moindre mal */}
  }, []);
  if (!code) return null;
  var MESSAGES = {
    trop_de_tentatives: L("Vous avez déjà ouvert plusieurs essais récemment. Réessayez dans une heure, ou écrivez-nous — on vous ouvre l'accès nous-mêmes.", "You've already opened several trials recently. Try again in an hour, or write to us — we'll open access for you ourselves."),
    indisponible: L("L'essai n'a pas pu s'ouvrir. Ce n'est pas de votre fait : écrivez-nous et on règle ça.", "The trial couldn't be opened. It's not your doing: write to us and we'll sort it out.")
  };
  var texte = MESSAGES[code] || MESSAGES.indisponible;
  return /*#__PURE__*/React.createElement("div", {
    className: "essai-message",
    role: "status"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 16
  }), /*#__PURE__*/React.createElement("p", null, texte), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "essai-message-lien"
  }, L("Nous écrire", "Write to us")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "essai-message-fermer",
    onClick: function onClick() {
      return setCode(null);
    },
    "aria-label": L("Fermer", "Close")
  }, "\xD7"));
};

/* ============================================================================
   <Photo> — une image servie à la taille où elle est vraiment affichée
   ============================================================================
   Le parcours mobile de l'accueil pesait 1,8 Mo d'images. Pas parce qu'il y en
   a beaucoup — dix — mais parce que chacune partait dans sa taille d'origine.
   `villa-interieur.jpg` fait 1600 px de large pour 382 Ko, et s'affiche dans
   350 px sur un téléphone : vingt fois les pixels nécessaires, envoyés à un
   architecte en 4G sur un chantier, c'est-à-dire à la cible.

   Ce composant rend un <picture> : l'AVIF d'abord, le WebP ensuite, et la
   balise <img> d'origine en dernier recours. Le navigateur prend le premier
   format qu'il comprend, puis choisit la largeur d'après `sizes` et la densité
   de son écran. Aucun script n'intervient — c'est la négociation native.

   LES LARGEURS NE SONT PAS ÉCRITES ICI. Elles viennent de window.ALBA_PHOTOS,
   engendré par outils/images.py en même temps que les fichiers. Une liste
   recopiée à la main des deux côtés diverge tôt ou tard, et cette
   divergence-là est muette : le navigateur demande une dérivée absente,
   reçoit un 404 et affiche le recours sans que rien ne le signale.

   Sans entrée dans le manifeste, <Photo> rend une <img> ordinaire. C'est un
   choix : une image nouvelle doit s'afficher correctement AVANT qu'on ait
   pensé à lancer le générateur, sinon on décourage l'ajout d'images.
   ============================================================================ */
var Photo = function Photo(_ref9) {
  var src = _ref9.src,
    alt = _ref9.alt,
    sizes = _ref9.sizes,
    className = _ref9.className,
    _ref9$loading = _ref9.loading,
    loading = _ref9$loading === void 0 ? "lazy" : _ref9$loading,
    fetchPriority = _ref9.fetchPriority,
    reste = _objectWithoutProperties(_ref9, _excluded2);
  var largeurs = typeof window !== "undefined" && window.ALBA_PHOTOS && window.ALBA_PHOTOS[src] || null;
  var img = /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    loading: loading,
    decoding: "async",
    fetchpriority: fetchPriority,
    className: className,
    sizes: largeurs ? sizes : undefined
  }, reste));
  if (!largeurs) return img;

  /* images/villa-interieur.jpg → villa-interieur, le nom que porte la dérivée. */
  var base = src.replace(/^.*\//, "").replace(/\.[^.]+$/, "");
  var jeu = function jeu(ext) {
    return largeurs.map(function (l) {
      return "images/derivees/".concat(base, "-").concat(l, ".").concat(ext, " ").concat(l, "w");
    }).join(", ");
  };
  return /*#__PURE__*/React.createElement("picture", null, /*#__PURE__*/React.createElement("source", {
    type: "image/avif",
    srcSet: jeu("avif"),
    sizes: sizes
  }), /*#__PURE__*/React.createElement("source", {
    type: "image/webp",
    srcSet: jeu("webp"),
    sizes: sizes
  }), img);
};
window.Icon = Icon;
window.BoutonEssai = BoutonEssai;
window.MessageEssai = MessageEssai;
window.StoreBadges = StoreBadges;
window.PhotoPlaceholder = PhotoPlaceholder;
window.AppMockup = AppMockup;
window.RealShot = RealShot;
window.Photo = Photo;
