/* Météo chantier — préconisation d'interventions, exclusivité ALBA */

const WX_SIDE = () => [
  { label: L("Tableau de bord", "Dashboard"), icon: "menu-grid" },
  { label: L("Projets", "Projects"), icon: "folder" },
  { label: L("Maîtres d'ouvrage", "Clients"), icon: "users" },
  { label: L("Calendrier", "Calendar"), icon: "calendar" },
  { label: L("Météo chantier", "Site weather"), icon: "cloud-sun", active: true },
  { label: L("Bibliothèque matériaux", "Material library"), icon: "layers" },
  { label: L("Archives", "Archives"), icon: "doc" },
];

const WX_SITES = [
  { name: "Grange Lissieu", city: "Lissieu (69)", dot: "#C9A86A" },
  { name: "Maison Écully", city: "Écully (69)", dot: "#7E9A7E" },
  { name: "Atelier Paris 11e", city: "Paris (75)", dot: "#6E8CA8" },
];

/* prévisions 7 j par site : ic (sun|cloud-sun|cloud|rain|storm), t°, mm pluie, vent */
const WX_FORECAST = {
  "Grange Lissieu": [
    { d: "LUN", ic: "sun", t: 27, mm: 0, w: 8 },
    { d: "MAR", ic: "cloud-sun", t: 25, mm: 0, w: 12 },
    { d: "MER", ic: "cloud", t: 22, mm: 1, w: 15 },
    { d: "JEU", ic: "rain", t: 18, mm: 14, w: 32 },
    { d: "VEN", ic: "storm", t: 17, mm: 22, w: 46 },
    { d: "SAM", ic: "cloud-sun", t: 21, mm: 2, w: 14 },
    { d: "DIM", ic: "sun", t: 26, mm: 0, w: 9 },
  ],
  "Maison Écully": [
    { d: "LUN", ic: "cloud-sun", t: 24, mm: 0, w: 10 },
    { d: "MAR", ic: "sun", t: 28, mm: 0, w: 7 },
    { d: "MER", ic: "sun", t: 29, mm: 0, w: 6 },
    { d: "JEU", ic: "cloud-sun", t: 26, mm: 1, w: 13 },
    { d: "VEN", ic: "rain", t: 19, mm: 9, w: 24 },
    { d: "SAM", ic: "cloud", t: 22, mm: 3, w: 18 },
    { d: "DIM", ic: "cloud-sun", t: 25, mm: 0, w: 11 },
  ],
  "Atelier Paris 11e": [
    { d: "LUN", ic: "cloud", t: 21, mm: 2, w: 17 },
    { d: "MAR", ic: "rain", t: 18, mm: 11, w: 28 },
    { d: "MER", ic: "cloud-sun", t: 22, mm: 1, w: 14 },
    { d: "JEU", ic: "sun", t: 25, mm: 0, w: 9 },
    { d: "VEN", ic: "sun", t: 27, mm: 0, w: 8 },
    { d: "SAM", ic: "cloud-sun", t: 24, mm: 0, w: 12 },
    { d: "DIM", ic: "cloud", t: 21, mm: 4, w: 19 },
  ],
};

/* recommandations d'intervention déduites de la prévision */
const WX_ADVICE = (site) => {
  const f = WX_FORECAST[site];
  const wet = f.filter((x) => x.mm >= 5).map((x) => x.d);
  const dry = f.filter((x) => x.mm === 0 && x.w < 15).map((x) => x.d);
  return [
    { kind: "ok", tag: L("FEU VERT", "GO"), icon: "sun",
      t: L("Toiture & couverture", "Roofing & covering"),
      d: L(`Créneaux secs et peu ventés : ${dry.join(", ") || "aucun cette semaine"}. Idéal pour la reprise d'étanchéité du pignon nord.`, `Dry, low-wind windows: ${dry.join(", ") || "none this week"}. Ideal for the north gable waterproofing.`) },
    { kind: "danger", tag: L("À ÉVITER", "AVOID"), icon: "storm",
      t: L("Coulage & maçonnerie extérieure", "Pouring & outdoor masonry"),
      d: L(`Fortes pluies ${wet.join(" et ")} (jusqu'à ${Math.max(...f.map(x=>x.mm))} mm). Ne pas couler de dalle ni d'enduit : risque de lessivage et de prise compromise.`, `Heavy rain ${wet.join(" & ")} (up to ${Math.max(...f.map(x=>x.mm))} mm). No slab pour or render: washout and curing risk.`) },
    { kind: "warn", tag: L("VIGILANCE", "CAUTION"), icon: "wind",
      t: L("Levage & travaux en hauteur", "Lifting & work at height"),
      d: L(`Rafales à ${Math.max(...f.map(x=>x.w))} km/h en fin de semaine. Reporter grue et échafaudage exposé au-delà de 40 km/h.`, `Gusts up to ${Math.max(...f.map(x=>x.w))} km/h late week. Postpone crane and exposed scaffolding above 40 km/h.`) },
  ];
};

const WeatherDemo = () => {
  const [site, setSite] = React.useState(WX_SITES[0].name);
  const f = WX_FORECAST[site];
  const advice = WX_ADVICE(site);
  const [day, setDay] = React.useState(3);

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const app = document.querySelector(".wx-app");
    if (!app) return;
    gsap.from(app, { autoAlpha: 0, y: 90, rotateX: 6, transformPerspective: 1600, transformOrigin: "center top", duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: app, start: "top 82%", toggleActions: "play none none reverse" } });
  }, []);

  const dayLabel = (x) => x.mm >= 12 ? L("Pluvieux", "Rainy") : x.mm >= 3 ? L("Averses", "Showers") : x.ic === "sun" ? L("Ensoleillé", "Sunny") : L("Voilé", "Cloudy");

  return (
    <section className="materials-section" id="meteo">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow">{L("Exclusivité ALBA", "ALBA exclusive")}<span className="mat-badge-new">{L("INÉDIT", "UNIQUE")}</span></span>
          <h2 className="display">{L("La météo qui pilote ", "Weather that plans ")}<em>{L("vos interventions.", "your site work.")}</em></h2>
          <p>{L("Une chaîne météo par chantier, géolocalisée, qui préconise les bons jours d'intervention et vous alerte : pas de toiture sous la pluie, pas de dalle avant l'orage. Personne d'autre ne le propose.", "A geolocated weather channel per site that recommends the right days to intervene and warns you: no roofing in the rain, no slab before a storm. No one else offers it.")}</p>
        </div>

        <div className="wx-app">
          <div className="mockup-bar">
            <div className="mockup-dots"><span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/></div>
            <div className="mockup-url"><Icon name="lock" size={11}/> alba-studio.co/meteo-chantier</div>
            <div style={{width:46}}/>
          </div>
          <div className="ml-shell is-rail">
            <aside className="ml-rail">
              <div className="ml-rail-logo"><img src="images/logo-alba.png" alt="ALBA Studio"/></div>
              <div className="ml-rail-items">
                {WX_SIDE().map((it) => (
                  <span key={it.label} className={`ml-rail-item ${it.active ? "is-active" : ""}`} title={it.label}><Icon name={it.icon} size={14}/></span>
                ))}
              </div>
              <div className="ml-avatar sm rail-foot">A</div>
            </aside>

            <main className="ml-main">
              <div className="ml-crumbs">
                <span>Studio</span> › <b>{L("Météo chantier", "Site weather")}</b>
                <span className="as-model"><span className="as-live"/> {L("Prévisions à 7 jours · géolocalisées", "7-day forecast · geolocated")}</span>
              </div>

              <div className="wx-sites">
                {WX_SITES.map((s) => (
                  <button key={s.name} className={`wx-site ${site === s.name ? "is-active" : ""}`} onClick={() => { setSite(s.name); setDay(3); }}>
                    <span className="chip-dot" style={{background: s.dot}}/>
                    <span className="wx-site-n">{s.name}</span>
                    <span className="wx-site-c">{s.city}</span>
                  </button>
                ))}
              </div>

              <div className="wx-strip">
                {f.map((x, i) => (
                  <button key={i} className={`wx-day ${day === i ? "is-active" : ""} ${x.mm >= 12 ? "is-wet" : ""}`} onClick={() => setDay(i)}>
                    <span className="wx-day-d">{x.d}</span>
                    <span className="wx-ic"><Icon name={x.ic} size={22}/></span>
                    <span className="wx-t">{x.t}°</span>
                    <span className="wx-mm"><Icon name="droplet" size={9}/> {x.mm}<i>mm</i></span>
                  </button>
                ))}
              </div>

              <div className="wx-detail">
                <div className="wx-detail-ic"><Icon name={f[day].ic} size={30}/></div>
                <div className="wx-detail-main">
                  <div className="wx-detail-day">{f[day].d === "LUN" ? L("Lundi","Monday") : f[day].d === "MAR" ? L("Mardi","Tuesday") : f[day].d === "MER" ? L("Mercredi","Wednesday") : f[day].d === "JEU" ? L("Jeudi","Thursday") : f[day].d === "VEN" ? L("Vendredi","Friday") : f[day].d === "SAM" ? L("Samedi","Saturday") : L("Dimanche","Sunday")} · {dayLabel(f[day])}</div>
                  <div className="wx-detail-stats">
                    <span><b>{f[day].t}°</b> {L("ressenti", "feels like")}</span>
                    <span><Icon name="droplet" size={11}/> {f[day].mm} mm</span>
                    <span><Icon name="wind" size={11}/> {f[day].w} km/h</span>
                  </div>
                </div>
              </div>

              <div className="wx-advice-head">{L("PRÉCONISATIONS D'INTERVENTION", "INTERVENTION RECOMMENDATIONS")} · {site}</div>
              <div className="wx-advice">
                {advice.map((a, i) => (
                  <div key={i} className={`wx-card ${a.kind}`}>
                    <div className="wx-card-top">
                      <span className="wx-card-ic"><Icon name={a.icon} size={16}/></span>
                      <span className={`wx-tag ${a.kind}`}>{a.tag}</span>
                    </div>
                    <div className="wx-card-t">{a.t}</div>
                    <div className="wx-card-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        <div className="cal-hint"><span className="pulse-dot"/>{L("Démo interactive, changez de chantier ou de jour : les préconisations se recalculent", "Interactive demo, switch site or day: recommendations recompute")}</div>
      </div>
    </section>
  );
};

window.WeatherDemo = WeatherDemo;
