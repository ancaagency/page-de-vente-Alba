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
          <p>{Txt("fondateur.pendant-des-annees-j-ai-vu", "Je fais des relevés de mesures. Une maison, un appartement, parfois un immeuble entier. Je mesure tout et je livre un modèle 3D, des plans 2D, et les photos quand on me les demande. Mes clients sont des architectes. Ça fait deux ans, et j'ai fini par apprendre leur métier de l'intérieur.", "I do measured surveys. A house, a flat, sometimes a whole building. I measure everything and deliver a 3D model, 2D drawings, and the photographs when they're asked for. My clients are architects. It's been two years, and I've ended up learning their trade from the inside.")}</p>
          <p>{Txt("fondateur.ce-temps-la-ne-produit-rien", "Ce que je vois chez eux est toujours pareil. Le travail est bon. C'est ce qu'il y a autour qui lâche. Un plan livré en mars qu'on ne retrouve plus en juin. Trois versions d'un même fichier dans une boîte mail. Un accord donné au téléphone dont il ne reste aucune trace.", "What I see at their practices is always the same. The work is good. It's everything around it that gives way. A drawing delivered in March that can't be found in June. Three versions of the same file in an inbox. An agreement made over the phone with no trace left of it.")} <b>{Txt("fondateur.alba-existe-pour-le-rendre-a", "À chaque fois, c'est du travail déjà fait qu'il faut refaire.", "Every time, it means redoing work that was already done.")}</b></p>
          <p>{Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "J'ai fait ALBA pour ça. Tout ce qui concerne un projet reste au même endroit : les documents, les décisions, les échanges avec le client. Je continue les relevés à côté, donc je vois encore ce qui coince et je corrige au fur et à mesure. Et quand vous écrivez au support, c'est moi qui réponds.", "That's why I made ALBA. Everything about a project stays in one place: the documents, the decisions, the exchanges with the client. I still do surveys alongside it, so I still see what jams, and I fix it as I go. And when you write to support, I'm the one who answers.")}</p>
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
