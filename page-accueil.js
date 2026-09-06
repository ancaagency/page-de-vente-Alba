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
  "theme": "light",
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
  }, /*#__PURE__*/React.createElement(MessageEssai, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Logos, null), /*#__PURE__*/React.createElement(Manifesto, null), /*#__PURE__*/React.createElement(Audience, {
    variant: tweaks.audienceVariant
  }), /*#__PURE__*/React.createElement(FeatureCarousel, null), /*#__PURE__*/React.createElement(PinnedDevices, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(TrustBand, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Founder, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null)), /*#__PURE__*/React.createElement(BandeauConsentement, null), /*#__PURE__*/React.createElement(Notifications, {
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
    /* Le titre est réécrit ici à chaque changement de langue. Il DOIT rester
       identique à celui du <title> d'index.html : sinon le titre correct tient
       jusqu'au premier clic sur FR/EN puis se dégrade, sans que rien ne le
       signale — le HTML servi aux robots, lui, resterait juste.
       tests/smoke.mjs compare les deux. */
    document.title = lang === "en" ? "The Platform for Demanding Architects - Alba Studio" : "La Plateforme des architectes exigeants - Alba Studio";
  };
  /* Le câblage de la bascule FR/EN vit dans i18n.js, chargé par TOUTES les
     pages. Il était ici, et sur les tarifs : les trois pages éditoriales
     n'avaient donc aucun moyen de changer de langue. */
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

/* ============================================================================
   ARRIVER SUR UNE ANCRE, ET Y RESTER
   ============================================================================
   Le clic sur une ancre de la même page était traité (immersive.jsx, via
   Lenis). L'ARRIVÉE sur une ancre ne l'était pas — et c'est le cas qui compte
   pour le pied de page, puisque « À propos », « Manifeste » et « Contact »
   pointent vers `index.html#…` dès qu'on les clique depuis /tarifs, les
   mentions légales ou l'une des deux pages de fond.

   Ce qui se passait, mesuré : arrivée sur index.html#fondateur, on atterrissait
   à 2 293 px alors que la section est à 15 671 px. Treize mille pixels d'écart.
   Pour le visiteur, le lien « ne fait rien » : la page s'ouvre quelque part au
   milieu, sans rapport avec le libellé cliqué.

   La cause n'est pas l'ancre, elle est le CALENDRIER. Le navigateur saute au
   fragment dès l'analyse du HTML, sur le document prérendu. Ensuite React monte
   les sections, les images se chargent, GSAP épingle six blocs : la page passe
   de quelques milliers de pixels à plus de vingt mille, et la cible part sous
   nos pieds. Personne ne revenait la chercher.

   On la reprend donc, tant qu'elle bouge : on recalcule la position visée, on
   s'y remet, et on s'arrête dès qu'elle est stable — ou dès que le visiteur
   touche quoi que ce soit, parce que se battre avec le doigt de quelqu'un est
   pire que de mal atterrir.

   Le décalage de 70 px est celui du gestionnaire de clic : la barre est en
   position fixe, sans réserve elle recouvre le titre visé.
   ============================================================================ */
(function () {
  var DECALAGE = 70; // même valeur que le gestionnaire de clic
  var PATIENCE = 6000; // au-delà, la page ne se stabilisera plus
  var STABLE = 700; // durée sans mouvement au bout de laquelle on lâche
  var PAS = 120;
  var cible = function cible() {
    var h = window.location.hash;
    if (!h || h.length < 2) return null;
    try {
      return document.querySelector(h);
    } catch (e) {
      return null;
    }
  };
  if (!cible()) return;
  var abandonne = false;
  /* Le saut natif du navigateur n'est pas un geste. On n'écoute donc pas
     `scroll` — qui se déclencherait sur notre propre correction — mais
     seulement ce qui vient d'une main. */
  for (var _i2 = 0, _arr2 = ["wheel", "touchstart", "pointerdown", "keydown"]; _i2 < _arr2.length; _i2++) {
    var ev = _arr2[_i2];
    window.addEventListener(ev, function () {
      abandonne = true;
    }, {
      passive: true,
      once: true
    });
  }
  var viser = function viser() {
    var el = cible();
    if (!el) return null;
    var y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - DECALAGE);
    if (Math.abs(y - window.scrollY) >= 2) {
      /* Lenis tient sa propre position et la réimpose à chaque image : un
         window.scrollTo seul serait effacé à la frame suivante. */
      if (window.__lenis) window.__lenis.scrollTo(y, {
        immediate: true,
        force: true
      });else window.scrollTo(0, y);
    }
    return y;
  };
  var debut = Date.now();
  var derniere = -1;
  var immobile = 0;
  var _boucle = function boucle() {
    if (abandonne) return;
    var y = viser();
    if (y === null) return;
    if (Math.abs(y - derniere) < 2) immobile += PAS;else {
      immobile = 0;
      derniere = y;
    }
    if (immobile >= STABLE || Date.now() - debut > PATIENCE) return;
    setTimeout(_boucle, PAS);
  };
  _boucle();
})();
