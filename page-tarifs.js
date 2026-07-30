/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : page-tarifs.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez page-tarifs.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Script de page : montage de la page tarifs.
   Sorti de Tarifs.html pour la même raison que page-accueil.jsx. */

var PricingPage = function PricingPage() {
  var _React$useState = React.useState(window.__albaLang || "fr"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    lang = _React$useState2[0],
    setLang = _React$useState2[1];
  window.__albaLang = lang;
  window.__setLang = setLang;
  React.useEffect(function () {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Pricing — ALBA Studio" : "Tarif — ALBA Studio";
    document.querySelectorAll("#lang-toggle button").forEach(function (b) {
      return b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    var cta = document.getElementById("nav-cta");
    if (cta) cta.textContent = lang === "en" ? "Try for free" : "Essayer gratuitement";
    var connexion = document.getElementById("nav-login");
    if (connexion) connexion.textContent = lang === "en" ? "Log in" : "Se connecter";
  }, [lang]);
  return /*#__PURE__*/React.createElement("div", {
    key: lang,
    style: {
      paddingTop: 72
    }
  }, /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(TrustBand, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null));
};
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(PricingPage, null));
document.querySelectorAll("#lang-toggle button").forEach(function (b) {
  b.addEventListener("click", function () {
    if (window.__setLang) window.__setLang(b.dataset.lang);
  });
});
