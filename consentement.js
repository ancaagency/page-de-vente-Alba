/* ═══════════════════════════════════════════════════════════════════════════
   FICHIER PRODUIT — NE PAS MODIFIER À LA MAIN.

   Source : consentement.jsx
   Régénérer : node outils/transpiler.mjs

   Toute modification faite ici sera écrasée à la prochaine exécution, et
   tests/transpile.mjs refuse de passer si ce fichier ne correspond plus à sa
   source. Modifiez consentement.jsx, puis régénérez.

   Pour changer un TEXTE, rien de tout cela : contenu.js se modifie sans
   transpilation, c'est du JavaScript ordinaire.
   ═══════════════════════════════════════════════════════════════════════════ */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* ═════════════════════════════════════════════════════════════════════════════
   CONSENTEMENT AUX TRACEURS PUBLICITAIRES

   ─────────────────────────────────────────────────────────────────────────────
   AUJOURD'HUI, CE FICHIER N'AFFICHE RIEN

   La page ne dépose aucun cookie, et les deux seules choses qu'elle conserve —
   la langue choisie et le fait que le rideau d'intro a été joué — sont
   dispensées de consentement par l'article 82 de la loi Informatique et
   Libertés (la CNIL cite expressément les traceurs de personnalisation de
   l'interface, dont le choix de langue).

   Afficher un bandeau dans cette situation serait une faute, pas une précaution :
   on demanderait un consentement qui n'a pas d'objet, ce que la CNIL qualifie de
   trompeur, et on paierait le prix en conversions pour rien.

   ─────────────────────────────────────────────────────────────────────────────
   LE JOUR OÙ LE PIXEL FACEBOOK ARRIVE

   Un pixel publicitaire, lui, n'est PAS dispensé. Il exige un consentement
   préalable, libre, éclairé et aussi facile à refuser qu'à accepter.

   Tout est déjà écrit. Il y a UNE ligne à changer, dans config.js :

       window.ALBA_PIXEL_FACEBOOK = "123456789012345";   // au lieu de null

   À partir de là, et sans toucher à ce fichier :
     · le bandeau apparaît pour qui n'a pas encore répondu ;
     · le pixel ne se charge QUE si le visiteur a accepté ;
     · le lien « Cookies » du pied de page rouvre le choix, à tout moment.

   ⚠️ DEUX CHOSES NE SE FONT PAS TOUTES SEULES, et le pixel restera muet sans
   elles. Les deux sont décrites dans _headers, section « Recette pixel » :
     1. la CSP doit autoriser connect.facebook.net et www.facebook.com ;
     2. la section 6 des mentions légales doit être remplacée par le bloc
        prévu — un bandeau qui dit une chose et une page légale qui dit le
        contraire est pire que pas de bandeau du tout.

   ─────────────────────────────────────────────────────────────────────────────
   CE QUE LA CNIL EXIGE, ET QUI EST RESPECTÉ ICI

   · Refuser doit être aussi simple qu'accepter : deux boutons, même niveau,
     même taille, même poids visuel. Pas de « refuser » en gris pâle sous le
     pli, pas de croix qui vaut acceptation.
   · Le silence ne vaut pas accord : tant que rien n'est cliqué, rien ne part.
     Faire défiler la page ne vaut pas consentement.
   · Le choix se retire aussi facilement qu'il se donne : le lien du pied de
     page rouvre le bandeau.
   · On ne harcèle pas : après un refus, on ne redemande pas avant six mois.
   ═════════════════════════════════════════════════════════════════════════════ */

var CLE_CONSENTEMENT = "alba_consentement";
/* Six mois. C'est la durée que recommande la CNIL avant de redemander à
   quelqu'un qui a refusé. On l'applique aussi à l'acceptation : passé ce
   délai, le consentement n'est plus « éclairé », il est simplement ancien. */
var DUREE_CONSENTEMENT = 182 * 24 * 60 * 60 * 1000;

/** Lit un identifiant d'interrupteur. Vide, nul ou non textuel = éteint. */
var lireInterrupteur = function lireInterrupteur(nom) {
  var id = typeof window !== "undefined" ? window[nom] : null;
  return typeof id === "string" && id.trim() !== "" ? id.trim() : null;
};
var pixelDeclare = function pixelDeclare() {
  return lireInterrupteur("ALBA_PIXEL_FACEBOOK");
};
var ga4Declare = function ga4Declare() {
  return lireInterrupteur("ALBA_GA4");
};

/* Y a-t-il quelque chose à consentir ? Le bandeau ne dépend PAS d'un traceur en
   particulier : il apparaît dès qu'au moins un traceur non dispensé est
   déclaré, et disparaît quand il n'y en a plus. C'est ce qui permet d'allumer
   la mesure d'audience et le pixel indépendamment, sans jamais se retrouver
   avec un traceur actif et aucun bandeau — ni l'inverse, un bandeau qui
   demanderait un consentement sans objet. */
var traceursDeclares = function traceursDeclares() {
  var l = [];
  if (ga4Declare()) l.push("mesure");
  if (pixelDeclare()) l.push("publicite");
  return l;
};

/** Le choix enregistré, ou null s'il n'y en a pas / s'il a expiré. */
var lireConsentement = function lireConsentement() {
  try {
    var brut = window.localStorage.getItem(CLE_CONSENTEMENT);
    if (!brut) return null;
    var c = JSON.parse(brut);
    if (!c || c.choix !== "accepte" && c.choix !== "refuse") return null;
    if (!c.date || Date.now() - c.date > DUREE_CONSENTEMENT) return null;
    return c.choix;
  } catch (e) {
    /* Mode privé strict, stockage plein, JSON abîmé : on se comporte comme si
       rien n'avait été répondu. Jamais comme si tout avait été accepté. */
    return null;
  }
};
var ecrireConsentement = function ecrireConsentement(choix) {
  try {
    window.localStorage.setItem(CLE_CONSENTEMENT, JSON.stringify({
      choix: choix,
      date: Date.now(),
      version: 1
    }));
  } catch (e) {/* on continue : le choix vaut au moins pour cette visite */}
};

/* Point d'entrée public, lu par pixel-facebook.js et par le pied de page.
   Il est défini MÊME quand le pixel n'est pas déclaré : c'est ce qui permet au
   chargeur de refuser de se déclencher sans avoir à connaître ce fichier. */
if (typeof window !== "undefined") {
  window.albaConsentement = {
    etat: lireConsentement,
    pixel: pixelDeclare,
    ga4: ga4Declare,
    traceurs: traceursDeclares,
    /* Rouvre le choix. Utilisé par le lien « Cookies » du pied de page — le
       retrait doit être aussi simple que le consentement. */
    rouvrir: function rouvrir() {
      try {
        window.localStorage.removeItem(CLE_CONSENTEMENT);
      } catch (e) {}
      window.dispatchEvent(new Event("alba:consentement"));
    }
  };
}
var BandeauConsentement = function BandeauConsentement() {
  var _React$useState = React.useState(function () {
      return typeof window === "undefined" ? "refuse" : lireConsentement();
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    choix = _React$useState2[0],
    setChoix = _React$useState2[1];
  React.useEffect(function () {
    var relire = function relire() {
      return setChoix(lireConsentement());
    };
    window.addEventListener("alba:consentement", relire);
    return function () {
      return window.removeEventListener("alba:consentement", relire);
    };
  }, []);
  var repondre = function repondre(valeur) {
    ecrireConsentement(valeur);
    setChoix(valeur);
    // Le chargeur écoute : il déclenche le pixel si, et seulement si, c'est oui.
    window.dispatchEvent(new Event("alba:consentement"));
  };

  // Rien de non dispensé à déclarer, ou choix déjà fait : aucun bandeau.
  var declares = traceursDeclares();
  if (declares.length === 0 || choix !== null) return null;

  /* Le bandeau NOMME ce qu'il demande. Un texte générique qui parlerait de
     « cookies » alors qu'un seul traceur est en jeu — ou l'inverse — n'est pas
     un consentement éclairé. On décrit donc ce qui est réellement déclaré. */
  var objet = declares.length === 2 ? L("un traceur publicitaire et une mesure d'audience", "an advertising tracker and audience measurement") : declares[0] === "mesure" ? L("une mesure d'audience", "audience measurement") : L("un traceur publicitaire", "an advertising tracker");
  return /*#__PURE__*/React.createElement("div", {
    className: "consentement",
    role: "dialog",
    "aria-live": "polite",
    "aria-label": L("Choix concernant les traceurs", "Tracker choices")
  }, /*#__PURE__*/React.createElement("div", {
    className: "consentement-texte"
  }, /*#__PURE__*/React.createElement("p", null, L("Nous aimerions d\xE9poser ".concat(objet, ". Ce n'est pas n\xE9cessaire au fonctionnement du site, et refuser ne change rien \xE0 votre visite."), "We'd like to set ".concat(objet, ". It isn't needed for the site to work, and refusing changes nothing about your visit."))), /*#__PURE__*/React.createElement("a", {
    href: "mentions-legales.html#cookies"
  }, L("En savoir plus", "Learn more"))), /*#__PURE__*/React.createElement("div", {
    className: "consentement-choix"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: function onClick() {
      return repondre("refuse");
    }
  }, L("Tout refuser", "Reject all")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: function onClick() {
      return repondre("accepte");
    }
  }, L("Tout accepter", "Accept all"))));
};

/* Entrée « Cookies » du pied de page. Elle ne s'affiche que si un traceur
   publicitaire est déclaré : sans cela, elle ouvrirait un bandeau vide et
   ferait croire à un choix qui n'existe pas. */
var LienConsentement = function LienConsentement() {
  if (traceursDeclares().length === 0) return null;
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: function onClick(ev) {
      ev.preventDefault();
      window.albaConsentement.rouvrir();
    }
  }, L("Cookies", "Cookies")));
};
window.BandeauConsentement = BandeauConsentement;
window.LienConsentement = LienConsentement;
