/* ============================================================================
   PAGE 404 — le seul écran du site qu'on atteint sans l'avoir voulu
   ============================================================================
   POURQUOI ELLE EXISTE

   Il n'y en avait pas. Cloudflare Pages servait la sienne : une page blanche,
   sans marque, sans navigation, sans le moindre chemin de retour. Or on
   n'atterrit pas sur un 404 par curiosité — on y arrive par une adresse
   recopiée de travers, un vieux lien partagé, une capture d'écran. Autrement
   dit : par un visiteur qui voulait déjà venir.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI ELLE EST EN REACT, ET PAS EN HTML STATIQUE COMME LES ÉDITOS

   Les trois pages éditoriales ont une jumelle anglaise à une autre adresse.
   Un 404 ne peut pas : Cloudflare ne sert qu'UN fichier 404.html, pour toutes
   les adresses inconnues, dans les deux langues. Le texte doit donc pouvoir
   basculer SUR PLACE — c'est exactement ce que font Txt() et __setLang.

   La langue est celle que i18n.js a déduite : /en-quelquechose donne l'anglais,
   sinon c'est le choix mémorisé du visiteur. Un anglophone qui se trompe
   d'adresse ne tombe donc pas sur du français.

   ⚠️ AUCUN PRIX SUR CETTE PAGE. tests/montants.mjs l'interdit partout sauf sur
   la page de tarifs, et un 404 n'a rien à vendre : il a un chemin à rendre.
   ============================================================================ */
const Page404 = () => {
  const [lang, setLang] = React.useState(window.__albaLang || "fr");
  window.__albaLang = lang;
  /* C'est CETTE ligne qui permet à la bascule FR/EN de traduire sur place.
     i18n.js cherche une jumelle à rejoindre ; la page d'erreur n'en a pas, et
     retombe alors sur __setLang. Sans elle, le bouton EN ne fait rien. */
  window.__setLang = setLang;

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Page not found — ALBA Studio" : "Page introuvable — ALBA Studio";
    document.querySelectorAll("#lang-toggle button").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang));
    /* ── LA BARRE DE NAVIGATION AUSSI ───────────────────────────────────────
       Elle est en HTML statique. Sur les autres pages, outils/anglais.mjs la
       traduit AU MOMENT D'ENGENDRER la jumelle anglaise ; cette page-ci n'a pas
       de jumelle, donc personne ne la traduisait : le corps passait en anglais
       et le menu restait « Fonctionnalités · Pour qui ? · Notre vision ».
       Les libellés sont ceux de LIBELLES_NAV dans outils/anglais.mjs — s'ils
       changent là-bas, ils doivent changer ici. */
    const NAV = {
      "Fonctionnalités": "Features",
      "Pour qui ?": "Who it is for",
      "Notre vision": "Our vision",
      "Tarif": "Pricing",
      "Se connecter": "Log in",
      "Essayer gratuitement": "Try for free",
    };
    const versFr = Object.fromEntries(Object.entries(NAV).map(([f, e]) => [e, f]));
    document.querySelectorAll("#nav a").forEach((a) => {
      const t = a.textContent.trim();
      const vise = lang === "en" ? NAV[t] : versFr[t];
      if (vise) a.textContent = vise;
    });
  }, [lang]);

  /* Les quatre destinations qui couvrent la quasi-totalité des raisons d'être
     venu. Elles passent par __albaLien : un anglophone reste en anglais. */
  const lien = (chemin) => (window.__albaLien ? window.__albaLien(chemin) : chemin);
  const PISTES = [
    { href: lien("/"), titre: Txt("p404.accueil", "L'accueil", "Home"),
      quoi: Txt("p404.accueil-quoi", "Ce que fait ALBA, en une page.", "What ALBA does, on one page.") },
    { href: lien("/tarifs"), titre: Txt("p404.tarifs", "Les tarifs", "Pricing"),
      quoi: Txt("p404.tarifs-quoi", "Deux questions, et votre prix.", "Two questions, and your price.") },
    { href: lien("/co-traitants"), titre: Txt("p404.invites", "Vous avez été invité ?", "Been invited?"),
      quoi: Txt("p404.invites-quoi", "Ce que vous pouvez faire, et ce que ça coûte.", "What you can do, and what it costs.") },
    { href: `${lien("/")}#contact`, titre: Txt("p404.contact", "Nous écrire", "Write to us"),
      quoi: Txt("p404.contact-quoi", "Si vous cherchiez autre chose, dites-le-nous.", "If you were after something else, tell us.") },
  ];

  return (
    <div key={lang}>
      <main className="e404">
        <div className="container e404-corps">
          {/* Le code d'état, écrit. Un visiteur non technique ne sait pas ce
              qu'est « 404 » : le mot doit être là, le nombre n'est qu'un
              repère pour ceux à qui il parle. */}
          <div className="e404-code" aria-hidden="true">404</div>
          <h1 className="display e404-titre">
            {Txt("p404.titre-1", "Cette page", "This page")}{" "}
            <em>{Txt("p404.titre-2", "n'existe pas.", "does not exist.")}</em>
          </h1>
          <p className="e404-chapo">
            {Txt("p404.chapo",
              "L'adresse est peut-être mal recopiée, ou la page a changé de nom depuis que vous avez gardé le lien. Rien n'est perdu : voici par où reprendre.",
              "The address may have been mistyped, or the page may have been renamed since you saved the link. Nothing is lost: here is where to pick up.")}
          </p>

          <div className="e404-pistes">
            {PISTES.map((p, i) => (
              <a key={i} href={p.href} className="e404-piste">
                <span className="e404-piste-texte">
                  <span className="e404-piste-titre">{p.titre}</span>
                  <span className="e404-piste-quoi">{p.quoi}</span>
                </span>
                <Icon name="arrow-right" size={16}/>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
      {/* Un 404 est une vraie visite : elle doit pouvoir se prononcer sur la
          mesure d'audience comme n'importe quelle autre. */}
      <BandeauConsentement/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<Page404/>);
