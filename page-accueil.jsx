/* Script de page : montage de l'accueil.
   Ce bloc vivait en ligne dans index.html. Il en a été sorti pour qu'aucun
   script en ligne ne subsiste, ce qui permet de retirer 'unsafe-inline' de la
   politique de sécurité du contenu. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "studio",
  "density": "standard",
  "theme": "light",
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
        {/* Retour d'un essai express qui n'a pas pu s'ouvrir : le serveur
            renvoie ici avec ?essai=… Sans ce message, le visiteur revient sur
            l'accueil sans savoir ce qui s'est passé et croit le bouton cassé. */}
        <MessageEssai/>
        <Hero/>
        <Logos/>
        <Manifesto/>
        <Audience variant={tweaks.audienceVariant}/>
        {/* <Pains/> et <Features/> retirees : la page etait trop longue.
            · Pains portait « Ce que vous ne ferez plus » et les trois chiffres
              (6 h, 100 %, 4,8/5) ;
            · Features portait « Une suite complete, specialement pensee pour
              vous » et les trois onglets cockpit / decisions / chantier.
            Les composants restent definis dans sections.jsx : les remettre ne
            demande que de retirer ces commentaires. Le carrousel qui suit
            couvre deja les fonctionnalites, et la section « Partout ou vous
            travaillez » montre l'application sur les trois appareils. */}
        <FeatureCarousel/>
        <PinnedDevices/>
        {/* <CTABand/> retiré : le bandeau « Premier projet offert » faisait
            doublon avec la carte tarifaire, et remettait la gratuité en avant
            alors qu'on venait de la reculer. Le composant reste défini dans
            sections.jsx. */}
        <Pricing/>
        <TrustBand/>
        <Testimonials/>
        <Founder/>
        <Faq/>
        <Contact/>
        <Footer/>
      </div>

      {/* Le bandeau de consentement. Il ne rend RIEN tant qu'aucun traceur
          publicitaire n'est déclaré dans config.js — voir consentement.jsx. */}
      <BandeauConsentement/>
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
    fr: { links: ["Fonctionnalités", "La plateforme", "Pour qui ?", "Notre vision", "Tarif tout inclus", "Questions"], cta: "Essayer gratuitement", connexion: "Se connecter" },
    en: { links: ["Features", "The platform", "Who it is for", "Our vision", "All-in pricing", "Questions"], cta: "Try for free", connexion: "Log in" },
  };
  window.__applyNavLang = (lang) => {
    const t = NAV_TEXTS[lang] || NAV_TEXTS.fr;
    document.querySelectorAll("#nav-links a").forEach((a, i) => { if (t.links[i]) a.textContent = t.links[i]; });
    document.querySelectorAll("#mobile-menu-links a").forEach((a, i) => { if (t.links[i]) a.textContent = t.links[i]; });
    const cta = document.getElementById("nav-cta");
    if (cta) cta.textContent = t.cta;
    const mcta = document.getElementById("mobile-menu-cta");
    if (mcta) mcta.textContent = t.cta;
    for (const id of ["nav-login", "mobile-menu-login"]) {
      const el = document.getElementById(id);
      if (el) el.textContent = t.connexion;
    }
    document.querySelectorAll("#lang-toggle button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    /* Le titre est réécrit ici à chaque changement de langue. Il DOIT rester
       identique à celui du <title> d'index.html : sinon le titre correct tient
       jusqu'au premier clic sur FR/EN puis se dégrade, sans que rien ne le
       signale — le HTML servi aux robots, lui, resterait juste.
       tests/smoke.mjs compare les deux. */
    document.title = lang === "en" ? "The Platform for Demanding Architects - Alba Studio" : "La Plateforme des architectes exigeants - Alba Studio";
  };
  /* Le câblage de la bascule FR/EN vit dans i18n.js, chargé par TOUTES les
     pages. Il était ici, et sur les tarifs : les trois pages éditoriales
     n'avaient donc aucun moyen de changer de langue. */
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

/* ============================================================================
   ARRIVER SUR UNE ANCRE, ET Y RESTER
   ============================================================================
   Le clic sur une ancre de la même page était traité (immersive.jsx, via
   Lenis). L'ARRIVÉE sur une ancre ne l'était pas — et c'est le cas qui compte
   pour le pied de page, puisque « À propos », « Manifeste » et « Contact »
   pointent vers `index.html#…` dès qu'on les clique depuis /tarifs, les
   mentions légales ou l'une des deux pages de fond.

   Ce qui se passait, mesuré : arrivée sur index.html#fondateur, on atterrissait
   à 2 293 px alors que la section est à 15 671 px. Treize mille pixels d'écart.
   Pour le visiteur, le lien « ne fait rien » : la page s'ouvre quelque part au
   milieu, sans rapport avec le libellé cliqué.

   La cause n'est pas l'ancre, elle est le CALENDRIER. Le navigateur saute au
   fragment dès l'analyse du HTML, sur le document prérendu. Ensuite React monte
   les sections, les images se chargent, GSAP épingle six blocs : la page passe
   de quelques milliers de pixels à plus de vingt mille, et la cible part sous
   nos pieds. Personne ne revenait la chercher.

   On la reprend donc, tant qu'elle bouge : on recalcule la position visée, on
   s'y remet, et on s'arrête dès qu'elle est stable — ou dès que le visiteur
   touche quoi que ce soit, parce que se battre avec le doigt de quelqu'un est
   pire que de mal atterrir.

   Le décalage de 70 px est celui du gestionnaire de clic : la barre est en
   position fixe, sans réserve elle recouvre le titre visé.
   ============================================================================ */
(() => {
  const DECALAGE = 70;      // même valeur que le gestionnaire de clic
  const PATIENCE = 6000;    // au-delà, la page ne se stabilisera plus
  const STABLE = 700;       // durée sans mouvement au bout de laquelle on lâche
  const PAS = 120;

  const cible = () => {
    const h = window.location.hash;
    if (!h || h.length < 2) return null;
    try { return document.querySelector(h); } catch (e) { return null; }
  };
  if (!cible()) return;

  let abandonne = false;
  /* Le saut natif du navigateur n'est pas un geste. On n'écoute donc pas
     `scroll` — qui se déclencherait sur notre propre correction — mais
     seulement ce qui vient d'une main. */
  for (const ev of ["wheel", "touchstart", "pointerdown", "keydown"]) {
    window.addEventListener(ev, () => { abandonne = true; }, { passive: true, once: true });
  }

  const viser = () => {
    const el = cible();
    if (!el) return null;
    const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - DECALAGE);
    if (Math.abs(y - window.scrollY) >= 2) {
      /* Lenis tient sa propre position et la réimpose à chaque image : un
         window.scrollTo seul serait effacé à la frame suivante. */
      if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    }
    return y;
  };

  const debut = Date.now();
  let derniere = -1;
  let immobile = 0;
  const boucle = () => {
    if (abandonne) return;
    const y = viser();
    if (y === null) return;
    if (Math.abs(y - derniere) < 2) immobile += PAS;
    else { immobile = 0; derniere = y; }
    if (immobile >= STABLE || Date.now() - debut > PATIENCE) return;
    setTimeout(boucle, PAS);
  };
  boucle();
})();
