/* Script de page : montage du pied de page des mentions légales.
   Sorti de mentions-legales.html pour la même raison. */

// On ne monte que le pied de page : le reste de la page est du HTML statique,
  // qui n'a besoin ni de React ni de Babel pour s'afficher.
  ReactDOM.createRoot(document.getElementById("footer-root")).render(
    <>
      <Footer/>
      {/* C'est la page où l'on vient justement pour comprendre ce qui est
          déposé : le choix doit pouvoir s'y exprimer et s'y reprendre. */}
      <BandeauConsentement/>
    </>
  );
