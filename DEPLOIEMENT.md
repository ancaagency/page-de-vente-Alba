# Déploiement de la page de vente

Vitrine statique ALBA Studio → **Cloudflare Pages**, servie sur `www.alba-studio.co`.

---

## ⚠️ À lire avant toute manipulation DNS

**L'application web occupe déjà l'apex `alba-studio.co`, et l'app iOS le charge en direct.**

`capacitor.config.ts` (dépôt `ancaagency/alba-studio`) contient :

```ts
server: { url: 'https://alba-studio.co' }
```

Le commentaire du fichier précise : « MODE SYNCHRONISÉ : l'app native charge
directement le site en production ». L'application iOS n'embarque pas ses
fichiers : **son WebView télécharge `https://alba-studio.co` à chaque
lancement.**

Conséquence directe :

> Si l'apex se met à servir la page de vente, la grille tarifaire et le bouton
> de checkout s'affichent **à l'intérieur de l'application iOS**. C'est
> exactement la règle 3.1.1 (achat in-app obligatoire, 15–30 % de commission)
> que toute l'architecture cherche à éviter.

S'ajoutent deux dégâts :

1. **Coupure de l'application web** pour tous les utilisateurs navigateur.
2. **Cinq adresses déposées chez Apple et Google tombent en 404.**
   `src/lib/__tests__/legalRoutes.test.ts` les liste : `/privacy-policy`,
   `/terms`, `/suppression-compte`, `/delete-account`, `/faq`. Elles sont
   écrites dans les fiches des boutiques. Une boutique qui reçoit une erreur en
   les ouvrant refuse la soumission.

### Donc : ne touchez pas à l'enregistrement de l'apex

| Nom DNS | Cible | Statut |
|---|---|---|
| `alba-studio.co` (apex) | application web (Lovable) | **NE PAS MODIFIER** |
| `www.alba-studio.co` | Cloudflare Pages (cette vitrine) | à créer |

Le basculement de l'apex vers la vitrine reste possible plus tard, mais c'est
une migration à part entière : elle exige un nouveau build Capacitor validé par
l'App Store, le maintien des cinq adresses légales sur l'apex, et une règle de
périphérie bloquant les User-Agents natifs pendant la transition. Ce n'est pas
un changement DNS.

---

## Étape 1 — Créer le projet Cloudflare Pages

Tableau de bord Cloudflare → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git** → dépôt `ancaagency/page-de-vente-Alba`.

Réglages de build :

| Champ | Valeur |
|---|---|
| Production branch | `main` (ou la branche fusionnée) |
| Framework preset | **None** |
| Build command | *(laisser vide)* |
| Build output directory | `/` |
| Root directory | `/` |

Il n'y a pas d'étape de build : le projet est du HTML statique avec React chargé
depuis un CDN et transpilé par Babel dans le navigateur. C'est volontaire.

À la fin, Cloudflare donne une URL du type `page-de-vente-alba.pages.dev`.
**Validez la page sur cette URL avant de toucher au DNS.**

## Étape 2 — Vérifier l'enregistrement `www` existant

Cloudflare → domaine `alba-studio.co` → **DNS** → **Records**.

Cherchez un enregistrement `www` préexistant. `src/utils/recaptchaConfig.ts:27`
traite `www.alba-studio.co` comme un hôte de production de l'application : il est
probable qu'un `CNAME` ou une règle de redirection `www` → apex existe déjà.

**S'il y en a un, supprimez-le** — sinon il entrera en conflit avec le domaine
personnalisé de Pages.

## Étape 3 — Rattacher le domaine

Projet Pages → **Custom domains** → **Set up a custom domain** →
`www.alba-studio.co`.

Cloudflare crée automatiquement le `CNAME` qui convient (le DNS est déjà chez
lui). Le certificat TLS est émis en quelques minutes.

## Étape 4 — Vérifier que l'application n'a pas bougé

Avant d'annoncer quoi que ce soit :

```sh
# L'application doit toujours répondre sur l'apex
curl -sI https://alba-studio.co | head -1

# Les cinq adresses déposées chez Apple et Google
for p in /privacy-policy /terms /suppression-compte /delete-account /faq; do
  printf '%-22s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://alba-studio.co$p)"
done
```

Les cinq doivent renvoyer `200`.

## Étape 5 — Vérifier la vitrine

```sh
curl -s -o /dev/null -w '%{http_code}\n' https://www.alba-studio.co/
curl -s -o /dev/null -w '%{http_code}\n' https://www.alba-studio.co/tarifs   # 200 (réécriture)
curl -sI https://www.alba-studio.co/Alba%20Studio%20-%20Landing.html | head -1  # 301
```

Dans le navigateur, contrôler :

- le portrait du fondateur et les trois avatars de témoignages (voir
  « Photos manquantes » plus bas) ;
- le carrousel de fonctionnalités et les animations au scroll ;
- le configurateur tarifaire : changer stockage / facturation / collaborateurs
  et vérifier que le bouton pointe bien vers
  `https://alba-studio.co/auth?plan=studio&storage=…&billing=…&seats=…` ;
- le basculement FR / EN ;
- la console : aucun refus de Content-Security-Policy.

## Étape 6 — Vérifier que les documents internes ne sont pas publiés

```sh
curl -s -o /dev/null -w '%{http_code}\n' https://www.alba-studio.co/README.md
```

**Doit répondre `301`.** Le dépôt est public et Cloudflare Pages sert tous les
fichiers ; le cahier des charges détaille la stratégie App Store, il n'a rien à
faire sur le domaine public. Les règles sont dans `_redirects`.

> Si la commande renvoie `200`, c'est que les redirections ne priment pas sur
> les fichiers statiques dans votre configuration. Parade définitive : déplacer
> les fichiers du site dans un sous-dossier `public/`, et renseigner
> `public` comme *Build output directory* à l'étape 1. Seul ce dossier est alors
> publié.

---

## Fichiers de configuration

| Fichier | Rôle |
|---|---|
| `_redirects` | `/tarifs` et `/pricing`, redirection du doublon, mise à l'abri des documents internes, filet pour les adresses légales |
| `_headers` | en-têtes de sécurité, CSP, politique de cache |
| `robots.txt` | indexation ouverte + déclaration du sitemap |
| `sitemap.xml` | trois adresses publiques de la vitrine |

### À propos de la CSP

Elle autorise `'unsafe-eval'` et `'unsafe-inline'` sur les scripts. Ce n'est pas
un oubli : la page transpile ses `.jsx` dans le navigateur avec Babel standalone,
ce qui est de l'évaluation de code à la volée. Les retirer donne une page
blanche. La CSP restreint donc les **origines** joignables, pas l'exécution.

Elle a été vérifiée dans Chromium sur `/` et `/tarifs` : aucun refus.

### À propos du cache

Aucun nom de fichier ne porte d'empreinte (pas de `styles.a1b2c3.css`, puisqu'il
n'y a pas de build). Le HTML, le CSS et le JSX sont donc revalidés à chaque
visite, faute de quoi une mise à jour resterait invisible chez les visiteurs.
Images et médias sont mis en cache une semaine.

---

## Points restants

### Photos manquantes

`image-slot.js` **ne figurait pas dans le paquet de passation** alors qu'il était
référencé. Il a été réécrit au minimum pour que la page ne montre pas quatre
trous. Quatre emplacements attendent encore de vraies images :

| Emplacement | Fichier | Identifiant |
|---|---|---|
| Portrait du fondateur | `founder.jsx:9` | `founder-portrait` |
| Avatar témoignage 1 | `sections.jsx:229` | `testi-camille` |
| Avatar témoignage 2 | `sections.jsx:240` | `testi-marc` |
| Avatar témoignage 3 | `sections.jsx:251` | `testi-sophie` |

Pour poser une photo, ajouter un attribut `src` :

```jsx
<image-slot id="founder-portrait" shape="rect" src="images/portrait-anthony.jpg"
            alt="Anthony Cardona"></image-slot>
```

### Panneau de réglage du design

`tweaks-panel.jsx` manquait aussi. C'était un outil d'auteur qui basculait
`data-palette` / `data-density` / `data-typo` en direct : il n'a rien à faire en
production. Sa référence a été retirée d'`index.html`. Le `<body>` porte la
combinaison validée (`studio` / `standard` / `serif`).

### Builds React de développement

`index.html` charge `react.development.js` et `react-dom.development.js`. Les
builds de production sont plus légers et plus rapides. Le remplacement n'a pas
été fait ici parce que les balises portent des empreintes `integrity` : changer
l'URL sans recalculer le hachage donne une page blanche. À faire d'un bloc, en
récupérant les empreintes des fichiers `.production.min.js` correspondants.

### Le doublon `Alba Studio - Landing.html`

Il est maintenu identique à `index.html` (une copie, pas une modification
parallèle) et redirigé en 301 vers `/` pour éviter le contenu dupliqué. Il peut
être supprimé le jour où plus rien ne le référence.
