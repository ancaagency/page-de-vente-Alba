/* ============================================
   Immersive FX — GSAP + ScrollTrigger + Lenis
   All DOM-attached inits are IDEMPOTENT (dataset guards) and re-run
   whenever the React subtree remounts (lang switch, tweak variants).
   Dead ScrollTriggers on detached nodes are purged on every pass.
   ============================================ */

const splitWords = (root) => {
  const process = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const inner = document.createElement("span"); inner.className = "w-in";
          inner.textContent = p;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== "BR" && !child.classList.contains("w")) {
        process(child);
      }
    });
  };
  process(root);
  return root.querySelectorAll(".w-in");
};

/* Kill any ScrollTrigger whose trigger element left the document */
const purgeDeadTriggers = () => {
  if (typeof ScrollTrigger === "undefined") return;
  ScrollTrigger.getAll().forEach((st) => {
    const t = st.trigger;
    if (t && !document.contains(t)) st.kill();
  });
};

/* ---------- Hero constellation canvas (restartable) ---------- */
const initHeroCanvas = () => {
  const cv = document.querySelector(".hero-canvas");
  const hero = document.querySelector(".hero");
  if (!cv || !hero || cv.dataset.fx) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  cv.dataset.fx = "1";

  // Stop any previous loop drawing onto a detached canvas
  if (window.__heroCanvasStop) window.__heroCanvasStop();

  const ctx = cv.getContext("2d");
  let w = 0, h = 0, raf = 0, stopped = false;
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  const onResize = () => resize();
  window.addEventListener("resize", onResize);

  const N = Math.min(64, Math.round(w / 22)) || 40;
  const parts = Array.from({ length: N }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: 0.3 + Math.random() * 0.7,
    r: 0.6 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(0.06 + Math.random() * 0.22),
    tw: Math.random() * Math.PI * 2,
  }));

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    tmx = (e.clientX - r.left) / r.width - 0.5;
    tmy = (e.clientY - r.top) / r.height - 0.5;
  });

  const LINK = 100;
  let last = 0;
  const tick = (now) => {
    if (stopped) return;
    raf = requestAnimationFrame(tick);
    if (now - last < 33) return; // ~30fps
    last = now;
    if (document.hidden) return;
    const hr = hero.getBoundingClientRect();
    if (hr.bottom < 0) return;
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;
    ctx.clearRect(0, 0, w, h);

    const pts = [];
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.tw += 0.018;
      if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; }
      if (p.x < -12) p.x = w + 12;
      if (p.x > w + 12) p.x = -12;
      pts.push({ px: p.x + mx * 46 * p.z, py: p.y + my * 30 * p.z, p });
    }
    ctx.lineWidth = 0.5;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].px - pts[j].px;
        const dy = pts[i].py - pts[j].py;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const a = (1 - Math.sqrt(d2) / LINK) * 0.14 * Math.min(pts[i].p.z, pts[j].p.z);
          ctx.strokeStyle = `rgba(201, 168, 106, ${a})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].px, pts[i].py);
          ctx.lineTo(pts[j].px, pts[j].py);
          ctx.stroke();
        }
      }
    }
    for (const { px, py, p } of pts) {
      const a = (0.28 + 0.3 * Math.sin(p.tw)) * p.z;
      ctx.beginPath();
      ctx.arc(px, py, p.r * p.z, 0, 7);
      ctx.fillStyle = `rgba(201, 168, 106, ${Math.max(0, a)})`;
      ctx.fill();
    }
  };
  raf = requestAnimationFrame(tick);
  window.__heroCanvasStop = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
  };
};

/* ---------- Section-level FX — idempotent, re-runnable ---------- */
const initSectionFX = (coarse) => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  /* Hero */
  const hero = document.querySelector(".hero");
  const heroH1 = document.querySelector(".hero h1");
  if (hero && heroH1 && !hero.dataset.fx) {
    hero.dataset.fx = "1";

    document.querySelectorAll(".hero .reveal").forEach((el) => {
      el.style.transition = "none";
      el.classList.add("in");
    });

    const firstLoad = !window.__heroEntrancePlayed;
    window.__heroEntrancePlayed = true;
    const words = splitWords(heroH1);

    if (firstLoad) {
      const introDelay = window.__introDelay || 0;
      gsap.set(words, { yPercent: 65, autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: introDelay });
      tl.from(".hero .tag", { y: 18, autoAlpha: 0, duration: 0.7 }, 0)
        .to(words, { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.05 }, 0.15)
        .from(".hero-sub", { y: 26, autoAlpha: 0, duration: 0.85 }, 0.55)
        .from(".hero-actions", { y: 26, autoAlpha: 0, duration: 0.85 }, 0.68)
        .from(".hero-meta", { y: 18, autoAlpha: 0, duration: 0.7 }, 0.8)
        .from(".hero-mockup-wrap", { y: 120, duration: 1.4, ease: "power3.out" }, 0.6)
        .from(".hero-float", { y: 34, autoAlpha: 0, scale: 0.86, duration: 0.8, stagger: 0.14, ease: "back.out(1.6)" }, 1.35)
        .from(".hero-cue", { autoAlpha: 0, duration: 0.6 }, 1.7);
    } else {
      // Remount (e.g. language switch): show everything, quick word settle
      gsap.set(".hero .tag, .hero-sub, .hero-actions, .hero-meta, .hero-mockup-wrap, .hero-float, .hero-cue", { clearProps: "all" });
      gsap.fromTo(words, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.02, ease: "power3.out" });
    }

    // Idle float loop on the cards
    document.querySelectorAll(".hero-float").forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 ? 12 : -12,
        duration: 2.6 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: firstLoad ? (window.__introDelay || 0) + 2.2 : 0.5,
      });
    });

    // Blueprint reconstruction, the app "builds itself" out of the blue
    const overlay = document.querySelector(".build-overlay");
    if (overlay) {
      gsap.timeline({
        scrollTrigger: { trigger: ".hero-mockup-wrap", start: "top 88%", toggleActions: "play none none none" },
        delay: firstLoad ? (window.__introDelay || 0) + 0.9 : 0.2,
      })
        .fromTo(".build-layer",
          { autoAlpha: 0.1, filter: "grayscale(1) brightness(0.45) blur(5px)" },
          { autoAlpha: 1, filter: "grayscale(0) brightness(1) blur(0px)", duration: 1.7, ease: "power2.out", clearProps: "filter" }, 0)
        .fromTo(".build-scan", { top: "0%" }, { top: "100%", duration: 1.7, ease: "power2.inOut" }, 0)
        .to(".build-grid", { autoAlpha: 0, duration: 0.7 }, 1.1)
        .set(overlay, { display: "none" });
    }

    // 3D flatten of the mockup on scroll
    gsap.set(".hero-mockup", { rotateX: 10, transformOrigin: "center top" });
    gsap.to(".hero-mockup", {
      rotateX: 0, scale: 1,
      scrollTrigger: { trigger: ".hero-mockup-wrap", start: "top 85%", end: "top 15%", scrub: 1 },
    });

    // Cinematic zoom-out of hero text
    gsap.to(".hero-inner", {
      scale: 0.94, autoAlpha: 0.25, yPercent: -6,
      transformOrigin: "center top", ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "55% top", scrub: 0.8 },
    });

    // Floating cards parallax
    gsap.to(".hf-1", { yPercent: -60, ease: "none", scrollTrigger: { trigger: ".hero-mockup-wrap", start: "top 80%", end: "bottom top", scrub: 1 } });
    gsap.to(".hf-2", { yPercent: 45, ease: "none", scrollTrigger: { trigger: ".hero-mockup-wrap", start: "top 80%", end: "bottom top", scrub: 1.3 } });
    gsap.to(".hf-3", { yPercent: -35, ease: "none", scrollTrigger: { trigger: ".hero-mockup-wrap", start: "top 80%", end: "bottom top", scrub: 0.8 } });

    // Scroll cue fade
    gsap.to(".hero-cue", { autoAlpha: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top-=60", end: "top top-=260", scrub: true } });

    // Mouse tilt + spotlight
    if (!coarse) {
      const spot = document.createElement("div");
      spot.className = "hero-spotlight";
      hero.appendChild(spot);
      const spotX = gsap.quickTo(spot, "left", { duration: 0.5, ease: "power3" });
      const spotY = gsap.quickTo(spot, "top", { duration: 0.5, ease: "power3" });
      const mock = document.querySelector(".hero-mockup .mockup") || document.querySelector(".hero-mockup .realshot");
      const rotY = mock ? gsap.quickTo(mock, "rotationY", { duration: 0.7, ease: "power3" }) : null;
      const rotX = mock ? gsap.quickTo(mock, "rotationX", { duration: 0.7, ease: "power3" }) : null;
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        spotX(e.clientX - r.left);
        spotY(e.clientY - r.top);
        if (rotY && rotX) {
          const wrap = document.querySelector(".hero-mockup-wrap");
          if (!wrap) return;
          const wr = wrap.getBoundingClientRect();
          rotY(((e.clientX - wr.left) / wr.width - 0.5) * 5);
          rotX(-((e.clientY - wr.top) / wr.height - 0.5) * 3.5);
        }
      });
      hero.addEventListener("mouseleave", () => { if (rotY && rotX) { rotY(0); rotX(0); } });
    }
  }

  initHeroCanvas();

  /* Section headings, word reveals */
  document.querySelectorAll(".s-head h2, .aud2-head h2, .gallery-head h2, .final-cta h2, .contact-side h2").forEach((h) => {
    if (h.dataset.split) return;
    if (h.closest(".feat-carousel")) return; // slides du carrousel : pas de reveal scroll (offsets faussés)
    h.dataset.split = "1";
    const words = splitWords(h);
    gsap.set(words, { yPercent: 55, autoAlpha: 0 });
    gsap.to(words, {
      yPercent: 0, autoAlpha: 1, duration: 0.95, stagger: 0.04, ease: "power4.out",
      scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
    });
  });

  /* Product tour — 3D slide-in + parallax */
  gsap.utils.toArray(".tour-row").forEach((row) => {
    if (row.dataset.fx) return;
    row.dataset.fx = "1";
    row.style.transition = "none";
    row.classList.add("in");
    const stage = row.querySelector(".tour-stage");
    const text = row.querySelector(".tour-text");
    const dir = row.classList.contains("reverse") ? -1 : 1;
    if (stage) {
      gsap.from(stage, {
        autoAlpha: 0, x: 70 * dir, rotationY: 9 * dir, transformPerspective: 1400,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.to(stage, {
        y: -34,
        scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }
    if (text) {
      gsap.from(text, {
        autoAlpha: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 75%", toggleActions: "play none none reverse" },
      });
    }
  });

  /* Benefits, count-up stats */
  document.querySelectorAll(".benefit-stat b").forEach((el) => {
    if (el.dataset.fx) return;
    el.dataset.fx = "1";
    const txt = el.textContent.trim();
    const m = txt.match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[1].replace(",", "."));
    const suffix = m[2];
    const isInt = Number.isInteger(target);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true,
      onEnter: () => gsap.to(obj, {
        v: target, duration: 1.8, ease: "power2.out",
        onUpdate: () => { el.textContent = (isInt ? Math.round(obj.v) : obj.v.toFixed(1)) + suffix; },
      }),
    });
  });

  /* Gallery, parallax tiles */
  const gGrid = document.querySelector(".gallery-grid");
  if (gGrid && !gGrid.dataset.fx) {
    gGrid.dataset.fx = "1";
    const speeds = { "g-1": -36, "g-2": 30, "g-3": -24, "g-4": 40, "g-5": -20 };
    Object.entries(speeds).forEach(([cls, dist]) => {
      const el = gGrid.querySelector(`.gtile.${cls}`);
      if (!el) return;
      gsap.to(el, {
        y: dist, ease: "none",
        scrollTrigger: { trigger: gGrid, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    });
  }

  /* Final CTA — scale in */
  const fcta = document.querySelector(".final-cta h2");
  if (fcta && !fcta.dataset.fx) {
    fcta.dataset.fx = "1";
    gsap.fromTo(fcta,
      { scale: 0.93, autoAlpha: 0.5 },
      { scale: 1, autoAlpha: 1, ease: "none",
        scrollTrigger: { trigger: ".final-cta", start: "top 85%", end: "center 55%", scrub: 1 } }
    );
  }

  /* Steps, cascade */
  const steps = document.querySelector(".steps");
  if (steps && !steps.dataset.fx) {
    steps.dataset.fx = "1";
    gsap.utils.toArray(".step").forEach((st, i) => {
      gsap.from(st.querySelector(".step-num"), {
        scale: 0, rotate: -90, duration: 0.7, ease: "back.out(1.8)",
        scrollTrigger: { trigger: steps, start: "top 78%", toggleActions: "play none none reverse" },
        delay: i * 0.12,
      });
    });
  }

  /* Magnetic buttons */
  if (!coarse) {
    document.querySelectorAll(".btn-primary, .float-cta").forEach((btn) => {
      if (btn.dataset.magnetic) return;
      btn.dataset.magnetic = "1";
      btn.style.transitionProperty = "background, color, border-color, box-shadow, opacity";
      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
      });
      btn.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }
};

/* Bouton flottant : « Tester en 1 clic ».
 *
 * Il menait a #contact, c'est-a-dire a un formulaire de demande de demo — on
 * demandait a l'architecte son nom et son adresse avant de lui montrer quoi que
 * ce soit. Il mene desormais au carrousel #fonctionnalites, qui EST le
 * simulateur : cinq ecrans reels de l'application (Leo, meteo, materiaux,
 * calendrier, messagerie) sur lesquels on peut cliquer tout de suite, sans
 * compte et sans rendez-vous.
 *
 * Consequence sur la regle d'affichage : le bouton se cachait a l'approche du
 * formulaire de contact. Il se cache maintenant quand le carrousel est a
 * l'ecran — proposer d'aller voir ce qu'on est deja en train de regarder n'a
 * aucun sens. Et comme le carrousel arrive tot dans la page, le bouton ne
 * reapparait qu'une fois qu'on l'a depasse.
 */
const FloatingCTA = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const past = window.scrollY > vh * 1.2;
      const demo = document.getElementById("fonctionnalites");
      // Visible a l'ecran, meme partiellement.
      const r = demo && demo.getBoundingClientRect();
      const surEcran = r && r.top < vh && r.bottom > 0;
      const contact = document.getElementById("contact");
      const nearContact = contact && contact.getBoundingClientRect().top < vh * 0.9;
      setShow(past && !surEcran && !nearContact);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#fonctionnalites" className={`float-cta ${show ? "show" : ""}`}>
      <span className="fc-dot"/> {L("Tester en 1 clic", "Try it in one click")}
    </a>
  );
};

const ScrollTop = () => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      setShow(window.scrollY > vh * 1.2);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) ref.current.style.setProperty("--sp", p.toFixed(3));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button ref={ref} className={`scroll-top ${show ? "show" : ""}`} onClick={toTop} aria-label={L("Remonter en haut", "Back to top")}>
      <svg className="st-ring" viewBox="0 0 54 54"><circle cx="27" cy="27" r="25"/></svg>
      <Icon name="arrow-right" size={18} style={{transform: "rotate(-90deg)"}}/>
    </button>
  );
};

const ImmersiveFX = ({ signal }) => {
  const inited = React.useRef(false);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* One-time global setup: Lenis, anchors, intro curtain, nav hide */
  React.useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || reduced) {
      const intro = document.getElementById("intro");
      if (intro) intro.style.display = "none";
      document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    /* Lenis smooth scroll */
    let lenis = null;
    if (typeof Lenis !== "undefined") {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* Anchor links through Lenis */
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      if (lenis) lenis.scrollTo(top, { duration: 1.4 });
      else window.scrollTo({ top, behavior: "smooth" });
    });

    /* Intro curtain */
    const intro = document.getElementById("intro");
    window.__introDelay = 0;
    if (intro && !sessionStorage.getItem("alba_intro_seen")) {
      window.__introDelay = 1.9;
      sessionStorage.setItem("alba_intro_seen", "1");
      const introTl = gsap.timeline();
      introTl
        // le soleil se lève derrière l'horizon
        .to("#intro .intro-horizon", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0)
        .to("#intro .intro-sun", { y: "-42%", opacity: 1, duration: 1.7, ease: "power1.out" }, 0.15)
        // le logo naît de la lumière
        .from("#intro .intro-mark", { scale: 0.6, autoAlpha: 0, duration: 0.55, ease: "back.out(1.7)" }, 0.55)
        .from("#intro .intro-name", { y: 16, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, 0.75)
        .to("#intro-line", { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.9)
        .to("#intro", { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, 1.55)
        .set("#intro", { display: "none" });
    } else if (intro) {
      intro.style.display = "none";
    }

    /* Nav, hide down / show up (nav lives outside React, safe to do once) */
    const nav = document.getElementById("nav");
    if (nav) {
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 500) nav.classList.add("hide");
          else nav.classList.remove("hide");
        },
      });
    }

    /* First FX pass */
    initSectionFX(coarse);

    /* Refresh hooks */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    let rto = null;
    const ro = new ResizeObserver(() => {
      clearTimeout(rto);
      rto = setTimeout(() => ScrollTrigger.refresh(), 220);
    });
    const appEl = document.getElementById("app");
    if (appEl) ro.observe(appEl);
  }, []);

  /* Re-init on every remount signal (lang switch, tweak variant change) */
  React.useEffect(() => {
    if (reduced || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    const t = setTimeout(() => {
      purgeDeadTriggers();
      initSectionFX(coarse);
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(t);
  }, [signal]);

  return <><FloatingCTA/><ScrollTop/></>;
};

window.ImmersiveFX = ImmersiveFX;
