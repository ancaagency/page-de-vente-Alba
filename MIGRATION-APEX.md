# Bascule de l'apex : la vitrine prend `alba-studio.co`

Objectif visé :

```
alba-studio.co        → page de vente   (Cloudflare Pages)
www.alba-studio.co    → page de vente   (idem)
app.alba-studio.co    → application web
```

---

## ⚠️ État au 30 juillet 2026 — le côté application est FAIT

Le dépôt de l'application a basculé (commit `2206958`, « Découpage des
domaines », et `docs/decoupage-domaines.md`). `capacitor.config.ts` charge
désormais `https://app.alba-studio.co`, et l'enregistrement DNS `app` existe.

**Ce qui est déjà fait côté vitrine** — `_redirects` renvoie en 301 vers
`app.alba-studio.co` les cinq adresses déposées chez Apple et Google **et** les
chemins applicatifs (`/auth`, `/gallery/*`, `/online/*`, `/invite/*`, `/pv/*`,
`/reset-password`, `/onboarding`, `/trash`, `/admin*`). Ces règles pointaient
auparavant vers `alba-studio.co`, donc — après bascule — vers la vitrine
elle-même : boucle de redirection, et les cinq adresses tombaient.

**Ce qui reste, et pourquoi ça attend :**

| À faire | Gardé en attente parce que |
|---|---|
| `config.js` : `ALBA_APP_ORIGIN` → `https://app.alba-studio.co` | La valeur actuelle (`alba-studio.co`) est **juste dans les deux états** : aujourd'hui l'apex sert l'application ; après bascule, la redirection `/auth` ci-dessus mène à l'application. La basculer maintenant casserait les liens si `app.alba-studio.co` ne sert pas encore. À faire pour supprimer le saut de redirection, sans urgence. |
| `canonical`, `og:url`, `sitemap.xml`, `robots.txt` : `www` → apex | Tant que l'apex sert l'application, un `canonical` vers l'apex dirait à Google que la page de vente canonique **est l'application**. À faire quand l'apex est rattaché au projet Pages, pas avant. |

`bascule.mjs` (dossier `tests/`) vérifie que tous les liens suivent quand
`config.js` change : à lancer le jour de la bascule.

---

## Le facteur limitant n'est pas le DNS

C'est ce qui a dicté l'ordre choisi par le dépôt de l'application, et ça reste
vrai pour la suite. `capacitor.config.ts` grave l'adresse dans le binaire :

```ts
server: { url: 'https://app.alba-studio.co' }   // hier : alba-studio.co
```

En « mode synchronisé », le WebView natif **télécharge cette URL à chaque
lancement**. Déplacer la web app vers `app.alba-studio.co` ne déplace pas les
applications déjà installées : elles continueront de demander l'apex.

Le jour où l'apex sert la page de vente, chaque iPhone dont l'app n'a pas été
mise à jour affiche **la grille tarifaire et le bouton de paiement à l'intérieur
de l'application**. C'est la règle 3.1.1 (achat in-app obligatoire, 15 à 30 % de
commission), et c'est un motif de retrait.

Apple ne force pas les mises à jour. Il faut donc compter une traîne de plusieurs
semaines, et **c'est elle qui commande le calendrier**, pas la propagation DNS.

---

## Ordre des opérations

### Étape 1 — Ouvrir `app.alba-studio.co`, sans rien fermer

DNS Cloudflare : faire pointer `app.alba-studio.co` vers l'hébergement de
l'application (Lovable). **L'apex continue de servir l'application, inchangé.**

Les deux adresses répondent alors à la même application. Rien n'est cassé, rien
n'est encore engagé. Vérifier que la connexion, l'inscription et les emails
fonctionnent bien depuis le sous-domaine — `getSafeRedirect`
(`supabase/functions/resend-confirmation-email`) autorise déjà
`https://app.alba-studio.co`, ce point est couvert.

### Étape 2 — Publier un build natif qui vise le sous-domaine

Dans `capacitor.config.ts` (dépôt de l'application) :

```ts
server: { url: 'https://app.alba-studio.co' },
appendUserAgent: 'AlbaApp',
```

`appendUserAgent` est déjà en place ; il ne prend effet qu'au build natif, comme
`contentInset`. Soumettre, faire valider, publier.

### Étape 3 — Attendre l'adoption

**C'est l'étape la plus longue, et la seule qui compte vraiment.**

Surveiller la part des installations passées à la nouvelle version (App Store
Connect → Analytics, et Google Play Console). Tant qu'une fraction notable des
utilisateurs charge encore l'apex, l'étape 4 est dangereuse.

Un repère utile : les requêtes vers l'apex dont le User-Agent porte `AlbaApp`
viennent des builds à jour, donc du sous-domaine — celles qui n'en portent pas et
qui ressemblent à un WebView sont les retardataires.

### Étape 4 — Basculer l'apex

Quand l'adoption est suffisante :

1. **Dans ce dépôt**, deux fichiers et rien d'autre :
   - `config.js` → `window.ALBA_APP_ORIGIN = "https://app.alba-studio.co";`
     Cela réaligne d'un coup `SIGNUP_URL`, les trois CTA du HTML et les liens
     légaux du footer.
   - `_redirects` → dans le bloc « ADRESSES DÉPOSÉES », remplacer
     `alba-studio.co` par `app.alba-studio.co`.
     **Indispensable** : sans cela, la vitrine redirigerait ces adresses vers
     elle-même. Boucle infinie, et les cinq adresses déposées tombent.
2. Mettre à jour les URLs absolues des balises `canonical` et `og:url`
   (`index.html`, `Tarifs.html`, `mentions-legales.html`, `sitemap.xml`,
   `robots.txt`) pour viser l'apex plutôt que `www`.
3. Dans Cloudflare Pages, ajouter `alba-studio.co` comme domaine personnalisé.
4. Poser une **règle de redirection sur l'apex** : toute requête dont le
   User-Agent contient `AlbaApp` part vers `app.alba-studio.co`. Elle rattrape
   les builds à jour qui auraient gardé l'ancienne adresse en cache.

### Étape 5 — Vérifier, dans cet ordre

```sh
# Les cinq adresses déposées chez Apple et Google
for p in /privacy-policy /terms /suppression-compte /delete-account /faq; do
  printf '%-22s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' -L https://alba-studio.co$p)"
done
# Les cinq doivent finir en 200, sans boucle (-L suit les redirections).

# L'application répond sur son nouveau domaine
curl -sI https://app.alba-studio.co | head -1

# Un User-Agent d'app est renvoyé vers le sous-domaine, PAS vers la vitrine
curl -sI -A 'Mozilla/5.0 AlbaApp' https://alba-studio.co | grep -i '^location'
```

Puis, manuellement : ouvrir l'app iOS à jour et confirmer qu'**aucune grille
tarifaire n'apparaît nulle part**.

---

## Ce qui est déjà prêt dans ce dépôt

- **`config.js`** — origine de l'application en un seul endroit. Les CTA du HTML
  portent `data-alba-auth` et sont réalignés au chargement ; `sections.jsx` lit
  la même valeur. Plus de risque d'en oublier un, comme c'était le cas pour le
  CTA de `Tarifs.html` que le cahier des charges avait omis.
- **`_redirects`** — les cinq adresses déposées y figurent **toutes**, groupées
  dans un bloc unique et signalé.
- **`DEPLOIEMENT.md`** — la mise en place initiale sur `www`.

## Ce qui ne doit surtout pas être fait

- Basculer le DNS de l'apex avant l'étape 3. C'est la seule erreur réellement
  coûteuse de toute cette migration.
- Rediriger `alba-studio.co` vers `www` (ou l'inverse) tant que les deux servent
  des choses différentes.
- Retirer les redirections des cinq adresses déposées, à quelque moment que ce
  soit. Elles doivent répondre en permanence, avant, pendant et après.
