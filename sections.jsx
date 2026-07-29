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

const SIGNUP_URL = "https://alba-studio.co/auth";

/* HERO */
const Hero = () => (
  <section className="hero" style={{paddingBottom: 130}}>
    <div className="grid-bg"/>
    <canvas className="hero-canvas" aria-hidden="true"></canvas>
    <div className="container hero-inner">
      <Reveal><span className="tag"><span className="dot"/> {L("Plateforme pour architectes exigeants", "The platform for demanding architects")}</span></Reveal>
      <Reveal delay={120}>
        <h1 className="display">
          {L("Centralisez vos projets.", "Centralize your projects.")}<br/>{L("Simplifiez vos ", "Simplify your ")}<em>{L("échanges clients.", "client communication.")}</em>
        </h1>
      </Reveal>
      <Reveal delay={240}>
        <p className="hero-sub">
          {L("La plateforme pensée pour les architectes indépendants : chaque décision, document et message vit au même endroit. Vos clients suivent. Vous gardez la main.",
             "The platform built for independent architects: every decision, document and message lives in one place. Your clients follow along. You stay in control.")}
        </p>
      </Reveal>
      <Reveal delay={360}>
        <div className="hero-actions">
          <a href={SIGNUP_URL} className="btn btn-primary">{L("Créer mon projet gratuit", "Create my free project")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
          <a href="#contact" className="btn btn-ghost" onClick={() => window.__setContactMode && window.__setContactMode("demo")}>{L("Demander une démo", "Request a demo")}</a>
        </div>
      </Reveal>
      <Reveal delay={480}>
        <div className="hero-meta">
          <span><Icon name="check" size={12} style={{display:"inline", verticalAlign:"-2px", marginRight:6}}/> {L("Gratuit à vie pour 1 projet", "Free forever for 1 project")}</span>
          <span className="sep"/>
          <span>{L("Sans engagement", "No commitment")}</span>
          <span className="sep"/>
          <span>{L("Setup en 10 min", "10-min setup")}</span>
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
        <span>{L("Décision validée", "Decision approved")}<span className="hf-sub">{L("Verrière sud · il y a 2 min", "South skylight · 2 min ago")}</span></span>
      </div>
      <div className="hero-float hf-2">
        <span className="hf-ic gold"><Icon name="chat" size={14}/></span>
        <span>{L("Nouveau message", "New message")}<span className="hf-sub">{L("Marie A. · Maître d'ouvrage", "Marie A. · Client")}</span></span>
      </div>
      <div className="hero-float hf-3">
        <span className="hf-ring"><b>43%</b></span>
        <span>{L("Avancement global", "Overall progress")}<span className="hf-sub">{L("Phase APS · Grange Lissieu", "Design phase · Grange Lissieu")}</span></span>
      </div>
    </Reveal>
    <div className="hero-cue">
      <div className="cue-track"></div>
      <span>{L("Découvrir", "Discover")}</span>
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
        <div className="cta-band-title">{L("Gratuit à vie pour 1 projet.", "Free forever for 1 project.")}</div>
        <div className="cta-band-sub">{L("Gérez un projet complet gratuitement, sans carte bleue, sans limite de temps.", "Run one full project free, no credit card, no time limit.")}</div>
      </div>
      <div className="cta-band-actions">
        <a href={SIGNUP_URL} className="btn btn-primary">{L("Créer mon projet gratuit", "Create my free project")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
        <a href="#pricing" className="btn btn-ghost">{L("Voir le tarif", "See pricing")}</a>
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
          <span className="eyebrow">{L("Ce que vous ne ferez plus", "What you'll stop doing")}</span>
          <h2 className="display">{L("Tout ce dont vous avez besoin, ", "Everything you need, ")}<em>{L("rien de superflu.", "nothing you don't.")}</em></h2>
          <p>{L("ALBA remplace les Drive, WeTransfer, Trello, Slack et boîtes mail éparpillées par un seul espace, conçu pour les agences d'architecture.",
               "ALBA replaces scattered Drives, WeTransfer, Trello, Slack and inboxes with one space, built for architecture practices.")}</p>
        </Reveal>
        <TestiBenefits/>
      </div>
    </section>
  );
};

/* FEATURES */
const Features = () => {
  const tabs = [
    { eyebrow: L("01 — Cockpit", "01 — Cockpit"), title: L("Une vue d'ensemble qui rassure", "An overview that reassures"), desc: L("Avancement, prochaines échéances, décisions en attente. Vos clients savent où en est leur projet sans vous appeler.", "Progress, upcoming deadlines, pending decisions. Your clients know where their project stands without calling you."), mockup: "cockpit" },
    { eyebrow: L("02 — Décisions", "02 — Decisions"), title: L("Validations structurées, traçables", "Structured, traceable approvals"), desc: L("Fini le « j'ai oublié ce qu'on avait dit ». Chaque arbitrage est horodaté, signé et archivé. Plus de SAV un an plus tard.", "No more \"I forgot what we agreed on\". Every decision is timestamped, signed and archived. No disputes a year later."), mockup: "decisions" },
    { eyebrow: L("03 — Chantier", "03 — Site"), title: L("Le chantier suivi, les réserves levées", "Site visits tracked, punch lists cleared"), desc: L("Comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises. Le chantier documenté, sans y passer vos dimanches.", "Visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors. The site documented, without losing your Sundays."), mockup: "chantier" },
  ];
  const [active, setActive] = React.useState(0);
  return (
    <section className="section section-cream-2" id="features">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{L("La plateforme", "The platform")}</span>
          <h2 className="display">{L("Une suite complète,", "A complete suite,")}<br/><em>{L("spécialement pensée pour vous.", "designed specifically for you.")}</em></h2>
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
                <AppMockup variant={t.mockup}/>
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
    { icon: "clock", t: L("Du temps repris", "Time reclaimed"), p: L("Moins d'allers-retours, moins de relances. Le temps gagné, vous le rendez à vos esquisses.", "Fewer back-and-forths, fewer follow-ups. The time you save goes back to your drawings."), stat: L("6h", "6h"), unit: L("économisées par projet et par mois", "saved per project, per month") },
    { icon: "shield", t: L("De la sérénité juridique", "Legal peace of mind"), p: L("Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand.", "Every decision archived, signed, dated. Six months on, you can still see who decided what, and when."), stat: "100%", unit: L("des arbitrages tracés", "of decisions traced") },
    { icon: "star", t: L("Des clients ravis", "Delighted clients"), p: L("Vos maîtres d'ouvrage savent à tout moment où en est le projet, et ne vous rappellent plus à 21h.", "Your clients always know where the project stands, and stop calling you at 9pm."), stat: "4.8/5", unit: L("satisfaction maître d'ouvrage", "client satisfaction") },
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
        <span className="eyebrow">{L("Ce qu'en disent les précurseurs", "What the early adopters say")}</span>
        <h2 className="display">{L("Ils ont essuyé les plâtres.", "They tested the very first walls.")}<br/><em>{L("Ils sont restés.", "They stayed.")}</em></h2>
      </Reveal>
      <div className="testimonials">
        <Reveal className="testi featured">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{L("ALBA a remplacé mon WeTransfer, mon Drive, ma boîte mail et mes tableurs. Mes clients voient enfin où on en est, et moi je récupère mes soirées.", "ALBA replaced my WeTransfer, my Drive, my inbox and my spreadsheets. My clients finally see where we stand, and I get my evenings back.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-camille" shape="circle" placeholder="CL"></image-slot></div>
            <div>
              <div className="testi-name">Camille Lavigne</div>
              <div className="testi-role">{L("ARCHITECTE DPLG · LYON", "REGISTERED ARCHITECT · LYON")}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="testi">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{L("La traçabilité des décisions, c'est l'argument qui m'a convaincu. Plus jamais de SAV un an après.", "Decision traceability is what won me over. No more disputes a year later.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-marc" shape="circle" placeholder="MN"></image-slot></div>
            <div>
              <div className="testi-name">Marc Noiret</div>
              <div className="testi-role">STUDIO MN · BORDEAUX</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={240} className="testi">
          <div className="testi-mark">"</div>
          <p className="testi-quote">{L("Mes maîtres d'ouvrage adorent. Ils ont l'impression d'avoir leur propre app, c'est notre marque blanche.", "My clients love it. They feel like they have their own app, it's our white label.")}</p>
          <div className="testi-foot">
            <div className="testi-avatar-slot"><image-slot id="testi-sophie" shape="circle" placeholder="SO"></image-slot></div>
            <div>
              <div className="testi-name">Sophie Obellier</div>
              <div className="testi-role">ATELIER VAUBAN · PARIS</div>
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
    L("Clients & co-traitants illimités", "Unlimited clients & consultants"),
    L("1 collaborateur inclus — +15 €/mois par collaborateur ajouté (4 max)", "1 team member included — +€15/month per added member (4 max)"),
    L(`${t.go} Go de stockage — ≈ ${projectsFor(t.go)} projets`, `${t.go} GB of storage — ≈ ${projectsFor(t.go)} projects`),
    L("Décisions horodatées & signées", "Timestamped & signed decisions"),
    L("Messagerie projet sécurisée", "Secure project messaging"),
    L("Matériauthèque & fournisseurs", "Material library & suppliers"),
    L("CR de chantier, réserves & photos", "Site reports, punch lists & photos"),
    L("Visionneuse plans dans le navigateur", "In-browser plan viewer"),
    L("Exports PDF & comptables", "PDF & accounting exports"),
    L("Marque blanche maître d'ouvrage", "White-label client portal"),
    L("Support prioritaire 7j/7", "Priority support 7 days a week"),
  ];
  return (
    <section className="section section-dark" id="pricing">
      <div className="container">
        <div className="pricing-layout">

          <Reveal className="pricing-config">
            <span className="eyebrow">{L("Tarif", "Pricing")}</span>
            <h2 className="display">{L("Un prix simple,", "One simple price,")}<br/><em>{L("une valeur claire.", "clear value.")}</em></h2>
            <p className="pricing-intro">{L("Tout est inclus. Pas de module, pas d'option cachée. Seul le stockage fait varier le prix, choisissez, le tarif se met à jour à droite.", "Everything included. No add-ons, no hidden extras. Only storage changes the price, pick yours, the price updates on the right.")}</p>
            <div className="p-config-label">{L("1 · Votre facturation", "1 · Your billing")}</div>
            <div className="pricing-toggle">
              <button className={!yearly ? "is-active" : ""} onClick={() => setYearly(false)}>{L("Mensuel", "Monthly")}</button>
              <button className={yearly ? "is-active" : ""} onClick={() => setYearly(true)}>{L("Annuel", "Yearly")} <span className="badge">−18%</span></button>
            </div>
            <div className="p-config-label">{L("2 · Votre stockage", "2 · Your storage")}</div>
            <div className="p-tiers">
              {tiers.map((tr, i) => (
                <button key={tr.go} className={`p-tier ${tier === i ? "is-active" : ""}`} onClick={() => setTier(i)}>
                  <span className="p-tier-radio"></span>
                  <span className="p-tier-main">
                    <b>{tr.go} {L("Go", "GB")}</b>
                    <span>{L(`≈ ${projectsFor(tr.go)} projets`, `≈ ${projectsFor(tr.go)} projects`)}</span>
                  </span>
                  <span className="p-tier-price">{baseFor(tr)} €<i>{L("/mois", "/mo")}</i></span>
                </button>
              ))}
            </div>
            <div className="p-config-label">{L("3 · Votre équipe", "3 · Your team")}</div>
            <div className="p-seats">
              <button type="button" className="p-seat-btn" onClick={() => setSeats(Math.max(1, seats - 1))} aria-label={L("Moins", "Fewer")}><Icon name="minus" size={12}/></button>
              <div className="p-seat-val"><b>{seats}</b><span>{seats > 1 ? L("collaborateurs", "team members") : L("collaborateur", "team member")}</span></div>
              <button type="button" className="p-seat-btn" onClick={() => setSeats(Math.min(4, seats + 1))} aria-label={L("Plus", "More")}><Icon name="plus" size={12}/></button>
              <div className="p-seat-note">{extraSeats > 0 ? L(`1 inclus + ${extraSeats} × 15 €/mois · 4 max`, `1 included + ${extraSeats} × €15/mo · 4 max`) : L("1 inclus · jusqu'à 4 par espace", "1 included · up to 4 per workspace")}</div>
            </div>
            <div className="pricing-go-note">{L("Un projet d'architecture occupe en moyenne 10 Go, plans, photos, documents et échanges inclus. Vous pourrez changer de palier à tout moment, en un clic.", "An architecture project takes about 10 GB on average, plans, photos, documents and messages included. You can change tiers anytime, in one click.")}</div>
          </Reveal>

          <Reveal delay={120} className="pricing-side">
            <div className="pricing-card">
              <span className="pricing-tag"><span className="dot"/> Studio</span>
              <div className="pricing-name">{L("Pour votre agence", "For your practice")}</div>
              <div className="pricing-desc">{L("Tout ce qu'il faut pour piloter sereinement vos projets, sans option cachée.", "Everything you need to run your projects with confidence, no hidden extras.")}</div>
              <div className="pricing-amt">
                <span className="c">€</span>
                <span className="v" key={`${tier}-${total}`}>{total}</span>
                <span className="p">{L("/ mois", "/ month")}</span>
              </div>
              {yearly && (
                <div className="pricing-save">
                  <span className="ps-badge">−18%</span>
                  <span className="ps-text">
                    {L(`Vous économisez ${(t.price - base) * 12} € par an`, `You save €${(t.price - base) * 12} a year`)}
                    <i>{L(`Facturé ${total * 12} € en une fois, au lieu de ${(t.price + extraCost) * 12} € en mensuel`, `Billed €${total * 12} once a year, instead of €${(t.price + extraCost) * 12} monthly`)}</i>
                  </span>
                </div>
              )}
              {extraSeats > 0 && (
                <div className="pricing-seats-line">{L(`Dont ${extraCost} € / mois : ${extraSeats} collaborateur${extraSeats > 1 ? "s" : ""} supplémentaire${extraSeats > 1 ? "s" : ""}`, `Includes €${extraCost} / month for ${extraSeats} extra team member${extraSeats > 1 ? "s" : ""}`)}</div>
              )}
              <ul className="pricing-includes">
                {includes.map((it, i) => (
                  <li key={i}><Icon name="check" size={12}/> {it}</li>
                ))}
              </ul>
              <a href={`${SIGNUP_URL}?plan=studio&storage=${t.go}&billing=${yearly ? "yearly" : "monthly"}&seats=${seats}`} className="btn btn-primary pricing-cta">{L("Démarrer avec un projet gratuit", "Start with a free project")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
              <div className="pricing-foot">{L("GRATUIT À VIE POUR 1 PROJET · SANS CB · SANS ENGAGEMENT", "FREE FOREVER FOR 1 PROJECT · NO CARD · NO COMMITMENT")}</div>
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
    { icon: "globe", t: L("Hébergé en France", "Hosted in France"), d: L("Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. Conformité RGPD native.", "Your data is stored in France with an ISO 27001-certified host. GDPR-compliant by design.") },
    { icon: "lock", t: L("Chiffré, sauvegardé", "Encrypted, backed up"), d: L("Chiffrement AES-256 au repos, TLS en transit. Sauvegardes automatiques quotidiennes.", "AES-256 encryption at rest, TLS in transit. Automatic daily backups.") },
    { icon: "doc", t: L("Vos données vous appartiennent", "Your data stays yours"), d: L("Export intégral de vos projets (PDF, ZIP, CSV) à tout moment, en un clic.", "Export all your projects (PDF, ZIP, CSV) anytime, in one click.") },
    { icon: "shield", t: L("Valeur probante", "Evidence you can produce"), d: L("Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur.", "Timestamped, electronically signed decisions (eIDAS simple signature). Every decision is archived with its evidence: author, date, server timestamp.") },
  ];
  return (
    <section className="trust-band" id="securite">
      <div className="container">
        <div className="trust-eyebrow">{L("Sécurité & données", "Security & data")}</div>
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
    { q: L("Que comprend le projet gratuit ?", "What does the free project include?"), a: L("Un projet complet, sans limite de temps : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio uniquement quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.", "One complete project, with no time limit: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You only move to the Studio plan when you create your second project, and everything you've built stays in place.") },
    { q: L("Comment ALBA s'intègre à ma méthode actuelle ?", "How does ALBA fit my current workflow?"), a: L("ALBA s'adapte à votre process, pas l'inverse. Vous configurez les phases (esquisse, APS, APD, permis, DCE, chantier), nous gérons les rappels, les jalons et la mémoire du projet. Aucune formation longue : la plupart des architectes sont opérationnels en moins d'une heure.", "ALBA adapts to your process, not the other way round. You configure the phases (concept, design, permits, tender, construction); we handle reminders, milestones and the project's memory. No lengthy training: most architects are up and running in under an hour.") },
    { q: L("Mes clients doivent-ils télécharger une application ?", "Do my clients need to download an app?"), a: L("Non. ALBA fonctionne entièrement dans le navigateur, sur ordinateur comme sur téléphone. Un lien, un mot de passe, vos maîtres d'ouvrage accèdent à leur cockpit en 30 secondes.", "No. ALBA runs entirely in the browser, on desktop and phone. A link, a password, your clients reach their cockpit in 30 seconds.") },
    { q: L("Que se passe-t-il pour mes données si j'arrête ?", "What happens to my data if I leave?"), a: L("Elles sont à vous. À tout moment, vous exportez l'intégralité de vos projets (PDF, ZIP, CSV) en un clic. Vos archives papier-numérique restent lisibles 10 ans après.", "It's yours. At any time, export all your projects (PDF, ZIP, CSV) in one click. Your digital archives remain readable 10 years on.") },
    { q: L("Les décisions sont-elles juridiquement valables ?", "Are decisions legally valid?"), a: L("Chaque décision est horodatée, archivée et signée électroniquement (eIDAS, niveau simple) : l'auteur, la date et l'horodatage serveur sont conservés à titre de preuve. Pour un acte qui exige une signature avancée ou qualifiée, passez par votre voie habituelle.", "Every decision is timestamped, archived and electronically signed (eIDAS, simple level): the author, date and server timestamp are kept as evidence. For a document requiring an advanced or qualified signature, use your usual channel.") },
    { q: L("Puis-je inviter mon BET et mes co-traitants ?", "Can I invite my engineers and consultants?"), a: L("Bien sûr. Les co-traitants accèdent gratuitement aux projets sur lesquels vous les invitez, avec le niveau de droits que vous définissez (lecture, commentaire, dépôt de pièces).", "Of course. Consultants get free access to the projects you invite them to, with the permission level you set (view, comment, upload).") },
    { q: L("Combien de collaborateurs de mon agence sont inclus ?", "How many team members are included?"), a: L("Le tarif Studio inclut 1 collaborateur. Vous pouvez en ajouter jusqu'à 3 autres (4 par espace au maximum), à 15 €/mois chacun, ajustable à tout moment. Vos clients et co-traitants, eux, sont illimités et gratuits.", "The Studio plan includes 1 team member. You can add up to 3 more (4 per workspace maximum), at €15/month each, adjustable anytime. Clients and consultants are unlimited and free.") },
    { q: L("Et pendant le chantier ?", "What about the construction phase?"), a: L("ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.", "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.") },
    { q: L("Quels formats de fichiers puis-je partager ?", "What file formats can I share?"), a: L("Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 2 Go par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.", "All of them — PDF, DWG, IFC, images, videos, up to 2 GB per file. PDF plans and images open right in the browser: your clients don't need any software.") },
    { q: L("Où sont hébergées mes données ?", "Where is my data hosted?"), a: L("En France, chez un hébergeur certifié ISO 27001. Chiffrement AES-256 au repos, TLS en transit, sauvegardes quotidiennes. Conformité RGPD native.", "In France, with an ISO 27001-certified host. AES-256 encryption at rest, TLS in transit, daily backups. GDPR-compliant by design.") },
    { q: L("Quel est le délai pour démarrer ?", "How long does it take to get started?"), a: L("Si vous voulez, vous démarrez aujourd'hui. La création de compte prend 3 minutes ; importer vos projets en cours prend en moyenne une demi-journée. On vous accompagne sur l'onboarding sans frais.", "You can start today. Account creation takes 3 minutes; importing your active projects takes half a day on average. We help with onboarding at no charge.") },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section section-cream-2" id="faq">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{L("Questions fréquentes", "Frequently asked questions")}</span>
          <h2 className="display">{L("Vous vous demandez sûrement…", "You're probably wondering…")}</h2>
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
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = L("Votre nom est requis", "Your name is required");
    if (!data.agency.trim()) e.agency = L("Le nom de l'agence est requis", "Practice name is required");
    if (!data.email.trim()) e.email = L("L'email est requis", "Email is required");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = L("Email invalide", "Invalid email");
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };
  return (
    <section className="section section-cream" id="contact">
      <div className="container contact">
        <Reveal className="contact-side">
          <span className="eyebrow">{L("Parlons-en", "Let's talk")}</span>
          <h2>{L("Voyons ALBA sur vos projets. Réponse sous 24 h.", "Let's look at ALBA on your projects. Reply within 24 hours.")}</h2>
          <p>{L("Que vous soyez seul·e ou à dix, on adapte la démo à votre méthode. Pas de discours commercial, juste l'outil en action.", "Whether you're solo or a team of ten, we tailor the demo to your workflow. No sales pitch, just the tool in action.")}</p>
          <ul className="contact-info">
            <li><Icon name="chat" size={14}/> contact@alba-studio.co</li>
            <li><Icon name="clock" size={14}/> {L("Réponse en moins de 24 h ouvrées", "Reply within 24 business hours")}</li>
            <li><Icon name="globe" size={14}/> {L("Démo en visio · 30 min", "Video demo · 30 min")}</li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form className="form" onSubmit={submit} noValidate>
            <div className="form-lead">
              <span className="fl-t">{L("Demander une démo", "Request a demo")}</span>
              <span className="fl-s">{L("Visio · 30 min · sans engagement", "Video call · 30 min · no commitment")}</span>
              <a href={SIGNUP_URL} className="fl-link">{L("Ou créez directement votre compte gratuit →", "Or create your free account right away →")}</a>
            </div>
            {submitted && (
              <div className="form-success">
                <Icon name="check" size={14}/> L(`Merci, ${data.name.split(" ")[0]}. Nous vous recontactons sous 24 h pour convenir d'un créneau.`, `Thank you, ${data.name.split(" ")[0]}. We'll be in touch within 24 hours to book a slot.`)
              </div>
            )}
            <div className="form-row">
              <div className={`field ${errors.name ? "error" : ""}`}>
                <label>{L("Nom complet", "Full name")}</label>
                <input value={data.name} onChange={e => set("name", e.target.value)} placeholder="Camille Lavigne" />
                {errors.name && <div className="field-err">{errors.name}</div>}
              </div>
              <div className={`field ${errors.agency ? "error" : ""}`}>
                <label>{L("Agence", "Practice")}</label>
                <input value={data.agency} onChange={e => set("agency", e.target.value)} placeholder="Atelier Lavigne" />
                {errors.agency && <div className="field-err">{errors.agency}</div>}
              </div>
            </div>
            <div className="form-row">
              <div className={`field ${errors.email ? "error" : ""}`}>
                <label>{L("Email professionnel", "Work email")}</label>
                <input value={data.email} onChange={e => set("email", e.target.value)} type="email" placeholder="camille@atelier-lavigne.fr" />
                {errors.email && <div className="field-err">{errors.email}</div>}
              </div>
              <div className="field">
                <label>{L("Téléphone", "Phone")}</label>
                <input value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="+33 6 12 34 56 78" />
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{L("Combien de projets en cours ?", "How many active projects?")}</label>
                <select value={data.projects} onChange={e => set("projects", e.target.value)}>
                  <option value="1-3">{L("1 à 3 projets", "1 to 3 projects")}</option>
                  <option value="4-10">{L("4 à 10 projets", "4 to 10 projects")}</option>
                  <option value="10+">{L("Plus de 10 projets", "More than 10 projects")}</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{L("Un mot sur votre besoin (optionnel)", "A word about your needs (optional)")}</label>
                <textarea value={data.msg} onChange={e => set("msg", e.target.value)} placeholder={L("Ce qui vous coince aujourd'hui, ce que vous cherchez à régler…", "What's blocking you today, what you're trying to solve…")}/>
              </div>
            </div>
            <div className="form-foot">
              <p className="form-note">{L("En envoyant, vous acceptez d'être recontacté·e une fois pour planifier la démo. RGPD-compliant.", "By sending, you agree to be contacted once to schedule the demo. GDPR-compliant.")}</p>
              <button type="submit" className="btn btn-primary">{L("Demander une démo", "Request a demo")} <Icon name="arrow-right" size={14} className="btn-arrow"/></button>
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
          <div className="foot-tag">{L("La plateforme tout-en-un des architectes indépendants. Conçue à Lyon, pensée pour vous.", "The all-in-one platform for independent architects. Made in Lyon, designed for you.")}</div>
          <span className="liseret-under"></span>
          <div className="foot-apps">
            <h5>{L("L'app mobile & tablette", "The mobile & tablet app")}</h5>
            <StoreBadges theme="dark"/>
          </div>
        </div>
        <div className="foot-col">
          <h5>{L("Produit", "Product")}</h5>
          <ul>
            <li><a href="index.html#features">{L("Fonctionnalités", "Features")}</a></li>
            <li><a href="index.html#fonctionnalites">{L("La plateforme", "The platform")}</a></li>
            <li><a href="Tarifs.html">{L("Tarifs", "Pricing")}</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>{L("Agence", "Company")}</h5>
          <ul>
            <li><a href="#">{L("À propos", "About")}</a></li>
            <li><a href="#">{L("Manifeste", "Manifesto")}</a></li>
            <li><a href="#">{L("Carrières", "Careers")}</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>{L("Légal", "Legal")}</h5>
          <ul>
            {/* Les CGU et la politique de confidentialité sont servies par
                l'APPLICATION, pas par la vitrine. Ces adresses-là sont déposées
                dans les fiches App Store et Google Play (voir legalRoutes.test.ts
                côté app) : les dupliquer ici créerait deux textes juridiques
                divergents. Les mentions légales, elles, n'existent nulle part
                ailleurs — c'est la vitrine qui les héberge. */}
            <li><a href="mentions-legales.html">{L("Mentions légales", "Legal notice")}</a></li>
            <li><a href="https://alba-studio.co/terms">{L("CGU & CGV", "Terms & conditions")}</a></li>
            <li><a href="https://alba-studio.co/privacy-policy">{L("Politique RGPD", "GDPR policy")}</a></li>
            <li><a href="#securite">{L("Sécurité", "Security")}</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bot">
        <div>{L("© 2026 ALBA STUDIO — TOUS DROITS RÉSERVÉS", "© 2026 ALBA STUDIO — ALL RIGHTS RESERVED")}</div>
        <div>{L("FAIT À LYON · AVEC SOIN", "MADE IN LYON · WITH CARE")} <span className="fr-flag" title="Made in France"></span></div>
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
