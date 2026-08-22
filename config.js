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

/* ─────────────────────────────────────────────────────────────────────────────
 * PIXEL FACEBOOK — interrupteur, éteint
 *
 * `null` : aucun pixel. Aucune requête vers Facebook, et AUCUN bandeau de
 * consentement — parce qu'il n'y aurait rien à consentir. C'est l'état actuel,
 * et il est délibéré : la page ne dépose aucun cookie, et les deux seules
 * choses qu'elle conserve (langue choisie, rideau d'intro déjà joué) sont
 * dispensées de consentement par l'article 82 de la loi Informatique et
 * Libertés. Demander un consentement sans objet est trompeur, et coûte des
 * conversions pour rien.
 *
 * POUR L'ALLUMER — remplacez null par l'identifiant, entre guillemets :
 *
 *     window.ALBA_PIXEL_FACEBOOK = "123456789012345";
 *
 * Le bandeau apparaît alors tout seul, le pixel ne se charge que si le visiteur
 * a cliqué « Tout accepter », et le lien « Cookies » du pied de page lui permet
 * de revenir sur son choix.
 *
 * ⚠️ DEUX CHOSES NE SUIVENT PAS TOUTES SEULES, et le pixel restera muet sans
 * elles. Les deux sont écrites noir sur blanc dans _headers, section
 * « Recette pixel » :
 *   1. la CSP doit autoriser connect.facebook.net et www.facebook.com — sinon
 *      le navigateur bloque le script sans que rien ne le montre à l'écran ;
 *   2. la section 6 des mentions légales doit être remplacée par le bloc prévu.
 *      Un bandeau qui demande le consentement pendant qu'une page légale
 *      affirme « ce site ne dépose aucun cookie » est pire que pas de bandeau.
 *
 * tests/smoke.mjs vérifie les deux états : éteint, rien ne part vers Facebook
 * et aucun bandeau n'apparaît ; allumé, rien ne part TANT QUE le visiteur n'a
 * pas accepté.
 * ───────────────────────────────────────────────────────────────────────────── */
window.ALBA_PIXEL_FACEBOOK = null;

/* ─────────────────────────────────────────────────────────────────────────────
 * GOOGLE ANALYTICS (GA4) — interrupteur, éteint
 *
 * Même mécanique que le pixel : `null` = rien du tout, ni bandeau ni requête.
 * Pour l'allumer, l'identifiant de flux entre guillemets :
 *
 *     window.ALBA_GA4 = "G-XXXXXXXXXX";
 *
 * ⚠️ CE QU'IL FAUT SAVOIR AVANT DE L'ALLUMER — ce n'est pas un détail juridique,
 * ça change ce que vous mesurerez réellement.
 *
 * Google Analytics N'EST PAS dispensé de consentement. La CNIL tient une liste
 * de solutions de mesure d'audience exemptées, qui peuvent tourner sans aucun
 * bandeau ; Google Analytics n'y figure pas, et n'y a jamais figuré. L'allumer
 * fait donc apparaître le bandeau de consentement sur la page — dès
 * maintenant, pas à la rentrée.
 *
 * Conséquence concrète, et elle est double :
 *   · le bandeau coûte des conversions sur une page de vente ;
 *   · vous ne mesurerez QUE les visiteurs qui acceptent. Les autres sont
 *     invisibles. Les taux de refus observés sur ce type de bandeau se situent
 *     couramment entre un tiers et la moitié des visiteurs : vos statistiques
 *     ne décriront pas votre trafic, elles décriront la moitié qui a cliqué
 *     « oui ». Pour comparer deux campagnes, c'est un biais qui se déplace.
 *
 * L'alternative, si le but est de savoir COMBIEN de gens viennent et d'où : une
 * mesure d'audience dispensée de consentement (la CNIL en certifie plusieurs).
 * Elle voit 100 % des visiteurs, sans bandeau. Elle ne fait pas de suivi
 * publicitaire — mais ce n'est pas ce qu'on lui demande.
 *
 * Si le pixel Facebook arrive de toute façon à la rentrée, le bandeau viendra
 * avec lui : allumer les deux le même jour ne coûte alors qu'une seule fois.
 *
 * ⚠️ ET COMME POUR LE PIXEL, deux choses ne suivent pas toutes seules — voir
 * _headers, section « Recette pixel », qui vaut aussi pour GA4 :
 *   1. la CSP doit autoriser googletagmanager.com et google-analytics.com ;
 *   2. la section 6 des mentions légales doit être remplacée.
 * ───────────────────────────────────────────────────────────────────────────── */
window.ALBA_GA4 = null;

/* ─────────────────────────────────────────────────────────────────────────────
 * MESURE D'AUDIENCE — Cloudflare Web Analytics
 *
 * Celle-ci est différente des deux précédentes, et la différence est tout
 * l'intérêt : elle ne dépose aucun cookie, ne suit personne d'un site à
 * l'autre, et ne demande donc AUCUN consentement. Pas de bandeau, et elle voit
 * 100 % des visiteurs — pas seulement ceux qui auraient cliqué « oui ».
 *
 * POUR L'ALLUMER — le jeton du tableau de bord Cloudflare, entre guillemets :
 *
 *     window.ALBA_ANALYTICS_CF = "0123456789abcdef0123456789abcdef";
 *
 * Cloudflare → Analytics & Logs → Web Analytics → Add a site → « Manual
 * installation » : le jeton est la valeur `token` de l'extrait proposé.
 * Il n'y a rien d'autre à faire : la CSP autorise déjà ce script.
 *
 * ⚠️ N'ACTIVEZ PAS l'injection automatique proposée par Cloudflare Pages.
 * Elle ajoute le script côté serveur, après notre HTML : le jeton n'est plus
 * dans le dépôt, personne ne sait plus d'où vient ce script, et le contrôle
 * tests/smoke.mjs ne peut plus rien vérifier. Le passer par ce fichier garde
 * une seule source de vérité.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI CELLE-CI PLUTÔT QU'UNE AUTRE
 *
 * Le site est DÉJÀ servi par Cloudflare : chaque requête de chaque visiteur
 * passe déjà par eux, adresse IP comprise. Leur confier la mesure d'audience ne
 * transfère donc rien de nouveau à personne — ce qui n'est vrai d'aucun autre
 * fournisseur. À cela s'ajoute qu'elle est gratuite et sans cookie.
 *
 * ⚠️ CE QUE JE N'AI PAS PU VÉRIFIER MOI-MÊME
 *
 * L'environnement où ce code a été écrit refuse les connexions vers
 * static.cloudflareinsights.com : je n'ai pas pu télécharger le script de
 * Cloudflare ni observer son comportement réel. Les contrôles automatiques
 * prouvent que NOTRE code ne dépose rien et n'appelle rien tant que le jeton
 * est absent ; ils ne prouvent pas les affirmations de Cloudflare sur leur
 * propre script.
 *
 * La vérification tient en trente secondes, une fois en ligne :
 *   ouvrir www.alba-studio.co en navigation privée → F12 → Application →
 *   Cookies et Local Storage. Il ne doit RIEN y avoir.
 * Si un cookie apparaît, repassez ce fichier à `null` : la page redevient
 * instantanément exempte de bandeau, et rien d'autre n'est à défaire.
 *
 * Pour la mettre derrière le consentement plutôt que de la retirer, il suffit
 * d'ajouter la vérification d'état dans analytics-cloudflare.js — le
 * commentaire de tête y indique où.
 * ───────────────────────────────────────────────────────────────────────────── */
window.ALBA_ANALYTICS_CF = null;

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
