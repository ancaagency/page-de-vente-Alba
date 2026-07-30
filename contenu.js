/* ═══════════════════════════════════════════════════════════════════════════
   TEXTES DE LA PAGE DE VENTE — c'est ici qu'on modifie la copie.

   Chaque entrée porte le texte français puis l'anglais. Modifiez ce qui est
   entre guillemets, gardez les guillemets et la virgule, enregistrez : Cloudflare
   redéploie tout seul en une trentaine de secondes.

   FILET DE SÉCURITÉ — ce fichier ne peut pas casser la page. Les textes
   d'origine restent inscrits dans le code comme valeurs de repli. Si une
   accolade manque, si une virgule saute, si une clé est mal écrite, la page
   affiche simplement le texte d'origine à cet endroit. Vous ne verrez jamais
   de page blanche à cause d'une faute de frappe ici.

   Pour vérifier avant de publier : cd tests && npm test

   Ce qui n'est PAS dans ce fichier, et pourquoi :
     · les libellés qui calculent un prix (« Vous économisez 108 € par an ») —
       ce sont des calculs, pas des textes ; ils vivent dans sections.jsx ;
     · les faux contenus des maquettes de l'application (agenda, matériaux,
       assistant, météo, messagerie) — ils font partie de la démonstration ;
     · les noms des agences du bandeau défilant (« Revol architecte »…), dans
       sections.jsx : ce sont des données de liste, pas de la copie.
   ═══════════════════════════════════════════════════════════════════════════ */
window.ALBA_CONTENU = {

  /* ——— Bandeau d'accueil ——— */
  "accueil.plateforme-pour-architectes-exigeants": {
    fr: "Plateforme pour architectes exigeants",
    en: "The platform for demanding architects",
  },
  "accueil.centralisez-vos-projets": {
    fr: "Centralisez vos projets.",
    en: "Centralize your projects.",
  },
  "accueil.simplifiez-vos": {
    fr: "Simplifiez vos ",
    en: "Simplify your ",
  },
  "accueil.echanges-clients": {
    fr: "échanges clients.",
    en: "client communication.",
  },
  "accueil.la-plateforme-pensee-pour-les-architectes": {
    fr: "La plateforme pensée pour les architectes indépendants : chaque décision, document et message vit au même endroit. Vos clients suivent. Vous gardez la main.",
    en: "The platform built for independent architects: every decision, document and message lives in one place. Your clients follow along. You stay in control.",
  },
  "accueil.creer-mon-projet-gratuit": {
    fr: "Créer mon projet gratuit",
    en: "Create my free project",
  },
  "accueil.demander-une-demo": {
    fr: "Demander une démo",
    en: "Request a demo",
  },
  "accueil.gratuit-a-vie-pour-1-projet": {
    fr: "Gratuit à vie pour 1 projet",
    en: "Free forever for 1 project",
  },
  "accueil.sans-engagement": {
    fr: "Sans engagement",
    en: "No commitment",
  },
  "accueil.setup-en-10-min": {
    fr: "Setup en 10 min",
    en: "10-min setup",
  },
  "accueil.decision-validee": {
    fr: "Décision validée",
    en: "Decision approved",
  },
  "accueil.verriere-sud-il-y-a-2": {
    fr: "Verrière sud · il y a 2 min",
    en: "South skylight · 2 min ago",
  },
  "accueil.nouveau-message": {
    fr: "Nouveau message",
    en: "New message",
  },
  "accueil.marie-a-maitre-d-ouvrage": {
    fr: "Marie A. · Maître d'ouvrage",
    en: "Marie A. · Client",
  },
  "accueil.avancement-global": {
    fr: "Avancement global",
    en: "Overall progress",
  },
  "accueil.phase-aps-grange-lissieu": {
    fr: "Phase APS · Grange Lissieu",
    en: "Design phase · Grange Lissieu",
  },
  "accueil.decouvrir": {
    fr: "Découvrir",
    en: "Discover",
  },

  /* ——— Bandeau d'appel à l'action ——— */
  "bandeau-cta.gratuit-a-vie-pour-1-projet": {
    fr: "Gratuit à vie pour 1 projet.",
    en: "Free forever for 1 project.",
  },
  "bandeau-cta.gerez-un-projet-complet-gratuitement-sans": {
    fr: "Gérez un projet complet gratuitement, sans carte bleue, sans limite de temps.",
    en: "Run one full project free, no credit card, no time limit.",
  },
  "bandeau-cta.creer-mon-projet-gratuit": {
    fr: "Créer mon projet gratuit",
    en: "Create my free project",
  },
  "bandeau-cta.voir-le-tarif": {
    fr: "Voir le tarif",
    en: "See pricing",
  },

  /* ——— Ce que vit une agence aujourd’hui ——— */
  "problemes.ce-que-vous-ne-ferez-plus": {
    fr: "Ce que vous ne ferez plus",
    en: "What you'll stop doing",
  },
  "problemes.tout-ce-dont-vous-avez-besoin": {
    fr: "Tout ce dont vous avez besoin, ",
    en: "Everything you need, ",
  },
  "problemes.rien-de-superflu": {
    fr: "rien de superflu.",
    en: "nothing you don't.",
  },
  "problemes.alba-remplace-les-drive-wetransfer-trello": {
    fr: "ALBA remplace les Drive, WeTransfer, Trello, Slack et boîtes mail éparpillées par un seul espace, conçu pour les agences d'architecture.",
    en: "ALBA replaces scattered Drives, WeTransfer, Trello, Slack and inboxes with one space, built for architecture practices.",
  },

  /* ——— Fonctionnalités ——— */
  "fonctionnalites.01-cockpit": {
    fr: "01 — Cockpit",
    en: "01 — Cockpit",
  },
  "fonctionnalites.une-vue-d-ensemble-qui-rassure": {
    fr: "Une vue d'ensemble qui rassure",
    en: "An overview that reassures",
  },
  "fonctionnalites.avancement-prochaines-echeances-decisions-en": {
    fr: "Avancement, prochaines échéances, décisions en attente. Vos clients savent où en est leur projet sans vous appeler.",
    en: "Progress, upcoming deadlines, pending decisions. Your clients know where their project stands without calling you.",
  },
  "fonctionnalites.02-decisions": {
    fr: "02 — Décisions",
    en: "02 — Decisions",
  },
  "fonctionnalites.validations-structurees-tracables": {
    fr: "Validations structurées, traçables",
    en: "Structured, traceable approvals",
  },
  "fonctionnalites.fini-le-j-ai-oublie-ce": {
    fr: "Fini le « j'ai oublié ce qu'on avait dit ». Chaque arbitrage est horodaté, signé et archivé. Plus de SAV un an plus tard.",
    en: "No more \\\"I forgot what we agreed on\\\". Every decision is timestamped, signed and archived. No disputes a year later.",
  },
  "fonctionnalites.03-chantier": {
    fr: "03 — Chantier",
    en: "03 — Site",
  },
  "fonctionnalites.le-chantier-suivi-les-reserves-levees": {
    fr: "Le chantier suivi, les réserves levées",
    en: "Site visits tracked, punch lists cleared",
  },
  "fonctionnalites.comptes-rendus-de-visite-reserves-photograph": {
    fr: "Comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises. Le chantier documenté, sans y passer vos dimanches.",
    en: "Visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors. The site documented, without losing your Sundays.",
  },
  "fonctionnalites.la-plateforme": {
    fr: "La plateforme",
    en: "The platform",
  },
  "fonctionnalites.une-suite-complete": {
    fr: "Une suite complète,",
    en: "A complete suite,",
  },
  "fonctionnalites.specialement-pensee-pour-vous": {
    fr: "spécialement pensée pour vous.",
    en: "designed specifically for you.",
  },

  /* ——— Carrousel de fonctionnalités ——— */
  "carrousel.assistant-leo": {
    fr: "Assistant Léo",
    en: "Léo assistant",
  },
  "carrousel.meteo-chantier": {
    fr: "Météo chantier",
    en: "Site weather",
  },
  "carrousel.bibliotheque-materiaux": {
    fr: "Bibliothèque matériaux",
    en: "Material library",
  },
  "carrousel.calendrier": {
    fr: "Calendrier",
    en: "Calendar",
  },
  "carrousel.messagerie": {
    fr: "Messagerie",
    en: "Messaging",
  },
  "carrousel.inedit": {
    fr: "INÉDIT",
    en: "UNIQUE",
  },
  "carrousel.precedent": {
    fr: "Précédent",
    en: "Previous",
  },
  "carrousel.suivant": {
    fr: "Suivant",
    en: "Next",
  },

  /* ——— Pour qui ? — les six profils ——— */
  "pour-qui.architectes-dplg-hmonp": {
    fr: "Architectes DPLG / HMONP",
    en: "Registered architects",
  },
  "pour-qui.liberal-petite-agence": {
    fr: "Libéral · Petite agence",
    en: "Solo · Small practice",
  },
  "pour-qui.alba-structure-votre-suivi-sans-imposer": {
    fr: "ALBA structure votre suivi sans imposer un workflow d'usine, vous gardez votre méthode, on automatise la coordination.",
    en: "ALBA structures your tracking without imposing a factory workflow, you keep your method, we automate the coordination.",
  },
  "pour-qui.liberal": {
    fr: "Libéral",
    en: "Independent",
  },
  "pour-qui.1-3-personnes": {
    fr: "1–3 personnes",
    en: "1–3 people",
  },
  "pour-qui.independants": {
    fr: "Indépendants",
    en: "Independents",
  },
  "pour-qui.1-a-3-projets": {
    fr: "1 à 3 projets",
    en: "1 to 3 projects",
  },
  "pour-qui.voir-la-demo-liberal": {
    fr: "Voir la démo libéral",
    en: "See the solo demo",
  },
  "pour-qui.agences-de-taille-moyenne": {
    fr: "Agences de taille moyenne",
    en: "Mid-size practices",
  },
  "pour-qui.5-a-20-collaborateurs": {
    fr: "5 à 20 collaborateurs",
    en: "5 to 20 people",
  },
  "pour-qui.vue-agence-multi-projets-droits-par": {
    fr: "Vue agence, multi-projets, droits par profil, orchestrer une équipe sans tout micro-manager, en gardant vos process.",
    en: "Practice view, multi-project, per-role permissions, run a team without micro-managing, keeping your processes.",
  },
  "pour-qui.5-20-pers": {
    fr: "5–20 pers.",
    en: "5–20 people",
  },
  "pour-qui.multi-projets": {
    fr: "Multi-projets",
    en: "Multi-project",
  },
  "pour-qui.agences": {
    fr: "Agences",
    en: "Practices",
  },
  "pour-qui.5-a-50-projets": {
    fr: "5 à 50 projets",
    en: "5 to 50 projects",
  },
  "pour-qui.voir-la-demo-agence": {
    fr: "Voir la démo agence",
    en: "See the practice demo",
  },
  "pour-qui.maitres-d-uvre": {
    fr: "Maîtres d'œuvre",
    en: "Project managers",
  },
  "pour-qui.coordination-validations": {
    fr: "Coordination & validations",
    en: "Coordination & approvals",
  },
  "pour-qui.vous-engagez-votre-responsabilite-alba-trace": {
    fr: "Vous engagez votre responsabilité. ALBA trace chaque arbitrage, archive chaque échange, sécurise vos garanties.",
    en: "Your liability is on the line. ALBA traces every decision, archives every exchange, secures your guarantees.",
  },
  "pour-qui.moe": {
    fr: "MOE",
    en: "PM",
  },
  "pour-qui.visa": {
    fr: "Visa",
    en: "Sign-off",
  },
  "pour-qui.moe-generaliste": {
    fr: "MOE généraliste",
    en: "General PM",
  },
  "pour-qui.pluri-disciplines": {
    fr: "Pluri-disciplines",
    en: "Multi-discipline",
  },
  "pour-qui.decouvrir": {
    fr: "Découvrir",
    en: "Learn more",
  },
  "pour-qui.bet-structure": {
    fr: "BET structure",
    en: "Structural engineers",
  },
  "pour-qui.beton-metal-bois": {
    fr: "Béton · Métal · Bois",
    en: "Concrete · Steel · Timber",
  },
  "pour-qui.gros-volumes-de-plans-exe-a": {
    fr: "Gros volumes de plans EXE à valider. Versions trackées, visa structuré, signatures numériques, vos plans ne se perdent plus dans une boîte mail.",
    en: "High volumes of shop drawings to approve. Tracked versions, structured sign-off, digital signatures, your drawings no longer get lost in an inbox.",
  },
  "pour-qui.beton": {
    fr: "Béton",
    en: "Concrete",
  },
  "pour-qui.metal": {
    fr: "Métal",
    en: "Steel",
  },
  "pour-qui.bois": {
    fr: "Bois",
    en: "Timber",
  },
  "pour-qui.bet-str": {
    fr: "BET STR",
    en: "Structural",
  },
  "pour-qui.plans-exe": {
    fr: "Plans EXE",
    en: "Shop drawings",
  },
  "pour-qui.decouvrir-2": {
    fr: "Découvrir",
    en: "Learn more",
  },
  "pour-qui.bet-fluides": {
    fr: "BET fluides",
    en: "MEP engineers",
  },
  "pour-qui.cvc-plomberie-electricite": {
    fr: "CVC · Plomberie · Électricité",
    en: "HVAC · Plumbing · Electrical",
  },
  "pour-qui.multi-lots-beaucoup-d-allers-retours": {
    fr: "Multi-lots, beaucoup d'allers-retours. Coordination par lot, visas séquencés, exports par corps d'état, pensé pour vos boucles courtes.",
    en: "Multiple trades, lots of back-and-forth. Per-trade coordination, sequenced sign-offs, per-package exports, built for your short loops.",
  },
  "pour-qui.cvc": {
    fr: "CVC",
    en: "HVAC",
  },
  "pour-qui.plomberie": {
    fr: "Plomberie",
    en: "Plumbing",
  },
  "pour-qui.electricite": {
    fr: "Électricité",
    en: "Electrical",
  },
  "pour-qui.bet-fluides-2": {
    fr: "BET fluides",
    en: "MEP",
  },
  "pour-qui.multi-lots": {
    fr: "Multi-lots",
    en: "Multi-trade",
  },
  "pour-qui.decouvrir-3": {
    fr: "Découvrir",
    en: "Learn more",
  },
  "pour-qui.pour-qui": {
    fr: "Pour qui ?",
    en: "Who is it for?",
  },
  "pour-qui.concu-pour-celles-et-ceux-qui": {
    fr: "Conçu pour celles et ceux qui ",
    en: "Built for the people who ",
  },
  "pour-qui.portent-la-responsabilite-du-projet": {
    fr: "portent la responsabilité du projet.",
    en: "carry the project's responsibility.",
  },
  "pour-qui.alba-s-adresse-aux-professionnels-de": {
    fr: "ALBA s'adresse aux professionnels de la maîtrise d'œuvre qui pilotent des projets à plusieurs voix, et qui ne peuvent plus se permettre de perdre du temps en coordination.",
    en: "ALBA is for design and engineering professionals who run projects with many voices, and can no longer afford to lose time on coordination.",
  },
  "pour-qui.en-savoir": {
    fr: "EN SAVOIR +",
    en: "LEARN MORE +",
  },

  /* ——— Bénéfices chiffrés ——— */
  "benefices.du-temps-repris": {
    fr: "Du temps repris",
    en: "Time reclaimed",
  },
  "benefices.moins-d-allers-retours-moins-de": {
    fr: "Moins d'allers-retours, moins de relances. Le temps gagné, vous le rendez à vos esquisses.",
    en: "Fewer back-and-forths, fewer follow-ups. The time you save goes back to your drawings.",
  },
  "benefices.6h": {
    fr: "6h",
    en: "6h",
  },
  "benefices.economisees-par-projet-et-par-mois": {
    fr: "économisées par projet et par mois",
    en: "saved per project, per month",
  },
  "benefices.de-la-serenite-juridique": {
    fr: "De la sérénité juridique",
    en: "Legal peace of mind",
  },
  "benefices.chaque-decision-archivee-signee-datee-six": {
    fr: "Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand.",
    en: "Every decision archived, signed, dated. Six months on, you can still see who decided what, and when.",
  },
  "benefices.des-arbitrages-traces": {
    fr: "des arbitrages tracés",
    en: "of decisions traced",
  },
  "benefices.des-clients-ravis": {
    fr: "Des clients ravis",
    en: "Delighted clients",
  },
  "benefices.vos-maitres-d-ouvrage-savent-a": {
    fr: "Vos maîtres d'ouvrage savent à tout moment où en est le projet, et ne vous rappellent plus à 21h.",
    en: "Your clients always know where the project stands, and stop calling you at 9pm.",
  },
  "benefices.satisfaction-maitre-d-ouvrage": {
    fr: "satisfaction maître d'ouvrage",
    en: "client satisfaction",
  },

  /* ——— Témoignages ——— */
  "temoignages.ce-qu-en-disent-les-precurseurs": {
    fr: "Ce qu'en disent les précurseurs",
    en: "What the early adopters say",
  },
  "temoignages.ils-ont-essuye-les-platres": {
    fr: "Ils ont essuyé les plâtres.",
    en: "They tested the very first walls.",
  },
  "temoignages.ils-sont-restes": {
    fr: "Ils sont restés.",
    en: "They stayed.",
  },
  "temoignages.alba-a-remplace-mon-wetransfer-mon": {
    fr: "ALBA a remplacé mon WeTransfer, mon Drive, ma boîte mail et mes tableurs. Mes clients voient enfin où on en est, et moi je récupère mes soirées.",
    en: "ALBA replaced my WeTransfer, my Drive, my inbox and my spreadsheets. My clients finally see where we stand, and I get my evenings back.",
  },
  "temoignages.architecte-dplg-lyon": {
    fr: "ARCHITECTE DPLG · LYON",
    en: "REGISTERED ARCHITECT · LYON",
  },
  "temoignages.la-tracabilite-des-decisions-c-est": {
    fr: "La traçabilité des décisions, c'est l'argument qui m'a convaincu. Plus jamais de SAV un an après.",
    en: "Decision traceability is what won me over. No more disputes a year later.",
  },
  "temoignages.mes-maitres-d-ouvrage-adorent-ils": {
    fr: "Mes maîtres d'ouvrage adorent. Ils ont l'impression d'avoir leur propre app, c'est notre marque blanche.",
    en: "My clients love it. They feel like they have their own app, it's our white label.",
  },

  "temoignages.camille-nom": {
    fr: "Camille Lavigne",
    en: "Camille Lavigne",
  },
  "temoignages.marc-nom": {
    fr: "Marc Noiret",
    en: "Marc Noiret",
  },
  "temoignages.marc-role": {
    fr: "STUDIO MN · BORDEAUX",
    en: "STUDIO MN · BORDEAUX",
  },
  "temoignages.sophie-nom": {
    fr: "Sophie Obellier",
    en: "Sophie Obellier",
  },
  "temoignages.sophie-role": {
    fr: "ATELIER VAUBAN · PARIS",
    en: "ATELIER VAUBAN · PARIS",
  },
  /* ——— Le mot du fondateur ——— */
  "fondateur.glissez-votre-portrait-ici": {
    fr: "Glissez votre portrait ici",
    en: "Drop your portrait here",
  },
  "fondateur.fondateur-alba-studio": {
    fr: "Fondateur · ALBA Studio",
    en: "Founder · ALBA Studio",
  },
  "fondateur.le-mot-du-fondateur": {
    fr: "Le mot du fondateur",
    en: "A word from the founder",
  },
  "fondateur.alba-est-ne-sur-un-chantier": {
    fr: "ALBA est né sur un chantier, ",
    en: "ALBA was born on a building site, ",
  },
  "fondateur.pas-dans-un-open-space": {
    fr: "pas dans un open space.",
    en: "not in an open space.",
  },
  "fondateur.pendant-des-annees-j-ai-vu": {
    fr: "Pendant des années, j'ai vu des architectes brillants perdre leurs soirées à chercher un email, relancer une validation, reconstituer l'historique d'une décision prise six mois plus tôt.",
    en: "For years, I watched brilliant architects lose their evenings hunting for an email, chasing an approval, piecing together the history of a decision made six months earlier.",
  },
  "fondateur.ce-temps-la-ne-produit-rien": {
    fr: "Ce temps-là ne produit rien. Il ne dessine rien. Il use.",
    en: "That time produces nothing. It draws nothing. It wears you down.",
  },
  "fondateur.alba-existe-pour-le-rendre-a": {
    fr: "ALBA existe pour le rendre à ceux qui construisent.",
    en: "ALBA exists to give it back to the people who build.",
  },
  "fondateur.chaque-fonctionnalite-est-testee-avec-de": {
    fr: "Chaque fonctionnalité est testée avec de vraies agences, sur de vrais projets, et si vous nous écrivez, c'est moi qui réponds.",
    en: "Every feature is tested with real practices, on real projects, and if you write to us, I'm the one who replies.",
  },
  "fondateur.fondateur": {
    fr: "Fondateur",
    en: "Founder",
  },

  "fondateur.nom": {
    fr: "Anthony Cardona",
    en: "Anthony Cardona",
  },
  "fondateur.ville": {
    fr: "Lyon, France",
    en: "Lyon, France",
  },
  /* ——— Carte tarifaire et configurateur ——— */
  "tarifs.clients-co-traitants-illimites": {
    fr: "Clients & co-traitants illimités",
    en: "Unlimited clients & consultants",
  },
  "tarifs.1-collaborateur-inclus-15-mois-par": {
    fr: "1 collaborateur inclus — +15 €/mois par collaborateur ajouté (4 max)",
    en: "1 team member included — +€15/month per added member (4 max)",
  },
  "tarifs.decisions-horodatees-signees": {
    fr: "Décisions horodatées & signées",
    en: "Timestamped & signed decisions",
  },
  "tarifs.messagerie-projet-securisee": {
    fr: "Messagerie projet sécurisée",
    en: "Secure project messaging",
  },
  "tarifs.materiautheque-fournisseurs": {
    fr: "Matériauthèque & fournisseurs",
    en: "Material library & suppliers",
  },
  "tarifs.cr-de-chantier-reserves-photos": {
    fr: "CR de chantier, réserves & photos",
    en: "Site reports, punch lists & photos",
  },
  "tarifs.visionneuse-plans-dans-le-navigateur": {
    fr: "Visionneuse plans dans le navigateur",
    en: "In-browser plan viewer",
  },
  "tarifs.exports-pdf-comptables": {
    fr: "Exports PDF & comptables",
    en: "PDF & accounting exports",
  },
  "tarifs.marque-blanche-maitre-d-ouvrage": {
    fr: "Marque blanche maître d'ouvrage",
    en: "White-label client portal",
  },
  "tarifs.support-prioritaire-7j-7": {
    fr: "Support prioritaire 7j/7",
    en: "Priority support 7 days a week",
  },
  "tarifs.tarif": {
    fr: "Tarif",
    en: "Pricing",
  },
  "tarifs.un-prix-simple": {
    fr: "Un prix simple,",
    en: "One simple price,",
  },
  "tarifs.une-valeur-claire": {
    fr: "une valeur claire.",
    en: "clear value.",
  },
  "tarifs.tout-est-inclus-pas-de-module": {
    fr: "Tout est inclus. Pas de module, pas d'option cachée. Seul le stockage fait varier le prix, choisissez, le tarif se met à jour à droite.",
    en: "Everything included. No add-ons, no hidden extras. Only storage changes the price, pick yours, the price updates on the right.",
  },
  "tarifs.1-votre-facturation": {
    fr: "1 · Votre facturation",
    en: "1 · Your billing",
  },
  "tarifs.mensuel": {
    fr: "Mensuel",
    en: "Monthly",
  },
  "tarifs.annuel": {
    fr: "Annuel",
    en: "Yearly",
  },
  "tarifs.2-votre-stockage": {
    fr: "2 · Votre stockage",
    en: "2 · Your storage",
  },
  "tarifs.go": {
    fr: "Go",
    en: "GB",
  },
  "tarifs.mois": {
    fr: "/mois",
    en: "/mo",
  },
  "tarifs.3-votre-equipe": {
    fr: "3 · Votre équipe",
    en: "3 · Your team",
  },
  "tarifs.moins": {
    fr: "Moins",
    en: "Fewer",
  },
  "tarifs.collaborateurs": {
    fr: "collaborateurs",
    en: "team members",
  },
  "tarifs.collaborateur": {
    fr: "collaborateur",
    en: "team member",
  },
  "tarifs.plus": {
    fr: "Plus",
    en: "More",
  },
  "tarifs.1-inclus-jusqu-a-4-par": {
    fr: "1 inclus · jusqu'à 4 par espace",
    en: "1 included · up to 4 per workspace",
  },
  "tarifs.un-projet-d-architecture-occupe-en": {
    fr: "Un projet d'architecture occupe en moyenne 10 Go, plans, photos, documents et échanges inclus. Vous pourrez changer de palier à tout moment, en un clic.",
    en: "An architecture project takes about 10 GB on average, plans, photos, documents and messages included. You can change tiers anytime, in one click.",
  },
  "tarifs.pour-votre-agence": {
    fr: "Pour votre agence",
    en: "For your practice",
  },
  "tarifs.tout-ce-qu-il-faut-pour": {
    fr: "Tout ce qu'il faut pour piloter sereinement vos projets, sans option cachée.",
    en: "Everything you need to run your projects with confidence, no hidden extras.",
  },
  "tarifs.mois-2": {
    fr: "/ mois",
    en: "/ month",
  },
  "tarifs.demarrer-avec-un-projet-gratuit": {
    fr: "Démarrer avec un projet gratuit",
    en: "Start with a free project",
  },
  "tarifs.gratuit-a-vie-pour-1-projet": {
    fr: "GRATUIT À VIE POUR 1 PROJET · SANS CB · SANS ENGAGEMENT",
    en: "FREE FOREVER FOR 1 PROJECT · NO CARD · NO COMMITMENT",
  },

  /* ——— Bloc sécurité et conformité ——— */
  "securite.heberge-en-france": {
    fr: "Hébergé en France",
    en: "Hosted in France",
  },
  "securite.vos-donnees-sont-stockees-en-france": {
    fr: "Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. Conformité RGPD native.",
    en: "Your data is stored in France with an ISO 27001-certified host. GDPR-compliant by design.",
  },
  "securite.chiffre-sauvegarde": {
    fr: "Chiffré, sauvegardé",
    en: "Encrypted, backed up",
  },
  "securite.chiffrement-aes-256-au-repos-tls": {
    fr: "Chiffrement AES-256 au repos, TLS en transit. Sauvegardes automatiques quotidiennes.",
    en: "AES-256 encryption at rest, TLS in transit. Automatic daily backups.",
  },
  "securite.vos-donnees-vous-appartiennent": {
    fr: "Vos données vous appartiennent",
    en: "Your data stays yours",
  },
  "securite.export-integral-de-vos-projets-pdf": {
    fr: "Export intégral de vos projets (PDF, ZIP, CSV) à tout moment, en un clic.",
    en: "Export all your projects (PDF, ZIP, CSV) anytime, in one click.",
  },
  "securite.valeur-probante": {
    fr: "Valeur probante",
    en: "Evidence you can produce",
  },
  "securite.decisions-horodatees-et-signees-electronique": {
    fr: "Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur.",
    en: "Timestamped, electronically signed decisions (eIDAS simple signature). Every decision is archived with its evidence: author, date, server timestamp.",
  },
  "securite.securite-donnees": {
    fr: "Sécurité & données",
    en: "Security & data",
  },

  /* ——— Questions fréquentes ——— */
  "faq.que-comprend-le-projet-gratuit": {
    fr: "Que comprend le projet gratuit ?",
    en: "What does the free project include?",
  },
  "faq.un-projet-complet-sans-limite-de": {
    fr: "Un projet complet, sans limite de temps : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio uniquement quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.",
    en: "One complete project, with no time limit: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You only move to the Studio plan when you create your second project, and everything you've built stays in place.",
  },
  "faq.comment-alba-s-integre-a-ma": {
    fr: "Comment ALBA s'intègre à ma méthode actuelle ?",
    en: "How does ALBA fit my current workflow?",
  },
  "faq.alba-s-adapte-a-votre-process": {
    fr: "ALBA s'adapte à votre process, pas l'inverse. Vous configurez les phases (esquisse, APS, APD, permis, DCE, chantier), nous gérons les rappels, les jalons et la mémoire du projet. Aucune formation longue : la plupart des architectes sont opérationnels en moins d'une heure.",
    en: "ALBA adapts to your process, not the other way round. You configure the phases (concept, design, permits, tender, construction); we handle reminders, milestones and the project's memory. No lengthy training: most architects are up and running in under an hour.",
  },
  "faq.mes-clients-doivent-ils-telecharger-une": {
    fr: "Mes clients doivent-ils télécharger une application ?",
    en: "Do my clients need to download an app?",
  },
  "faq.non-alba-fonctionne-entierement-dans-le": {
    fr: "Non. ALBA fonctionne entièrement dans le navigateur, sur ordinateur comme sur téléphone. Un lien, un mot de passe, vos maîtres d'ouvrage accèdent à leur cockpit en 30 secondes.",
    en: "No. ALBA runs entirely in the browser, on desktop and phone. A link, a password, your clients reach their cockpit in 30 seconds.",
  },
  "faq.que-se-passe-t-il-pour": {
    fr: "Que se passe-t-il pour mes données si j'arrête ?",
    en: "What happens to my data if I leave?",
  },
  "faq.elles-sont-a-vous-a-tout": {
    fr: "Elles sont à vous. À tout moment, vous exportez l'intégralité de vos projets (PDF, ZIP, CSV) en un clic. Vos archives papier-numérique restent lisibles 10 ans après.",
    en: "It's yours. At any time, export all your projects (PDF, ZIP, CSV) in one click. Your digital archives remain readable 10 years on.",
  },
  "faq.les-decisions-sont-elles-juridiquement-valab": {
    fr: "Les décisions sont-elles juridiquement valables ?",
    en: "Are decisions legally valid?",
  },
  "faq.chaque-decision-est-horodatee-archivee-et": {
    fr: "Chaque décision est horodatée, archivée et signée électroniquement (eIDAS, niveau simple) : l'auteur, la date et l'horodatage serveur sont conservés à titre de preuve. Pour un acte qui exige une signature avancée ou qualifiée, passez par votre voie habituelle.",
    en: "Every decision is timestamped, archived and electronically signed (eIDAS, simple level): the author, date and server timestamp are kept as evidence. For a document requiring an advanced or qualified signature, use your usual channel.",
  },
  "faq.puis-je-inviter-mon-bet-et": {
    fr: "Puis-je inviter mon BET et mes co-traitants ?",
    en: "Can I invite my engineers and consultants?",
  },
  "faq.bien-sur-les-co-traitants-accedent": {
    fr: "Bien sûr. Les co-traitants accèdent gratuitement aux projets sur lesquels vous les invitez, avec le niveau de droits que vous définissez (lecture, commentaire, dépôt de pièces).",
    en: "Of course. Consultants get free access to the projects you invite them to, with the permission level you set (view, comment, upload).",
  },
  "faq.combien-de-collaborateurs-de-mon-agence": {
    fr: "Combien de collaborateurs de mon agence sont inclus ?",
    en: "How many team members are included?",
  },
  "faq.le-tarif-studio-inclut-1-collaborateur": {
    fr: "Le tarif Studio inclut 1 collaborateur. Vous pouvez en ajouter jusqu'à 3 autres (4 par espace au maximum), à 15 €/mois chacun, ajustable à tout moment. Vos clients et co-traitants, eux, sont illimités et gratuits.",
    en: "The Studio plan includes 1 team member. You can add up to 3 more (4 per workspace maximum), at €15/month each, adjustable anytime. Clients and consultants are unlimited and free.",
  },
  "faq.et-pendant-le-chantier": {
    fr: "Et pendant le chantier ?",
    en: "What about the construction phase?",
  },
  "faq.alba-vous-suit-sur-site-comptes": {
    fr: "ALBA vous suit sur site : comptes-rendus de visite, réserves photographiées et assignées par lot, diffusion automatique aux entreprises et au maître d'ouvrage. Chaque CR est signé et archivé, comme une décision.",
    en: "ALBA follows you on site: visit reports, photographed punch-list items assigned by trade, automatic distribution to contractors and the client. Every report is signed and archived, like a decision.",
  },
  "faq.quels-formats-de-fichiers-puis-je": {
    fr: "Quels formats de fichiers puis-je partager ?",
    en: "What file formats can I share?",
  },
  "faq.tous-pdf-dwg-ifc-images-videos": {
    fr: "Tous — PDF, DWG, IFC, images, vidéos, jusqu'à 100 Mo par fichier. Les plans PDF et les images s'ouvrent directement dans le navigateur : vos clients n'ont besoin d'aucun logiciel.",
    en: "All of them — PDF, DWG, IFC, images, videos, up to 100 MB per file. PDF plans and images open right in the browser: your clients don't need any software.",
  },
  "faq.ou-sont-hebergees-mes-donnees": {
    fr: "Où sont hébergées mes données ?",
    en: "Where is my data hosted?",
  },
  "faq.en-france-chez-un-hebergeur-certifie": {
    fr: "En France, chez un hébergeur certifié ISO 27001. Chiffrement AES-256 au repos, TLS en transit, sauvegardes quotidiennes. Conformité RGPD native.",
    en: "In France, with an ISO 27001-certified host. AES-256 encryption at rest, TLS in transit, daily backups. GDPR-compliant by design.",
  },
  "faq.quel-est-le-delai-pour-demarrer": {
    fr: "Quel est le délai pour démarrer ?",
    en: "How long does it take to get started?",
  },
  "faq.si-vous-voulez-vous-demarrez-aujourd": {
    fr: "Si vous voulez, vous démarrez aujourd'hui. La création de compte prend 3 minutes ; importer vos projets en cours prend en moyenne une demi-journée. On vous accompagne sur l'onboarding sans frais.",
    en: "You can start today. Account creation takes 3 minutes; importing your active projects takes half a day on average. We help with onboarding at no charge.",
  },
  "faq.questions-frequentes": {
    fr: "Questions fréquentes",
    en: "Frequently asked questions",
  },
  "faq.vous-vous-demandez-surement": {
    fr: "Vous vous demandez sûrement…",
    en: "You're probably wondering…",
  },

  /* ——— Formulaire de contact ——— */
  "contact.votre-nom-est-requis": {
    fr: "Votre nom est requis",
    en: "Your name is required",
  },
  "contact.le-nom-de-l-agence-est": {
    fr: "Le nom de l'agence est requis",
    en: "Practice name is required",
  },
  "contact.l-email-est-requis": {
    fr: "L'email est requis",
    en: "Email is required",
  },
  "contact.email-invalide": {
    fr: "Email invalide",
    en: "Invalid email",
  },
  "contact.parlons-en": {
    fr: "Parlons-en",
    en: "Let's talk",
  },
  "contact.voyons-alba-sur-vos-projets-reponse": {
    fr: "Voyons ALBA sur vos projets. Réponse sous 24 h.",
    en: "Let's look at ALBA on your projects. Reply within 24 hours.",
  },
  "contact.que-vous-soyez-seul-e-ou": {
    fr: "Que vous soyez seul·e ou à dix, on adapte la démo à votre méthode. Pas de discours commercial, juste l'outil en action.",
    en: "Whether you're solo or a team of ten, we tailor the demo to your workflow. No sales pitch, just the tool in action.",
  },
  "contact.reponse-en-moins-de-24-h": {
    fr: "Réponse en moins de 24 h ouvrées",
    en: "Reply within 24 business hours",
  },
  "contact.demo-en-visio-30-min": {
    fr: "Démo en visio · 30 min",
    en: "Video demo · 30 min",
  },
  "contact.demander-une-demo": {
    fr: "Demander une démo",
    en: "Request a demo",
  },
  "contact.visio-30-min-sans-engagement": {
    fr: "Visio · 30 min · sans engagement",
    en: "Video call · 30 min · no commitment",
  },
  "contact.ou-creez-directement-votre-compte-gratuit": {
    fr: "Ou créez directement votre compte gratuit →",
    en: "Or create your free account right away →",
  },
  "contact.nom-complet": {
    fr: "Nom complet",
    en: "Full name",
  },
  "contact.agence": {
    fr: "Agence",
    en: "Practice",
  },
  "contact.email-professionnel": {
    fr: "Email professionnel",
    en: "Work email",
  },
  "contact.telephone": {
    fr: "Téléphone",
    en: "Phone",
  },
  "contact.combien-de-projets-en-cours": {
    fr: "Combien de projets en cours ?",
    en: "How many active projects?",
  },
  "contact.1-a-3-projets": {
    fr: "1 à 3 projets",
    en: "1 to 3 projects",
  },
  "contact.4-a-10-projets": {
    fr: "4 à 10 projets",
    en: "4 to 10 projects",
  },
  "contact.plus-de-10-projets": {
    fr: "Plus de 10 projets",
    en: "More than 10 projects",
  },
  "contact.un-mot-sur-votre-besoin-optionnel": {
    fr: "Un mot sur votre besoin (optionnel)",
    en: "A word about your needs (optional)",
  },
  "contact.ce-qui-vous-coince-aujourd-hui": {
    fr: "Ce qui vous coince aujourd'hui, ce que vous cherchez à régler…",
    en: "What's blocking you today, what you're trying to solve…",
  },
  "contact.en-envoyant-vous-acceptez-d-etre": {
    fr: "En envoyant, vous acceptez d'être recontacté·e une fois pour planifier la démo. RGPD-compliant.",
    en: "By sending, you agree to be contacted once to schedule the demo. GDPR-compliant.",
  },
  "contact.demander-une-demo-2": {
    fr: "Demander une démo",
    en: "Request a demo",
  },

  /* ——— Pied de page ——— */
  "pied.la-plateforme-tout-en-un-des": {
    fr: "La plateforme tout-en-un des architectes indépendants. Conçue à Lyon, pensée pour vous.",
    en: "The all-in-one platform for independent architects. Made in Lyon, designed for you.",
  },
  "pied.l-app-mobile-tablette": {
    fr: "L'app mobile & tablette",
    en: "The mobile & tablet app",
  },
  "pied.produit": {
    fr: "Produit",
    en: "Product",
  },
  "pied.fonctionnalites": {
    fr: "Fonctionnalités",
    en: "Features",
  },
  "pied.la-plateforme": {
    fr: "La plateforme",
    en: "The platform",
  },
  "pied.tarifs": {
    fr: "Tarifs",
    en: "Pricing",
  },
  "pied.agence": {
    fr: "Agence",
    en: "Company",
  },
  "pied.a-propos": {
    fr: "À propos",
    en: "About",
  },
  "pied.manifeste": {
    fr: "Manifeste",
    en: "Manifesto",
  },
  "pied.carrieres": {
    fr: "Carrières",
    en: "Careers",
  },
  "pied.legal": {
    fr: "Légal",
    en: "Legal",
  },
  "pied.mentions-legales": {
    fr: "Mentions légales",
    en: "Legal notice",
  },
  "pied.cgu-cgv": {
    fr: "CGU & CGV",
    en: "Terms & conditions",
  },
  "pied.politique-rgpd": {
    fr: "Politique RGPD",
    en: "GDPR policy",
  },
  "pied.securite": {
    fr: "Sécurité",
    en: "Security",
  },
  "pied.2026-alba-studio-tous-droits-reserves": {
    fr: "© 2026 ALBA STUDIO — TOUS DROITS RÉSERVÉS",
    en: "© 2026 ALBA STUDIO — ALL RIGHTS RESERVED",
  },
  "pied.fait-a-lyon-avec-soin": {
    fr: "FAIT À LYON · AVEC SOIN",
    en: "MADE IN LYON · WITH CARE",
  },
};
