/* Section components for Alba landing, bilingual via window.L(fr, en) */

const Reveal = ({ as: Tag = "div", delay = 0, children, className = "", ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add("in");
        } else if (e.boundingClientRect.top > 0) {
          // element left through the BOTTOM of the viewport (user scrolled up past it)
          el.classList.remove("in");
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{"--reveal-delay": `${delay}ms`}} {...rest}>{children}</Tag>;
};

/* Origine de l'application. Définie dans config.js, seul endroit à modifier le
   jour de la bascule vers app.alba-studio.co (voir MIGRATION-APEX.md).
   La valeur de repli garde la page fonctionnelle si config.js ne se charge pas. */
const APP_ORIGIN = (typeof window !== "undefined" && window.ALBA_APP_ORIGIN) || "https://app.alba-studio.co";
/* /inscription ouvre l'écran sur la création de compte ; /auth l'ouvre sur la
   connexion (Auth.tsx, dépôt de l'application). */
const SIGNUP_URL = `${APP_ORIGIN}/inscription`;

/* HERO */
const Hero = () => (
  <section className="hero" style={{paddingBottom: 130}}>
    <div className="grid-bg"/>
    <canvas className="hero-canvas" aria-hidden="true"></canvas>
    <div className="container hero-inner">
      <Reveal><span className="tag"><span className="dot"/> {Txt("accueil.plateforme-pour-architectes-exigeants", "Plateforme pour architectes exigeants", "The platform for demanding architects")}</span></Reveal>
      <Reveal delay={120}>
        <h1 className="display">
          {Txt("accueil.centralisez-vos-projets", "Centralisez vos projets.", "Centralize your projects.")}<br/>{Txt("accueil.simplifiez-vos", "Simplifiez vos ", "Simplify your ")}<em>{Txt("accueil.echanges-clients", "échanges clients.", "client communication.")}</em>
        </h1>
      </Reveal>
      <Reveal delay={240}>
        <p className="hero-sub">
          {Txt("accueil.la-plateforme-pensee-pour-les-architectes", "La plateforme pensée pour les architectes indépendants : chaque décision, document et message vit au même endroit. Vos clients suivent. Vous gardez la main.", "The platform built for independent architects: every decision, document and message lives in one place. Your clients follow along. You stay in control.")}
        </p>
      </Reveal>
      <Reveal delay={360}>
        <div className="hero-actions">
          <a href={SIGNUP_URL} className="btn btn-primary">{Txt("accueil.creer-mon-projet-gratuit", "Créer mon projet gratuit", "Create my free project")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
          <a href="#contact" className="btn btn-ghost" onClick={() => window.__setContactMode && window.__setContactMode("demo")}>{Txt("accueil.demander-une-demo", "Demander une démo", "Request a demo")}</a>
        </div>
      </Reveal>
      <Reveal delay={480}>
        <div className="hero-meta">
          <span><Icon name="check" size={12} style={{display:"inline", verticalAlign:"-2px", marginRight:6}}/> {Txt("accueil.gratuit-a-vie-pour-1-projet", "Gratuit à vie pour 1 projet", "Free forever for 1 project")}</span>
          <span className="sep"/>
          <span>{Txt("accueil.sans-engagement", "Sans engagement", "No commitment")}</span>
          <span className="sep"/>
          <span>{Txt("accueil.setup-en-10-min", "Setup en 10 min", "10-min setup")}</span>
        </div>
      </Reveal>
    </div>
    <Reveal delay={600} className="hero-mockup-wrap container">
      <div className="hero-glow"/>
      <div className="hero-mockup">
        <div className="build-layer">
          <RealShot src="images/app-cockpit-web.jpg" title="alba-studio.co/grange-lissieu" alt="Cockpit du projet Grange Lissieu dans ALBA Studio"/>
        </div>
        <div className="build-overlay" aria-hidden="true">
          <div className="build-grid"></div>
          <div className="build-scan"></div>
        </div>
      </div>
      <div className="hero-float hf-1">
        <span className="hf-ic ok"><Icon name="check" size={14}/></span>
        <span>{Txt("accueil.decision-validee", "Décision validée", "Decision approved")}<span className="hf-sub">{Txt("accueil.verriere-sud-il-y-a-2", "Verrière sud · il y a 2 min", "South skylight · 2 min ago")}</span></span>
      </div>
      <div className="hero-float hf-2">
        <span className="hf-ic gold"><Icon name="chat" size={14}/></span>
        <span>{Txt("accueil.nouveau-message", "Nouveau message", "New message")}<span className="hf-sub">{Txt("accueil.marie-a-maitre-d-ouvrage", "Marie A. · Maître d'ouvrage", "Marie A. · Client")}</span></span>
      </div>
      <div className="hero-float hf-3">
        <span className="hf-ring"><b>43%</b></span>
        <span>{Txt("accueil.avancement-global", "Avancement global", "Overall progress")}<span className="hf-sub">{Txt("accueil.phase-aps-grange-lissieu", "Phase APS · Grange Lissieu", "Design phase · Grange Lissieu")}</span></span>
      </div>
    </Reveal>
    <div className="hero-cue">
      <div className="cue-track"></div>
      <span>{Txt("accueil.decouvrir", "Découvrir", "Discover")}</span>
    </div>
  </section>
);

/* LOGOS — double marquee */
const Logos = () => {
  const row1 = [
    { kind: "italic", text: "Revol architecte" },
    { kind: "mono", text: "ADN ARCHITECTURE" },
    { kind: "italic", text: "Easy Peasy intérieur" },
  ];
  const row2 = [
    { kind: "italic", text: "Sublimes intérieurs" },
    { kind: "mono", text: "FEEL INTÉRIEURS" },
  ];
  const Track = ({ items, dur }) => (
    <div className="marquee" style={{ "--mq-dur": dur }}>
      <div className="marquee-track">
        {[...items, ...items].map((l, i) => (
          <span key={i} className={`mq-item ${l.kind}`}>
            {l.text} <span className="mq-dia"/>
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <section className="logos">
      <div className="container">
        <div className="logos-eyebrow">{L(<>Les agences pilotes construisent déjà <em>avec ALBA.</em></>, <>Pilot practices already build <em>with ALBA.</em></>)}</div>
      </div>
      <Track items={row1} dur="38s"/>
      <Track items={row2} dur="52s"/>
    </section>
  );
};

/* MID-PAGE CTA BAND */
const CTABand = () => (
  <section className="cta-band">
    <div className="container cta-band-inner">
      <div>
        <div className="cta-band-title">{Txt("bandeau-cta.gratuit-a-vie-pour-1-projet", "Gratuit à vie pour 1 projet.", "Free forever for 1 project.")}</div>
        <div className="cta-band-sub">{Txt("bandeau-cta.gerez-un-projet-complet-gratuitement-sans", "Gérez un projet complet gratuitement, sans carte bleue, sans limite de temps.", "Run one full project free, no credit card, no time limit.")}</div>
      </div>
      <div className="cta-band-actions">
        <a href={SIGNUP_URL} className="btn btn-primary">{Txt("bandeau-cta.creer-mon-projet-gratuit", "Créer mon projet gratuit", "Create my free project")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
        <a href="#pricing" className="btn btn-ghost">{Txt("bandeau-cta.voir-le-tarif", "Voir le tarif", "See pricing")}</a>
      </div>
    </div>
  </section>
);

/* PAINS */
const Pains = () => {
  return (
    <section className="section section-cream">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{Txt("problemes.ce-que-vous-ne-ferez-plus", "Ce que vous ne ferez plus", "What you'll stop doing")}</span>
          <h2 className="display">{Txt("problemes.tout-ce-dont-vous-avez-besoin", "Tout ce dont vous avez besoin, ", "Everything you need, ")}<em>{Txt("problemes.rien-de-superflu", "rien de superflu.", "nothing you don't.")}</em></h2>
          <p>{Txt("problemes.alba-remplace-les-drive-wetransfer-trello", "ALBA remplace les Drive, WeTransfer, Trello, Slack et boîtes mail éparpillées par un seul espace, conçu pour les agences d'architecture.", "ALBA replaces scattered Drives, WeTransfer, Trello, Slack and inboxes with one space, built for architecture practices.")}</p>
        </Reveal>
        <TestiBenefits/>
      </div>
    </section>
  );
};

/* FEATURES */
/* Les maquettes AppMockup reproduisent l'écran d'ORDINATEUR : une barre latérale
   de 168 px fixes à côté du contenu, sur une hauteur minimale de 540 px. Dans la
   colonne d'un téléphone il ne restait qu'environ 180 px pour le contenu — texte
   coupé, colonnes tronquées, rien de lisible. Sous 900 px on sert donc les
   captures réelles de l'application mobile, à la place et non en plus : elles
   montrent la même chose, dans la forme où le visiteur la verra vraiment. */
const Features = () => {
  const tabs = [
    { eyebrow: Txt("fonctionnalites.01-cockpit", "01 — Cockpit", "01 — Cockpit"), title: Txt("fonctionnalites.une-vue-d-ensemble-qui-rassure", "Une vue d'ensemble qui rassure", "An overview that reassures"), desc: Txt("fonctionnalites.avancement-prochaines-echeances-decisions-en", "Avancement, prochaines échéances, décisions en attente. Vos clients savent où en est leur projet sans vous appeler.", "Progress, upcoming deadlines, pending decisions. Your clients know where their project stands without calling you."), mockup: "cockpit",
      shot: "uploads/app-mobile-cockpit.jpg", shotAlt: L("ALBA Studio sur mobile — cockpit du projet Grange Lissieu : avancement, phase courante, budget", "ALBA Studio on mobile — Grange Lissieu project cockpit: progress, current phase, budget") },
    { eyebrow: Txt("fonctionnalites.02-decisions", "02 — Décisions", "02 — Decisions"), title: Txt("fonctionnalites.validations-structurees-tracables", "Validations structurées, traçables", "Structured, traceable approvals"), desc: Txt("fonctionnalites.fini-le-j-ai-oublie-ce", "Fini le « j'ai oublié ce qu'on avait dit ». Chaque arbitrage est horodaté, signé et archivé. Plus de SAV un an plus tard.", "No more \"I forgot what we agreed on\". Every decision is timestamped, signed and archived. No disputes a year later."), mockup: "decisions",
      shot: "uploads/app-mobile-decisions.jpg", shotAlt: L("ALBA Studio sur mobile — vue décisions : arbitrages validés et impact financier", "ALBA Studio on mobile — decisions view: approved arbitrations and financial impact") },
    { eyebrow: Txt("fonctionnalites.03-chantier", "03 — Chantier", "03 — Site"), title: Txt("fonctionnalites.le-chantier-suivi-les-reserves-levees", "Le chantier suivi, les réserves levées", "Site visits tracked, punch lists cleared"), desc: Txt("fonctionnalites.comptes-rendus-de-visite-reserves-photograph", "Comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises. Le chantier documenté, sans y passer vos dimanches.", "Visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors. The site documented, without losing your Sundays."), mockup: "chantier",
      shot: "uploads/app-mobile-chantier.jpg", shotAlt: L("ALBA Studio sur mobile — suivi de chantier : visites, comptes-rendus et remarques", "ALBA Studio on mobile — site tracking: visits, reports and punch-list items") },
  ];
  const [active, setActive] = React.useState(0);
  const [mobile, setMobile] = React.useState(() => window.matchMedia("(max-width: 900px)").matches);

  // La bascule doit suivre la rotation de l'appareil : un iPhone Pro Max passe
  // de 430 à 932 px en tournant, soit d'un côté à l'autre de la limite.
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const suivre = () => setMobile(mq.matches);
    // addListener : Safari n'a accepté addEventListener sur MediaQueryList qu'à
    // partir de la version 14.
    if (mq.addEventListener) mq.addEventListener("change", suivre); else mq.addListener(suivre);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", suivre); else mq.removeListener(suivre); };
  }, []);

  return (
    <section className="section section-cream-2" id="features">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{Txt("fonctionnalites.la-plateforme", "La plateforme", "The platform")}</span>
          <h2 className="display">{Txt("fonctionnalites.une-suite-complete", "Une suite complète,", "A complete suite,")}<br/><em>{Txt("fonctionnalites.specialement-pensee-pour-vous", "spécialement pensée pour vous.", "designed specifically for you.")}</em></h2>
        </Reveal>
        <div className="features">
          <div className="features-tabs">
            {tabs.map((t, i) => (
              <button key={i} className={`f-tab ${active === i ? "is-active" : ""}`} onClick={() => setActive(i)}>
                <div className="f-tab-eyebrow">{t.eyebrow}</div>
                <div className="f-tab-title">{t.title}</div>
                <div className="f-tab-desc">{t.desc}</div>
              </button>
            ))}
          </div>
          <Reveal className="features-stage">
            {tabs.map((t, i) => (
              <div key={i} className={`f-stage-pane ${active === i ? "is-active" : ""}`}>
                {mobile
                  ? <div className="f-shot">
                      {/* width/height : la place est réservée avant le chargement,
                          sinon la page se décale sous le doigt du visiteur. */}
                      <img src={t.shot} alt={t.shotAlt} width="900" height="1541" loading="lazy" decoding="async"/>
                    </div>
                  : <AppMockup variant={t.mockup}/>}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* Chiffres clés des précurseurs (ex-Benefits) */
const TestiBenefits = () => {
  const items = [
    { icon: "clock", t: Txt("benefices.du-temps-repris", "Du temps repris", "Time reclaimed"), p: Txt("benefices.moins-d-allers-retours-moins-de", "Moins d'allers-retours, moins de relances. Le temps gagné, vous le rendez à vos esquisses.", "Fewer back-and-forths, fewer follow-ups. The time you save goes back to your drawings."), stat: Txt("benefices.6h", "6h", "6h"), unit: Txt("benefices.economisees-par-projet-et-par-mois", "économisées par projet et par mois", "saved per project, per month") },
    { icon: "shield", t: Txt("benefices.de-la-serenite-juridique", "De la sérénité juridique", "Legal peace of mind"), p: Txt("benefices.chaque-decision-archivee-signee-datee-six", "Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand.", "Every decision archived, signed, dated. Six months on, you can still see who decided what, and when."), stat: "100%", unit: Txt("benefices.des-arbitrages-traces", "des arbitrages tracés", "of decisions traced") },
    { icon: "star", t: Txt("benefices.des-clients-ravis", "Des clients ravis", "Delighted clients"), p: Txt("benefices.vos-maitres-d-ouvrage-savent-a", "Vos maîtres d'ouvrage savent à tout moment où en est le projet, et ne vous rappellent plus à 21h.", "Your clients always know where the project stands, and stop calling you at 9pm."), stat: "4.8/5", unit: Txt("benefices.satisfaction-maitre-d-ouvrage", "satisfaction maître d'ouvrage", "client satisfaction") },
  ];
  return (
    <div className="benefits" style={{marginBottom: 56}}>
      {items.map((it, i) => (
        <Reveal key={i} delay={i*120} className="benefit">
          <div className="benefit-icon"><Icon name={it.icon} size={18}/></div>
          <h3>{it.t}</h3>
          <p>{it.p}</p>
          <div className="benefit-stat"><b>{it.stat}</b> <span>{it.unit}</span></div>
        </Reveal>
      ))}
    </div>
  );
};

/* TESTIMONIALS (+ chiffres + coulisses fusionnés) */
const Testimonials = () => (
  <section className="section section-cream">
    <div className="container">
      <Reveal className="s-head">
        <span className="eyebrow">{Txt("temoignages.ce-qu-en-disent-les-precurseurs", "Ce qu'en disent les précurseurs", "What the early adopters say")}</span>
        <h2 className="display">{Txt("temoignages.ils-ont-essuye-les-platres", "Ils ont testé en avant-première", "They tested it first")}<br/><em>{Txt("temoignages.ils-sont-restes", "et ont adoré.", "and loved it.")}</em></h2>
      </Reveal>
      <div className="testimonials">
        <Reveal className="testi featured">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{Txt("temoignages.alba-a-remplace-mon-wetransfer-mon", "ALBA a remplacé mon WeTransfer, mon Drive, ma boîte mail et mes tableurs. Mes clients voient enfin où on en est, et moi je récupère mes soirées.", "ALBA replaced my WeTransfer, my Drive, my inbox and my spreadsheets. My clients finally see where we stand, and I get my evenings back.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-camille" shape="circle" src="images/testi-camille.jpg" alt="Camille Lavigne" placeholder="CL"></image-slot></div>
            <div>
              <div className="testi-name">{Txt("temoignages.camille-nom", "Camille Lavigne", "Camille Lavigne")}</div>
              <div className="testi-role">{Txt("temoignages.architecte-dplg-lyon", "ARCHITECTE DPLG · LYON", "REGISTERED ARCHITECT · LYON")}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="testi">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{Txt("temoignages.la-tracabilite-des-decisions-c-est", "La traçabilité des décisions, c'est l'argument qui m'a convaincu. Plus jamais de SAV un an après.", "Decision traceability is what won me over. No more disputes a year later.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-marc" shape="circle" src="images/testi-marc.jpg" alt="Marc Noiret" placeholder="MN"></image-slot></div>
            <div>
              <div className="testi-name">{Txt("temoignages.marc-nom", "Marc Noiret", "Marc Noiret")}</div>
              <div className="testi-role">{Txt("temoignages.marc-role", "STUDIO MN · BORDEAUX", "STUDIO MN · BORDEAUX")}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={240} className="testi">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{Txt("temoignages.mes-maitres-d-ouvrage-adorent-ils", "Mes maîtres d'ouvrage adorent. Ils ont l'impression d'avoir leur propre app, c'est notre marque blanche.", "My clients love it. They feel like they have their own app, it's our white label.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-sophie" shape="circle" src="images/testi-sophie.jpg" alt="Sophie Obellier" placeholder="SO"></image-slot></div>
            <div>
              <div className="testi-name">{Txt("temoignages.sophie-nom", "Sophie Obellier", "Sophie Obellier")}</div>
              <div className="testi-role">{Txt("temoignages.sophie-role", "ATELIER VAUBAN · PARIS", "ATELIER VAUBAN · PARIS")}</div>
            </div>
          </div>
        </Reveal>
      </div>
      <Gallery/>
      </div>
    </section>
);

/* PRICING */
const Pricing = () => {
  const tiers = [
    { go: 50, price: 49 },
    { go: 150, price: 69 },
    { go: 300, price: 89 },
  ];
  const projectsFor = (go) => Math.round(go / 10);
  const [tier, setTier] = React.useState(0);
  const [yearly, setYearly] = React.useState(false);
  const baseFor = (tr) => yearly ? Math.round(tr.price * 0.82) : tr.price;
  const t = tiers[tier];
  const base = baseFor(t);
  const [seats, setSeats] = React.useState(1);
  const extraSeats = Math.max(0, seats - 1);
  const extraCost = extraSeats * 15;
  const total = base + extraCost;
  const includes = [
    Txt("tarifs.clients-co-traitants-illimites", "Clients & co-traitants illimités", "Unlimited clients & consultants"),
    Txt("tarifs.1-collaborateur-inclus-15-mois-par", "1 collaborateur inclus — +15 €/mois HT par collaborateur ajouté (4 max)", "1 team member included — +€15/month excl. VAT per added member (4 max)"),
    L(`${t.go} Go de stockage — ≈ ${projectsFor(t.go)} projets`, `${t.go} GB of storage — ≈ ${projectsFor(t.go)} projects`),
    Txt("tarifs.decisions-horodatees-signees", "Décisions horodatées & signées", "Timestamped & signed decisions"),
    Txt("tarifs.messagerie-projet-securisee", "Messagerie projet sécurisée", "Secure project messaging"),
    Txt("tarifs.materiautheque-fournisseurs", "Matériauthèque & fournisseurs", "Material library & suppliers"),
    Txt("tarifs.cr-de-chantier-reserves-photos", "CR de chantier, réserves & photos", "Site reports, punch lists & photos"),
    Txt("tarifs.visionneuse-plans-dans-le-navigateur", "Visionneuse plans dans le navigateur", "In-browser plan viewer"),
    Txt("tarifs.exports-pdf-comptables", "Exports PDF & comptables", "PDF & accounting exports"),
    Txt("tarifs.marque-blanche-maitre-d-ouvrage", "Marque blanche maître d'ouvrage", "White-label client portal"),
    Txt("tarifs.support-prioritaire-7j-7", "Support prioritaire 7j/7", "Priority support 7 days a week"),
  ];
  return (
    <section className="section section-dark" id="pricing">
      <div className="container">
        <div className="pricing-layout">

          <Reveal className="pricing-config">
            <span className="eyebrow">{Txt("tarifs.tarif", "Tarif", "Pricing")}</span>
            <h2 className="display">{Txt("tarifs.un-prix-simple", "Un prix simple,", "One simple price,")}<br/><em>{Txt("tarifs.une-valeur-claire", "une valeur claire.", "clear value.")}</em></h2>
            <p className="pricing-intro">{Txt("tarifs.tout-est-inclus-pas-de-module", "Tout est inclus. Pas de module, pas d'option cachée. Seul le stockage fait varier le prix, choisissez, le tarif se met à jour à droite.", "Everything included. No add-ons, no hidden extras. Only storage changes the price, pick yours, the price updates on the right.")}</p>
            <div className="p-config-label">{Txt("tarifs.1-votre-facturation", "1 · Votre facturation", "1 · Your billing")}</div>
            <div className="pricing-toggle">
              <button className={!yearly ? "is-active" : ""} onClick={() => setYearly(false)}>{Txt("tarifs.mensuel", "Mensuel", "Monthly")}</button>
              <button className={yearly ? "is-active" : ""} onClick={() => setYearly(true)}>{Txt("tarifs.annuel", "Annuel", "Yearly")} <span className="badge">−18%</span></button>
            </div>
            <div className="p-config-label">{Txt("tarifs.2-votre-stockage", "2 · Votre stockage", "2 · Your storage")}</div>
            <div className="p-tiers">
              {tiers.map((tr, i) => (
                <button key={tr.go} className={`p-tier ${tier === i ? "is-active" : ""}`} onClick={() => setTier(i)}>
                  <span className="p-tier-radio"></span>
                  <span className="p-tier-main">
                    <b>{tr.go} {Txt("tarifs.go", "Go", "GB")}</b>
                    <span>{L(`≈ ${projectsFor(tr.go)} projets`, `≈ ${projectsFor(tr.go)} projects`)}</span>
                  </span>
                  <span className="p-tier-price">{baseFor(tr)} €<i>{Txt("tarifs.mois", "/mois HT", "/mo excl. VAT")}</i></span>
                </button>
              ))}
            </div>
            <div className="p-config-label">{Txt("tarifs.3-votre-equipe", "3 · Votre équipe", "3 · Your team")}</div>
            <div className="p-seats">
              <button type="button" className="p-seat-btn" onClick={() => setSeats(Math.max(1, seats - 1))} aria-label={Txt("tarifs.moins", "Moins", "Fewer")}><Icon name="minus" size={12}/></button>
              <div className="p-seat-val"><b>{seats}</b><span>{seats > 1 ? Txt("tarifs.collaborateurs", "collaborateurs", "team members") : Txt("tarifs.collaborateur", "collaborateur", "team member")}</span></div>
              <button type="button" className="p-seat-btn" onClick={() => setSeats(Math.min(4, seats + 1))} aria-label={Txt("tarifs.plus", "Plus", "More")}><Icon name="plus" size={12}/></button>
              <div className="p-seat-note">{extraSeats > 0 ? L(`1 inclus + ${extraSeats} × 15 €/mois HT · 4 max`, `1 included + ${extraSeats} × €15/mo excl. VAT · 4 max`) : Txt("tarifs.1-inclus-jusqu-a-4-par", "1 inclus · jusqu'à 4 par espace", "1 included · up to 4 per workspace")}</div>
            </div>
            <div className="pricing-go-note">{Txt("tarifs.un-projet-d-architecture-occupe-en", "Un projet d'architecture occupe en moyenne 10 Go, plans, photos, documents et échanges inclus. Vous pourrez changer de palier à tout moment, en un clic.", "An architecture project takes about 10 GB on average, plans, photos, documents and messages included. You can change tiers anytime, in one click.")}</div>
          </Reveal>

          <Reveal delay={120} className="pricing-side">
            <div className="pricing-card">
              <span className="pricing-tag"><span className="dot"/> Studio</span>
              <div className="pricing-name">{Txt("tarifs.pour-votre-agence", "Pour votre agence", "For your practice")}</div>
              <div className="pricing-desc">{Txt("tarifs.tout-ce-qu-il-faut-pour", "Tout ce qu'il faut pour piloter sereinement vos projets, sans option cachée.", "Everything you need to run your projects with confidence, no hidden extras.")}</div>
              <div className="pricing-amt">
                <span className="c">€</span>
                <span className="v" key={`${tier}-${total}`}>{total}</span>
                <span className="p">{Txt("tarifs.mois-2", "/ mois HT", "/ month excl. VAT")}</span>
              </div>
              {yearly && (
                <div className="pricing-save">
                  <span className="ps-badge">−18%</span>
                  <span className="ps-text">
                    {L(`Vous économisez ${(t.price - base) * 12} € HT par an`, `You save €${(t.price - base) * 12} excl. VAT a year`)}
                    <i>{L(`Facturé ${total * 12} € HT en une fois, au lieu de ${(t.price + extraCost) * 12} € en mensuel`, `Billed €${total * 12} excl. VAT once a year, instead of €${(t.price + extraCost) * 12} monthly`)}</i>
                  </span>
                </div>
              )}
              {extraSeats > 0 && (
                <div className="pricing-seats-line">{L(`Dont ${extraCost} € / mois HT : ${extraSeats} collaborateur${extraSeats > 1 ? "s" : ""} supplémentaire${extraSeats > 1 ? "s" : ""}`, `Includes €${extraCost} / month for ${extraSeats} extra team member${extraSeats > 1 ? "s" : ""}`)}</div>
              )}
              <ul className="pricing-includes">
                {includes.map((it, i) => (
                  <li key={i}><Icon name="check" size={12}/> {it}</li>
                ))}
              </ul>
              <a href={`${SIGNUP_URL}?plan=studio&storage=${t.go}&billing=${yearly ? "yearly" : "monthly"}&seats=${seats}`} className="btn btn-primary pricing-cta">{Txt("tarifs.s-abonner", "S'abonner", "Subscribe")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
              <div className="pricing-foot">{Txt("tarifs.gratuit-a-vie-pour-1-projet", "GRATUIT À VIE POUR 1 PROJET · SANS CB · SANS ENGAGEMENT", "FREE FOREVER FOR 1 PROJECT · NO CARD · NO COMMITMENT")}</div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

/* TRUST BAND — sécurité & données */
const TrustBand = () => {
  const items = [
    { icon: "globe", t: Txt("securite.heberge-en-france", "Hébergé en France", "Hosted in France"), d: Txt("securite.vos-donnees-sont-stockees-en-france", "Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. Conformité RGPD native.", "Your data is stored in France with an ISO 27001-certified host. GDPR-compliant by design.") },
    { icon: "lock", t: Txt("securite.chiffre-sauvegarde", "Chiffré, sauvegardé", "Encrypted, backed up"), d: Txt("securite.chiffrement-aes-256-au-repos-tls", "Chiffrement AES-256 au repos, TLS en transit. Sauvegardes automatiques quotidiennes.", "AES-256 encryption at rest, TLS in transit. Automatic daily backups.") },
    { icon: "doc", t: Txt("securite.vos-donnees-vous-appartiennent", "Vos données vous appartiennent", "Your data stays yours"), d: Txt("securite.export-integral-de-vos-projets-pdf", "Export intégral de vos projets (PDF, ZIP, CSV) à tout moment, en un clic.", "Export all your projects (PDF, ZIP, CSV) anytime, in one click.") },
    { icon: "shield", t: Txt("securite.valeur-probante", "Valeur probante", "Evidence you can produce"), d: Txt("securite.decisions-horodatees-et-signees-electronique", "Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur.", "Timestamped, electronically signed decisions (eIDAS simple signature). Every decision is archived with its evidence: author, date, server timestamp.") },
  ];
  return (
    <section className="trust-band" id="securite">
      <div className="container">
        <div className="trust-eyebrow">{Txt("securite.securite-donnees", "Sécurité & données", "Security & data")}</div>
        <div className="trust-grid">
          {items.map((it, i) => (
            <Reveal key={i} delay={i*90} className="trust-item">
              <div className="trust-icon"><Icon name={it.icon} size={16}/></div>
              <div>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* FAQ */
const Faq = () => {
  const items = [
    { q: Txt("faq.que-comprend-le-projet-gratuit", "Que comprend le projet gratuit ?", "What does the free project include?"), a: Txt("faq.un-projet-complet-sans-limite-de", "Un projet complet, sans limite de temps : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio uniquement quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.", "One complete project, with no time limit: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You only move to the Studio plan when you create your second project, and everything you've built stays in place.") },
    { q: Txt("faq.comment-alba-s-integre-a-ma", "Comment ALBA s'intègre à ma méthode actuelle ?", "How does ALBA fit my current workflow?"), a: Txt("faq.alba-s-adapte-a-votre-process", "ALBA s'adapte à votre process, pas l'inverse. Vous configurez les phases (esquisse, APS, APD, permis, DCE, chantier), nous gérons les rappels, les jalons et la mémoire du projet. Aucune formation longue : la plupart des architectes sont opérationnels en moins d'une heure.", "ALBA adapts to your process, not the other way round. You configure the phases (concept, design, permits, tender, construction); we handle reminders, milestones and the project's memory. No lengthy training: most architects are up and running in under an hour.") },
    { q: Txt("faq.mes-clients-doivent-ils-telecharger-une", "Mes clients doivent-ils télécharger une application ?", "Do my clients need to download an app?"), a: Txt("faq.non-alba-fonctionne-entierement-dans-le", "Non. ALBA fonctionne entièrement dans le navigateur, sur ordinateur comme sur téléphone. Un lien, un mot de passe, vos maîtres d'ouvrage accèdent à leur cockpit en 30 secondes.", "No. ALBA runs entirely in the browser, on desktop and phone. A link, a password, your clients reach their cockpit in 30 seconds.") },
    { q: Txt("faq.que-se-passe-t-il-pour", "Que se passe-t-il pour mes données si j'arrête ?", "What happens to my data if I leave?"), a: Txt("faq.elles-sont-a-vous-a-tout", "Elles sont à vous. À tout moment, vous exportez l'intégralité de vos projets (PDF, ZIP, CSV) en un clic. Vos archives papier-numérique restent lisibles 10 ans après.", "It's yours. At any time, export all your projects (PDF, ZIP, CSV) in one click. Your digital archives remain readable 10 years on.") },
    { q: Txt("faq.les-decisions-sont-elles-juridiquement-valab", "Les décisions sont-elles juridiquement valables ?", "Are decisions legally valid?"), a: Txt("faq.chaque-decision-est-horodatee-archivee-et", "Chaque décision est horodatée, archivée et signée électroniquement (eIDAS, niveau simple) : l'auteur, la date et l'horodatage serveur sont conservés à titre de preuve. Pour un acte qui exige une signature avancée ou qualifiée, passez par votre voie habituelle.", "Every decision is timestamped, archived and electronically signed (eIDAS, simple level): the author, date and server timestamp are kept as evidence. For a document requiring an advanced or qualified signature, use your usual channel.") },
    { q: Txt("faq.puis-je-inviter-mon-bet-et", "Puis-je inviter mon BET et mes co-traitants ?", "Can I invite my engineers and consultants?"), a: Txt("faq.bien-sur-les-co-traitants-accedent", "Bien sûr. Les co-traitants accèdent gratuitement aux projets sur lesquels vous les invitez, avec le niveau de droits que vous définissez (lecture, commentaire, dépôt de pièces).", "Of course. Consultants get free access to the projects you invite them to, with the permission level you set (view, comment, upload).") },
    { q: Txt("faq.combien-de-collaborateurs-de-mon-agence", "Combien de collaborateurs de mon agence sont inclus ?", "How many team members are included?"), a: Txt("faq.le-tarif-studio-inclut-1-collaborateur", "Le tarif Studio inclut 1 collaborateur. Vous pouvez en ajouter jusqu'à 3 autres (4 par espace au maximum), à 15 €/mois HT chacun, ajustable à tout moment. Vos clients et co-traitants, eux, sont illimités et gratuits.", "The Studio plan includes 1 team member. You can add up to 3 more (4 per workspace maximum), at €15/month excl. VAT each, adjustable anytime. Clients and consultants are unlimited and free.") },
    { q: Txt("faq.et-pendant-le-chantier", "Et pendant le chantier ?", "What about the construction phase?"), a: Txt("faq.alba-vous-suit-sur-site-comptes", "ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.", "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.") },
    { q: Txt("faq.quels-formats-de-fichiers-puis-je", "Quels formats de fichiers puis-je partager ?", "What file formats can I share?"), a: Txt("faq.tous-pdf-dwg-ifc-images-videos", "Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 100 Mo par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.", "All of them — PDF, DWG, IFC, images, videos, up to 100 MB per file. PDF plans and images open right in the browser: your clients don't need any software.") },
    { q: Txt("faq.ou-sont-hebergees-mes-donnees", "Où sont hébergées mes données ?", "Where is my data hosted?"), a: Txt("faq.en-france-chez-un-hebergeur-certifie", "En France, chez un hébergeur certifié ISO 27001. Chiffrement AES-256 au repos, TLS en transit, sauvegardes quotidiennes. Conformité RGPD native.", "In France, with an ISO 27001-certified host. AES-256 encryption at rest, TLS in transit, daily backups. GDPR-compliant by design.") },
    { q: Txt("faq.les-prix-affiches-sont-ils-hors", "Les prix affichés sont-ils hors taxes ?", "Are the prices shown excluding tax?"), a: Txt("faq.oui-tous-les-montants-de-cette", "Oui, tous les montants de cette page sont hors taxes. La TVA applicable est calculée au moment du paiement, selon votre pays et votre statut : 20 % pour une agence assujettie en France. Si vous disposez d'un numéro de TVA intracommunautaire, il vous sera demandé lors de la souscription. Votre facture est émise automatiquement après chaque prélèvement.", "Yes, every amount on this page is exclusive of tax. Applicable VAT is calculated at checkout, based on your country and status: 20% for a practice registered in France. If you have an EU VAT number, you will be asked for it during signup. Your invoice is issued automatically after each payment.") },
    { q: Txt("faq.quel-est-le-delai-pour-demarrer", "Quel est le délai pour démarrer ?", "How long does it take to get started?"), a: Txt("faq.si-vous-voulez-vous-demarrez-aujourd", "Si vous voulez, vous démarrez aujourd'hui. La création de compte prend 3 minutes ; importer vos projets en cours prend en moyenne une demi-journée. On vous accompagne sur l'onboarding sans frais.", "You can start today. Account creation takes 3 minutes; importing your active projects takes half a day on average. We help with onboarding at no charge.") },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section section-cream-2" id="faq">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{Txt("faq.questions-frequentes", "Questions fréquentes", "Frequently asked questions")}</span>
          <h2 className="display">{Txt("faq.vous-vous-demandez-surement", "Vous vous demandez sûrement…", "You're probably wondering…")}</h2>
        </Reveal>
        <Reveal className="faq">
          {items.map((it, i) => (
            <div key={i} className={`q ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="q-row">
                <div className="q-title">{it.q}</div>
                <button className="q-toggle" aria-label="Toggle">
                  <Icon name="plus" size={14}/>
                </button>
              </div>
              <div className="q-body">
                <div>{it.a}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

/* CONTACT */
const Contact = () => {
  const [data, setData] = React.useState({ name: "", agency: "", email: "", phone: "", projects: "1-3", msg: "" });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  /* "repos" | "envoi" | "erreur" — le succès est porté par `submitted`, qui
     existait déjà et gouverne le bloc de confirmation du design. */
  const [envoi, setEnvoi] = React.useState("repos");
  /* Champ-piège : invisible pour un visiteur, rempli par les robots qui
     remplissent tout. Il vit dans l'état comme les autres champs. */
  const [piege, setPiege] = React.useState("");
  /* Instant d'affichage du formulaire. Le serveur refuse un envoi survenu moins
     de deux secondes après : personne ne remplit six champs en deux secondes. */
  const afficheA = React.useRef(Date.now());
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = Txt("contact.votre-nom-est-requis", "Votre nom est requis", "Your name is required");
    if (!data.agency.trim()) e.agency = Txt("contact.le-nom-de-l-agence-est", "Le nom de l'agence est requis", "Practice name is required");
    if (!data.email.trim()) e.email = Txt("contact.l-email-est-requis", "L'email est requis", "Email is required");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = Txt("contact.email-invalide", "Email invalide", "Invalid email");
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  /* Ce formulaire n'envoyait RIEN : il validait, affichait « Merci, nous vous
     recontactons sous 24 h », et jetait la demande. Aucune requête réseau
     n'existait dans toute la page. Chaque architecte qui l'a rempli est perdu.

     Il poste désormais vers la fonction `contact-vitrine`, qui enregistre la
     demande EN BASE puis notifie par e-mail — dans cet ordre, pour qu'une panne
     d'e-mail ne fasse pas disparaître la demande.

     Aucune clé ni SDK ici : le point d'entrée est public (`verify_jwt = false`),
     un simple fetch suffit. La CSP autorise cette origine, et elle seule. */
  const POINT_CONTACT = "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/contact-vitrine";

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (envoi === "envoi") return;   // double-clic
    setEnvoi("envoi");

    try {
      const reponse = await fetch(POINT_CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          agency: data.agency,
          email: data.email,
          phone: data.phone,
          projects: data.projects,
          message: data.msg,
          locale: window.__albaLang === "en" ? "en" : "fr",
          website: piege,
          affiche_a: afficheA.current,
        }),
      });
      if (!reponse.ok) throw new Error("HTTP " + reponse.status);
      setEnvoi("repos");
      setSubmitted(true);
    } catch (e) {
      /* Ne JAMAIS afficher la confirmation quand l'envoi a échoué : c'est
         exactement le défaut qu'on corrige. Le visiteur doit pouvoir réessayer,
         et l'adresse e-mail lui est donnée comme porte de sortie. */
      console.error("[contact] envoi impossible", e);
      setEnvoi("erreur");
    }
  };
  return (
    <section className="section section-cream" id="contact">
      <div className="container contact">
        <Reveal className="contact-side">
          <span className="eyebrow">{Txt("contact.parlons-en", "Parlons-en", "Let's talk")}</span>
          <h2>{Txt("contact.voyons-alba-sur-vos-projets-reponse", "Voyons ALBA sur vos projets. Réponse sous 24 h.", "Let's look at ALBA on your projects. Reply within 24 hours.")}</h2>
          <p>{Txt("contact.que-vous-soyez-seul-e-ou", "Que vous soyez seul·e ou à quatre, on adapte la démo à votre méthode. Pas de discours commercial, juste l'outil en action.", "Whether you're solo or a team of four, we tailor the demo to your workflow. No sales pitch, just the tool in action.")}</p>
          <ul className="contact-info">
            <li><Icon name="chat" size={14}/> contact@alba-studio.co</li>
            <li><Icon name="clock" size={14}/> {Txt("contact.reponse-en-moins-de-24-h", "Réponse en moins de 24 h ouvrées", "Reply within 24 business hours")}</li>
            <li><Icon name="globe" size={14}/> {Txt("contact.demo-en-visio-30-min", "Démo en visio · 30 min", "Video demo · 30 min")}</li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form className="form" onSubmit={submit} noValidate>
            <div className="form-lead">
              <span className="fl-t">{Txt("contact.demander-une-demo", "Demander une démo", "Request a demo")}</span>
              <span className="fl-s">{Txt("contact.visio-30-min-sans-engagement", "Visio · 30 min · sans engagement", "Video call · 30 min · no commitment")}</span>
              <a href={SIGNUP_URL} className="fl-link">{Txt("contact.ou-creez-directement-votre-compte-gratuit", "Ou créez directement votre compte gratuit →", "Or create your free account right away →")}</a>
            </div>
            {submitted && (
              <div className="form-success">
                {/* Cet appel n'était pas entre accolades : JSX le prenait donc pour
                    du texte ordinaire, et le message de confirmation s'affichait
                    sous forme de code brut — « L(`Merci, ${data.name…` » — à
                    l'écran, après l'envoi du formulaire. Bug présent dans le
                    paquet de passation d'origine (commit e79a522), révélé en
                    passant les textes en revue. */}
                <Icon name="check" size={14}/> {L(`Merci, ${data.name.split(" ")[0]}. Nous vous recontactons sous 24 h pour convenir d'un créneau.`, `Thank you, ${data.name.split(" ")[0]}. We'll be in touch within 24 hours to book a slot.`)}
              </div>
            )}
            {envoi === "erreur" && (
              <div className="form-error" role="alert">
                <Icon name="shield" size={14}/> {Txt("contact.envoi-impossible", "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact@alba-studio.co.", "Sending failed. Please try again, or email us directly at contact@alba-studio.co.")}
              </div>
            )}
            {/* Champ-piège. Retiré du flux, du clavier et des lecteurs d'écran :
                un visiteur ne le voit ni ne l'atteint jamais. Il n'est PAS en
                display:none, que certains robots savent détecter. */}
            <div aria-hidden="true" style={{position:"absolute", left:"-9999px", width:1, height:1, overflow:"hidden"}}>
              <label htmlFor="alba-website">Ne pas remplir</label>
              <input id="alba-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                     value={piege} onChange={e => setPiege(e.target.value)} />
            </div>
            <div className="form-row">
              <div className={`field ${errors.name ? "error" : ""}`}>
                <label>{Txt("contact.nom-complet", "Nom complet", "Full name")}</label>
                <input value={data.name} onChange={e => set("name", e.target.value)} placeholder="Camille Lavigne" />
                {errors.name && <div className="field-err">{errors.name}</div>}
              </div>
              <div className={`field ${errors.agency ? "error" : ""}`}>
                <label>{Txt("contact.agence", "Agence", "Practice")}</label>
                <input value={data.agency} onChange={e => set("agency", e.target.value)} placeholder="Atelier Lavigne" />
                {errors.agency && <div className="field-err">{errors.agency}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className={`field ${errors.email ? "error" : ""}`}>
                <label>{Txt("contact.email-professionnel", "Email professionnel", "Work email")}</label>
                <input value={data.email} onChange={e => set("email", e.target.value)} type="email" placeholder="camille@atelier-lavigne.fr" />
                {errors.email && <div className="field-err">{errors.email}</div>}
              </div>
              <div className="field">
                <label>{Txt("contact.telephone", "Téléphone", "Phone")}</label>
                <input value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="+33 6 12 34 56 78" />
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{Txt("contact.combien-de-projets-en-cours", "Combien de projets en cours ?", "How many active projects?")}</label>
                <select value={data.projects} onChange={e => set("projects", e.target.value)}>
                  <option value="1-3">{Txt("contact.1-a-3-projets", "1 à 3 projets", "1 to 3 projects")}</option>
                  <option value="4-10">{Txt("contact.4-a-10-projets", "4 à 10 projets", "4 to 10 projects")}</option>
                  <option value="10+">{Txt("contact.plus-de-10-projets", "Plus de 10 projets", "More than 10 projects")}</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{Txt("contact.un-mot-sur-votre-besoin-optionnel", "Un mot sur votre besoin (optionnel)", "A word about your needs (optional)")}</label>
                <textarea value={data.msg} onChange={e => set("msg", e.target.value)} placeholder={Txt("contact.ce-qui-vous-coince-aujourd-hui", "Ce qui vous coince aujourd'hui, ce que vous cherchez à régler…", "What's blocking you today, what you're trying to solve…")}/>
              </div>
            </div>
            <div className="form-foot">
              <p className="form-note">{Txt("contact.en-envoyant-vous-acceptez-d-etre", "En envoyant, vous acceptez d'être recontacté·e une fois pour planifier la démo. RGPD-compliant.", "By sending, you agree to be contacted once to schedule the demo. GDPR-compliant.")}</p>
              <button type="submit" className="btn btn-primary" disabled={envoi === "envoi"}>{envoi === "envoi" ? Txt("contact.envoi-en-cours", "Envoi…", "Sending…") : Txt("contact.demander-une-demo-2", "Demander une démo", "Request a demo")} <Icon name="arrow-right" size={14} className="btn-arrow"/></button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

/* FOOTER */
const Footer = () => (
  <footer className="foot">
    <div className="container">
      <div className="foot-top">
        <div>
          <div className="foot-brand">ALBA Studio</div>
          <div className="foot-tag">{Txt("pied.la-plateforme-tout-en-un-des", "La plateforme tout-en-un des architectes indépendants. Conçue à Lyon, pensée pour vous.", "The all-in-one platform for independent architects. Made in Lyon, designed for you.")}</div>
          <span className="liseret-under"></span>
          <div className="foot-apps">
            <h5>{Txt("pied.l-app-mobile-tablette", "L'app mobile & tablette", "The mobile & tablet app")}</h5>
            <StoreBadges theme="dark"/>
          </div>
        </div>
        <div className="foot-col">
          <h5>{Txt("pied.produit", "Produit", "Product")}</h5>
          <ul>
            <li><a href="index.html#features">{Txt("pied.fonctionnalites", "Fonctionnalités", "Features")}</a></li>
            <li><a href="index.html#fonctionnalites">{Txt("pied.la-plateforme", "La plateforme", "The platform")}</a></li>
            <li><a href="Tarifs.html">{Txt("pied.tarifs", "Tarifs", "Pricing")}</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>{Txt("pied.agence", "Agence", "Company")}</h5>
          <ul>
            <li><a href="#">{Txt("pied.a-propos", "À propos", "About")}</a></li>
            <li><a href="#">{Txt("pied.manifeste", "Manifeste", "Manifesto")}</a></li>
            <li><a href="#">{Txt("pied.carrieres", "Carrières", "Careers")}</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>{Txt("pied.legal", "Légal", "Legal")}</h5>
          <ul>
            {/* Les CGU et la politique de confidentialité sont servies par
                l'APPLICATION, pas par la vitrine. Ces adresses-là sont déposées
                dans les fiches App Store et Google Play (voir legalRoutes.test.ts
                côté app) : les dupliquer ici créerait deux textes juridiques
                divergents. Les mentions légales, elles, n'existent nulle part
                ailleurs — c'est la vitrine qui les héberge. */}
            <li><a href="mentions-legales.html">{Txt("pied.mentions-legales", "Mentions légales", "Legal notice")}</a></li>
            <li><a href={`${APP_ORIGIN}/terms`}>{Txt("pied.cgu-cgv", "CGU & CGV", "Terms & conditions")}</a></li>
            <li><a href={`${APP_ORIGIN}/privacy-policy`}>{Txt("pied.politique-rgpd", "Politique RGPD", "GDPR policy")}</a></li>
            <li><a href="#securite">{Txt("pied.securite", "Sécurité", "Security")}</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bot">
        <div>{Txt("pied.2026-alba-studio-tous-droits-reserves", "© 2026 ALBA STUDIO — TOUS DROITS RÉSERVÉS", "© 2026 ALBA STUDIO — ALL RIGHTS RESERVED")}</div>
        <div>{Txt("pied.fait-a-lyon-avec-soin", "FAIT À LYON · AVEC SOIN", "MADE IN LYON · WITH CARE")} <span className="fr-flag" title="Made in France"></span></div>
      </div>
    </div>
  </footer>
);

window.Reveal = Reveal;
window.CTABand = CTABand;
window.TrustBand = TrustBand;
window.Hero = Hero;
window.Logos = Logos;
window.Pains = Pains;
window.Features = Features;
window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.Faq = Faq;
window.Contact = Contact;
window.Footer = Footer;
