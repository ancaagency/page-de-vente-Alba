/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : sections.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez sections.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["as", "delay", "children", "className"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* Section components for Alba landing, bilingual via window.L(fr, en) */

var Reveal = function Reveal(_ref) {
  var _ref$as = _ref.as,
    Tag = _ref$as === void 0 ? "div" : _ref$as,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var ref = React.useRef(null);
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) {
          el.classList.add("in");
        } else if (e.boundingClientRect.top > 0) {
          // element left through the BOTTOM of the viewport (user scrolled up past it)
          el.classList.remove("in");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px"
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: "reveal ".concat(className),
    style: {
      "--reveal-delay": "".concat(delay, "ms")
    }
  }, rest), children);
};

/* Origine de l'application. Définie dans config.js, seul endroit à modifier le
   jour de la bascule vers app.alba-studio.co (voir MIGRATION-APEX.md).
   La valeur de repli garde la page fonctionnelle si config.js ne se charge pas. */
var APP_ORIGIN = typeof window !== "undefined" && window.ALBA_APP_ORIGIN || "https://app.alba-studio.co";
/* /inscription ouvre l'écran sur la création de compte ; /auth l'ouvre sur la
   connexion (Auth.tsx, dépôt de l'application). */
var SIGNUP_URL = "".concat(APP_ORIGIN, "/inscription");

/* HERO */
var Hero = function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    style: {
      paddingBottom: 130
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg"
  }), /*#__PURE__*/React.createElement("canvas", {
    className: "hero-canvas",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " ", Txt("accueil.plateforme-pour-architectes-exigeants", "Plateforme pour architectes exigeants", "The platform for demanding architects"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "display"
  }, Txt("accueil.centralisez-vos-projets", "Centralisez vos projets.", "Centralize your projects."), /*#__PURE__*/React.createElement("br", null), Txt("accueil.simplifiez-vos", "Simplifiez vos ", "Simplify your "), /*#__PURE__*/React.createElement("em", null, Txt("accueil.echanges-clients", "échanges clients.", "client communication.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, Txt("accueil.la-plateforme-pensee-pour-les-architectes", "La plateforme pensée pour les architectes indépendants : chaque décision, document et message vit au même endroit. Vos clients suivent. Vous gardez la main.", "The platform built for independent architects: every decision, document and message lives in one place. Your clients follow along. You stay in control."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 360
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: SIGNUP_URL,
    className: "btn btn-primary"
  }, Txt("accueil.creer-mon-projet-gratuit", "Créer mon projet gratuit", "Create my free project"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    className: "btn-arrow"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "btn btn-ghost",
    onClick: function onClick() {
      return window.__setContactMode && window.__setContactMode("demo");
    }
  }, Txt("accueil.demander-une-demo", "Demander une démo", "Request a demo")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 480
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    style: {
      display: "inline",
      verticalAlign: "-2px",
      marginRight: 6
    }
  }), " ", Txt("accueil.gratuit-a-vie-pour-1-projet", "Gratuit à vie pour 1 projet", "Free forever for 1 project")), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }), /*#__PURE__*/React.createElement("span", null, Txt("accueil.sans-engagement", "Sans engagement", "No commitment")), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }), /*#__PURE__*/React.createElement("span", null, Txt("accueil.setup-en-10-min", "Setup en 10 min", "10-min setup"))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 600,
    className: "hero-mockup-wrap container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-mockup"
  }, /*#__PURE__*/React.createElement("div", {
    className: "build-layer"
  }, /*#__PURE__*/React.createElement(RealShot, {
    src: "images/app-cockpit-web.jpg",
    title: "alba-studio.co/grange-lissieu",
    alt: "Cockpit du projet Grange Lissieu dans ALBA Studio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "build-overlay",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "build-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "build-scan"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-float hf-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hf-ic ok"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, Txt("accueil.decision-validee", "Décision validée", "Decision approved"), /*#__PURE__*/React.createElement("span", {
    className: "hf-sub"
  }, Txt("accueil.verriere-sud-il-y-a-2", "Verrière sud · il y a 2 min", "South skylight · 2 min ago")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-float hf-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hf-ic gold"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, Txt("accueil.nouveau-message", "Nouveau message", "New message"), /*#__PURE__*/React.createElement("span", {
    className: "hf-sub"
  }, Txt("accueil.marie-a-maitre-d-ouvrage", "Marie A. · Maître d'ouvrage", "Marie A. · Client")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-float hf-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hf-ring"
  }, /*#__PURE__*/React.createElement("b", null, "43%")), /*#__PURE__*/React.createElement("span", null, Txt("accueil.avancement-global", "Avancement global", "Overall progress"), /*#__PURE__*/React.createElement("span", {
    className: "hf-sub"
  }, Txt("accueil.phase-aps-grange-lissieu", "Phase APS · Grange Lissieu", "Design phase · Grange Lissieu"))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-cue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cue-track"
  }), /*#__PURE__*/React.createElement("span", null, Txt("accueil.decouvrir", "Découvrir", "Discover"))));
};

/* LOGOS — double marquee */
var Logos = function Logos() {
  var row1 = [{
    kind: "italic",
    text: "Revol architecte"
  }, {
    kind: "mono",
    text: "ADN ARCHITECTURE"
  }, {
    kind: "italic",
    text: "Easy Peasy intérieur"
  }];
  var row2 = [{
    kind: "italic",
    text: "Sublimes intérieurs"
  }, {
    kind: "mono",
    text: "FEEL INTÉRIEURS"
  }];
  var Track = function Track(_ref2) {
    var items = _ref2.items,
      dur = _ref2.dur;
    return /*#__PURE__*/React.createElement("div", {
      className: "marquee",
      style: {
        "--mq-dur": dur
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "marquee-track"
    }, [].concat(_toConsumableArray(items), _toConsumableArray(items)).map(function (l, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "mq-item ".concat(l.kind)
      }, l.text, " ", /*#__PURE__*/React.createElement("span", {
        className: "mq-dia"
      }));
    })));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "logos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logos-eyebrow"
  }, L(/*#__PURE__*/React.createElement(React.Fragment, null, "Les agences pilotes construisent d\xE9j\xE0 ", /*#__PURE__*/React.createElement("em", null, "avec ALBA.")), /*#__PURE__*/React.createElement(React.Fragment, null, "Pilot practices already build ", /*#__PURE__*/React.createElement("em", null, "with ALBA."))))), /*#__PURE__*/React.createElement(Track, {
    items: row1,
    dur: "38s"
  }), /*#__PURE__*/React.createElement(Track, {
    items: row2,
    dur: "52s"
  }));
};

/* MID-PAGE CTA BAND */
var CTABand = function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    className: "cta-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container cta-band-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cta-band-title"
  }, Txt("bandeau-cta.gratuit-a-vie-pour-1-projet", "Gratuit à vie pour 1 projet.", "Free forever for 1 project.")), /*#__PURE__*/React.createElement("div", {
    className: "cta-band-sub"
  }, Txt("bandeau-cta.gerez-un-projet-complet-gratuitement-sans", "Gérez un projet complet gratuitement, sans carte bleue, sans limite de temps.", "Run one full project free, no credit card, no time limit."))), /*#__PURE__*/React.createElement("div", {
    className: "cta-band-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: SIGNUP_URL,
    className: "btn btn-primary"
  }, Txt("bandeau-cta.creer-mon-projet-gratuit", "Créer mon projet gratuit", "Create my free project"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    className: "btn-arrow"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "btn btn-ghost"
  }, Txt("bandeau-cta.voir-le-tarif", "Voir le tarif", "See pricing")))));
};

/* PAINS */
var Pains = function Pains() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("problemes.ce-que-vous-ne-ferez-plus", "Ce que vous ne ferez plus", "What you'll stop doing")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("problemes.tout-ce-dont-vous-avez-besoin", "Tout ce dont vous avez besoin, ", "Everything you need, "), /*#__PURE__*/React.createElement("em", null, Txt("problemes.rien-de-superflu", "rien de superflu.", "nothing you don't."))), /*#__PURE__*/React.createElement("p", null, Txt("problemes.alba-remplace-les-drive-wetransfer-trello", "ALBA remplace les Drive, WeTransfer, Trello, Slack et boîtes mail éparpillées par un seul espace, conçu pour les agences d'architecture.", "ALBA replaces scattered Drives, WeTransfer, Trello, Slack and inboxes with one space, built for architecture practices."))), /*#__PURE__*/React.createElement(TestiBenefits, null)));
};

/* FEATURES */
/* Les maquettes AppMockup reproduisent l'écran d'ORDINATEUR : une barre latérale
   de 168 px fixes à côté du contenu, sur une hauteur minimale de 540 px. Dans la
   colonne d'un téléphone il ne restait qu'environ 180 px pour le contenu — texte
   coupé, colonnes tronquées, rien de lisible. Sous 900 px on sert donc les
   captures réelles de l'application mobile, à la place et non en plus : elles
   montrent la même chose, dans la forme où le visiteur la verra vraiment. */
var Features = function Features() {
  var tabs = [{
    eyebrow: Txt("fonctionnalites.01-cockpit", "01 — Cockpit", "01 — Cockpit"),
    title: Txt("fonctionnalites.une-vue-d-ensemble-qui-rassure", "Une vue d'ensemble qui rassure", "An overview that reassures"),
    desc: Txt("fonctionnalites.avancement-prochaines-echeances-decisions-en", "Avancement, prochaines échéances, décisions en attente. Vos clients savent où en est leur projet sans vous appeler.", "Progress, upcoming deadlines, pending decisions. Your clients know where their project stands without calling you."),
    mockup: "cockpit",
    shot: "uploads/app-mobile-cockpit.jpg",
    shotAlt: L("ALBA Studio sur mobile — cockpit du projet Grange Lissieu : avancement, phase courante, budget", "ALBA Studio on mobile — Grange Lissieu project cockpit: progress, current phase, budget")
  }, {
    eyebrow: Txt("fonctionnalites.02-decisions", "02 — Décisions", "02 — Decisions"),
    title: Txt("fonctionnalites.validations-structurees-tracables", "Validations structurées, traçables", "Structured, traceable approvals"),
    desc: Txt("fonctionnalites.fini-le-j-ai-oublie-ce", "Fini le « j'ai oublié ce qu'on avait dit ». Chaque arbitrage est horodaté, signé et archivé. Plus de SAV un an plus tard.", "No more \"I forgot what we agreed on\". Every decision is timestamped, signed and archived. No disputes a year later."),
    mockup: "decisions",
    shot: "uploads/app-mobile-decisions.jpg",
    shotAlt: L("ALBA Studio sur mobile — vue décisions : arbitrages validés et impact financier", "ALBA Studio on mobile — decisions view: approved arbitrations and financial impact")
  }, {
    eyebrow: Txt("fonctionnalites.03-chantier", "03 — Chantier", "03 — Site"),
    title: Txt("fonctionnalites.le-chantier-suivi-les-reserves-levees", "Le chantier suivi, les réserves levées", "Site visits tracked, punch lists cleared"),
    desc: Txt("fonctionnalites.comptes-rendus-de-visite-reserves-photograph", "Comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises. Le chantier documenté, sans y passer vos dimanches.", "Visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors. The site documented, without losing your Sundays."),
    mockup: "chantier",
    shot: "uploads/app-mobile-chantier.jpg",
    shotAlt: L("ALBA Studio sur mobile — suivi de chantier : visites, comptes-rendus et remarques", "ALBA Studio on mobile — site tracking: visits, reports and punch-list items")
  }];
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    active = _React$useState2[0],
    setActive = _React$useState2[1];
  var _React$useState3 = React.useState(function () {
      return window.matchMedia("(max-width: 900px)").matches;
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    mobile = _React$useState4[0],
    setMobile = _React$useState4[1];

  // La bascule doit suivre la rotation de l'appareil : un iPhone Pro Max passe
  // de 430 à 932 px en tournant, soit d'un côté à l'autre de la limite.
  React.useEffect(function () {
    var mq = window.matchMedia("(max-width: 900px)");
    var suivre = function suivre() {
      return setMobile(mq.matches);
    };
    // addListener : Safari n'a accepté addEventListener sur MediaQueryList qu'à
    // partir de la version 14.
    if (mq.addEventListener) mq.addEventListener("change", suivre);else mq.addListener(suivre);
    return function () {
      if (mq.removeEventListener) mq.removeEventListener("change", suivre);else mq.removeListener(suivre);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-cream-2",
    id: "features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("fonctionnalites.la-plateforme", "La plateforme", "The platform")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("fonctionnalites.une-suite-complete", "Une suite complète,", "A complete suite,"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, Txt("fonctionnalites.specialement-pensee-pour-vous", "spécialement pensée pour vous.", "designed specifically for you.")))), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "features-tabs"
  }, tabs.map(function (t, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "f-tab ".concat(active === i ? "is-active" : ""),
      onClick: function onClick() {
        return setActive(i);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "f-tab-eyebrow"
    }, t.eyebrow), /*#__PURE__*/React.createElement("div", {
      className: "f-tab-title"
    }, t.title), /*#__PURE__*/React.createElement("div", {
      className: "f-tab-desc"
    }, t.desc));
  })), /*#__PURE__*/React.createElement(Reveal, {
    className: "features-stage"
  }, tabs.map(function (t, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "f-stage-pane ".concat(active === i ? "is-active" : "")
    }, mobile ? /*#__PURE__*/React.createElement("div", {
      className: "f-shot"
    }, /*#__PURE__*/React.createElement("img", {
      src: t.shot,
      alt: t.shotAlt,
      width: "900",
      height: "1541",
      loading: "lazy",
      decoding: "async"
    })) : /*#__PURE__*/React.createElement(AppMockup, {
      variant: t.mockup
    }));
  })))));
};

/* Chiffres clés des précurseurs (ex-Benefits) */
var TestiBenefits = function TestiBenefits() {
  var items = [{
    icon: "clock",
    t: Txt("benefices.du-temps-repris", "Du temps repris", "Time reclaimed"),
    p: Txt("benefices.moins-d-allers-retours-moins-de", "Moins d'allers-retours, moins de relances. Le temps gagné, vous le rendez à vos esquisses.", "Fewer back-and-forths, fewer follow-ups. The time you save goes back to your drawings."),
    stat: Txt("benefices.6h", "6h", "6h"),
    unit: Txt("benefices.economisees-par-projet-et-par-mois", "économisées par projet et par mois", "saved per project, per month")
  }, {
    icon: "shield",
    t: Txt("benefices.de-la-serenite-juridique", "De la sérénité juridique", "Legal peace of mind"),
    p: Txt("benefices.chaque-decision-archivee-signee-datee-six", "Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand.", "Every decision archived, signed, dated. Six months on, you can still see who decided what, and when."),
    stat: "100%",
    unit: Txt("benefices.des-arbitrages-traces", "des arbitrages tracés", "of decisions traced")
  }, {
    icon: "star",
    t: Txt("benefices.des-clients-ravis", "Des clients ravis", "Delighted clients"),
    p: Txt("benefices.vos-maitres-d-ouvrage-savent-a", "Vos maîtres d'ouvrage savent à tout moment où en est le projet, et ne vous rappellent plus à 21h.", "Your clients always know where the project stands, and stop calling you at 9pm."),
    stat: "4.8/5",
    unit: Txt("benefices.satisfaction-maitre-d-ouvrage", "satisfaction maître d'ouvrage", "client satisfaction")
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "benefits",
    style: {
      marginBottom: 56
    }
  }, items.map(function (it, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 120,
      className: "benefit"
    }, /*#__PURE__*/React.createElement("div", {
      className: "benefit-icon"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("h3", null, it.t), /*#__PURE__*/React.createElement("p", null, it.p), /*#__PURE__*/React.createElement("div", {
      className: "benefit-stat"
    }, /*#__PURE__*/React.createElement("b", null, it.stat), " ", /*#__PURE__*/React.createElement("span", null, it.unit)));
  }));
};

/* TESTIMONIALS (+ chiffres + coulisses fusionnés) */
var Testimonials = function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("temoignages.ce-qu-en-disent-les-precurseurs", "Ce qu'en disent les précurseurs", "What the early adopters say")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("temoignages.ils-ont-essuye-les-platres", "Ils ont testé en avant-première", "They tested it first"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, Txt("temoignages.ils-sont-restes", "et ont adoré.", "and loved it.")))), /*#__PURE__*/React.createElement("div", {
    className: "testimonials"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "testi featured"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "testi-quote"
  }, Txt("temoignages.alba-a-remplace-mon-wetransfer-mon", "ALBA a remplacé mon WeTransfer, mon Drive, ma boîte mail et mes tableurs. Mes clients voient enfin où on en est, et moi je récupère mes soirées.", "ALBA replaced my WeTransfer, my Drive, my inbox and my spreadsheets. My clients finally see where we stand, and I get my evenings back.")), /*#__PURE__*/React.createElement("div", {
    className: "testi-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-avatar-slot"
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "testi-camille",
    shape: "circle",
    src: "images/testi-camille.jpg",
    alt: "Camille Lavigne",
    placeholder: "CL"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "testi-name"
  }, Txt("temoignages.camille-nom", "Camille Lavigne", "Camille Lavigne")), /*#__PURE__*/React.createElement("div", {
    className: "testi-role"
  }, Txt("temoignages.architecte-dplg-lyon", "ARCHITECTE DPLG · LYON", "REGISTERED ARCHITECT · LYON"))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    className: "testi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "testi-quote"
  }, Txt("temoignages.la-tracabilite-des-decisions-c-est", "La traçabilité des décisions, c'est l'argument qui m'a convaincu. Plus jamais de SAV un an après.", "Decision traceability is what won me over. No more disputes a year later.")), /*#__PURE__*/React.createElement("div", {
    className: "testi-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-avatar-slot"
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "testi-marc",
    shape: "circle",
    src: "images/testi-marc.jpg",
    alt: "Marc Noiret",
    placeholder: "MN"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "testi-name"
  }, Txt("temoignages.marc-nom", "Marc Noiret", "Marc Noiret")), /*#__PURE__*/React.createElement("div", {
    className: "testi-role"
  }, Txt("temoignages.marc-role", "STUDIO MN · BORDEAUX", "STUDIO MN · BORDEAUX"))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240,
    className: "testi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "testi-quote"
  }, Txt("temoignages.mes-maitres-d-ouvrage-adorent-ils", "Mes maîtres d'ouvrage adorent. Ils ont l'impression d'avoir leur propre app, c'est notre marque blanche.", "My clients love it. They feel like they have their own app, it's our white label.")), /*#__PURE__*/React.createElement("div", {
    className: "testi-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi-avatar-slot"
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "testi-sophie",
    shape: "circle",
    src: "images/testi-sophie.jpg",
    alt: "Sophie Obellier",
    placeholder: "SO"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "testi-name"
  }, Txt("temoignages.sophie-nom", "Sophie Obellier", "Sophie Obellier")), /*#__PURE__*/React.createElement("div", {
    className: "testi-role"
  }, Txt("temoignages.sophie-role", "ATELIER VAUBAN · PARIS", "ATELIER VAUBAN · PARIS")))))), /*#__PURE__*/React.createElement(Gallery, null)));
};

/* PRICING */
var Pricing = function Pricing() {
  var tiers = [{
    go: 50,
    price: 49
  }, {
    go: 150,
    price: 69
  }, {
    go: 300,
    price: 89
  }];
  var projectsFor = function projectsFor(go) {
    return Math.round(go / 10);
  };
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    tier = _React$useState6[0],
    setTier = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    yearly = _React$useState8[0],
    setYearly = _React$useState8[1];
  var baseFor = function baseFor(tr) {
    return yearly ? Math.round(tr.price * 0.82) : tr.price;
  };
  var t = tiers[tier];
  var base = baseFor(t);
  var _React$useState9 = React.useState(1),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    seats = _React$useState0[0],
    setSeats = _React$useState0[1];
  var extraSeats = Math.max(0, seats - 1);
  var extraCost = extraSeats * 15;
  var total = base + extraCost;
  var includes = [Txt("tarifs.clients-co-traitants-illimites", "Clients & co-traitants illimités", "Unlimited clients & consultants"), Txt("tarifs.1-collaborateur-inclus-15-mois-par", "1 collaborateur inclus — +15 €/mois par collaborateur ajouté (4 max)", "1 team member included — +€15/month per added member (4 max)"), L("".concat(t.go, " Go de stockage \u2014 \u2248 ").concat(projectsFor(t.go), " projets"), "".concat(t.go, " GB of storage \u2014 \u2248 ").concat(projectsFor(t.go), " projects")), Txt("tarifs.decisions-horodatees-signees", "Décisions horodatées & signées", "Timestamped & signed decisions"), Txt("tarifs.messagerie-projet-securisee", "Messagerie projet sécurisée", "Secure project messaging"), Txt("tarifs.materiautheque-fournisseurs", "Matériauthèque & fournisseurs", "Material library & suppliers"), Txt("tarifs.cr-de-chantier-reserves-photos", "CR de chantier, réserves & photos", "Site reports, punch lists & photos"), Txt("tarifs.visionneuse-plans-dans-le-navigateur", "Visionneuse plans dans le navigateur", "In-browser plan viewer"), Txt("tarifs.exports-pdf-comptables", "Exports PDF & comptables", "PDF & accounting exports"), Txt("tarifs.marque-blanche-maitre-d-ouvrage", "Marque blanche maître d'ouvrage", "White-label client portal"), Txt("tarifs.support-prioritaire-7j-7", "Support prioritaire 7j/7", "Priority support 7 days a week")];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pricing-layout"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "pricing-config"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("tarifs.tarif", "Tarif", "Pricing")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("tarifs.un-prix-simple", "Un prix simple,", "One simple price,"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, Txt("tarifs.une-valeur-claire", "une valeur claire.", "clear value."))), /*#__PURE__*/React.createElement("p", {
    className: "pricing-intro"
  }, Txt("tarifs.tout-est-inclus-pas-de-module", "Tout est inclus. Pas de module, pas d'option cachée. Seul le stockage fait varier le prix, choisissez, le tarif se met à jour à droite.", "Everything included. No add-ons, no hidden extras. Only storage changes the price, pick yours, the price updates on the right.")), /*#__PURE__*/React.createElement("div", {
    className: "p-config-label"
  }, Txt("tarifs.1-votre-facturation", "1 · Votre facturation", "1 · Your billing")), /*#__PURE__*/React.createElement("div", {
    className: "pricing-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: !yearly ? "is-active" : "",
    onClick: function onClick() {
      return setYearly(false);
    }
  }, Txt("tarifs.mensuel", "Mensuel", "Monthly")), /*#__PURE__*/React.createElement("button", {
    className: yearly ? "is-active" : "",
    onClick: function onClick() {
      return setYearly(true);
    }
  }, Txt("tarifs.annuel", "Annuel", "Yearly"), " ", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "\u221218%"))), /*#__PURE__*/React.createElement("div", {
    className: "p-config-label"
  }, Txt("tarifs.2-votre-stockage", "2 · Votre stockage", "2 · Your storage")), /*#__PURE__*/React.createElement("div", {
    className: "p-tiers"
  }, tiers.map(function (tr, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: tr.go,
      className: "p-tier ".concat(tier === i ? "is-active" : ""),
      onClick: function onClick() {
        return setTier(i);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "p-tier-radio"
    }), /*#__PURE__*/React.createElement("span", {
      className: "p-tier-main"
    }, /*#__PURE__*/React.createElement("b", null, tr.go, " ", Txt("tarifs.go", "Go", "GB")), /*#__PURE__*/React.createElement("span", null, L("\u2248 ".concat(projectsFor(tr.go), " projets"), "\u2248 ".concat(projectsFor(tr.go), " projects")))), /*#__PURE__*/React.createElement("span", {
      className: "p-tier-price"
    }, baseFor(tr), " \u20AC", /*#__PURE__*/React.createElement("i", null, Txt("tarifs.mois", "/mois", "/mo"))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-config-label"
  }, Txt("tarifs.3-votre-equipe", "3 · Votre équipe", "3 · Your team")), /*#__PURE__*/React.createElement("div", {
    className: "p-seats"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "p-seat-btn",
    onClick: function onClick() {
      return setSeats(Math.max(1, seats - 1));
    },
    "aria-label": Txt("tarifs.moins", "Moins", "Fewer")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-seat-val"
  }, /*#__PURE__*/React.createElement("b", null, seats), /*#__PURE__*/React.createElement("span", null, seats > 1 ? Txt("tarifs.collaborateurs", "collaborateurs", "team members") : Txt("tarifs.collaborateur", "collaborateur", "team member"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "p-seat-btn",
    onClick: function onClick() {
      return setSeats(Math.min(4, seats + 1));
    },
    "aria-label": Txt("tarifs.plus", "Plus", "More")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-seat-note"
  }, extraSeats > 0 ? L("1 inclus + ".concat(extraSeats, " \xD7 15 \u20AC/mois \xB7 4 max"), "1 included + ".concat(extraSeats, " \xD7 \u20AC15/mo \xB7 4 max")) : Txt("tarifs.1-inclus-jusqu-a-4-par", "1 inclus · jusqu'à 4 par espace", "1 included · up to 4 per workspace"))), /*#__PURE__*/React.createElement("div", {
    className: "pricing-go-note"
  }, Txt("tarifs.un-projet-d-architecture-occupe-en", "Un projet d'architecture occupe en moyenne 10 Go, plans, photos, documents et échanges inclus. Vous pourrez changer de palier à tout moment, en un clic.", "An architecture project takes about 10 GB on average, plans, photos, documents and messages included. You can change tiers anytime, in one click."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    className: "pricing-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pricing-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pricing-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " Studio"), /*#__PURE__*/React.createElement("div", {
    className: "pricing-name"
  }, Txt("tarifs.pour-votre-agence", "Pour votre agence", "For your practice")), /*#__PURE__*/React.createElement("div", {
    className: "pricing-desc"
  }, Txt("tarifs.tout-ce-qu-il-faut-pour", "Tout ce qu'il faut pour piloter sereinement vos projets, sans option cachée.", "Everything you need to run your projects with confidence, no hidden extras.")), /*#__PURE__*/React.createElement("div", {
    className: "pricing-amt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "c"
  }, "\u20AC"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    key: "".concat(tier, "-").concat(total)
  }, total), /*#__PURE__*/React.createElement("span", {
    className: "p"
  }, Txt("tarifs.mois-2", "/ mois", "/ month"))), yearly && /*#__PURE__*/React.createElement("div", {
    className: "pricing-save"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ps-badge"
  }, "\u221218%"), /*#__PURE__*/React.createElement("span", {
    className: "ps-text"
  }, L("Vous \xE9conomisez ".concat((t.price - base) * 12, " \u20AC par an"), "You save \u20AC".concat((t.price - base) * 12, " a year")), /*#__PURE__*/React.createElement("i", null, L("Factur\xE9 ".concat(total * 12, " \u20AC en une fois, au lieu de ").concat((t.price + extraCost) * 12, " \u20AC en mensuel"), "Billed \u20AC".concat(total * 12, " once a year, instead of \u20AC").concat((t.price + extraCost) * 12, " monthly"))))), extraSeats > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pricing-seats-line"
  }, L("Dont ".concat(extraCost, " \u20AC / mois : ").concat(extraSeats, " collaborateur").concat(extraSeats > 1 ? "s" : "", " suppl\xE9mentaire").concat(extraSeats > 1 ? "s" : ""), "Includes \u20AC".concat(extraCost, " / month for ").concat(extraSeats, " extra team member").concat(extraSeats > 1 ? "s" : ""))), /*#__PURE__*/React.createElement("ul", {
    className: "pricing-includes"
  }, includes.map(function (it, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12
    }), " ", it);
  })), /*#__PURE__*/React.createElement("a", {
    href: "".concat(SIGNUP_URL, "?plan=studio&storage=").concat(t.go, "&billing=").concat(yearly ? "yearly" : "monthly", "&seats=").concat(seats),
    className: "btn btn-primary pricing-cta"
  }, Txt("tarifs.demarrer-avec-un-projet-gratuit", "Démarrer avec un projet gratuit", "Start with a free project"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    className: "btn-arrow"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pricing-foot"
  }, Txt("tarifs.gratuit-a-vie-pour-1-projet", "GRATUIT À VIE POUR 1 PROJET · SANS CB · SANS ENGAGEMENT", "FREE FOREVER FOR 1 PROJECT · NO CARD · NO COMMITMENT")))))));
};

/* TRUST BAND — sécurité & données */
var TrustBand = function TrustBand() {
  var items = [{
    icon: "globe",
    t: Txt("securite.heberge-en-france", "Hébergé en France", "Hosted in France"),
    d: Txt("securite.vos-donnees-sont-stockees-en-france", "Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. Conformité RGPD native.", "Your data is stored in France with an ISO 27001-certified host. GDPR-compliant by design.")
  }, {
    icon: "lock",
    t: Txt("securite.chiffre-sauvegarde", "Chiffré, sauvegardé", "Encrypted, backed up"),
    d: Txt("securite.chiffrement-aes-256-au-repos-tls", "Chiffrement AES-256 au repos, TLS en transit. Sauvegardes automatiques quotidiennes.", "AES-256 encryption at rest, TLS in transit. Automatic daily backups.")
  }, {
    icon: "doc",
    t: Txt("securite.vos-donnees-vous-appartiennent", "Vos données vous appartiennent", "Your data stays yours"),
    d: Txt("securite.export-integral-de-vos-projets-pdf", "Export intégral de vos projets (PDF, ZIP, CSV) à tout moment, en un clic.", "Export all your projects (PDF, ZIP, CSV) anytime, in one click.")
  }, {
    icon: "shield",
    t: Txt("securite.valeur-probante", "Valeur probante", "Evidence you can produce"),
    d: Txt("securite.decisions-horodatees-et-signees-electronique", "Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur.", "Timestamped, electronically signed decisions (eIDAS simple signature). Every decision is archived with its evidence: author, date, server timestamp.")
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "trust-band",
    id: "securite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-eyebrow"
  }, Txt("securite.securite-donnees", "Sécurité & données", "Security & data")), /*#__PURE__*/React.createElement("div", {
    className: "trust-grid"
  }, items.map(function (it, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 90,
      className: "trust-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "trust-icon"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, it.t), /*#__PURE__*/React.createElement("p", null, it.d)));
  }))));
};

/* FAQ */
var Faq = function Faq() {
  var items = [{
    q: Txt("faq.que-comprend-le-projet-gratuit", "Que comprend le projet gratuit ?", "What does the free project include?"),
    a: Txt("faq.un-projet-complet-sans-limite-de", "Un projet complet, sans limite de temps : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio uniquement quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.", "One complete project, with no time limit: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You only move to the Studio plan when you create your second project, and everything you've built stays in place.")
  }, {
    q: Txt("faq.comment-alba-s-integre-a-ma", "Comment ALBA s'intègre à ma méthode actuelle ?", "How does ALBA fit my current workflow?"),
    a: Txt("faq.alba-s-adapte-a-votre-process", "ALBA s'adapte à votre process, pas l'inverse. Vous configurez les phases (esquisse, APS, APD, permis, DCE, chantier), nous gérons les rappels, les jalons et la mémoire du projet. Aucune formation longue : la plupart des architectes sont opérationnels en moins d'une heure.", "ALBA adapts to your process, not the other way round. You configure the phases (concept, design, permits, tender, construction); we handle reminders, milestones and the project's memory. No lengthy training: most architects are up and running in under an hour.")
  }, {
    q: Txt("faq.mes-clients-doivent-ils-telecharger-une", "Mes clients doivent-ils télécharger une application ?", "Do my clients need to download an app?"),
    a: Txt("faq.non-alba-fonctionne-entierement-dans-le", "Non. ALBA fonctionne entièrement dans le navigateur, sur ordinateur comme sur téléphone. Un lien, un mot de passe, vos maîtres d'ouvrage accèdent à leur cockpit en 30 secondes.", "No. ALBA runs entirely in the browser, on desktop and phone. A link, a password, your clients reach their cockpit in 30 seconds.")
  }, {
    q: Txt("faq.que-se-passe-t-il-pour", "Que se passe-t-il pour mes données si j'arrête ?", "What happens to my data if I leave?"),
    a: Txt("faq.elles-sont-a-vous-a-tout", "Elles sont à vous. À tout moment, vous exportez l'intégralité de vos projets (PDF, ZIP, CSV) en un clic. Vos archives papier-numérique restent lisibles 10 ans après.", "It's yours. At any time, export all your projects (PDF, ZIP, CSV) in one click. Your digital archives remain readable 10 years on.")
  }, {
    q: Txt("faq.les-decisions-sont-elles-juridiquement-valab", "Les décisions sont-elles juridiquement valables ?", "Are decisions legally valid?"),
    a: Txt("faq.chaque-decision-est-horodatee-archivee-et", "Chaque décision est horodatée, archivée et signée électroniquement (eIDAS, niveau simple) : l'auteur, la date et l'horodatage serveur sont conservés à titre de preuve. Pour un acte qui exige une signature avancée ou qualifiée, passez par votre voie habituelle.", "Every decision is timestamped, archived and electronically signed (eIDAS, simple level): the author, date and server timestamp are kept as evidence. For a document requiring an advanced or qualified signature, use your usual channel.")
  }, {
    q: Txt("faq.puis-je-inviter-mon-bet-et", "Puis-je inviter mon BET et mes co-traitants ?", "Can I invite my engineers and consultants?"),
    a: Txt("faq.bien-sur-les-co-traitants-accedent", "Bien sûr. Les co-traitants accèdent gratuitement aux projets sur lesquels vous les invitez, avec le niveau de droits que vous définissez (lecture, commentaire, dépôt de pièces).", "Of course. Consultants get free access to the projects you invite them to, with the permission level you set (view, comment, upload).")
  }, {
    q: Txt("faq.combien-de-collaborateurs-de-mon-agence", "Combien de collaborateurs de mon agence sont inclus ?", "How many team members are included?"),
    a: Txt("faq.le-tarif-studio-inclut-1-collaborateur", "Le tarif Studio inclut 1 collaborateur. Vous pouvez en ajouter jusqu'à 3 autres (4 par espace au maximum), à 15 €/mois chacun, ajustable à tout moment. Vos clients et co-traitants, eux, sont illimités et gratuits.", "The Studio plan includes 1 team member. You can add up to 3 more (4 per workspace maximum), at €15/month each, adjustable anytime. Clients and consultants are unlimited and free.")
  }, {
    q: Txt("faq.et-pendant-le-chantier", "Et pendant le chantier ?", "What about the construction phase?"),
    a: Txt("faq.alba-vous-suit-sur-site-comptes", "ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.", "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.")
  }, {
    q: Txt("faq.quels-formats-de-fichiers-puis-je", "Quels formats de fichiers puis-je partager ?", "What file formats can I share?"),
    a: Txt("faq.tous-pdf-dwg-ifc-images-videos", "Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 100 Mo par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.", "All of them — PDF, DWG, IFC, images, videos, up to 100 MB per file. PDF plans and images open right in the browser: your clients don't need any software.")
  }, {
    q: Txt("faq.ou-sont-hebergees-mes-donnees", "Où sont hébergées mes données ?", "Where is my data hosted?"),
    a: Txt("faq.en-france-chez-un-hebergeur-certifie", "En France, chez un hébergeur certifié ISO 27001. Chiffrement AES-256 au repos, TLS en transit, sauvegardes quotidiennes. Conformité RGPD native.", "In France, with an ISO 27001-certified host. AES-256 encryption at rest, TLS in transit, daily backups. GDPR-compliant by design.")
  }, {
    q: Txt("faq.quel-est-le-delai-pour-demarrer", "Quel est le délai pour démarrer ?", "How long does it take to get started?"),
    a: Txt("faq.si-vous-voulez-vous-demarrez-aujourd", "Si vous voulez, vous démarrez aujourd'hui. La création de compte prend 3 minutes ; importer vos projets en cours prend en moyenne une demi-journée. On vous accompagne sur l'onboarding sans frais.", "You can start today. Account creation takes 3 minutes; importing your active projects takes half a day on average. We help with onboarding at no charge.")
  }];
  var _React$useState1 = React.useState(0),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    open = _React$useState10[0],
    setOpen = _React$useState10[1];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-cream-2",
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("faq.questions-frequentes", "Questions fréquentes", "Frequently asked questions")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("faq.vous-vous-demandez-surement", "Vous vous demandez sûrement…", "You're probably wondering…"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "faq"
  }, items.map(function (it, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "q ".concat(open === i ? "open" : ""),
      onClick: function onClick() {
        return setOpen(open === i ? -1 : i);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "q-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "q-title"
    }, it.q), /*#__PURE__*/React.createElement("button", {
      className: "q-toggle",
      "aria-label": "Toggle"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      className: "q-body"
    }, /*#__PURE__*/React.createElement("div", null, it.a)));
  }))));
};

/* CONTACT */
var Contact = function Contact() {
  var _React$useState11 = React.useState({
      name: "",
      agency: "",
      email: "",
      phone: "",
      projects: "1-3",
      msg: ""
    }),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    data = _React$useState12[0],
    setData = _React$useState12[1];
  var _React$useState13 = React.useState({}),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    errors = _React$useState14[0],
    setErrors = _React$useState14[1];
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    submitted = _React$useState16[0],
    setSubmitted = _React$useState16[1];
  /* "repos" | "envoi" | "erreur" — le succès est porté par `submitted`, qui
     existait déjà et gouverne le bloc de confirmation du design. */
  var _React$useState17 = React.useState("repos"),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    envoi = _React$useState18[0],
    setEnvoi = _React$useState18[1];
  /* Champ-piège : invisible pour un visiteur, rempli par les robots qui
     remplissent tout. Il vit dans l'état comme les autres champs. */
  var _React$useState19 = React.useState(""),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    piege = _React$useState20[0],
    setPiege = _React$useState20[1];
  /* Instant d'affichage du formulaire. Le serveur refuse un envoi survenu moins
     de deux secondes après : personne ne remplit six champs en deux secondes. */
  var afficheA = React.useRef(Date.now());
  var set = function set(k, v) {
    return setData(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, _defineProperty({}, k, v));
    });
  };
  var validate = function validate() {
    var e = {};
    if (!data.name.trim()) e.name = Txt("contact.votre-nom-est-requis", "Votre nom est requis", "Your name is required");
    if (!data.agency.trim()) e.agency = Txt("contact.le-nom-de-l-agence-est", "Le nom de l'agence est requis", "Practice name is required");
    if (!data.email.trim()) e.email = Txt("contact.l-email-est-requis", "L'email est requis", "Email is required");else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = Txt("contact.email-invalide", "Email invalide", "Invalid email");
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  /* Ce formulaire n'envoyait RIEN : il validait, affichait « Merci, nous vous
     recontactons sous 24 h », et jetait la demande. Aucune requête réseau
     n'existait dans toute la page. Chaque architecte qui l'a rempli est perdu.
      Il poste désormais vers la fonction `contact-vitrine`, qui enregistre la
     demande EN BASE puis notifie par e-mail — dans cet ordre, pour qu'une panne
     d'e-mail ne fasse pas disparaître la demande.
      Aucune clé ni SDK ici : le point d'entrée est public (`verify_jwt = false`),
     un simple fetch suffit. La CSP autorise cette origine, et elle seule. */
  var POINT_CONTACT = "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/contact-vitrine";
  var submit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ev) {
      var reponse, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            ev.preventDefault();
            if (validate()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!(envoi === "envoi")) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            // double-clic
            setEnvoi("envoi");
            _context.p = 3;
            _context.n = 4;
            return fetch(POINT_CONTACT, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: data.name,
                agency: data.agency,
                email: data.email,
                phone: data.phone,
                projects: data.projects,
                message: data.msg,
                locale: window.__albaLang === "en" ? "en" : "fr",
                website: piege,
                affiche_a: afficheA.current
              })
            });
          case 4:
            reponse = _context.v;
            if (reponse.ok) {
              _context.n = 5;
              break;
            }
            throw new Error("HTTP " + reponse.status);
          case 5:
            setEnvoi("repos");
            setSubmitted(true);
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            /* Ne JAMAIS afficher la confirmation quand l'envoi a échoué : c'est
               exactement le défaut qu'on corrige. Le visiteur doit pouvoir réessayer,
               et l'adresse e-mail lui est donnée comme porte de sortie. */
            console.error("[contact] envoi impossible", _t);
            setEnvoi("erreur");
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[3, 6]]);
    }));
    return function submit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-cream",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container contact"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "contact-side"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("contact.parlons-en", "Parlons-en", "Let's talk")), /*#__PURE__*/React.createElement("h2", null, Txt("contact.voyons-alba-sur-vos-projets-reponse", "Voyons ALBA sur vos projets. Réponse sous 24 h.", "Let's look at ALBA on your projects. Reply within 24 hours.")), /*#__PURE__*/React.createElement("p", null, Txt("contact.que-vous-soyez-seul-e-ou", "Que vous soyez seul·e ou à quatre, on adapte la démo à votre méthode. Pas de discours commercial, juste l'outil en action.", "Whether you're solo or a team of four, we tailor the demo to your workflow. No sales pitch, just the tool in action.")), /*#__PURE__*/React.createElement("ul", {
    className: "contact-info"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 14
  }), " contact@alba-studio.co"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " ", Txt("contact.reponse-en-moins-de-24-h", "Réponse en moins de 24 h ouvrées", "Reply within 24 business hours")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 14
  }), " ", Txt("contact.demo-en-visio-30-min", "Démo en visio · 30 min", "Video demo · 30 min")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("form", {
    className: "form",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-lead"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fl-t"
  }, Txt("contact.demander-une-demo", "Demander une démo", "Request a demo")), /*#__PURE__*/React.createElement("span", {
    className: "fl-s"
  }, Txt("contact.visio-30-min-sans-engagement", "Visio · 30 min · sans engagement", "Video call · 30 min · no commitment")), /*#__PURE__*/React.createElement("a", {
    href: SIGNUP_URL,
    className: "fl-link"
  }, Txt("contact.ou-creez-directement-votre-compte-gratuit", "Ou créez directement votre compte gratuit →", "Or create your free account right away →"))), submitted && /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }), " ", L("Merci, ".concat(data.name.split(" ")[0], ". Nous vous recontactons sous 24 h pour convenir d'un cr\xE9neau."), "Thank you, ".concat(data.name.split(" ")[0], ". We'll be in touch within 24 hours to book a slot."))), envoi === "erreur" && /*#__PURE__*/React.createElement("div", {
    className: "form-error",
    role: "alert"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 14
  }), " ", Txt("contact.envoi-impossible", "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact@alba-studio.co.", "Sending failed. Please try again, or email us directly at contact@alba-studio.co.")), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-9999px",
      width: 1,
      height: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "alba-website"
  }, "Ne pas remplir"), /*#__PURE__*/React.createElement("input", {
    id: "alba-website",
    name: "website",
    type: "text",
    tabIndex: -1,
    autoComplete: "off",
    value: piege,
    onChange: function onChange(e) {
      return setPiege(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field ".concat(errors.name ? "error" : "")
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.nom-complet", "Nom complet", "Full name")), /*#__PURE__*/React.createElement("input", {
    value: data.name,
    onChange: function onChange(e) {
      return set("name", e.target.value);
    },
    placeholder: "Camille Lavigne"
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "field ".concat(errors.agency ? "error" : "")
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.agence", "Agence", "Practice")), /*#__PURE__*/React.createElement("input", {
    value: data.agency,
    onChange: function onChange(e) {
      return set("agency", e.target.value);
    },
    placeholder: "Atelier Lavigne"
  }), errors.agency && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.agency))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field ".concat(errors.email ? "error" : "")
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.email-professionnel", "Email professionnel", "Work email")), /*#__PURE__*/React.createElement("input", {
    value: data.email,
    onChange: function onChange(e) {
      return set("email", e.target.value);
    },
    type: "email",
    placeholder: "camille@atelier-lavigne.fr"
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.telephone", "Téléphone", "Phone")), /*#__PURE__*/React.createElement("input", {
    value: data.phone,
    onChange: function onChange(e) {
      return set("phone", e.target.value);
    },
    placeholder: "+33 6 12 34 56 78"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field full"
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.combien-de-projets-en-cours", "Combien de projets en cours ?", "How many active projects?")), /*#__PURE__*/React.createElement("select", {
    value: data.projects,
    onChange: function onChange(e) {
      return set("projects", e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "1-3"
  }, Txt("contact.1-a-3-projets", "1 à 3 projets", "1 to 3 projects")), /*#__PURE__*/React.createElement("option", {
    value: "4-10"
  }, Txt("contact.4-a-10-projets", "4 à 10 projets", "4 to 10 projects")), /*#__PURE__*/React.createElement("option", {
    value: "10+"
  }, Txt("contact.plus-de-10-projets", "Plus de 10 projets", "More than 10 projects"))))), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field full"
  }, /*#__PURE__*/React.createElement("label", null, Txt("contact.un-mot-sur-votre-besoin-optionnel", "Un mot sur votre besoin (optionnel)", "A word about your needs (optional)")), /*#__PURE__*/React.createElement("textarea", {
    value: data.msg,
    onChange: function onChange(e) {
      return set("msg", e.target.value);
    },
    placeholder: Txt("contact.ce-qui-vous-coince-aujourd-hui", "Ce qui vous coince aujourd'hui, ce que vous cherchez à régler…", "What's blocking you today, what you're trying to solve…")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-foot"
  }, /*#__PURE__*/React.createElement("p", {
    className: "form-note"
  }, Txt("contact.en-envoyant-vous-acceptez-d-etre", "En envoyant, vous acceptez d'être recontacté·e une fois pour planifier la démo. RGPD-compliant.", "By sending, you agree to be contacted once to schedule the demo. GDPR-compliant.")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: envoi === "envoi"
  }, envoi === "envoi" ? Txt("contact.envoi-en-cours", "Envoi…", "Sending…") : Txt("contact.demander-une-demo-2", "Demander une démo", "Request a demo"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    className: "btn-arrow"
  })))))));
};

/* FOOTER */
var Footer = function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "foot-brand"
  }, "ALBA Studio"), /*#__PURE__*/React.createElement("div", {
    className: "foot-tag"
  }, Txt("pied.la-plateforme-tout-en-un-des", "La plateforme tout-en-un des architectes indépendants. Conçue à Lyon, pensée pour vous.", "The all-in-one platform for independent architects. Made in Lyon, designed for you.")), /*#__PURE__*/React.createElement("span", {
    className: "liseret-under"
  }), /*#__PURE__*/React.createElement("div", {
    className: "foot-apps"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.l-app-mobile-tablette", "L'app mobile & tablette", "The mobile & tablet app")), /*#__PURE__*/React.createElement(StoreBadges, {
    theme: "dark"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.produit", "Produit", "Product")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "index.html#features"
  }, Txt("pied.fonctionnalites", "Fonctionnalités", "Features"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "index.html#fonctionnalites"
  }, Txt("pied.la-plateforme", "La plateforme", "The platform"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "Tarifs.html"
  }, Txt("pied.tarifs", "Tarifs", "Pricing"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#faq"
  }, "FAQ")))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.agence", "Agence", "Company")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, Txt("pied.a-propos", "À propos", "About"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, Txt("pied.manifeste", "Manifeste", "Manifesto"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, Txt("pied.carrieres", "Carrières", "Careers"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "Contact")))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.legal", "Légal", "Legal")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mentions-legales.html"
  }, Txt("pied.mentions-legales", "Mentions légales", "Legal notice"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "".concat(APP_ORIGIN, "/terms")
  }, Txt("pied.cgu-cgv", "CGU & CGV", "Terms & conditions"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "".concat(APP_ORIGIN, "/privacy-policy")
  }, Txt("pied.politique-rgpd", "Politique RGPD", "GDPR policy"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#securite"
  }, Txt("pied.securite", "Sécurité", "Security")))))), /*#__PURE__*/React.createElement("div", {
    className: "foot-bot"
  }, /*#__PURE__*/React.createElement("div", null, Txt("pied.2026-alba-studio-tous-droits-reserves", "© 2026 ALBA STUDIO — TOUS DROITS RÉSERVÉS", "© 2026 ALBA STUDIO — ALL RIGHTS RESERVED")), /*#__PURE__*/React.createElement("div", null, Txt("pied.fait-a-lyon-avec-soin", "FAIT À LYON · AVEC SOIN", "MADE IN LYON · WITH CARE"), " ", /*#__PURE__*/React.createElement("span", {
    className: "fr-flag",
    title: "Made in France"
  })))));
};
window.Reveal = Reveal;
window.CTABand = CTABand;
window.TrustBand = TrustBand;
window.Hero = Hero;
window.Logos = Logos;
window.Pains = Pains;
window.Features = Features;
window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.Faq = Faq;
window.Contact = Contact;
window.Footer = Footer;
