/* ═════════════════════════════════════════════════════════════════════════════
   CHARGEUR DU PIXEL FACEBOOK — dort tant qu'on ne lui a pas dit oui deux fois

   Ce fichier ne charge RIEN par lui-même. Il lui faut deux feux verts :

     1. un identifiant déclaré dans config.js (`window.ALBA_PIXEL_FACEBOOK`) ;
     2. le consentement explicite du visiteur (consentement.jsx).

   Sans l'un ou l'autre, aucune requête ne part vers Facebook. Pas de connexion,
   pas de préchargement, pas de `preconnect` : rien. C'est le point qui compte,
   parce qu'un pixel qui se connecte « juste pour être prêt » a déjà transmis
   l'adresse IP du visiteur, et le consentement arrive alors trop tard.

   ─────────────────────────────────────────────────────────────────────────────
   POURQUOI CE FICHIER EXISTE, PLUTÔT QUE LE BOUT DE CODE FOURNI PAR FACEBOOK

   L'extrait que donne Facebook est un <script> EN LIGNE. Notre politique de
   sécurité du contenu interdit les scripts en ligne : `script-src` n'a ni
   'unsafe-inline' ni 'unsafe-eval', et c'est tout l'intérêt d'avoir transpilé
   le JSX à l'avance. Coller l'extrait tel quel donnerait un pixel silencieux —
   refusé par le navigateur, sans que rien ne le signale dans l'interface.

   Ce fichier fait exactement ce que fait l'extrait, mais depuis un fichier
   externe : la CSP reste intacte.

   ─────────────────────────────────────────────────────────────────────────────
   CE QU'IL RESTE À FAIRE LE JOUR OÙ ON L'ALLUME

   Voir _headers, section « Recette pixel » : la CSP doit autoriser
   connect.facebook.net (script) et www.facebook.com (image et connexion).
   Sans ça, ce chargeur fera son travail et le navigateur bloquera quand même.
   ═════════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var charge = false;

  function autorise() {
    var c = window.albaConsentement;
    if (!c) return null;                       // consentement.jsx pas encore là
    var id = c.pixel();
    if (!id) return null;                      // aucun pixel déclaré
    return c.etat() === "accepte" ? id : null; // silence tant que ce n'est pas oui
  }

  function charger() {
    if (charge) return;
    var id = autorise();
    if (!id) return;
    charge = true;

    /* Le corps de l'extrait Facebook, réécrit lisiblement. `fbq` doit exister
       et empiler les appels AVANT que fbevents.js n'arrive, sinon les premiers
       événements sont perdus — c'est ce que fait la file `queue`. */
    var fbq = window.fbq;
    if (!fbq) {
      fbq = window.fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
    }

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);

    fbq("init", id);
    fbq("track", "PageView");
  }

  /* Deux moments : au chargement (visiteur qui avait déjà accepté) et à chaque
     changement de choix (il vient de cliquer « Tout accepter »). Un refus, lui,
     ne fait rien — et il n'y a rien à décharger, puisque rien n'a été chargé. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", charger);
  } else {
    charger();
  }
  window.addEventListener("alba:consentement", charger);
})();
