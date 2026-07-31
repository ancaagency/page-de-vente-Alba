/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : page-accueil.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez page-accueil.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Script de page : montage de l'accueil.
   Ce bloc vivait en ligne dans index.html. Il en a été sorti pour qu'aucun
   script en ligne ne subsiste, ce qui permet de retirer 'unsafe-inline' de la
   politique de sécurité du contenu. */

var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "studio",
  "density": "standard",
  "theme": "dark",
  "typoHero": "serif",
  "audienceVariant": "A"
} /*EDITMODE-END*/;
var App = function App() {
  // Combinaison de design VALIDÉE, figée.
  //
  // Cette ligne appelait `useTweaks(TWEAK_DEFAULTS)`, défini dans
  // tweaks-panel.jsx — un panneau de réglage d'auteur qui ne figurait pas dans
  // le paquet de passation. Sans lui, App levait « useTweaks is not defined » :
  // React ne montait rien et la page restait bloquée sur le rideau d'intro,
  // logo affiché. Le panneau n'ayant de toute façon rien à faire devant des
  // visiteurs, les réglages sont désormais constants.
  var tweaks = TWEAK_DEFAULTS;
  var _React$useState = React.useState(window.__albaLang || "fr"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    lang = _React$useState2[0],
    setLang = _React$useState2[1];

  // Make L() read the current language during this render
  window.__albaLang = lang;
  window.__setLang = setLang;
  React.useEffect(function () {
    try {
      localStorage.setItem("alba_lang", lang);
    } catch (e) {}
    document.documentElement.lang = lang;
    if (window.__applyNavLang) window.__applyNavLang(lang);
  }, [lang]);

  // Apply tweaks to body
  React.useEffect(function () {
    document.body.dataset.palette = tweaks.palette;
    document.body.dataset.density = tweaks.density;
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.typo = tweaks.typoHero;
  }, [tweaks]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    key: lang
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Logos, null), /*#__PURE__*/React.createElement(Manifesto, null), /*#__PURE__*/React.createElement(Audience, {
    variant: tweaks.audienceVariant
  }), /*#__PURE__*/React.createElement(FeatureCarousel, null), /*#__PURE__*/React.createElement(PinnedDevices, null), /*#__PURE__*/React.createElement(CTABand, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(TrustBand, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Founder, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null)), /*#__PURE__*/React.createElement(Notifications, {
    lang: lang
  }), /*#__PURE__*/React.createElement(ImmersiveFX, {
    signal: "".concat(tweaks.audienceVariant, "-").concat(tweaks.density, "-").concat(tweaks.theme, "-").concat(tweaks.typoHero, "-").concat(lang)
  }));
};
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(App, null));

/* ============================================
   Custom cursor logic
   ============================================ */
(function () {
  var dot = document.getElementById("cur-dot");
  var ring = document.getElementById("cur-ring");
  if (!dot || !ring) return;
  var mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = "translate(".concat(mx, "px, ").concat(my, "px) translate(-50%,-50%)");
  });
  var _tick = function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = "translate(".concat(rx, "px, ").concat(ry, "px) translate(-50%,-50%)");
    requestAnimationFrame(_tick);
  };
  _tick();
  document.addEventListener("mouseover", function (e) {
    var t = e.target;
    if (t.closest("a, button, .pain, .benefit, .testi, .f-tab, .q, .logo-cell, .gtile, .aud-A-card, .aud-B-row, .aud-C-card, .mq-item, .mat-card, .mat-chip")) {
      ring.classList.add("hover");
      dot.classList.add("hover");
    }
  });
  document.addEventListener("mouseout", function (e) {
    var t = e.relatedTarget;
    if (!t || !t.closest || !t.closest("a, button, .pain, .benefit, .testi, .f-tab, .q, .logo-cell, .gtile, .aud-A-card, .aud-B-row, .aud-C-card, .mq-item, .mat-card, .mat-chip")) {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
    }
  });
})();

/* Nav scroll state */
(function () {
  var nav = document.getElementById("nav");
  if (!nav) return;
  var onScroll = function onScroll() {
    if (window.scrollY > 30) nav.classList.add("scrolled");else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, {
    passive: true
  });
  onScroll();
})();

/* Brand logo, full page reset (replays the intro curtain) */
(function () {
  var brand = document.getElementById("brand-home");
  if (!brand) return;
  brand.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // bypass the Lenis anchor handler
    try {
      sessionStorage.removeItem("alba_intro_seen");
    } catch (err) {}
    window.scrollTo(0, 0);
    location.reload();
  }, true);
})();

/* Nav language toggle */
(function () {
  var NAV_TEXTS = {
    fr: {
      links: ["Fonctionnalités", "La plateforme", "Pour qui ?", "Notre vision", "Tarif tout inclus", "Questions"],
      cta: "Essayer gratuitement",
      connexion: "Se connecter"
    },
    en: {
      links: ["Features", "The platform", "Who it is for", "Our vision", "All-in pricing", "Questions"],
      cta: "Try for free",
      connexion: "Log in"
    }
  };
  window.__applyNavLang = function (lang) {
    var t = NAV_TEXTS[lang] || NAV_TEXTS.fr;
    document.querySelectorAll("#nav-links a").forEach(function (a, i) {
      if (t.links[i]) a.textContent = t.links[i];
    });
    document.querySelectorAll("#mobile-menu-links a").forEach(function (a, i) {
      if (t.links[i]) a.textContent = t.links[i];
    });
    var cta = document.getElementById("nav-cta");
    if (cta) cta.textContent = t.cta;
    var mcta = document.getElementById("mobile-menu-cta");
    if (mcta) mcta.textContent = t.cta;
    for (var _i = 0, _arr = ["nav-login", "mobile-menu-login"]; _i < _arr.length; _i++) {
      var id = _arr[_i];
      var el = document.getElementById(id);
      if (el) el.textContent = t.connexion;
    }
    document.querySelectorAll("#lang-toggle button").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    document.title = lang === "en" ? "ALBA Studio — The platform for architects" : "ALBA Studio — La plateforme des architectes";
  };
  document.querySelectorAll("#lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (window.__setLang) window.__setLang(b.dataset.lang);
    });
  });
  window.__applyNavLang(window.__albaLang || "fr");
})();

/* Mobile burger menu */
(function () {
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("mobile-menu");
  if (!burger || !menu) return;
  var close = function close() {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", function () {
    var open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });
})();
