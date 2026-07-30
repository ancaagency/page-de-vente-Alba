/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : notifications.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez notifications.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* App-style notifications, welcome toast + contextual scroll toasts */

var Notifications = function Notifications(_ref) {
  var lang = _ref.lang;
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    toasts = _React$useState2[0],
    setToasts = _React$useState2[1];
  var idRef = React.useRef(0);
  var shownRef = React.useRef({});
  var dismiss = function dismiss(id) {
    setToasts(function (t) {
      return t.map(function (x) {
        return x.id === id ? _objectSpread(_objectSpread({}, x), {}, {
          leaving: true
        }) : x;
      });
    });
    setTimeout(function () {
      return setToasts(function (t) {
        return t.filter(function (x) {
          return x.id !== id;
        });
      });
    }, 450);
  };
  var notify = React.useCallback(function (key, title, body) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (shownRef.current[key]) return;
    shownRef.current[key] = true;
    var id = ++idRef.current;
    setToasts(function (t) {
      return [].concat(_toConsumableArray(t.slice(-2)), [_objectSpread({
        id: id,
        title: title,
        body: body
      }, opts)]);
    });
    setTimeout(function () {
      return dismiss(id);
    }, opts.duration || 6500);
  }, []);
  React.useEffect(function () {
    // Welcome toast shortly after arrival (after the intro curtain)
    var t = setTimeout(function () {
      notify("welcome", L("Bienvenue à bord", "Welcome on board"), L("Découvrez comment ALBA pilote vos projets, laissez-vous guider.", "See how ALBA runs your projects, scroll to take the tour."));
    }, 3800);
    return function () {
      return clearTimeout(t);
    };
  }, [notify]);
  React.useEffect(function () {
    // Contextual toasts on scroll
    var targets = [{
      sel: "#messagerie",
      key: "msg",
      title: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"),
      body: L("Nouveau message, « Alors c'est décidé, on part sur la n°2 ! »", "New message — \"It's settled, we're going with option 2!\"")
    }, {
      sel: "#pricing",
      key: "trial",
      title: L("Votre premier projet est offert", "Your first project is free"),
      body: L("Gérez un projet complet gratuitement, sans carte bleue. Activez-le quand vous voulez.", "Run one full project free, no credit card. Activate it whenever you like.")
    }];
    var observers = [];
    targets.forEach(function (tg) {
      var el = document.querySelector(tg.sel);
      if (!el) return;
      var io = new IntersectionObserver(function (entries) {
        return entries.forEach(function (e) {
          if (e.isIntersecting) {
            setTimeout(function () {
              return notify(tg.key, tg.title, tg.body);
            }, 900);
            io.unobserve(el);
          }
        });
      }, {
        threshold: 0.4
      });
      io.observe(el);
      observers.push(io);
    });
    return function () {
      return observers.forEach(function (io) {
        return io.disconnect();
      });
    };
  }, [notify, lang]);
  return /*#__PURE__*/React.createElement("div", {
    className: "notif-stack",
    "aria-live": "polite"
  }, toasts.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "notif ".concat(t.leaving ? "leaving" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "notif-icon"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/logo-alba.png",
      alt: ""
    })), /*#__PURE__*/React.createElement("div", {
      className: "notif-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "notif-app"
    }, "ALBA STUDIO ", /*#__PURE__*/React.createElement("span", null, "\xB7 ", L("maintenant", "now"))), /*#__PURE__*/React.createElement("div", {
      className: "notif-title"
    }, t.title), /*#__PURE__*/React.createElement("div", {
      className: "notif-body"
    }, t.body)), /*#__PURE__*/React.createElement("button", {
      className: "notif-close",
      onClick: function onClick() {
        return dismiss(t.id);
      },
      "aria-label": L("Fermer", "Close")
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 12
    })));
  }));
};
window.Notifications = Notifications;
