/* ALBA i18n, global language helper.
   IMPORTANT: this script must load AFTER lenis.min.js, whose minified build
   leaks a global class named `L` — we deliberately overwrite it here.
   Lenis itself is only ever used via the `Lenis` global, so this is safe. */
(function () {
  /* ── LA LANGUE EST DÉCIDÉE PAR L'ADRESSE, PAS PAR LA MÉMOIRE ──────────────
     Elle venait uniquement de localStorage. Une seule adresse servait donc les
     deux langues, et c'est un problème de fond, pas de confort : Google indexe
     des ADRESSES. Tout le texte anglais était invisible pour la recherche —
     personne ne pouvait tomber sur ce site en cherchant en anglais.

     /en et /en-tarifs servent désormais l'anglais, et le disent en canonique.
     La mémoire ne sert plus qu'aux visiteurs revenus sur une adresse française
     après avoir choisi l'anglais : elle ne PEUT pas contredire l'adresse, sinon
     l'adresse annoncée à Google et la page réellement affichée divergeraient. */
  var chemin = "";
  try { chemin = window.location.pathname || ""; } catch (e) {}
  var surAnglais = /^\/en(\/|-|$|\.html$)/.test(chemin) || /^\/en\.html$/.test(chemin);

  var lang = "fr";
  if (surAnglais) {
    lang = "en";
  } else {
    try { lang = localStorage.getItem("alba_lang") || "fr"; } catch (e) {}
  }
  window.__albaLang = lang;

  /* ── L'ADRESSE JUMELLE, DANS L'AUTRE LANGUE ───────────────────────────────
     Utilisée par la bascule FR/EN et par les liens internes. Elle rend null
     quand la page n'a pas de jumelle : les pages de fond et les mentions
     légales n'existent qu'en français, et leur inventer une adresse anglaise
     serait annoncer à Google une page qui n'existe pas. */
  var JUMELLES = {
    "/": "/en", "/index.html": "/en",
    "/tarifs": "/en-tarifs", "/Tarifs.html": "/en-tarifs",
    "/co-traitants": "/en-co-traitants", "/co-traitants.html": "/en-co-traitants",
    "/valeur-probante": "/en-valeur-probante", "/valeur-probante.html": "/en-valeur-probante",
    "/mentions-legales": "/en-mentions-legales", "/mentions-legales.html": "/en-mentions-legales"
  };
  var RETOURS = {
    "/en": "/", "/en.html": "/",
    "/en-tarifs": "/tarifs", "/en-tarifs.html": "/tarifs",
    "/en-co-traitants": "/co-traitants", "/en-co-traitants.html": "/co-traitants",
    "/en-valeur-probante": "/valeur-probante", "/en-valeur-probante.html": "/valeur-probante",
    "/en-mentions-legales": "/mentions-legales", "/en-mentions-legales.html": "/mentions-legales"
  };
  window.__albaJumelle = function (versLangue) {
    var table = versLangue === "en" ? JUMELLES : RETOURS;
    return Object.prototype.hasOwnProperty.call(table, chemin) ? table[chemin] : null;
  };
  /* Préfixe à poser devant un lien interne pour rester dans la même langue.
     `/tarifs` devient `/en-tarifs` en anglais, et les pages sans jumelle
     gardent leur adresse française — c'est volontaire : mieux vaut envoyer un
     anglophone sur une page française existante que sur un 404. */
  window.__albaLien = function (cheminFr) {
    if (lang !== "en") return cheminFr;
    var t = {
      "/": "/en", "/tarifs": "/en-tarifs", "/co-traitants": "/en-co-traitants",
      "/valeur-probante": "/en-valeur-probante", "/mentions-legales": "/en-mentions-legales"
    };
    return Object.prototype.hasOwnProperty.call(t, cheminFr) ? t[cheminFr] : cheminFr;
  };
  /* ── LA BASCULE, CÂBLÉE UNE SEULE FOIS POUR TOUT LE SITE ──────────────────
     Elle était câblée dans page-accueil.jsx et dans page-tarifs.jsx, c'est-à-dire
     uniquement sur les deux pages qui les chargent. Les trois pages éditoriales
     n'avaient donc aucun moyen de changer de langue — leur version anglaise
     existait sans que personne ne puisse y aller depuis le français.
     Le câblage vit ici parce que i18n.js est le seul script chargé par TOUTES
     les pages, et parce qu'il est déjà celui qui connaît les jumelles. */
  var brancherBascule = function () {
    var zone = document.getElementById("lang-toggle");
    if (!zone || zone.dataset.branchee) return;
    zone.dataset.branchee = "1";
    zone.querySelectorAll("button").forEach(function (b) {
      /* L'état actif suit l'ADRESSE, pas le balisage : le HTML statique porte
         « fr » actif sur les cinq pages, et les pages anglaises sont engendrées
         depuis lui. Sans cette ligne, /en affichait FR en surbrillance. */
      b.classList.toggle("is-active", b.dataset.lang === lang);
      b.addEventListener("click", function () {
        var vise = b.dataset.lang;
        if (vise === window.__albaLang) return;
        try { localStorage.setItem("alba_lang", vise); } catch (e) {}
        var jumelle = window.__albaJumelle(vise);
        if (jumelle) { window.location.assign(jumelle); return; }
        /* Sans jumelle, on retombe sur la traduction en place : mieux vaut
           traduire que ne rien faire. */
        if (window.__setLang) window.__setLang(vise);
      });
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", brancherBascule);
  } else {
    brancherBascule();
  }

  /* L(fr, en), returns the string for the current language */
  var helper = function (fr, en) {
    return window.__albaLang === "en" ? en : fr;
  };
  try {
    Object.defineProperty(window, "L", { value: helper, writable: false, configurable: false });
  } catch (e) {
    window.L = helper;
  }

  /* Txt(cle, fr, en) — même rôle que L, mais le texte peut être remplacé depuis
     contenu.js sans toucher au code.

     ⚠️ POURQUOI « Txt » ET SURTOUT PAS « T » — les builds minifiés de GSAP et de
     Lenis sont chargés en scripts classiques : leurs noms internes d'une ou deux
     lettres deviennent donc des GLOBAUX. Relevé dans ce navigateur :
        E  L  R  T  W  _  f  k  u  w  x  y  z  Attr  Blob  Circ  Expo  Quad  Sine
     `T` est la classe VirtualScroll de Lenis. La première version de ce code
     s'appelait T() : elle la remplaçait, et Lenis mourait sur
     « this.virtualScroll.on is not a function » — page d'accueil entièrement
     blanche, aucune section montée. Le commentaire sur `L` en tête de fichier
     décrit le même piège ; il était passé de justesse.
     Avant de renommer cet utilitaire, vérifiez que le nom visé est libre :
     tests/contenu.mjs le contrôle (« aucune bibliothèque ne revendique Txt »).

     LE POINT ESSENTIEL : les textes d'origine restent passés en arguments, donc
     ils servent de repli. contenu.js est une COUCHE DE REMPLACEMENT, jamais une
     dépendance. Si le fichier est absent, mal formé, ou qu'une clé y manque, on
     retombe sur le texte d'origine — la page s'affiche comme avant.

     C'est ce qui rend l'édition sans danger : la page transpile son JSX dans le
     navigateur, sans étape de build pour rattraper une faute de frappe. Une
     erreur de syntaxe dans un .jsx donne une page blanche. Une erreur de syntaxe
     dans contenu.js, elle, empêche seulement ce fichier de s'exécuter :
     window.ALBA_CONTENU reste indéfini et tout retombe sur les valeurs du code. */
  var Txt = function (cle, fr, en) {
    var table = window.ALBA_CONTENU;
    if (table) {
      var e = table[cle];
      /* On n'accepte qu'une chaîne non vide : une entrée à moitié remplie ne
         doit pas effacer un texte à l'écran. */
      if (e) {
        var v = window.__albaLang === "en" ? e.en : e.fr;
        if (typeof v === "string" && v.trim() !== "") return v;
      }
    }
    return helper(fr, en);
  };
  try {
    Object.defineProperty(window, "Txt", { value: Txt, writable: false, configurable: false });
  } catch (e) {
    window.Txt = Txt;
  }
})();
