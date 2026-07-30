/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : audience.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez audience.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
/* Audience — 3 variants A / B / C, switchable via Tweak, bilingual */

var getAudienceData = function getAudienceData() {
  return [{
    num: "01",
    icon: "compass",
    h: Txt("pour-qui.architectes-dplg-hmonp", "Architectes DPLG / HMONP", "Registered architects"),
    sub: Txt("pour-qui.liberal-petite-agence", "Libéral · Petite agence", "Solo · Small practice"),
    p: Txt("pour-qui.alba-structure-votre-suivi-sans-imposer", "ALBA structure votre suivi sans imposer un workflow d'usine, vous gardez votre méthode, on automatise la coordination.", "ALBA structures your tracking without imposing a factory workflow, you keep your method, we automate the coordination."),
    tags: [Txt("pour-qui.liberal", "Libéral", "Independent"), Txt("pour-qui.1-3-personnes", "1–3 personnes", "1–3 people")],
    tone: "stone",
    meta: [Txt("pour-qui.independants", "Indépendants", "Independents"), Txt("pour-qui.1-a-3-projets", "1 à 3 projets", "1 to 3 projects")],
    cta: Txt("pour-qui.voir-la-demo-liberal", "Voir la démo libéral", "See the solo demo")
  }, {
    num: "02",
    icon: "users",
    h: Txt("pour-qui.agences-de-taille-moyenne", "Agences de taille moyenne", "Mid-size practices"),
    sub: Txt("pour-qui.5-a-20-collaborateurs", "5 à 20 collaborateurs", "5 to 20 people"),
    p: Txt("pour-qui.vue-agence-multi-projets-droits-par", "Vue agence, multi-projets, droits par profil, orchestrer une équipe sans tout micro-manager, en gardant vos process.", "Practice view, multi-project, per-role permissions, run a team without micro-managing, keeping your processes."),
    tags: [Txt("pour-qui.5-20-pers", "5–20 pers.", "5–20 people"), Txt("pour-qui.multi-projets", "Multi-projets", "Multi-project")],
    tone: "sand",
    meta: [Txt("pour-qui.agences", "Agences", "Practices"), Txt("pour-qui.5-a-50-projets", "5 à 50 projets", "5 to 50 projects")],
    cta: Txt("pour-qui.voir-la-demo-agence", "Voir la démo agence", "See the practice demo")
  }, {
    num: "03",
    icon: "shield",
    h: Txt("pour-qui.maitres-d-uvre", "Maîtres d'œuvre", "Project managers"),
    sub: Txt("pour-qui.coordination-validations", "Coordination & validations", "Coordination & approvals"),
    p: Txt("pour-qui.vous-engagez-votre-responsabilite-alba-trace", "Vous engagez votre responsabilité. ALBA trace chaque arbitrage, archive chaque échange, sécurise vos garanties.", "Your liability is on the line. ALBA traces every decision, archives every exchange, secures your guarantees."),
    tags: [Txt("pour-qui.moe", "MOE", "PM"), Txt("pour-qui.visa", "Visa", "Sign-off")],
    tone: "night",
    meta: [Txt("pour-qui.moe-generaliste", "MOE généraliste", "General PM"), Txt("pour-qui.pluri-disciplines", "Pluri-disciplines", "Multi-discipline")],
    cta: Txt("pour-qui.decouvrir", "Découvrir", "Learn more")
  }, {
    num: "04",
    icon: "layers",
    h: Txt("pour-qui.bet-structure", "BET structure", "Structural engineers"),
    sub: Txt("pour-qui.beton-metal-bois", "Béton · Métal · Bois", "Concrete · Steel · Timber"),
    p: Txt("pour-qui.gros-volumes-de-plans-exe-a", "Gros volumes de plans EXE à valider. Versions trackées, visa structuré, signatures numériques, vos plans ne se perdent plus dans une boîte mail.", "High volumes of shop drawings to approve. Tracked versions, structured sign-off, digital signatures, your drawings no longer get lost in an inbox."),
    tags: [Txt("pour-qui.beton", "Béton", "Concrete"), Txt("pour-qui.metal", "Métal", "Steel"), Txt("pour-qui.bois", "Bois", "Timber")],
    tone: "forest",
    meta: [Txt("pour-qui.bet-str", "BET STR", "Structural"), Txt("pour-qui.plans-exe", "Plans EXE", "Shop drawings")],
    cta: Txt("pour-qui.decouvrir-2", "Découvrir", "Learn more")
  }, {
    num: "05",
    icon: "wave",
    h: Txt("pour-qui.bet-fluides", "BET fluides", "MEP engineers"),
    sub: Txt("pour-qui.cvc-plomberie-electricite", "CVC · Plomberie · Électricité", "HVAC · Plumbing · Electrical"),
    p: Txt("pour-qui.multi-lots-beaucoup-d-allers-retours", "Multi-lots, beaucoup d'allers-retours. Coordination par lot, visas séquencés, exports par corps d'état, pensé pour vos boucles courtes.", "Multiple trades, lots of back-and-forth. Per-trade coordination, sequenced sign-offs, per-package exports, built for your short loops."),
    tags: [Txt("pour-qui.cvc", "CVC", "HVAC"), Txt("pour-qui.plomberie", "Plomberie", "Plumbing"), Txt("pour-qui.electricite", "Électricité", "Electrical")],
    tone: "terracotta",
    meta: [Txt("pour-qui.bet-fluides-2", "BET fluides", "MEP"), Txt("pour-qui.multi-lots", "Multi-lots", "Multi-trade")],
    cta: Txt("pour-qui.decouvrir-3", "Découvrir", "Learn more")
  }];
};
var AudienceHead = function AudienceHead() {
  return /*#__PURE__*/React.createElement(Reveal, {
    className: "aud2-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, Txt("pour-qui.pour-qui", "Pour qui ?", "Who is it for?")), /*#__PURE__*/React.createElement("h2", null, Txt("pour-qui.concu-pour-celles-et-ceux-qui", "Conçu pour celles et ceux qui ", "Built for the people who "), /*#__PURE__*/React.createElement("em", null, Txt("pour-qui.portent-la-responsabilite-du-projet", "portent la responsabilité du projet.", "carry the project's responsibility.")))), /*#__PURE__*/React.createElement("p", null, Txt("pour-qui.alba-s-adresse-aux-professionnels-de", "ALBA s'adresse aux professionnels de la maîtrise d'œuvre qui pilotent des projets à plusieurs voix, et qui ne peuvent plus se permettre de perdre du temps en coordination.", "ALBA is for design and engineering professionals who run projects with many voices, and can no longer afford to lose time on coordination.")));
};
var AudienceA = function AudienceA() {
  return /*#__PURE__*/React.createElement(Reveal, {
    className: "aud-A"
  }, getAudienceData().map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "aud-A-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aud-A-photo"
    }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
      tone: c.tone,
      ratio: "4/3",
      label: ""
    }), /*#__PURE__*/React.createElement("span", {
      className: "aud-A-num"
    }, c.num, " \u2014 ", c.sub.split(" · ")[0].toUpperCase())), /*#__PURE__*/React.createElement("div", {
      className: "aud-A-body"
    }, /*#__PURE__*/React.createElement("h3", null, c.h), /*#__PURE__*/React.createElement("p", null, c.p), /*#__PURE__*/React.createElement("div", {
      className: "aud-A-tags"
    }, c.tags.map(function (t, j) {
      return /*#__PURE__*/React.createElement("span", {
        key: j
      }, t);
    })), /*#__PURE__*/React.createElement("div", {
      className: "aud-A-foot"
    }, /*#__PURE__*/React.createElement("span", null, Txt("pour-qui.en-savoir", "EN SAVOIR +", "LEARN MORE +")), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 14
    }))));
  }));
};
var AudienceB = function AudienceB() {
  return /*#__PURE__*/React.createElement(Reveal, {
    className: "aud-B"
  }, getAudienceData().map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "aud-B-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aud-B-num"
    }, "\u2014 ", c.num), /*#__PURE__*/React.createElement("div", {
      className: "aud-B-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sub"
    }, c.sub), /*#__PURE__*/React.createElement("h3", null, c.h)), /*#__PURE__*/React.createElement("p", {
      className: "aud-B-desc"
    }, c.p), /*#__PURE__*/React.createElement("div", {
      className: "aud-B-meta"
    }, /*#__PURE__*/React.createElement("span", null, c.meta[0]), /*#__PURE__*/React.createElement("span", null, c.meta[1])), /*#__PURE__*/React.createElement("div", {
      className: "aud-B-arrow"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 14
    })));
  }));
};
var AudienceC = function AudienceC() {
  return /*#__PURE__*/React.createElement(Reveal, {
    className: "aud-C"
  }, getAudienceData().map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "aud-C-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aud-C-num"
    }, c.num), /*#__PURE__*/React.createElement("div", {
      className: "aud-C-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sub"
    }, c.sub), /*#__PURE__*/React.createElement("h3", null, c.h)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "aud-C-desc"
    }, c.p), /*#__PURE__*/React.createElement("div", {
      className: "aud-C-tags"
    }, c.tags.map(function (t, j) {
      return /*#__PURE__*/React.createElement("span", {
        key: j
      }, t);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "aud-C-arrow"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 14
    })));
  }));
};
var Audience = function Audience(_ref) {
  var _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "A" : _ref$variant;
  var isC = variant === "C";
  return /*#__PURE__*/React.createElement("section", {
    className: "section ".concat(isC ? "aud-C-section" : "audience"),
    id: "pour-qui"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(AudienceHead, null), variant === "A" && /*#__PURE__*/React.createElement(AudienceA, null), variant === "B" && /*#__PURE__*/React.createElement(AudienceB, null), variant === "C" && /*#__PURE__*/React.createElement(AudienceC, null)));
};
window.Audience = Audience;
