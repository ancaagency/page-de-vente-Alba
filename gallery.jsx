/* Gallery — Humain & Architecture */

const Gallery = () => {
  const tiles = [
    { cls: "g-1", img: "images/chateau-a-renover.jpg",  eyebrow: L("RÉNOVATION · VAL DE LOIRE", "RENOVATION · LOIRE VALLEY"), h: L("Château à rénover, suivi complet dans ALBA", "Château to renovate, fully tracked in ALBA"), alt: "Château Renaissance au bord de l'eau, projet de rénovation" },
    { cls: "g-2", img: "images/pause-lecture.jpg",      eyebrow: L("L'ESPRIT ALBA", "THE ALBA SPIRIT"),             h: L("Le temps repris sur la paperasse", "Time won back from paperwork"), alt: "Tasse de thé posée sur des livres devant une fenêtre" },
    { cls: "g-4", quote: true, text: L("« La mémoire du projet, enfin au même endroit que le projet. »", "\"The project's memory, finally in the same place as the project.\""), by: "M. NOIRET · STUDIO MN" },
    { cls: "g-3", img: "images/escalier-spirale.jpg",   eyebrow: L("DÉTAIL D'EXÉCUTION", "CONSTRUCTION DETAIL"),        h: L("Escalier hélicoïdal, béton & chêne", "Spiral staircase, concrete & oak"), alt: "Escalier en spirale vu du dessus, béton et bois" },
    { cls: "g-5", img: "images/villa-interieur.jpg",    eyebrow: L("LIVRAISON", "DELIVERED"),                h: L("Villa contemporaine, bois & lumière", "Contemporary villa, timber & light"), alt: "Intérieur de villa contemporaine, plafond bois et grandes baies" },
  ];
  return (
    <div className="gallery-embed">
      <Reveal className="gallery-intertitle">
        <span className="gi-rule"></span>
        <span>{L("Dans les coulisses de leurs projets", "Behind the scenes of their projects")}</span>
        <span className="gi-rule"></span>
      </Reveal>
      <Reveal className="gallery-grid">
          {tiles.map((t, i) => (
            t.quote ? (
              <div key={i} className={`gtile quote ${t.cls}`}>
                <div className="mark">"</div>
                <p>{t.text}</p>
                <div className="by">{t.by}</div>
              </div>
            ) : (
              <div key={i} className={`gtile ${t.cls}`}>
                <img src={t.img} alt={t.alt} loading="lazy"/>
                <div className="gtile-overlay">
                  <div className="eyebrow">{t.eyebrow}</div>
                  <h4>{t.h}</h4>
                </div>
              </div>
            )
          ))}
      </Reveal>
    </div>
  );
};

window.Gallery = Gallery;
