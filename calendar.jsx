/* Calendrier, interactive demo styled like the REAL app */

const CAL_TYPES = [
  { id: "phase", fr: "Échéance de phase", en: "Phase deadline", color: "#C9A86A" },
  { id: "reunion", fr: "Réunion", en: "Meeting", color: "#6E8CA8" },
  { id: "visite", fr: "Visite chantier", en: "Site visit", color: "#4E9668" },
  { id: "decision", fr: "Décision à valider", en: "Decision to approve", color: "#C0614F" },
  { id: "devis", fr: "Livraison devis", en: "Quote delivery", color: "#8A7AA8" },
  { id: "admin", fr: "RDV administratif", en: "Admin appointment", color: "#7A8296" },
  { id: "conges", fr: "Congés / absences", en: "Time off", color: "#B87FA2" },
  { id: "intervention", fr: "Intervention", en: "Intervention", color: "#C98A4B" },
];

const CAL_PROJECTS = [
  { name: "Grange Lissieu", dot: "#C9A86A" },
  { name: "Maison Écully", dot: "#7E9A7E" },
  { name: "Atelier Paris 11e", dot: "#6E8CA8" },
];

const CAL_EVENTS = [
  { id: 1,  d: 2,  type: "reunion",  proj: "Maison Écully",    time: "09:30", title: "Réunion MOA — cuisine" },
  { id: 2,  d: 3,  type: "devis",    proj: "Atelier Paris 11e", time: null,   title: "Devis lot 07 — menuiseries" },
  { id: 3,  d: 6,  type: "decision", proj: "Grange Lissieu",    time: null,   title: "Valider enduit chaux" },
  { id: 4,  d: 8,  type: "visite",   proj: "Grange Lissieu",    time: "08:00", title: "Visite chantier n°12" },
  { id: 5,  d: 8,  type: "decision", proj: "Grange Lissieu",    time: null,   title: "Valider châssis acier" },
  { id: 6,  d: 9,  type: "reunion",  proj: "Atelier Paris 11e", time: "14:00", title: "Point BET structure" },
  { id: 7,  d: 10, type: "phase",    proj: "Maison Écully",     time: null,   title: "Fin de phase PRO" },
  { id: 8,  d: 15, type: "visite",   proj: "Maison Écully",     time: "10:00", title: "Visite chantier n°4" },
  { id: 9,  d: 16, type: "admin",    proj: "Atelier Paris 11e", time: "11:00", title: "Dépôt DP — mairie du 11e" },
  { id: 10, d: 17, type: "decision", proj: "Grange Lissieu",    time: null,   title: "Choix robinetterie laiton" },
  { id: 11, d: 21, type: "reunion",  proj: "Grange Lissieu",    time: "18:00", title: "Réunion MOA — M. Lévy" },
  { id: 12, d: 22, type: "visite",   proj: "Grange Lissieu",    time: "08:00", title: "Visite chantier n°13" },
  { id: 13, d: 24, type: "phase",    proj: "Atelier Paris 11e", time: null,   title: "Rendu APD" },
  { id: 14, d: 28, type: "devis",    proj: "Grange Lissieu",    time: null,   title: "Devis lot 03 — maçonnerie" },
  { id: 15, d: 30, type: "visite",   proj: "Atelier Paris 11e", time: "09:00", title: "Visite chantier n°2" },
  { id: 16, d: 31, type: "phase",    proj: "Grange Lissieu",    time: null,   title: "Fin de phase DCE" },
];

/* Juillet 2026 — le 1er tombe un mercredi, aujourd'hui = dimanche 12 */
const CAL_WEEKS = [
  { n: "S27", days: [{ d: 29, out: true }, { d: 30, out: true }, { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }] },
  { n: "S28", days: [{ d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 }, { d: 11 }, { d: 12 }] },
  { n: "S29", days: [{ d: 13 }, { d: 14 }, { d: 15 }, { d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }] },
  { n: "S30", days: [{ d: 20 }, { d: 21 }, { d: 22 }, { d: 23 }, { d: 24 }, { d: 25 }, { d: 26 }] },
  { n: "S31", days: [{ d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 }, { d: 1, out: true }, { d: 2, out: true }] },
];
const CAL_TODAY = 12;

const CAL_SIDE_ITEMS_GET = () => [
  { label: L("Tableau de bord", "Dashboard"), icon: "menu-grid" },
  { label: L("Projets", "Projects"), icon: "folder" },
  { label: L("Maîtres d'ouvrage", "Clients"), icon: "users" },
  { label: L("Calendrier", "Calendar"), icon: "calendar", active: true },
  { label: L("E-mails automatiques", "Automatic emails"), icon: "chat" },
  { label: L("Calculateur", "Calculator"), icon: "euro" },
  { label: L("Bibliothèque matériaux", "Material library"), icon: "layers" },
  { label: L("Archives", "Archives"), icon: "doc" },
];

const CalendarDemo = () => {
  const [sel, setSel] = React.useState(8);
  const [view, setView] = React.useState("mois");
  const [evOpen, setEvOpen] = React.useState(false);
  const [evType, setEvType] = React.useState("Réunion");
  const [projOn, setProjOn] = React.useState({ "Grange Lissieu": true, "Maison Écully": true, "Atelier Paris 11e": true });
  const [typeOn, setTypeOn] = React.useState(CAL_TYPES.reduce((a, t) => ({ ...a, [t.id]: true }), {}));

  const typeOf = (id) => CAL_TYPES.find((t) => t.id === id);
  const typeLabel = (id) => { const t = typeOf(id); return L(t.fr, t.en); };
  const projDot = (name) => (CAL_PROJECTS.find((p) => p.name === name) || {}).dot;

  const visible = CAL_EVENTS.filter((e) => projOn[e.proj] && typeOn[e.type]);
  const evFor = (d) => visible.filter((e) => e.d === d);

  const statWeek = visible.filter((e) => e.d >= 6 && e.d <= 12).length;
  const statVisites = visible.filter((e) => e.type === "visite" && e.d >= CAL_TODAY).length;
  const statEch = visible.filter((e) => e.type === "phase" || e.type === "decision").length;
  const statTotal = visible.filter((e) => e.d >= CAL_TODAY).length;

  const upcoming = visible
    .filter((e) => e.d >= CAL_TODAY && (e.type === "phase" || e.type === "decision" || e.type === "devis"))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);

  const agenda = [...visible].sort((a, b) => a.d - b.d || (a.time || "z").localeCompare(b.time || "z"));

  const DOWS = L(["LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM.", "DIM."], ["MON.", "TUE.", "WED.", "THU.", "FRI.", "SAT.", "SUN."]);
  const DOW_FULL_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const DOW_FULL_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const DOW_SHORT_FR = ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."];
  const dowIdx = (d) => new Date(2026, 6, d).getDay();
  const dayTitle = (d) => L(`${DOW_FULL_FR[dowIdx(d)]} ${d} juillet`, `${DOW_FULL_EN[dowIdx(d)]}, July ${d}`);

  const selEvents = evFor(sel);
  const typeCount = (id) => CAL_EVENTS.filter((e) => e.type === id).length;
  const projOnCount = Object.values(projOn).filter(Boolean).length;
  const typeOnCount = Object.values(typeOn).filter(Boolean).length;

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const app = document.querySelector(".cal-app");
    if (!app) return;
    gsap.from(app, {
      autoAlpha: 0, y: 90, rotateX: 6, transformPerspective: 1600, transformOrigin: "center top",
      duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: app, start: "top 82%", toggleActions: "play none none reverse" },
    });
  }, []);

  const Check = ({ on, onClick, dot, label, count }) => (
    <button type="button" className={`cal-check ${on ? "is-on" : ""}`} onClick={onClick}>
      <span className="cc-box">{on && <Icon name="check" size={8} stroke={2.5}/>}</span>
      {dot && <span className="chip-dot" style={{ background: dot }}/>}
      <span className="cc-label">{label}</span>
      {count != null && <em>{count}</em>}
    </button>
  );

  return (
    <section className="calendar-section" id="calendrier">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow">{L("Coordination", "Coordination")}</span>
          <h2 className="display">{L("Toutes vos échéances, ", "Every deadline, ")}<em>{L("sur une seule vue.", "on a single view.")}</em></h2>
          <p>{L("Réunions MOA, visites de chantier, décisions à valider, fins de phase, le calendrier croise tous vos projets et se filtre en un clic.", "Client meetings, site visits, pending decisions, phase deadlines, the calendar spans all your projects and filters in one click.")}</p>
        </div>

        <div className="cal-app">
          <div className="mockup-bar">
            <div className="mockup-dots">
              <span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/>
            </div>
            <div className="mockup-url"><Icon name="lock" size={11}/> alba-studio.co/calendrier</div>
            <div style={{width:46}}/>
          </div>
          <div className="ml-shell is-rail">
            <aside className="ml-rail">
              <div className="ml-rail-logo"><img src="images/logo-alba.png" alt="ALBA Studio"/></div>
              <div className="ml-rail-items">
                {CAL_SIDE_ITEMS_GET().map((it) => (
                  <span key={it.label} className={`ml-rail-item ${it.active ? "is-active" : ""}`} title={it.label}><Icon name={it.icon} size={14}/></span>
                ))}
              </div>
              <div className="ml-avatar sm rail-foot">A</div>
            </aside>

            <main className="ml-main">
              <div className="ml-topbar">
                <button className="ml-top-create"><Icon name="plus" size={11}/> {L("Créer un projet", "Create a project")}</button>
                <span className="ml-top-ico"><Icon name="search" size={13}/></span>
                <span className="ml-top-ico bell"><Icon name="bell" size={13}/><i>17</i></span>
                <span className="ml-top-ico"><Icon name="users" size={13}/></span>
              </div>
              <div className="ml-crumbs">
                <span>Studio</span> › <span>{L("Espace de travail", "Workspace")}</span> › <b>{L("Calendrier", "Calendar")}</b>
                <button className="cal-ghost-btn">{L("Exporter", "Export")}</button>
                <button className="ml-add-btn" style={{marginLeft: 0}} onClick={() => setEvOpen(true)}><Icon name="plus" size={12}/> {L("Nouvel événement", "New event")}</button>
              </div>

              <div className="ml-header">
                <div className="ml-header-left">
                  <div className="ml-workspace">{L("WORKSPACE · STUDIO ALBA", "WORKSPACE · STUDIO ALBA")}</div>
                  <h3 className="ml-title">{L("Calendrier", "Calendar")}</h3>
                  <p className="ml-desc">{L("Toutes les échéances, réunions et visites de vos projets en cours, sur une seule vue.", "Every deadline, meeting and site visit across your live projects, on one view.")}</p>
                </div>
                <div className="ml-stats">
                  <div className="ml-stat">
                    <div className="k">{L("CETTE SEMAINE", "THIS WEEK")}</div>
                    <div className="v">{statWeek}</div>
                    <div className="f">{L("événements", "events")}</div>
                  </div>
                  <div className="ml-stat">
                    <div className="k">{L("VISITES", "SITE VISITS")}</div>
                    <div className="v">{statVisites}</div>
                    <div className="f">{L("à venir", "upcoming")}</div>
                  </div>
                  <div className="ml-stat">
                    <div className="k">{L("ÉCHÉANCES", "DEADLINES")}</div>
                    <div className="v">{statEch}</div>
                    <div className="f">{L("phases & décisions", "phases & decisions")}</div>
                  </div>
                  <div className="ml-stat gold">
                    <div className="k">{L("AU TOTAL", "IN TOTAL")}</div>
                    <div className="v">{statTotal}</div>
                    <div className="f">{L("événements à venir", "upcoming events")}</div>
                  </div>
                </div>
              </div>

              <div className="cal-toolbar">
                <div className="cal-nav">
                  <button type="button" aria-label="précédent">‹</button>
                  <span>{L("Aujourd'hui", "Today")}</span>
                  <button type="button" aria-label="suivant">›</button>
                </div>
                <div className="cal-month">{L("Juillet 2026", "July 2026")}</div>
                <div className="cal-views">
                  <button type="button" className={view === "mois" ? "is-active" : ""} onClick={() => setView("mois")}>{L("Mois", "Month")}</button>
                  <button type="button" className="is-off" title={L("Disponible dans l'application", "Available in the app")}>{L("Semaine", "Week")}</button>
                  <button type="button" className={view === "agenda" ? "is-active" : ""} onClick={() => setView("agenda")}>{L("Agenda", "Agenda")}</button>
                  <button type="button" className="is-off" title={L("Disponible dans l'application", "Available in the app")}>Gantt</button>
                </div>
              </div>

              <div className="cal-body">
                <aside className="cal-rail">
                  <div className="cal-card cal-mini">
                    <div className="cal-mini-head">{L("juillet 2026", "July 2026")}</div>
                    <div className="cal-mini-grid">
                      {L(["L","M","M","J","V","S","D"], ["M","T","W","T","F","S","S"]).map((d, i) => <span key={i} className="mh">{d}</span>)}
                      {CAL_WEEKS.flatMap((w) => w.days).map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`md ${c.out ? "out" : ""} ${!c.out && c.d === CAL_TODAY ? "today" : ""} ${!c.out && c.d === sel ? "sel" : ""}`}
                          onClick={() => !c.out && setSel(c.d)}
                        >
                          {c.d}
                          {!c.out && evFor(c.d).length > 0 && <i/>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cal-card">
                    <div className="cal-filter-head">{L("PROJETS", "PROJECTS")} <em>{projOnCount}/{CAL_PROJECTS.length}</em></div>
                    {CAL_PROJECTS.map((p) => (
                      <Check key={p.name} on={projOn[p.name]} dot={p.dot} label={p.name}
                        onClick={() => setProjOn((o) => ({ ...o, [p.name]: !o[p.name] }))}/>
                    ))}
                  </div>

                  <div className="cal-card">
                    <div className="cal-filter-head">{L("TYPES D'ÉVÉNEMENTS", "EVENT TYPES")} <em>{typeOnCount}/{CAL_TYPES.length}</em></div>
                    {CAL_TYPES.map((t) => (
                      <Check key={t.id} on={typeOn[t.id]} dot={t.color} label={typeLabel(t.id)} count={typeCount(t.id)}
                        onClick={() => setTypeOn((o) => ({ ...o, [t.id]: !o[t.id] }))}/>
                    ))}
                  </div>
                  <div className="cal-card">
                    <div className="cal-filter-head">{L("COLLABORATEURS", "TEAM")} <em>1/1</em></div>
                    <Check on={true} dot="#C9A86A" label="Filipe De Sousa" onClick={() => {}}/>
                  </div>
                </aside>

                {view === "mois" ? (
                  <div className="cal-grid">
                    <div className="cal-grid-head">
                      <span/>
                      {DOWS.map((d) => <span key={d}>{d}</span>)}
                    </div>
                    {CAL_WEEKS.map((w) => (
                      <div key={w.n} className="cal-week">
                        <div className="cal-wnum">{w.n}</div>
                        {w.days.map((c, i) => {
                          const evs = c.out ? [] : evFor(c.d);
                          return (
                            <div
                              key={i}
                              className={`cal-cell ${c.out ? "out" : ""} ${!c.out && c.d === CAL_TODAY ? "today" : ""} ${!c.out && c.d === sel ? "sel" : ""}`}
                              onClick={() => !c.out && setSel(c.d)}
                            >
                              <div className="cal-cell-top">
                                <span className="dnum">{c.d}</span>
                                {!c.out && c.d === CAL_TODAY && <span className="auj">{L("AUJ.", "TODAY")}</span>}
                              </div>
                              {evs.map((e) => (
                                <div key={e.id} className="cal-ev" title={e.title}>
                                  <span className="ed" style={{ background: typeOf(e.type).color }}/>
                                  <span>{e.title}</span>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cal-agenda">
                    {agenda.length === 0 && <div className="cal-empty">{L("Aucun événement, ajustez les filtres.", "No events, adjust the filters.")}</div>}
                    {agenda.map((e) => (
                      <button type="button" key={e.id} className={`cal-ag-row ${e.d < CAL_TODAY ? "past" : ""} ${e.d === sel ? "sel" : ""}`} onClick={() => setSel(e.d)}>
                        <span className="ag-date">{DOW_SHORT_FR[dowIdx(e.d)]} {e.d}</span>
                        <span className="ed" style={{ background: typeOf(e.type).color }}/>
                        <span className="ag-title">{e.title}</span>
                        <span className="ag-meta">{e.time || L("Journée", "All day")} · {e.proj}</span>
                      </button>
                    ))}
                  </div>
                )}

                <aside className="cal-panel">
                  <div className="cal-card">
                    <div className="cal-filter-head">{L("JOUR SÉLECTIONNÉ", "SELECTED DAY")}
                      <button type="button" className="cal-plus" aria-label={L("Ajouter", "Add")}><Icon name="plus" size={11}/></button>
                    </div>
                    <div className="cal-day-title">{dayTitle(sel)}</div>
                    <div className="cal-day-count">{selEvents.length} {selEvents.length > 1 ? L("événements", "events") : L("événement", "event")}</div>
                    {selEvents.length === 0 && <div className="cal-empty">{L("Aucun événement ce jour.", "No events this day.")}</div>}
                    {selEvents.map((e) => (
                      <div key={e.id} className="cal-day-ev">
                        <span className="ed" style={{ background: typeOf(e.type).color }}/>
                        <div>
                          <div className="de-title">{e.title}</div>
                          <div className="de-meta">{e.time || L("Journée", "All day")} · {e.proj} · {typeLabel(e.type)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cal-card">
                    <div className="cal-filter-head">{L("PROCHAINES ÉCHÉANCES", "NEXT DEADLINES")}</div>
                    <div className="cal-next-sub">{L("Phases, décisions et devis à venir", "Upcoming phases, decisions & quotes")}</div>
                    {upcoming.length === 0 && <div className="cal-empty">{L("Rien à venir.", "Nothing upcoming.")}</div>}
                    {upcoming.map((e) => (
                      <button type="button" key={e.id} className="cal-next-row" onClick={() => setSel(e.d)}>
                        <span className="nx-date">{e.d} {L("JUIL.", "JUL")}</span>
                        <span className="ed" style={{ background: typeOf(e.type).color }}/>
                        <span className="nx-title">{e.title}</span>
                      </button>
                    ))}
                  </div>
                </aside>
              </div>
            </main>
          </div>
          {evOpen && (
            <div className="mam-overlay" onClick={() => setEvOpen(false)}>
              <div className="mam-modal cal-ev-modal" onClick={(e) => e.stopPropagation()}>
                <button className="mam-close" onClick={() => setEvOpen(false)} aria-label={L("Fermer", "Close")}>×</button>
                <div className="mam-head">
                  <h4 className="mam-title" style={{marginTop: 0}}>{L("Nouvel événement", "New event")}</h4>
                  <p className="mam-sub" style={{maxWidth: "38ch"}}>{L("Les événements sont créés dans la fiche du projet pour préserver le contexte (signatures, décisions, traçabilité). On vous y emmène.", "Events are created inside the project so context is preserved (signatures, decisions, traceability). We'll take you there.")}</p>
                </div>
                <div className="cal-ev-body">
                  <label className="mam-label">{L("TYPE", "TYPE")}</label>
                  <div className="cal-ev-types">
                    {[L("Réunion", "Meeting"), L("Visite", "Site visit"), L("Phase", "Phase")].map((t) => (
                      <button key={t} className={evType === t ? "is-active" : ""} onClick={() => setEvType(t)}>{t}</button>
                    ))}
                  </div>
                  <label className="mam-label">{L("PROJET", "PROJECT")}</label>
                  <div className="mam-input">Grange Lissieu <span className="mam-caret">▾</span></div>
                  <div className="cal-ev-ref">{L(`Date de référence : ${dayTitle(sel).toLowerCase()} 2026`, `Reference date: ${dayTitle(sel)}, 2026`)}</div>
                </div>
                <div className="mam-foot" style={{justifyContent: "flex-end"}}>
                  <button className="mam-cancel" onClick={() => setEvOpen(false)}>{L("Annuler", "Cancel")}</button>
                  <button className="mam-submit" onClick={() => setEvOpen(false)}>{L("Ouvrir le projet", "Open the project")}</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cal-hint"><span className="pulse-dot"/>{L("Démo interactive, filtrez par projet ou par type, cliquez un jour : le panneau et les compteurs réagissent", "Interactive demo, filter by project or type, click a day: the panel and counters react")}</div>
      </div>
    </section>
  );
};

window.CalendarDemo = CalendarDemo;
