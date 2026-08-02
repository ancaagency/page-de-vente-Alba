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
          <h2>{Txt("fondateur.alba-est-ne-sur-un-chantier", "Au départ, ", "At the start, ")}<em>{Txt("fondateur.pas-dans-un-open-space", "je venais juste mesurer les murs.", "I just came to measure the walls.")}</em></h2>
          <p>{Txt("fondateur.pendant-des-annees-j-ai-vu", "Mon métier, c'est le relevé. J'arrive dans une maison vide, je mesure les murs, les hauteurs, les décalages que personne n'avait vus, et j'en ressors un modèle 3D, des plans 2D, souvent les photos qui vont avec. Ce sont des architectes qui m'appellent pour ça. Depuis deux ans, je passe donc mes semaines dans leurs agences, entre deux relevés.", "My trade is surveying. I turn up in an empty house, measure the walls, the heights, the misalignments nobody had noticed, and come away with a 3D model, 2D drawings, often the photographs too. Architects are the ones who call me in. For two years now I've spent my weeks inside their practices, between two surveys.")}</p>
          <p>{Txt("fondateur.ce-temps-la-ne-produit-rien", "Un matin, un architecte me redemande un plan livré trois mois plus tôt. Le lien de téléchargement avait expiré. On a cherché ensemble dans sa boîte mail : trois versions du même fichier, et aucun moyen de savoir laquelle son client avait validée. Il a fini par rappeler son maître d'ouvrage pour lui reposer une question à laquelle celui-ci avait déjà répondu.", "One morning, an architect asked me for a drawing I had delivered three months earlier. The download link had expired. We searched his inbox together: three versions of the same file, and no way of telling which one his client had signed off. He ended up phoning the client to ask again a question the man had already answered.")} <b>{Txt("fondateur.alba-existe-pour-le-rendre-a", "Ce n'est pas lui qui travaillait mal. Il n'avait rien pour se souvenir à sa place.", "He wasn't the one doing his job badly. He simply had nothing to remember for him.")}</b></p>
          <p>{Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "J'ai vu cette scène assez de fois pour arrêter de la trouver normale. ALBA est né là : un endroit où le plan, la version validée et la personne qui a validé tiennent ensemble, six mois après comme le premier jour. Chaque écran part d'une demande d'agence, notée sur un carnet entre deux relevés. Et quand vous écrivez, c'est encore moi qui réponds.", "I saw that scene often enough to stop finding it normal. ALBA was born there: one place where the drawing, the approved version and the person who approved it hold together, six months on as on day one. Every screen starts from a request made by a practice, jotted in a notebook between two surveys. And when you write in, I'm still the one who answers.")}</p>
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
