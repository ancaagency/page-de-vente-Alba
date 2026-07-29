/* Matériauthèque, interactive demo styled like the REAL app + Manifesto */

const MAT_CATS_DEF = [
  { name: "Sols", dot: "#C9A86A" },
  { name: "Murs & peintures", dot: "#7E9A7E" },
  { name: "Menuiseries", dot: "#8B6F4E" },
  { name: "Sanitaire & robinetterie", dot: "#6E8CA8" },
  { name: "Luminaires", dot: "#D9B36B" },
  { name: "Mobilier fixe", dot: "#A87E5C" },
  { name: "Autre", dot: "#9AA0AC" },
];

/* Display label for a category in the current language */
const matCatLabel = (c) => ({
  "Sols": L("Sols", "Flooring"),
  "Murs & peintures": L("Murs & peintures", "Walls & paint"),
  "Menuiseries": L("Menuiseries", "Joinery"),
  "Sanitaire & robinetterie": L("Sanitaire & robinetterie", "Sanitary & taps"),
  "Luminaires": L("Luminaires", "Lighting"),
  "Mobilier fixe": L("Mobilier fixe", "Fixed furniture"),
  "Autre": L("Autre", "Other"),
}[c] || c);

const MAT_DATA = [
  { id: 1, size: "240×21", name: "Parquet chêne massif brossé", marque: "Ets Bercot & Fils", ref: "CHB-240-NAT", cat: "Sols", prix: "84 €/m²", delai: "3 sem.", projets: ["Grange Lissieu"], champ: true, tags: ["durable", "haut de gamme"], bg: "repeating-linear-gradient(90deg, rgba(60,35,10,0.14) 0 2px, transparent 2px 11px), linear-gradient(135deg, #C9A876, #96733F)" },
  { id: 2, size: "60×40", name: "Pierre de Bourgogne adoucie", marque: "Carrières Sauvanet", ref: "PBG-060-ADO", cat: "Sols", prix: "146 €/m²", delai: "6 sem.", projets: ["Grange Lissieu", "Maison Écully"], champ: true, bg: "radial-gradient(ellipse at 30% 30%, #E2D6BC, transparent 60%), linear-gradient(135deg, #D8CBB2, #AC9D80)" },
  { id: 3, name: "Béton ciré minéral gris", marque: "Mercadier", ref: "BCM-020-GRA", cat: "Sols", prix: "92 €/m²", delai: "2 sem.", projets: ["Maison Écully"], bg: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(135deg, #9DA3AB, #686E78)" },
  { id: 4, size: "30×30", name: "Terre cuite artisanale rosée", marque: "Briqueterie Chimot", ref: "TCA-110-ROS", cat: "Sols", prix: "88 €/m²", delai: "7 sem.", projets: [], tags: ["artisanal"], bg: "radial-gradient(ellipse at 60% 30%, rgba(255,200,160,0.25), transparent 55%), linear-gradient(135deg, #B4633E, #8A4628)" },
  { id: 5, name: "Enduit chaux ferré sable", marque: "Argilus", ref: "ECF-010-SAB", cat: "Murs & peintures", prix: "46 €/m²", delai: "1 sem.", projets: ["Grange Lissieu", "Maison Écully"], champ: true, tags: ["biosourcé"], bg: "radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.25), transparent 55%), linear-gradient(135deg, #E6DFD0, #CBC0A8)" },
  { id: 6, name: "Chanvre projeté isolant", marque: "Technichanvre", ref: "CHP-200-ISO", cat: "Murs & peintures", prix: "39 €/m²", delai: "2 sem.", projets: [], tags: ["biosourcé", "isolant"], bg: "radial-gradient(ellipse at 30% 70%, rgba(200,190,150,0.3), transparent 50%), linear-gradient(135deg, #B5AC8B, #8F865F)" },
  { id: 7, size: "H240×L60", name: "Menuiserie noyer fumé huilé", marque: "Scierie Delatour", ref: "NYF-180-FUM", cat: "Menuiseries", prix: "128 €/m²", delai: "5 sem.", projets: ["Atelier Paris 11e"], bg: "repeating-linear-gradient(90deg, rgba(30,15,5,0.2) 0 2px, transparent 2px 9px), linear-gradient(135deg, #7A5636, #4A3220)" },
  { id: 8, size: "Sur mesure", name: "Châssis acier thermolaqué", marque: "Métallerie Bruyère", ref: "ATN-030-RAL9005", cat: "Menuiseries", prix: "168 €/ml", delai: "5 sem.", projets: ["Grange Lissieu"], bg: "linear-gradient(160deg, #33363D 0%, #17191D 70%, #2A2D33 100%)" },
  { id: 9, size: "8 mm", name: "Verre cannelé clair 8 mm", marque: "Miroiterie Grand Lyon", ref: "VCC-008-CAN", cat: "Menuiseries", prix: "310 €/m²", delai: "4 sem.", projets: ["Atelier Paris 11e"], bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 3px, rgba(190,212,220,0.18) 3px 11px), linear-gradient(135deg, #B9CDD4, #93ABB4)" },
  { id: 10, name: "Robinetterie laiton brossé", marque: "Atelier Fontaine", ref: "LTB-015-BRO", cat: "Sanitaire & robinetterie", prix: "215 €/u", delai: "4 sem.", projets: ["Atelier Paris 11e"], bg: "linear-gradient(120deg, #D9B36B 0%, #A67C3B 40%, #E8CD8F 65%, #B98F4C 100%)" },
  { id: 11, size: "Ø35", name: "Suspension zinc prépatiné", marque: "VMZinc Édition", ref: "ZNP-070-QTZ", cat: "Luminaires", prix: "74 €/u", delai: "3 sem.", projets: ["Maison Écully"], bg: "linear-gradient(145deg, #A8AFB6 0%, #8B929A 50%, #B7BEC4 100%)" },
  { id: 12, size: "L140", name: "Voilage lin naturel écru", marque: "Toiles de Mayenne", ref: "LNT-140-ECR", cat: "Autre", prix: "58 €/ml", delai: "2 sem.", projets: ["Grange Lissieu"], bg: "repeating-linear-gradient(0deg, rgba(120,100,70,0.12) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(120,100,70,0.12) 0 1px, transparent 1px 4px), linear-gradient(135deg, #DCD2BC, #C4B89E)" },
];

const MAT_SIDE_ITEMS_GET = () => [
  { label: L("Tableau de bord", "Dashboard"), icon: "menu-grid" },
  { label: L("Projets", "Projects"), icon: "folder" },
  { label: L("Maîtres d'ouvrage", "Clients"), icon: "users" },
  { label: L("Calendrier", "Calendar"), icon: "calendar" },
  { label: L("Calculateur", "Calculator"), icon: "euro" },
  { label: L("Bibliothèque matériaux", "Material library"), icon: "layers", active: true },
  { label: L("Archives", "Archives"), icon: "doc" },
];

const Materials = () => {
  const [cat, setCat] = React.useState("Tous");
  const [addOpen, setAddOpen] = React.useState(false);
  const gridRef = React.useRef(null);

  const list = (cat === "Tous" ? MAT_DATA : MAT_DATA.filter((m) => m.cat === cat)).slice(0, 6);
  const countFor = (c) => (c === "Tous" ? MAT_DATA.length : MAT_DATA.filter((m) => m.cat === c).length);
  const usedInProject = MAT_DATA.filter((m) => m.projets.length > 0).length;
  const champions = MAT_DATA.filter((m) => m.champ).length;
  const activeCats = new Set(MAT_DATA.map((m) => m.cat)).size;

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = gridRef.current ? gridRef.current.querySelectorAll(".ml-card") : [];
    if (!cards.length) return;
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 22, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.045, ease: "power3.out", overwrite: true }
    );
  }, [cat]);

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const app = document.querySelector(".mat-app");
    if (!app) return;
    gsap.from(app, {
      autoAlpha: 0, y: 90, rotateX: 6, transformPerspective: 1600, transformOrigin: "center top",
      duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: app, start: "top 82%", toggleActions: "play none none reverse" },
    });
  }, []);

  const catDot = (c) => (MAT_CATS_DEF.find((d) => d.name === c) || {}).dot || "#9AA0AC";

  return (
    <section className="materials-section" id="materiaux">
      <div className="container">
        <div className="s-head">
          <span className="eyebrow">{L("Nouvelle fonctionnalité", "New feature")}<span className="mat-badge-new">{L("NOUVEAU", "NEW")}</span></span>
          <h2 className="display">{L("La bibliothèque matériaux, ", "The material library, ")}<em>{L("reliée à vos projets.", "linked to your projects.")}</em></h2>
          <p>{L("Marques, références, prix, tags, chaque matériau est capitalisé une fois, puis réutilisé en deux clics dans un circuit de décision. Sans tout ressaisir à chaque chantier.", "Brands, references, prices, tags, each material is captured once, then reused in two clicks inside a decision flow. No retyping on every project.")}</p>
        </div>

        <div className="mat-app">
          <div className="mockup-bar">
            <div className="mockup-dots">
              <span style={{background:"#FF5F57"}}/><span style={{background:"#FEBC2E"}}/><span style={{background:"#28C840"}}/>
            </div>
            <div className="mockup-url"><Icon name="lock" size={11}/> alba-studio.co/bibliotheque</div>
            <div style={{width:46}}/>
          </div>
          <div className="ml-shell is-rail">
            <aside className="ml-rail">
              <div className="ml-rail-logo"><img src="images/logo-alba.png" alt="ALBA Studio"/></div>
              <div className="ml-rail-items">
                {MAT_SIDE_ITEMS_GET().map((it) => (
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
                <span>Studio</span> › <span>{L("Capitalisation", "Knowledge base")}</span> › <b>{L("Bibliothèque matériaux", "Material library")}</b>
                <button className="ml-import-btn"><Icon name="folder" size={11}/> {L("Importer d'un projet", "Import from a project")}</button>
                <button className="ml-import-btn"><Icon name="globe" size={11}/> {L("Importer une URL", "Import a URL")}</button>
                <button className="ml-add-btn" style={{marginLeft: 0}} onClick={() => setAddOpen(true)}><Icon name="plus" size={12}/> {L("Ajouter", "Add")}</button>
              </div>

              <div className="ml-header">
                <div className="ml-header-left">
                  <div className="ml-workspace">{L("WORKSPACE · ALBA STUDIO · CAPITALISATION", "WORKSPACE · ALBA STUDIO · KNOWLEDGE BASE")}</div>
                  <h3 className="ml-title">{L("Ma ", "My ")}<em>{L("bibliothèque", "library")}</em></h3>
                  <p className="ml-desc">{L("Vos matériaux favoris, capitalisés au fil des projets. Réutilisez-les en deux clics dans un circuit de décision.", "Your favourite materials, captured across projects. Reuse them in two clicks inside a decision flow.")}</p>
                </div>
                <div className="ml-stats">
                  <div className="ml-stat">
                    <div className="k">{L("MATÉRIAUX RÉFÉRENCÉS", "MATERIALS ON FILE")}</div>
                    <div className="v">{MAT_DATA.length}</div>
                    <div className="f">{L("+3 ce mois", "+3 this month")}</div>
                  </div>
                  <div className="ml-stat">
                    <div className="k">{L("CATÉGORIES ACTIVES", "ACTIVE CATEGORIES")}</div>
                    <div className="v">{activeCats}</div>
                    <div className="f">{L("Sur 7 disponibles", "Out of 7 available")}</div>
                  </div>
                  <div className="ml-stat">
                    <div className="k">{L("UTILISÉS EN PROJET", "USED IN PROJECTS")}</div>
                    <div className="v">{usedInProject}</div>
                    <div className="f">{L(`${Math.round(usedInProject / MAT_DATA.length * 100)} % de votre biblio`, `${Math.round(usedInProject / MAT_DATA.length * 100)}% of your library`)}</div>
                  </div>
                  <div className="ml-stat gold">
                    <div className="k">{L("CHAMPIONS", "CHAMPIONS")}</div>
                    <div className="v">{champions}</div>
                    <div className="f">{L("Réutilisés > 5 fois", "Reused > 5 times")}</div>
                  </div>
                </div>
              </div>

              <div className="ml-search-row">
                <div className="ml-search"><Icon name="search" size={13}/> {L("Rechercher un matériau, une marque, un tag…", "Search a material, brand or tag…")}</div>
                <div className="ml-select">{L("Plus utilisés", "Most used")} <span>▾</span></div>
                <div className="ml-select">{L("Filtres", "Filters")}</div>
                <div className="ml-viewtoggle"><span className="is-active"><Icon name="menu-grid" size={12}/></span><span><Icon name="menu" size={12}/></span></div>
              </div>

              <div className="ml-chips">
                <button className={`ml-chip ${cat === "Tous" ? "is-active" : ""}`} onClick={() => setCat("Tous")}>
                  {L("Tous", "All")} <em>{countFor("Tous")}</em>
                </button>
                {MAT_CATS_DEF.map((c) => (
                  <button key={c.name} className={`ml-chip ${cat === c.name ? "is-active" : ""}`} onClick={() => setCat(c.name)}>
                    <span className="chip-dot" style={{background: c.dot}}/> {matCatLabel(c.name)} <em>{countFor(c.name)}</em>
                  </button>
                ))}
              </div>

              <div className="ml-body">
                <div className="ml-grid is-wide" ref={gridRef}>
                  {list.map((m) => (
                    <div key={m.id} className="ml-card">
                      {m.champ && <span className="ml-champ" title="Champion">★</span>}
                      <div className="ml-swatch" style={{ background: m.bg }}>
                        {m.projets.length === 0 && <span className="ml-unused">{L("Jamais utilisé", "Never used")}</span>}
                        <div className="ml-hover-actions">
                          <span className="mha-champ"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg> {L("CHAMPION", "CHAMPION")}</span>
                          <span className="mha-ico" title={L("Modifier", "Edit")}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3l4 4L7 21H3v-4z"/></svg></span>
                          <span className="mha-ico" title={L("Dupliquer", "Duplicate")}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg></span>
                          <span className="mha-use">→ {L("Utiliser", "Use")}</span>
                          <span className="mha-ico" title={L("Supprimer", "Delete")}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg></span>
                        </div>
                      </div>
                      <div className="ml-card-body">
                        <div className="ml-card-cat"><span className="chip-dot" style={{background: catDot(m.cat)}}/>{matCatLabel(m.cat).toUpperCase()}</div>
                        <div className="ml-card-name">{m.name}</div>
                        {m.size && <div className="ml-card-size">{m.size}</div>}
                        <div className="ml-card-desc">{m.marque} · {m.ref} · <b>{m.prix}</b></div>
                        {m.tags && <div className="ml-card-tags">{m.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </main>
          </div>
          {addOpen && <MatAddModal onClose={() => setAddOpen(false)}/>}
        </div>

        <div className="mat-hint"><span className="pulse-dot"/>{L("Démo interactive, filtrez par catégorie et ouvrez « Ajouter » pour créer une fiche matériau", "Interactive demo, filter by category and open “Add” to create a material sheet")}</div>
      </div>
    </section>
  );
};

/* Popup « Ajouter un matériau », réplique du vrai écran */
const MatAddModal = ({ onClose }) => {
  const [mode, setMode] = React.useState("manuel");
  const [selCat, setSelCat] = React.useState("Sols");
  return (
    <div className="mam-overlay" onClick={onClose}>
      <div className="mam-modal" onClick={(e) => e.stopPropagation()}>
        <button className="mam-close" onClick={onClose} aria-label={L("Fermer", "Close")}>×</button>
        <div className="mam-head">
          <div className="mam-eyebrow">{L("BIBLIOTHÈQUE · NOUVEAU MATÉRIAU", "LIBRARY · NEW MATERIAL")}</div>
          <h4 className="mam-title">{L("Ajouter un ", "Add a ")}<em>{L("matériau", "material")}</em></h4>
          <p className="mam-sub">{L("Capitalisez un favori, réutilisable en un clic dans tous vos projets.", "Capture a favourite, reusable in one click across all your projects.")}</p>
        </div>
        <div className="mam-body">
          <div className="mam-form">
            <div className="mam-tabs">
              <button className={mode === "manuel" ? "is-active" : ""} onClick={() => setMode("manuel")}><Icon name="doc" size={11}/> {L("Saisie manuelle", "Manual entry")}</button>
              <button className={mode === "url" ? "is-active" : ""} onClick={() => setMode("url")}><Icon name="globe" size={11}/> {L("Depuis une URL", "From a URL")}</button>
            </div>
            <label className="mam-label">{L("NOM DU MATÉRIAU *", "MATERIAL NAME *")}</label>
            <div className="mam-input ph">{L("Carrelage grès cérame mat 60×60", "Matte porcelain tile 60×60")}</div>
            <label className="mam-label">{L("CATÉGORIE", "CATEGORY")}</label>
            <div className="mam-cats">
              {MAT_CATS_DEF.map((c) => (
                <button key={c.name} className={`mam-cat ${selCat === c.name ? "is-active" : ""}`} onClick={() => setSelCat(c.name)}>
                  <span className="chip-dot" style={{background: c.dot}}/> {matCatLabel(c.name)}
                </button>
              ))}
            </div>
            <div className="mam-row2">
              <div>
                <label className="mam-label">{L("MARQUE", "BRAND")}</label>
                <div className="mam-input ph">Mutina</div>
              </div>
              <div>
                <label className="mam-label">{L("RÉFÉRENCE", "REFERENCE")}</label>
                <div className="mam-input ph mono">PUDDLE-AVENA</div>
              </div>
            </div>
            <div className="mam-row2 price">
              <div>
                <label className="mam-label">{L("PRIX", "PRICE")}</label>
                <div className="mam-input ph">0,00</div>
              </div>
              <div>
                <label className="mam-label">&nbsp;</label>
                <div className="mam-input">€/u <span className="mam-caret">▾</span></div>
              </div>
            </div>
            <label className="mam-label">{L("TAILLE (facultatif)", "SIZE (optional)")}</label>
            <div className="mam-input ph">{L("Ex : 40×40, 60×60, H200×L80…", "E.g. 40×40, 60×60, H200×W80…")}</div>
            <label className="mam-label">{L("DESCRIPTION", "DESCRIPTION")}</label>
            <div className="mam-input area ph">{L("Notes, finitions, calepinage…", "Notes, finishes, layout…")}</div>
          </div>
          <div className="mam-photos">
            <label className="mam-label">{L("PHOTO PRINCIPALE", "MAIN PHOTO")}</label>
            <div className="mam-drop">
              <div className="mam-drop-icon"><Icon name="arrow-right" size={15} style={{transform:"rotate(-90deg)"}}/></div>
              <b>{L("Glissez une photo ou cliquez", "Drop a photo or click")}</b>
              <span>{L("JPG ou PNG, ratio 4/5 recommandé", "JPG or PNG, 4/5 ratio recommended")}</span>
            </div>
            <label className="mam-label">{L("PHOTO SECONDAIRE (facultatif · visible au survol)", "SECONDARY PHOTO (optional · shown on hover)")}</label>
            <div className="mam-drop sm">
              <div className="mam-drop-icon"><Icon name="arrow-right" size={15} style={{transform:"rotate(-90deg)"}}/></div>
              <b>{L("Glissez une 2ᵉ photo ou cliquez", "Drop a 2nd photo or click")}</b>
              <span>{L("Apparaît au survol / toucher de la carte", "Appears on card hover / touch")}</span>
            </div>
            <label className="mam-label">{L("APERÇU DE LA CARTE", "CARD PREVIEW")}</label>
            <div className="mam-preview">
              <div className="mam-preview-img"><Icon name="layers" size={16}/></div>
            </div>
          </div>
        </div>
        <div className="mam-foot">
          <span className="mam-foot-note">{L("Enregistré dans votre bibliothèque, réutilisable sur tous vos projets", "Saved to your library, reusable across all your projects")}</span>
          <button className="mam-cancel" onClick={onClose}>{L("Annuler", "Cancel")}</button>
          <button className="mam-submit" onClick={onClose}>{L("Ajouter à ma bibliothèque", "Add to my library")}</button>
        </div>
      </div>
    </div>
  );
};

/* Manifesto, words fill in as you scroll */
const Manifesto = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".mword");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = 1));
      return;
    }
    gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.6,
      },
    });
  }, []);

  const parts = [
    { t: L("Votre métier, c'est de dessiner des lieux qui durent.", "Your craft is designing places that last.") },
    { t: L("Pas de relancer des emails,", "Not chasing emails,") },
    { t: L("ni de chercher une référence dans trois carnets.", "nor hunting a reference through three notebooks.") },
    { t: L("ALBA reprend la charge mentale du projet —", "ALBA takes over the project's mental load —") },
    { t: L("vous reprenez le crayon.", "you take back the pencil."), gold: true },
  ];

  return (
    <section className="manifesto">
      <div className="container">
        <div className="manifesto-eyebrow"><span className="eyebrow">{L("Notre conviction", "What we believe")}</span></div>
        <p className="manifesto-text" ref={ref}>
          {parts.map((part, pi) =>
            part.t.split(" ").map((w, wi) => (
              <React.Fragment key={`${pi}-${wi}`}>
                <span className={`mword ${part.gold ? "gold" : ""}`}>{w}</span>{" "}
              </React.Fragment>
            ))
          )}
        </p>
      </div>
      <PainScroll/>
    </section>
  );
};

/* Pain scroll, pinned, one pain at a time, scroll-driven */
const PAIN_ITEMS_FR = [
  "Relancer un client pour la 3ᵉ fois sur la même validation.",
  "Retrouver « plan-final-V7-DEF-ok(2).pdf » dans les emails.",
  "Un arbitrage oral contesté un an plus tard.",
  "Ressaisir la même référence matériau à chaque projet.",
  "Des appels à 21h pour savoir où en est le chantier.",
  "Trois Drive, deux boîtes mail, zéro source de vérité.",
  "Un BET qui travaille sur une version périmée des plans.",
];
const PAIN_ITEMS_EN = [
  "Chasing a client for the 3rd time on the same approval.",
  "Digging “plan-final-V7-DEF-ok(2).pdf” out of your inbox.",
  "A verbal decision disputed a year later.",
  "Re-typing the same material reference on every project.",
  "9pm calls asking where the site is at.",
  "Three Drives, two inboxes, zero source of truth.",
  "An engineer working from outdated plans.",
];

const PainScroll = () => {
  const items = L(PAIN_ITEMS_FR, PAIN_ITEMS_EN);
  const n = items.length;
  const sectionRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const [prog, setProg] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      let p = -el.getBoundingClientRect().top / total;
      p = Math.max(0, Math.min(1, p));
      setProg(p);
      setActive(Math.min(n, Math.floor(p * (n + 1))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [n]);

  const scrollBy = (steps) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = steps >= n ? top + total + 8 : top + total * Math.min(1, (active + 1 + 0.5) / (n + 1));
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: steps >= n ? 1.1 : 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="pain-scroll" ref={sectionRef} style={{ height: `${(n + 1) * 60}vh` }}>
      <div className={`pain-stage ${active === n ? "is-final" : ""}`}>
        <div className="pain-stage-eyebrow pain-eyebrow-pains">{L("Votre quotidien, aujourd'hui", "Your daily grind, today")}</div>
        <div className="pain-stage-body">
          {items.map((p, i) => (
            <p key={i} className={`pain-line ${active === i ? "is-active" : active > i ? "is-past" : ""}`}>
              {p}
            </p>
          ))}
          <p className={`pain-line pain-final ${active === n ? "is-active" : ""}`}>
            {L(<>ALBA efface <em>chacune</em> de ces frictions.</>, <>ALBA erases <em>every one</em> of these frictions.</>)}
          </p>
        </div>
        <div className="pain-stage-foot" style={{ opacity: active === n ? 0 : 1, pointerEvents: active === n ? "none" : "auto" }}>
          <span className="pain-count">{String(Math.min(active + 1, n)).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <span className="pain-bar"><span style={{ width: `${prog * 100}%` }}/></span>
          <span className="pain-controls">
            <button type="button" className="pain-next" onClick={() => scrollBy(1)} aria-label={L("Suivant", "Next")}>
              <Icon name="arrow-right" size={13} style={{transform: "rotate(90deg)"}}/>
            </button>
            <button type="button" className="pain-skip" onClick={() => scrollBy(n)}>{L("Passer", "Skip")}</button>
          </span>
        </div>
      </div>
    </div>
  );
};

window.Materials = Materials;
window.Manifesto = Manifesto;
