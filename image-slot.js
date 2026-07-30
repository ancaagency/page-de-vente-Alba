/* <image-slot> — emplacement photo
 *
 * ⚠️ CE FICHIER NE FAISAIT PAS PARTIE DU PAQUET DE PASSATION.
 * Il était référencé par index.html mais absent des fichiers livrés. Quatre
 * emplacements visibles en dépendent, et sans lui la page affiche quatre trous :
 *   · le portrait du fondateur          (founder.jsx)
 *   · les trois avatars de témoignages  (sections.jsx)
 *
 * Cette implémentation est volontairement minimale : elle rend la vraie image
 * dès qu'on lui en donne une, et sinon un cartouche neutre construit avec les
 * jetons de design existants (--accent, --font-mono). Elle n'invente aucune
 * mise en page : la taille, le rayon et l'ombre viennent de founder.css et
 * sections.css, qui ciblent déjà `image-slot`.
 *
 * POUR POSER LES VRAIES PHOTOS — les quatre emplacements sont déjà câblés sur
 * leur nom de fichier définitif. Il suffit de déposer le fichier dans images/ :
 *   · images/founder-portrait.jpg  (portrait du fondateur, cadrage vertical)
 *   · images/testi-camille.jpg     (avatars de témoignages, carrés)
 *   · images/testi-marc.jpg
 *   · images/testi-sophie.jpg
 * Tant qu'un fichier est absent, l'emplacement retombe sur son cartouche neutre.
 *
 * Attributs : src · alt · shape ("rect" par défaut, ou "circle") · placeholder
 */
(function () {
  'use strict';

  const STYLE = `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: var(--accent-soft, rgba(201,168,106,0.12));
    }
    :host([shape="circle"]) { border-radius: 50%; }
    img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }
    .ph {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8%;
      box-sizing: border-box;
      border: 1px solid var(--accent-line, rgba(201,168,106,0.32));
      font-family: var(--font-mono, ui-monospace, monospace);
      font-size: clamp(9px, 1.6vw, 11px);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent, #C9A86A);
      opacity: 0.75;
      line-height: 1.5;
    }
    :host([shape="circle"]) .ph {
      border-radius: 50%;
      font-size: 12px;
      letter-spacing: 0.04em;
      padding: 2px;
    }
  `;

  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ['src', 'alt', 'placeholder', 'shape']; }

    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) this.render();
    }

    render() {
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt') || '';
      // Sans texte fourni, on n'affiche rien plutôt qu'un mot inventé.
      const placeholder = this.getAttribute('placeholder') || '';

      /* Construction par API DOM, et non par innerHTML.
         Cette méthode assemblait une chaîne HTML en échappant ses variables à la
         main. L'échappement était correct, mais c'était la seule primitive
         d'injection HTML de tout le projet, et un échappement juste aujourd'hui
         ne le reste que si personne ne touche au gabarit. Ici, `textContent` et
         l'affectation de propriété ne peuvent pas produire de balise : il n'y a
         plus rien à échapper, donc plus rien à oublier d'échapper. */
      const racine = this.shadowRoot;
      racine.textContent = '';

      const style = document.createElement('style');
      style.textContent = STYLE;
      racine.appendChild(style);

      if (!src) {
        racine.appendChild(cartouche(placeholder));
        return;
      }

      const img = document.createElement('img');
      img.setAttribute('loading', 'lazy');
      img.alt = alt;
      img.src = src;

      // Repli si le fichier n'est pas là. Les emplacements sont câblés sur leur
      // nom de fichier définitif AVANT que les photos n'arrivent : poser une
      // photo se réduit alors à déposer le fichier dans images/, sans toucher au
      // code. Sans ce repli, un fichier manquant afficherait l'icône d'image
      // cassée du navigateur — pire que le cartouche neutre.
      img.addEventListener('error', () => {
        img.remove();
        racine.appendChild(cartouche(placeholder));
        /* Un fichier déposé sous un autre nom ne s'afficherait pas, et rien ne
           le signalerait : le cartouche est le même que si aucune photo n'avait
           été fournie. On dit donc en clair quel chemin est attendu. */
        if (window.console && console.info) {
          console.info(
            '[image-slot] « ' + src + ' » est introuvable : l\'emplacement affiche son cartouche. ' +
            'Pour poser la photo, déposez le fichier sous CE nom exact (minuscules, extension comprise).'
          );
        }
      }, { once: true });

      racine.appendChild(img);
    }
  }

  /** Cartouche neutre affiché tant qu'aucune image n'est disponible. */
  function cartouche(texte) {
    const div = document.createElement('div');
    div.className = 'ph';
    div.textContent = texte;
    return div;
  }

  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
