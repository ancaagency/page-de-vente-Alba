/* Shared UI atoms, icons, image placeholders, app mockups */

const Icon = ({ name, size = 18, stroke = 1.5, ...rest }) => {
  const s = { width: size, height: size, ...rest.style };
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...rest };
  switch (name) {
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right":
      return <svg {...common}><path d="M7 17 17 7M8 7h9v9"/></svg>;
    case "check":
      return <svg {...common}><path d="M4 12.5 9 17.5 20 6.5"/></svg>;
    case "x":
      return <svg {...common}><path d="M6 6l12 12M6 18 18 6"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":
      return <svg {...common}><path d="M5 12h14"/></svg>;
    case "sparkle":
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "folder":
      return <svg {...common}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>;
    case "chat":
      return <svg {...common}><path d="M21 12a8 8 0 0 1-12.5 6.6L3 20l1.4-5.5A8 8 0 1 1 21 12Z"/></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case "doc":
      return <svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 14h6M9 17h4"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z"/></svg>;
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z"/></svg>;
    case "layers":
      return <svg {...common}><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/></svg>;
    case "users":
      return <svg {...common}><circle cx="9" cy="8" r="3.5"/><path d="M3 19c0-3 2.5-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21 18c0-2-1.5-3.5-4-3.5"/></svg>;
    case "bell":
      return <svg {...common}><path d="M6 17h12l-1.5-2v-4a4.5 4.5 0 1 0-9 0v4Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg>;
    case "menu-grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "wave":
      return <svg {...common}><path d="M3 12c2 0 2-3 4-3s2 6 4 6 2-9 4-9 2 6 4 6 2-3 2-3"/></svg>;
    case "pulse":
      return <svg {...common}><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>;
    case "euro":
      return <svg {...common}><path d="M19 6a8 8 0 1 0 0 12M3 10h10M3 14h10"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "star":
      return <svg {...common}><path d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 6L12 16.8 6.7 19.5l1-6L3.4 9.3l6-.9z"/></svg>;
    case "lock":
      return <svg {...common}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "sun":
      return <svg {...common}><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>;
    case "cloud":
      return <svg {...common}><path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 6.97Z"/></svg>;
    case "cloud-sun":
      return <svg {...common}><path d="M6 8.5a3 3 0 0 1 5.9-.8M4 5.5l1 1M9.5 3v1.4M14 5.5l-1 1M2.5 11H4"/><path d="M9 20a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 19 11.5a3.5 3.5 0 0 1 .5 6.97Z"/></svg>;
    case "rain":
      return <svg {...common}><path d="M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 6.5a3.5 3.5 0 0 1 .5 6.97"/><path d="M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5"/></svg>;
    case "storm":
      return <svg {...common}><path d="M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 6.5a3.5 3.5 0 0 1 .5 6.97"/><path d="m12 14-2 3.5h3L11 21"/></svg>;
    case "wind":
      return <svg {...common}><path d="M3 9h11a2.5 2.5 0 1 0-2.5-2.5M3 14h15a2.5 2.5 0 1 1-2.5 2.5M3 12h7"/></svg>;
    case "droplet":
      return <svg {...common}><path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z"/></svg>;
    case "bot":
      return <svg {...common}><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M8.5 13v1.5M15.5 13v1.5"/><circle cx="12" cy="3.2" r="1.2"/></svg>;
    case "send":
      return <svg {...common}><path d="M4 12 20 4l-6 16-2.5-6.5z"/></svg>;
    /* Ajouté pour le message de retour de l'essai express. Sans lui, `default`
       renvoie null : l'icône disparaissait sans que rien ne le signale. */
    case "info":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r=".9" fill="currentColor" stroke="none"/></svg>;
    default: return null;
  }
};

/* Photo placeholder, tonal, no real photos used (architecture vibe) */
const PhotoPlaceholder = ({ label = "ARCHITECTURE", tone = "stone", ratio = "16/9", style }) => {
  const tones = {
    stone:    { a: "#59637A", b: "#2C313D", c: "#A8987A" },
    forest:   { a: "#3B4E3D", b: "#1F2E25", c: "#5C7560" },
    terracotta:{a: "#A86547", b: "#5C2E1E", c: "#D08F6E" },
    sky:      { a: "#5C7088", b: "#2A3850", c: "#8AA0BB" },
    night:    { a: "#1F2A45", b: "#0E1729", c: "#3B4A6E" },
    sand:     { a: "#C4A87B", b: "#7E6741", c: "#E0CB9F" },
  };
  const t = tones[tone] || tones.stone;
  return (
    <div className="photo-ph" style={{ aspectRatio: ratio, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${tone}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.c} />
            <stop offset="55%" stopColor={t.a} />
            <stop offset="100%" stopColor={t.b} />
          </linearGradient>
          <pattern id={`p-${tone}`} width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="transparent"/>
            <circle cx="0.5" cy="0.5" r="0.4" fill="rgba(255,255,255,0.06)"/>
          </pattern>
        </defs>
        <rect width="400" height="225" fill={`url(#g-${tone})`} />
        <rect width="400" height="225" fill={`url(#p-${tone})`} />
        {/* implied silhouette */}
        <g opacity="0.35" fill={t.b}>
          <polygon points="0,225 0,160 90,120 160,150 220,110 300,140 400,100 400,225"/>
        </g>
        <g opacity="0.18" fill="#000">
          <rect x="0" y="200" width="400" height="25"/>
        </g>
      </svg>
      <div className="photo-ph-label">{label}</div>
    </div>
  );
};

/* Badges App Store / Google Play */
const StoreBadges = ({ className = "", theme = "dark" }) => (
  <div className={`store-badges ${theme} ${className}`}>
    <a href="#contact" className="store-badge" aria-label="App Store">
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.3zM14.3 5.5c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2z"/></svg>
      <span><i>{L("Télécharger sur", "Download on the")}</i><b>App Store</b></span>
    </a>
    <a href="#contact" className="store-badge" aria-label="Google Play">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#34A853" d="M4.3 21.2c-.2-.2-.3-.5-.3-.9l8.3-8.3 2.6 2.6-9.8 5.6c-.3.2-.6.2-.8 0z"/><path fill="#EA4335" d="M14.9 14.6 12.3 12l2.6-2.6 3.3 1.9c.7.4.7 1.4 0 1.8l-3.3 1.5z"/><path fill="#FBBC04" d="M4.3 2.8c.2-.2.5-.2.8 0l9.8 5.6-2.6 2.6L4 3.7c0-.4.1-.7.3-.9z"/><path fill="#4285F4" d="M4 3.7 12.3 12 4 20.3c-.1-.2-.2-.5-.2-.8V4.5c0-.3.1-.6.2-.8z"/></svg>
      <span><i>{L("Disponible sur", "Get it on")}</i><b>Google Play</b></span>
    </a>
    <p className="store-note">{L("L'application accompagne votre compte. La souscription et la gestion de l'abonnement se font depuis le web.", "The app companions your account. Subscription and billing are managed on the web.")}</p>
  </div>
);

/* App mockup, full cockpit */
const AppMockup = ({ variant = "cockpit", scale = 1 }) => {
  if (variant === "cockpit") return <MockupCockpit />;
  if (variant === "project") return <MockupProject />;
  if (variant === "decisions") return <MockupDecisions />;
  if (variant === "messagerie") return <MockupMessagerie />;
  if (variant === "materiaux") return <MockupMateriaux />;
  if (variant === "chantier") return <MockupChantier />;
  return <MockupCockpit />;
};

const MockupShell = ({ children, title = "alba-studio.co" }) => (
  <div className="mockup">
    <div className="mockup-bar">
      <div className="mockup-dots">
        <span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/>
      </div>
      <div className="mockup-url">
        <Icon name="lock" size={11}/> {title}
      </div>
      <div style={{width:46}}/>
    </div>
    <div className="mockup-body">{children}</div>
  </div>
);

const MockupSidebar = ({ active = "Cockpit", mode = "project" }) => {
  const workspaceItems = [
    { label: "Tableau de bord", icon: "menu-grid" },
    { label: "Projets", icon: "folder" },
    { label: "Maîtres d'ouvrage", icon: "users" },
    { label: "Calendrier", icon: "calendar" },
    { label: "Calculateur", icon: "euro" },
    { label: "Bibliothèque matériaux", icon: "layers" },
    { label: "Archives", icon: "doc" },
  ];
  const projectGroups = [
    { name: "CONFIGURATION", items: [
      { label: "Lots & corps d'état", icon: "layers" },
      { label: "Paramètres projet", icon: "compass" },
      { label: "Cockpit", icon: "menu-grid" },
      { label: "Existant", icon: "folder" },
    ] },
    { name: "SUIVI", items: [
      { label: "Projet", icon: "pulse", badge: "16" },
      { label: "Décisions & budget", icon: "check" },
      { label: "Documents", icon: "doc" },
    ] },
    { name: "PERSONNES & ACCÈS", items: [
      { label: "Accès & équipe", icon: "users" },
      { label: "Chat", icon: "chat" },
    ] },
  ];
  const groups = mode === "workspace" ? [{ name: null, items: workspaceItems }] : projectGroups;
  return (
    <aside className="m-side">
      <div className="m-brand">
        <div className="m-brand-mark"><img src="images/logo-alba.png" alt="ALBA Studio" style={{width:"72%", height:"72%", objectFit:"contain", display:"block"}}/></div>
        <div>
          <div className="m-brand-name">ALBA Studio</div>
          <div className="m-brand-sub">— Made in France</div>
        </div>
      </div>
      {mode === "project" && (
        <div className="m-side-card">
          <div style={{fontFamily:"var(--font-mono)", fontSize:8, letterSpacing:"0.08em", color:"rgba(233, 236, 242,0.5)", marginBottom:5}}>‹ TOUS LES PROJETS</div>
          <div className="m-side-title">Grange Lissieu</div>
          <div style={{fontSize:9, color:"rgba(233, 236, 242,0.6)", margin:"2px 0 7px"}}>340 m² · Lissieu</div>
          <div style={{display:"inline-flex", alignItems:"center", gap:5, fontFamily:"var(--font-mono)", fontSize:7.5, letterSpacing:"0.07em", color:"#7ED9A0", background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:999, padding:"2px 7px"}}>
            <span className="m-pill ok"/> ESPACE PUBLIÉ
          </div>
        </div>
      )}
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {g.name && <div className="m-side-eyebrow" style={{marginTop:12}}>{g.name}</div>}
          <ul className="m-side-list" style={!g.name ? {marginTop:12} : null}>
            {g.items.map(it => (
              <li key={it.label} className={active === it.label ? "is-active" : ""}>
                <Icon name={it.icon} size={14}/> <span>{it.label}</span>
                {it.badge && <span className="m-badge">{it.badge}</span>}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
      <div className="m-side-foot">
        <div className="m-avatar">A</div>
        <div>
          <div style={{fontSize:11, fontWeight:500}}>Anthony</div>
          <div style={{fontSize:9, color:"rgba(233, 236, 242,0.66)"}}>Phase courante · APS</div>
        </div>
      </div>
    </aside>
  );
};

const MockupCockpit = () => (
  <MockupShell title="alba-studio.co/grange-lissieu/cockpit">
    <MockupSidebar active="Cockpit"/>
    <main className="m-main">
      <div className="m-crumbs" style={{display:"flex", alignItems:"center", gap:6}}>Projets <span>›</span> Grange Lissieu <span>›</span> <b>Cockpit</b>
        <button className="btn-mini light xs" style={{marginLeft:"auto"}}><Icon name="plus" size={10}/> Nouvelle action</button>
      </div>

      <div style={{borderRadius:12, overflow:"hidden", background:"#10182C", border:"1px solid rgba(255,255,255,0.06)", display:"grid", gridTemplateColumns:"1.45fr 1fr"}}>
        <div style={{padding:"16px 16px 14px", background:"radial-gradient(120% 140% at 0% 0%, rgba(201,168,106,0.16), transparent 55%)"}}>
          <span style={{display:"inline-flex", alignItems:"center", gap:5, fontFamily:"var(--font-mono)", fontSize:6.5, letterSpacing:"0.12em", color:"rgba(233, 236, 242,0.8)", border:"1px solid rgba(255,255,255,0.16)", borderRadius:999, padding:"3px 8px"}}><span className="m-pill ok"/> LISSIEU, 69380 · RÉNOVATION</span>
          <div style={{fontFamily:"var(--font-display)", fontSize:24, fontWeight:500, color:"#E9ECF2", margin:"8px 0 3px", letterSpacing:"-0.01em"}}>Grange Lissieu</div>
          <div style={{fontSize:9.5, color:"rgba(233, 236, 242,0.65)", marginBottom:12}}>Rénovation à Lissieu (340 m²) — Suivi piloté pour Marine Armand.</div>
          <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
            <button className="btn-mini light xs">Demander une validation</button>
            <button className="btn-mini ghost xs" style={{borderColor:"rgba(255,255,255,0.22)", color:"#E9ECF2"}}>Aperçu côté MO</button>
            <button className="btn-mini ghost xs" style={{borderColor:"rgba(255,255,255,0.22)", color:"#E9ECF2"}}>Mettre en pause</button>
          </div>
        </div>
        <div style={{padding:"14px 16px", borderLeft:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.03)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 14px", alignContent:"center"}}>
          {[
            { k: "AVANCEMENT GLOBAL", v: "43", u: "%", f: "Permis en retard de 113 j", warn: true },
            { k: "PHASE COURANTE", v: "APS", f: "Échéance · 27 mars" },
            { k: "BUDGET GLOBAL", v: "217", u: "k€", f: "↗ +1 avenant" },
            { k: "DÉCISIONS EN ATTENTE", v: "1", f: "APS — Choix confirmé" },
          ].map((s) => (
            <div key={s.k}>
              <div style={{fontFamily:"var(--font-mono)", fontSize:6.5, letterSpacing:"0.12em", color:"rgba(233, 236, 242,0.5)", whiteSpace:"nowrap"}}>{s.k}</div>
              <div style={{fontFamily:"var(--font-display)", fontSize:19, color:"#E9ECF2", margin:"3px 0 2px"}}>{s.v}{s.u && <span style={{fontSize:10, color:"rgba(233, 236, 242,0.6)"}}> {s.u}</span>}</div>
              <div style={{fontSize:7.5, color: s.warn ? "#FF9C8A" : "rgba(233, 236, 242,0.55)"}}>{s.f}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-stats">
        {[
          { k: "PHASES", v: "3", d: "/7", f: "◇ 1 phase en retard", warn: true },
          { k: "DÉCISIONS", v: "1", d: "/5", f: "1 à décider par le MO" },
          { k: "BUDGET CONSOMMÉ", v: "0 €", f: "sur 18 000 € d'honoraires" },
          { k: "LIVRAISON ESTIMÉE", v: "8 mai 26", f: "déduit fin de Chantier" },
        ].map((s) => (
          <div key={s.k} className="m-stat">
            <div className="m-stat-eyebrow">{s.k}</div>
            <div className="m-stat-val" style={s.v.length > 4 ? {fontSize:16} : null}>{s.v}{s.d && <span style={{fontSize:10, color:"#98A0B0"}}>{s.d}</span>}</div>
            <div className="m-stat-foot" style={s.warn ? {color:"#C0614F"} : null}>{s.f}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:10}}>
        <div className="m-card" style={{borderTop:"2px solid #C9A86A"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2}}>
            <div className="m-card-title" style={{margin:0}}>Actions de la semaine</div>
            <button className="btn-mini ghost xs"><Icon name="plus" size={9}/> Ajouter</button>
          </div>
          <div style={{fontSize:8.5, color:"#6E7890", marginBottom:8}}>Ce qu'il reste à faire pour avancer</div>
          <div className="m-task">
            <div className="m-task-icon"><Icon name="check" size={12}/></div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500, fontSize:10.5}}>Décision APS — Choix confirmé</div>
              <div style={{fontSize:8.5, color:"#6E7890"}}>Equa : Plan 1, Plan 2, Plan 3</div>
            </div>
            <span className="m-tag-warn xs">URGENT →</span>
          </div>
          <div className="m-task">
            <div className="m-task-icon"><Icon name="bell" size={12}/></div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500, fontSize:10.5}}>Phase Permis en retard de 113 j</div>
              <div style={{fontSize:8.5, color:"#6E7890"}}>Marquer terminée ou reporter</div>
            </div>
            <span className="m-tag-warn xs">URGENT →</span>
          </div>
        </div>
        <div className="m-card">
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8}}>
            <div className="m-card-title" style={{margin:0}}>Équipe projet</div>
            <button className="btn-mini ghost xs">Inviter</button>
          </div>
          {[
            { i: "FD", n: "Filipe De Sousa", r: "Maçon · DSX Freres" },
            { i: "DC", n: "Didier Clément", r: "Droniste · My Drone solution" },
          ].map((p) => (
            <div key={p.i} style={{display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:"1px solid rgba(11,18,36,0.05)"}}>
              <div className="m-avatar sm">{p.i}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, fontWeight:500, color:"#0B1224"}}>{p.n}</div>
                <div style={{fontSize:8.5, color:"#6E7890"}}>{p.r}</div>
              </div>
              <span className="m-pill ok"/>
            </div>
          ))}
        </div>
      </div>
    </main>
  </MockupShell>
);

const MockupProject = () => (
  <MockupShell title="alba-studio.co">
    <MockupSidebar mode="workspace" active="Tableau de bord"/>
    <main className="m-main">
      <div className="m-greet">
        <div className="m-grid-pattern"/>
        <h3>Bonjour, Anthony <span>👋</span></h3>
        <p>Gérez vos projets et priorisez vos actions.</p>
        <div className="m-week">
          {["L 4","M 5","M 6","J 7","V 8","S 9","D 10"].map((d,i) => (
            <div key={d} className={i===0?"is-today":""}>{d}</div>
          ))}
        </div>
        <div className="m-greet-actions">
          <button className="btn-mini light"><Icon name="plus" size={12}/> Créer un projet</button>
          <button className="btn-mini ghost"><Icon name="folder" size={12}/> Voir tous les projets</button>
        </div>
      </div>
      <div className="m-stats">
        <div className="m-stat">
          <div className="m-stat-eyebrow"><span className="m-pill alert"/> URGENCES</div>
          <div className="m-stat-val">1</div>
          <div className="m-stat-foot">À traiter en priorité</div>
        </div>
        <div className="m-stat">
          <div className="m-stat-eyebrow"><span className="m-pill ok"/> À TRAITER</div>
          <div className="m-stat-val">2</div>
          <div className="m-stat-foot">Actions du jour</div>
        </div>
        <div className="m-stat">
          <div className="m-stat-eyebrow"><span className="m-pill"/> DÉCISIONS</div>
          <div className="m-stat-val">1</div>
          <div className="m-stat-foot">En attente</div>
        </div>
        <div className="m-stat">
          <div className="m-stat-eyebrow"><span className="m-pill"/> SOLDE</div>
          <div className="m-stat-val">600 €</div>
          <div className="m-stat-foot">Aucun impayé</div>
        </div>
      </div>
    </main>
  </MockupShell>
);

const MDEC_CHIP = { display:"inline-flex", alignItems:"center", gap:4, fontFamily:"var(--font-mono)", fontSize:7, letterSpacing:"0.05em", borderRadius:999, padding:"2px 7px", whiteSpace:"nowrap" };

const MockupDecisions = () => (
  <MockupShell title="alba-studio.co/grange-lissieu/decisions">
    <MockupSidebar active="Décisions & budget"/>
    <main className="m-main">
      <div className="m-page-h">
        <div>
          <div className="m-page-title">Vue <em style={{fontStyle:"italic", color:"#C9A86A", fontWeight:400}}>décisions</em></div>
          <div style={{fontFamily:"var(--font-mono)", fontSize:7.5, letterSpacing:"0.05em", color:"#6E7890", marginTop:3}}>Chaque décision matérialise un arbitrage financier. Les deux vues sont liées.</div>
        </div>
        <div style={{display:"flex", gap:5}}>
          <span style={{...MDEC_CHIP, background:"#0B1224", color:"#E9ECF2"}}>Vue décisions <b style={{color:"#C9A86A"}}>5</b></span>
          <span style={{...MDEC_CHIP, background:"#fff", border:"1px solid rgba(11,18,36,0.12)", color:"#3A445C"}}>€ Vue financière</span>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:10}}>
        <div className="m-card">
          <div className="m-card-eyebrow">DÉCISIONS</div>
          <div style={{fontFamily:"var(--font-display)", fontSize:22, color:"#0B1224", margin:"4px 0 7px"}}>3<span style={{fontSize:11, color:"#98A0B0"}}>/5</span></div>
          <div style={{display:"flex", gap:4, flexWrap:"wrap"}}>
            <span style={{...MDEC_CHIP, background:"rgba(201,168,106,0.14)", border:"1px solid rgba(201,168,106,0.4)", color:"#A98C50"}}>1 à décider</span>
            <span style={{...MDEC_CHIP, background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)", color:"#3E8E5A"}}>3 validées</span>
          </div>
        </div>
        <div className="m-card">
          <div className="m-card-eyebrow">IMPACT FINANCIER DES DÉCISIONS</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8, marginTop:6}}>
            {[
              { k: "Validées", v: "−600 €", red: true },
              { k: "En attente", v: "0 €" },
              { k: "Avenants validés", v: "0 €" },
            ].map((s) => (
              <div key={s.k}>
                <div style={{fontSize:8, color:"#98A0B0"}}>{s.k}</div>
                <div style={{fontFamily:"var(--font-display)", fontSize:16, color: s.red ? "#C0614F" : "#0B1224", marginTop:2}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:"flex", alignItems:"center", gap:5}}>
        <span style={{...MDEC_CHIP, background:"#0B1224", color:"#E9ECF2"}}>Toutes <b style={{color:"#C9A86A"}}>5</b></span>
        <span style={{...MDEC_CHIP, background:"#fff", border:"1px solid rgba(11,18,36,0.12)", color:"#3A445C"}}>À décider 1</span>
        <span style={{...MDEC_CHIP, background:"#fff", border:"1px solid rgba(11,18,36,0.12)", color:"#3A445C"}}>Validées 3</span>
        <button className="btn-mini light xs" style={{marginLeft:"auto"}}><Icon name="plus" size={9}/> Créer une décision</button>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        {[
          { t: "Photo partagée", sent: "Envoyée le 24 juin 2026", status: "Validée — 25 juin 2026", ok: true, option: true },
          { t: "Décisions structurées — APD", sent: "Envoyée le 24 avr. 2026", status: "Validée — 3 mai 2026", ok: true },
          { t: "Décisions structurées — Esquisse", sent: "Envoyée le 24 avr. 2026", status: "Refusée — 25 juin 2026", ok: false },
          { t: "Permis — Choix confirmé", sent: "Envoyée le 21 mars 2026", status: "Validée — 21 mars 2026", ok: true, impact: "Impact −600 €" },
        ].map((d, i) => (
          <div key={i} style={{background:"#fff", border:"1px solid rgba(11,18,36,0.07)", borderLeft: d.ok ? "3px solid #4E9668" : "3px solid #C0614F", borderRadius:10, padding:"9px 11px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:6}}>
              <div style={{fontFamily:"var(--font-display)", fontSize:12.5, fontWeight:500, color:"#0B1224", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{d.t}</div>
              <button className="btn-mini ghost xs" style={{flex:"none"}}>Relancer le MO</button>
            </div>
            <div style={{display:"flex", gap:4, flexWrap:"wrap", margin:"6px 0 0"}}>
              <span style={{...MDEC_CHIP, background:"#ECEEF2", color:"#6E7890"}}>{d.sent}</span>
              <span style={d.ok
                ? {...MDEC_CHIP, background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)", color:"#3E8E5A"}
                : {...MDEC_CHIP, background:"rgba(192,97,79,0.1)", border:"1px solid rgba(192,97,79,0.35)", color:"#C0614F"}}>{d.ok ? "✓ " : "✕ "}{d.status}</span>
            </div>
            {d.option && (
              <div style={{display:"flex", alignItems:"center", gap:6, marginTop:7, background:"rgba(201,168,106,0.1)", border:"1px solid rgba(201,168,106,0.35)", borderRadius:7, padding:"5px 8px"}}>
                <Icon name="doc" size={10} style={{color:"#A98C50"}}/>
                <span style={{fontSize:8.5, color:"#0B1224", fontWeight:500}}>Photo du chat.jpg</span>
                <span style={{...MDEC_CHIP, background:"#fff", border:"1px solid rgba(201,168,106,0.5)", color:"#A98C50", marginLeft:"auto"}}>✓ Choisi</span>
              </div>
            )}
            {d.impact && <div style={{fontSize:8.5, color:"#C0614F", fontWeight:600, marginTop:7}}>{d.impact}</div>}
          </div>
        ))}
      </div>
    </main>
  </MockupShell>
);

const MockupMessagerie = () => (
  <MockupShell>
    <MockupSidebar active="Chat"/>
    <main className="m-main m-msg">
      <div className="m-page-h">
        <div>
          <div className="m-card-eyebrow">MESSAGERIE</div>
          <div className="m-page-title">Grange Lissieu</div>
        </div>
      </div>
      <div className="m-thread">
        <div className="m-msg-row">
          <div className="m-avatar sm">ML</div>
          <div className="m-bubble">
            <div className="m-bubble-h">Marc Lévy · Architecte <span>· 14:32</span></div>
            <p>Bonjour Marie, je vous joins les 3 propositions d'aménagement pour la cuisine. Hâte d'avoir votre retour.</p>
            <div className="m-attach"><Icon name="doc" size={12}/> propositions-cuisine.pdf</div>
          </div>
        </div>
        <div className="m-msg-row me">
          <div className="m-bubble me">
            <div className="m-bubble-h">Vous <span>· 14:48</span></div>
            <p>Merci Marc, la proposition n°2 est ma préférée. On peut caler un point demain ?</p>
          </div>
          <div className="m-avatar sm gold">MA</div>
        </div>
      </div>
    </main>
  </MockupShell>
);

const MockupMateriaux = () => {
  const swatches = [
    { n: "Chêne massif brossé", r: "CHB-240-NAT", p: "84 €/m²", bg: "repeating-linear-gradient(90deg, rgba(60,35,10,0.14) 0 2px, transparent 2px 11px), linear-gradient(135deg, #C9A876, #96733F)" },
    { n: "Pierre de Bourgogne", r: "PBG-060-ADO", p: "146 €/m²", bg: "linear-gradient(135deg, #BCC1CE, #858FA7)" },
    { n: "Laiton brossé", r: "LTB-015-BRO", p: "215 €/ml", bg: "linear-gradient(120deg, #D9B36B, #A67C3B 40%, #E8CD8F 65%, #B98F4C)" },
    { n: "Béton ciré minéral", r: "BCM-020-GRA", p: "92 €/m²", bg: "linear-gradient(135deg, #9DA3AB, #686E78)" },
    { n: "Verre cannelé clair", r: "VCC-008-CAN", p: "310 €/m²", bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 3px, rgba(190,212,220,0.18) 3px 11px), linear-gradient(135deg, #B9CDD4, #93ABB4)" },
    { n: "Enduit chaux ferré", r: "ECF-010-SAB", p: "46 €/m²", bg: "linear-gradient(135deg, #D5D9E1, #AEB5C5)" },
  ];
  return (
    <MockupShell title="alba-studio.co/materiautheque">
      <MockupSidebar mode="workspace" active="Bibliothèque matériaux"/>
      <main className="m-main">
        <div className="m-page-h">
          <div>
            <div className="m-card-eyebrow">MATÉRIAUTHÈQUE · AGENCE</div>
            <div className="m-page-title">12 matériaux · 8 fournisseurs</div>
          </div>
          <button className="btn-mini light xs"><Icon name="plus" size={11}/> Ajouter</button>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10}}>
          {swatches.map((s, i) => (
            <div key={i} style={{background:"#fff", border:"1px solid rgba(11,18,36,0.06)", borderRadius:10, overflow:"hidden"}}>
              <div style={{height:52, background: s.bg}}></div>
              <div style={{padding:"8px 10px"}}>
                <div style={{fontSize:10.5, fontWeight:500, color:"#0B1224"}}>{s.n}</div>
                <div style={{fontFamily:"var(--font-mono)", fontSize:8.5, letterSpacing:"0.08em", color:"#6E7890", margin:"2px 0 4px"}}>{s.r}</div>
                <div style={{fontSize:9.5, color:"#C9A86A", fontWeight:600}}>{s.p}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </MockupShell>
  );
};

const MockupChantier = () => (
  <MockupShell title="alba-studio.co/grange-lissieu/terrain">
    <MockupSidebar active="Projet"/>
    <main className="m-main">
      <div style={{display:"flex", gap:4, justifyContent:"flex-end"}}>
        {["Visuels 16", "Phases", "Calendrier", "Terrain", "Réserves"].map((t) => (
          <span key={t} style={{...MDEC_CHIP, ...(t === "Terrain" ? {background:"#0B1224", color:"#E9ECF2"} : {background:"#fff", border:"1px solid rgba(11,18,36,0.12)", color:"#3A445C"})}}>{t}</span>
        ))}
      </div>
      <div className="m-page-h">
        <div>
          <div className="m-page-title">Sur le <em style={{fontStyle:"italic", color:"#C9A86A", fontWeight:400}}>terrain</em></div>
          <div style={{fontFamily:"var(--font-mono)", fontSize:7.5, letterSpacing:"0.05em", color:"#6E7890", marginTop:3}}>18 événements · 3 remarques · sur Grange Lissieu</div>
        </div>
        <button className="btn-mini light xs"><Icon name="plus" size={10}/> Nouveau</button>
      </div>

      <div style={{display:"flex", gap:5}}>
        <span style={{...MDEC_CHIP, background:"#0B1224", color:"#E9ECF2"}}>Chronologie <b style={{color:"#C9A86A"}}>18</b></span>
        <span style={{...MDEC_CHIP, background:"#fff", border:"1px solid rgba(11,18,36,0.12)", color:"#3A445C"}}>Remarques 3</span>
      </div>

      <div className="m-stats">
        {[
          { k: "ÉVÉNEMENTS CE MOIS", v: "0", f: "18 au total" },
          { k: "INTERVENTIONS", v: "1", f: "En cours sur chantier" },
          { k: "VISITES DE CHANTIER", v: "2", f: "3 remarques soulevées" },
          { k: "COMPTES-RENDUS", v: "3", f: "À jour" },
        ].map((s) => (
          <div key={s.k} className="m-stat">
            <div className="m-stat-eyebrow">{s.k}</div>
            <div className="m-stat-val">{s.v}</div>
            <div className="m-stat-foot">{s.f}</div>
          </div>
        ))}
      </div>

      <div style={{fontFamily:"var(--font-mono)", fontSize:7.5, letterSpacing:"0.1em", color:"#6E7890"}}>JEUDI 25 JUIN 2026</div>

      <div style={{background:"#fff", border:"1px solid rgba(11,18,36,0.07)", borderRadius:10, padding:"9px 11px"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:5, fontFamily:"var(--font-mono)", fontSize:7, letterSpacing:"0.1em", color:"#6E7890"}}><span className="m-pill"/> PRÉ-RÉCEPTION (OPR)</div>
          <span style={{...MDEC_CHIP, background:"#ECEEF2", color:"#6E7890"}}>Brouillon</span>
        </div>
        <div style={{fontFamily:"var(--font-display)", fontSize:13, fontWeight:500, color:"#0B1224", marginTop:4}}>Nouvelle pré-réception (OPR)</div>
      </div>

      <div style={{background:"#fff", border:"1px solid rgba(11,18,36,0.07)", borderRadius:10, padding:"9px 11px"}}>
        <div style={{display:"flex", alignItems:"center", gap:5}}>
          <span style={{...MDEC_CHIP, background:"rgba(201,168,106,0.16)", border:"1px solid rgba(201,168,106,0.45)", color:"#A98C50"}}><Icon name="doc" size={8}/> PV RÉCEPTION</span>
          <span style={{fontFamily:"var(--font-mono)", fontSize:7, letterSpacing:"0.1em", color:"#6E7890"}}>ACTE JURIDIQUE</span>
          <span style={{...MDEC_CHIP, background:"#ECEEF2", color:"#6E7890", marginLeft:"auto"}}>Brouillon</span>
        </div>
        <div style={{fontFamily:"var(--font-display)", fontSize:13, fontWeight:500, color:"#0B1224", margin:"5px 0 2px"}}>Réception finale</div>
        <div style={{fontSize:8.5, color:"#6E7890"}}>25 juin 2026 · 0 réserve retenue · <span style={{color:"#3E8E5A", fontWeight:600}}>Sans réserve</span></div>
      </div>
    </main>
  </MockupShell>
);

/* Real app screenshot in a browser frame */
const RealShot = ({ src, title = "alba-studio.co", alt = "Interface ALBA Studio" }) => (
  <div className="mockup realshot">
    <div className="mockup-bar">
      <div className="mockup-dots">
        <span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/>
      </div>
      <div className="mockup-url">
        <Icon name="lock" size={11}/> {title}
      </div>
      <div style={{width:46}}/>
    </div>
    <img src={src} alt={alt} style={{display:"block", width:"100%", height:"auto"}}/>
  </div>
);

/* ═════════════════════════════════════════════════════════════════════════════
   « Tester en 1 clic » — un FORMULAIRE, jamais un lien

   Ce bouton poste vers demo-express, qui CRÉE UN COMPTE et renvoie le visiteur
   dedans, déjà connecté. Écrit en <a href>, il en créerait un chaque fois qu'un
   robot d'indexation suit le lien, qu'une messagerie déplie l'aperçu d'une URL,
   ou qu'un antivirus d'entreprise vérifie une adresse : des centaines de comptes
   sans qu'un humain ait cliqué. Le serveur refuse d'ailleurs les GET en 405.

   Un <form method="post"> suffit, et il n'a besoin d'AUCUN JavaScript : les
   robots ne postent pas. C'est aussi ce qui le rend fonctionnel avant même que
   React ne soit monté, et chez un visiteur qui a coupé les scripts.

   `display: contents` sur le <form> (styles.css) le rend transparent à la mise
   en page : le <button> se comporte comme s'il était l'enfant direct de
   `.hero-actions`, sans quoi il sortirait de la disposition en flex.

   ─────────────────────────────────────────────────────────────────────────────
   L'ADRESSE EST ÉCRITE ICI, ET config.js NE FAIT QUE LA REMPLACER

   Ce composant lisait `window.ALBA_POINT_ESSAI` et, à défaut, rendait un
   <a href="#fonctionnalites"> — un repli qui paraissait prudent. Il ne l'était
   pas : il produisait un bouton d'apparence identique qui se contentait de
   faire défiler la page. Symptôme exact remonté par Anthony, « on clique, on
   reste sur la page ».

   Et il suffisait pour ça d'un config.js d'avant l'ajout de la constante,
   resté dans le cache du navigateur ou en périphérie Cloudflare. La page se
   chargeait, React montait, et remplaçait le formulaire correct du HTML
   prérendu par une ancre inerte.

   D'où l'inversion : l'adresse est la valeur par défaut du composant, et
   config.js ne peut que la REMPLACER. Un config.js absent, périmé ou muet
   laisse désormais un formulaire qui marche. Il n'existe plus aucun chemin de
   code qui transforme ce bouton en lien — tests/smoke.mjs le vérifie en
   rejouant la page avec un config.js amputé.
   ═════════════════════════════════════════════════════════════════════════════ */
const POINT_ESSAI_PAR_DEFAUT =
  "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/demo-express";

/* ─────────────────────────────────────────────────────────────────────────────
 * UN SEUL ENVOI, ET IL FAUT QUE ÇA SE VOIE
 *
 * Le serveur ne se contente pas d'ouvrir une session : il crée un compte, un
 * espace de travail, deux chantiers avec leurs phases, leurs décisions, leur
 * budget et leurs réserves. Sur un téléphone en 5G moyenne, ça prend plusieurs
 * secondes pendant lesquelles la page ne bouge pas d'un pixel.
 *
 * Anthony a tapé plusieurs fois — n'importe qui l'aurait fait. Chaque tap
 * relance un POST, et le plafond est de TROIS essais par heure : trois taps
 * nerveux et le visiteur est verrouillé pour une heure, sur un bouton qui
 * fonctionnait.
 *
 * Deux corrections, et le verrou compte plus que l'affichage :
 *
 *   · un verrou SYNCHRONE, hors de l'état React. Un `useState` est appliqué au
 *     rendu suivant : deux taps rapprochés le liraient tous les deux à `false`
 *     et partiraient tous les deux. C'est la même erreur que sur le bouton de
 *     paiement, où tests/paiement.mjs l'avait attrapée ;
 *   · il est PARTAGÉ par tous les boutons de la page — le hero et le flottant
 *     portent le même libellé et le même geste, un verrou par instance
 *     laisserait passer un envoi par bouton.
 *
 * Ce qu'on ne fait SURTOUT pas : `disabled` sur le bouton. Désactiver un bouton
 * de soumission pendant que l'événement `submit` se propage annule la
 * soumission dans plusieurs navigateurs — on empêcherait le second envoi en
 * supprimant le premier. Le verrou bloque dans `onSubmit`, le reste n'est que
 * du visuel.
 *
 * Et le filet : si la navigation n'aboutit pas — réseau coupé, serveur muet —
 * le verrou se relâche au bout de 25 secondes. Sans quoi un échec silencieux
 * laisserait un bouton mort jusqu'au rechargement.
 * ───────────────────────────────────────────────────────────────────────────── */
let ESSAI_EN_COURS = false;                     // partagé par tous les boutons
const EVENEMENT_ESSAI = "alba:essai-en-cours";  // pour que tous l'affichent

const BoutonEssai = ({ className = "btn btn-primary", children }) => {
  const remplacement = typeof window !== "undefined" ? window.ALBA_POINT_ESSAI : null;
  // Une valeur vide, nulle ou non textuelle ne remplace rien.
  const point = typeof remplacement === "string" && remplacement.trim()
    ? remplacement.trim()
    : POINT_ESSAI_PAR_DEFAUT;

  const [ouverture, setOuverture] = React.useState(false);

  React.useEffect(() => {
    const suivre = () => setOuverture(ESSAI_EN_COURS);
    /* Retour par le bouton « précédent » : iOS restitue la page telle qu'elle
       était, verrou compris. Sans cette remise à zéro, le visiteur revient sur
       un bouton qui annonce « Ouverture… » et ne répond plus. */
    const reprise = () => { ESSAI_EN_COURS = false; setOuverture(false); };
    window.addEventListener(EVENEMENT_ESSAI, suivre);
    window.addEventListener("pageshow", reprise);
    return () => {
      window.removeEventListener(EVENEMENT_ESSAI, suivre);
      window.removeEventListener("pageshow", reprise);
    };
  }, []);

  const envoyer = (ev) => {
    if (ESSAI_EN_COURS) { ev.preventDefault(); return; }  // le tap de trop
    ESSAI_EN_COURS = true;
    // Pas de preventDefault ici : le formulaire DOIT partir.
    window.dispatchEvent(new Event(EVENEMENT_ESSAI));
    window.setTimeout(() => {
      ESSAI_EN_COURS = false;
      window.dispatchEvent(new Event(EVENEMENT_ESSAI));
    }, 25000);
  };

  return (
    <form className="essai-express" method="post" action={point} onSubmit={envoyer}>
      <button type="submit" className={`${className}${ouverture ? " est-en-ouverture" : ""}`}
              aria-busy={ouverture ? "true" : "false"}>
        {ouverture
          ? <><span className="essai-rouet" aria-hidden="true"/>{L("Ouverture de votre espace…", "Opening your workspace…")}</>
          : children}
      </button>
    </form>
  );
};

/* Message de retour de l'essai express.
 *
 * Quand le serveur ne peut pas ouvrir d'espace, il renvoie le visiteur ICI avec
 * `?essai=trop_de_tentatives` ou `?essai=indisponible`. Sans ce composant, il
 * revient sur la page d'accueil sans la moindre explication et croit que le
 * bouton est cassé.
 *
 * L'adresse est nettoyée aussitôt (replaceState) : un rechargement ou un
 * partage du lien ne doit pas rejouer un message qui n'a plus lieu d'être. */
const MessageEssai = () => {
  const [code, setCode] = React.useState(null);
  React.useEffect(() => {
    let vu = null;
    try {
      vu = new URLSearchParams(window.location.search).get("essai");
    } catch (e) { return; }
    if (!vu || vu === "1") return;      // `essai=1` est le succès, côté application
    setCode(vu);
    try {
      const u = new URL(window.location.href);
      u.searchParams.delete("essai");
      window.history.replaceState({}, "", u.pathname + u.search + u.hash);
    } catch (e) { /* adresse exotique : le message reste, c'est le moindre mal */ }
  }, []);

  if (!code) return null;
  const MESSAGES = {
    trop_de_tentatives: L(
      "Vous avez déjà ouvert plusieurs essais récemment. Réessayez dans une heure, ou écrivez-nous — on vous ouvre l'accès nous-mêmes.",
      "You've already opened several trials recently. Try again in an hour, or write to us — we'll open access for you ourselves."),
    indisponible: L(
      "L'essai n'a pas pu s'ouvrir. Ce n'est pas de votre fait : écrivez-nous et on règle ça.",
      "The trial couldn't be opened. It's not your doing: write to us and we'll sort it out."),
  };
  const texte = MESSAGES[code] || MESSAGES.indisponible;
  return (
    <div className="essai-message" role="status">
      <Icon name="info" size={16}/>
      <p>{texte}</p>
      <a href="#contact" className="essai-message-lien">{L("Nous écrire", "Write to us")}</a>
      <button type="button" className="essai-message-fermer" onClick={() => setCode(null)}
              aria-label={L("Fermer", "Close")}>×</button>
    </div>
  );
};

window.Icon = Icon;
window.BoutonEssai = BoutonEssai;
window.MessageEssai = MessageEssai;
window.StoreBadges = StoreBadges;
window.PhotoPlaceholder = PhotoPlaceholder;
window.AppMockup = AppMockup;
window.RealShot = RealShot;
