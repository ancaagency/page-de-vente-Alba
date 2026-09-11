/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : page-404.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez page-404.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* ============================================================================
   PAGE 404 — le seul écran du site qu'on atteint sans l'avoir voulu
   ============================================================================
   POURQUOI ELLE EXISTE

   Il n'y en avait pas. Cloudflare Pages servait la sienne : une page blanche,
   sans marque, sans navigation, sans le moindre chemin de retour. Or on
   n'atterrit pas sur un 404 par curiosité — on y arrive par une adresse
   recopiée de travers, un vieux lien partagé, une capture d'écran. Autrement
   dit : par un visiteur qui voulait déjà venir.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI ELLE EST EN REACT, ET PAS EN HTML STATIQUE COMME LES ÉDITOS

   Les trois pages éditoriales ont une jumelle anglaise à une autre adresse.
   Un 404 ne peut pas : Cloudflare ne sert qu'UN fichier 404.html, pour toutes
   les adresses inconnues, dans les deux langues. Le texte doit donc pouvoir
   basculer SUR PLACE — c'est exactement ce que font Txt() et __setLang.

   La langue est celle que i18n.js a déduite : /en-quelquechose donne l'anglais,
   sinon c'est le choix mémorisé du visiteur. Un anglophone qui se trompe
   d'adresse ne tombe donc pas sur du français.

   ⚠️ AUCUN PRIX SUR CETTE PAGE. tests/montants.mjs l'interdit partout sauf sur
   la page de tarifs, et un 404 n'a rien à vendre : il a un chemin à rendre.
   ============================================================================ */
var Page404 = function Page404() {
  var _React$useState = React.useState(window.__albaLang || "fr"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    lang = _React$useState2[0],
    setLang = _React$useState2[1];
  window.__albaLang = lang;
  /* C'est CETTE ligne qui permet à la bascule FR/EN de traduire sur place.
     i18n.js cherche une jumelle à rejoindre ; la page d'erreur n'en a pas, et
     retombe alors sur __setLang. Sans elle, le bouton EN ne fait rien. */
  window.__setLang = setLang;
  React.useEffect(function () {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Page not found — ALBA Studio" : "Page introuvable — ALBA Studio";
    document.querySelectorAll("#lang-toggle button").forEach(function (b) {
      return b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    /* ── LA BARRE DE NAVIGATION AUSSI ───────────────────────────────────────
       Elle est en HTML statique. Sur les autres pages, outils/anglais.mjs la
       traduit AU MOMENT D'ENGENDRER la jumelle anglaise ; cette page-ci n'a pas
       de jumelle, donc personne ne la traduisait : le corps passait en anglais
       et le menu restait « Fonctionnalités · Pour qui ? · Notre vision ».
       Les libellés sont ceux de LIBELLES_NAV dans outils/anglais.mjs — s'ils
       changent là-bas, ils doivent changer ici. */
    var NAV = {
      "Fonctionnalités": "Features",
      "Pour qui ?": "Who it is for",
      "Notre vision": "Our vision",
      "Tarif": "Pricing",
      "Se connecter": "Log in",
      "Essayer gratuitement": "Try for free"
    };
    var versFr = Object.fromEntries(Object.entries(NAV).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        f = _ref2[0],
        e = _ref2[1];
      return [e, f];
    }));
    document.querySelectorAll("#nav a").forEach(function (a) {
      var t = a.textContent.trim();
      var vise = lang === "en" ? NAV[t] : versFr[t];
      if (vise) a.textContent = vise;
    });
  }, [lang]);

  /* Les quatre destinations qui couvrent la quasi-totalité des raisons d'être
     venu. Elles passent par __albaLien : un anglophone reste en anglais. */
  var lien = function lien(chemin) {
    return window.__albaLien ? window.__albaLien(chemin) : chemin;
  };
  var PISTES = [{
    href: lien("/"),
    titre: Txt("p404.accueil", "L'accueil", "Home"),
    quoi: Txt("p404.accueil-quoi", "Ce que fait ALBA, en une page.", "What ALBA does, on one page.")
  }, {
    href: lien("/tarifs"),
    titre: Txt("p404.tarifs", "Les tarifs", "Pricing"),
    quoi: Txt("p404.tarifs-quoi", "Deux questions, et votre prix.", "Two questions, and your price.")
  }, {
    href: lien("/co-traitants"),
    titre: Txt("p404.invites", "Vous avez été invité ?", "Been invited?"),
    quoi: Txt("p404.invites-quoi", "Ce que vous pouvez faire, et ce que ça coûte.", "What you can do, and what it costs.")
  }, {
    href: "".concat(lien("/"), "#contact"),
    titre: Txt("p404.contact", "Nous écrire", "Write to us"),
    quoi: Txt("p404.contact-quoi", "Si vous cherchiez autre chose, dites-le-nous.", "If you were after something else, tell us.")
  }];
  return /*#__PURE__*/React.createElement("div", {
    key: lang
  }, /*#__PURE__*/React.createElement("main", {
    className: "e404"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container e404-corps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "e404-code",
    "aria-hidden": "true"
  }, "404"), /*#__PURE__*/React.createElement("h1", {
    className: "display e404-titre"
  }, Txt("p404.titre-1", "Cette page", "This page"), " ", /*#__PURE__*/React.createElement("em", null, Txt("p404.titre-2", "n'existe pas.", "does not exist."))), /*#__PURE__*/React.createElement("p", {
    className: "e404-chapo"
  }, Txt("p404.chapo", "L'adresse est peut-être mal recopiée, ou la page a changé de nom depuis que vous avez gardé le lien. Rien n'est perdu : voici par où reprendre.", "The address may have been mistyped, or the page may have been renamed since you saved the link. Nothing is lost: here is where to pick up.")), /*#__PURE__*/React.createElement("div", {
    className: "e404-pistes"
  }, PISTES.map(function (p, i) {
    return /*#__PURE__*/React.createElement("a", {
      key: i,
      href: p.href,
      className: "e404-piste"
    }, /*#__PURE__*/React.createElement("span", {
      className: "e404-piste-texte"
    }, /*#__PURE__*/React.createElement("span", {
      className: "e404-piste-titre"
    }, p.titre), /*#__PURE__*/React.createElement("span", {
      className: "e404-piste-quoi"
    }, p.quoi)), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }));
  })))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(BandeauConsentement, null));
};
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(Page404, null));
