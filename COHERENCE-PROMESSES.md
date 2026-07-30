# Cohérence entre les promesses de la page et la réalité du produit

Le cahier des charges (tâche 4) demandait de vérifier que les engagements
affichés correspondent à l'infrastructure réelle. Voici le résultat.

**État : les points 1 et 2 ont été corrigés** après arbitrage. Les points 3 et 4
sont clos ou réduits à une vérification. Le détail de chaque écart est conservé
ci-dessous, parce qu'il explique *pourquoi* la formulation actuelle est celle-là
— et évite qu'on rétablisse l'ancienne par mégarde.

---

## 1. « Vos garanties biennale et décennale sont couvertes » ✅ corrigé

**Où** : `sections.jsx:375` (bloc Sécurité, visible aussi sur `Tarifs.html`) et
`sections.jsx:199` (bloc Pains).

> « Décisions horodatées et signées (eIDAS). Vos garanties biennale et décennale
> sont couvertes. »
>
> « Chaque décision archivée, signée, datée. Vos garanties biennale et décennale
> dorment tranquilles. »

**Le problème.** La documentation de l'application le dit elle-même —
`docs/SIGNATURES_JURIDIQUE.md:108`, dépôt `ancaagency/alba-studio` :

> « Le dispositif relève actuellement de la **signature électronique simple** au
> sens du règlement eIDAS (UE n°910/2014). Il ne fait pas appel à un prestataire
> de services de confiance qualifié (PSCo) type Yousign, DocuSign, Universign. »

Le même document laisse la question ouverte, ligne 110 :

> « La signature électronique simple est-elle juridiquement suffisante pour un PV
> de réception au sens de l'article 1792 du Code civil, ou faut-il imposer une
> signature électronique avancée / qualifiée ? »

Tant que cette question est ouverte en interne, affirmer publiquement que les
garanties biennale et décennale « sont couvertes » promet une sécurité juridique
que le produit ne fournit pas. C'est le genre d'affirmation qu'un client
mécontent produit au dossier.

**Remplacement proposé** — factuel, et qui reste un argument de vente :

**Appliqué** :

| Ligne | Avant | Après |
|---|---|---|
| `375` | *Valeur juridique* — Décisions horodatées et signées (eIDAS). Vos garanties biennale et décennale sont couvertes. | *Valeur probante* — Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur. |
| `199` | Chaque décision archivée, signée, datée. Vos garanties biennale et décennale dorment tranquilles. | Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand. |

Le titre du bloc a changé aussi : « Valeur juridique » promettait que la décision
*tient en droit*, ce qu'une signature simple ne garantit pas. « Valeur probante »
dit ce que le produit fait réellement — fournir une preuve opposable — et reste
un argument fort.

Le jour où un prestataire qualifié sera intégré, ces deux phrases pourront
remonter d'un cran. Pas avant.

---

## 2. « Vous pouvez activer la signature avancée Yousign » ✅ corrigé

**Où** : `sections.jsx:404`, réponse de la FAQ.

> « Oui. Chaque décision est horodatée, archivée, et signée numériquement (eIDAS
> niveau simple). Pour les actes plus sensibles, vous pouvez activer la signature
> avancée Yousign. »

**Le problème.** La première moitié est la plus honnête de toute la page — elle
dit « niveau simple ». Mais l'option Yousign n'existe pas :

```sh
grep -rniE "yousign|universign|docusign" src/ supabase/ package.json
# aucune occurrence dans ancaagency/alba-studio
```

Vendre une option activable qui n'est pas implémentée expose davantage que la
formulation vague du point 1.

**Appliqué** : la promesse Yousign est supprimée. La réponse décrit désormais ce
qui est réellement conservé (auteur, date, horodatage serveur) et renvoie
ailleurs pour un acte exigeant une signature avancée ou qualifiée.

Le « Oui. » qui ouvrait la réponse a été retiré lui aussi : à la question « les
décisions sont-elles juridiquement valables ? », un oui sec est une surpromesse
à lui seul.

---

## 3. « Vos données sont stockées en France » ✅ confirmé, une vérif résiduelle

**Où** : `sections.jsx:372` (bloc Sécurité) et `sections.jsx:409` (FAQ).

> « Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. »

**L'hébergement en France est confirmé.** La mention est donc conservée telle
quelle, aux deux endroits. **Aucune modification.**

### Rectification d'un signalement erroné

Une première version de ce document présentait
`supabase/functions/backup-storage-to-r2/index.ts:99` — `region: "auto"` — comme
un risque de localisation flottante des sauvegardes. **C'était faux.** Pour l'API
compatible S3 de Cloudflare R2, `"auto"` est la valeur normale et attendue : elle
ne décrit pas où vivent les objets. L'emplacement dépend du *location hint* du
bucket, choisi à sa création.

### Ce qui reste à vérifier

Le bloc Sécurité annonce « stockées en France » et « sauvegardes automatiques
quotidiennes » dans le même souffle : un lecteur en conclut légitimement que les
sauvegardes le sont aussi. Or R2 propose une juridiction **européenne**, pas
française.

À contrôler dans *Cloudflare → R2 → votre bucket → Settings* :

- si le bucket est en juridiction UE sans être en France, soit c'est acceptable
  (les sauvegardes ne sont pas le stockage principal, et la promesse porte sur
  « vos données »), soit il faut le préciser dans la politique de
  confidentialité ;
- la liste des sous-traitants de la politique de confidentialité doit de toute
  façon mentionner Cloudflare R2, quelle que soit sa région.

---

## 4. « Chiffrement AES-256 au repos » ⏳ à confirmer

**Où** : `sections.jsx:373` et `sections.jsx:409`.

Plausible : c'est le comportement par défaut de l'infrastructure sous-jacente à
Supabase. Mais c'est une affirmation technique précise, donc vérifiable par un
client, et il vaut mieux pouvoir produire la page de documentation du
sous-traitant qui l'atteste que de s'y fier de mémoire.

---

## 5. Ce qui est cohérent ✅

- **« Export intégral de vos projets (PDF, ZIP, CSV) »** — les fonctions
  `export-project`, `create-download-job` et `delivery-download` existent.
- **« Sauvegardes automatiques quotidiennes »** — `backup-storage-to-r2` existe,
  avec sa planification (seule la localisation pose question, voir point 3).
- **« Projets illimités » a bien été retiré** de la liste des inclusions, comme
  demandé. Ne pas le réintroduire.
- **La grille tarifaire** de la page correspond exactement à celle du cahier des
  charges : 49 / 69 / 89 € en mensuel, et `Math.round(prix × 0,82)` donne bien
  40 / 57 / 73 € en annuel.

---

---

## 6. « Jusqu'à 2 Go par fichier » ✅ corrigé en 100 Mo

La réponse de la FAQ sur les formats promettait **2 Go par fichier**
(`sections.jsx`, `faq.tous-pdf-dwg-ifc-images-videos`). Trois mesures dans le
dépôt de l'application disent autre chose :

| Source | Valeur |
|---|---|
| `plan_entitlements.max_upload_size_mb`, profil « Alba Studio » | **100** Mo |
| `plan_entitlements.max_upload_size_mb`, profil gratuit | **25** Mo |
| Bucket `originals` (`file_size_limit`) | **1 Go** |
| Bucket `previews` (`file_size_limit`) | 50 Mo |
| Repli dans le code si le réglage manque (`useSubscriptionFeatures.ts:43`) | 40 Mo |

La page annonçait donc vingt fois la limite déclarée du profil payant, et le
double du plafond technique de l'infrastructure.

À noter : `getMaxUploadSizeMB()` est **exporté mais jamais appelé**. La limite par
profil n'est appliquée nulle part ; le seul plafond réellement opposé à un
téléversement est celui du bucket. C'est aussi un défaut à traiter côté
application — un quota qui n'est pas appliqué n'est pas un quota.

Corrigé en **100 Mo**, seule valeur vraie sous toutes les lectures. Pour promettre
davantage, dans cet ordre : porter `max_upload_size_mb` à la valeur voulue, la
faire réellement appliquer, et pour dépasser 1 Go relever aussi le
`file_size_limit` du bucket.

## 7. Affirmations invérifiables depuis le dépôt ⛔ décision attendue

Ces éléments ne peuvent pas être contrôlés dans le code : ils ne dépendent que
de faits que vous seul connaissez. Ils sont réunis ici parce qu'ils relèvent tous
de la même règle — depuis la transposition de la directive 2005/29/CE, un faux
avis ou un faux témoignage figure dans la liste des pratiques commerciales
**réputées trompeuses en toute circonstance** (art. L121-4 du code de la
consommation), sans qu'il soit besoin de démontrer un préjudice.

### a. Trois témoignages nommés — `sections.jsx`, section `Testimonials`

- **Camille Lavigne**, « ARCHITECTE DPLG · LYON »
- **Marc Noiret**, « STUDIO MN · BORDEAUX » — cité une seconde fois dans la
  galerie (`gallery.jsx`, « M. NOIRET · STUDIO MN »)
- **Sophie Obellier**, « ATELIER VAUBAN · PARIS »

Chacun porte une citation entre guillemets. Trois avatars photo leur sont
réservés (`testi-camille.jpg`, `testi-marc.jpg`, `testi-sophie.jpg`).

### b. Cinq agences présentées comme clientes — `sections.jsx`, section `Logos`

Sous le titre « **Les agences pilotes construisent déjà avec ALBA** » :
Revol architecte, ADN ARCHITECTURE, Easy Peasy intérieur, Sublimes intérieurs,
FEEL INTÉRIEURS.

Citer le nom d'une société pour suggérer qu'elle est cliente suppose son accord
écrit, indépendamment de la question de la véracité.

### c. Trois chiffres de bénéfices — `sections.jsx`, section `TestiBenefits`

| Chiffre | Statut |
|---|---|
| **6h** économisées par projet et par mois | à étayer, ou à formuler comme un objectif |
| **100 %** des arbitrages tracés | défendable : c'est une propriété du produit, pas une mesure |
| **4,8/5** satisfaction maître d'ouvrage | c'est une **note d'avis**. La publier suppose des avis réellement collectés, et l'art. L111-7-2 impose d'indiquer s'ils sont vérifiés et à quelle date |

### d. Deux engagements opérationnels

- « la plupart des architectes sont opérationnels en moins d'une heure »
- « importer vos projets en cours prend en moyenne une demi-journée. On vous
  accompagne sur l'onboarding sans frais. » — celui-ci engage une prestation
  gratuite.

### Ce qu'il faut décider

Pour chaque bloc : **c'est vrai et documenté**, auquel cas il reste tel quel ;
**c'est vrai mais sans trace écrite**, auquel cas il faut l'accord des personnes
citées ; ou **c'est un texte de remplissage de maquette**, auquel cas il doit
partir avant la mise en ligne. Le troisième cas est le plus courant sur une page
livrée par un studio de design, et c'est celui qui coûte le plus cher.

Rien n'a été retiré de ma propre initiative : supprimer des témoignages réels
serait aussi dommageable que publier des faux.

## Ce qu'il reste à faire

- [ ] **Trancher le point 7** : témoignages, agences pilotes, chiffres de
      bénéfices, engagements d'accompagnement. C'est le seul point restant qui
      expose juridiquement, et il bloque la mise en ligne publique.
- [ ] Faire appliquer `max_upload_size_mb` côté application (point 6) : le quota
      est déclaré mais jamais lu.
- [ ] Vérifier la juridiction du bucket Cloudflare R2 (point 3).
- [ ] Étayer « chiffrement AES-256 au repos » par la documentation du
      sous-traitant (point 4).
- [ ] Le jour où un prestataire de signature qualifié sera intégré, remonter les
      formulations des points 1 et 2 — et pas avant.

## Une remarque de méthode

Les points 1 et 2 n'étaient pas des erreurs d'écriture : c'étaient des promesses
faites avant que la fonctionnalité n'existe. C'est banal et réparable tant que la
page n'a pas de trafic. Ça l'est beaucoup moins une fois qu'un client a signé en
s'appuyant dessus. D'où la correction avant mise en ligne.
