/* Audience — 3 variants A / B / C, switchable via Tweak, bilingual */

const getAudienceData = () => [
  {
    num: "01",
    icon: "compass",
    h: Txt("pour-qui.architectes-dplg-hmonp", "Architectes DPLG / HMONP", "Registered architects"),
    sub: Txt("pour-qui.liberal-petite-agence", "Libéral · Petite agence", "Solo · Small practice"),
    p: Txt("pour-qui.alba-structure-votre-suivi-sans-imposer", "ALBA structure votre suivi sans imposer un workflow d'usine, vous gardez votre méthode, on automatise la coordination.", "ALBA structures your tracking without imposing a factory workflow, you keep your method, we automate the coordination."),
    tags: [Txt("pour-qui.liberal", "Libéral", "Independent"), Txt("pour-qui.1-3-personnes", "1–3 personnes", "1–3 people")],
    tone: "stone",
    meta: [Txt("pour-qui.independants", "Indépendants", "Independents"), Txt("pour-qui.1-a-3-projets", "1 à 3 projets", "1 to 3 projects")],
    cta: Txt("pour-qui.voir-la-demo-liberal", "Voir la démo libéral", "See the solo demo"),
  },
  {
    num: "02",
    icon: "users",
    h: Txt("pour-qui.agences-de-taille-moyenne", "Agences de taille moyenne", "Mid-size practices"),
    sub: Txt("pour-qui.5-a-20-collaborateurs", "5 à 20 collaborateurs", "5 to 20 people"),
    p: Txt("pour-qui.vue-agence-multi-projets-droits-par", "Vue agence, multi-projets, droits par profil, orchestrer une équipe sans tout micro-manager, en gardant vos process.", "Practice view, multi-project, per-role permissions, run a team without micro-managing, keeping your processes."),
    tags: [Txt("pour-qui.5-20-pers", "5–20 pers.", "5–20 people"), Txt("pour-qui.multi-projets", "Multi-projets", "Multi-project")],
    tone: "sand",
    meta: [Txt("pour-qui.agences", "Agences", "Practices"), Txt("pour-qui.5-a-50-projets", "5 à 50 projets", "5 to 50 projects")],
    cta: Txt("pour-qui.voir-la-demo-agence", "Voir la démo agence", "See the practice demo"),
  },
  {
    num: "03",
    icon: "shield",
    h: Txt("pour-qui.maitres-d-uvre", "Maîtres d'œuvre", "Project managers"),
    sub: Txt("pour-qui.coordination-validations", "Coordination & validations", "Coordination & approvals"),
    p: Txt("pour-qui.vous-engagez-votre-responsabilite-alba-trace", "Vous engagez votre responsabilité. ALBA trace chaque arbitrage, archive chaque échange, sécurise vos garanties.", "Your liability is on the line. ALBA traces every decision, archives every exchange, secures your guarantees."),
    tags: [Txt("pour-qui.moe", "MOE", "PM"), Txt("pour-qui.visa", "Visa", "Sign-off")],
    tone: "night",
    meta: [Txt("pour-qui.moe-generaliste", "MOE généraliste", "General PM"), Txt("pour-qui.pluri-disciplines", "Pluri-disciplines", "Multi-discipline")],
    cta: Txt("pour-qui.decouvrir", "Découvrir", "Learn more"),
  },
  {
    num: "04",
    icon: "layers",
    h: Txt("pour-qui.bet-structure", "BET structure", "Structural engineers"),
    sub: Txt("pour-qui.beton-metal-bois", "Béton · Métal · Bois", "Concrete · Steel · Timber"),
    p: Txt("pour-qui.gros-volumes-de-plans-exe-a", "Gros volumes de plans EXE à valider. Versions trackées, visa structuré, signatures numériques, vos plans ne se perdent plus dans une boîte mail.", "High volumes of shop drawings to approve. Tracked versions, structured sign-off, digital signatures, your drawings no longer get lost in an inbox."),
    tags: [Txt("pour-qui.beton", "Béton", "Concrete"), Txt("pour-qui.metal", "Métal", "Steel"), Txt("pour-qui.bois", "Bois", "Timber")],
    tone: "forest",
    meta: [Txt("pour-qui.bet-str", "BET STR", "Structural"), Txt("pour-qui.plans-exe", "Plans EXE", "Shop drawings")],
    cta: Txt("pour-qui.decouvrir-2", "Découvrir", "Learn more"),
  },
  {
    num: "05",
    icon: "wave",
    h: Txt("pour-qui.bet-fluides", "BET fluides", "MEP engineers"),
    sub: Txt("pour-qui.cvc-plomberie-electricite", "CVC · Plomberie · Électricité", "HVAC · Plumbing · Electrical"),
    p: Txt("pour-qui.multi-lots-beaucoup-d-allers-retours", "Multi-lots, beaucoup d'allers-retours. Coordination par lot, visas séquencés, exports par corps d'état, pensé pour vos boucles courtes.", "Multiple trades, lots of back-and-forth. Per-trade coordination, sequenced sign-offs, per-package exports, built for your short loops."),
    tags: [Txt("pour-qui.cvc", "CVC", "HVAC"), Txt("pour-qui.plomberie", "Plomberie", "Plumbing"), Txt("pour-qui.electricite", "Électricité", "Electrical")],
    tone: "terracotta",
    meta: [Txt("pour-qui.bet-fluides-2", "BET fluides", "MEP"), Txt("pour-qui.multi-lots", "Multi-lots", "Multi-trade")],
    cta: Txt("pour-qui.decouvrir-3", "Découvrir", "Learn more"),
  },
];

const AudienceHead = () => (
  <Reveal className="aud2-head">
    <div>
      <span className="eyebrow">{Txt("pour-qui.pour-qui", "Pour qui ?", "Who is it for?")}</span>
      <h2>{Txt("pour-qui.concu-pour-celles-et-ceux-qui", "Conçu pour celles et ceux qui ", "Built for the people who ")}<em>{Txt("pour-qui.portent-la-responsabilite-du-projet", "portent la responsabilité du projet.", "carry the project's responsibility.")}</em></h2>
    </div>
    <p>{Txt("pour-qui.alba-s-adresse-aux-professionnels-de", "ALBA s'adresse aux professionnels de la maîtrise d'œuvre qui pilotent des projets à plusieurs voix, et qui ne peuvent plus se permettre de perdre du temps en coordination.", "ALBA is for design and engineering professionals who run projects with many voices, and can no longer afford to lose time on coordination.")}</p>
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
            <span>{Txt("pour-qui.en-savoir", "EN SAVOIR +", "LEARN MORE +")}</span>
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
