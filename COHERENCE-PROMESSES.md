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

## Ce qu'il reste à faire

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
