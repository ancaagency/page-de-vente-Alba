/* Audience — 3 variants A / B / C, switchable via Tweak, bilingual */

const getAudienceData = () => [
  {
    num: "01",
    icon: "compass",
    h: L("Architectes DPLG / HMONP", "Registered architects"),
    sub: L("Libéral · Petite agence", "Solo · Small practice"),
    p: L("ALBA structure votre suivi sans imposer un workflow d'usine, vous gardez votre méthode, on automatise la coordination.", "ALBA structures your tracking without imposing a factory workflow, you keep your method, we automate the coordination."),
    tags: [L("Libéral", "Independent"), L("1–3 personnes", "1–3 people")],
    tone: "stone",
    meta: [L("Indépendants", "Independents"), L("1 à 3 projets", "1 to 3 projects")],
    cta: L("Voir la démo libéral", "See the solo demo"),
  },
  {
    num: "02",
    icon: "users",
    h: L("Agences de taille moyenne", "Mid-size practices"),
    sub: L("5 à 20 collaborateurs", "5 to 20 people"),
    p: L("Vue agence, multi-projets, droits par profil, orchestrer une équipe sans tout micro-manager, en gardant vos process.", "Practice view, multi-project, per-role permissions, run a team without micro-managing, keeping your processes."),
    tags: [L("5–20 pers.", "5–20 people"), L("Multi-projets", "Multi-project")],
    tone: "sand",
    meta: [L("Agences", "Practices"), L("5 à 50 projets", "5 to 50 projects")],
    cta: L("Voir la démo agence", "See the practice demo"),
  },
  {
    num: "03",
    icon: "shield",
    h: L("Maîtres d'œuvre", "Project managers"),
    sub: L("Coordination & validations", "Coordination & approvals"),
    p: L("Vous engagez votre responsabilité. ALBA trace chaque arbitrage, archive chaque échange, sécurise vos garanties.", "Your liability is on the line. ALBA traces every decision, archives every exchange, secures your guarantees."),
    tags: [L("MOE", "PM"), L("Visa", "Sign-off")],
    tone: "night",
    meta: [L("MOE généraliste", "General PM"), L("Pluri-disciplines", "Multi-discipline")],
    cta: L("Découvrir", "Learn more"),
  },
  {
    num: "04",
    icon: "layers",
    h: L("BET structure", "Structural engineers"),
    sub: L("Béton · Métal · Bois", "Concrete · Steel · Timber"),
    p: L("Gros volumes de plans EXE à valider. Versions trackées, visa structuré, signatures numériques, vos plans ne se perdent plus dans une boîte mail.", "High volumes of shop drawings to approve. Tracked versions, structured sign-off, digital signatures, your drawings no longer get lost in an inbox."),
    tags: [L("Béton", "Concrete"), L("Métal", "Steel"), L("Bois", "Timber")],
    tone: "forest",
    meta: [L("BET STR", "Structural"), L("Plans EXE", "Shop drawings")],
    cta: L("Découvrir", "Learn more"),
  },
  {
    num: "05",
    icon: "wave",
    h: L("BET fluides", "MEP engineers"),
    sub: L("CVC · Plomberie · Électricité", "HVAC · Plumbing · Electrical"),
    p: L("Multi-lots, beaucoup d'allers-retours. Coordination par lot, visas séquencés, exports par corps d'état, pensé pour vos boucles courtes.", "Multiple trades, lots of back-and-forth. Per-trade coordination, sequenced sign-offs, per-package exports, built for your short loops."),
    tags: [L("CVC", "HVAC"), L("Plomberie", "Plumbing"), L("Électricité", "Electrical")],
    tone: "terracotta",
    meta: [L("BET fluides", "MEP"), L("Multi-lots", "Multi-trade")],
    cta: L("Découvrir", "Learn more"),
  },
];

const AudienceHead = () => (
  <Reveal className="aud2-head">
    <div>
      <span className="eyebrow">{L("Pour qui ?", "Who is it for?")}</span>
      <h2>{L("Conçu pour celles et ceux qui ", "Built for the people who ")}<em>{L("portent la responsabilité du projet.", "carry the project's responsibility.")}</em></h2>
    </div>
    <p>{L("ALBA s'adresse aux professionnels de la maîtrise d'œuvre qui pilotent des projets à plusieurs voix, et qui ne peuvent plus se permettre de perdre du temps en coordination.", "ALBA is for design and engineering professionals who run projects with many voices, and can no longer afford to lose time on coordination.")}</p>
  </Reveal>
);

const AudienceA = () => (
  <Reveal className="aud-A">
    {getAudienceData().map((c, i) => (
      <div key={i} className="aud-A-card">
        <div className="aud-A-photo">
          <PhotoPlaceholder tone={c.tone} ratio="4/3" label=""/>
          <span className="aud-A-num">{c.num} — {c.sub.split(" · ")[0].toUpperCase()}</span>
        </div>
        <div className="aud-A-body">
          <h3>{c.h}</h3>
          <p>{c.p}</p>
          <div className="aud-A-tags">
            {c.tags.map((t, j) => <span key={j}>{t}</span>)}
          </div>
          <div className="aud-A-foot">
            <span>{L("EN SAVOIR +", "LEARN MORE +")}</span>
            <Icon name="arrow-up-right" size={14}/>
          </div>
        </div>
      </div>
    ))}
  </Reveal>
);

const AudienceB = () => (
  <Reveal className="aud-B">
    {getAudienceData().map((c, i) => (
      <div key={i} className="aud-B-row">
        <div className="aud-B-num">— {c.num}</div>
        <div className="aud-B-title">
          <div className="sub">{c.sub}</div>
          <h3>{c.h}</h3>
        </div>
        <p className="aud-B-desc">{c.p}</p>
        <div className="aud-B-meta">
          <span>{c.meta[0]}</span>
          <span>{c.meta[1]}</span>
        </div>
        <div className="aud-B-arrow">
          <Icon name="arrow-up-right" size={14}/>
        </div>
      </div>
    ))}
  </Reveal>
);

const AudienceC = () => (
  <Reveal className="aud-C">
    {getAudienceData().map((c, i) => (
      <div key={i} className="aud-C-card">
        <div className="aud-C-num">{c.num}</div>
        <div className="aud-C-title">
          <div className="sub">{c.sub}</div>
          <h3>{c.h}</h3>
        </div>
        <div>
          <p className="aud-C-desc">{c.p}</p>
          <div className="aud-C-tags">
            {c.tags.map((t, j) => <span key={j}>{t}</span>)}
          </div>
        </div>
        <div className="aud-C-arrow">
          <Icon name="arrow-up-right" size={14}/>
        </div>
      </div>
    ))}
  </Reveal>
);

const Audience = ({ variant = "A" }) => {
  const isC = variant === "C";
  return (
    <section className={`section ${isC ? "aud-C-section" : "audience"}`} id="pour-qui">
      <div className="container">
        <AudienceHead/>
        {variant === "A" && <AudienceA/>}
        {variant === "B" && <AudienceB/>}
        {variant === "C" && <AudienceC/>}
      </div>
    </section>
  );
};

window.Audience = Audience;
