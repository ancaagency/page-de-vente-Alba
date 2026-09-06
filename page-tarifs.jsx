/* Script de page : montage de la page tarifs.
   Sorti de Tarifs.html pour la même raison que page-accueil.jsx. */

const PricingPage = () => {
  const [lang, setLang] = React.useState(window.__albaLang || "fr");
  window.__albaLang = lang;
  window.__setLang = setLang;
  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Pricing — ALBA Studio" : "Tarif — ALBA Studio";
    document.querySelectorAll("#lang-toggle button").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
    const cta = document.getElementById("nav-cta");
    if (cta) cta.textContent = lang === "en" ? "Try for free" : "Essayer gratuitement";
    const connexion = document.getElementById("nav-login");
    if (connexion) connexion.textContent = lang === "en" ? "Log in" : "Se connecter";
  }, [lang]);
  return (
    <div key={lang} style={{paddingTop: 72}}>
      <Pricing/>
      <TrustBand/>
      <Faq/>
      <Contact/>
      <Footer/>
      {/* Un visiteur peut arriver directement ici depuis une annonce : sans ce
          bandeau, il n'aurait aucun moyen de se prononcer, et la page ne
          pourrait jamais mesurer quoi que ce soit. */}
      <BandeauConsentement/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<PricingPage/>);

/* Le câblage de la bascule FR/EN vit dans i18n.js, chargé par TOUTES les
   pages. Il était ici, et sur les tarifs : les trois pages éditoriales
   n'avaient donc aucun moyen de changer de langue. */
