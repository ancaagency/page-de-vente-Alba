# L'IA au service du projet architectural — conducteur de session

Support d'animation pour la formation de 3 h (présentiel, 2 participants),
construit à partir du programme `programme_formation_IA_architecte.pdf`.

## Fichiers

| Fichier | Usage |
|---|---|
| `formation-ia-architectes.pptx` | Le deck, éditable. À projeter et à adapter (nom, coordonnées). |
| `formation-ia-architectes.pdf`  | Version figée, à envoyer aux participants après la session. |
| `generateur-slides.js`          | Script de génération, pour régénérer le deck après modification. |

## Structure — 30 slides

- **1–3** : titre, fil de la session, checklist de préparation (non projetée)
- **4–6** : cadrage — les trois outils, confidentialité et droits
- **7–10** : le prompt — structure en six blocs, vocabulaire, exercice comparatif
- **11–16** : l'image photoréaliste — portes d'entrée, capture 3D, matière et lumière,
  grille d'itération, contrôle de dérive
- **17–21** : la vidéo courte — Seedance 2.0, prompt vidéo, quatre mouvements
- **22–25** : créer son agent — ChatGPT vs Claude, anatomie en cinq blocs
- **26–28** : passage à l'échelle — budget, plan 30 jours, clôture
- **29–30** : antisèche animateur et bibliothèque de prompts (annexes)

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
