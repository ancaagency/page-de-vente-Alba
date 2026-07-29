# Passation : page de vente ALBA Studio → intégration technique

## Vue d'ensemble

Page de vente (landing) pour **ALBA Studio**, plateforme SaaS de gestion de projets destinée aux architectes indépendants. Site vitrine bilingue FR/EN, entièrement statique, dont le rôle est d'amener l'architecte vers l'inscription sur l'application (`alba-studio.co/auth`).

**Ce qui est demandé n'est PAS une refonte du design.** Le design est terminé et validé. Le travail restant est **technique** : déploiement, transmission des paramètres d'abonnement, branchement Stripe, pages légales.

## À propos des fichiers de ce paquet

Les fichiers HTML/CSS/JSX inclus sont le **livrable final**, pas une maquette de référence. Il s'agit de HTML statique avec React chargé depuis un CDN et transpilé dans le navigateur par Babel (pas de build). C'est volontaire et suffisant pour une vitrine.

**Ne pas convertir en projet Vite/Next sans raison.** Il a été explicitement décidé de garder la page de vente **séparée** de l'application (voir la contrainte App Store ci-dessous). Une conversion n'apporterait rien et ferait perdre la simplicité de déploiement.

Seule réserve technique : Babel dans le navigateur ajoute ~1s au premier chargement. Si les performances deviennent un enjeu SEO, la bonne réponse est de pré-compiler les `.jsx` en un bundle statique — **pas** de fusionner avec l'app.

## Fidélité

**Haute fidélité, terminé.** Couleurs, typographies, espacements, animations et copie sont définitifs. Ne pas réinterpréter.

---

## ⚠️ CONTRAINTE STRUCTURANTE : commissions App Store / Google Play

**Décision d'architecture prise après conseil : le paiement ne doit JAMAIS apparaître dans les applications mobiles.**

Les apps mobiles iOS/Android sont (ou seront) un habillage de la web app — même backend, même base Supabase. Le risque : si la grille tarifaire ou le checkout Stripe s'affichent dans l'app iOS, Apple applique la règle 3.1.1 (achat in-app obligatoire, commission 15–30 %) et refuse la soumission.

**Le motif invoqué pour s'en protéger est la règle 3.1.3(b) « Multiplatform Services »** : l'app est le compagnon d'un service disponible sur une autre plateforme (le web), l'utilisateur se connecte à un compte existant, et aucun commerce n'est présenté dans l'app.

### Règles à respecter absolument

| Où | Ce qui est autorisé | Ce qui est interdit |
|---|---|---|
| **Site web** (ce projet) | Tout : tarifs, checkout Stripe, inscription | — |
| **Web app** (`alba-studio.co`) sur navigateur | Tout | — |
| **Web app vue depuis l'app mobile** | Connexion, consultation, travail sur les projets | Page Tarifs, bouton « passer en payant », routes de checkout, portail de facturation, écran d'inscription, upsells (« limite atteinte, passez à 150 Go ») |

### Implémentation côté app mobile (à faire dans le repo de l'app, pas ici)

1. Injecter un marqueur de contexte natif : `Capacitor.isNativePlatform()`, ou un `User-Agent` custom type `AlbaApp/iOS`.
2. Derrière ce drapeau, masquer **toute** interface commerciale.
3. **Bloquer aussi les routes côté serveur** quand la requête vient du natif — un reviewer peut accéder à une URL directe, et ça suffit à faire refuser.
4. Remplacer les upsells par un message neutre : « Cette action n'est pas disponible ici. »
5. Ne pas suggérer l'achat sur le web dans la fiche App Store (même interdit que dans l'app).

*Note : ces règles évoluent (les liens externes sont tolérés sur la boutique US depuis 2025, mais pas partout). Faire relire par quelqu'un qui connaît l'App Review avant soumission. Ceci n'est pas un avis juridique.*

---

## TÂCHE 1 — Déploiement

**Stack existante du client :** GitHub (code), Supabase (base + auth), Cloudflare (DNS + sauvegarde). Domaine possédé : `alba-studio.co`.

**Recommandation retenue : Cloudflare Pages** — connecté au repo GitHub, gratuit, HTTPS, CDN, et supporte le format `_redirects` déjà présent dans le projet. Aucun compte supplémentaire à créer puisque le DNS est déjà chez Cloudflare.

Découpage de domaine recommandé :

```
alba-studio.co        → page de vente (Cloudflare Pages)
www.alba-studio.co    → idem (redirection 301 vers l'apex, ou l'inverse)
app.alba-studio.co    → application web
```

**À déterminer avant de configurer le DNS : où l'application est-elle déployée ?** Supabase ne sert que la base et l'auth, pas l'interface. Cette information manque et conditionne les enregistrements DNS.

⚠️ **Si le choix se porte sur `app.alba-studio.co`**, remplacer dans tout le projet `https://alba-studio.co/auth` par `https://app.alba-studio.co/auth`. Occurrences : constante `SIGNUP_URL` en tête de `sections.jsx`, et les attributs `href` des deux CTA de nav dans `Alba Studio - Landing.html` et `index.html` (`id="nav-cta"` et `id="mobile-menu-cta"`).

### Fichiers de déploiement

- `index.html` — copie de `Alba Studio - Landing.html` (Cloudflare Pages sert `index.html` par défaut). **Les deux fichiers doivent rester synchronisés** ; à terme, préférer renommer et supprimer le doublon.
- `_redirects` — mappe `/tarifs` et `/pricing` vers `/Tarifs.html`.

---

## TÂCHE 2 — Transmission des paramètres d'abonnement (le point le plus important)

La page de vente contient un configurateur tarifaire interactif (`Pricing` dans `sections.jsx`). L'architecte y choisit son stockage, sa durée de facturation et son nombre de collaborateurs. **Le CTA transmet déjà ces choix dans l'URL :**

```
https://alba-studio.co/auth?plan=studio&storage=150&billing=yearly&seats=3
```

| Paramètre | Valeurs possibles | Signification |
|---|---|---|
| `plan` | `studio` | Seul plan existant |
| `storage` | `50` \| `150` \| `300` | Go de stockage |
| `billing` | `monthly` \| `yearly` | `yearly` = −18 % |
| `seats` | `1` à `4` | Collaborateurs **au total** (1 inclus dans le prix) |

### À implémenter côté `/auth`

1. **Lire les paramètres à l'arrivée** et les persister (session ou `localStorage`) **avant** l'inscription.
2. **Les faire survivre au parcours complet** : inscription → vérification email → première connexion. *C'est l'endroit où ça casse le plus souvent* : le lien de vérification reçu par email ne contient pas les paramètres d'origine.
3. Après création du compte, **pré-remplir** l'écran d'abonnement avec ces valeurs.
4. 🔒 **TOUJOURS revalider côté serveur.** Un paramètre d'URL est modifiable : quelqu'un peut tenter `storage=300&price=9`. Le prix doit venir exclusivement des `price_id` Stripe. **L'URL ne sert qu'à présélectionner, jamais à tarifer.**
5. Traiter `seats=1` comme « aucun siège supplémentaire » (quantité 0 sur la ligne collaborateur).

### Point ouvert

Les CTA du **haut de page** (hero, nav, bande CTA) pointent vers `/auth` **sans paramètre** — c'est normal, l'architecte n'a pas encore vu la grille. L'app doit donc gérer le cas « aucun paramètre » avec des valeurs par défaut (50 Go, mensuel, 1 collaborateur).

---

## TÂCHE 3 — Stripe

### Grille tarifaire à créer (prix pleins, hors promotion)

Un produit **« Studio »** avec 6 prix :

| Stockage | Mensuel | Annuel (−18 %) | Équivalence affichée |
|---|---|---|---|
| 50 Go | 49 €/mois | 40 €/mois | ≈ 5 projets |
| 150 Go | 69 €/mois | 57 €/mois | ≈ 15 projets |
| 300 Go | 89 €/mois | 73 €/mois | ≈ 30 projets |

Plus un produit **« Collaborateur supplémentaire »** : 15 €/mois, quantité variable (`quantity = seats - 1`, max 3).

*Le calcul annuel dans le code est `Math.round(prix × 0.82)`. Les `price_id` Stripe doivent correspondre exactement aux montants affichés — à vérifier après création.*

### Ce qui est inclus dans l'offre (affiché sur la page)

1 collaborateur inclus (puis 15 €/mois par collaborateur ajouté, 4 max) · clients & co-traitants illimités · stockage selon palier · décisions horodatées & signées · messagerie projet sécurisée · matériauthèque & fournisseurs · CR de chantier, réserves & photos · visionneuse plans navigateur · exports PDF & comptables · marque blanche maître d'ouvrage · support prioritaire 7j/7.

⚠️ **« Projets illimités » a été explicitement retiré** de la liste (ce n'était pas exact). Ne pas le réintroduire.

### Flux de paiement retenu

1. Création de compte → projet gratuit actif (1 projet, gratuit à vie, sans CB).
2. Passage en payant → l'app crée une session **Stripe Checkout** (page hébergée par Stripe, aucun numéro de carte ne transite par votre code).
3. Stripe envoie un **webhook** → marquer le compte comme abonné en base Supabase.
4. **Stripe Customer Portal** pour la gestion autonome (carte, factures, résiliation) — économise énormément de support.

### À activer

**Stripe Tax** : facturation à des professionnels français, TVA obligatoire.

---

## TÂCHE 4 — Pages légales manquantes

Les liens du footer sont morts et sont **exigés par Stripe comme par la loi** pour encaisser :

- CGV / Conditions générales de vente
- Mentions légales
- Politique de confidentialité (RGPD)

Le lien « Sécurité » du footer pointe déjà vers l'ancre `#securite` de la page (bloc Sécurité & données) — fonctionnel, à conserver.

**Cohérence à vérifier :** la page affiche des engagements précis à honorer — hébergement en France chez un hébergeur certifié ISO 27001, chiffrement AES-256 au repos, TLS en transit, sauvegardes quotidiennes, export intégral (PDF/ZIP/CSV), décisions horodatées et signées eIDAS. Ces affirmations doivent correspondre à la réalité de l'infrastructure Supabase/Cloudflare, sinon les corriger sur la page.

---

## TÂCHE 5 — URLs des stores

Les badges App Store / Google Play (footer + volet « Sur le terrain ») pointent actuellement vers `#contact`, en attente des vraies URLs. Composant `StoreBadges` dans `components.jsx`.

---

## Architecture des fichiers

### Point d'entrée

- **`Alba Studio - Landing.html`** — page de vente, monte les sections React dans `#root`
- **`index.html`** — copie pour le déploiement (à synchroniser)
- **`Tarifs.html`** — page tarif autonome (grille + sécurité + FAQ + contact + footer), avec sa propre nav

### Sections (JSX, chargés en `text/babel`)

| Fichier | Contenu |
|---|---|
| `sections.jsx` | Hero, Logos, Pains, Features, Testimonials, Pricing, TrustBand, Faq, Contact, Footer, `SIGNUP_URL` |
| `components.jsx` | `Icon` (bibliothèque SVG), `StoreBadges`, mockups d'app (cockpit, décisions, chantier) |
| `features-carousel.jsx` | Carrousel 5 slides regroupant les démos d'interface |
| `assistant.jsx` | Démo « Léo » — assistant IA, popup + animation d'apparition |
| `weather.jsx` | Démo « Météo chantier » — prévisions + préconisations d'intervention |
| `materials.jsx` | Démo bibliothèque matériaux + manifeste |
| `calendar.jsx` | Démo calendrier |
| `chat.jsx` | Démo messagerie animée |
| `pinned.jsx` | Section « Au bureau / Sur le terrain » (scroll pinné) |
| `audience.jsx`, `founder.jsx`, `gallery.jsx`, `notifications.jsx` | Sections éditoriales |
| `immersive.jsx` | Effets GSAP/ScrollTrigger/Lenis, révélations au scroll |
| `i18n.js` | Helper `L(fr, en)` — **tout texte visible doit passer par lui** |

### Styles

`styles.css` (tokens + base) · `sections.css` · `materials.css` · `calendar.css` · `chat.css` · `pinned.css` · `audience.css` · `founder.css` · `gallery.css` · `notifications.css` · `mockups.css` · `immersive.css` · `features-carousel.css` · `features-extra.css`

### Assets

- `images/` — logo ALBA, photos de projets et de chantiers
- `uploads/` — captures d'appareils recadrées (`ordinateur-crop.png`, `tablette-crop.png`, `mobile-crop.png`) et le son d'apparition de Léo (`.mp3`)

---

## Design tokens (extraits de `styles.css`)

```
Fond sombre        #0E1729   (--bg)
Fond sombre 2      #131D34   (--bg-2)
Crème              #FAF6EC   (--surface)
Crème 2            #F2EBDA   (--surface-2)
Encre              #0B1224   (--ink)
Accent doré        #C9A86A   (--accent)
Texte sur sombre   #F2EBDA   (--on-bg)

Display   Cormorant Garamond (500, italiques pour les emphases)
Corps     Geist (300–600)
Mono      Geist Mono (400–500) — eyebrows, métadonnées, compteurs
```

Conventions visuelles : titres de section en `.display` avec `<em>` italique doré sur la seconde ligne · eyebrows en mono majuscule interlettré · démos d'interface dans une coque de navigateur (`.mockup-bar` + rail d'icônes sombre) · animations d'entrée propres à chaque slide du carrousel.

---

## Ce qui a été décidé et ne doit pas être remis en cause

- **Pas d'inscription depuis la page de vente.** Le formulaire de contact sert uniquement à demander une démo. La création de compte se fait sur `/auth`, côté app.
- **Offre de lancement supprimée.** Il ne reste que le −18 % annuel et le projet gratuit à vie. Ne pas réintroduire de remise −30 %.
- **Paiement web uniquement**, jamais dans les apps mobiles (voir contrainte plus haut).
- Menu : Fonctionnalités · La plateforme · Pour qui ? · Notre vision · Tarif tout inclus · Questions.
- Bilinguisme FR/EN via `L()` — toute chaîne ajoutée doit l'utiliser.

## Analytics suggéré

Plausible ou Umami sur le site (RGPD-friendly, pas de bandeau cookies). Côté app, la seule métrique qui compte au début : **taux de conversion gratuit → payant**.
