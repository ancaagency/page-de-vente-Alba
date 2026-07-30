/* Founder letter, the human behind ALBA */

const Founder = () => (
  <section className="founder-section" id="fondateur">
    <div className="container">
      <Reveal className="founder">
        <div className="founder-photo">
          <div className="frame">
            <image-slot id="founder-portrait" shape="rect" src="images/founder-portrait.jpg" alt="Anthony Cardona, fondateur d'ALBA Studio" placeholder={Txt("fondateur.glissez-votre-portrait-ici", "Glissez votre portrait ici", "Drop your portrait here")}></image-slot>
          </div>
          <div className="founder-badge">
            <div className="fb-logo"><img src="images/logo-alba.png" alt=""/></div>
            <div>
              <div className="fb-name">{Txt("fondateur.nom", "Anthony Cardona", "Anthony Cardona")}</div>
              <div className="fb-role">{Txt("fondateur.fondateur-alba-studio", "Fondateur · ALBA Studio", "Founder · ALBA Studio")}</div>
            </div>
          </div>
        </div>
        <div className="founder-text">
          <span className="eyebrow">{Txt("fondateur.le-mot-du-fondateur", "Le mot du fondateur", "A word from the founder")}</span>
          <h2>{Txt("fondateur.alba-est-ne-sur-un-chantier", "ALBA est né sur un chantier, ", "ALBA was born on a building site, ")}<em>{Txt("fondateur.pas-dans-un-open-space", "pas dans un open space.", "not in an open space.")}</em></h2>
          <p>{Txt("fondateur.pendant-des-annees-j-ai-vu", "Pendant des années, j'ai vu des architectes brillants perdre leurs soirées à chercher un email, relancer une validation, reconstituer l'historique d'une décision prise six mois plus tôt.", "For years, I watched brilliant architects lose their evenings hunting for an email, chasing an approval, piecing together the history of a decision made six months earlier.")}</p>
          <p>{Txt("fondateur.ce-temps-la-ne-produit-rien", "Ce temps-là ne produit rien. Il ne dessine rien. Il use.", "That time produces nothing. It draws nothing. It wears you down.")} <b>{Txt("fondateur.alba-existe-pour-le-rendre-a", "ALBA existe pour le rendre à ceux qui construisent.", "ALBA exists to give it back to the people who build.")}</b></p>
          <p>{Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "Chaque fonctionnalité est testée avec de vraies agences, sur de vrais projets, et si vous nous écrivez, c'est moi qui réponds.", "Every feature is tested with real practices, on real projects, and if you write to us, I'm the one who replies.")}</p>
          <div className="founder-sign">
            <img className="sig-img" src="images/signature-anthony.png" alt="Anthony Cardona"/>
            <span className="sep"></span>
            <span className="who">{Txt("fondateur.fondateur", "Fondateur", "Founder")}<br/>{Txt("fondateur.ville", "Lyon, France", "Lyon, France")} <span className="fr-flag" title="Made in France"></span></span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

window.Founder = Founder;
