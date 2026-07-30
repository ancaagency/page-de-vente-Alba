/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : weather.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez weather.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* Météo chantier — préconisation d'interventions, exclusivité ALBA */

var WX_SIDE = function WX_SIDE() {
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
    label: L("Météo chantier", "Site weather"),
    icon: "cloud-sun",
    active: true
  }, {
    label: L("Bibliothèque matériaux", "Material library"),
    icon: "layers"
  }, {
    label: L("Archives", "Archives"),
    icon: "doc"
  }];
};
var WX_SITES = [{
  name: "Grange Lissieu",
  city: "Lissieu (69)",
  dot: "#C9A86A"
}, {
  name: "Maison Écully",
  city: "Écully (69)",
  dot: "#7E9A7E"
}, {
  name: "Atelier Paris 11e",
  city: "Paris (75)",
  dot: "#6E8CA8"
}];

/* prévisions 7 j par site : ic (sun|cloud-sun|cloud|rain|storm), t°, mm pluie, vent */
var WX_FORECAST = {
  "Grange Lissieu": [{
    d: "LUN",
    ic: "sun",
    t: 27,
    mm: 0,
    w: 8
  }, {
    d: "MAR",
    ic: "cloud-sun",
    t: 25,
    mm: 0,
    w: 12
  }, {
    d: "MER",
    ic: "cloud",
    t: 22,
    mm: 1,
    w: 15
  }, {
    d: "JEU",
    ic: "rain",
    t: 18,
    mm: 14,
    w: 32
  }, {
    d: "VEN",
    ic: "storm",
    t: 17,
    mm: 22,
    w: 46
  }, {
    d: "SAM",
    ic: "cloud-sun",
    t: 21,
    mm: 2,
    w: 14
  }, {
    d: "DIM",
    ic: "sun",
    t: 26,
    mm: 0,
    w: 9
  }],
  "Maison Écully": [{
    d: "LUN",
    ic: "cloud-sun",
    t: 24,
    mm: 0,
    w: 10
  }, {
    d: "MAR",
    ic: "sun",
    t: 28,
    mm: 0,
    w: 7
  }, {
    d: "MER",
    ic: "sun",
    t: 29,
    mm: 0,
    w: 6
  }, {
    d: "JEU",
    ic: "cloud-sun",
    t: 26,
    mm: 1,
    w: 13
  }, {
    d: "VEN",
    ic: "rain",
    t: 19,
    mm: 9,
    w: 24
  }, {
    d: "SAM",
    ic: "cloud",
    t: 22,
    mm: 3,
    w: 18
  }, {
    d: "DIM",
    ic: "cloud-sun",
    t: 25,
    mm: 0,
    w: 11
  }],
  "Atelier Paris 11e": [{
    d: "LUN",
    ic: "cloud",
    t: 21,
    mm: 2,
    w: 17
  }, {
    d: "MAR",
    ic: "rain",
    t: 18,
    mm: 11,
    w: 28
  }, {
    d: "MER",
    ic: "cloud-sun",
    t: 22,
    mm: 1,
    w: 14
  }, {
    d: "JEU",
    ic: "sun",
    t: 25,
    mm: 0,
    w: 9
  }, {
    d: "VEN",
    ic: "sun",
    t: 27,
    mm: 0,
    w: 8
  }, {
    d: "SAM",
    ic: "cloud-sun",
    t: 24,
    mm: 0,
    w: 12
  }, {
    d: "DIM",
    ic: "cloud",
    t: 21,
    mm: 4,
    w: 19
  }]
};

/* recommandations d'intervention déduites de la prévision */
var WX_ADVICE = function WX_ADVICE(site) {
  var f = WX_FORECAST[site];
  var wet = f.filter(function (x) {
    return x.mm >= 5;
  }).map(function (x) {
    return x.d;
  });
  var dry = f.filter(function (x) {
    return x.mm === 0 && x.w < 15;
  }).map(function (x) {
    return x.d;
  });
  return [{
    kind: "ok",
    tag: L("FEU VERT", "GO"),
    icon: "sun",
    t: L("Toiture & couverture", "Roofing & covering"),
    d: L("Cr\xE9neaux secs et peu vent\xE9s : ".concat(dry.join(", ") || "aucun cette semaine", ". Id\xE9al pour la reprise d'\xE9tanch\xE9it\xE9 du pignon nord."), "Dry, low-wind windows: ".concat(dry.join(", ") || "none this week", ". Ideal for the north gable waterproofing."))
  }, {
    kind: "danger",
    tag: L("À ÉVITER", "AVOID"),
    icon: "storm",
    t: L("Coulage & maçonnerie extérieure", "Pouring & outdoor masonry"),
    d: L("Fortes pluies ".concat(wet.join(" et "), " (jusqu'\xE0 ").concat(Math.max.apply(Math, _toConsumableArray(f.map(function (x) {
      return x.mm;
    }))), " mm). Ne pas couler de dalle ni d'enduit : risque de lessivage et de prise compromise."), "Heavy rain ".concat(wet.join(" & "), " (up to ").concat(Math.max.apply(Math, _toConsumableArray(f.map(function (x) {
      return x.mm;
    }))), " mm). No slab pour or render: washout and curing risk."))
  }, {
    kind: "warn",
    tag: L("VIGILANCE", "CAUTION"),
    icon: "wind",
    t: L("Levage & travaux en hauteur", "Lifting & work at height"),
    d: L("Rafales \xE0 ".concat(Math.max.apply(Math, _toConsumableArray(f.map(function (x) {
      return x.w;
    }))), " km/h en fin de semaine. Reporter grue et \xE9chafaudage expos\xE9 au-del\xE0 de 40 km/h."), "Gusts up to ".concat(Math.max.apply(Math, _toConsumableArray(f.map(function (x) {
      return x.w;
    }))), " km/h late week. Postpone crane and exposed scaffolding above 40 km/h."))
  }];
};
var WeatherDemo = function WeatherDemo() {
  var _React$useState = React.useState(WX_SITES[0].name),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    site = _React$useState2[0],
    setSite = _React$useState2[1];
  var f = WX_FORECAST[site];
  var advice = WX_ADVICE(site);
  var _React$useState3 = React.useState(3),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    day = _React$useState4[0],
    setDay = _React$useState4[1];
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var app = document.querySelector(".wx-app");
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
  var dayLabel = function dayLabel(x) {
    return x.mm >= 12 ? L("Pluvieux", "Rainy") : x.mm >= 3 ? L("Averses", "Showers") : x.ic === "sun" ? L("Ensoleillé", "Sunny") : L("Voilé", "Cloudy");
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "materials-section",
    id: "meteo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Exclusivité ALBA", "ALBA exclusive"), /*#__PURE__*/React.createElement("span", {
    className: "mat-badge-new"
  }, L("INÉDIT", "UNIQUE"))), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, L("La météo qui pilote ", "Weather that plans "), /*#__PURE__*/React.createElement("em", null, L("vos interventions.", "your site work."))), /*#__PURE__*/React.createElement("p", null, L("Une chaîne météo par chantier, géolocalisée, qui préconise les bons jours d'intervention et vous alerte : pas de toiture sous la pluie, pas de dalle avant l'orage. Personne d'autre ne le propose.", "A geolocated weather channel per site that recommends the right days to intervene and warns you: no roofing in the rain, no slab before a storm. No one else offers it."))), /*#__PURE__*/React.createElement("div", {
    className: "wx-app"
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
  }), " alba-studio.co/meteo-chantier"), /*#__PURE__*/React.createElement("div", {
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
  }, WX_SIDE().map(function (it) {
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
    className: "ml-crumbs"
  }, /*#__PURE__*/React.createElement("span", null, "Studio"), " \u203A ", /*#__PURE__*/React.createElement("b", null, L("Météo chantier", "Site weather")), /*#__PURE__*/React.createElement("span", {
    className: "as-model"
  }, /*#__PURE__*/React.createElement("span", {
    className: "as-live"
  }), " ", L("Prévisions à 7 jours · géolocalisées", "7-day forecast · geolocated"))), /*#__PURE__*/React.createElement("div", {
    className: "wx-sites"
  }, WX_SITES.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.name,
      className: "wx-site ".concat(site === s.name ? "is-active" : ""),
      onClick: function onClick() {
        setSite(s.name);
        setDay(3);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip-dot",
      style: {
        background: s.dot
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "wx-site-n"
    }, s.name), /*#__PURE__*/React.createElement("span", {
      className: "wx-site-c"
    }, s.city));
  })), /*#__PURE__*/React.createElement("div", {
    className: "wx-strip"
  }, f.map(function (x, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "wx-day ".concat(day === i ? "is-active" : "", " ").concat(x.mm >= 12 ? "is-wet" : ""),
      onClick: function onClick() {
        return setDay(i);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "wx-day-d"
    }, x.d), /*#__PURE__*/React.createElement("span", {
      className: "wx-ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: x.ic,
      size: 22
    })), /*#__PURE__*/React.createElement("span", {
      className: "wx-t"
    }, x.t, "\xB0"), /*#__PURE__*/React.createElement("span", {
      className: "wx-mm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "droplet",
      size: 9
    }), " ", x.mm, /*#__PURE__*/React.createElement("i", null, "mm")));
  })), /*#__PURE__*/React.createElement("div", {
    className: "wx-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wx-detail-ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f[day].ic,
    size: 30
  })), /*#__PURE__*/React.createElement("div", {
    className: "wx-detail-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wx-detail-day"
  }, f[day].d === "LUN" ? L("Lundi", "Monday") : f[day].d === "MAR" ? L("Mardi", "Tuesday") : f[day].d === "MER" ? L("Mercredi", "Wednesday") : f[day].d === "JEU" ? L("Jeudi", "Thursday") : f[day].d === "VEN" ? L("Vendredi", "Friday") : f[day].d === "SAM" ? L("Samedi", "Saturday") : L("Dimanche", "Sunday"), " \xB7 ", dayLabel(f[day])), /*#__PURE__*/React.createElement("div", {
    className: "wx-detail-stats"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, f[day].t, "\xB0"), " ", L("ressenti", "feels like")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "droplet",
    size: 11
  }), " ", f[day].mm, " mm"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "wind",
    size: 11
  }), " ", f[day].w, " km/h")))), /*#__PURE__*/React.createElement("div", {
    className: "wx-advice-head"
  }, L("PRÉCONISATIONS D'INTERVENTION", "INTERVENTION RECOMMENDATIONS"), " \xB7 ", site), /*#__PURE__*/React.createElement("div", {
    className: "wx-advice"
  }, advice.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "wx-card ".concat(a.kind)
    }, /*#__PURE__*/React.createElement("div", {
      className: "wx-card-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wx-card-ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      className: "wx-tag ".concat(a.kind)
    }, a.tag)), /*#__PURE__*/React.createElement("div", {
      className: "wx-card-t"
    }, a.t), /*#__PURE__*/React.createElement("div", {
      className: "wx-card-d"
    }, a.d));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "cal-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), L("Démo interactive, changez de chantier ou de jour : les préconisations se recalculent", "Interactive demo, switch site or day: recommendations recompute"))));
};
window.WeatherDemo = WeatherDemo;
