/* ALBA i18n, global language helper.
   IMPORTANT: this script must load AFTER lenis.min.js, whose minified build
   leaks a global class named `L` — we deliberately overwrite it here.
   Lenis itself is only ever used via the `Lenis` global, so this is safe. */
(function () {
  var lang = "fr";
  try { lang = localStorage.getItem("alba_lang") || "fr"; } catch (e) {}
  window.__albaLang = lang;
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
