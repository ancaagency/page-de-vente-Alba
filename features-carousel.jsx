/* Carrousel Fonctionnalités — regroupe Bibliothèque, Calendrier, Messagerie */

const FeatureCarousel = () => {
  const slides = [
    { key: "assistant", num: "01", label: Txt("carrousel.assistant-leo", "Assistant Léo", "Léo assistant"), Comp: window.AssistantDemo, novel: true },
    { key: "meteo", num: "02", label: Txt("carrousel.meteo-chantier", "Météo chantier", "Site weather"), Comp: window.WeatherDemo, novel: true },
    { key: "materiaux", num: "03", label: Txt("carrousel.bibliotheque-materiaux", "Bibliothèque matériaux", "Material library"), Comp: window.Materials },
    { key: "calendrier", num: "04", label: Txt("carrousel.calendrier", "Calendrier", "Calendar"), Comp: window.CalendarDemo },
    { key: "messagerie", num: "05", label: Txt("carrousel.messagerie", "Messagerie", "Messaging"), Comp: window.Chat },
  ];
  const [idx, setIdx] = React.useState(0);
  const [h, setH] = React.useState(null);
  const slideRefs = React.useRef([]);
  const touch = React.useRef(null);
  const go = (i) => setIdx(Math.max(0, Math.min(slides.length - 1, i)));

  React.useEffect(() => {
    const measure = () => {
      const el = slideRefs.current[idx];
      if (el) setH(el.scrollHeight);
    };
    measure();
    const t = setTimeout(measure, 400);
    const el = slideRefs.current[idx];
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); if (ro) ro.disconnect(); };
  }, [idx]);

  return (
    <section className="feat-carousel" id="fonctionnalites">
      <div className="container">
        <div className="fc-bar">
          <div className="fc-tabs">
            {slides.map((s, i) => (
              <button key={s.key} className={`fc-tab ${idx === i ? "is-active" : ""}`} onClick={() => go(i)}>
                <em>{s.num}</em> {s.label}
                {s.novel && <span className="fc-novel">{Txt("carrousel.inedit", "INÉDIT", "UNIQUE")}</span>}
              </button>
            ))}
          </div>
          <div className="fc-arrows">
            <span className="fc-count">{slides[idx].num} / {String(slides.length).padStart(2, "0")}</span>
            <button className="fc-arrow" disabled={idx === 0} onClick={() => go(idx - 1)} aria-label={Txt("carrousel.precedent", "Précédent", "Previous")}><Icon name="arrow-right" size={14} style={{transform:"rotate(180deg)"}}/></button>
            <button className="fc-arrow" disabled={idx === slides.length - 1} onClick={() => go(idx + 1)} aria-label={Txt("carrousel.suivant", "Suivant", "Next")}><Icon name="arrow-right" size={14}/></button>
          </div>
        </div>
      </div>
      <div
        className="fc-viewport"
        style={h ? { height: h } : null}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (dx < -50) go(idx + 1);
          if (dx > 50) go(idx - 1);
          touch.current = null;
        }}
      >
        <div className="fc-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={s.key} ref={(el) => { slideRefs.current[i] = el; }} className={`fc-slide fc-${s.key} ${idx === i ? "is-active" : ""}`} aria-hidden={idx !== i}>
              <s.Comp/>
            </div>
          ))}
        </div>
      </div>
      <div className="fc-dots">
        {slides.map((s, i) => (
          <button key={s.key} className={idx === i ? "is-active" : ""} onClick={() => go(i)} aria-label={s.label}></button>
        ))}
      </div>
    </section>
  );
};

window.FeatureCarousel = FeatureCarousel;
