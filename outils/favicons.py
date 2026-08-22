#!/usr/bin/env python3
"""Fabrique les icônes du site à partir de images/logo-alba.png.

    python3 outils/favicons.py

À relancer UNIQUEMENT si le logo change. Les fichiers produits sont versionnés
dans le dépôt : rien ne les régénère au déploiement.

─────────────────────────────────────────────────────────────────────────────
POURQUOI CE SCRIPT EXISTE

Le site déclarait une seule icône : logo-alba.png, en 256×256. Google affichait
un globe gris à sa place dans les résultats de recherche. Deux causes, qui se
cumulaient :

  · la documentation de Google exige un carré MULTIPLE DE 48 px — 48, 96, 144,
    192… 256 n'en est pas un ;
  · beaucoup d'outils, et Google en second recours, ne cherchent qu'à
    /favicon.ico, quelles que soient les balises du HTML. Il n'existait pas.

DEUX DÉCISIONS, qui ne se voient pas dans le résultat mais l'expliquent :

1. FOND BLANC PLEIN, alors que le logo d'origine est sur fond transparent.
   Le « A » est bleu nuit : sur un onglet sombre ou dans Google en mode sombre,
   un fond transparent le rendrait quasi invisible. Le site pose d'ailleurs déjà
   son logo sur une tuile blanche dans sa propre barre de navigation.
   Pour revenir à la transparence : fond=(0, 0, 0, 0) ci-dessous.

2. RECADRAGE AVANT MISE À L'ÉCHELLE. Le PNG d'origine porte environ 17 % de vide
   autour de la marque (zone peinte : 170×175 dans un carré de 256). Sans
   recadrage, la marge de ce script s'ajouterait à celle-là et le « A » serait
   minuscule à 16 px — la taille à laquelle il est le plus souvent vu.
"""
from PIL import Image
import pathlib

RACINE = pathlib.Path(__file__).resolve().parent.parent
SOURCE = RACINE / "images" / "logo-alba.png"

source = Image.open(SOURCE).convert("RGBA")
zone = source.getbbox()          # zone réellement peinte, hors transparence
if zone is None:
    raise SystemExit(f"{SOURCE} est entièrement transparente")
marque = source.crop(zone)


def icone(taille, marge=0.10, fond=(255, 255, 255, 255)):
    """La marque centrée sur un carré plein, avec une marge proportionnelle."""
    dispo = int(taille * (1 - 2 * marge))
    facteur = min(dispo / marque.width, dispo / marque.height)
    m = marque.resize(
        (max(1, round(marque.width * facteur)), max(1, round(marque.height * facteur))),
        Image.LANCZOS,
    )
    toile = Image.new("RGBA", (taille, taille), fond)
    toile.paste(m, ((taille - m.width) // 2, (taille - m.height) // 2), m)
    return toile


print(f"source {source.size}, zone peinte {marque.size}")

# Les tailles que Google accepte : des multiples de 48.
for t in (48, 96, 192):
    chemin = RACINE / "images" / f"favicon-{t}.png"
    icone(t).save(chemin)
    print(f"  {chemin.relative_to(RACINE)}")

# iOS pose cette icône sur l'écran d'accueil. 180 px est sa taille de référence
# (elle n'a pas à être un multiple de 48 : c'est une autre spécification), et
# elle ne doit surtout pas être transparente — iOS remplirait le vide en noir.
chemin = RACINE / "images" / "apple-touch-icon.png"
icone(180, marge=0.08).save(chemin)
print(f"  {chemin.relative_to(RACINE)}")

# /favicon.ico : le second recours de Google, et le seul endroit que regardent
# beaucoup d'agrégateurs et de clients de messagerie. Trois tailles dans un
# seul fichier, comme le veut le format.
chemin = RACINE / "favicon.ico"
icone(48).save(chemin, sizes=[(16, 16), (32, 32), (48, 48)])
print(f"  {chemin.relative_to(RACINE)} (16/32/48)")

print("\nSi vous régénérez : relancez tests/favicons.mjs avant de publier.")
