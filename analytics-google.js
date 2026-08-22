/* ═════════════════════════════════════════════════════════════════════════════
   CHARGEUR GOOGLE ANALYTICS (GA4) — dort tant qu'on ne lui a pas dit oui

   Exactement la même règle que pixel-facebook.js, et pour la même raison : il
   faut deux feux verts.

     1. un identifiant de flux dans config.js (`window.ALBA_GA4`) ;
     2. le consentement explicite du visiteur (consentement.jsx).

   Sans l'un ou l'autre, aucune requête ne part vers Google. Pas de connexion,
   pas de préchargement. Un outil de mesure qui se connecte « juste pour être
   prêt » a déjà transmis l'adresse IP du visiteur, et le consentement arrive
   alors trop tard.

   ─────────────────────────────────────────────────────────────────────────────
   POURQUOI CE FICHIER PLUTÔT QUE L'EXTRAIT FOURNI PAR GOOGLE

   L'extrait de Google est en deux morceaux, et le second est un <script> EN
   LIGNE. Notre `script-src` ne vaut que 'self' : collé tel quel, le navigateur
   le refuserait et GA ne mesurerait rien — sans que rien ne l'indique dans
   l'interface. Ce fichier fait le même travail depuis un fichier externe.

   ─────────────────────────────────────────────────────────────────────────────
   DEUX RÉGLAGES POSÉS ICI, ET CE SONT DES CHOIX

   `allow_google_signals: false` et `allow_ad_personalization_signals: false`
   coupent l'usage publicitaire des données : GA compte les visites, il
   n'alimente pas le ciblage. C'est ce qu'on lui demande sur cette page — le
   ciblage, c'est le rôle du pixel, qui est déclaré séparément et se consent
   dans le même geste.

   Les retirer élargirait ce que Google fait de ces données. Ce serait un
   changement de finalité : il faudrait le dire dans les mentions légales.

   ⚠️ Et comme pour le pixel : sans la ligne de CSP correspondante (voir
   _headers, « Recette pixel »), ce chargeur fera son travail et le navigateur
   bloquera quand même.
   ═════════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var charge = false;

  function autorise() {
    var c = window.albaConsentement;
    if (!c || typeof c.ga4 !== "function") return null;  // consentement.js pas encore là
    var id = c.ga4();
    if (!id) return null;                                // aucune mesure déclarée
    return c.etat() === "accepte" ? id : null;           // silence tant que ce n'est pas oui
  }

  function charger() {
    if (charge) return;
    var id = autorise();
    if (!id) return;
    charge = true;

    /* `dataLayer` doit exister et empiler les appels AVANT que gtag.js n'arrive,
       sinon les premiers événements sont perdus. C'est tout ce que fait le
       morceau en ligne de l'extrait officiel. */
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  /* Deux moments : au chargement (visiteur qui avait déjà accepté) et à chaque
     changement de choix. Un refus ne fait rien — et il n'y a rien à décharger,
     puisque rien n'a été chargé. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", charger);
  } else {
    charger();
  }
  window.addEventListener("alba:consentement", charger);
})();
