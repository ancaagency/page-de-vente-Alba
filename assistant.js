/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : assistant.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez assistant.jsx, puis régénérez.

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
/* Léo — assistant intégré, popup de commande (exclusivité ALBA) */

var LEO_SIDE = function LEO_SIDE() {
  return [{
    label: L("Tableau de bord", "Dashboard"),
    icon: "menu-grid"
  }, {
    label: L("Projets", "Projects"),
    icon: "folder"
  }, {
    label: L("MO & intervenants", "Clients & partners"),
    icon: "users"
  }, {
    label: L("Calendrier", "Calendar"),
    icon: "calendar",
    active: true
  }, {
    label: L("Calculateur", "Calculator"),
    icon: "euro"
  }, {
    label: L("Bibliothèque matériaux", "Material library"),
    icon: "layers"
  }, {
    label: L("Archives", "Archives"),
    icon: "doc"
  }];
};
var LEO_QA = function LEO_QA() {
  return [{
    q: L("Rédige un mail au maçon pour reporter la visite de jeudi", "Draft an email to the mason to postpone Thursday's visit"),
    typing: L("Léo rédige le message…", "Léo is drafting the message…"),
    a: {
      lead: L("Voici un brouillon, prêt à envoyer à Filipe De Sousa (DSX Frères) :", "Here's a draft, ready to send to Filipe De Sousa (DSX Frères):"),
      mail: {
        to: L("À : Filipe De Sousa · DSX Frères", "To: Filipe De Sousa · DSX Frères"),
        subject: L("Objet : Report visite chantier — Grange Lissieu", "Subject: Site visit postponed — Grange Lissieu"),
        body: L("Bonjour Filipe,\nLa visite prévue jeudi 9 juillet est décalée à lundi 13 à 8h, la météo annonçant de fortes pluies. Le reste du planning est inchangé. Merci de me confirmer votre présence.\nBien à vous,", "Hi Filipe,\nThursday 9 July's visit is moved to Monday 13th at 8am, as heavy rain is forecast. The rest of the schedule is unchanged. Please confirm your attendance.\nBest,")
      },
      foot: L("Reformuler · Raccourcir · Envoyer depuis le projet", "Rephrase · Shorten · Send from the project")
    }
  }, {
    q: L("Quels matériaux j'ai déjà utilisés pour une salle de bain ?", "Which materials have I used for a bathroom before?"),
    typing: L("Léo cherche dans votre bibliothèque…", "Léo is searching your library…"),
    a: {
      lead: L("3 matériaux de votre bibliothèque correspondent, déjà validés sur des projets similaires :", "3 materials from your library match, already approved on similar projects:"),
      list: [{
        t: "Robinetterie laiton brossé",
        s: "Atelier Fontaine · 215 €/u · Atelier Paris 11e",
        dot: "#6E8CA8"
      }, {
        t: "Pierre de Bourgogne adoucie",
        s: "Carrières Sauvanet · 146 €/m² · ★ Champion",
        dot: "#C9A86A"
      }, {
        t: "Verre cannelé clair 8 mm",
        s: "Miroiterie Grand Lyon · 310 €/m²",
        dot: "#8B6F4E"
      }],
      foot: L("Ajouter au circuit de décision de « Maison Écully »", "Add to the “Maison Écully” decision flow")
    }
  }, {
    q: L("Résume-moi où en est Grange Lissieu", "Summarise where Grange Lissieu stands"),
    typing: L("Léo analyse le projet…", "Léo is analysing the project…"),
    a: {
      lead: L("Grange Lissieu — phase APS, avancement 43 %. Points saillants :", "Grange Lissieu — design phase, 43% complete. Key points:"),
      list: [{
        t: L("1 décision en attente", "1 decision pending"),
        s: L("Choix châssis acier, à valider par le MO", "Steel frame choice, awaiting client approval"),
        dot: "#C0614F"
      }, {
        t: L("Permis en retard de 113 j", "Permit 113 days late"),
        s: L("Relance mairie recommandée", "Follow-up with town hall recommended"),
        dot: "#D9B36B"
      }, {
        t: L("Prochaine visite chantier", "Next site visit"),
        s: L("Mardi 8 juillet · 8h · météo à risque", "Tuesday 8 July · 8am · weather at risk"),
        dot: "#6E8CA8"
      }],
      foot: L("Générer un compte-rendu client · Ouvrir le cockpit", "Generate a client report · Open the cockpit")
    }
  }];
};
var LeoSparkle = function LeoSparkle(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 22 : _ref$size;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13 2.5l1.9 4.6L19.5 9l-4.6 1.9L13 15.5l-1.9-4.6L6.5 9l4.6-1.9z",
    fill: "currentColor",
    fillOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 15l.9 2.1L9 18l-2.1.9L6 21l-.9-2.1L3 18l2.1-.9z",
    fill: "currentColor",
    fillOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 14.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z",
    fill: "currentColor",
    fillOpacity: "0.18"
  }));
};
var AssistantDemo = function AssistantDemo() {
  var QA = LEO_QA();
  var _React$useState = React.useState("idle"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    intro = _React$useState2[0],
    setIntro = _React$useState2[1]; // idle | playing | done
  var _React$useState3 = React.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    open = _React$useState4[0],
    setOpen = _React$useState4[1];
  var _React$useState5 = React.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    thread = _React$useState6[0],
    setThread = _React$useState6[1];
  var _React$useState7 = React.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    typing = _React$useState8[0],
    setTyping = _React$useState8[1];
  var _React$useState9 = React.useState([]),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    asked = _React$useState0[0],
    setAsked = _React$useState0[1];
  var _React$useState1 = React.useState(""),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    query = _React$useState10[0],
    setQuery = _React$useState10[1];
  var bodyRef = React.useRef(null);
  var timers = React.useRef([]);
  var at = function at(fn, ms) {
    return timers.current.push(setTimeout(fn, ms));
  };
  React.useEffect(function () {
    return function () {
      return timers.current.forEach(clearTimeout);
    };
  }, []);
  React.useEffect(function () {
    var el = bodyRef.current;
    if (el) requestAnimationFrame(function () {
      el.scrollTop = el.scrollHeight;
    });
  }, [thread, typing]);
  var ask = function ask(i) {
    if (typing || asked.includes(i)) return;
    var qa = QA[i];
    setAsked(function (a) {
      return [].concat(_toConsumableArray(a), [i]);
    });
    /* frappe simulée dans la barre, puis envoi */
    var full = qa.q;
    var k = 0;
    var _tick = function tick() {
      k += 2;
      setQuery(full.slice(0, k));
      if (k < full.length) at(_tick, 16);else at(function () {
        setQuery("");
        setThread(function (t) {
          return [].concat(_toConsumableArray(t), [{
            role: "user",
            text: full
          }]);
        });
        at(function () {
          return setTyping(qa.typing);
        }, 250);
        at(function () {
          setTyping(null);
          setThread(function (t) {
            return [].concat(_toConsumableArray(t), [{
              role: "bot",
              a: qa.a
            }]);
          });
        }, 1650);
      }, 260);
    };
    _tick();
  };
  var reset = function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setThread([]);
    setAsked([]);
    setTyping(null);
    setQuery("");
  };
  var audioRef = React.useRef(null);
  var playedRef = React.useRef(false);
  var runIntro = React.useCallback(function () {
    if (playedRef.current) return;
    playedRef.current = true;
    setIntro("playing");
    var a = audioRef.current;
    if (a) {
      try {
        a.currentTime = 0;
        a.volume = 0.55;
        a.play()["catch"](function () {});
      } catch (e) {}
    }
    setTimeout(function () {
      return setIntro("done");
    }, 2100);
  }, []);
  var replay = function replay() {
    playedRef.current = false;
    setIntro("idle");
    requestAnimationFrame(runIntro);
  };
  React.useEffect(function () {
    var el = document.querySelector(".leo-app");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntro("done");
      playedRef.current = true;
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.35) runIntro();
      });
    }, {
      threshold: [0, 0.35, 0.6]
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, [runIntro]);
  React.useEffect(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var app = document.querySelector(".leo-app");
    if (!app) return;
    gsap.from(app, {
      autoAlpha: 0,
      y: 90,
      rotateX: 6,
      transformPerspective: 1600,
      transformOrigin: "center top",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: app,
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "materials-section",
    id: "assistant"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, L("Exclusivité ALBA", "ALBA exclusive"), /*#__PURE__*/React.createElement("span", {
    className: "mat-badge-new"
  }, L("INÉDIT", "UNIQUE"))), /*#__PURE__*/React.createElement("h2", {
    className: "display"
  }, L("Léo, l'assistant qui connaît ", "Léo, the assistant that knows "), /*#__PURE__*/React.createElement("em", null, L("vos projets par cœur.", "your projects by heart."))), /*#__PURE__*/React.createElement("p", null, L("Une étincelle, n'importe où dans ALBA : Léo cherche une page, lance une action, rédige un mail, retrouve un matériau, résume un chantier. Il ne devine pas, il lit vos données. Aucun autre logiciel d'architecte ne le fait.", "One sparkle, anywhere in ALBA: Léo finds a page, runs an action, drafts an email, recalls a material, summarises a site. It doesn't guess, it reads your data. No other architect software does this."))), /*#__PURE__*/React.createElement("div", {
    className: "leo-app intro-".concat(intro)
  }, /*#__PURE__*/React.createElement("audio", {
    ref: audioRef,
    src: "uploads/810328__mokasza__slowly-whoosh.mp3",
    preload: "auto"
  }), intro !== "done" && /*#__PURE__*/React.createElement("div", {
    className: "leo-intro",
    onClick: runIntro
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-intro-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "leo-intro-spark"
  }, /*#__PURE__*/React.createElement(LeoSparkle, {
    size: 150
  })), /*#__PURE__*/React.createElement("div", {
    className: "leo-intro-name"
  }, "L\xC9O"), /*#__PURE__*/React.createElement("div", {
    className: "leo-intro-sub"
  }, L("votre assistant intégré", "your built-in assistant"))), /*#__PURE__*/React.createElement("button", {
    className: "leo-replay",
    onClick: replay,
    title: L("Rejouer l'apparition de Léo", "Replay Léo's entrance")
  }, /*#__PURE__*/React.createElement(LeoSparkle, {
    size: 12
  }), " ", L("Rejouer", "Replay")), /*#__PURE__*/React.createElement("div", {
    className: "mockup-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mockup-dots"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FF5F57"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FEBC2E"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#28C840"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mockup-url"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 11
  }), " alba-studio.co/calendar"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "leo-shell ".concat(open ? "is-dimmed" : "")
  }, /*#__PURE__*/React.createElement("aside", {
    className: "leo-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ml-rail-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/logo-alba.png",
    alt: "ALBA Studio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-rail-items"
  }, LEO_SIDE().map(function (it) {
    return /*#__PURE__*/React.createElement("span", {
      key: it.label,
      className: "ml-rail-item ".concat(it.active ? "is-active" : ""),
      title: it.label
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 14
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ml-avatar sm rail-foot"
  }, "A")), /*#__PURE__*/React.createElement("main", {
    className: "leo-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "leo-top-create"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " ", L("Créer un projet", "Create a project")), /*#__PURE__*/React.createElement("button", {
    className: "leo-btn ".concat(open ? "is-on" : ""),
    onClick: function onClick() {
      return setOpen(true);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "leo-btn-spark"
  }, /*#__PURE__*/React.createElement(LeoSparkle, {
    size: 13
  })), " L\xE9o", /*#__PURE__*/React.createElement("span", {
    className: "leo-btn-halo"
  })), /*#__PURE__*/React.createElement("span", {
    className: "leo-top-ico bell"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 13
  }), /*#__PURE__*/React.createElement("i", null, "18")), /*#__PURE__*/React.createElement("span", {
    className: "leo-top-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    className: "leo-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-eyebrow"
  }, L("WORKSPACE · STUDIO ALBA", "WORKSPACE · STUDIO ALBA")), /*#__PURE__*/React.createElement("div", {
    className: "leo-title"
  }, L("Calendrier", "Calendar")), /*#__PURE__*/React.createElement("div", {
    className: "leo-sub"
  }, L("Toutes les échéances, réunions et visites de vos projets en cours.", "Every deadline, meeting and site visit across your live projects.")), /*#__PURE__*/React.createElement("div", {
    className: "leo-fake-grid"
  }, Array.from({
    length: 28
  }).map(function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: i === 25 ? "is-today" : ""
    }, i + 1 <= 28 ? i + 1 : "");
  }))))), open && /*#__PURE__*/React.createElement("div", {
    className: "leo-overlay",
    onClick: function onClick() {
      return setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "leo-close",
    onClick: function onClick() {
      return setOpen(false);
    },
    "aria-label": L("Fermer", "Close")
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "leo-modal-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "leo-kdot"
  }), " L\xC9O \xB7 ", L("ASSISTANT", "ASSISTANT")), /*#__PURE__*/React.createElement("h4", {
    className: "leo-modal-title"
  }, L("Cherchez, ou ", "Search, or "), /*#__PURE__*/React.createElement("em", null, L("demandez à Léo", "ask Léo"))), /*#__PURE__*/React.createElement("p", {
    className: "leo-modal-sub"
  }, L("Une page, une action, un projet, ou une vraie question à Léo, à l'écrit comme à la voix.", "A page, an action, a project, or a real question for Léo, typed or spoken."))), /*#__PURE__*/React.createElement("div", {
    className: "leo-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "leo-search-txt ".concat(query ? "" : "is-ph")
  }, query || L("Cherchez, ou posez votre question...", "Search, or ask your question...")), /*#__PURE__*/React.createElement("span", {
    className: "leo-caret"
  }), /*#__PURE__*/React.createElement("span", {
    className: "leo-mic"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "3",
    width: "6",
    height: "11",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 11a7 7 0 0 0 14 0M12 18v3"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "leo-body",
    ref: bodyRef
  }, thread.length === 0 && !typing && /*#__PURE__*/React.createElement("div", {
    className: "leo-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leo-empty-spark"
  }, /*#__PURE__*/React.createElement(LeoSparkle, {
    size: 40
  })), /*#__PURE__*/React.createElement("div", {
    className: "leo-empty-t"
  }, L("Posez votre question à Léo", "Ask Léo your question")), /*#__PURE__*/React.createElement("div", {
    className: "leo-empty-s"
  }, L("Il répond, cherche et vous emmène au bon endroit.", "It answers, searches and takes you to the right place."))), thread.map(function (m, i) {
    return m.role === "user" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "leo-row user"
    }, /*#__PURE__*/React.createElement("div", {
      className: "leo-bubble"
    }, m.text)) : /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "leo-row bot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "leo-av"
    }, /*#__PURE__*/React.createElement(LeoSparkle, {
      size: 14
    })), /*#__PURE__*/React.createElement("div", {
      className: "leo-answer"
    }, /*#__PURE__*/React.createElement("p", {
      className: "leo-lead"
    }, m.a.lead), m.a.mail && /*#__PURE__*/React.createElement("div", {
      className: "leo-mail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "leo-mail-to"
    }, m.a.mail.to), /*#__PURE__*/React.createElement("div", {
      className: "leo-mail-subj"
    }, m.a.mail.subject), /*#__PURE__*/React.createElement("div", {
      className: "leo-mail-body"
    }, m.a.mail.body)), m.a.list && /*#__PURE__*/React.createElement("div", {
      className: "leo-list"
    }, m.a.list.map(function (it, k) {
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        className: "leo-item"
      }, /*#__PURE__*/React.createElement("span", {
        className: "leo-dot",
        style: {
          background: it.dot
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "leo-item-t"
      }, it.t), /*#__PURE__*/React.createElement("div", {
        className: "leo-item-s"
      }, it.s)));
    })), /*#__PURE__*/React.createElement("div", {
      className: "leo-answer-foot"
    }, /*#__PURE__*/React.createElement(LeoSparkle, {
      size: 11
    }), " ", m.a.foot)));
  }), typing && /*#__PURE__*/React.createElement("div", {
    className: "leo-row bot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "leo-av spin"
  }, /*#__PURE__*/React.createElement(LeoSparkle, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "leo-typing"
  }, typing, /*#__PURE__*/React.createElement("span", {
    className: "leo-dots"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))))), /*#__PURE__*/React.createElement("div", {
    className: "leo-suggests"
  }, QA.map(function (qa, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "leo-chip",
      disabled: asked.includes(i),
      onClick: function onClick() {
        return ask(i);
      }
    }, /*#__PURE__*/React.createElement(LeoSparkle, {
      size: 11
    }), " ", qa.q);
  }), asked.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "leo-chip reset",
    onClick: reset
  }, L("Réinitialiser", "Reset"))), /*#__PURE__*/React.createElement("div", {
    className: "leo-modal-foot"
  }, /*#__PURE__*/React.createElement("span", null, "\u2191\u2193 ", L("naviguer", "navigate")), /*#__PURE__*/React.createElement("span", null, "\u21B5 ", L("ouvrir", "open")), /*#__PURE__*/React.createElement("span", null, "\u2318\u21B5 ", L("demander à Léo", "ask Léo")), /*#__PURE__*/React.createElement("span", null, L("Échap fermer", "Esc close")))))), /*#__PURE__*/React.createElement("div", {
    className: "cal-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), L("Démo interactive, cliquez une suggestion : Léo répond avec vos données", "Interactive demo, click a suggestion: Léo answers with your data"))));
};
window.AssistantDemo = AssistantDemo;
