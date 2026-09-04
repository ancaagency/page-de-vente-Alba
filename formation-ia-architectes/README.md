# L'IA au service du projet architectural — conducteur de session

Support d'animation pour la formation de 3 h (présentiel, 2 participants),
construit à partir du programme `programme_formation_IA_architecte.pdf`.

## Fichiers

| Fichier | Usage |
|---|---|
| `formation-ia-architectes.pptx` | Le deck, éditable. À projeter et à adapter (nom, coordonnées). |
| `formation-ia-architectes.pdf`  | Version figée, à envoyer aux participants après la session. |
| `generateur-slides.js`          | Script de génération, pour régénérer le deck après modification. |

## Structure — 31 slides

- **1–3** : titre, fil de la session, checklist de préparation (non projetée)
- **4–6** : cadrage — les trois outils, confidentialité et droits
- **7–11** : le prompt — structure en six blocs, vocabulaire, mauvais prompt contre bon
  prompt, exercice comparatif
- **12–17** : l'image photoréaliste — portes d'entrée, capture 3D, matière et lumière,
  grille d'itération, contrôle de dérive
- **18–22** : la vidéo courte — Seedance 2.0, prompt vidéo, quatre mouvements
- **23–26** : créer son agent — ChatGPT contre Claude, anatomie en cinq blocs
- **27–29** : passage à l'échelle — budget, plan 30 jours, clôture
- **30–31** : antisèche animateur et bibliothèque de prompts (annexes)

## Éviter les doublons en modifiant

Trois registres, sans recouvrement :

- **Le fil (slide 2)** annonce ce qu'on sort de chaque bloc, pas son contenu.
- **Les intercalaires** listent les étapes et leur minutage.
- **Les encarts TIP** ont l'exclusivité des conseils d'animation.

Les seules répétitions volontaires : la phrase « image d'intention » (slides 6 et 29,
à dire trois fois), l'exemple fil rouge du prompt (slides 8 et 10), et le mauvais
prompt de la slide 10 que les participants retapent à l'identique slide 11.

## Deux niveaux de lecture

- **Encarts TIP** (bandeau bas de chaque slide) : projetables, ce sont eux que les
  participants recopient.
- **Notes de présentateur** : minutage détaillé, ce qu'il faut dire, les pièges
  d'animation et les arbitrages de temps. Visibles en mode Présentateur.

## Régénérer le deck

```bash
npm install pptxgenjs
node generateur-slides.js
```
