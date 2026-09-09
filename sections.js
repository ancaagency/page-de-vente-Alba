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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* Section components for Alba landing, bilingual via window.L(fr, en) */

/* La classe `in` est un ÉTAT REACT, et non un `classList.add` posé à la main.

   Elle l'a été, et ça a fait disparaître deux cartes tarifaires sur trois : le
   visiteur cliquait « 2 personnes », le badge « correspond à vos réponses »
   passait d'Atelier à Agence, la prop `className` changeait donc sur ces deux
   cartes — et React réécrivait l'attribut entier depuis son propre modèle, qui
   ne connaissait pas `in`. Retour à `opacity: 0`, et l'IntersectionObserver ne
   se redéclenche pas pour un élément qui n'a pas bougé. Découverte restait
   affichée parce qu'elle seule n'avait pas changé de classe.

   Un attribut que React possède ne se modifie que par React. */
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
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visible = _React$useState2[0],
    setVisible = _React$useState2[1];
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) {
          setVisible(true);
        } else if (e.boundingClientRect.top > 0) {
          // element left through the BOTTOM of the viewport (user scrolled up past it)
          setVisible(false);
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
    className: "reveal ".concat(className).concat(visible ? " in" : ""),
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
  }, /*#__PURE__*/React.createElement(BoutonEssai, {
    className: "btn btn-primary"
  }, Txt("accueil.tester-en-1-clic", "Tester en 1 clic", "Try it in one click"), " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    className: "btn-arrow"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "btn btn-ghost"
  }, Txt("accueil.s-abonner", "S'abonner", "Subscribe")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 420
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-essai-note"
  }, Txt("accueil.note-essai", "Un espace d'essai complet, ouvert 7 jours. Sans inscription ni carte bancaire.", "A complete trial workspace, open for 7 days. No sign-up, no credit card.")))), /*#__PURE__*/React.createElement(Reveal, {
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
  }, Txt("bandeau-cta.gratuit-a-vie-pour-1-projet", "Premier projet offert.", "First project on us.")), /*#__PURE__*/React.createElement("div", {
    className: "cta-band-sub"
  }, Txt("bandeau-cta.gerez-un-projet-complet-gratuitement-sans", "Créez votre espace en dix minutes. Le premier projet est offert, sans carte bleue.", "Set up your workspace in ten minutes. The first project is on us, no credit card."))), /*#__PURE__*/React.createElement("div", {
    className: "cta-band-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: SIGNUP_URL,
    className: "btn btn-primary"
  }, Txt("bandeau-cta.creer-mon-projet-gratuit", "Créer mon espace", "Create my workspace"), " ", /*#__PURE__*/React.createElement(Icon, {
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
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    active = _React$useState4[0],
    setActive = _React$useState4[1];
  var _React$useState5 = React.useState(function () {
      return window.matchMedia("(max-width: 900px)").matches;
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    mobile = _React$useState6[0],
    setMobile = _React$useState6[1];

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

/* ============================================================================
   « TOUT CE QUE FAIT ALBA » — le catalogue, derrière un bouton
   ============================================================================
   POURQUOI IL N'Y A QU'UN SEUL BOUTON

   La demande parlait de le poser « sur la ligne Toutes les fonctionnalités de
   l'encadré, et sur la même ligne dans chacune des trois cartes ». Cette ligne
   n'existe plus qu'à UN endroit depuis la refonte : les trois offres sont
   devenues des tuiles d'une ligne, et ce sont elles-mêmes des <button> — un
   bouton dans un bouton n'est pas du HTML valide, et aucun lecteur d'écran
   n'en fait quelque chose d'utilisable.

   L'intention, elle, est respectée à la lettre : un seul bouton, un seul
   contenu, pas quatre listes à maintenir.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI UN PORTAIL VERS <body>

   `.reveal` porte `transform: translateY(0)` même à l'état visible. Un
   `transform` sur un ancêtre fait de lui le bloc conteneur des descendants en
   `position: fixed` : la fenêtre se serait centrée sur la CARTE, pas sur
   l'écran, et le voile n'aurait couvert qu'elle. Le portail sort du sous-arbre
   et rend le problème impossible plutôt que de le contourner.

   ⚠️ AUCUN PRIX ICI, et aucune mention d'offre — à la seule exception de
   « offre Agence » sur la ligne Collaborateurs, parce que c'est la seule
   fonction dont l'accès dépend réellement de l'offre. Ce n'est pas un tableau
   comparatif : c'est précisément ce qu'on refuse de faire, puisque tout est
   dans toutes les offres. tests/montants.mjs veille sur les montants.
   ============================================================================ */
var CATALOGUE = function CATALOGUE() {
  return [{
    icone: "folder",
    titre: Txt("catalogue.projets", "Vos projets", "Your projects"),
    items: [Txt("catalogue.projets-decisions", "Décisions — trancher, horodater et signer les choix du chantier", "Decisions — settle, timestamp and sign the choices made on site"), Txt("catalogue.projets-documents", "Documents — plans, pièces écrites, contrats : déposés, versionnés, partagés", "Documents — drawings, written documents, contracts: uploaded, versioned, shared"), Txt("catalogue.projets-suivi", "Suivi du projet — les phases, les jalons et les échéances", "Project tracking — phases, milestones and deadlines"), Txt("catalogue.projets-budget", "Budget — le suivi des montants, des lots et des factures", "Budget — tracking amounts, work packages and invoices"), Txt("catalogue.projets-rentabilite", "Rentabilité — le temps passé et la marge, projet par projet", "Profitability — time spent and margin, project by project"), Txt("catalogue.projets-chantier", "Suivi de chantier — réserves, comptes rendus de visite, PV et photos", "Site tracking — punch-list items, visit reports, minutes and photographs"), Txt("catalogue.projets-calendrier", "Calendrier — toutes les échéances de tous les projets au même endroit", "Calendar — every deadline from every project in one place")]
  }, {
    icone: "sparkle",
    titre: Txt("catalogue.leo", "Léo, votre assistant", "Léo, your assistant"),
    items: [Txt("catalogue.leo-lit", "Il lit vos pièces écrites — CCTP, descriptifs, DPGF, notices — et en sort les prescriptions, les matériaux, les prix et les intervenants", "He reads your written documents — specifications, schedules of works, bills of quantities, notices — and extracts requirements, materials, prices and parties"), Txt("catalogue.leo-questions", "Vous lui posez vos questions sur vos projets, en français", "You ask him questions about your projects, in plain English"), Txt("catalogue.leo-voix", "Il répond à voix haute si vous le souhaitez", "He answers out loud if you want him to"), Txt("catalogue.leo-briefing", "Un briefing du matin qui rassemble ce qui vous attend", "A morning briefing that gathers what lies ahead")]
  }, {
    icone: "users",
    titre: Txt("catalogue.portail", "Le portail de vos clients", "Your clients' portal"),
    items: [Txt("catalogue.portail-espace", "Un espace par projet pour le maître d'ouvrage, sans qu'il crée de compte", "A space per project for your client, with no account to create"), Txt("catalogue.portail-signature", "Validation des choix et signature électronique des procès-verbaux", "Approval of choices and electronic signature of minutes"), Txt("catalogue.portail-messagerie", "Messagerie avec le maître d'ouvrage et les intervenants", "Messaging with your client and everyone involved"), Txt("catalogue.portail-droits", "Vous décidez, projet par projet et personne par personne, de ce qu'ils voient", "You decide, project by project and person by person, what they see"), Txt("catalogue.portail-gratuits", "Clients, bureaux d'études et entreprises : gratuits et illimités", "Clients, engineers and contractors: free and unlimited")]
  }, {
    icone: "layers",
    titre: Txt("catalogue.matiere", "La matière", "Your material"),
    items: [Txt("catalogue.matiere-materiautheque", "Matériauthèque — votre bibliothèque de matériaux, réutilisable d'un projet à l'autre", "Material library — your own library of materials, reusable from one project to the next"), Txt("catalogue.matiere-lots", "Bibliothèque de lots et de modèles CCTP", "Library of work packages and specification templates"), Txt("catalogue.matiere-consultation", "Consultation des entreprises — prescriptions, intervenants et prix", "Tendering — requirements, parties and prices")]
  }, {
    icone: "compass",
    titre: Txt("catalogue.agence", "Votre agence", "Your practice"),
    items: [Txt("catalogue.agence-collaborateurs", "Collaborateurs — inviter votre équipe et régler ses droits (offre Agence)", "Team members — invite your team and set their permissions (Practice plan)"), Txt("catalogue.agence-visuels", "Visuels — galeries, diaporama et visites virtuelles pour vos présentations", "Visuals — galleries, slideshows and virtual tours for your presentations"), Txt("catalogue.agence-emails", "E-mails automatiques", "Automatic emails"), Txt("catalogue.agence-honoraires", "Calculateur d'honoraires", "Fee calculator"), Txt("catalogue.agence-archives", "Archives et corbeille", "Archives and bin")]
  }, {
    icone: "globe",
    titre: Txt("catalogue.aussi", "Et aussi", "And also"),
    items: [Txt("catalogue.aussi-mobile", "Application mobile iOS et Android", "iOS and Android mobile app"), Txt("catalogue.aussi-notifications", "Notifications par e-mail et sur votre téléphone", "Notifications by email and on your phone"), Txt("catalogue.aussi-2fa", "Double authentification", "Two-factor authentication"), Txt("catalogue.aussi-langues", "Français et anglais", "French and English"), Txt("catalogue.aussi-accessibilite", "Réglages d'accessibilité", "Accessibility settings"), Txt("catalogue.aussi-marque", "Vos couleurs et votre logo sur les documents envoyés", "Your colours and your logo on the documents you send")]
  }];
};
var ToutesFonctionnalites = function ToutesFonctionnalites() {
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    ouvert = _React$useState8[0],
    setOuvert = _React$useState8[1];
  var bouton = React.useRef(null);
  var boite = React.useRef(null);
  var titreId = "catalogue-titre";

  /* ── LE PIÈGE À FOCUS ───────────────────────────────────────────────────
     Sans lui, la tabulation sort de la fenêtre par le bas et se promène dans
     une page que le voile rend invisible : on tabule à l'aveugle, sans savoir
     où l'on est ni comment revenir. Le tabindex={-1} sur la boîte donne un
     point de départ au focus sans ajouter un arrêt de tabulation. */
  React.useEffect(function () {
    if (!ouvert) return;
    var el = boite.current;
    if (!el) return;
    var focusables = function focusables() {
      return _toConsumableArray(el.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (n) {
        return n.offsetParent !== null;
      });
    };

    /* On entre par le bouton « Fermer » : c'est la sortie, et savoir en sortir
       est la première chose dont on a besoin en arrivant. */
    var premier = el.querySelector(".fen-fermer");
    if (premier) premier.focus();
    var auClavier = function auClavier(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOuvert(false);
        return;
      }
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) return;
      var _ref3 = [f[0], f[f.length - 1]],
        debut = _ref3[0],
        fin = _ref3[1];
      /* `document.activeElement` et non e.target : le focus peut être sur la
         boîte elle-même, qui n'est pas dans la liste. */
      if (e.shiftKey && document.activeElement === debut) {
        e.preventDefault();
        fin.focus();
      } else if (!e.shiftKey && document.activeElement === fin) {
        e.preventDefault();
        debut.focus();
      }
    };
    document.addEventListener("keydown", auClavier);

    /* La page derrière ne défile pas. `overflow: hidden` suffit au défilement
       natif, mais Lenis pilote le sien et continuerait à déplacer la page sous
       le voile : on l'arrête aussi, et on le relance en partant. */
    var avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    return function () {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = avant;
      if (window.__lenis) window.__lenis.start();
      /* Le focus revient au bouton qui a ouvert : sans ça il retombe sur
         <body>, et la tabulation reprend au tout début de la page. */
      if (bouton.current) bouton.current.focus();
    };
  }, [ouvert]);
  var fenetre = /*#__PURE__*/React.createElement("div", {
    className: "fen-fond",
    onMouseDown: function onMouseDown(e) {
      if (e.target === e.currentTarget) setOuvert(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fen-boite",
    ref: boite,
    tabIndex: -1,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": titreId
  }, /*#__PURE__*/React.createElement("div", {
    className: "fen-tete"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "fen-titre",
    id: titreId
  }, Txt("catalogue.titre", "Tout ce que fait Alba", "Everything Alba does")), /*#__PURE__*/React.createElement("p", {
    className: "fen-chapo"
  }, Txt("catalogue.chapo", "Tout ce qui suit est inclus dans les trois offres, y compris la gratuite. Nous ne bornons que des quantités : le nombre de projets menés de front, le nombre de personnes, et l'usage de Léo.", "Everything below is included in all three plans, including the free one. We cap quantities only: the number of projects you run at once, the number of people, and how much you use Léo."))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fen-fermer",
    onClick: function onClick() {
      return setOuvert(false);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, Txt("catalogue.fermer", "Fermer", "Close")))), /*#__PURE__*/React.createElement("div", {
    className: "fen-corps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fen-groupes"
  }, CATALOGUE().map(function (g, i) {
    return /*#__PURE__*/React.createElement("section", {
      className: "fen-groupe",
      key: i
    }, /*#__PURE__*/React.createElement("h3", {
      className: "fen-groupe-titre"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: g.icone,
      size: 15
    }), g.titre), /*#__PURE__*/React.createElement("ul", null, g.items.map(function (it, j) {
      return /*#__PURE__*/React.createElement("li", {
        key: j
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 13
      }), /*#__PURE__*/React.createElement("span", null, it));
    })));
  })), /*#__PURE__*/React.createElement("p", {
    className: "fen-pied"
  }, Txt("catalogue.pied", "Vous pouvez masquer ce que vous n'utilisez pas, depuis vos réglages — et le rallumer quand vous voulez.", "You can hide what you don't use, from your settings — and switch it back on whenever you like.")))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fen-plus",
    ref: bouton,
    "aria-haspopup": "dialog",
    "aria-expanded": ouvert ? "true" : "false",
    onClick: function onClick() {
      return setOuvert(true);
    },
    "aria-label": Txt("catalogue.voir", "Voir toutes les fonctionnalités", "See every feature")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  })), ouvert && typeof document !== "undefined" ? ReactDOM.createPortal(fenetre, document.body) : null);
};

/* ============================================================================
   PRICING — deux questions, une réponse
   ============================================================================
   CE QU'ON A CESSÉ DE VENDRE

   La grille affichait 49 / 69 / 89 € pour 50, 150 et 300 Go : les trois offres
   ne différaient QUE par le stockage. Mesure faite en production le 9 septembre
   2026, l'ensemble des comptes occupait 0,143 Go — l'offre d'ENTRÉE promettait
   350 fois plus que tout ce qui existait. Un plafond que personne n'atteindra
   jamais n'est pas une offre d'entrée : c'est un axe de prix mort.

   ⚠️ LE MOT « STOCKAGE » NE DOIT REPARAÎTRE NULLE PART, ni les gigaoctets.
   tests/tarifs.mjs le vérifie sur toutes les pages rendues, métadonnées
   comprises — c'est par là qu'il s'était échappé la première fois.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI UNE SEULE CARTE, ET PAS TROIS

   La version précédente posait trois cartes de poids égal, puis un calculateur
   EN DESSOUS. Le badge « correspond à vos réponses » était sur une carte
   au-dessus des questions auxquelles il répondait : le visiteur lisait un
   badge qui parlait de réponses qu'il n'avait pas données, et quand il
   cliquait enfin « 2 personnes », la réaction se produisait hors de son champ
   de vision. Le prix était affiché deux fois — dans la carte et dans le
   calculateur — et l'argument Léo, qui est TOUT l'argument, finissait en bas
   d'une boîte grise à cinq curseurs.

   Désormais : la question à gauche, la réponse à droite, dans l'ordre de
   lecture. Un seul grand chiffre, qui change sous les yeux. Et l'argument en
   une ligne, en face du prix : « ≈ 300 € de temps gagné, soit 6 × votre
   abonnement ». Les trois offres restent visibles, en rail compact sous la
   réponse — on voit le paysage sans devoir choisir entre trois égaux.

   ────────────────────────────────────────────────────────────────────────────
   LA RÈGLE D'OR

   Toutes les fonctionnalités sont dans toutes les offres, y compris la
   gratuite. On ne borne que des QUANTITÉS. C'est l'argument, il est donc écrit
   en encart sous les questions : la concurrence réserve des fonctions aux
   paliers hauts, et un architecte qui s'est déjà heurté à un « disponible à
   partir de l'offre Pro » lira cette ligne deux fois.

   ────────────────────────────────────────────────────────────────────────────
   AGENCE N'EST PAS UN PRIX PAR PERSONNE

   Elle l'a été sur cette page pendant une journée, et c'était faux : la carte
   annonçait « 69 € par personne », soit 276 € pour quatre. Le tarif réel est
   dégressif — 69 € pour la première personne, 39 € pour chacune des suivantes,
   soit 186 € pour quatre. Les montants viennent de tarifs.js, seul endroit du
   dépôt où ils sont écrits ; ce sont ceux de Stripe, et rien d'autre ne fait
   autorité.
   ============================================================================ */
var Pricing = function Pricing() {
  /* ── LA GRILLE ────────────────────────────────────────────────────────────
     Elle vient de tarifs.js, et n'est PAS recopiée ici. Pas de valeur de
     repli, volontairement : un prix de repli qui diverge du vrai est exactement
     le défaut qu'on cherche à rendre impossible. Le prérendu monte la page dans
     un vrai navigateur : si le fichier n'est pas chargé, ça casse là, à la
     construction, et pas chez un visiteur. */
  var TARIFS = window.ALBA_TARIFS;
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    annuel = _React$useState0[0],
    setAnnuel = _React$useState0[1];
  var _React$useState1 = React.useState(1),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    personnes = _React$useState10[0],
    setPersonnes = _React$useState10[1];
  var _React$useState11 = React.useState(3),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    projets = _React$useState12[0],
    setProjets = _React$useState12[1];
  /* Le visiteur peut désigner une offre à la main dans le rail. Ce choix vaut
     jusqu'à ce qu'il change une réponse : une réponse nouvelle rend la main à
     la recommandation. C'est la règle la plus prévisible — on ne se retrouve
     jamais avec une offre choisie il y a trois clics qui contredit ce qu'on
     vient de dire. */
  var _React$useState13 = React.useState(null),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    choix = _React$useState14[0],
    setChoix = _React$useState14[1];
  /* Les curseurs de l'estimation sont repliés : ils sont pour le sceptique, pas
     pour tout le monde. Le résultat, lui, est toujours visible. */
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    ajuste = _React$useState16[0],
    setAjuste = _React$useState16[1];

  /** Total pour l'offre Agence, à `n` personnes, dans la périodicité courante. */
  var totalAgence = function totalAgence(n) {
    var t = annuel ? TARIFS.agence.an : TARIFS.agence.mois;
    return t.premiere + t.suivante * Math.max(0, n - 1);
  };
  /** Ce que le visiteur paie chaque mois, quelle que soit la périodicité. */
  var parMois = function parMois(totalPeriode) {
    return Math.round(totalPeriode / (annuel ? 12 : 1));
  };
  var OFFRES = [{
    cle: "decouverte",
    palier: null,
    // gratuite : aucun paiement
    nom: Txt("tarifs.offre-decouverte", "Découverte", "Discovery"),
    resume: Txt("tarifs.decouverte-resume", "Pour voir ce que ça donne sur un vrai projet.", "To see what it does on a real project."),
    court: Txt("tarifs.decouverte-court", "1 projet · 1 personne", "1 project · 1 person"),
    quantites: [Txt("tarifs.decouverte-q1", "1 projet, offert à vie", "1 project, free for ever"), Txt("tarifs.decouverte-q2", "1 personne", "1 person"), Txt("tarifs.decouverte-q3", "Léo : 10 lectures de documents et 300 questions par mois", "Léo: 10 document readings and 300 questions per month")],
    lectures: 10
  }, {
    cle: "atelier",
    palier: 50,
    nom: Txt("tarifs.offre-atelier", "Atelier", "Studio"),
    resume: Txt("tarifs.atelier-resume", "Pour un architecte qui mène plusieurs affaires de front.", "For an architect running several jobs at once."),
    court: Txt("tarifs.atelier-court", "5 projets de front · 1 personne", "5 live projects · 1 person"),
    quantites: [Txt("tarifs.atelier-q1", "5 projets menés de front, archives illimitées", "5 live projects, unlimited archives"), Txt("tarifs.atelier-q2", "1 personne", "1 person"), Txt("tarifs.atelier-q3", "Léo : 50 lectures et 1 500 questions par mois", "Léo: 50 readings and 1,500 questions per month")],
    lectures: 50
  }, {
    cle: "agence",
    palier: 150,
    degressive: true,
    nom: Txt("tarifs.offre-agence", "Agence", "Practice"),
    resume: Txt("tarifs.agence-resume", "Pour une équipe, jusqu'à quatre personnes.", "For a team, up to four people."),
    court: Txt("tarifs.agence-court", "Projets illimités · jusqu'à 4 personnes", "Unlimited projects · up to 4 people"),
    quantites: [Txt("tarifs.agence-q1", "Projets illimités", "Unlimited projects"), Txt("tarifs.agence-q2", "Jusqu'à 4 personnes", "Up to 4 people"), Txt("tarifs.agence-q3", "Léo : 200 lectures et 5 000 questions par mois", "Léo: 200 readings and 5,000 questions per month")],
    lectures: 200
  }];

  /* 1 personne et 1 projet : Découverte, qui est gratuite. On la propose
     d'abord — envoyer quelqu'un payer 49 € pour un usage que l'offre gratuite
     couvre entièrement serait se tirer une balle dans le pied. */
  var recommandee = personnes === 1 && projets === 1 ? OFFRES[0] : personnes === 1 && projets <= 5 ? OFFRES[1] : OFFRES[2];
  var offre = choix && OFFRES.find(function (o) {
    return o.cle === choix;
  }) || recommandee;
  /* Une offre choisie à la main EN DESSOUS de la recommandation ne couvre pas
     les réponses données : on le dit, sans l'interdire. */
  var sousDimensionnee = OFFRES.indexOf(offre) < OFFRES.indexOf(recommandee);

  /* Répondre à une question rend la main à la recommandation. */
  var repondre = function repondre(poser) {
    return function (v) {
      poser(v);
      setChoix(null);
    };
  };

  /** Ce que coûte une offre donnée, pour le nombre de personnes courant. */
  var coutDe = function coutDe(o) {
    if (!o.palier) return {
      periode: 0,
      mois: 0
    };
    var p = o.degressive ? totalAgence(personnes) : annuel ? TARIFS.atelier.an : TARIFS.atelier.mois;
    return {
      periode: p,
      mois: parMois(p)
    };
  };
  var cout = coutDe(offre);

  /* ── L'ESTIMATION DE TEMPS ────────────────────────────────────────────────
     Quatre documents par mois par défaut, et non vingt. Vingt, c'était un CCTP
     par jour ouvré — un usage qu'aucun architecte seul ne reconnaîtra — et le
     résultat affichait 1 500 € de gain, trente fois le prix de l'offre. Un
     chiffre auquel personne ne croit ne convainc pas : il jette le doute sur
     tout le reste de la page.
     Quatre documents donnent 300 €, six fois le prix d'Atelier. C'est crédible,
     et ça reste très parlant. */
  var _React$useState17 = React.useState(75),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    taux = _React$useState18[0],
    setTaux = _React$useState18[1];
  var _React$useState19 = React.useState(4),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    docs = _React$useState20[0],
    setDocs = _React$useState20[1];
  var _React$useState21 = React.useState(1),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    heuresParDoc = _React$useState22[0],
    setHeuresParDoc = _React$useState22[1];
  var heuresGagnees = docs * heuresParDoc;
  var valeurGagnee = Math.round(heuresGagnees * taux);
  var depasseLectures = docs > offre.lectures;
  /* « soit 6 × votre abonnement » : c'est LA phrase. Elle n'est dite que quand
     elle est forte — en dessous de 2, un « 1,6 × » affaiblit plus qu'il
     n'appuie, et on laisse le montant parler seul. Entier au-delà de 3, une
     décimale entre 2 et 3 : « 6 × », « 2,4 × ». */
  var ratio = cout.mois > 0 ? valeurGagnee / cout.mois : null;
  var ratioTexte = ratio === null || ratio < 2 ? null : ratio >= 3 ? String(Math.round(ratio)) : (Math.round(ratio * 10) / 10).toLocaleString(window.__albaLang === "en" ? "en-GB" : "fr-FR");
  var SIGNUP = (typeof window !== "undefined" && window.ALBA_APP_ORIGIN ? window.ALBA_APP_ORIGIN : "https://app.alba-studio.co") + "/inscription";

  /* ── PAIEMENT ─────────────────────────────────────────────────────────────
     On envoie un PALIER, jamais un prix : les identifiants de tarif sont
     résolus côté serveur. Quelqu'un qui bricole la requête obtient au pire une
     autre offre, jamais un autre montant.
     Aucune authentification : le visiteur n'a pas de compte, c'est le principe
     même de ce parcours. Aucune case CGU non plus — le consentement est
     recueilli dans le tunnel Stripe, deux écrans plus loin. Le demander ici
     serait un second consentement au mauvais endroit. */
  var POINT_PAIEMENT = "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/creer-paiement-public";
  var _React$useState23 = React.useState("repos"),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    paiement = _React$useState24[0],
    setPaiement = _React$useState24[1];
  var _React$useState25 = React.useState(null),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    erreurPaiement = _React$useState26[0],
    setErreurPaiement = _React$useState26[1];
  /* Verrou de double-clic. Il ne peut PAS reposer sur `paiement` : React ne
     rafraîchit l'état qu'au rendu suivant, si bien que trois clics rapides
     lisent tous « repos » et partent tous les trois. Une référence, elle,
     change à l'instant même. */
  var ouvertureEnCours = React.useRef(false);
  var indisponible = L("Le paiement est momentanément indisponible. Réessayez dans quelques minutes.", "Payment is temporarily unavailable. Please try again in a few minutes.");
  var ecrivezNous = L("Le paiement n'a pas pu s'ouvrir. Ce n'est pas de votre fait : écrivez-nous et on vous ouvre l'accès.", "Checkout could not open. It's not your doing: write to us and we'll open access for you.");
  /* Deux familles de messages : ce qui vient du visiteur ou d'un incident
     passager invite à réessayer ; ce qui vient de NOUS invite à écrire, parce
     qu'envoyer quelqu'un s'acharner sur un bouton cassé n'a rien réparé. */
  var MESSAGES = {
    trop_de_tentatives: L("Trop de tentatives, réessayez dans un moment.", "Too many attempts, please try again shortly."),
    tarif_indisponible: indisponible,
    cgu_non_configurees: indisponible,
    paiement_indisponible: indisponible,
    erreur_interne: ecrivezNous,
    methode_non_autorisee: ecrivezNous
  };

  /**
   * @param {object} offre  l'offre choisie ; `palier` null = gratuite
   * @param {number} sieges nombre TOTAL de personnes, première incluse
   */
  var abonner = function abonner(offre, sieges) {
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ev) {
        var reponse, donnees, notre, horsLigne, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(typeof window === "undefined" || !window.ALBA_PAIEMENT_DIRECT)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (offre.palier) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              // Découverte : le lien suit son href
              ev.preventDefault();
              if (!ouvertureEnCours.current) {
                _context.n = 3;
                break;
              }
              return _context.a(2);
            case 3:
              ouvertureEnCours.current = true;
              setPaiement("envoi");
              setErreurPaiement(null);
              _context.p = 4;
              _context.n = 5;
              return fetch(POINT_PAIEMENT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  storage: offre.palier,
                  billing: annuel ? "yearly" : "monthly",
                  seats: sieges
                })
              });
            case 5:
              reponse = _context.v;
              _context.n = 6;
              return reponse.json()["catch"](function () {
                return null;
              });
            case 6:
              donnees = _context.v;
              if (!(reponse.ok && donnees && donnees.url)) {
                _context.n = 7;
                break;
              }
              window.location.href = donnees.url;
              return _context.a(2);
            case 7:
              /* Ces deux codes sont des défauts de CETTE page, pas du visiteur : le
                 journal doit les nommer, l'écran ne doit pas les étaler. Un architecte
                 n'a pas à lire nos bogues. */
              notre = {
                palier_inconnu: "palier refus\xE9 par le serveur : ".concat(offre.palier),
                methode_non_autorisee: "le serveur a reçu autre chose qu'un POST"
              };
              if (donnees && notre[donnees.error]) {
                console.error("[paiement] d\xE9faut de la page \u2014 ".concat(notre[donnees.error]));
              }
              setErreurPaiement(donnees && MESSAGES[donnees.error] || L("Le paiement n'a pas pu s'ouvrir. Réessayez.", "Checkout could not open. Please try again."));
              setPaiement("erreur");
              ouvertureEnCours.current = false; // relâché sur échec seulement : un succès quitte la page
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              /* Un `fetch` qui LÈVE n'a jamais atteint le serveur : CSP, contrôle
                 d'origine, ou réseau. Le navigateur rend le même « Failed to fetch »
                 pour les trois, par principe. On ne prétend donc pas savoir : on
                 n'accuse la connexion QUE si le navigateur confirme être hors ligne. */
              horsLigne = typeof navigator !== "undefined" && navigator.onLine === false;
              console.error("[paiement] la requête n'a pas abouti —", horsLigne ? "navigateur hors ligne" : "refus avant le serveur : CSP (connect-src), contrôle d'origine, ou réseau", _t);
              setErreurPaiement(horsLigne ? L("Vous semblez hors ligne. Le paiement s'ouvrira dès que la connexion revient.", "You appear to be offline. Checkout will open as soon as you're back online.") : ecrivezNous);
              setPaiement("erreur");
              ouvertureEnCours.current = false;
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[4, 8]]);
      }));
      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }();
  };
  var euros = function euros(n) {
    return new Intl.NumberFormat(window.__albaLang === "en" ? "en-GB" : "fr-FR").format(n);
  };
  var sieges = offre.degressive ? personnes : 1;
  var gratuite = !offre.palier;
  var grille = annuel ? TARIFS.agence.an : TARIFS.agence.mois;
  var unite = Txt("tarifs.ht-mois-court", "HT / mois", "excl. VAT / month");

  /** Prix d'une tuile du rail, dans la périodicité courante. */
  var prixTuile = function prixTuile(o) {
    if (!o.palier) return Txt("tarifs.gratuit", "Gratuit", "Free");
    var base = o.degressive ? grille.premiere : annuel ? TARIFS.atelier.an : TARIFS.atelier.mois;
    return "".concat(o.degressive ? Txt("tarifs.des", "dès", "from") + " " : "").concat(euros(parMois(base)), " \u20AC");
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("tarifs.eyebrow", "Tarifs", "Pricing")), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, Txt("tarifs.titre-1", "Deux questions,", "Two questions,"), " ", /*#__PURE__*/React.createElement("em", null, Txt("tarifs.titre-2", "un prix.", "one price."))), /*#__PURE__*/React.createElement("p", {
    className: "s-sub"
  }, Txt("tarifs.sous-titre", "On ne facture ni des options ni des modules : seulement le nombre de projets que vous menez de front et le nombre de personnes qui travaillent dans ALBA.", "We charge neither for add-ons nor for modules: only for the number of projects you run at once and the number of people working in ALBA."))), /*#__PURE__*/React.createElement(Reveal, {
    className: "conf"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-questions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-champ"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "calc-personnes",
    className: "conf-question"
  }, Txt("tarifs.calc-personnes", "Combien êtes-vous dans l'agence ?", "How many of you are in the practice?")), /*#__PURE__*/React.createElement("div", {
    className: "calc-boutons",
    role: "group"
  }, Array.from({
    length: TARIFS.maxPersonnes
  }, function (_, i) {
    return i + 1;
  }).map(function (n) {
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      id: n === 1 ? "calc-personnes" : undefined,
      className: "calc-bouton".concat(personnes === n ? " est-actif" : ""),
      "aria-pressed": personnes === n ? "true" : "false",
      onClick: function onClick() {
        return repondre(setPersonnes)(n);
      }
    }, n);
  })), /*#__PURE__*/React.createElement("p", {
    className: "calc-note"
  }, Txt("tarifs.invites-note", "Vos clients, bureaux d'études et entreprises ne sont pas facturés : vous les invitez gratuitement, sans limite, sur toutes les offres.", "Your clients, engineers and contractors are not billed: you invite them for free, without limit, on every plan."))), /*#__PURE__*/React.createElement("div", {
    className: "calc-champ"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "calc-projets",
    className: "conf-question"
  }, Txt("tarifs.calc-projets", "Combien de projets menez-vous de front ?", "How many projects do you run at once?"), /*#__PURE__*/React.createElement("b", null, projets)), /*#__PURE__*/React.createElement("input", {
    id: "calc-projets",
    type: "range",
    min: "1",
    max: "30",
    value: projets,
    style: {
      "--part": "".concat((projets - 1) / 29 * 100, "%")
    },
    onChange: function onChange(e) {
      return repondre(setProjets)(Number(e.target.value));
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "calc-note"
  }, Txt("tarifs.calc-projets-note", "Projets en cours, pas projets archivés : archiver un projet terminé libère une place, et vous gardez l'accès à tout ce que vous avez fait.", "Live projects, not archived ones: archiving a finished project frees a slot, and you keep access to everything you have done."))), /*#__PURE__*/React.createElement("div", {
    className: "tarif-regle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, Txt("tarifs.regle-titre", "Toutes les fonctionnalités, dans toutes les offres.", "Every feature, in every plan.")), " ", Txt("tarifs.regle-corps", "Dès le premier euro, et y compris dans l'offre gratuite. Aucune fonction n'est réservée à un palier supérieur : nous ne bornons que des quantités.", "From the first euro, including in the free plan. No feature is reserved for a higher tier: we cap quantities only.")))), /*#__PURE__*/React.createElement("div", {
    className: "conf-reponse",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-entete"
  }, /*#__PURE__*/React.createElement("span", {
    className: "conf-etiquette"
  }, Txt("tarifs.votre-offre", "Votre offre", "Your plan")), /*#__PURE__*/React.createElement("div", {
    className: "tarif-bascule",
    role: "group",
    "aria-label": Txt("tarifs.periodicite", "Périodicité", "Billing period")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tarif-bascule-btn".concat(annuel ? "" : " est-actif"),
    "aria-pressed": annuel ? "false" : "true",
    onClick: function onClick() {
      return setAnnuel(false);
    }
  }, Txt("tarifs.mensuel", "Mensuel", "Monthly")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tarif-bascule-btn".concat(annuel ? " est-actif" : ""),
    "aria-pressed": annuel ? "true" : "false",
    onClick: function onClick() {
      return setAnnuel(true);
    }
  }, Txt("tarifs.annuel", "Annuel", "Yearly"), /*#__PURE__*/React.createElement("span", {
    className: "tarif-remise"
  }, Txt("tarifs.remise-annuelle", "jusqu'à −18 %", "up to −18%"))))), /*#__PURE__*/React.createElement("h3", {
    className: "conf-nom"
  }, offre.nom), /*#__PURE__*/React.createElement("p", {
    className: "conf-resume"
  }, offre.resume), /*#__PURE__*/React.createElement("div", {
    className: "conf-prix",
    key: "".concat(offre.cle, "-").concat(cout.mois)
  }, gratuite ? /*#__PURE__*/React.createElement("span", {
    className: "conf-montant"
  }, Txt("tarifs.gratuit", "Gratuit", "Free")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "conf-montant"
  }, euros(cout.mois), " \u20AC"), /*#__PURE__*/React.createElement("span", {
    className: "conf-unite"
  }, unite))), !gratuite && (annuel || offre.degressive && personnes > 1) && /*#__PURE__*/React.createElement("p", {
    className: "conf-detail"
  }, annuel && L("factur\xE9 ".concat(euros(cout.periode), " \u20AC HT par an"), "billed \u20AC".concat(euros(cout.periode), " excl. VAT per year")), annuel && offre.degressive && personnes > 1 && " · ", offre.degressive && personnes > 1 && L("".concat(euros(grille.premiere), " \u20AC + ").concat(personnes - 1, " \xD7 ").concat(euros(grille.suivante), " \u20AC"), "\u20AC".concat(euros(grille.premiere), " + ").concat(personnes - 1, " \xD7 \u20AC").concat(euros(grille.suivante)))), /*#__PURE__*/React.createElement("ul", {
    className: "conf-quantites"
  }, offre.quantites.map(function (q, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    }), /*#__PURE__*/React.createElement("span", null, q));
  }), /*#__PURE__*/React.createElement("li", {
    className: "tarif-tout"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, Txt("tarifs.toutes-fonctionnalites", "Toutes les fonctionnalités", "Every feature")), /*#__PURE__*/React.createElement(ToutesFonctionnalites, null))), gratuite ? /*#__PURE__*/React.createElement("a", {
    href: SIGNUP,
    className: "btn btn-ghost tarif-cta"
  }, Txt("tarifs.commencer-gratuitement", "Commencer gratuitement", "Start for free")) : /*#__PURE__*/React.createElement("a", {
    href: SIGNUP,
    className: "btn btn-primary tarif-cta",
    onClick: abonner(offre, sieges),
    "aria-busy": paiement === "envoi" ? "true" : "false"
  }, paiement === "envoi" ? Txt("tarifs.ouverture", "Ouverture…", "Opening…") : Txt("tarifs.s-abonner", "S'abonner", "Subscribe")), sousDimensionnee && /*#__PURE__*/React.createElement("p", {
    className: "calc-note conf-alerte"
  }, L("Avec vos r\xE9ponses, l'offre ".concat(recommandee.nom, " conviendrait mieux."), "Given your answers, the ".concat(recommandee.nom, " plan would be a better fit."))), offre.cle === "decouverte" && !sousDimensionnee && /*#__PURE__*/React.createElement("p", {
    className: "calc-note"
  }, Txt("tarifs.calc-decouverte", "Un seul projet à la fois vous suffit : l'offre gratuite le couvre entièrement, sans limite de durée et sans carte bancaire.", "One project at a time is enough for you: the free plan covers it entirely, with no time limit and no payment card.")), /*#__PURE__*/React.createElement("div", {
    className: "conf-leo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-leo-ligne"
  }, /*#__PURE__*/React.createElement("span", {
    className: "calc-montant-gain"
  }, "\u2248 ", euros(valeurGagnee), " \u20AC"), /*#__PURE__*/React.createElement("span", {
    className: "conf-leo-texte"
  }, Txt("tarifs.leo-gagne", "de temps gagné par mois grâce à Léo", "of time saved each month thanks to Léo"), ratioTexte && /*#__PURE__*/React.createElement(React.Fragment, null, ", ", L("soit", "that is"), " ", /*#__PURE__*/React.createElement("b", null, ratioTexte, " \xD7 ", Txt("tarifs.votre-abonnement", "votre abonnement", "your subscription"))), ".", " ", /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "calc-ajuster",
    "aria-expanded": ajuste ? "true" : "false",
    onClick: function onClick() {
      return setAjuste(!ajuste);
    }
  }, ajuste ? Txt("tarifs.masquer", "Masquer", "Hide") : Txt("tarifs.ajuster", "Ajuster l'estimation", "Adjust the estimate")))), ajuste && /*#__PURE__*/React.createElement("div", {
    className: "conf-leo-reglages"
  }, /*#__PURE__*/React.createElement("p", {
    className: "calc-chapo"
  }, Txt("tarifs.temps-chapo", "Léo lit vos pièces écrites — CCTP, descriptifs, DPGF — et en sort les prescriptions, les matériaux, les prix et les intervenants.", "Léo reads your written documents — specifications, schedules of works, bills of quantities — and extracts requirements, materials, prices and parties.")), /*#__PURE__*/React.createElement("div", {
    className: "calc-champ"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "calc-docs"
  }, Txt("tarifs.temps-docs", "Documents confiés à Léo par mois", "Documents given to Léo each month"), /*#__PURE__*/React.createElement("b", null, docs)), /*#__PURE__*/React.createElement("input", {
    id: "calc-docs",
    type: "range",
    min: "1",
    max: "20",
    value: docs,
    style: {
      "--part": "".concat((docs - 1) / 19 * 100, "%")
    },
    onChange: function onChange(e) {
      return setDocs(Number(e.target.value));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-champ"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "calc-taux"
  }, Txt("tarifs.temps-taux", "Votre taux horaire", "Your hourly rate"), /*#__PURE__*/React.createElement("b", null, taux, " \u20AC")), /*#__PURE__*/React.createElement("input", {
    id: "calc-taux",
    type: "range",
    min: "50",
    max: "140",
    step: "5",
    value: taux,
    style: {
      "--part": "".concat((taux - 50) / 90 * 100, "%")
    },
    onChange: function onChange(e) {
      return setTaux(Number(e.target.value));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-champ"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "calc-heures"
  }, Txt("tarifs.temps-heures", "Temps de dépouillement par document", "Time spent going through one document"), /*#__PURE__*/React.createElement("b", null, heuresParDoc, " h")), /*#__PURE__*/React.createElement("input", {
    id: "calc-heures",
    type: "range",
    min: "0.25",
    max: "4",
    step: "0.25",
    value: heuresParDoc,
    style: {
      "--part": "".concat((heuresParDoc - 0.25) / 3.75 * 100, "%")
    },
    onChange: function onChange(e) {
      return setHeuresParDoc(Number(e.target.value));
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "calc-note"
  }, Txt("tarifs.temps-hypothese", "C'est une hypothèse, pas une mesure : nous n'avons pas relevé ce chiffre chez nos clients. Réglez-le sur ce que vous constatez.", "This is an assumption, not a measurement: we have not recorded this figure with our clients. Set it to what you observe."))), /*#__PURE__*/React.createElement("div", {
    className: "calc-operation"
  }, L("".concat(docs, " documents \xD7 ").concat(heuresParDoc, " h \xD7 ").concat(taux, " \u20AC = ").concat(euros(heuresGagnees), " h par mois"), "".concat(docs, " documents \xD7 ").concat(heuresParDoc, " h \xD7 \u20AC").concat(taux, " = ").concat(euros(heuresGagnees), " h per month"))), depasseLectures && /*#__PURE__*/React.createElement("p", {
    className: "calc-note"
  }, L("L'offre ".concat(offre.nom, " couvre ").concat(offre.lectures, " lectures par mois."), "The ".concat(offre.nom, " plan covers ").concat(offre.lectures, " readings per month."))))), /*#__PURE__*/React.createElement("div", {
    className: "calc-mentions"
  }, Txt("tarifs.mentions", "Montants HT · Estimation indicative", "Amounts excl. VAT · Indicative estimate")))), erreurPaiement && /*#__PURE__*/React.createElement("div", {
    className: "pricing-erreur",
    role: "alert"
  }, erreurPaiement, " ", /*#__PURE__*/React.createElement("a", {
    href: "".concat(typeof window !== "undefined" && window.location.pathname === "/" ? "" : "index.html", "#contact")
  }, Txt("tarifs.nous-ecrire", "Nous écrire", "Write to us"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "conf-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "conf-rail-titre"
  }, Txt("tarifs.rail-titre", "Les trois offres · cliquez pour comparer", "The three plans · click to compare")), /*#__PURE__*/React.createElement("div", {
    className: "conf-tuiles"
  }, OFFRES.map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o.cle,
      type: "button",
      className: "conf-tuile".concat(o.cle === offre.cle ? " est-active" : ""),
      "aria-pressed": o.cle === offre.cle ? "true" : "false",
      onClick: function onClick() {
        return setChoix(o.cle);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "conf-tuile-tete"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tarif-nom"
    }, o.nom), /*#__PURE__*/React.createElement("span", {
      className: "conf-tuile-prix"
    }, prixTuile(o), o.palier ? /*#__PURE__*/React.createElement("small", null, " / ", Txt("tarifs.mois", "mois", "month")) : null)), /*#__PURE__*/React.createElement("span", {
      className: "conf-tuile-court"
    }, o.court, o.degressive && L(" \xB7 puis ".concat(euros(grille.suivante), " \u20AC par personne").concat(annuel ? " et par an" : ""), " \xB7 then \u20AC".concat(euros(grille.suivante), " per person").concat(annuel ? " per year" : ""))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tarif-porte"
  }, /*#__PURE__*/React.createElement("a", {
    href: SIGNUP
  }, Txt("tarifs.porte", "Créer un compte gratuit", "Create a free account")))));
};

/* TRUST BAND — sécurité & données */
var TrustBand = function TrustBand() {
  var items = [{
    icon: "globe",
    t: Txt("securite.heberge-en-france", "Hébergé en France", "Hosted in France"),
    d: Txt("securite.vos-donnees-sont-stockees-en-france", "Vos données sont hébergées en France, chez un hébergeur certifié ISO 27001. Les sauvegardes chiffrées restent dans l'Union européenne.", "Your data is hosted in France with an ISO 27001-certified host. Encrypted backups stay within the European Union.")
  }, {
    icon: "lock",
    t: Txt("securite.chiffre-sauvegarde", "Chiffré, sauvegardé", "Encrypted, backed up"),
    d: Txt("securite.chiffrement-aes-256-au-repos-tls", "Chiffrement au repos et en transit. Sauvegardes automatiques, conservées dans l'Union européenne.", "Encrypted at rest and in transit. Automatic backups, kept within the European Union.")
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
    a: Txt("faq.un-projet-complet-sans-limite-de", "Un projet complet pour commencer : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.", "One complete project to get started: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You move to the Studio plan when you create your second project, and everything you've built stays in place.")
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
    a: Txt("faq.le-tarif-studio-inclut-1-collaborateur", "Les offres Découverte et Atelier couvrent une personne. L'offre Agence se facture 69 € HT par mois et par personne, jusqu'à quatre. Vos clients et vos co-traitants, eux, restent illimités et gratuits : ils ne comptent dans aucune offre.", "The Discovery and Studio plans cover one person. The Practice plan is billed at €69 excl. VAT per month per person, up to four. Your clients and consultants remain unlimited and free: they count towards no plan.")
  }, {
    q: Txt("faq.et-pendant-le-chantier", "Et pendant le chantier ?", "What about the construction phase?"),
    a: Txt("faq.alba-vous-suit-sur-site-comptes", "ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.", "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.")
  }, {
    q: Txt("faq.quels-formats-de-fichiers-puis-je", "Quels formats de fichiers puis-je partager ?", "What file formats can I share?"),
    a: Txt("faq.tous-pdf-dwg-ifc-images-videos", "Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 100 Mo par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.", "All of them — PDF, DWG, IFC, images, videos, up to 100 MB per file. PDF plans and images open right in the browser: your clients don't need any software.")
  }, {
    q: Txt("faq.ou-sont-hebergees-mes-donnees", "Où sont hébergées mes données ?", "Where is my data hosted?"),
    a: Txt("faq.en-france-chez-un-hebergeur-certifie", "En France, chez un hébergeur certifié ISO 27001 : base de données, fichiers et comptes. Chiffrement au repos et en transit. Les sauvegardes chiffrées sont conservées dans l'Union européenne.", "In France, with an ISO 27001-certified host: database, files and accounts. Encrypted at rest and in transit. Encrypted backups are kept within the European Union.")
  }, {
    q: Txt("faq.les-prix-affiches-sont-ils-hors", "Les prix affichés sont-ils hors taxes ?", "Are the prices shown excluding tax?"),
    a: Txt("faq.oui-tous-les-montants-de-cette", "Oui, tous les montants de cette page sont hors taxes. La TVA applicable est calculée au moment du paiement, selon votre pays et votre statut : 20 % pour une agence assujettie en France. Si vous disposez d'un numéro de TVA intracommunautaire, il vous sera demandé lors de la souscription. Votre facture est émise automatiquement après chaque prélèvement.", "Yes, every amount on this page is exclusive of tax. Applicable VAT is calculated at checkout, based on your country and status: 20% for a practice registered in France. If you have an EU VAT number, you will be asked for it during signup. Your invoice is issued automatically after each payment.")
  }, {
    q: Txt("faq.quel-est-le-delai-pour-demarrer", "Quel est le délai pour démarrer ?", "How long does it take to get started?"),
    a: Txt("faq.si-vous-voulez-vous-demarrez-aujourd", "Si vous voulez, vous démarrez aujourd'hui. La création de compte prend 3 minutes ; importer vos projets en cours prend en moyenne une demi-journée. On vous accompagne sur l'onboarding sans frais.", "You can start today. Account creation takes 3 minutes; importing your active projects takes half a day on average. We help with onboarding at no charge.")
  }];
  var _React$useState27 = React.useState(0),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    open = _React$useState28[0],
    setOpen = _React$useState28[1];
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
  var _React$useState29 = React.useState({
      name: "",
      agency: "",
      email: "",
      phone: "",
      projects: "1-3",
      msg: ""
    }),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    data = _React$useState30[0],
    setData = _React$useState30[1];
  var _React$useState31 = React.useState({}),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    errors = _React$useState32[0],
    setErrors = _React$useState32[1];
  var _React$useState33 = React.useState(false),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    submitted = _React$useState34[0],
    setSubmitted = _React$useState34[1];
  /* "repos" | "envoi" | "erreur" — le succès est porté par `submitted`, qui
     existait déjà et gouverne le bloc de confirmation du design. */
  var _React$useState35 = React.useState("repos"),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    envoi = _React$useState36[0],
    setEnvoi = _React$useState36[1];
  /* Champ-piège : invisible pour un visiteur, rempli par les robots qui
     remplissent tout. Il vit dans l'état comme les autres champs. */
  var _React$useState37 = React.useState(""),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    piege = _React$useState38[0],
    setPiege = _React$useState38[1];
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
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ev) {
      var reponse, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            ev.preventDefault();
            if (validate()) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            if (!(envoi === "envoi")) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            // double-clic
            setEnvoi("envoi");
            _context2.p = 3;
            _context2.n = 4;
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
            reponse = _context2.v;
            if (reponse.ok) {
              _context2.n = 5;
              break;
            }
            throw new Error("HTTP " + reponse.status);
          case 5:
            setEnvoi("repos");
            setSubmitted(true);
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            /* Ne JAMAIS afficher la confirmation quand l'envoi a échoué : c'est
               exactement le défaut qu'on corrige. Le visiteur doit pouvoir réessayer,
               et l'adresse e-mail lui est donnée comme porte de sortie. */
            console.error("[contact] envoi impossible", _t2);
            setEnvoi("erreur");
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[3, 6]]);
    }));
    return function submit(_x2) {
      return _ref5.apply(this, arguments);
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
  }, Txt("contact.ou-creez-directement-votre-compte-gratuit", "Ou créez directement votre compte →", "Or create your free account right away →"))), submitted && /*#__PURE__*/React.createElement("div", {
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
  }, Txt("contact.mention-collecte", "Vos coordonnées sont traitées par ANCA dans le seul but de vous rappeler pour cette démonstration, et conservées 12 mois. Vous pouvez y accéder, les corriger ou les supprimer en écrivant à support@alba-studio.co.", "Your details are processed by ANCA for the sole purpose of calling you back about this demo, and kept for 12 months. You can access, correct or delete them by writing to support@alba-studio.co."), " ", /*#__PURE__*/React.createElement("a", {
    href: lienInterne("/mentions-legales")
  }, Txt("contact.mention-collecte-lien", "Mentions légales", "Legal notice"))), /*#__PURE__*/React.createElement("button", {
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

/* Le pied de page est monté sur les TROIS pages, avec le même code. Ses ancres
   internes (#faq, #contact, #securite…) étaient donc mortes partout sauf sur
   l'accueil : sur /tarifs et sur les mentions légales, on cliquait « Sécurité »
   et il ne se passait rien, sans le moindre signal.
 *
 * Ce n'est pas un oubli qu'on répare une fois : le même piège reviendra au
 * prochain lien ajouté au pied de page. D'où cette fonction plutôt que trois
 * corrections — toute ancre du pied de page passe par elle.
 *
 * Sur l'accueil elle rend le fragment nu, ce qui préserve le défilement doux ;
 * ailleurs elle préfixe index.html, ce qui provoque une vraie navigation puis
 * un saut à l'ancre. C'est évalué au rendu, donc le HTML prérendu de chaque
 * page porte déjà la bonne forme. */
var versAccueil = function versAccueil(fragment) {
  if (typeof window === "undefined") return "index.html".concat(fragment);
  var chemin = window.location.pathname;
  /* L'accueil anglais est un accueil : depuis /en, une ancre du pied de page
     doit défiler dans la page, pas renvoyer vers l'accueil français. Sans ce
     cas, un anglophone qui clique « About » se retrouvait en français. */
  var surAccueilEn = chemin === "/en" || chemin === "/en.html";
  var surAccueil = chemin === "/" || /\/index\.html$/.test(chemin) || surAccueilEn;
  if (surAccueil) return fragment;
  /* Depuis une page anglaise qui n'est pas l'accueil, on renvoie vers
     l'accueil ANGLAIS. `__albaLien` connaît les jumelles ; il rend l'adresse
     française si la page n'en a pas, ce qui vaut mieux qu'un 404. */
  var accueil = typeof window !== "undefined" && window.__albaLien ? window.__albaLien("/") : "/";
  return "".concat(accueil === "/" ? "index.html" : accueil).concat(fragment);
};

/** Adresse d'une page interne, dans la langue courante. */
var lienInterne = function lienInterne(cheminFr) {
  return typeof window !== "undefined" && window.__albaLien ? window.__albaLien(cheminFr) : cheminFr;
};
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
    href: versAccueil("#fonctionnalites")
  }, Txt("pied.fonctionnalites", "Fonctionnalités", "Features"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#devices")
  }, Txt("pied.la-plateforme", "La plateforme", "The platform"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: lienInterne("/tarifs")
  }, Txt("pied.tarifs", "Tarifs", "Pricing"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#faq")
  }, "FAQ")))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.agence", "Agence", "Company")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/valeur-probante"
  }, Txt("pied.valeur-probante", "Valeur probante", "Evidential value"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/co-traitants"
  }, Txt("pied.co-traitants", "Co-traitants & BET", "Consultants & engineers"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#fondateur")
  }, Txt("pied.a-propos", "À propos", "About"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#manifeste")
  }, Txt("pied.manifeste", "Manifeste", "Manifesto"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#contact")
  }, "Contact")))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h5", null, Txt("pied.legal", "Légal", "Legal")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/mentions-legales"
  }, Txt("pied.mentions-legales", "Mentions légales", "Legal notice"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "".concat(APP_ORIGIN, "/terms")
  }, Txt("pied.cgu-cgv", "CGU & CGV", "Terms & conditions"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "".concat(APP_ORIGIN, "/privacy-policy")
  }, Txt("pied.politique-rgpd", "Politique RGPD", "GDPR policy"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: versAccueil("#securite")
  }, Txt("pied.securite", "Sécurité", "Security"))), /*#__PURE__*/React.createElement(LienConsentement, null)))), /*#__PURE__*/React.createElement("div", {
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
