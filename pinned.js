/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : pinned.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez pinned.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Pinned scroll section — Mobile / Bureau / Terrain
   Desktop: sticky scroll-pinning. Mobile (≤900px): simple stacked blocks. */

var PinnedDevices = function PinnedDevices() {
  var sectionRef = React.useRef(null);
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    active = _React$useState2[0],
    setActive = _React$useState2[1];
  var activeRef = React.useRef(0);
  var navRef = React.useRef(null);
  var _React$useState3 = React.useState(function () {
      return window.matchMedia("(max-width: 900px)").matches;
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 1),
    mobile = _React$useState4[0];
  React.useEffect(function () {
    if (mobile) return;
    var raf = 0;
    var onScroll = function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var el = sectionRef.current;
        if (!el) return;
        var rect = el.getBoundingClientRect();
        var total = el.offsetHeight - window.innerHeight;
        var p = -rect.top / total;
        p = Math.max(0, Math.min(1, p));
        var idx = Math.min(1, Math.floor(p * 2));
        // setState ONLY when the pane changes, progress bar is driven via direct DOM writes
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
        var local = Math.max(0, Math.min(1, (p - idx / 2) * 2));
        var nav = navRef.current;
        if (nav) {
          nav.querySelectorAll(".pinned-nav-progress").forEach(function (bar, i) {
            bar.style.width = i === idx ? "".concat(local * 100, "%") : "0%";
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return function () {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mobile]);
  var goTo = function goTo(i) {
    var el = sectionRef.current;
    if (!el) return;
    var total = el.offsetHeight - window.innerHeight;
    var target = el.offsetTop + i / 2 * total + 4;
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };
  var panes = [{
    eyebrow: L("01 — Bureau", "01 — Office"),
    h: L("Au bureau", "At the office"),
    lead: L("Vous orchestrez votre semaine d'un seul écran.", "You orchestrate your week from a single screen."),
    p: L("Vue agence, pilotage multi-projets, gestion des co-traitants, exports comptables. ALBA s'installe entre votre table à dessin et votre boîte mail, et remplace les deux quand il s'agit de coordonner.", "Practice view, multi-project steering, consultant management, accounting exports. ALBA sits between your drawing board and your inbox, and replaces both when it comes to coordination.")
  }, {
    eyebrow: L("02 — Terrain & mobile", "02 — On site & mobile"),
    h: L("Sur le terrain", "On site"),
    lead: L("Sur tablette au chantier, sur mobile dans la poche de vos clients.", "On tablet at the site, on mobile in your clients' pocket."),
    p: L("Annotation des plans depuis la tablette, photos géolocalisées, PV générés automatiquement. Et côté maître d'ouvrage : notifications quand une décision l'attend, validation en un geste depuis son téléphone. L'application ALBA est disponible sur iOS et Android, et fonctionne aussi dans le navigateur.", "Annotate drawings from the tablet, geolocated photos, auto-generated site reports. And for your client: notifications when a decision awaits, one-tap approval from their phone. The ALBA app is available on iOS and Android, and also runs in the browser."),
    apps: true
  }];
  var visuals = [
  /*#__PURE__*/
  /* BUREAU — capture réelle */
  React.createElement("div", {
    className: "dev-shot laptop-shot",
    key: "ordinateur"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/ordinateur-crop.png",
    alt: L("ALBA Studio sur ordinateur — budget de projet", "ALBA Studio on desktop — project budget"),
    loading: "lazy"
  })),
  /*#__PURE__*/
  /* TERRAIN — tablette + mobile, captures réelles */
  React.createElement("div", {
    className: "dev-duo",
    key: "terrain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dev-shot tablet-shot"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/tablette-crop.png",
    alt: L("ALBA Studio sur tablette — maîtres d'ouvrage & intervenants", "ALBA Studio on tablet — clients & partners"),
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dev-shot phone-shot"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/mobile-crop.png",
    alt: L("ALBA Studio sur mobile — projet Grange Lissieu", "ALBA Studio on mobile — Grange Lissieu project"),
    loading: "lazy"
  })))];

  /* ---------- Mobile: simple stacked blocks, no pinning ---------- */
  if (mobile) {
    return /*#__PURE__*/React.createElement("section", {
      className: "pinned-section is-mobile",
      id: "devices"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pm-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, L("— Partout où vous travaillez —", "— Everywhere you work —"))), panes.map(function (pane, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "pm-block",
        "data-tone": i
      }, /*#__PURE__*/React.createElement("div", {
        className: "pinned-pane-text is-active pm-text"
      }, /*#__PURE__*/React.createElement("span", {
        className: "pinned-eyebrow"
      }, pane.eyebrow), /*#__PURE__*/React.createElement("h2", null, pane.h), /*#__PURE__*/React.createElement("p", {
        className: "lead"
      }, /*#__PURE__*/React.createElement("b", null, pane.lead)), /*#__PURE__*/React.createElement("p", null, pane.p), pane.apps && /*#__PURE__*/React.createElement(StoreBadges, {
        theme: "light"
      })), /*#__PURE__*/React.createElement("div", {
        className: "pm-visual"
      }, visuals[i]));
    }));
  }

  /* ---------- Desktop: sticky pinned scroll ---------- */
  return /*#__PURE__*/React.createElement("section", {
    ref: sectionRef,
    className: "pinned-section",
    id: "devices"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pinned-stage",
    "data-active": active
  }, /*#__PURE__*/React.createElement("div", {
    className: "pinned-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pinned-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pinned-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("— Partout où vous travaillez —", "— Everywhere you work —"))), /*#__PURE__*/React.createElement("div", {
    className: "pinned-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pinned-text"
  }, panes.map(function (pane, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pinned-pane-text ".concat(active === i ? "is-active" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "pinned-eyebrow"
    }, pane.eyebrow), /*#__PURE__*/React.createElement("h2", null, pane.h), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, /*#__PURE__*/React.createElement("b", null, pane.lead)), /*#__PURE__*/React.createElement("p", null, pane.p), pane.apps && /*#__PURE__*/React.createElement(StoreBadges, {
      theme: "light"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pinned-visual"
  }, visuals.map(function (v, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pinned-pane-visual ".concat(active === i ? "is-active" : "")
    }, v);
  }))), /*#__PURE__*/React.createElement("button", {
    className: "pinned-arrow left",
    onClick: function onClick() {
      return goTo(Math.max(0, active - 1));
    },
    disabled: active === 0,
    "aria-label": "Pr\xE9c\xE9dent"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 18,
    style: {
      transform: "scaleX(-1)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "pinned-arrow right",
    onClick: function onClick() {
      return goTo(Math.min(1, active + 1));
    },
    disabled: active === 1,
    "aria-label": "Suivant"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "pinned-nav",
    ref: navRef
  }, [L("Au bureau", "At the office"), L("Sur le terrain", "On site")].map(function (label, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "pinned-nav-item ".concat(active === i ? "is-active" : ""),
      onClick: function onClick() {
        return goTo(i);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pinned-nav-progress"
    }), label);
  }))));
};
window.PinnedDevices = PinnedDevices;
