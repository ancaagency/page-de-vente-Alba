# Cohérence entre les promesses de la page et la réalité du produit

Le cahier des charges (tâche 4) demandait de vérifier que les engagements
affichés correspondent à l'infrastructure réelle. Voici le résultat.

**Rien n'a été modifié sur la page.** Ces phrases relèvent de la copie validée et
d'une appréciation juridique : elles appellent votre arbitrage, pas le mien. Les
formulations de remplacement ci-dessous sont prêtes à appliquer.

---

## 1. « Vos garanties biennale et décennale sont couvertes » ⚠️

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

| Ligne | Actuel | Proposé |
|---|---|---|
| `375` | Décisions horodatées et signées (eIDAS). Vos garanties biennale et décennale sont couvertes. | Décisions horodatées et signées électroniquement (eIDAS, signature simple). Chaque arbitrage est archivé avec ses preuves : auteur, date, horodatage serveur. |
| `199` | Chaque décision archivée, signée, datée. Vos garanties biennale et décennale dorment tranquilles. | Chaque décision archivée, signée, datée. Six mois plus tard, vous retrouvez qui a décidé quoi, et quand. |

---

## 2. « Vous pouvez activer la signature avancée Yousign » ⚠️

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

**Remplacement proposé** : supprimer la seconde phrase, ou la mettre au futur
(« La signature avancée par prestataire qualifié est à l'étude ») — à condition
qu'elle le soit réellement.

---

## 3. « Vos données sont stockées en France » ⏳ à vérifier

**Où** : `sections.jsx:372` (bloc Sécurité) et `sections.jsx:409` (FAQ).

> « Vos données sont stockées en France, chez un hébergeur certifié ISO 27001. »

**Deux points à trancher.**

1. **La région Supabase reste inconnue.** Projet `fhrkkjvbzgkbmlnlnxce`.
   À lire dans *Supabase → Project Settings → General → Region*. Si ce n'est pas
   `eu-west-3` (Paris), l'affirmation est fausse.

2. **Les sauvegardes ne sont pas en France.**
   `supabase/functions/backup-storage-to-r2/index.ts:99` configure le client
   Cloudflare R2 avec `region: "auto"`. R2 place alors les objets sans garantie
   de localisation française. Or la page promet aussi « sauvegardes automatiques
   quotidiennes » dans le même bloc que « stockées en France » : un lecteur
   comprend légitimement que les sauvegardes le sont aussi.

**Remplacement proposé si la base n'est pas à Paris** :

> « Vos données sont hébergées dans l'Union européenne, chez des hébergeurs
> certifiés ISO 27001. Conformité RGPD native. »

C'est vrai, et cela reste un argument fort face à un concurrent américain.

**Si la base est bien à Paris** : conserver la mention pour la base, mais ne pas
laisser entendre que les sauvegardes R2 le sont — ou fixer explicitement la
région du bucket R2 sur l'Europe.

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

## Une remarque de méthode

Les points 1 et 2 ne sont pas des erreurs d'écriture : ce sont des promesses
faites avant que la fonctionnalité n'existe. C'est banal et réparable tant que
la page n'a pas encore de trafic. Ça l'est beaucoup moins une fois qu'un client
a signé en s'appuyant dessus.

Le meilleur moment pour trancher est donc **avant la mise en ligne**, c'est-à-dire
maintenant.
