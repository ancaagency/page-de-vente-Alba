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
  }, [lang]);
  return (
    <div key={lang} style={{paddingTop: 72}}>
      <Pricing/>
      <TrustBand/>
      <Faq/>
      <Contact/>
      <Footer/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<PricingPage/>);

document.querySelectorAll("#lang-toggle button").forEach((b) => {
  b.addEventListener("click", () => { if (window.__setLang) window.__setLang(b.dataset.lang); });
});
