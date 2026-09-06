/* Pinned scroll section — Mobile / Bureau / Terrain
   Desktop: sticky scroll-pinning. Mobile (≤900px): simple stacked blocks. */

const PinnedDevices = () => {
  const sectionRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const navRef = React.useRef(null);
  const [mobile] = React.useState(() => window.matchMedia("(max-width: 900px)").matches);

  React.useEffect(() => {
    if (mobile) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        let p = -rect.top / total;
        p = Math.max(0, Math.min(1, p));

        const idx = Math.min(1, Math.floor(p * 2));
        // setState ONLY when the pane changes, progress bar is driven via direct DOM writes
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
        const local = Math.max(0, Math.min(1, (p - idx / 2) * 2));
        const nav = navRef.current;
        if (nav) {
          nav.querySelectorAll(".pinned-nav-progress").forEach((bar, i) => {
            bar.style.width = i === idx ? `${local * 100}%` : "0%";
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mobile]);

  const goTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (i / 2) * total + 4;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const panes = [
    {
      eyebrow: L("01 — Bureau", "01 — Office"),
      h: L("Au bureau", "At the office"),
      lead: L("Vous orchestrez votre semaine d'un seul écran.", "You orchestrate your week from a single screen."),
      p: L("Vue agence, pilotage multi-projets, gestion des co-traitants, exports comptables. ALBA s'installe entre votre table à dessin et votre boîte mail, et remplace les deux quand il s'agit de coordonner.", "Practice view, multi-project steering, consultant management, accounting exports. ALBA sits between your drawing board and your inbox, and replaces both when it comes to coordination."),
    },
    {
      eyebrow: L("02 — Terrain & mobile", "02 — On site & mobile"),
      h: L("Sur le terrain", "On site"),
      lead: L("Sur tablette au chantier, sur mobile dans la poche de vos clients.", "On tablet at the site, on mobile in your clients' pocket."),
      p: L("Annotation des plans depuis la tablette, photos géolocalisées, PV générés automatiquement. Et côté maître d'ouvrage : notifications quand une décision l'attend, validation en un geste depuis son téléphone. L'application ALBA est disponible sur iOS et Android, et fonctionne aussi dans le navigateur.", "Annotate drawings from the tablet, geolocated photos, auto-generated site reports. And for your client: notifications when a decision awaits, one-tap approval from their phone. The ALBA app is available on iOS and Android, and also runs in the browser."),
      apps: true,
    },
  ];

  const visuals = [
    /* BUREAU — capture réelle */
    <div className="dev-shot laptop-shot" key="ordinateur">
      <Photo src="uploads/ordinateur-crop.png" alt={L("ALBA Studio sur ordinateur — budget de projet", "ALBA Studio on desktop — project budget")} sizes="(max-width: 760px) 92vw, 640px"/>
    </div>,
    /* TERRAIN — tablette + mobile, captures réelles */
    <div className="dev-duo" key="terrain">
      <div className="dev-shot tablet-shot">
        <Photo src="uploads/tablette-crop.png" alt={L("ALBA Studio sur tablette — maîtres d'ouvrage & intervenants", "ALBA Studio on tablet — clients & partners")} sizes="(max-width: 760px) 70vw, 530px"/>
      </div>
      <div className="dev-shot phone-shot">
        <Photo src="uploads/mobile-crop.png" alt={L("ALBA Studio sur mobile — projet Grange Lissieu", "ALBA Studio on mobile — Grange Lissieu project")} sizes="(max-width: 760px) 32vw, 230px"/>
      </div>
    </div>,
  ];

  /* ---------- Mobile: simple stacked blocks, no pinning ---------- */
  if (mobile) {
    return (
      <section className="pinned-section is-mobile" id="devices">
        <div className="pm-head">
          <span className="eyebrow">{L("— Partout où vous travaillez —", "— Everywhere you work —")}</span>
        </div>
        {panes.map((pane, i) => (
          <div key={i} className="pm-block" data-tone={i}>
            <div className="pinned-pane-text is-active pm-text">
              <span className="pinned-eyebrow">{pane.eyebrow}</span>
              <h2>{pane.h}</h2>
              <p className="lead"><b>{pane.lead}</b></p>
              <p>{pane.p}</p>
              {pane.apps && <StoreBadges theme="light"/>}
            </div>
            <div className="pm-visual">{visuals[i]}</div>
          </div>
        ))}
      </section>
    );
  }

  /* ---------- Desktop: sticky pinned scroll ---------- */
  return (
    <section ref={sectionRef} className="pinned-section" id="devices">
      <div className="pinned-stage" data-active={active}>
        <div className="pinned-bg"/>
        <div className="pinned-grid"/>

        <div className="pinned-head">
          <span className="eyebrow">{L("— Partout où vous travaillez —", "— Everywhere you work —")}</span>
        </div>

        <div className="pinned-inner">
          <div className="pinned-text">
            {panes.map((pane, i) => (
              <div key={i} className={`pinned-pane-text ${active === i ? "is-active" : ""}`}>
                <span className="pinned-eyebrow">{pane.eyebrow}</span>
                <h2>{pane.h}</h2>
                <p className="lead"><b>{pane.lead}</b></p>
                <p>{pane.p}</p>
                {pane.apps && <StoreBadges theme="light"/>}
              </div>
            ))}
          </div>

          <div className="pinned-visual">
            {visuals.map((v, i) => (
              <div key={i} className={`pinned-pane-visual ${active === i ? "is-active" : ""}`}>{v}</div>
            ))}
          </div>
        </div>

        <button className="pinned-arrow left" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Précédent">
          <Icon name="arrow-right" size={18} style={{transform: "scaleX(-1)"}}/>
        </button>
        <button className="pinned-arrow right" onClick={() => goTo(Math.min(1, active + 1))} disabled={active === 1} aria-label="Suivant">
          <Icon name="arrow-right" size={18}/>
        </button>

        <div className="pinned-nav" ref={navRef}>
          {[L("Au bureau", "At the office"), L("Sur le terrain", "On site")].map((label, i) => (
            <div
              key={i}
              className={`pinned-nav-item ${active === i ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="pinned-nav-progress"/>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.PinnedDevices = PinnedDevices;