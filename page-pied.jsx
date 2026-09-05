/* Montage du PIED DE PAGE seul.

   Partagé par toutes les pages dont le corps est du HTML statique : les
   mentions légales, /co-traitants, /valeur-probante. Elles n'ont besoin de
   React que pour leur pied de page — lequel porte les liens légaux, les badges
   d'application et le lien de retrait du consentement, et doit donc rester
   identique partout.

   Le fichier s'appelait page-mentions.jsx quand une seule page l'utilisait.
   Renommé le jour où il en a servi trois : un nom qui décrit une page ne
   survit pas à sa deuxième utilisation. */

  // Le reste de ces pages est du HTML statique : il s'affiche sans React.
  ReactDOM.createRoot(document.getElementById("footer-root")).render(
    <>
      <Footer/>
      {/* C'est la page où l'on vient justement pour comprendre ce qui est
          déposé : le choix doit pouvoir s'y exprimer et s'y reprendre. */}
      <BandeauConsentement/>
    </>
  );
