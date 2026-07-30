/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : features-carousel.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez features-carousel.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Carrousel Fonctionnalités — regroupe Bibliothèque, Calendrier, Messagerie */

var FeatureCarousel = function FeatureCarousel() {
  var slides = [{
    key: "assistant",
    num: "01",
    label: Txt("carrousel.assistant-leo", "Assistant Léo", "Léo assistant"),
    Comp: window.AssistantDemo,
    novel: true
  }, {
    key: "meteo",
    num: "02",
    label: Txt("carrousel.meteo-chantier", "Météo chantier", "Site weather"),
    Comp: window.WeatherDemo,
    novel: true
  }, {
    key: "materiaux",
    num: "03",
    label: Txt("carrousel.bibliotheque-materiaux", "Bibliothèque matériaux", "Material library"),
    Comp: window.Materials
  }, {
    key: "calendrier",
    num: "04",
    label: Txt("carrousel.calendrier", "Calendrier", "Calendar"),
    Comp: window.CalendarDemo
  }, {
    key: "messagerie",
    num: "05",
    label: Txt("carrousel.messagerie", "Messagerie", "Messaging"),
    Comp: window.Chat
  }];
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idx = _React$useState2[0],
    setIdx = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    h = _React$useState4[0],
    setH = _React$useState4[1];
  var slideRefs = React.useRef([]);
  var touch = React.useRef(null);
  var go = function go(i) {
    return setIdx(Math.max(0, Math.min(slides.length - 1, i)));
  };
  React.useEffect(function () {
    var measure = function measure() {
      var el = slideRefs.current[idx];
      if (el) setH(el.scrollHeight);
    };
    measure();
    var t = setTimeout(measure, 400);
    var el = slideRefs.current[idx];
    var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", measure);
    return function () {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
    };
  }, [idx]);
  return /*#__PURE__*/React.createElement("section", {
    className: "feat-carousel",
    id: "fonctionnalites"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-tabs"
  }, slides.map(function (s, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      className: "fc-tab ".concat(idx === i ? "is-active" : ""),
      onClick: function onClick() {
        return go(i);
      }
    }, /*#__PURE__*/React.createElement("em", null, s.num), " ", s.label, s.novel && /*#__PURE__*/React.createElement("span", {
      className: "fc-novel"
    }, Txt("carrousel.inedit", "INÉDIT", "UNIQUE")));
  })), /*#__PURE__*/React.createElement("div", {
    className: "fc-arrows"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fc-count"
  }, slides[idx].num, " / ", String(slides.length).padStart(2, "0")), /*#__PURE__*/React.createElement("button", {
    className: "fc-arrow",
    disabled: idx === 0,
    onClick: function onClick() {
      return go(idx - 1);
    },
    "aria-label": Txt("carrousel.precedent", "Précédent", "Previous")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    style: {
      transform: "rotate(180deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "fc-arrow",
    disabled: idx === slides.length - 1,
    onClick: function onClick() {
      return go(idx + 1);
    },
    "aria-label": Txt("carrousel.suivant", "Suivant", "Next")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "fc-viewport",
    style: h ? {
      height: h
    } : null,
    onTouchStart: function onTouchStart(e) {
      touch.current = e.touches[0].clientX;
    },
    onTouchEnd: function onTouchEnd(e) {
      if (touch.current == null) return;
      var dx = e.changedTouches[0].clientX - touch.current;
      if (dx < -50) go(idx + 1);
      if (dx > 50) go(idx - 1);
      touch.current = null;
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-track",
    style: {
      transform: "translateX(-".concat(idx * 100, "%)")
    }
  }, slides.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.key,
      ref: function ref(el) {
        slideRefs.current[i] = el;
      },
      className: "fc-slide fc-".concat(s.key, " ").concat(idx === i ? "is-active" : ""),
      "aria-hidden": idx !== i
    }, /*#__PURE__*/React.createElement(s.Comp, null));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fc-dots"
  }, slides.map(function (s, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      className: idx === i ? "is-active" : "",
      onClick: function onClick() {
        return go(i);
      },
      "aria-label": s.label
    });
  })));
};
window.FeatureCarousel = FeatureCarousel;
