/* Léo — assistant intégré, popup de commande (exclusivité ALBA) */

const LEO_SIDE = () => [
  { label: L("Tableau de bord", "Dashboard"), icon: "menu-grid" },
  { label: L("Projets", "Projects"), icon: "folder" },
  { label: L("MO & intervenants", "Clients & partners"), icon: "users" },
  { label: L("Calendrier", "Calendar"), icon: "calendar", active: true },
  { label: L("Calculateur", "Calculator"), icon: "euro" },
  { label: L("Bibliothèque matériaux", "Material library"), icon: "layers" },
  { label: L("Archives", "Archives"), icon: "doc" },
];

const LEO_QA = () => [
  {
    q: L("Rédige un mail au maçon pour reporter la visite de jeudi", "Draft an email to the mason to postpone Thursday's visit"),
    typing: L("Léo rédige le message…", "Léo is drafting the message…"),
    a: {
      lead: L("Voici un brouillon, prêt à envoyer à Filipe De Sousa (DSX Frères) :", "Here's a draft, ready to send to Filipe De Sousa (DSX Frères):"),
      mail: {
        to: L("À : Filipe De Sousa · DSX Frères", "To: Filipe De Sousa · DSX Frères"),
        subject: L("Objet : Report visite chantier — Grange Lissieu", "Subject: Site visit postponed — Grange Lissieu"),
        body: L("Bonjour Filipe,\nLa visite prévue jeudi 9 juillet est décalée à lundi 13 à 8h, la météo annonçant de fortes pluies. Le reste du planning est inchangé. Merci de me confirmer votre présence.\nBien à vous,", "Hi Filipe,\nThursday 9 July's visit is moved to Monday 13th at 8am, as heavy rain is forecast. The rest of the schedule is unchanged. Please confirm your attendance.\nBest,"),
      },
      foot: L("Reformuler · Raccourcir · Envoyer depuis le projet", "Rephrase · Shorten · Send from the project"),
    },
  },
  {
    q: L("Quels matériaux j'ai déjà utilisés pour une salle de bain ?", "Which materials have I used for a bathroom before?"),
    typing: L("Léo cherche dans votre bibliothèque…", "Léo is searching your library…"),
    a: {
      lead: L("3 matériaux de votre bibliothèque correspondent, déjà validés sur des projets similaires :", "3 materials from your library match, already approved on similar projects:"),
      list: [
        { t: "Robinetterie laiton brossé", s: "Atelier Fontaine · 215 €/u · Atelier Paris 11e", dot: "#6E8CA8" },
        { t: "Pierre de Bourgogne adoucie", s: "Carrières Sauvanet · 146 €/m² · ★ Champion", dot: "#C9A86A" },
        { t: "Verre cannelé clair 8 mm", s: "Miroiterie Grand Lyon · 310 €/m²", dot: "#8B6F4E" },
      ],
      foot: L("Ajouter au circuit de décision de « Maison Écully »", "Add to the “Maison Écully” decision flow"),
    },
  },
  {
    q: L("Résume-moi où en est Grange Lissieu", "Summarise where Grange Lissieu stands"),
    typing: L("Léo analyse le projet…", "Léo is analysing the project…"),
    a: {
      lead: L("Grange Lissieu — phase APS, avancement 43 %. Points saillants :", "Grange Lissieu — design phase, 43% complete. Key points:"),
      list: [
        { t: L("1 décision en attente", "1 decision pending"), s: L("Choix châssis acier, à valider par le MO", "Steel frame choice, awaiting client approval"), dot: "#C0614F" },
        { t: L("Permis en retard de 113 j", "Permit 113 days late"), s: L("Relance mairie recommandée", "Follow-up with town hall recommended"), dot: "#D9B36B" },
        { t: L("Prochaine visite chantier", "Next site visit"), s: L("Mardi 8 juillet · 8h · météo à risque", "Tuesday 8 July · 8am · weather at risk"), dot: "#6E8CA8" },
      ],
      foot: L("Générer un compte-rendu client · Ouvrir le cockpit", "Generate a client report · Open the cockpit"),
    },
  },
];

const LeoSparkle = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2.5l1.9 4.6L19.5 9l-4.6 1.9L13 15.5l-1.9-4.6L6.5 9l4.6-1.9z" fill="currentColor" fillOpacity="0.18"/>
    <path d="M6 15l.9 2.1L9 18l-2.1.9L6 21l-.9-2.1L3 18l2.1-.9z" fill="currentColor" fillOpacity="0.18"/>
    <path d="M18.5 14.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" fillOpacity="0.18"/>
  </svg>
);

const AssistantDemo = () => {
  const QA = LEO_QA();
  const [intro, setIntro] = React.useState("idle"); // idle | playing | done
  const [open, setOpen] = React.useState(true);
  const [thread, setThread] = React.useState([]);
  const [typing, setTyping] = React.useState(null);
  const [asked, setAsked] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const bodyRef = React.useRef(null);
  const timers = React.useRef([]);
  const at = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  React.useEffect(() => { const el = bodyRef.current; if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; }); }, [thread, typing]);

  const ask = (i) => {
    if (typing || asked.includes(i)) return;
    const qa = QA[i];
    setAsked((a) => [...a, i]);
    /* frappe simulée dans la barre, puis envoi */
    const full = qa.q;
    let k = 0;
    const tick = () => {
      k += 2;
      setQuery(full.slice(0, k));
      if (k < full.length) at(tick, 16);
      else at(() => {
        setQuery("");
        setThread((t) => [...t, { role: "user", text: full }]);
        at(() => setTyping(qa.typing), 250);
        at(() => { setTyping(null); setThread((t) => [...t, { role: "bot", a: qa.a }]); }, 1650);
      }, 260);
    };
    tick();
  };

  const reset = () => { timers.current.forEach(clearTimeout); timers.current = []; setThread([]); setAsked([]); setTyping(null); setQuery(""); };

  const audioRef = React.useRef(null);
  const playedRef = React.useRef(false);

  const runIntro = React.useCallback(() => {
    if (playedRef.current) return;
    playedRef.current = true;
    setIntro("playing");
    const a = audioRef.current;
    if (a) { try { a.currentTime = 0; a.volume = 0.55; a.play().catch(() => {}); } catch (e) {} }
    setTimeout(() => setIntro("done"), 2100);
  }, []);

  const replay = () => { playedRef.current = false; setIntro("idle"); requestAnimationFrame(runIntro); };

  React.useEffect(() => {
    const el = document.querySelector(".leo-app");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setIntro("done"); playedRef.current = true; return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && e.intersectionRatio > 0.35) runIntro(); });
    }, { threshold: [0, 0.35, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, [runIntro]);

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const app = document.querySelector(".leo-app");
    if (!app) return;
    gsap.from(app, { autoAlpha: 0, y: 90, rotateX: 6, transformPerspective: 1600, transformOrigin: "center top", duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: app, start: "top 82%", toggleActions: "play none none reverse" } });
  }, []);

  return (
    <section className="materials-section" id="assistant">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow">{L("Exclusivité ALBA", "ALBA exclusive")}<span className="mat-badge-new">{L("INÉDIT", "UNIQUE")}</span></span>
          <h2 className="display">{L("Léo, l'assistant qui connaît ", "Léo, the assistant that knows ")}<em>{L("vos projets par cœur.", "your projects by heart.")}</em></h2>
          <p>{L("Une étincelle, n'importe où dans ALBA : Léo cherche une page, lance une action, rédige un mail, retrouve un matériau, résume un chantier. Il ne devine pas, il lit vos données. Aucun autre logiciel d'architecte ne le fait.", "One sparkle, anywhere in ALBA: Léo finds a page, runs an action, drafts an email, recalls a material, summarises a site. It doesn't guess, it reads your data. No other architect software does this.")}</p>
        </div>

        <div className={`leo-app intro-${intro}`}>
          <audio ref={audioRef} src="uploads/810328__mokasza__slowly-whoosh.mp3" preload="auto"/>
          {intro !== "done" && (
            <div className="leo-intro" onClick={runIntro}>
              <div className="leo-intro-glow"/>
              <div className="leo-intro-spark"><LeoSparkle size={150}/></div>
              <div className="leo-intro-name">LÉO</div>
              <div className="leo-intro-sub">{L("votre assistant intégré", "your built-in assistant")}</div>
            </div>
          )}
          <button className="leo-replay" onClick={replay} title={L("Rejouer l'apparition de Léo", "Replay Léo's entrance")}><LeoSparkle size={12}/> {L("Rejouer", "Replay")}</button>
          <div className="mockup-bar">
            <div className="mockup-dots"><span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/></div>
            <div className="mockup-url"><Icon name="lock" size={11}/> alba-studio.co/calendar</div>
            <div style={{width:46}}/>
          </div>

          <div className={`leo-shell ${open ? "is-dimmed" : ""}`}>
            <aside className="leo-rail">
              <div className="ml-rail-logo"><img src="images/logo-alba.png" alt="ALBA Studio"/></div>
              <div className="ml-rail-items">
                {LEO_SIDE().map((it) => (
                  <span key={it.label} className={`ml-rail-item ${it.active ? "is-active" : ""}`} title={it.label}><Icon name={it.icon} size={14}/></span>
                ))}
              </div>
              <div className="ml-avatar sm rail-foot">A</div>
            </aside>

            <main className="leo-main">
              <div className="leo-topbar">
                <button className="leo-top-create"><Icon name="plus" size={11}/> {L("Créer un projet", "Create a project")}</button>
                <button className={`leo-btn ${open ? "is-on" : ""}`} onClick={() => setOpen(true)}>
                  <span className="leo-btn-spark"><LeoSparkle size={13}/></span> Léo
                  <span className="leo-btn-halo"/>
                </button>
                <span className="leo-top-ico bell"><Icon name="bell" size={13}/><i>18</i></span>
                <span className="leo-top-ico"><Icon name="users" size={13}/></span>
              </div>

              <div className="leo-page">
                <div className="leo-eyebrow">{L("WORKSPACE · STUDIO ALBA", "WORKSPACE · STUDIO ALBA")}</div>
                <div className="leo-title">{L("Calendrier", "Calendar")}</div>
                <div className="leo-sub">{L("Toutes les échéances, réunions et visites de vos projets en cours.", "Every deadline, meeting and site visit across your live projects.")}</div>
                <div className="leo-fake-grid">
                  {Array.from({ length: 28 }).map((_, i) => <span key={i} className={i === 25 ? "is-today" : ""}>{i + 1 <= 28 ? i + 1 : ""}</span>)}
                </div>
              </div>
            </main>
          </div>

          {open && (
            <div className="leo-overlay" onClick={() => setOpen(false)}>
              <div className="leo-modal" onClick={(e) => e.stopPropagation()}>
                <button className="leo-close" onClick={() => setOpen(false)} aria-label={L("Fermer", "Close")}>×</button>
                <div className="leo-modal-head">
                  <div className="leo-kicker"><span className="leo-kdot"/> LÉO · {L("ASSISTANT", "ASSISTANT")}</div>
                  <h4 className="leo-modal-title">{L("Cherchez, ou ", "Search, or ")}<em>{L("demandez à Léo", "ask Léo")}</em></h4>
                  <p className="leo-modal-sub">{L("Une page, une action, un projet, ou une vraie question à Léo, à l'écrit comme à la voix.", "A page, an action, a project, or a real question for Léo, typed or spoken.")}</p>
                </div>

                <div className="leo-search">
                  <Icon name="search" size={14}/>
                  <span className={`leo-search-txt ${query ? "" : "is-ph"}`}>{query || L("Cherchez, ou posez votre question...", "Search, or ask your question...")}</span>
                  <span className="leo-caret"/>
                  <span className="leo-mic"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span>
                </div>

                <div className="leo-body" ref={bodyRef}>
                  {thread.length === 0 && !typing && (
                    <div className="leo-empty">
                      <div className="leo-empty-spark"><LeoSparkle size={40}/></div>
                      <div className="leo-empty-t">{L("Posez votre question à Léo", "Ask Léo your question")}</div>
                      <div className="leo-empty-s">{L("Il répond, cherche et vous emmène au bon endroit.", "It answers, searches and takes you to the right place.")}</div>
                    </div>
                  )}

                  {thread.map((m, i) => m.role === "user" ? (
                    <div key={i} className="leo-row user"><div className="leo-bubble">{m.text}</div></div>
                  ) : (
                    <div key={i} className="leo-row bot">
                      <span className="leo-av"><LeoSparkle size={14}/></span>
                      <div className="leo-answer">
                        <p className="leo-lead">{m.a.lead}</p>
                        {m.a.mail && (
                          <div className="leo-mail">
                            <div className="leo-mail-to">{m.a.mail.to}</div>
                            <div className="leo-mail-subj">{m.a.mail.subject}</div>
                            <div className="leo-mail-body">{m.a.mail.body}</div>
                          </div>
                        )}
                        {m.a.list && (
                          <div className="leo-list">
                            {m.a.list.map((it, k) => (
                              <div key={k} className="leo-item">
                                <span className="leo-dot" style={{background: it.dot}}/>
                                <div><div className="leo-item-t">{it.t}</div><div className="leo-item-s">{it.s}</div></div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="leo-answer-foot"><LeoSparkle size={11}/> {m.a.foot}</div>
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="leo-row bot">
                      <span className="leo-av spin"><LeoSparkle size={14}/></span>
                      <div className="leo-typing">{typing}<span className="leo-dots"><i/><i/><i/></span></div>
                    </div>
                  )}
                </div>

                <div className="leo-suggests">
                  {QA.map((qa, i) => (
                    <button key={i} className="leo-chip" disabled={asked.includes(i)} onClick={() => ask(i)}>
                      <LeoSparkle size={11}/> {qa.q}
                    </button>
                  ))}
                  {asked.length > 0 && <button className="leo-chip reset" onClick={reset}>{L("Réinitialiser", "Reset")}</button>}
                </div>

                <div className="leo-modal-foot">
                  <span>↑↓ {L("naviguer", "navigate")}</span>
                  <span>↵ {L("ouvrir", "open")}</span>
                  <span>⌘↵ {L("demander à Léo", "ask Léo")}</span>
                  <span>{L("Échap fermer", "Esc close")}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cal-hint"><span className="pulse-dot"/>{L("Démo interactive, cliquez une suggestion : Léo répond avec vos données", "Interactive demo, click a suggestion: Léo answers with your data")}</div>
      </div>
    </section>
  );
};

window.AssistantDemo = AssistantDemo;
