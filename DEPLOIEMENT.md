# Déploiement de la page de vente

Vitrine statique ALBA Studio → **Cloudflare Pages**, servie sur `www.alba-studio.co`.

---

## ⚠️ État au 30 juillet 2026 — ce chapitre décrit la situation d'AVANT

Le dépôt de l'application a depuis basculé sur `app.alba-studio.co`, et la
vitrine doit prendre l'apex. **L'état courant et ce qu'il reste à faire sont dans
`MIGRATION-APEX.md`.** Ce qui suit est conservé parce que le raisonnement reste
la raison d'être de l'ordre choisi.

**L'application web occupait l'apex `alba-studio.co`, et l'app iOS le chargeait en direct.**

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

Cloudflare ne construit rien : le projet est du HTML statique, avec React chargé
depuis un CDN. Les `.jsx` sont transpilés **avant** publication et les `.js`
produits sont versionnés (voir « Le code, lui, demande une transpilation »).

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
| `robots.txt` | indexation ouverte, documents internes exclus, déclaration du sitemap |
| `sitemap.xml` | trois adresses publiques de la vitrine |

### À propos de la CSP

`script-src 'self' https://unpkg.com`, **sans `'unsafe-eval'` ni
`'unsafe-inline'`**, et `connect-src 'none'`.

Ce n'était pas le cas au départ : la page transpilait ses `.jsx` dans le
navigateur avec Babel standalone, c'est-à-dire de l'évaluation de code à la
volée. `'unsafe-eval'` était alors obligatoire — et une CSP qui autorise l'eval
ne protège de rien contre une injection de script. La transpilation préalable
(voir « Modifier le code » plus haut) a supprimé ce besoin ; sortir les trois
blocs `<script>` en ligne a supprimé celui de `'unsafe-inline'`.

Les cinq scripts tiers portent tous une empreinte `integrity` : un unpkg
compromis ne peut pas leur substituer autre chose, le navigateur refuserait.

`style-src` garde `'unsafe-inline'` : React pose des styles par attribut `style`
et les pages ont des blocs `<style>`. Un style injecté ne s'exécute pas, le
risque n'a rien de comparable.

Vérifiée dans Chromium sur les trois pages : aucun refus. `tests/entetes.mjs`
verrouille chaque décision, `tests/transpile.mjs` vérifie qu'aucune page ne
réintroduit un script en ligne ou un `.jsx`.

### À propos du cache

Aucun nom de fichier ne porte d'empreinte (pas de `styles.a1b2c3.css` : la
transpilation produit `x.js` à partir de `x.jsx`, sans empreinte). Le HTML, le
CSS et le JavaScript sont donc revalidés à chaque visite, faute de quoi une mise
à jour resterait invisible chez les visiteurs.
Images et médias sont mis en cache une semaine.

---

## Le formulaire de contact

Il poste vers la fonction **`contact-vitrine`** (dépôt de l'application), qui
enregistre la demande dans `demo_requests` **puis** notifie par e-mail — dans cet
ordre, pour qu'une panne d'e-mail ne fasse pas disparaître la demande.

Aucune clé ni SDK dans la vitrine : le point d'entrée est public
(`verify_jwt = false`), un simple `fetch` suffit. La CSP nomme cette origine, et
elle seule.

**À faire avant que ça fonctionne réellement** — côté Supabase :

1. appliquer la migration `20260730140000_demandes_de_demo_vitrine.sql` ;
2. déployer la fonction `contact-vitrine` ;
3. renseigner les secrets : `RESEND_API_KEY` (déjà présent si les autres e-mails
   partent), et facultativement `CONTACT_NOTIFICATION_EMAIL` (défaut
   `contact@alba-studio.co`) et `IP_HASH_SALT`.

Tant que ce n'est pas fait, l'envoi échoue **visiblement** : le visiteur voit un
message d'erreur avec l'adresse e-mail, et non une fausse confirmation.

## Points restants

### Photos

`image-slot.js` **ne figurait pas dans le paquet de passation** alors qu'il était
référencé. Il a été réécrit au minimum pour que la page ne montre pas quatre
trous. Les quatre emplacements sont désormais câblés sur leur nom de fichier
définitif : il suffit de déposer le fichier dans `images/`, sans toucher au code.
Voir « Modifier les textes et les images » plus haut. Le portrait du fondateur
est en place ; les trois avatars de témoignages sont encore attendus — et leur
sort dépend d'abord du point 7 de `COHERENCE-PROMESSES.md`, qui demande si ces
témoignages sont réels.

### Panneau de réglage du design

`tweaks-panel.jsx` manquait aussi. C'était un outil d'auteur qui basculait
`data-palette` / `data-density` / `data-typo` en direct : il n'a rien à faire en
production. Sa référence a été retirée d'`index.html`. Le `<body>` porte la
combinaison validée (`studio` / `standard` / `serif`).

## Modifier les textes et les images

Les deux se font sans toucher au code, et sans risque de casser la page.

### Les textes — `contenu.js`

Les 232 textes de vente y sont regroupés par section, en français et en anglais,
avec des commentaires qui indiquent où chacun s'affiche. On l'ouvre sur
github.com, on modifie ce qui est entre guillemets, on enregistre : Cloudflare
redéploie en une trentaine de secondes.

**Ce fichier ne peut pas casser la page.** Les textes d'origine restent inscrits
dans le code comme valeurs de repli, et `contenu.js` n'est qu'une couche de
remplacement. Accolade manquante, virgule oubliée, clé mal écrite : le texte
d'origine s'affiche à cet endroit, rien d'autre ne bouge. C'est délibéré — la
page transpile son JSX **dans le navigateur**, donc aucune étape de build ne
rattraperait une faute de frappe faite directement dans un `.jsx`, où elle
donnerait une page blanche.

Ce qui n'est pas dans `contenu.js`, volontairement : les libellés qui calculent
un prix (« Vous économisez 108 € par an »), qui sont des calculs et non des
textes, et le faux contenu des maquettes de l'application.

### Les images — dossier `images/`

Les quatre emplacements photo sont câblés sur leur nom de fichier définitif. Il
suffit de déposer le fichier dans `images/` :

| Fichier attendu | Où il s'affiche | État |
|---|---|---|
| `founder-portrait.jpg` | portrait du fondateur (cadrage vertical 4/5) | fourni |
| `testi-camille.jpg` | avatar du premier témoignage (carré) | en attente |
| `testi-marc.jpg` | avatar du deuxième témoignage | en attente |
| `testi-sophie.jpg` | avatar du troisième témoignage | en attente |

Tant qu'un fichier est absent, l'emplacement affiche son cartouche doré neutre.
Aucune icône d'image cassée, aucune ligne de code à modifier. Le nom du fichier
doit être **exactement** celui du tableau : déposé sous un autre nom, il ne
s'affiche pas, et la console du navigateur indique alors le chemin attendu.

Le cadre du portrait est en `aspect-ratio: 4/5` (voir `founder.css`) : une photo
dans ce rapport se pose sans aucun recadrage. `founder-portrait.jpg` fait
1122 × 1402 px, soit exactement 0,800.

### Poids des images — la règle appliquée

Les photos sont enregistrées en **JPEG progressif, qualité 86**, redimensionnées
au **double de leur taille d'affichage réelle** (mesurée dans le navigateur, pas
estimée). Le PNG n'est gardé que là où la transparence est réellement utilisée.

Le dossier est passé de **7,2 Mo à 1,9 Mo** sans différence visible :

| Fichier | Avant | Après | Ce qui a été fait |
|---|---|---|---|
| `images/pause-lecture.jpg` | 4,1 Mo | 175 Ko | 4403 px de large pour un affichage de 481 px → ramené à 1100 px |
| `images/villa-interieur.jpg` | 764 Ko | 382 Ko | ramené à 1600 px |
| `images/escalier-spirale.jpg` | 438 Ko | 95 Ko | ramené à 800 px |
| `images/chateau-a-renover.jpg` | 202 Ko | 122 Ko | réencodé (déjà sous la densité double) |
| `images/logo-alba.png` | 228 Ko | 19 Ko | 1000 px pour un affichage de 52 px → ramené à 256 px |
| `uploads/ordinateur-crop.png` | 256 Ko | 57 Ko | quantifié, qualité validée 98-100 par pngquant |
| `uploads/mobile-crop.png` | 450 Ko | 357 Ko | recompression sans perte |
| `uploads/tablette-crop.png` | 436 Ko | 338 Ko | recompression sans perte |

Les deux derniers ne descendent pas plus bas volontairement : la quantification
gagnait un facteur 4 mais introduisait un tramage visible sur les tons chair et
les aplats clairs de la maquette. Un gain de poids ne vaut pas une dégradation
visible sur ce qui *est* l'argument de vente.

`images/app-cockpit-web.jpg` et `images/signature-anthony.png` sont laissés tels
quels : ils sont déjà sous la taille nécessaire en densité double.

Appliquez la même règle aux trois avatars de témoignages : JPEG qualité 86,
carrés, environ 176 px de côté suffisent (affichage 44 px, densité double, marge).

### Le code, lui, demande une transpilation

Les composants sont écrits en JSX (`.jsx`) et **transpilés avant publication** en
`.js`, qui sont les fichiers réellement servis. C'est ce qui permet à la page de
se passer de `'unsafe-eval'`.

Après toute modification d'un `.jsx` :

```sh
node outils/transpiler.mjs
```

Les deux versions sont versionnées. Oublier de régénérer ne casse rien
visiblement : le site continue de servir l'ancienne version, sans erreur ni page
blanche. C'est précisément pour ça que `tests/transpile.mjs` refuse de passer
quand un `.js` ne correspond plus à son `.jsx`.

**Rien de tout cela pour un texte** : `contenu.js` est du JavaScript ordinaire,
modifiable sur github.com sans aucune transpilation.

### Avant de publier une série de modifications

```sh
cd tests && npm test
```

Le contrôle vérifie que les clés se correspondent, que le remplacement prend
effet, que le filet tient, et que la page se monte réellement dans un navigateur.

### Le doublon `Alba Studio - Landing.html`

Il est maintenu identique à `index.html` (une copie, pas une modification
parallèle) et redirigé en 301 vers `/` pour éviter le contenu dupliqué. Il peut
être supprimé le jour où plus rien ne le référence.
