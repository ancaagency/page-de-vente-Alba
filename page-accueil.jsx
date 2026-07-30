/* Script de page : montage de l'accueil.
   Ce bloc vivait en ligne dans index.html. Il en a été sorti pour qu'aucun
   script en ligne ne subsiste, ce qui permet de retirer 'unsafe-inline' de la
   politique de sécurité du contenu. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "studio",
  "density": "standard",
  "theme": "dark",
  "typoHero": "serif",
  "audienceVariant": "A"
}/*EDITMODE-END*/;

const App = () => {
  // Combinaison de design VALIDÉE, figée.
  //
  // Cette ligne appelait `useTweaks(TWEAK_DEFAULTS)`, défini dans
  // tweaks-panel.jsx — un panneau de réglage d'auteur qui ne figurait pas dans
  // le paquet de passation. Sans lui, App levait « useTweaks is not defined » :
  // React ne montait rien et la page restait bloquée sur le rideau d'intro,
  // logo affiché. Le panneau n'ayant de toute façon rien à faire devant des
  // visiteurs, les réglages sont désormais constants.
  const tweaks = TWEAK_DEFAULTS;
  const [lang, setLang] = React.useState(window.__albaLang || "fr");

  // Make L() read the current language during this render
  window.__albaLang = lang;
  window.__setLang = setLang;

  React.useEffect(() => {
    try { localStorage.setItem("alba_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    if (window.__applyNavLang) window.__applyNavLang(lang);
  }, [lang]);

  // Apply tweaks to body
  React.useEffect(() => {
    document.body.dataset.palette = tweaks.palette;
    document.body.dataset.density = tweaks.density;
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.typo = tweaks.typoHero;
  }, [tweaks]);

  return (
    <>
      <div key={lang}>
        <Hero/>
        <Logos/>
        <Manifesto/>
        <Audience variant={tweaks.audienceVariant}/>
        <Pains/>
        <Features/>
        <FeatureCarousel/>
        <PinnedDevices/>
        <CTABand/>
        <Pricing/>
        <TrustBand/>
        <Testimonials/>
        <Founder/>
        <Faq/>
        <Contact/>
        <Footer/>
      </div>

      <Notifications lang={lang}/>
      <ImmersiveFX signal={`${tweaks.audienceVariant}-${tweaks.density}-${tweaks.theme}-${tweaks.typoHero}-${lang}`}/>

      {/* Le panneau de réglage du design (TweaksPanel / TweakSection /
          TweakRadio) vivait dans tweaks-panel.jsx, absent du paquet de
          passation. C'était un outil d'auteur : il n'a rien à faire devant
          des visiteurs, et le laisser référencé empêchait toute la page de
          se monter. Le <body> porte la combinaison validée. */}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);

/* ============================================
   Custom cursor logic
   ============================================ */
(() => {
  const dot = document.getElementById("cur-dot");
  const ring = document.getElementById("cur-ring");
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  tick();
  document.addEventListener("mouseover", (e) => {
    const t = e.target;
    if (t.closest("a, button, .pain, .benefit, .testi, .f-tab, .q, .logo-cell, .gtile, .aud-A-card, .aud-B-row, .aud-C-card, .mq-item, .mat-card, .mat-chip")) {
      ring.classList.add("hover");
      dot.classList.add("hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    const t = e.relatedTarget;
    if (!t || !t.closest || !t.closest("a, button, .pain, .benefit, .testi, .f-tab, .q, .logo-cell, .gtile, .aud-A-card, .aud-B-row, .aud-C-card, .mq-item, .mat-card, .mat-chip")) {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
    }
  });
})();

/* Nav scroll state */
(() => {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* Brand logo, full page reset (replays the intro curtain) */
(() => {
  const brand = document.getElementById("brand-home");
  if (!brand) return;
  brand.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // bypass the Lenis anchor handler
    try { sessionStorage.removeItem("alba_intro_seen"); } catch (err) {}
    window.scrollTo(0, 0);
    location.reload();
  }, true);
})();

/* Nav language toggle */
(() => {
  const NAV_TEXTS = {
    fr: { links: ["Fonctionnalités", "La plateforme", "Pour qui ?", "Notre vision", "Tarif tout inclus", "Questions"], cta: "Essayer gratuitement" },
    en: { links: ["Features", "The platform", "Who it is for", "Our vision", "All-in pricing", "Questions"], cta: "Try for free" },
  };
  window.__applyNavLang = (lang) => {
    const t = NAV_TEXTS[lang] || NAV_TEXTS.fr;
    document.querySelectorAll("#nav-links a").forEach((a, i) => { if (t.links[i]) a.textContent = t.links[i]; });
    document.querySelectorAll("#mobile-menu-links a").forEach((a, i) => { if (t.links[i]) a.textContent = t.links[i]; });
    const cta = document.getElementById("nav-cta");
    if (cta) cta.textContent = t.cta;
    const mcta = document.getElementById("mobile-menu-cta");
    if (mcta) mcta.textContent = t.cta;
    document.querySelectorAll("#lang-toggle button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    document.title = lang === "en" ? "ALBA Studio — The platform for architects" : "ALBA Studio — La plateforme des architectes";
  };
  document.querySelectorAll("#lang-toggle button").forEach((b) => {
    b.addEventListener("click", () => {
      if (window.__setLang) window.__setLang(b.dataset.lang);
    });
  });
  window.__applyNavLang(window.__albaLang || "fr");
})();

/* Mobile burger menu */
(() => {
  const burger = document.getElementById("nav-burger");
  const menu = document.getElementById("mobile-menu");
  if (!burger || !menu) return;
  const close = () => {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });
})();
