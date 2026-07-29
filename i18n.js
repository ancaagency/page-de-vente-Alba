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
})();
