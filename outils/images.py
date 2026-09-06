#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Dérivées d'images : AVIF et WebP, aux largeurs réellement affichées.

    python3 outils/images.py

────────────────────────────────────────────────────────────────────────────────
POURQUOI

Le parcours mobile de l'accueil pesait 1,8 Mo d'images. Non pas parce qu'elles
étaient nombreuses — il y en a dix — mais parce que chacune était envoyée dans
sa taille d'origine, quelle que soit la place qu'elle occupe à l'écran.

`villa-interieur.jpg` fait 1600 px de large et 382 Ko. Sur un téléphone, elle
s'affiche dans 350 px. On envoyait vingt fois les pixels nécessaires à un
architecte qui ouvre la page en 4G sur un chantier — c'est-à-dire à la cible.

Les largeurs ci-dessous ne sont pas choisies au jugé : elles viennent d'une
mesure de la largeur d'affichage réelle de chaque image à 390, 1280 et 1920 px
de large, doublée pour les écrans à haute densité, et plafonnée à la taille de
la source. Personne ne gagne rien à agrandir une image au-delà de son original.

────────────────────────────────────────────────────────────────────────────────
CE QUI EST PRODUIT, ET CE QUI NE L'EST PAS

Pour chaque source : un AVIF et un WebP par largeur, dans images/derivees/.
Pas de dérivée JPEG ou PNG : le fichier d'origine reste le recours des
navigateurs qui ne connaissent ni l'un ni l'autre, et il n'y en a plus guère.
Générer une troisième famille pour eux alourdirait le dépôt pour trois
visiteurs sur cent, sans rien changer pour les quatre-vingt-dix-sept autres.

L'ORIGINAL N'EST JAMAIS ÉCRASÉ. C'est délibéré : il sert de recours, il sert
d'og:image, et il sert surtout à régénérer ces dérivées le jour où les largeurs
d'affichage changeront. Une source réencodée est une source perdue.
────────────────────────────────────────────────────────────────────────────────
"""

import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow manque :  pip install Pillow")

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, "images", "derivees")

# ──────────────────────────────────────────────────────────────────────────────
# source → largeurs à produire.
#
# Le commentaire de chaque ligne donne la largeur d'affichage MESURÉE à 390 px
# et au plus large. Si vous changez une mise en page, remesurez avant de
# retoucher ces nombres : c'est la mesure qui commande, pas l'inverse.
# ──────────────────────────────────────────────────────────────────────────────
#
# DEUX PALIERS SUFFISENT RAREMENT, ET LE PLAFOND EST UN CHOIX.
#
# Un téléphone à densité 3 réclame 1 100 px pour une vignette large de 350 px.
# Avec les paliers 400/800/1600, il sautait donc à 1600 — 143 Ko pour une
# photo d'ambiance haute comme le pouce. La mesure l'a montré, pas le
# raisonnement : c'est exactement le genre d'erreur qu'on ne voit qu'en pesant.
#
# Deux réponses, appliquées ensemble :
#   · des paliers plus serrés, pour que le saut au-dessus du besoin soit court ;
#   · un PLAFOND assumé sur les photos d'ambiance. Elles sont décoratives : au
#     delà de 1000 px, personne ne voit la différence sur un téléphone, et
#     chacun paie les octets. Les captures du produit, elles, contiennent du
#     texte à lire — elles gardent leurs pleines largeurs.
MANIFESTE = {
    # ── CAPTURES DU PRODUIT : du texte à l'intérieur, on ne plafonne pas ──────
    # affichée 348 px sur mobile, 1014 px sur grand écran. Image du héros :
    # c'est elle que mesure le Largest Contentful Paint, et elle est préchargée.
    "images/app-cockpit-web.jpg": [400, 800, 1200, 1600],
    # 369 / 630
    "uploads/ordinateur-crop.png": [400, 700, 972],
    # 280 / 522 — capture d'écran en PNG : 338 Ko pour 550 px de large
    "uploads/tablette-crop.png": [300, 550],
    # 125 / 226 — 357 Ko pour 610 px de large
    "uploads/mobile-crop.png": [250, 452],

    # ── PHOTOS D'AMBIANCE : plafonnées à 1000 px ─────────────────────────────
    # 350 / 779 — la plus lourde du site à elle seule (382 Ko)
    "images/villa-interieur.jpg": [400, 700, 1000],
    # 350 / 481
    "images/pause-lecture.jpg": [400, 700, 1000],
    # 350 / 679
    "images/chateau-a-renover.jpg": [400, 700, 850],
    # 350 / 381
    "images/escalier-spirale.jpg": [400, 700, 800],

    # ── PORTRAIT ET SIGNATURE ────────────────────────────────────────────────
    # portrait du fondateur, monté par image-slot ; affiché 560 px au plus
    "images/founder-portrait.jpg": [400, 700, 1000],
    # 160 px partout, source 483 px
    # affichée 160 px, densité 1 comprise : sans palier à 160, le navigateur
    # prenait le 320 faute de mieux.
    "images/signature-anthony.png": [160, 320, 483],
}

# L'AVIF est nettement plus lent à encoder que le WebP. `speed` 4 est le
# compromis retenu : quelques secondes par image ici, contre une qualité
# sensiblement meilleure à poids égal.
QUALITE = {"avif": {"quality": 62, "speed": 4}, "webp": {"quality": 78, "method": 6}}


def base_de(chemin):
    """images/villa-interieur.jpg → villa-interieur ; uploads/x.png → x."""
    return os.path.splitext(os.path.basename(chemin))[0]


def produire():
    os.makedirs(SORTIE, exist_ok=True)
    total_source = 0
    total_avif = 0
    lignes = []

    for rel, largeurs in MANIFESTE.items():
        src = os.path.join(RACINE, rel)
        if not os.path.exists(src):
            sys.exit(f"source absente : {rel}")

        image = Image.open(src)
        poids_src = os.path.getsize(src)
        total_source += poids_src
        nom = base_de(rel)

        # Une largeur plus grande que la source ne produirait qu'un
        # agrandissement : on la retire plutôt que de la fabriquer.
        utiles = sorted({min(l, image.width) for l in largeurs})
        if utiles != sorted(set(largeurs)):
            print(f"   · {rel} : largeurs ramenées à {utiles} (source {image.width} px)")

        plus_gros_avif = 0
        for largeur in utiles:
            hauteur = round(image.height * largeur / image.width)
            reduite = image.resize((largeur, hauteur), Image.LANCZOS)

            for ext in ("avif", "webp"):
                # L'AVIF et le WebP acceptent la transparence ; le mode « P »
                # (palette) doit passer en RGBA d'abord, sinon Pillow refuse.
                sortie = reduite
                if sortie.mode in ("P", "LA"):
                    sortie = sortie.convert("RGBA")
                if sortie.mode == "RGBA" and ext == "avif":
                    pass  # l'AVIF gère l'alpha, rien à faire
                cible = os.path.join(SORTIE, f"{nom}-{largeur}.{ext}")
                sortie.save(cible, **QUALITE[ext])
                if ext == "avif":
                    plus_gros_avif = max(plus_gros_avif, os.path.getsize(cible))

        total_avif += plus_gros_avif
        lignes.append((rel, poids_src, plus_gros_avif, utiles))

    print()
    print(f"   {'source':38s} {'origine':>9s} {'AVIF max':>9s}  largeurs")
    for rel, po, pa, larg in lignes:
        print(f"   {rel:38s} {po // 1024:6d} Ko {pa // 1024:6d} Ko  {larg}")
    print()
    print(f"   somme des originaux           : {total_source // 1024} Ko")
    print(f"   somme des AVIF les plus larges: {total_avif // 1024} Ko")
    if total_source:
        print(f"   soit {100 - round(100 * total_avif / total_source)} % de moins, à taille d'affichage égale ou supérieure.")
    ecrire_manifeste_js(lignes)
    ecrire_prechargement()
    print()
    print(f"{len(MANIFESTE)} images, {sum(len(v) for v in MANIFESTE.values()) * 2} dérivées dans images/derivees/.")
    print("photos.js régénéré.")


def ecrire_manifeste_js(lignes):
    """Le composant <Photo> a besoin des mêmes largeurs que ce script.

    Elles sont donc ÉCRITES ici, jamais recopiées. Deux listes tenues à la main
    des deux côtés d'un même sujet finissent toujours par diverger, et la
    divergence est muette : le navigateur demande une dérivée qui n'existe pas,
    reçoit un 404, et affiche le recours sans que rien ne le signale.
    contenu.js et les .jsx nous ont déjà joué ce tour dans ce projet.

    photos.js est donc un fichier ENGENDRÉ, au même titre que les .js issus des
    .jsx. tests/vendor.mjs vérifie qu'il est à jour."""
    lignes_js = ",\n".join(
        f'  "{rel}": [{", ".join(str(l) for l in larg)}]' for rel, _, _, larg in lignes
    )
    contenu = (
        "/* ENGENDRÉ PAR outils/images.py — NE PAS MODIFIER À LA MAIN.\n"
        "   Régénérer avec :  python3 outils/images.py\n\n"
        "   Largeurs disponibles en AVIF et en WebP dans images/derivees/, pour\n"
        "   chaque image d'origine. Le composant <Photo> y lit son srcset ; sans\n"
        "   entrée ici, il rend une balise <img> ordinaire, ce qui reste juste. */\n"
        "window.ALBA_PHOTOS = {\n" + lignes_js + ",\n};\n"
    )
    with open(os.path.join(RACINE, "photos.js"), "w", encoding="utf-8") as f:
        f.write(contenu)


# Image du héros : la seule préchargée, parce que c'est elle que mesure le
# Largest Contentful Paint. Le `sizes` doit être IDENTIQUE à celui du point
# d'appel (RealShot, dans components.jsx), sans quoi le navigateur précharge
# une largeur et en affiche une autre.
HEROS = "images/app-cockpit-web.jpg"
HEROS_SIZES = "(max-width: 760px) 92vw, 1020px"
DEBUT = "<!-- PRECHARGEMENT:DEBUT -->"
FIN = "<!-- PRECHARGEMENT:FIN -->"


def ecrire_prechargement():
    """Réécrit le <link rel=preload> du héros dans index.html.

    Il y était écrit à la main, avec sa propre liste de largeurs. Elle a
    divergé du manifeste au premier resserrement des paliers, et le navigateur
    a préchargé le 1600 puis affiché le 1200 : DEUX fichiers pour une image,
    94 Ko sur un téléphone. Rien ne le signalait — la page était juste, la
    photo nette, simplement payée deux fois.

    Une liste de largeurs tenue à deux endroits finit toujours ainsi. Celle-ci
    est donc écrite depuis le manifeste, comme photos.js."""
    chemin = os.path.join(RACINE, "index.html")
    with open(chemin, encoding="utf-8") as f:
        html = f.read()
    if DEBUT not in html or FIN not in html:
        print(f"   · index.html ne porte pas les repères {DEBUT} / {FIN} : préchargement inchangé")
        return

    nom = base_de(HEROS)
    largeurs = sorted({min(l, Image.open(os.path.join(RACINE, HEROS)).width) for l in MANIFESTE[HEROS]})
    srcset = ", ".join(f"images/derivees/{nom}-{l}.avif {l}w" for l in largeurs)
    # `href` sert de recours aux navigateurs qui ignorent `imagesrcset` : on y
    # met une largeur moyenne plutôt que la plus grande.
    milieu = largeurs[len(largeurs) // 2]
    bloc = (
        f"{DEBUT}\n"
        "  <!-- ENGENDRÉ PAR outils/images.py — ne pas modifier à la main.\n"
        "       Les largeurs doivent rester celles du <picture> rendu par <Photo> :\n"
        "       si elles divergent, le navigateur précharge un fichier et en affiche\n"
        "       un autre, et l'image est téléchargée deux fois. -->\n"
        '  <link rel="preload" as="image" type="image/avif"\n'
        f'        imagesrcset="{srcset}"\n'
        f'        imagesizes="{HEROS_SIZES}"\n'
        f'        href="images/derivees/{nom}-{milieu}.avif">\n'
        f"  {FIN}"
    )
    avant = html[: html.index(DEBUT)]
    apres = html[html.index(FIN) + len(FIN) :]
    with open(chemin, "w", encoding="utf-8") as f:
        f.write(avant + bloc + apres)
    print(f"   · préchargement du héros réécrit : {len(largeurs)} largeurs")


if __name__ == "__main__":
    produire()
