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
          <h2>{Txt("fondateur.alba-est-ne-sur-un-chantier", "Je ne suis pas architecte. ", "I'm not an architect. ")}<em>{Txt("fondateur.pas-dans-un-open-space", "Je travaille avec eux depuis deux ans.", "I've been working alongside them for two years.")}</em></h2>
          <p>{Txt("fondateur.pendant-des-annees-j-ai-vu", "Mon métier, c'est le relevé de mesures. Je vais sur site, je relève l'existant, j'en tire un modèle 3D et des plans 2D, souvent les photos qui vont avec. Ce sont des architectes qui me commandent ce travail — c'est comme ça que je suis entré dans leurs agences.", "My trade is measured surveys. I go on site, record the existing building, and produce a 3D model and 2D drawings from it, often the photographs too. Architects are the ones who commission that work — that's how I ended up inside their practices.")}</p>
          <p>{Txt("fondateur.ce-temps-la-ne-produit-rien", "En deux ans, j'ai vu la même scène se répéter : le plan que je viens de livrer dort dans un WeTransfer expiré, la version validée se trouve quelque part dans un fil de mails, et ce qui a été décidé en réunion n'est écrit nulle part.", "In two years I've watched the same scene repeat itself: the drawing I've just delivered sits in an expired WeTransfer, the approved version is somewhere in an email thread, and what was decided in the meeting is written down nowhere.")} <b>{Txt("fondateur.alba-existe-pour-le-rendre-a", "Personne ne travaille mal : c'est l'outil qui manque.", "Nobody is doing their job badly: the tool is what's missing.")}</b></p>
          <p>{Txt("fondateur.chaque-fonctionnalite-est-testee-avec-de", "C'est de là qu'est venu ALBA. Chaque écran part d'une demande précise, formulée par quelqu'un qui avait le problème sous les yeux. Et si vous écrivez, c'est moi qui réponds.", "That's where ALBA came from. Every screen starts from a specific request, made by someone who had the problem in front of them. And if you write in, I'm the one who answers.")}</p>
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
