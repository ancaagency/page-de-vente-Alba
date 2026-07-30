/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : chat.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez chat.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* Chat section, animated live conversation between architecte & MO */

var getChatScript = function getChatScript() {
  return [{
    type: "msg",
    side: "them",
    who: "MA",
    name: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"),
    time: "14:32",
    text: L("Bonjour Marc, nous avons bien regardé vos trois propositions pour la cuisine. La verrière nous plaît beaucoup.", "Hi Marc, we've looked closely at your three kitchen proposals. We really like the glass roof.")
  }, {
    type: "msg",
    side: "me",
    who: "ML",
    name: L("Vous · Architecte", "You · Architect"),
    time: "14:35",
    text: L("Excellente nouvelle. Ma préférence va aussi à la n°2 — verrière plein sud, et on reste dans le budget.", "Great news. My preference is also option 2 — south-facing glass roof, and we stay on budget."),
    attach: "proposition-2-cuisine.pdf"
  }, {
    type: "msg",
    side: "them",
    who: "MA",
    name: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"),
    time: "14:38",
    text: L("Alors c'est décidé, on part sur la n°2 !", "It's settled then, we're going with option 2!")
  }, {
    type: "decision",
    title: L("Décision validée — Cuisine · proposition n°2", "Decision approved — Kitchen · option 2"),
    sub: L("SIGNÉE PAR MARIE ARMAND · 14:39 · ARCHIVÉE AU PROJET", "SIGNED BY MARIE ARMAND · 14:39 · ARCHIVED TO PROJECT")
  }, {
    type: "msg",
    side: "me",
    who: "ML",
    name: L("Vous · Architecte", "You · Architect"),
    time: "14:41",
    text: L("Noté et archivé. Je lance les plans d'exécution, vous les verrez arriver dans Documents d'ici vendredi.", "Noted and archived. I'm starting the construction drawings, you'll see them in Documents by Friday.")
  }];
};
var Chat = function Chat() {
  var CHAT_SCRIPT = getChatScript();
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    steps = _React$useState2[0],
    setSteps = _React$useState2[1]; // revealed steps
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    typing = _React$useState4[0],
    setTyping = _React$useState4[1]; // side currently typing
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    done = _React$useState6[0],
    setDone = _React$useState6[1];
  var bodyRef = React.useRef(null);
  var sectionRef = React.useRef(null);
  var playingRef = React.useRef(false);
  var timersRef = React.useRef([]);
  var clearTimers = function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  var wait = function wait(fn, ms) {
    var t = setTimeout(fn, ms);
    timersRef.current.push(t);
  };
  var scrollBottom = function scrollBottom() {
    var el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  var play = React.useCallback(function () {
    if (playingRef.current) return;
    playingRef.current = true;
    clearTimers();
    setSteps([]);
    setTyping(null);
    setDone(false);
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSteps(CHAT_SCRIPT.map(function (_, i) {
        return i;
      }));
      setDone(true);
      playingRef.current = false;
      return;
    }
    var t = 600;
    CHAT_SCRIPT.forEach(function (step, i) {
      if (step.type === "msg") {
        wait(function () {
          setTyping(step.side);
          requestAnimationFrame(scrollBottom);
        }, t);
        t += 500 + Math.min(step.text.length * 9, 1300);
        wait(function () {
          setTyping(null);
          setSteps(function (s) {
            return [].concat(_toConsumableArray(s), [i]);
          });
          requestAnimationFrame(scrollBottom);
        }, t);
        t += 750;
      } else {
        t += 350;
        wait(function () {
          setSteps(function (s) {
            return [].concat(_toConsumableArray(s), [i]);
          });
          requestAnimationFrame(scrollBottom);
        }, t);
        t += 1000;
      }
    });
    wait(function () {
      setDone(true);
      playingRef.current = false;
    }, t + 300);
  }, []);
  React.useEffect(function () {
    var el = sectionRef.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) {
          play();
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.35
    });
    io.observe(el);
    return function () {
      io.disconnect();
      clearTimers();
    };
  }, [play]);
  return /*#__PURE__*/React.createElement("section", {
    className: "chat-section",
    id: "messagerie",
    ref: sectionRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "container chat-layout"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "chat-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Messagerie intégrée", "Built-in messaging")), /*#__PURE__*/React.createElement("h2", null, L("Architecte et maître d'ouvrage, ", "Architect and client, "), /*#__PURE__*/React.createElement("em", null, L("enfin sur le même fil.", "finally on the same thread."))), /*#__PURE__*/React.createElement("p", null, L("Chaque échange vit dans le projet, pas dans une boîte mail. Et quand une conversation devient une décision, elle est signée, horodatée et archivée. Automatiquement.", "Every exchange lives in the project, not in an inbox. And when a conversation becomes a decision, it's signed, timestamped and archived. Automatically.")), /*#__PURE__*/React.createElement("ul", {
    className: "tour-bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " ", L("Un fil par projet, par phase, contexte toujours préservé", "One thread per project and phase, context always preserved")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " ", L("Pièces jointes versionnées, jamais réécrasées", "Versioned attachments, never overwritten")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " ", L("Les décisions prises dans le fil sont archivées au projet", "Decisions made in the thread are archived to the project"))), done && /*#__PURE__*/React.createElement("button", {
    className: "chat-replay",
    onClick: play
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 12,
    style: {
      transform: "rotate(-45deg)"
    }
  }), " ", L("Rejouer la conversation", "Replay the conversation"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-phone-notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "chat-status"
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", null, "\u25CF\u25CF\u25CF 5G \u25A2")), /*#__PURE__*/React.createElement("div", {
    className: "chat-win"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-head-avatars"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av blue"
  }, "MA"), /*#__PURE__*/React.createElement("span", {
    className: "av gold"
  }, "ML")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "chat-head-title"
  }, L("Grange Lissieu — Cuisine", "Grange Lissieu — Kitchen")), /*#__PURE__*/React.createElement("div", {
    className: "chat-head-sub"
  }, /*#__PURE__*/React.createElement("span", {
    className: "on"
  }), " ", L("Marie est en ligne", "Marie is online"))), /*#__PURE__*/React.createElement("span", {
    className: "chat-head-phase"
  }, L("PHASE · APS", "PHASE · DESIGN"))), /*#__PURE__*/React.createElement("div", {
    className: "chat-body",
    ref: bodyRef
  }, /*#__PURE__*/React.createElement("span", {
    className: "chat-day"
  }, L("AUJOURD'HUI · 14:32", "TODAY · 14:32")), CHAT_SCRIPT.map(function (step, i) {
    if (!steps.includes(i)) return null;
    if (step.type === "decision") {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "chat-decision"
      }, /*#__PURE__*/React.createElement("span", {
        className: "dec-ic"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 17
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "dec-t"
      }, step.title), /*#__PURE__*/React.createElement("div", {
        className: "dec-s"
      }, step.sub)));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "chat-row ".concat(step.side === "me" ? "me" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "chat-av ".concat(step.side === "me" ? "av gold" : "av blue")
    }, step.who), /*#__PURE__*/React.createElement("div", {
      className: "chat-bubble"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-meta"
    }, step.name, " \xB7 ", step.time), step.text, step.attach && /*#__PURE__*/React.createElement("div", {
      className: "chat-attach"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "doc",
      size: 12
    }), " ", step.attach)));
  }), typing && /*#__PURE__*/React.createElement("div", {
    className: "chat-typing ".concat(typing === "me" ? "me" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "chat-av ".concat(typing === "me" ? "av gold" : "av blue")
  }, typing === "me" ? "ML" : "MA"), /*#__PURE__*/React.createElement("div", {
    className: "bub"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: "chat-input"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-fake"
  }, L("Écrire à Marie…", "Message Marie…")), /*#__PURE__*/React.createElement("button", {
    className: "send",
    "aria-label": L("Envoyer", "Send")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 15
  }))))))));
};
window.Chat = Chat;
