# Vérifications de la page de vente

Ce dossier ne fait pas partie du site. Il contient les vérifications, et les
dépendances de l'outil de transpilation (`outils/transpiler.mjs`).

Le site publié, lui, n'a aucune dépendance : c'est du HTML statique servi tel
quel. La seule étape préalable est la transpilation des `.jsx` en `.js`, ajoutée
pour retirer `'unsafe-eval'` de la politique de sécurité du contenu. Elle produit
des fichiers versionnés ; Cloudflare ne construit rien.

## Pourquoi ils existent

La page a été livrée une fois **entièrement blanche** — logo affiché, rien
derrière. La cause était une référence manquante (`useTweaks`, défini dans un
fichier absent du paquet de passation), et elle n'avait été détectée par aucune
vérification préalable.

La raison de cet angle mort mérite d'être retenue : les contrôles précédents
servaient la page mais **sans jamais exécuter React ni Babel**, faute d'accès à
unpkg depuis l'environnement de travail. Ils prouvaient que les fichiers se
chargeaient, jamais que la page marchait. Un test qui ne peut pas échouer ne
sert à rien.

`smoke.mjs` sert donc React, GSAP et Lenis depuis npm, applique la vraie
politique de sécurité du contenu, et vérifie ce qui compte : que les sections
sont réellement dans le DOM. (Babel n'y figure plus : il ne s'exécute plus dans
le navigateur.)

## Lancer

```sh
cd tests
npm install
npm test
```

Chromium est cherché dans `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
Ailleurs, indiquez-le : `CHROMIUM_PATH=/usr/bin/chromium npm test`.

## Ce que chaque script vérifie

### `smoke.mjs` — la page fonctionne-t-elle ?

Sur `/`, `/tarifs` et `/mentions-legales` :

- **aucune erreur JavaScript** — c'est ce qui manquait le jour de la page blanche ;
- **aucun refus de Content-Security-Policy**, la CSP étant lue directement dans
  `_headers` pour tester celle qui sera réellement déployée ;
- **les sections sont montées** : accueil, pour qui, fondateur, sécurité, FAQ,
  contact, carte tarifaire, pied de page ;
- **le rideau d'introduction se lève** (`display: none`) ;
- **le CTA du configurateur porte ses paramètres** :
  `?plan=studio&storage=…&billing=…&seats=…` ;
- **les empreintes `integrity` sont exactes** — elles sont conservées, et c'est
  Chromium qui les vérifie. Une empreinte fausse fait refuser le script et donne
  une page blanche en production ;
- **les quatre emplacements photo montrent quelque chose** — la photo si le
  fichier est là, le cartouche neutre sinon, jamais l'icône d'image cassée. Les
  emplacements sont câblés sur leur nom de fichier définitif avant l'arrivée des
  photos : le test liste celles qui manquent encore (`⏳`) au lieu de compter
  leur 404 comme une erreur, et échoue sur un 404 portant sur autre chose ;
- **le formulaire de contact confirme proprement** — le test l'envoie pour de
  bon. Dans le paquet d'origine, l'appel `L()` du message de succès n'était pas
  entre accolades : le visiteur lisait ``L(`Merci, $Anthony…`, `Thank you…`)``
  à l'écran après avoir envoyé sa demande.

### `contenu.mjs` — la couche de contenu tient-elle ?

Quatre contrôles :

- **aucune bibliothèque ne revendique `Txt`.** GSAP et Lenis sont chargés en
  scripts classiques : leurs noms minifiés d'une lettre deviennent des globaux
  (`E L R T W _ f k u w x y z`…). Cet utilitaire s'appelait `T()` au premier
  jet — or `T` est la classe `VirtualScroll` de Lenis. La page d'accueil ne
  montait plus rien du tout. C'est ce test qui l'a attrapé ;
- **le filet tient** : servi avec un `contenu.js` volontairement invalide, la
  page s'affiche entière avec les textes du code ;
- **le remplacement prend effet** : une clé témoin substituée apparaît bien à
  l'écran. Un filet qui tient parce que rien ne passe jamais ne servirait à rien ;
- **les clés se correspondent dans les deux sens** : pas d'appel sans entrée
  (l'édition n'aurait aucun effet), pas d'entrée sans appel (on éditerait un
  texte invisible).

### `transpile.mjs` — les `.js` publiés correspondent-ils aux `.jsx` ?

C'est le prix de la transpilation préalable, et il faut le payer explicitement :
il y a deux versions de chaque composant dans le dépôt, la source et le produit.
Modifier un `.jsx` sans relancer `node outils/transpiler.mjs` laisse le site
servir l'ancienne version — **sans erreur, sans page blanche, sans rien qui le
signale**. Ce test rejoue la transpilation en mémoire et compare.

Il vérifie aussi les trois conditions qui permettent à la CSP de se passer de
`'unsafe-eval'` et de `'unsafe-inline'` : aucune page ne charge Babel, aucune ne
charge un `.jsx`, aucune ne contient de script en ligne. Et que tout script
tiers porte une empreinte `integrity`.

Éprouvé en ajoutant une ligne à `founder.jsx` sans régénérer : le test signale
bien `founder.js` à régénérer.

### `formulaire.mjs` — le formulaire de contact envoie-t-il vraiment ?

Ce formulaire **n'envoyait rien**. Il validait les champs, affichait « Merci,
nous vous recontactons sous 24 h », et jetait la demande : aucune requête réseau
n'existait dans toute la page. La panne était invisible des deux côtés — le
visiteur lisait une confirmation, l'éditeur ne voyait rien arriver sans savoir
pourquoi.

Le test le plus important de ce fichier n'est donc **pas** celui du succès :
c'est celui de l'échec. Une confirmation affichée alors que rien n'est parti,
c'est exactement le défaut d'origine. Trois cas :

- le serveur accepte → la confirmation s'affiche, et la charge utile est
  inspectée (nom, e-mail, langue, champ-piège vide, instant d'affichage) ;
- **le serveur refuse** → aucune confirmation, un message d'erreur qui donne
  l'adresse e-mail comme porte de sortie ;
- le réseau tombe → même chose.

Les réponses sont simulées : le test ne dépend d'aucun réseau, et peut provoquer
l'échec à volonté — ce qu'un appel réel ne permettrait pas.

### `entetes.mjs` — la posture de sécurité est-elle intacte ?

Sans navigateur ni réseau : il analyse `_headers` et vérifie chaque décision qui
y est argumentée — en-têtes de sécurité, directives de CSP, origines tierces
autorisées, politique de cache.

Son rôle n'est pas de prouver que la page marche (`smoke.mjs` le fait en
appliquant cette même CSP dans Chromium) mais **d'empêcher qu'un durcissement
soit défait sans qu'on le remarque**. Les origines tierces sont énumérées : en
ajouter une fait échouer le test, ce qui force à en faire un choix explicite.

Trois absences sont assertées, pas oubliées : `'unsafe-eval'` et
`'unsafe-inline'` ne doivent pas revenir dans `script-src` — c'est tout l'objet
de la transpilation préalable — et `preload` sur HSTS engagerait l'apex, dont
nous ne maîtrisons pas les en-têtes.

### `bascule.mjs` — la migration vers l'apex tiendra-t-elle ?

Sert `config.js` avec `app.alba-studio.co` à la place de l'origine actuelle, et
vérifie que **tous** les liens vers l'application suivent — sans toucher aux
adresses email. Un premier passage avait justement révélé que les liens des
mentions légales ne suivaient pas.

Voir `MIGRATION-APEX.md` pour le déroulé complet de la bascule.

## En ajouter

Quand un bug atteint la production, ajoutez-lui un test **et vérifiez qu'il
échoue avant le correctif**. Les deux scripts ont été éprouvés ainsi : en
remettant le bug, `smoke.mjs` rapporte bien `ReferenceError: useTweaks is not
defined` et zéro section montée.
