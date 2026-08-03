/* Origine de l'APPLICATION — point unique de vérité.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI CE FICHIER EXISTE
 *
 * L'adresse de l'application apparaissait à quatre endroits : la constante
 * SIGNUP_URL de sections.jsx, et les attributs href de trois CTA écrits en dur
 * dans le HTML. Le cahier des charges en avait d'ailleurs oublié un — celui de
 * Tarifs.html, qui n'a pas de menu mobile et échappait donc à la liste.
 *
 * C'est exactement le genre de dispersion qui fait rater une migration : on
 * change trois liens sur quatre, et le quatrième envoie les visiteurs sur un
 * domaine mort pendant des semaines sans que personne ne s'en aperçoive.
 *
 * Désormais tout part d'ici.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * LE JOUR DE LA BASCULE VERS app.alba-studio.co
 *
 * Changez la valeur ci-dessous, et rien d'autre dans le code.
 * Le reste de la migration (DNS, redirections, build natif) est décrit dans
 * MIGRATION-APEX.md — et l'ordre des étapes y est ce qui compte le plus.
 */
window.ALBA_APP_ORIGIN = "https://app.alba-studio.co";

/* ─────────────────────────────────────────────────────────────────────────────
 * PAIEMENT DIRECT DEPUIS LA CARTE TARIFAIRE — interrupteur
 *
 * À `true`, « S'abonner » ouvre Stripe Checkout sans passer par la création de
 * compte : le compte est créé après paiement, et Stripe renvoie l'architecte
 * sur app.alba-studio.co/bienvenue.
 *
 * À `false`, le bouton retombe sur le parcours classique — un simple lien vers
 * /inscription, qui reste valable et branché.
 *
 * ⚠️ NE PASSER À `true` QU'UNE FOIS /bienvenue PUBLIÉE.
 *
 * Ce n'est pas une précaution de principe. Entre le déploiement de la fonction
 * et la publication de la page de retour, il existe une fenêtre où un paiement
 * aboutit — argent prélevé, compte créé — et où l'architecte atterrit sur une
 * page introuvable, sans rien pour lui dire que tout s'est bien passé. Il
 * repaierait, ou il appellerait.
 *
 * Vérification avant de basculer : ouvrir https://app.alba-studio.co/bienvenue
 * dans un navigateur. Si ce n'est pas une page d'accueil, remettre `false`.
 *
 * OUVERT le 31 juillet 2026, /bienvenue confirmée en ligne.
 * ───────────────────────────────────────────────────────────────────────────── */
window.ALBA_PAIEMENT_DIRECT = true;

/* ─────────────────────────────────────────────────────────────────────────────
 * ESSAI EXPRESS — le point d'entrée de « Tester en 1 clic »
 *
 * Un POST ici crée un espace de démonstration complet et renvoie le visiteur
 * dedans, déjà connecté (303). Il ne saisit rien : ni adresse, ni mot de passe.
 *
 * ⚠️ CE BOUTON N'EST PAS UN LIEN, ET IL NE DOIT JAMAIS EN DEVENIR UN.
 *
 * Ce point d'entrée CRÉE UN COMPTE. Avec un <a href>, il en créerait un chaque
 * fois qu'un robot d'indexation suit le lien, qu'une messagerie déplie l'aperçu
 * d'une URL, ou qu'un antivirus d'entreprise vérifie une adresse — des
 * centaines de comptes sans qu'un humain ait cliqué. Le serveur refuse
 * d'ailleurs les GET en 405.
 *
 * D'où un <form method="post"> et un <button>, sans JavaScript : les robots ne
 * postent pas. tests/essai.mjs vérifie qu'aucun lien vers ce point d'entrée
 * n'est réapparu dans les pages.
 *
 * Trois choses à savoir, dites sur la page à côté du bouton :
 *   · l'espace vit 7 jours puis il est supprimé ;
 *   · aucune adresse e-mail n'est demandée ni envoyée ;
 *   · le plafond est de 3 essais par heure et 10 par jour et par adresse IP.
 *
 * ⚠️ CETTE LIGNE EST UN REMPLACEMENT, PAS LA SOURCE.
 *
 * L'adresse est écrite en dur dans <BoutonEssai/> (components.jsx) ; celle-ci
 * ne fait que la couvrir. C'est volontaire, et c'est la correction d'une panne
 * réelle : le composant EXIGEAIT cette constante et retombait sinon sur un
 * simple lien d'ancre. Un config.js d'avant son ajout, resté en cache, suffisait
 * donc à rendre le bouton inerte — on cliquait, on restait sur la page.
 *
 * Retirer cette ligne ne casse plus rien. La changer déplace le bouton.
 * ───────────────────────────────────────────────────────────────────────────── */
window.ALBA_POINT_ESSAI =
  "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/demo-express";

/* Applique l'origine aux liens du HTML statique.
 *
 * Les CTA gardent une href écrite en dur dans le HTML : elle reste correcte si
 * ce script échoue à se charger, et elle rend le lien fonctionnel avant même
 * l'exécution de JavaScript. Ce script ne fait que la réaligner si l'origine a
 * changé. Les composants React, eux, lisent SIGNUP_URL (sections.jsx).
 */
(function () {
  "use strict";

  function appliquer() {
    var origine = window.ALBA_APP_ORIGIN;
    if (!origine) return;

    document.querySelectorAll("[data-alba-auth]").forEach(function (a) {
      // /inscription et non /auth : les deux mènent au même écran, mais
      // /inscription l'ouvre sur la création de compte, /auth sur la
      // connexion (Auth.tsx, dépôt de l'application).
      a.setAttribute("href", origine + "/inscription");
    });
    // Le bouton « Se connecter » vise /auth, qui ouvre l'écran sur la
    // CONNEXION, là où /inscription l'ouvre sur la création de compte
    // (Auth.tsx, dépôt de l'application). Deux marques distinctes, pour que
    // les deux boutons suivent l'origine sans se confondre.
    document.querySelectorAll("[data-alba-login]").forEach(function (a) {
      a.setAttribute("href", origine + "/auth");
    });
    document.querySelectorAll("[data-alba-path]").forEach(function (a) {
      a.setAttribute("href", origine + a.getAttribute("data-alba-path"));
    });
    // Liens dont le TEXTE affiche aussi le domaine (prose des mentions légales).
    // Sans cela, la page continuerait d'annoncer l'ancienne adresse en toutes
    // lettres après la bascule, ce qu'aucune relecture ne rattrape.
    document.querySelectorAll("[data-alba-host]").forEach(function (a) {
      a.setAttribute("href", origine);
      try {
        a.textContent = new URL(origine).host;
      } catch (e) {
        /* origine malformée : on laisse le texte d'origine plutôt que de le vider */
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", appliquer);
  } else {
    appliquer();
  }
})();
