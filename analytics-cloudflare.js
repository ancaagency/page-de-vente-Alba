/* ═════════════════════════════════════════════════════════════════════════════
   MESURE D'AUDIENCE — Cloudflare Web Analytics

   Ce chargeur ne ressemble PAS aux deux autres, et il faut comprendre pourquoi
   avant d'y toucher.

   pixel-facebook.js et analytics-google.js attendent DEUX feux verts : un
   identifiant déclaré, et le consentement du visiteur. Celui-ci n'en attend
   qu'un : l'identifiant. C'est délibéré.

   Une mesure d'audience qui ne dépose aucun cookie, ne suit personne d'un site
   à l'autre et ne produit que des statistiques agrégées relève des traitements
   dispensés de consentement par l'article 82 de la loi Informatique et
   Libertés. Lui demander un consentement dont elle n'a pas besoin ferait
   apparaître un bandeau — et un bandeau coûte des conversions ET fait perdre la
   moitié des visiteurs dans les statistiques. On perdrait deux fois, pour rien.

   ─────────────────────────────────────────────────────────────────────────────
   SI VOUS VOULEZ QUAND MÊME LA METTRE DERRIÈRE LE CONSENTEMENT

   Une seule ligne à ajouter dans `autorise()`, marquée ci-dessous. Le bandeau
   apparaîtra alors tout seul, puisqu'il se déclenche dès qu'un traceur non
   dispensé est déclaré — il faudrait aussi l'annoncer dans consentement.jsx,
   sans quoi le bandeau ne nommerait pas ce qu'il demande.

   ─────────────────────────────────────────────────────────────────────────────
   CE QUI N'A PAS PU ÊTRE VÉRIFIÉ ICI

   L'environnement où ce fichier a été écrit refuse les connexions vers
   static.cloudflareinsights.com. Le script de Cloudflare n'a donc pas pu être
   téléchargé ni observé. Les contrôles prouvent que CE fichier n'appelle rien
   et ne dépose rien tant que le jeton est absent ; ils ne prouvent rien sur le
   script de Cloudflare lui-même.

   Vérification à faire une fois en ligne, en navigation privée : F12 →
   Application → Cookies et Local Storage doivent rester vides. Si ce n'est pas
   le cas, remettez `window.ALBA_ANALYTICS_CF = null` dans config.js — il n'y a
   rien d'autre à défaire.

   ─────────────────────────────────────────────────────────────────────────────
   POURQUOI UN CHARGEUR PLUTÔT QUE LA BALISE FOURNIE PAR CLOUDFLARE

   L'extrait de Cloudflare est une balise <script> avec le jeton en attribut.
   Elle passerait telle quelle — ce n'est pas du script en ligne. Mais elle
   figerait le jeton dans les trois pages HTML, en trois exemplaires. Ici il
   vient de config.js, comme toutes les autres adresses du site : un seul
   endroit à changer, et un contrôle possible.
   ═════════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var charge = false;

  function autorise() {
    var jeton = window.ALBA_ANALYTICS_CF;
    if (typeof jeton !== "string" || jeton.trim() === "") return null;

    /* POUR LA SOUMETTRE AU CONSENTEMENT, décommentez ces deux lignes :
       var c = window.albaConsentement;
       if (!c || c.etat() !== "accepte") return null;                        */

    return jeton.trim();
  }

  function charger() {
    if (charge) return;
    var jeton = autorise();
    if (!jeton) return;
    charge = true;

    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    /* Le jeton se transmet par attribut, pas dans l'adresse : c'est la forme
       qu'attend le script. JSON.stringify plutôt qu'une concaténation — un
       jeton mal recopié, avec un guillemet, produirait sinon un attribut
       invalide et une mesure silencieusement morte. */
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: jeton }));
    document.head.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", charger);
  } else {
    charger();
  }
  /* Utile seulement si vous l'avez soumise au consentement ci-dessus ; inoffensif
     sinon, puisque `charge` empêche tout second chargement. */
  window.addEventListener("alba:consentement", charger);
})();
