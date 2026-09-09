/* Section components for Alba landing, bilingual via window.L(fr, en) */

/* La classe `in` est un ÉTAT REACT, et non un `classList.add` posé à la main.

   Elle l'a été, et ça a fait disparaître deux cartes tarifaires sur trois : le
   visiteur cliquait « 2 personnes », le badge « correspond à vos réponses »
   passait d'Atelier à Agence, la prop `className` changeait donc sur ces deux
   cartes — et React réécrivait l'attribut entier depuis son propre modèle, qui
   ne connaissait pas `in`. Retour à `opacity: 0`, et l'IntersectionObserver ne
   se redéclenche pas pour un élément qui n'a pas bougé. Découverte restait
   affichée parce qu'elle seule n'avait pas changé de classe.

   Un attribut que React possède ne se modifie que par React. */
const Reveal = ({ as: Tag = "div", delay = 0, children, className = "", ...rest }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
        } else if (e.boundingClientRect.top > 0) {
          // element left through the BOTTOM of the viewport (user scrolled up past it)
          setVisible(false);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}${visible ? " in" : ""}`} style={{"--reveal-delay": `${delay}ms`}} {...rest}>{children}</Tag>;
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
          {/* Les deux boutons du hero, dans l'ordre du parcours : on essaie
              d'abord, on s'abonne ensuite.

              · « Tester en 1 clic » poste vers demo-express et ouvre un vrai
                espace d'essai. C'est un <form>, pas un lien — voir le long
                commentaire de <BoutonEssai/> dans components.jsx.
              · « S'abonner » mène à #pricing, PAS directement au tunnel Stripe :
                depuis le hero on ignore le palier de stockage, la périodicité et
                le nombre de sièges. Envoyer un palier par défaut ferait payer au
                visiteur autre chose que ce qu'il aurait choisi. Il descend donc
                à la carte tarifaire, coche ce qu'il veut, et c'est le bouton de
                la carte qui ouvre le paiement. */}
          <BoutonEssai className="btn btn-primary">
            {Txt("accueil.tester-en-1-clic", "Tester en 1 clic", "Try it in one click")} <Icon name="arrow-right" size={14} className="btn-arrow"/>
          </BoutonEssai>
          <a href="#pricing" className="btn btn-ghost">{Txt("accueil.s-abonner", "S'abonner", "Subscribe")}</a>
        </div>
      </Reveal>
      <Reveal delay={420}>
        <p className="hero-essai-note">
          {Txt("accueil.note-essai", "Un espace d'essai complet, ouvert 7 jours. Sans inscription ni carte bancaire.", "A complete trial workspace, open for 7 days. No sign-up, no credit card.")}
        </p>
      </Reveal>
      {/* La ligne « Premier projet offert · Sans engagement · Setup en 10 min »
          a été retirée : elle faisait une seconde ligne de petit texte sous les
          boutons, et surtout elle annonçait une AUTRE promesse que l'essai —
          un premier projet gratuit là où le bouton ouvre un espace de 7 jours.
          Deux offres différentes à trois centimètres l'une de l'autre, c'est
          une hésitation, pas une réassurance. La note d'essai reste seule.
          Les trois clés de traduction ont été retirées de contenu.js avec elle :
          tests/contenu.mjs échoue sur une clé déclarée que personne n'appelle. */}
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
        <div className="cta-band-title">{Txt("bandeau-cta.gratuit-a-vie-pour-1-projet", "Premier projet offert.", "First project on us.")}</div>
        <div className="cta-band-sub">{Txt("bandeau-cta.gerez-un-projet-complet-gratuitement-sans", "Créez votre espace en dix minutes. Le premier projet est offert, sans carte bleue.", "Set up your workspace in ten minutes. The first project is on us, no credit card.")}</div>
      </div>
      <div className="cta-band-actions">
        <a href={SIGNUP_URL} className="btn btn-primary">{Txt("bandeau-cta.creer-mon-projet-gratuit", "Créer mon espace", "Create my workspace")} <Icon name="arrow-right" size={14} className="btn-arrow"/></a>
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

/* ============================================================================
   « TOUT CE QUE FAIT ALBA » — le catalogue, derrière un bouton
   ============================================================================
   POURQUOI IL N'Y A QU'UN SEUL BOUTON

   La demande parlait de le poser « sur la ligne Toutes les fonctionnalités de
   l'encadré, et sur la même ligne dans chacune des trois cartes ». Cette ligne
   n'existe plus qu'à UN endroit depuis la refonte : les trois offres sont
   devenues des tuiles d'une ligne, et ce sont elles-mêmes des <button> — un
   bouton dans un bouton n'est pas du HTML valide, et aucun lecteur d'écran
   n'en fait quelque chose d'utilisable.

   L'intention, elle, est respectée à la lettre : un seul bouton, un seul
   contenu, pas quatre listes à maintenir.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI UN PORTAIL VERS <body>

   `.reveal` porte `transform: translateY(0)` même à l'état visible. Un
   `transform` sur un ancêtre fait de lui le bloc conteneur des descendants en
   `position: fixed` : la fenêtre se serait centrée sur la CARTE, pas sur
   l'écran, et le voile n'aurait couvert qu'elle. Le portail sort du sous-arbre
   et rend le problème impossible plutôt que de le contourner.

   ⚠️ AUCUN PRIX ICI, et aucune mention d'offre — à la seule exception de
   « offre Agence » sur la ligne Collaborateurs, parce que c'est la seule
   fonction dont l'accès dépend réellement de l'offre. Ce n'est pas un tableau
   comparatif : c'est précisément ce qu'on refuse de faire, puisque tout est
   dans toutes les offres. tests/montants.mjs veille sur les montants.
   ============================================================================ */
const CATALOGUE = () => [
  {
    icone: "folder",
    titre: Txt("catalogue.projets", "Vos projets", "Your projects"),
    items: [
      Txt("catalogue.projets-decisions", "Décisions — trancher, horodater et signer les choix du chantier", "Decisions — settle, timestamp and sign the choices made on site"),
      Txt("catalogue.projets-documents", "Documents — plans, pièces écrites, contrats : déposés, versionnés, partagés", "Documents — drawings, written documents, contracts: uploaded, versioned, shared"),
      Txt("catalogue.projets-suivi", "Suivi du projet — les phases, les jalons et les échéances", "Project tracking — phases, milestones and deadlines"),
      Txt("catalogue.projets-budget", "Budget — le suivi des montants, des lots et des factures", "Budget — tracking amounts, work packages and invoices"),
      Txt("catalogue.projets-rentabilite", "Rentabilité — le temps passé et la marge, projet par projet", "Profitability — time spent and margin, project by project"),
      Txt("catalogue.projets-chantier", "Suivi de chantier — réserves, comptes rendus de visite, PV et photos", "Site tracking — punch-list items, visit reports, minutes and photographs"),
      Txt("catalogue.projets-calendrier", "Calendrier — toutes les échéances de tous les projets au même endroit", "Calendar — every deadline from every project in one place"),
    ],
  },
  {
    icone: "sparkle",
    titre: Txt("catalogue.leo", "Léo, votre assistant", "Léo, your assistant"),
    items: [
      Txt("catalogue.leo-lit", "Il lit vos pièces écrites — CCTP, descriptifs, DPGF, notices — et en sort les prescriptions, les matériaux, les prix et les intervenants", "He reads your written documents — specifications, schedules of works, bills of quantities, notices — and extracts requirements, materials, prices and parties"),
      Txt("catalogue.leo-questions", "Vous lui posez vos questions sur vos projets, en français", "You ask him questions about your projects, in plain English"),
      Txt("catalogue.leo-voix", "Il répond à voix haute si vous le souhaitez", "He answers out loud if you want him to"),
      Txt("catalogue.leo-briefing", "Un briefing du matin qui rassemble ce qui vous attend", "A morning briefing that gathers what lies ahead"),
    ],
  },
  {
    icone: "users",
    titre: Txt("catalogue.portail", "Le portail de vos clients", "Your clients' portal"),
    items: [
      Txt("catalogue.portail-espace", "Un espace par projet pour le maître d'ouvrage, sans qu'il crée de compte", "A space per project for your client, with no account to create"),
      Txt("catalogue.portail-signature", "Validation des choix et signature électronique des procès-verbaux", "Approval of choices and electronic signature of minutes"),
      Txt("catalogue.portail-messagerie", "Messagerie avec le maître d'ouvrage et les intervenants", "Messaging with your client and everyone involved"),
      Txt("catalogue.portail-droits", "Vous décidez, projet par projet et personne par personne, de ce qu'ils voient", "You decide, project by project and person by person, what they see"),
      Txt("catalogue.portail-gratuits", "Clients, bureaux d'études et entreprises : gratuits et illimités", "Clients, engineers and contractors: free and unlimited"),
    ],
  },
  {
    icone: "layers",
    titre: Txt("catalogue.matiere", "La matière", "Your material"),
    items: [
      Txt("catalogue.matiere-materiautheque", "Matériauthèque — votre bibliothèque de matériaux, réutilisable d'un projet à l'autre", "Material library — your own library of materials, reusable from one project to the next"),
      Txt("catalogue.matiere-lots", "Bibliothèque de lots et de modèles CCTP", "Library of work packages and specification templates"),
      Txt("catalogue.matiere-consultation", "Consultation des entreprises — prescriptions, intervenants et prix", "Tendering — requirements, parties and prices"),
    ],
  },
  {
    icone: "compass",
    titre: Txt("catalogue.agence", "Votre agence", "Your practice"),
    items: [
      Txt("catalogue.agence-collaborateurs", "Collaborateurs — inviter votre équipe et régler ses droits (offre Agence)", "Team members — invite your team and set their permissions (Practice plan)"),
      Txt("catalogue.agence-visuels", "Visuels — galeries, diaporama et visites virtuelles pour vos présentations", "Visuals — galleries, slideshows and virtual tours for your presentations"),
      Txt("catalogue.agence-emails", "E-mails automatiques", "Automatic emails"),
      Txt("catalogue.agence-honoraires", "Calculateur d'honoraires", "Fee calculator"),
      Txt("catalogue.agence-archives", "Archives et corbeille", "Archives and bin"),
    ],
  },
  {
    icone: "globe",
    titre: Txt("catalogue.aussi", "Et aussi", "And also"),
    items: [
      Txt("catalogue.aussi-mobile", "Application mobile iOS et Android", "iOS and Android mobile app"),
      Txt("catalogue.aussi-notifications", "Notifications par e-mail et sur votre téléphone", "Notifications by email and on your phone"),
      Txt("catalogue.aussi-2fa", "Double authentification", "Two-factor authentication"),
      Txt("catalogue.aussi-langues", "Français et anglais", "French and English"),
      Txt("catalogue.aussi-accessibilite", "Réglages d'accessibilité", "Accessibility settings"),
      Txt("catalogue.aussi-marque", "Vos couleurs et votre logo sur les documents envoyés", "Your colours and your logo on the documents you send"),
    ],
  },
];

const ToutesFonctionnalites = () => {
  const [ouvert, setOuvert] = React.useState(false);
  const bouton = React.useRef(null);
  const boite = React.useRef(null);
  const titreId = "catalogue-titre";

  /* ── LE PIÈGE À FOCUS ───────────────────────────────────────────────────
     Sans lui, la tabulation sort de la fenêtre par le bas et se promène dans
     une page que le voile rend invisible : on tabule à l'aveugle, sans savoir
     où l'on est ni comment revenir. Le tabindex={-1} sur la boîte donne un
     point de départ au focus sans ajouter un arrêt de tabulation. */
  React.useEffect(() => {
    if (!ouvert) return;
    const el = boite.current;
    if (!el) return;

    const focusables = () => [...el.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((n) => n.offsetParent !== null);

    /* On entre par le bouton « Fermer » : c'est la sortie, et savoir en sortir
       est la première chose dont on a besoin en arrivant. */
    const premier = el.querySelector(".fen-fermer");
    if (premier) premier.focus();

    const auClavier = (e) => {
      if (e.key === "Escape") { e.preventDefault(); setOuvert(false); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const [debut, fin] = [f[0], f[f.length - 1]];
      /* `document.activeElement` et non e.target : le focus peut être sur la
         boîte elle-même, qui n'est pas dans la liste. */
      if (e.shiftKey && document.activeElement === debut) { e.preventDefault(); fin.focus(); }
      else if (!e.shiftKey && document.activeElement === fin) { e.preventDefault(); debut.focus(); }
    };
    document.addEventListener("keydown", auClavier);

    /* La page derrière ne défile pas. `overflow: hidden` suffit au défilement
       natif, mais Lenis pilote le sien et continuerait à déplacer la page sous
       le voile : on l'arrête aussi, et on le relance en partant. */
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();

    return () => {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = avant;
      if (window.__lenis) window.__lenis.start();
      /* Le focus revient au bouton qui a ouvert : sans ça il retombe sur
         <body>, et la tabulation reprend au tout début de la page. */
      if (bouton.current) bouton.current.focus();
    };
  }, [ouvert]);

  const fenetre = (
    <div className="fen-fond" onMouseDown={(e) => { if (e.target === e.currentTarget) setOuvert(false); }}>
      <div className="fen-boite" ref={boite} tabIndex={-1}
           role="dialog" aria-modal="true" aria-labelledby={titreId}>
        <div className="fen-tete">
          <div>
            <h2 className="fen-titre" id={titreId}>
              {Txt("catalogue.titre", "Tout ce que fait Alba", "Everything Alba does")}
            </h2>
            <p className="fen-chapo">
              {Txt("catalogue.chapo",
                "Tout ce qui suit est inclus dans les trois offres, y compris la gratuite. Nous ne bornons que des quantités : le nombre de projets menés de front, le nombre de personnes, et l'usage de Léo.",
                "Everything below is included in all three plans, including the free one. We cap quantities only: the number of projects you run at once, the number of people, and how much you use Léo.")}
            </p>
          </div>
          {/* Un bouton nommé, pas une croix muette : « Fermer » se lit, et se
              comprend au lecteur d'écran comme à l'œil. */}
          <button type="button" className="fen-fermer" onClick={() => setOuvert(false)}>
            <Icon name="x" size={16}/>
            <span>{Txt("catalogue.fermer", "Fermer", "Close")}</span>
          </button>
        </div>

        <div className="fen-corps">
          <div className="fen-groupes">
            {CATALOGUE().map((g, i) => (
              <section className="fen-groupe" key={i}>
                <h3 className="fen-groupe-titre"><Icon name={g.icone} size={15}/>{g.titre}</h3>
                <ul>
                  {g.items.map((it, j) => (
                    <li key={j}><Icon name="check" size={13}/><span>{it}</span></li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="fen-pied">
            {Txt("catalogue.pied",
              "Vous pouvez masquer ce que vous n'utilisez pas, depuis vos réglages — et le rallumer quand vous voulez.",
              "You can hide what you don't use, from your settings — and switch it back on whenever you like.")}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" className="fen-plus" ref={bouton}
              aria-haspopup="dialog" aria-expanded={ouvert ? "true" : "false"}
              onClick={() => setOuvert(true)}
              aria-label={Txt("catalogue.voir", "Voir toutes les fonctionnalités", "See every feature")}>
        <Icon name="plus" size={14}/>
      </button>
      {/* Le portail n'existe que dans un navigateur : le prérendu monte une
          vraie page, donc document.body est là. La garde protège quand même
          d'un montage hors navigateur. */}
      {ouvert && typeof document !== "undefined"
        ? ReactDOM.createPortal(fenetre, document.body)
        : null}
    </>
  );
};

/* ============================================================================
   PRICING — deux questions, une réponse
   ============================================================================
   CE QU'ON A CESSÉ DE VENDRE

   La grille affichait 49 / 69 / 89 € pour 50, 150 et 300 Go : les trois offres
   ne différaient QUE par le stockage. Mesure faite en production le 9 septembre
   2026, l'ensemble des comptes occupait 0,143 Go — l'offre d'ENTRÉE promettait
   350 fois plus que tout ce qui existait. Un plafond que personne n'atteindra
   jamais n'est pas une offre d'entrée : c'est un axe de prix mort.

   ⚠️ LE MOT « STOCKAGE » NE DOIT REPARAÎTRE NULLE PART, ni les gigaoctets.
   tests/tarifs.mjs le vérifie sur toutes les pages rendues, métadonnées
   comprises — c'est par là qu'il s'était échappé la première fois.

   ────────────────────────────────────────────────────────────────────────────
   POURQUOI UNE SEULE CARTE, ET PAS TROIS

   La version précédente posait trois cartes de poids égal, puis un calculateur
   EN DESSOUS. Le badge « correspond à vos réponses » était sur une carte
   au-dessus des questions auxquelles il répondait : le visiteur lisait un
   badge qui parlait de réponses qu'il n'avait pas données, et quand il
   cliquait enfin « 2 personnes », la réaction se produisait hors de son champ
   de vision. Le prix était affiché deux fois — dans la carte et dans le
   calculateur — et l'argument Léo, qui est TOUT l'argument, finissait en bas
   d'une boîte grise à cinq curseurs.

   Désormais : la question à gauche, la réponse à droite, dans l'ordre de
   lecture. Un seul grand chiffre, qui change sous les yeux. Et l'argument en
   une ligne, en face du prix : « ≈ 300 € de temps gagné, soit 6 × votre
   abonnement ». Les trois offres restent visibles, en rail compact sous la
   réponse — on voit le paysage sans devoir choisir entre trois égaux.

   ────────────────────────────────────────────────────────────────────────────
   LA RÈGLE D'OR

   Toutes les fonctionnalités sont dans toutes les offres, y compris la
   gratuite. On ne borne que des QUANTITÉS. C'est l'argument, il est donc écrit
   en encart sous les questions : la concurrence réserve des fonctions aux
   paliers hauts, et un architecte qui s'est déjà heurté à un « disponible à
   partir de l'offre Pro » lira cette ligne deux fois.

   ────────────────────────────────────────────────────────────────────────────
   AGENCE N'EST PAS UN PRIX PAR PERSONNE

   Elle l'a été sur cette page pendant une journée, et c'était faux : la carte
   annonçait « 69 € par personne », soit 276 € pour quatre. Le tarif réel est
   dégressif — 69 € pour la première personne, 39 € pour chacune des suivantes,
   soit 186 € pour quatre. Les montants viennent de tarifs.js, seul endroit du
   dépôt où ils sont écrits ; ce sont ceux de Stripe, et rien d'autre ne fait
   autorité.
   ============================================================================ */
const Pricing = () => {
  /* ── LA GRILLE ────────────────────────────────────────────────────────────
     Elle vient de tarifs.js, et n'est PAS recopiée ici. Pas de valeur de
     repli, volontairement : un prix de repli qui diverge du vrai est exactement
     le défaut qu'on cherche à rendre impossible. Le prérendu monte la page dans
     un vrai navigateur : si le fichier n'est pas chargé, ça casse là, à la
     construction, et pas chez un visiteur. */
  const TARIFS = window.ALBA_TARIFS;

  const [annuel, setAnnuel] = React.useState(false);
  const [personnes, setPersonnes] = React.useState(1);
  const [projets, setProjets] = React.useState(3);
  /* Le visiteur peut désigner une offre à la main dans le rail. Ce choix vaut
     jusqu'à ce qu'il change une réponse : une réponse nouvelle rend la main à
     la recommandation. C'est la règle la plus prévisible — on ne se retrouve
     jamais avec une offre choisie il y a trois clics qui contredit ce qu'on
     vient de dire. */
  const [choix, setChoix] = React.useState(null);
  /* Les curseurs de l'estimation sont repliés : ils sont pour le sceptique, pas
     pour tout le monde. Le résultat, lui, est toujours visible. */
  const [ajuste, setAjuste] = React.useState(false);

  /** Total pour l'offre Agence, à `n` personnes, dans la périodicité courante. */
  const totalAgence = (n) => {
    const t = annuel ? TARIFS.agence.an : TARIFS.agence.mois;
    return t.premiere + t.suivante * Math.max(0, n - 1);
  };
  /** Ce que le visiteur paie chaque mois, quelle que soit la périodicité. */
  const parMois = (totalPeriode) => Math.round(totalPeriode / (annuel ? 12 : 1));

  const OFFRES = [
    {
      cle: "decouverte",
      palier: null,                   // gratuite : aucun paiement
      nom: Txt("tarifs.offre-decouverte", "Découverte", "Discovery"),
      resume: Txt("tarifs.decouverte-resume", "Pour voir ce que ça donne sur un vrai projet.", "To see what it does on a real project."),
      court: Txt("tarifs.decouverte-court", "1 projet · 1 personne", "1 project · 1 person"),
      quantites: [
        Txt("tarifs.decouverte-q1", "1 projet, offert à vie", "1 project, free for ever"),
        Txt("tarifs.decouverte-q2", "1 personne", "1 person"),
        Txt("tarifs.decouverte-q3", "Léo : 10 lectures de documents et 300 questions par mois", "Léo: 10 document readings and 300 questions per month"),
      ],
      lectures: 10,
    },
    {
      cle: "atelier",
      palier: 50,
      nom: Txt("tarifs.offre-atelier", "Atelier", "Studio"),
      resume: Txt("tarifs.atelier-resume", "Pour un architecte qui mène plusieurs affaires de front.", "For an architect running several jobs at once."),
      court: Txt("tarifs.atelier-court", "5 projets de front · 1 personne", "5 live projects · 1 person"),
      quantites: [
        Txt("tarifs.atelier-q1", "5 projets menés de front, archives illimitées", "5 live projects, unlimited archives"),
        Txt("tarifs.atelier-q2", "1 personne", "1 person"),
        Txt("tarifs.atelier-q3", "Léo : 50 lectures et 1 500 questions par mois", "Léo: 50 readings and 1,500 questions per month"),
      ],
      lectures: 50,
    },
    {
      cle: "agence",
      palier: 150,
      degressive: true,
      nom: Txt("tarifs.offre-agence", "Agence", "Practice"),
      resume: Txt("tarifs.agence-resume", "Pour une équipe, jusqu'à quatre personnes.", "For a team, up to four people."),
      court: Txt("tarifs.agence-court", "Projets illimités · jusqu'à 4 personnes", "Unlimited projects · up to 4 people"),
      quantites: [
        Txt("tarifs.agence-q1", "Projets illimités", "Unlimited projects"),
        Txt("tarifs.agence-q2", "Jusqu'à 4 personnes", "Up to 4 people"),
        Txt("tarifs.agence-q3", "Léo : 200 lectures et 5 000 questions par mois", "Léo: 200 readings and 5,000 questions per month"),
      ],
      lectures: 200,
    },
  ];

  /* 1 personne et 1 projet : Découverte, qui est gratuite. On la propose
     d'abord — envoyer quelqu'un payer 49 € pour un usage que l'offre gratuite
     couvre entièrement serait se tirer une balle dans le pied. */
  const recommandee = (personnes === 1 && projets === 1) ? OFFRES[0]
                    : (personnes === 1 && projets <= 5) ? OFFRES[1]
                    : OFFRES[2];
  const offre = (choix && OFFRES.find((o) => o.cle === choix)) || recommandee;
  /* Une offre choisie à la main EN DESSOUS de la recommandation ne couvre pas
     les réponses données : on le dit, sans l'interdire. */
  const sousDimensionnee = OFFRES.indexOf(offre) < OFFRES.indexOf(recommandee);

  /* Répondre à une question rend la main à la recommandation. */
  const repondre = (poser) => (v) => { poser(v); setChoix(null); };

  /** Ce que coûte une offre donnée, pour le nombre de personnes courant. */
  const coutDe = (o) => {
    if (!o.palier) return { periode: 0, mois: 0 };
    const p = o.degressive ? totalAgence(personnes) : (annuel ? TARIFS.atelier.an : TARIFS.atelier.mois);
    return { periode: p, mois: parMois(p) };
  };
  const cout = coutDe(offre);

  /* ── L'ESTIMATION DE TEMPS ────────────────────────────────────────────────
     Quatre documents par mois par défaut, et non vingt. Vingt, c'était un CCTP
     par jour ouvré — un usage qu'aucun architecte seul ne reconnaîtra — et le
     résultat affichait 1 500 € de gain, trente fois le prix de l'offre. Un
     chiffre auquel personne ne croit ne convainc pas : il jette le doute sur
     tout le reste de la page.
     Quatre documents donnent 300 €, six fois le prix d'Atelier. C'est crédible,
     et ça reste très parlant. */
  const [taux, setTaux] = React.useState(75);
  const [docs, setDocs] = React.useState(4);
  const [heuresParDoc, setHeuresParDoc] = React.useState(1);
  const heuresGagnees = docs * heuresParDoc;
  const valeurGagnee = Math.round(heuresGagnees * taux);
  const depasseLectures = docs > offre.lectures;
  /* « soit 6 × votre abonnement » : c'est LA phrase. Elle n'est dite que quand
     elle est forte — en dessous de 2, un « 1,6 × » affaiblit plus qu'il
     n'appuie, et on laisse le montant parler seul. Entier au-delà de 3, une
     décimale entre 2 et 3 : « 6 × », « 2,4 × ». */
  const ratio = cout.mois > 0 ? valeurGagnee / cout.mois : null;
  const ratioTexte = ratio === null || ratio < 2 ? null
    : ratio >= 3 ? String(Math.round(ratio))
    : (Math.round(ratio * 10) / 10).toLocaleString(window.__albaLang === "en" ? "en-GB" : "fr-FR");

  const SIGNUP = (typeof window !== "undefined" && window.ALBA_APP_ORIGIN
    ? window.ALBA_APP_ORIGIN : "https://app.alba-studio.co") + "/inscription";

  /* ── PAIEMENT ─────────────────────────────────────────────────────────────
     On envoie un PALIER, jamais un prix : les identifiants de tarif sont
     résolus côté serveur. Quelqu'un qui bricole la requête obtient au pire une
     autre offre, jamais un autre montant.
     Aucune authentification : le visiteur n'a pas de compte, c'est le principe
     même de ce parcours. Aucune case CGU non plus — le consentement est
     recueilli dans le tunnel Stripe, deux écrans plus loin. Le demander ici
     serait un second consentement au mauvais endroit. */
  const POINT_PAIEMENT = "https://fhrkkjvbzgkbmlnlnxce.supabase.co/functions/v1/creer-paiement-public";
  const [paiement, setPaiement] = React.useState("repos");
  const [erreurPaiement, setErreurPaiement] = React.useState(null);
  /* Verrou de double-clic. Il ne peut PAS reposer sur `paiement` : React ne
     rafraîchit l'état qu'au rendu suivant, si bien que trois clics rapides
     lisent tous « repos » et partent tous les trois. Une référence, elle,
     change à l'instant même. */
  const ouvertureEnCours = React.useRef(false);

  const indisponible = L("Le paiement est momentanément indisponible. Réessayez dans quelques minutes.",
                         "Payment is temporarily unavailable. Please try again in a few minutes.");
  const ecrivezNous = L("Le paiement n'a pas pu s'ouvrir. Ce n'est pas de votre fait : écrivez-nous et on vous ouvre l'accès.",
                        "Checkout could not open. It's not your doing: write to us and we'll open access for you.");
  /* Deux familles de messages : ce qui vient du visiteur ou d'un incident
     passager invite à réessayer ; ce qui vient de NOUS invite à écrire, parce
     qu'envoyer quelqu'un s'acharner sur un bouton cassé n'a rien réparé. */
  const MESSAGES = {
    trop_de_tentatives: L("Trop de tentatives, réessayez dans un moment.", "Too many attempts, please try again shortly."),
    tarif_indisponible: indisponible,
    cgu_non_configurees: indisponible,
    paiement_indisponible: indisponible,
    erreur_interne: ecrivezNous,
    methode_non_autorisee: ecrivezNous,
  };

  /**
   * @param {object} offre  l'offre choisie ; `palier` null = gratuite
   * @param {number} sieges nombre TOTAL de personnes, première incluse
   */
  const abonner = (offre, sieges) => async (ev) => {
    /* Interrupteur de config.js. Tant qu'il est fermé, on ne touche à rien : le
       clic suit le href, c'est-à-dire l'inscription classique. AUCUN
       preventDefault avant ce test, sinon un interrupteur fermé rendrait le
       bouton inerte au lieu de le faire retomber sur l'ancien chemin. */
    if (typeof window === "undefined" || !window.ALBA_PAIEMENT_DIRECT) return;
    if (!offre.palier) return;            // Découverte : le lien suit son href
    ev.preventDefault();
    if (ouvertureEnCours.current) return;
    ouvertureEnCours.current = true;
    setPaiement("envoi");
    setErreurPaiement(null);
    try {
      const reponse = await fetch(POINT_PAIEMENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storage: offre.palier,
          billing: annuel ? "yearly" : "monthly",
          seats: sieges,
        }),
      });
      const donnees = await reponse.json().catch(() => null);
      if (reponse.ok && donnees && donnees.url) { window.location.href = donnees.url; return; }
      /* Ces deux codes sont des défauts de CETTE page, pas du visiteur : le
         journal doit les nommer, l'écran ne doit pas les étaler. Un architecte
         n'a pas à lire nos bogues. */
      const notre = { palier_inconnu: `palier refusé par le serveur : ${offre.palier}`,
                      methode_non_autorisee: "le serveur a reçu autre chose qu'un POST" };
      if (donnees && notre[donnees.error]) {
        console.error(`[paiement] défaut de la page — ${notre[donnees.error]}`);
      }
      setErreurPaiement((donnees && MESSAGES[donnees.error]) ||
        L("Le paiement n'a pas pu s'ouvrir. Réessayez.", "Checkout could not open. Please try again."));
      setPaiement("erreur");
      ouvertureEnCours.current = false;   // relâché sur échec seulement : un succès quitte la page
    } catch (e) {
      /* Un `fetch` qui LÈVE n'a jamais atteint le serveur : CSP, contrôle
         d'origine, ou réseau. Le navigateur rend le même « Failed to fetch »
         pour les trois, par principe. On ne prétend donc pas savoir : on
         n'accuse la connexion QUE si le navigateur confirme être hors ligne. */
      const horsLigne = typeof navigator !== "undefined" && navigator.onLine === false;
      console.error("[paiement] la requête n'a pas abouti —",
                    horsLigne ? "navigateur hors ligne"
                              : "refus avant le serveur : CSP (connect-src), contrôle d'origine, ou réseau", e);
      setErreurPaiement(horsLigne
        ? L("Vous semblez hors ligne. Le paiement s'ouvrira dès que la connexion revient.",
            "You appear to be offline. Checkout will open as soon as you're back online.")
        : ecrivezNous);
      setPaiement("erreur");
      ouvertureEnCours.current = false;
    }
  };

  const euros = (n) => new Intl.NumberFormat(window.__albaLang === "en" ? "en-GB" : "fr-FR").format(n);

  const sieges = offre.degressive ? personnes : 1;
  const gratuite = !offre.palier;
  const grille = annuel ? TARIFS.agence.an : TARIFS.agence.mois;
  const unite = Txt("tarifs.ht-mois-court", "HT / mois", "excl. VAT / month");

  /** Prix d'une tuile du rail, dans la périodicité courante. */
  const prixTuile = (o) => {
    if (!o.palier) return Txt("tarifs.gratuit", "Gratuit", "Free");
    const base = o.degressive ? grille.premiere : (annuel ? TARIFS.atelier.an : TARIFS.atelier.mois);
    return `${o.degressive ? Txt("tarifs.des", "dès", "from") + " " : ""}${euros(parMois(base))} €`;
  };

  return (
    <section className="section section-dark" id="pricing">
      <div className="container">
        <Reveal className="s-head">
          <span className="eyebrow">{Txt("tarifs.eyebrow", "Tarifs", "Pricing")}</span>
          <h2 className="display">
            {Txt("tarifs.titre-1", "Deux questions,", "Two questions,")}{" "}
            <em>{Txt("tarifs.titre-2", "un prix.", "one price.")}</em>
          </h2>
          <p className="s-sub">
            {Txt("tarifs.sous-titre",
              "On ne facture ni des options ni des modules : seulement le nombre de projets que vous menez de front et le nombre de personnes qui travaillent dans ALBA.",
              "We charge neither for add-ons nor for modules: only for the number of projects you run at once and the number of people working in ALBA.")}
          </p>
        </Reveal>

        {/* ── LE CONFIGURATEUR : la question à gauche, la réponse à droite ── */}
        <Reveal className="conf">
          <div className="conf-questions">
            <div className="calc-champ">
              <label htmlFor="calc-personnes" className="conf-question">
                {Txt("tarifs.calc-personnes", "Combien êtes-vous dans l'agence ?", "How many of you are in the practice?")}
              </label>
              <div className="calc-boutons" role="group">
                {Array.from({ length: TARIFS.maxPersonnes }, (_, i) => i + 1).map((n) => (
                  <button key={n} type="button" id={n === 1 ? "calc-personnes" : undefined}
                          className={`calc-bouton${personnes === n ? " est-actif" : ""}`}
                          aria-pressed={personnes === n ? "true" : "false"}
                          onClick={() => repondre(setPersonnes)(n)}>{n}</button>
                ))}
              </div>
              {/* La question qui revient le plus : « et mes clients, mes BET ? ».
                  On y répond ici, avant qu'elle ne soit posée. */}
              <p className="calc-note">
                {Txt("tarifs.invites-note",
                  "Vos clients, bureaux d'études et entreprises ne sont pas facturés : vous les invitez gratuitement, sans limite, sur toutes les offres.",
                  "Your clients, engineers and contractors are not billed: you invite them for free, without limit, on every plan.")}
              </p>
            </div>

            <div className="calc-champ">
              <label htmlFor="calc-projets" className="conf-question">
                {Txt("tarifs.calc-projets", "Combien de projets menez-vous de front ?", "How many projects do you run at once?")}
                <b>{projets}</b>
              </label>
              <input id="calc-projets" type="range" min="1" max="30" value={projets}
                     style={{ "--part": `${((projets - 1) / 29) * 100}%` }}
                     onChange={(e) => repondre(setProjets)(Number(e.target.value))}/>
              <p className="calc-note">
                {Txt("tarifs.calc-projets-note",
                  "Projets en cours, pas projets archivés : archiver un projet terminé libère une place, et vous gardez l'accès à tout ce que vous avez fait.",
                  "Live projects, not archived ones: archiving a finished project frees a slot, and you keep access to everything you have done.")}
              </p>
            </div>

            <div className="tarif-regle">
              <Icon name="check" size={18}/>
              <p>
                <b>{Txt("tarifs.regle-titre", "Toutes les fonctionnalités, dans toutes les offres.", "Every feature, in every plan.")}</b>{" "}
                {Txt("tarifs.regle-corps",
                  "Dès le premier euro, et y compris dans l'offre gratuite. Aucune fonction n'est réservée à un palier supérieur : nous ne bornons que des quantités.",
                  "From the first euro, including in the free plan. No feature is reserved for a higher tier: we cap quantities only.")}
              </p>
            </div>
          </div>

          <div className="conf-reponse" aria-live="polite">
            <div className="conf-entete">
              <span className="conf-etiquette">{Txt("tarifs.votre-offre", "Votre offre", "Your plan")}</span>
              {/* La bascule est collée au prix, là où elle compte. Isolée au-dessus
                  des cartes, personne ne la voyait. */}
              <div className="tarif-bascule" role="group" aria-label={Txt("tarifs.periodicite", "Périodicité", "Billing period")}>
                <button type="button" className={`tarif-bascule-btn${annuel ? "" : " est-actif"}`}
                        aria-pressed={annuel ? "false" : "true"} onClick={() => setAnnuel(false)}>
                  {Txt("tarifs.mensuel", "Mensuel", "Monthly")}
                </button>
                <button type="button" className={`tarif-bascule-btn${annuel ? " est-actif" : ""}`}
                        aria-pressed={annuel ? "true" : "false"} onClick={() => setAnnuel(true)}>
                  {Txt("tarifs.annuel", "Annuel", "Yearly")}
                  <span className="tarif-remise">{Txt("tarifs.remise-annuelle", "jusqu'à −18 %", "up to −18%")}</span>
                </button>
              </div>
            </div>

            <h3 className="conf-nom">{offre.nom}</h3>
            <p className="conf-resume">{offre.resume}</p>

            {/* Le grand chiffre. C'est le TOTAL pour les réponses données — pas
                un prix d'entrée : « 108 € » pour deux personnes, et l'addition
                juste dessous. Un total dégressif qu'on ne peut pas refaire de
                tête ressemble à une erreur. */}
            <div className="conf-prix" key={`${offre.cle}-${cout.mois}`}>
              {gratuite
                ? <span className="conf-montant">{Txt("tarifs.gratuit", "Gratuit", "Free")}</span>
                : <>
                    <span className="conf-montant">{euros(cout.mois)} €</span>
                    <span className="conf-unite">{unite}</span>
                  </>}
            </div>
            {!gratuite && (annuel || (offre.degressive && personnes > 1)) && (
              <p className="conf-detail">
                {annuel && L(`facturé ${euros(cout.periode)} € HT par an`, `billed €${euros(cout.periode)} excl. VAT per year`)}
                {annuel && offre.degressive && personnes > 1 && " · "}
                {offre.degressive && personnes > 1 && L(
                  `${euros(grille.premiere)} € + ${personnes - 1} × ${euros(grille.suivante)} €`,
                  `€${euros(grille.premiere)} + ${personnes - 1} × €${euros(grille.suivante)}`)}
              </p>
            )}

            <ul className="conf-quantites">
              {offre.quantites.map((q, i) => (
                <li key={i}><Icon name="check" size={13}/><span>{q}</span></li>
              ))}
              <li className="tarif-tout"><Icon name="check" size={13}/><span>{Txt("tarifs.toutes-fonctionnalites", "Toutes les fonctionnalités", "Every feature")}</span><ToutesFonctionnalites/></li>
            </ul>

            {gratuite ? (
              <a href={SIGNUP} className="btn btn-ghost tarif-cta">
                {Txt("tarifs.commencer-gratuitement", "Commencer gratuitement", "Start for free")}
              </a>
            ) : (
              <a href={SIGNUP} className="btn btn-primary tarif-cta"
                 onClick={abonner(offre, sieges)}
                 aria-busy={paiement === "envoi" ? "true" : "false"}>
                {paiement === "envoi"
                  ? Txt("tarifs.ouverture", "Ouverture…", "Opening…")
                  : Txt("tarifs.s-abonner", "S'abonner", "Subscribe")}
              </a>
            )}

            {sousDimensionnee && (
              <p className="calc-note conf-alerte">
                {L(`Avec vos réponses, l'offre ${recommandee.nom} conviendrait mieux.`,
                   `Given your answers, the ${recommandee.nom} plan would be a better fit.`)}
              </p>
            )}
            {offre.cle === "decouverte" && !sousDimensionnee && (
              <p className="calc-note">
                {Txt("tarifs.calc-decouverte",
                  "Un seul projet à la fois vous suffit : l'offre gratuite le couvre entièrement, sans limite de durée et sans carte bancaire.",
                  "One project at a time is enough for you: the free plan covers it entirely, with no time limit and no payment card.")}
              </p>
            )}

            {/* ── L'ARGUMENT, EN UNE LIGNE, EN FACE DU PRIX ─────────────────
                La comparaison entre ce que ça coûte et ce que ça rend est tout
                l'argument. Elle se fait ici dans l'œil, sans mémoire. */}
            <div className="conf-leo">
              <div className="conf-leo-ligne">
                <span className="calc-montant-gain">≈ {euros(valeurGagnee)} €</span>
                <span className="conf-leo-texte">
                  {Txt("tarifs.leo-gagne", "de temps gagné par mois grâce à Léo", "of time saved each month thanks to Léo")}
                  {ratioTexte && <>, {L("soit", "that is")} <b>{ratioTexte} × {Txt("tarifs.votre-abonnement", "votre abonnement", "your subscription")}</b></>}.{" "}
                  <button type="button" className="calc-ajuster" aria-expanded={ajuste ? "true" : "false"}
                          onClick={() => setAjuste(!ajuste)}>
                    {ajuste ? Txt("tarifs.masquer", "Masquer", "Hide")
                            : Txt("tarifs.ajuster", "Ajuster l'estimation", "Adjust the estimate")}
                  </button>
                </span>
              </div>

              {ajuste && (
                <div className="conf-leo-reglages">
                  <p className="calc-chapo">
                    {Txt("tarifs.temps-chapo",
                      "Léo lit vos pièces écrites — CCTP, descriptifs, DPGF — et en sort les prescriptions, les matériaux, les prix et les intervenants.",
                      "Léo reads your written documents — specifications, schedules of works, bills of quantities — and extracts requirements, materials, prices and parties.")}
                  </p>
                  <div className="calc-champ">
                    <label htmlFor="calc-docs">
                      {Txt("tarifs.temps-docs", "Documents confiés à Léo par mois", "Documents given to Léo each month")}
                      <b>{docs}</b>
                    </label>
                    <input id="calc-docs" type="range" min="1" max="20" value={docs}
                           style={{ "--part": `${((docs - 1) / 19) * 100}%` }}
                           onChange={(e) => setDocs(Number(e.target.value))}/>
                  </div>
                  <div className="calc-champ">
                    <label htmlFor="calc-taux">
                      {Txt("tarifs.temps-taux", "Votre taux horaire", "Your hourly rate")}
                      <b>{taux} €</b>
                    </label>
                    <input id="calc-taux" type="range" min="50" max="140" step="5" value={taux}
                           style={{ "--part": `${((taux - 50) / 90) * 100}%` }}
                           onChange={(e) => setTaux(Number(e.target.value))}/>
                  </div>
                  <div className="calc-champ">
                    <label htmlFor="calc-heures">
                      {Txt("tarifs.temps-heures", "Temps de dépouillement par document", "Time spent going through one document")}
                      <b>{heuresParDoc} h</b>
                    </label>
                    <input id="calc-heures" type="range" min="0.25" max="4" step="0.25" value={heuresParDoc}
                           style={{ "--part": `${((heuresParDoc - 0.25) / 3.75) * 100}%` }}
                           onChange={(e) => setHeuresParDoc(Number(e.target.value))}/>
                    {/* Cette phrase est la raison pour laquelle l'encart est
                        honnête. Sans elle, un chiffre réglable redevient une
                        affirmation. */}
                    <p className="calc-note">
                      {Txt("tarifs.temps-hypothese",
                        "C'est une hypothèse, pas une mesure : nous n'avons pas relevé ce chiffre chez nos clients. Réglez-le sur ce que vous constatez.",
                        "This is an assumption, not a measurement: we have not recorded this figure with our clients. Set it to what you observe.")}
                    </p>
                  </div>
                  <div className="calc-operation">
                    {L(`${docs} documents × ${heuresParDoc} h × ${taux} € = ${euros(heuresGagnees)} h par mois`,
                       `${docs} documents × ${heuresParDoc} h × €${taux} = ${euros(heuresGagnees)} h per month`)}
                  </div>
                  {depasseLectures && (
                    <p className="calc-note">
                      {L(`L'offre ${offre.nom} couvre ${offre.lectures} lectures par mois.`,
                         `The ${offre.nom} plan covers ${offre.lectures} readings per month.`)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* La mention n'est pas une formalité : c'est elle qui distingue une
                estimation d'une promesse. Toujours visible, pas seulement quand
                les curseurs sont dépliés. */}
            <div className="calc-mentions">{Txt("tarifs.mentions", "Montants HT · Estimation indicative", "Amounts excl. VAT · Indicative estimate")}</div>
          </div>
        </Reveal>

        {erreurPaiement && (
          <div className="pricing-erreur" role="alert">
            {erreurPaiement}{" "}
            <a href={`${(typeof window !== "undefined" && window.location.pathname === "/") ? "" : "index.html"}#contact`}>
              {Txt("tarifs.nous-ecrire", "Nous écrire", "Write to us")}
            </a>
          </div>
        )}

        {/* ── LES TROIS OFFRES, EN RAIL ─────────────────────────────────────
            On voit le paysage sans devoir choisir entre trois égaux. Une tuile
            se clique : elle devient l'offre affichée, jusqu'à la prochaine
            réponse. */}
        <Reveal className="conf-rail">
          <div className="conf-rail-titre">{Txt("tarifs.rail-titre", "Les trois offres · cliquez pour comparer", "The three plans · click to compare")}</div>
          <div className="conf-tuiles">
            {OFFRES.map((o) => (
              <button key={o.cle} type="button"
                      className={`conf-tuile${o.cle === offre.cle ? " est-active" : ""}`}
                      aria-pressed={o.cle === offre.cle ? "true" : "false"}
                      onClick={() => setChoix(o.cle)}>
                <span className="conf-tuile-tete">
                  <span className="tarif-nom">{o.nom}</span>
                  <span className="conf-tuile-prix">{prixTuile(o)}{o.palier ? <small> / {Txt("tarifs.mois", "mois", "month")}</small> : null}</span>
                </span>
                <span className="conf-tuile-court">
                  {o.court}
                  {o.degressive && L(` · puis ${euros(grille.suivante)} € par personne${annuel ? " et par an" : ""}`,
                                     ` · then €${euros(grille.suivante)} per person${annuel ? " per year" : ""}`)}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="tarif-porte">
          <a href={SIGNUP}>{Txt("tarifs.porte", "Créer un compte gratuit", "Create a free account")}</a>
        </div>
      </div>
    </section>
  );
};

/* TRUST BAND — sécurité & données */
const TrustBand = () => {
  const items = [
    { icon: "globe", t: Txt("securite.heberge-en-france", "Hébergé en France", "Hosted in France"), d: Txt("securite.vos-donnees-sont-stockees-en-france", "Vos données sont hébergées en France, chez un hébergeur certifié ISO 27001. Les sauvegardes chiffrées restent dans l'Union européenne.", "Your data is hosted in France with an ISO 27001-certified host. Encrypted backups stay within the European Union.") },
    { icon: "lock", t: Txt("securite.chiffre-sauvegarde", "Chiffré, sauvegardé", "Encrypted, backed up"), d: Txt("securite.chiffrement-aes-256-au-repos-tls", "Chiffrement au repos et en transit. Sauvegardes automatiques, conservées dans l'Union européenne.", "Encrypted at rest and in transit. Automatic backups, kept within the European Union.") },
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
    { q: Txt("faq.que-comprend-le-projet-gratuit", "Que comprend le projet gratuit ?", "What does the free project include?"), a: Txt("faq.un-projet-complet-sans-limite-de", "Un projet complet pour commencer : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.", "One complete project to get started: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You move to the Studio plan when you create your second project, and everything you've built stays in place.") },
    { q: Txt("faq.comment-alba-s-integre-a-ma", "Comment ALBA s'intègre à ma méthode actuelle ?", "How does ALBA fit my current workflow?"), a: Txt("faq.alba-s-adapte-a-votre-process", "ALBA s'adapte à votre process, pas l'inverse. Vous configurez les phases (esquisse, APS, APD, permis, DCE, chantier), nous gérons les rappels, les jalons et la mémoire du projet. Aucune formation longue : la plupart des architectes sont opérationnels en moins d'une heure.", "ALBA adapts to your process, not the other way round. You configure the phases (concept, design, permits, tender, construction); we handle reminders, milestones and the project's memory. No lengthy training: most architects are up and running in under an hour.") },
    { q: Txt("faq.mes-clients-doivent-ils-telecharger-une", "Mes clients doivent-ils télécharger une application ?", "Do my clients need to download an app?"), a: Txt("faq.non-alba-fonctionne-entierement-dans-le", "Non. ALBA fonctionne entièrement dans le navigateur, sur ordinateur comme sur téléphone. Un lien, un mot de passe, vos maîtres d'ouvrage accèdent à leur cockpit en 30 secondes.", "No. ALBA runs entirely in the browser, on desktop and phone. A link, a password, your clients reach their cockpit in 30 seconds.") },
    { q: Txt("faq.que-se-passe-t-il-pour", "Que se passe-t-il pour mes données si j'arrête ?", "What happens to my data if I leave?"), a: Txt("faq.elles-sont-a-vous-a-tout", "Elles sont à vous. À tout moment, vous exportez l'intégralité de vos projets (PDF, ZIP, CSV) en un clic. Vos archives papier-numérique restent lisibles 10 ans après.", "It's yours. At any time, export all your projects (PDF, ZIP, CSV) in one click. Your digital archives remain readable 10 years on.") },
    { q: Txt("faq.les-decisions-sont-elles-juridiquement-valab", "Les décisions sont-elles juridiquement valables ?", "Are decisions legally valid?"), a: Txt("faq.chaque-decision-est-horodatee-archivee-et", "Chaque décision est horodatée, archivée et signée électroniquement (eIDAS, niveau simple) : l'auteur, la date et l'horodatage serveur sont conservés à titre de preuve. Pour un acte qui exige une signature avancée ou qualifiée, passez par votre voie habituelle.", "Every decision is timestamped, archived and electronically signed (eIDAS, simple level): the author, date and server timestamp are kept as evidence. For a document requiring an advanced or qualified signature, use your usual channel.") },
    { q: Txt("faq.puis-je-inviter-mon-bet-et", "Puis-je inviter mon BET et mes co-traitants ?", "Can I invite my engineers and consultants?"), a: Txt("faq.bien-sur-les-co-traitants-accedent", "Bien sûr. Les co-traitants accèdent gratuitement aux projets sur lesquels vous les invitez, avec le niveau de droits que vous définissez (lecture, commentaire, dépôt de pièces).", "Of course. Consultants get free access to the projects you invite them to, with the permission level you set (view, comment, upload).") },
    { q: Txt("faq.combien-de-collaborateurs-de-mon-agence", "Combien de collaborateurs de mon agence sont inclus ?", "How many team members are included?"), a: Txt("faq.le-tarif-studio-inclut-1-collaborateur", "Les offres Découverte et Atelier couvrent une personne. L'offre Agence se facture 69 € HT par mois et par personne, jusqu'à quatre. Vos clients et vos co-traitants, eux, restent illimités et gratuits : ils ne comptent dans aucune offre.", "The Discovery and Studio plans cover one person. The Practice plan is billed at €69 excl. VAT per month per person, up to four. Your clients and consultants remain unlimited and free: they count towards no plan.") },
    { q: Txt("faq.et-pendant-le-chantier", "Et pendant le chantier ?", "What about the construction phase?"), a: Txt("faq.alba-vous-suit-sur-site-comptes", "ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.", "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.") },
    { q: Txt("faq.quels-formats-de-fichiers-puis-je", "Quels formats de fichiers puis-je partager ?", "What file formats can I share?"), a: Txt("faq.tous-pdf-dwg-ifc-images-videos", "Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 100 Mo par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.", "All of them — PDF, DWG, IFC, images, videos, up to 100 MB per file. PDF plans and images open right in the browser: your clients don't need any software.") },
    { q: Txt("faq.ou-sont-hebergees-mes-donnees", "Où sont hébergées mes données ?", "Where is my data hosted?"), a: Txt("faq.en-france-chez-un-hebergeur-certifie", "En France, chez un hébergeur certifié ISO 27001 : base de données, fichiers et comptes. Chiffrement au repos et en transit. Les sauvegardes chiffrées sont conservées dans l'Union européenne.", "In France, with an ISO 27001-certified host: database, files and accounts. Encrypted at rest and in transit. Encrypted backups are kept within the European Union.") },
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
              <a href={SIGNUP_URL} className="fl-link">{Txt("contact.ou-creez-directement-votre-compte-gratuit", "Ou créez directement votre compte →", "Or create your free account right away →")}</a>
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
              {/* MENTION D'INFORMATION AU POINT DE COLLECTE — art. 13 du RGPD.
                  Elle disait « RGPD-compliant », ce qui n'est pas une mention
                  d'information : c'est une auto-proclamation, et elle ne vaut
                  rien juridiquement. Le règlement veut, AU MOMENT où l'on
                  saisit ses données, quatre choses lisibles : qui est
                  responsable, pour quoi faire, combien de temps, et où lire le
                  reste. C'est court à écrire et ça ne se devine pas. */}
              <p className="form-note">{Txt("contact.mention-collecte", "Vos coordonnées sont traitées par ANCA dans le seul but de vous rappeler pour cette démonstration, et conservées 12 mois. Vous pouvez y accéder, les corriger ou les supprimer en écrivant à support@alba-studio.co.", "Your details are processed by ANCA for the sole purpose of calling you back about this demo, and kept for 12 months. You can access, correct or delete them by writing to support@alba-studio.co.")} <a href={lienInterne("/mentions-legales")}>{Txt("contact.mention-collecte-lien", "Mentions légales", "Legal notice")}</a></p>
              <button type="submit" className="btn btn-primary" disabled={envoi === "envoi"}>{envoi === "envoi" ? Txt("contact.envoi-en-cours", "Envoi…", "Sending…") : Txt("contact.demander-une-demo-2", "Demander une démo", "Request a demo")} <Icon name="arrow-right" size={14} className="btn-arrow"/></button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

/* FOOTER */

/* Le pied de page est monté sur les TROIS pages, avec le même code. Ses ancres
   internes (#faq, #contact, #securite…) étaient donc mortes partout sauf sur
   l'accueil : sur /tarifs et sur les mentions légales, on cliquait « Sécurité »
   et il ne se passait rien, sans le moindre signal.
 *
 * Ce n'est pas un oubli qu'on répare une fois : le même piège reviendra au
 * prochain lien ajouté au pied de page. D'où cette fonction plutôt que trois
 * corrections — toute ancre du pied de page passe par elle.
 *
 * Sur l'accueil elle rend le fragment nu, ce qui préserve le défilement doux ;
 * ailleurs elle préfixe index.html, ce qui provoque une vraie navigation puis
 * un saut à l'ancre. C'est évalué au rendu, donc le HTML prérendu de chaque
 * page porte déjà la bonne forme. */
const versAccueil = (fragment) => {
  if (typeof window === "undefined") return `index.html${fragment}`;
  const chemin = window.location.pathname;
  /* L'accueil anglais est un accueil : depuis /en, une ancre du pied de page
     doit défiler dans la page, pas renvoyer vers l'accueil français. Sans ce
     cas, un anglophone qui clique « About » se retrouvait en français. */
  const surAccueilEn = chemin === "/en" || chemin === "/en.html";
  const surAccueil = chemin === "/" || /\/index\.html$/.test(chemin) || surAccueilEn;
  if (surAccueil) return fragment;
  /* Depuis une page anglaise qui n'est pas l'accueil, on renvoie vers
     l'accueil ANGLAIS. `__albaLien` connaît les jumelles ; il rend l'adresse
     française si la page n'en a pas, ce qui vaut mieux qu'un 404. */
  const accueil = (typeof window !== "undefined" && window.__albaLien)
    ? window.__albaLien("/")
    : "/";
  return `${accueil === "/" ? "index.html" : accueil}${fragment}`;
};

/** Adresse d'une page interne, dans la langue courante. */
const lienInterne = (cheminFr) =>
  (typeof window !== "undefined" && window.__albaLien) ? window.__albaLien(cheminFr) : cheminFr;

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
            <li><a href={versAccueil("#fonctionnalites")}>{Txt("pied.fonctionnalites", "Fonctionnalités", "Features")}</a></li>
            <li><a href={versAccueil("#devices")}>{Txt("pied.la-plateforme", "La plateforme", "The platform")}</a></li>
            <li><a href={lienInterne("/tarifs")}>{Txt("pied.tarifs", "Tarifs", "Pricing")}</a></li>
            <li><a href={versAccueil("#faq")}>FAQ</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>{Txt("pied.agence", "Agence", "Company")}</h5>
          <ul>
            {/* Ces trois entrées portaient href="#" : un fragment vide ne mène nulle
                part, et le gestionnaire d'ancres l'ignore — on cliquait, rien ne
                se passait. « À propos » et « Manifeste » ont chacun une section
                réelle sur l'accueil ; « Carrières » n'en a aucune, et lui
                inventer une destination serait pire que de la retirer.

                LES LIENS DE PAGE VISENT L'ADRESSE PROPRE, PAS LE FICHIER.
                Ils valaient « co-traitants.html ». Cloudflare Pages ne sert pas
                un fichier à son nom : il l'expose à son adresse sans extension
                et renvoie /co-traitants.html vers /co-traitants. Ce renvoi
                retombait sur la règle de réécriture de _redirects, qui repointait
                vers le fichier — et le visiteur recevait une erreur. En local
                rien n'y paraissait : le serveur de test servait le fichier tel
                quel, ce qu'aucun hébergeur ne fait.
                L'adresse propre est de toute façon la seule vraie : c'est elle
                qui figure en canonique dans chaque page et dans sitemap.xml. */}
            <li><a href="/valeur-probante">{Txt("pied.valeur-probante", "Valeur probante", "Evidential value")}</a></li>
            <li><a href="/co-traitants">{Txt("pied.co-traitants", "Co-traitants & BET", "Consultants & engineers")}</a></li>
            <li><a href={versAccueil("#fondateur")}>{Txt("pied.a-propos", "À propos", "About")}</a></li>
            <li><a href={versAccueil("#manifeste")}>{Txt("pied.manifeste", "Manifeste", "Manifesto")}</a></li>
            <li><a href={versAccueil("#contact")}>Contact</a></li>
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
            <li><a href="/mentions-legales">{Txt("pied.mentions-legales", "Mentions légales", "Legal notice")}</a></li>
            <li><a href={`${APP_ORIGIN}/terms`}>{Txt("pied.cgu-cgv", "CGU & CGV", "Terms & conditions")}</a></li>
            <li><a href={`${APP_ORIGIN}/privacy-policy`}>{Txt("pied.politique-rgpd", "Politique RGPD", "GDPR policy")}</a></li>
            <li><a href={versAccueil("#securite")}>{Txt("pied.securite", "Sécurité", "Security")}</a></li>
            {/* Retirer son consentement doit être aussi simple que le donner —
                c'est une exigence, pas une courtoisie. Ce lien n'apparaît que
                s'il y a effectivement un choix à revoir : tant qu'aucun traceur
                publicitaire n'est déclaré, une entrée « Cookies » qui ouvre un
                bandeau vide ne ferait qu'inquiéter. */}
            <LienConsentement/>
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
