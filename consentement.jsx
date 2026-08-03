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

const CLE_CONSENTEMENT = "alba_consentement";
/* Six mois. C'est la durée que recommande la CNIL avant de redemander à
   quelqu'un qui a refusé. On l'applique aussi à l'acceptation : passé ce
   délai, le consentement n'est plus « éclairé », il est simplement ancien. */
const DUREE_CONSENTEMENT = 182 * 24 * 60 * 60 * 1000;

/** Le pixel est-il déclaré ? Sans identifiant, il n'y a rien à consentir. */
const pixelDeclare = () => {
  const id = typeof window !== "undefined" ? window.ALBA_PIXEL_FACEBOOK : null;
  return typeof id === "string" && id.trim() !== "" ? id.trim() : null;
};

/** Le choix enregistré, ou null s'il n'y en a pas / s'il a expiré. */
const lireConsentement = () => {
  try {
    const brut = window.localStorage.getItem(CLE_CONSENTEMENT);
    if (!brut) return null;
    const c = JSON.parse(brut);
    if (!c || (c.choix !== "accepte" && c.choix !== "refuse")) return null;
    if (!c.date || Date.now() - c.date > DUREE_CONSENTEMENT) return null;
    return c.choix;
  } catch (e) {
    /* Mode privé strict, stockage plein, JSON abîmé : on se comporte comme si
       rien n'avait été répondu. Jamais comme si tout avait été accepté. */
    return null;
  }
};

const ecrireConsentement = (choix) => {
  try {
    window.localStorage.setItem(CLE_CONSENTEMENT,
      JSON.stringify({ choix: choix, date: Date.now(), version: 1 }));
  } catch (e) { /* on continue : le choix vaut au moins pour cette visite */ }
};

/* Point d'entrée public, lu par pixel-facebook.js et par le pied de page.
   Il est défini MÊME quand le pixel n'est pas déclaré : c'est ce qui permet au
   chargeur de refuser de se déclencher sans avoir à connaître ce fichier. */
if (typeof window !== "undefined") {
  window.albaConsentement = {
    etat: lireConsentement,
    pixel: pixelDeclare,
    /* Rouvre le choix. Utilisé par le lien « Cookies » du pied de page — le
       retrait doit être aussi simple que le consentement. */
    rouvrir: function () {
      try { window.localStorage.removeItem(CLE_CONSENTEMENT); } catch (e) {}
      window.dispatchEvent(new Event("alba:consentement"));
    },
  };
}

const BandeauConsentement = () => {
  const [choix, setChoix] = React.useState(() =>
    (typeof window === "undefined" ? "refuse" : lireConsentement()));

  React.useEffect(() => {
    const relire = () => setChoix(lireConsentement());
    window.addEventListener("alba:consentement", relire);
    return () => window.removeEventListener("alba:consentement", relire);
  }, []);

  const repondre = (valeur) => {
    ecrireConsentement(valeur);
    setChoix(valeur);
    // Le chargeur écoute : il déclenche le pixel si, et seulement si, c'est oui.
    window.dispatchEvent(new Event("alba:consentement"));
  };

  // Rien de non dispensé à déclarer, ou choix déjà fait : aucun bandeau.
  if (!pixelDeclare() || choix !== null) return null;

  return (
    <div className="consentement" role="dialog" aria-live="polite"
         aria-label={L("Choix concernant les traceurs", "Tracker choices")}>
      <div className="consentement-texte">
        <p>
          {L("Nous aimerions déposer un traceur publicitaire pour mesurer l'efficacité de nos annonces. Il n'est pas nécessaire au fonctionnement du site, et le refuser ne change rien à votre visite.",
             "We'd like to set an advertising tracker to measure how well our ads perform. It isn't needed for the site to work, and refusing changes nothing about your visit.")}
        </p>
        <a href="mentions-legales.html#cookies">{L("En savoir plus", "Learn more")}</a>
      </div>
      {/* Les deux boutons sont volontairement de même classe, de même taille et
          côte à côte. Un « refuser » discret serait un consentement extorqué :
          la CNIL exige que refuser soit aussi simple qu'accepter. */}
      <div className="consentement-choix">
        <button type="button" className="btn btn-ghost" onClick={() => repondre("refuse")}>
          {L("Tout refuser", "Reject all")}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => repondre("accepte")}>
          {L("Tout accepter", "Accept all")}
        </button>
      </div>
    </div>
  );
};

/* Entrée « Cookies » du pied de page. Elle ne s'affiche que si un traceur
   publicitaire est déclaré : sans cela, elle ouvrirait un bandeau vide et
   ferait croire à un choix qui n'existe pas. */
const LienConsentement = () => {
  if (!pixelDeclare()) return null;
  return (
    <li>
      <a href="#" onClick={(ev) => { ev.preventDefault(); window.albaConsentement.rouvrir(); }}>
        {L("Cookies", "Cookies")}
      </a>
    </li>
  );
};

window.BandeauConsentement = BandeauConsentement;
window.LienConsentement = LienConsentement;
