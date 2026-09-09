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
  /* Les deux boutons du hero. Les clés ont été renommées avec leur libellé :
     « accueil.creer-mon-projet-gratuit » et « accueil.demander-une-demo »
     décrivaient des boutons qui n'existent plus, et une clé qui ment sur son
     contenu finit par faire rétablir l'ancien texte à celui qui la relit. */
  "accueil.tester-en-1-clic": {
    fr: "Tester en 1 clic",
    en: "Try it in one click",
  },
  "accueil.s-abonner": {
    fr: "S'abonner",
    en: "Subscribe",
  },
  /* Les trois limites de l'essai, dites tout de suite. Si vous modifiez cette
     phrase, gardez les 7 jours : l'espace est réellement supprimé au bout de
     sept jours, et le taire ferait découvrir la limite au visiteur une fois
     qu'il s'y est installé. */
  "accueil.note-essai": {
    fr: "Un espace d'essai complet, ouvert 7 jours. Sans inscription ni carte bancaire.",
    en: "A complete trial workspace, open for 7 days. No sign-up, no credit card.",
  },
  /* Retirées avec la ligne « Premier projet offert · Sans engagement · Setup en
     10 min » du hero : elle annonçait une autre promesse que l'essai de 7 jours
     juste au-dessus. Les clés jumelles de la carte tarifaire et du bandeau
     (« tarifs.… », « bandeau-cta.… ») existent toujours et restent utilisées. */
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
    fr: "Premier projet offert.",
    en: "First project on us.",
  },
  "bandeau-cta.gerez-un-projet-complet-gratuitement-sans": {
    fr: "Créez votre espace en dix minutes. Le premier projet est offert, sans carte bleue.",
    en: "Set up your workspace in ten minutes. The first project is on us, no credit card.",
  },
  "bandeau-cta.creer-mon-projet-gratuit": {
    fr: "Créer mon espace",
    en: "Create my workspace",
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
  /* ⚠️ D'ACCORD AVEC LA CARTE TARIFAIRE : 4 collaborateurs par espace, et
     quatre personnes au plus. Ces quatre libellés annonçaient « 5 à 20 » et
     « 5 à 50 » — au-delà de ce que l'abonnement autorise. Ils avaient été
     corrigés dans audience.jsx sans l'être ici, et contenu.js REMPLACE le
     code : l'écran continuait d'afficher les anciens chiffres. */
  "pour-qui.agences-de-taille-moyenne": {
    fr: "Petites agences",
    en: "Small practices",
  },
  "pour-qui.5-a-20-collaborateurs": {
    fr: "2 à 4 collaborateurs",
    en: "2 to 4 people",
  },
  "pour-qui.vue-agence-multi-projets-droits-par": {
    fr: "Vue agence, multi-projets, droits par profil, orchestrer une équipe sans tout micro-manager, en gardant vos process.",
    en: "Practice view, multi-project, per-role permissions, run a team without micro-managing, keeping your processes.",
  },
  "pour-qui.5-20-pers": {
    fr: "2–4 pers.",
    en: "2–4 people",
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
    fr: "jusqu'à 30 projets",
    en: "up to 30 projects",
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
  /* « EN SAVOIR + » était le même libellé sur les cinq cartes. Chacune porte
     désormais le sien — « Voir la démo libéral », « Découvrir »… — écrit depuis
     le début dans audience.jsx et jamais affiché. La clé générique part avec. */

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
    fr: "Ils ont testé en avant-première",
    en: "They tested it first",
  },
  "temoignages.ils-sont-restes": {
    fr: "et ont adoré.",
    en: "and loved it.",
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
    fr: "Au départ, ",
    en: "At the start, ",
  },
  "fondateur.pas-dans-un-open-space": {
    fr: "je venais juste mesurer les murs.",
    en: "I just came to measure the walls.",
  },
  "fondateur.pendant-des-annees-j-ai-vu": {
    fr: "Je fais des relevés de mesures. Une maison, un appartement, parfois un immeuble entier. Je mesure tout et je livre un modèle 3D, des plans 2D, et les photos quand on me les demande. Mes clients sont des architectes. Ça fait deux ans, et j'ai fini par apprendre leur métier de l'intérieur.",
    en: "I do measured surveys. A house, a flat, sometimes a whole building. I measure everything and deliver a 3D model, 2D drawings, and the photographs when they're asked for. My clients are architects. It's been two years, and I've ended up learning their trade from the inside.",
  },
  "fondateur.ce-temps-la-ne-produit-rien": {
    fr: "Ce que je vois chez eux est toujours pareil. Le travail est bon. C'est ce qu'il y a autour qui lâche. Un plan livré en mars qu'on ne retrouve plus en juin. Trois versions d'un même fichier dans une boîte mail. Un accord donné au téléphone dont il ne reste aucune trace.",
    en: "What I see at their practices is always the same. The work is good. It's everything around it that gives way. A drawing delivered in March that can't be found in June. Three versions of the same file in an inbox. An agreement made over the phone with no trace left of it.",
  },
  "fondateur.alba-existe-pour-le-rendre-a": {
    fr: "À chaque fois, c'est du travail déjà fait qu'il faut refaire.",
    en: "Every time, it means redoing work that was already done.",
  },
  "fondateur.chaque-fonctionnalite-est-testee-avec-de": {
    fr: "J'ai fait ALBA pour ça. Tout ce qui concerne un projet reste au même endroit : les documents, les décisions, les échanges avec le client. Je continue les relevés à côté, donc je vois encore ce qui coince et je corrige au fur et à mesure. Et quand vous écrivez au support, c'est moi qui réponds.",
    en: "That's why I made ALBA. Everything about a project stays in one place: the documents, the decisions, the exchanges with the client. I still do surveys alongside it, so I still see what jams, and I fix it as I go. And when you write to support, I'm the one who answers.",
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
  "tarifs.s-abonner": {
    fr: "S'abonner",
    en: "Subscribe",
  },

  /* ——— Bloc sécurité et conformité ——— */
  "securite.heberge-en-france": {
    fr: "Hébergé en France",
    en: "Hosted in France",
  },
  "securite.vos-donnees-sont-stockees-en-france": {
    fr: "Vos données sont hébergées en France, chez un hébergeur certifié ISO 27001. Les sauvegardes chiffrées restent dans l'Union européenne.",
    en: "Your data is hosted in France with an ISO 27001-certified host. Encrypted backups stay within the European Union.",
  },
  "securite.chiffre-sauvegarde": {
    fr: "Chiffré, sauvegardé",
    en: "Encrypted, backed up",
  },
  "securite.chiffrement-aes-256-au-repos-tls": {
    fr: "Chiffrement au repos et en transit. Sauvegardes automatiques, conservées dans l'Union européenne.",
    en: "Encrypted at rest and in transit. Automatic backups, kept within the European Union.",
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
    fr: "Un projet complet pour commencer : cockpit, décisions signées, messagerie, documents, matériauthèque, accès maître d'ouvrage et co-traitants. Aucune carte bleue demandée. Vous passez au tarif Studio quand vous créez votre deuxième projet, et tout ce que vous avez construit reste en place.",
    en: "One complete project to get started: cockpit, signed decisions, messaging, documents, material library, client and consultant access. No credit card required. You move to the Studio plan when you create your second project, and everything you've built stays in place.",
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
    /* AUCUN MONTANT ICI. Cette réponse a dit « 69 € HT par mois et par
       personne » — l'erreur exacte qu'on venait de corriger sur la carte, et
       qui vaut 276 € pour quatre au lieu de 186. Elle est injectée en JSON-LD
       sur les DIX pages du site : le prix faux était syndiqué partout, et
       candidat à l'affichage direct dans les résultats de recherche.
       Les montants vivent dans tarifs.js et ne s'affichent que sur la page de
       tarifs. Ici on décrit la RÈGLE, qui elle ne bouge pas. */
    fr: "Les offres Découverte et Atelier couvrent une personne. L'offre Agence va jusqu'à quatre, avec un tarif dégressif à partir de la deuxième : le détail est sur la page Tarifs. Vos clients et vos co-traitants, eux, restent illimités et gratuits — ils ne comptent dans aucune offre.",
    en: "The Discovery and Studio plans cover one person. The Practice plan goes up to four, at a decreasing rate from the second person onwards: the detail is on the Pricing page. Your clients and consultants remain unlimited and free — they count towards no plan.",
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
    fr: "En France, chez un hébergeur certifié ISO 27001 : base de données, fichiers et comptes. Chiffrement au repos et en transit. Les sauvegardes chiffrées sont conservées dans l'Union européenne.",
    en: "In France, with an ISO 27001-certified host: database, files and accounts. Encrypted at rest and in transit. Encrypted backups are kept within the European Union.",
  },
  "faq.les-prix-affiches-sont-ils-hors": {
    fr: "Les prix affichés sont-ils hors taxes ?",
    en: "Are the prices shown excluding tax?",
  },
  "faq.oui-tous-les-montants-de-cette": {
    fr: "Oui, tous les montants de cette page sont hors taxes. La TVA applicable est calculée au moment du paiement, selon votre pays et votre statut : 20 % pour une agence assujettie en France. Si vous disposez d'un numéro de TVA intracommunautaire, il vous sera demandé lors de la souscription. Votre facture est émise automatiquement après chaque prélèvement.",
    en: "Yes, every amount on this page is exclusive of tax. Applicable VAT is calculated at checkout, based on your country and status: 20% for a practice registered in France. If you have an EU VAT number, you will be asked for it during signup. Your invoice is issued automatically after each payment.",
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
    fr: "Que vous soyez seul·e ou à quatre, on adapte la démo à votre méthode. Pas de discours commercial, juste l'outil en action.",
    en: "Whether you're solo or a team of four, we tailor the demo to your workflow. No sales pitch, just the tool in action.",
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
    fr: "Ou créez directement votre compte →",
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
  "contact.mention-collecte": {
    fr: "Vos coordonnées sont traitées par ANCA dans le seul but de vous rappeler pour cette démonstration, et conservées 12 mois. Vous pouvez y accéder, les corriger ou les supprimer en écrivant à support@alba-studio.co.",
    en: "Your details are processed by ANCA for the sole purpose of calling you back about this demo, and kept for 12 months. You can access, correct or delete them by writing to support@alba-studio.co.",
  },
  "contact.mention-collecte-lien": {
    fr: "Mentions légales",
    en: "Legal notice",
  },
  "contact.envoi-en-cours": {
    fr: "Envoi…",
    en: "Sending…",
  },
  "contact.envoi-impossible": {
    fr: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact@alba-studio.co.",
    en: "Sending failed. Please try again, or email us directly at contact@alba-studio.co.",
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
  "pied.valeur-probante": {
    fr: "Valeur probante",
    en: "Evidential value",
  },
  "pied.co-traitants": {
    fr: "Co-traitants & BET",
    en: "Consultants & engineers",
  },
  "pied.a-propos": {
    fr: "À propos",
    en: "About",
  },
  "pied.manifeste": {
    fr: "Manifeste",
    en: "Manifesto",
  },
  /* « Carrières » a été retirée du pied de page : elle portait href="#", donc
     elle ne menait nulle part, et il n'existe aucune page carrières à laquelle
     la rattacher. Sa clé part avec elle — tests/contenu.mjs échoue sur une
     entrée que personne n'appelle. */
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
  "tarifs.offre-decouverte": {
    fr: "Découverte",
    en: "Discovery",
  },
  "tarifs.decouverte-resume": {
    fr: "Pour voir ce que ça donne sur un vrai projet.",
    en: "To see what it does on a real project.",
  },
  "tarifs.decouverte-q1": {
    fr: "1 projet, offert à vie",
    en: "1 project, free for ever",
  },
  "tarifs.decouverte-q2": {
    fr: "1 personne",
    en: "1 person",
  },
  "tarifs.decouverte-q3": {
    fr: "Léo : 10 lectures de documents et 300 questions par mois",
    en: "Léo: 10 document readings and 300 questions per month",
  },
  "tarifs.offre-atelier": {
    fr: "Atelier",
    en: "Studio",
  },
  "tarifs.atelier-resume": {
    fr: "Pour un architecte qui mène plusieurs affaires de front.",
    en: "For an architect running several jobs at once.",
  },
  "tarifs.atelier-q1": {
    fr: "5 projets menés de front, archives illimitées",
    en: "5 live projects, unlimited archives",
  },
  "tarifs.atelier-q2": {
    fr: "1 personne",
    en: "1 person",
  },
  "tarifs.atelier-q3": {
    fr: "Léo : 50 lectures et 1 500 questions par mois",
    en: "Léo: 50 readings and 1,500 questions per month",
  },
  "tarifs.offre-agence": {
    fr: "Agence",
    en: "Practice",
  },
  "tarifs.agence-resume": {
    fr: "Pour une équipe, jusqu'à quatre personnes.",
    en: "For a team, up to four people.",
  },
  "tarifs.agence-q1": {
    fr: "Projets illimités",
    en: "Unlimited projects",
  },
  "tarifs.agence-q2": {
    fr: "Jusqu'à 4 personnes",
    en: "Up to 4 people",
  },
  "tarifs.agence-q3": {
    fr: "Léo : 200 lectures et 5 000 questions par mois",
    en: "Léo: 200 readings and 5,000 questions per month",
  },
  "tarifs.eyebrow": {
    fr: "Tarifs",
    en: "Pricing",
  },
  /* « Deux questions, un prix » : c'est la promesse de la page, et c'est
     littéralement ce qu'elle fait. */
  "tarifs.titre-1": {
    fr: "Deux questions,",
    en: "Two questions,",
  },
  "tarifs.titre-2": {
    fr: "un prix.",
    en: "one price.",
  },
  "tarifs.sous-titre": {
    fr: "On ne facture ni des options ni des modules : seulement le nombre de projets que vous menez de front et le nombre de personnes qui travaillent dans ALBA.",
    en: "We charge neither for add-ons nor for modules: only for the number of projects you run at once and the number of people working in ALBA.",
  },
  "tarifs.regle-titre": {
    fr: "Toutes les fonctionnalités, dans toutes les offres.",
    en: "Every feature, in every plan.",
  },
  "tarifs.regle-corps": {
    fr: "Dès le premier euro, et y compris dans l'offre gratuite. Aucune fonction n'est réservée à un palier supérieur : nous ne bornons que des quantités.",
    en: "From the first euro, including in the free plan. No feature is reserved for a higher tier: we cap quantities only.",
  },
  "tarifs.gratuit": {
    fr: "Gratuit",
    en: "Free",
  },
  "tarifs.periodicite": {
    fr: "Périodicité",
    en: "Billing period",
  },
  "tarifs.mensuel": {
    fr: "Mensuel",
    en: "Monthly",
  },
  "tarifs.annuel": {
    fr: "Annuel",
    en: "Yearly",
  },
  /* « jusqu'à » : 18 % sur Atelier et sur chaque personne supplémentaire,
     17,4 % sur le premier siège Agence. Voir sections.jsx. */
  "tarifs.remise-annuelle": {
    fr: "jusqu'à −18 %",
    en: "up to −18%",
  },
  "tarifs.ht-mois-court": {
    fr: "HT / mois",
    en: "excl. VAT / month",
  },
  "tarifs.toutes-fonctionnalites": {
    fr: "Toutes les fonctionnalités",
    en: "Every feature",
  },
  "tarifs.ouverture": {
    fr: "Ouverture…",
    en: "Opening…",
  },
  "tarifs.commencer-gratuitement": {
    fr: "Commencer gratuitement",
    en: "Start for free",
  },
  "tarifs.nous-ecrire": {
    fr: "Nous écrire",
    en: "Write to us",
  },
  "tarifs.calc-personnes": {
    fr: "Combien êtes-vous dans l'agence ?",
    en: "How many of you are in the practice?",
  },
  "tarifs.calc-projets": {
    fr: "Combien de projets menez-vous de front ?",
    en: "How many projects do you run at once?",
  },
  "tarifs.calc-projets-note": {
    fr: "Projets en cours, pas projets archivés : archiver un projet terminé libère une place, et vous gardez l'accès à tout ce que vous avez fait.",
    en: "Live projects, not archived ones: archiving a finished project frees a slot, and you keep access to everything you have done.",
  },
  "tarifs.calc-decouverte": {
    fr: "Un seul projet à la fois vous suffit : l'offre gratuite le couvre entièrement, sans limite de durée et sans carte bancaire.",
    en: "One project at a time is enough for you: the free plan covers it entirely, with no time limit and no payment card.",
  },
  "tarifs.temps-chapo": {
    fr: "Léo lit vos pièces écrites — CCTP, descriptifs, DPGF — et en sort les prescriptions, les matériaux, les prix et les intervenants.",
    en: "Léo reads your written documents — specifications, schedules of works, bills of quantities — and extracts requirements, materials, prices and parties.",
  },
  "tarifs.temps-docs": {
    fr: "Documents confiés à Léo par mois",
    en: "Documents given to Léo each month",
  },
  "tarifs.temps-taux": {
    fr: "Votre taux horaire",
    en: "Your hourly rate",
  },
  "tarifs.temps-heures": {
    fr: "Temps de dépouillement par document",
    en: "Time spent going through one document",
  },
  "tarifs.temps-hypothese": {
    fr: "C'est une hypothèse, pas une mesure : nous n'avons pas relevé ce chiffre chez nos clients. Réglez-le sur ce que vous constatez.",
    en: "This is an assumption, not a measurement: we have not recorded this figure with our clients. Set it to what you observe.",
  },
  "tarifs.mentions": {
    fr: "Montants HT · Estimation indicative",
    en: "Amounts excl. VAT · Indicative estimate",
  },
  "tarifs.votre-offre": {
    fr: "Votre offre",
    en: "Your plan",
  },
  /* La question qui revient le plus : « et mes clients, mes BET ? ». On y
     répond sous la première question, avant qu'elle ne soit posée. */
  "tarifs.invites-note": {
    fr: "Vos clients, bureaux d'études et entreprises ne sont pas facturés : vous les invitez gratuitement, sans limite, sur toutes les offres.",
    en: "Your clients, engineers and contractors are not billed: you invite them for free, without limit, on every plan.",
  },
  /* L'argument, en une ligne, en face du prix. Le « soit 6 × votre
     abonnement » est calculé et ajouté par le code quand il est fort. */
  "tarifs.leo-gagne": {
    fr: "de temps gagné par mois grâce à Léo",
    en: "of time saved each month thanks to Léo",
  },
  "tarifs.votre-abonnement": {
    fr: "votre abonnement",
    en: "your subscription",
  },
  "tarifs.ajuster": {
    fr: "Ajuster l'estimation",
    en: "Adjust the estimate",
  },
  "tarifs.masquer": {
    fr: "Masquer",
    en: "Hide",
  },
  "tarifs.rail-titre": {
    fr: "Les trois offres · cliquez pour comparer",
    en: "The three plans · click to compare",
  },
  "tarifs.des": {
    fr: "dès",
    en: "from",
  },
  "tarifs.mois": {
    fr: "mois",
    en: "month",
  },
  /* La ligne courte de chaque tuile du rail. Les quantités complètes restent
     dans « …-q1 » à « …-q3 », affichées dans la réponse. */
  "tarifs.decouverte-court": {
    fr: "1 projet · 1 personne",
    en: "1 project · 1 person",
  },
  "tarifs.atelier-court": {
    fr: "5 projets de front · 1 personne",
    en: "5 live projects · 1 person",
  },
  "tarifs.agence-court": {
    fr: "Projets illimités · jusqu'à 4 personnes",
    en: "Unlimited projects · up to 4 people",
  },
  "tarifs.porte": {
    fr: "Créer un compte gratuit",
    en: "Create a free account",
  },

  /* ——— Les six groupes ——— */
  "catalogue.projets": {
    fr: "Vos projets",
    en: "Your projects",
  },
  "catalogue.projets-decisions": {
    fr: "Décisions — trancher, horodater et signer les choix du chantier",
    en: "Decisions — settle, timestamp and sign the choices made on site",
  },
  "catalogue.projets-documents": {
    fr: "Documents — plans, pièces écrites, contrats : déposés, versionnés, partagés",
    en: "Documents — drawings, written documents, contracts: uploaded, versioned, shared",
  },
  "catalogue.projets-suivi": {
    fr: "Suivi du projet — les phases, les jalons et les échéances",
    en: "Project tracking — phases, milestones and deadlines",
  },
  "catalogue.projets-budget": {
    fr: "Budget — le suivi des montants, des lots et des factures",
    en: "Budget — tracking amounts, work packages and invoices",
  },
  "catalogue.projets-rentabilite": {
    fr: "Rentabilité — le temps passé et la marge, projet par projet",
    en: "Profitability — time spent and margin, project by project",
  },
  "catalogue.projets-chantier": {
    fr: "Suivi de chantier — réserves, comptes rendus de visite, PV et photos",
    en: "Site tracking — punch-list items, visit reports, minutes and photographs",
  },
  "catalogue.projets-calendrier": {
    fr: "Calendrier — toutes les échéances de tous les projets au même endroit",
    en: "Calendar — every deadline from every project in one place",
  },
  "catalogue.leo": {
    fr: "Léo, votre assistant",
    en: "Léo, your assistant",
  },
  "catalogue.leo-lit": {
    fr: "Il lit vos pièces écrites — CCTP, descriptifs, DPGF, notices — et en sort les prescriptions, les matériaux, les prix et les intervenants",
    en: "He reads your written documents — specifications, schedules of works, bills of quantities, notices — and extracts requirements, materials, prices and parties",
  },
  "catalogue.leo-questions": {
    fr: "Vous lui posez vos questions sur vos projets, en français",
    en: "You ask him questions about your projects, in plain English",
  },
  "catalogue.leo-voix": {
    fr: "Il répond à voix haute si vous le souhaitez",
    en: "He answers out loud if you want him to",
  },
  "catalogue.leo-briefing": {
    fr: "Un briefing du matin qui rassemble ce qui vous attend",
    en: "A morning briefing that gathers what lies ahead",
  },
  "catalogue.portail": {
    fr: "Le portail de vos clients",
    en: "Your clients' portal",
  },
  "catalogue.portail-espace": {
    fr: "Un espace par projet pour le maître d'ouvrage, sans qu'il crée de compte",
    en: "A space per project for your client, with no account to create",
  },
  "catalogue.portail-signature": {
    fr: "Validation des choix et signature électronique des procès-verbaux",
    en: "Approval of choices and electronic signature of minutes",
  },
  "catalogue.portail-messagerie": {
    fr: "Messagerie avec le maître d'ouvrage et les intervenants",
    en: "Messaging with your client and everyone involved",
  },
  "catalogue.portail-droits": {
    fr: "Vous décidez, projet par projet et personne par personne, de ce qu'ils voient",
    en: "You decide, project by project and person by person, what they see",
  },
  "catalogue.portail-gratuits": {
    fr: "Clients, bureaux d'études et entreprises : gratuits et illimités",
    en: "Clients, engineers and contractors: free and unlimited",
  },
  "catalogue.matiere": {
    fr: "La matière",
    en: "Your material",
  },
  "catalogue.matiere-materiautheque": {
    fr: "Matériauthèque — votre bibliothèque de matériaux, réutilisable d'un projet à l'autre",
    en: "Material library — your own library of materials, reusable from one project to the next",
  },
  "catalogue.matiere-lots": {
    fr: "Bibliothèque de lots et de modèles CCTP",
    en: "Library of work packages and specification templates",
  },
  "catalogue.matiere-consultation": {
    fr: "Consultation des entreprises — prescriptions, intervenants et prix",
    en: "Tendering — requirements, parties and prices",
  },
  "catalogue.agence": {
    fr: "Votre agence",
    en: "Your practice",
  },
  "catalogue.agence-collaborateurs": {
    fr: "Collaborateurs — inviter votre équipe et régler ses droits (offre Agence)",
    en: "Team members — invite your team and set their permissions (Practice plan)",
  },
  "catalogue.agence-visuels": {
    fr: "Visuels — galeries, diaporama et visites virtuelles pour vos présentations",
    en: "Visuals — galleries, slideshows and virtual tours for your presentations",
  },
  "catalogue.agence-emails": {
    fr: "E-mails automatiques",
    en: "Automatic emails",
  },
  "catalogue.agence-honoraires": {
    fr: "Calculateur d'honoraires",
    en: "Fee calculator",
  },
  "catalogue.agence-archives": {
    fr: "Archives et corbeille",
    en: "Archives and bin",
  },
  "catalogue.aussi": {
    fr: "Et aussi",
    en: "And also",
  },
  "catalogue.aussi-mobile": {
    fr: "Application mobile iOS et Android",
    en: "iOS and Android mobile app",
  },
  "catalogue.aussi-notifications": {
    fr: "Notifications par e-mail et sur votre téléphone",
    en: "Notifications by email and on your phone",
  },
  "catalogue.aussi-2fa": {
    fr: "Double authentification",
    en: "Two-factor authentication",
  },
  "catalogue.aussi-langues": {
    fr: "Français et anglais",
    en: "French and English",
  },
  "catalogue.aussi-accessibilite": {
    fr: "Réglages d'accessibilité",
    en: "Accessibility settings",
  },
  "catalogue.aussi-marque": {
    fr: "Vos couleurs et votre logo sur les documents envoyés",
    en: "Your colours and your logo on the documents you send",
  },

  /* La fenêtre « Tout ce que fait Alba », ouverte par le « + » de la ligne
     « Toutes les fonctionnalités ». Chaque libellé correspond à un écran qui
     existe dans l'application : n'en ajoutez pas sans que l'écran existe.
     AUCUN PRIX ICI, et aucune mention d'offre — sauf « offre Agence » sur la
     ligne Collaborateurs, seule fonction dont l'accès en dépend vraiment. */
  "catalogue.titre": {
    fr: "Tout ce que fait Alba",
    en: "Everything Alba does",
  },
  "catalogue.chapo": {
    fr: "Tout ce qui suit est inclus dans les trois offres, y compris la gratuite. Nous ne bornons que des quantités : le nombre de projets menés de front, le nombre de personnes, et l'usage de Léo.",
    en: "Everything below is included in all three plans, including the free one. We cap quantities only: the number of projects you run at once, the number of people, and how much you use Léo.",
  },
  "catalogue.fermer": {
    fr: "Fermer",
    en: "Close",
  },
  "catalogue.pied": {
    fr: "Vous pouvez masquer ce que vous n'utilisez pas, depuis vos réglages — et le rallumer quand vous voulez.",
    en: "You can hide what you don't use, from your settings — and switch it back on whenever you like.",
  },
  "catalogue.voir": {
    fr: "Voir toutes les fonctionnalités",
    en: "See every feature",
  },
};
