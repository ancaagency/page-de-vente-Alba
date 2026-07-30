/**
 * Extraction des textes de vente vers contenu.js. OUTIL À USAGE UNIQUE, DÉJÀ
 * PASSÉ — il est conservé pour mémoire, pas pour être relancé (voir le garde-fou
 * plus bas).
 *
 * Il a réécrit les appels L("fr","en") des quatre fichiers de copie en
 * Txt("cle","fr","en") — les littéraux RESTENT dans le code comme valeurs de
 * repli — et produit contenu.js. Mécanique et non manuel : 225 chaînes recopiées
 * à la main, ce sont 225 occasions de faire une faute.
 *
 * Ce qui n'a PAS été extrait, volontairement :
 *   · les appels à gabarit (`${prix}`) — ce ne sont pas des textes mais des
 *     calculs de tarif ; les sortir du code casserait l'affichage des prix ;
 *   · l'appel qui contient du JSX (<em>) — ce n'est pas une chaîne.
 * Les deux restent en L().
 *
 * ⚠️ contenu.js compte 232 entrées et non 225 : les 7 dernières — noms et rôles
 * des trois témoignages, nom et ville du fondateur — ont été ajoutées à la main
 * après coup, parce qu'elles n'étaient pas dans un appel L() mais écrites en dur
 * dans le JSX. Ce script ne les connaît pas.
 *
 * ⚠️ POURQUOI IL NE FAUT PAS LE RELANCER : il cherche des appels L("…","…"), or
 * il n'en reste plus dans ces fichiers. Une nouvelle exécution écraserait donc
 * contenu.js par un fichier quasi vide et ferait disparaître les 232 textes.
 * Le garde-fou ci-dessous refuse de partir si contenu.js existe déjà.
 *
 * Pour ajouter un texte aujourd'hui : écrire l'appel Txt("cle", "fr", "en") dans
 * le JSX et l'entrée correspondante dans contenu.js. `cd tests && npm test`
 * vérifie que les deux se correspondent.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

if (fs.existsSync(path.join(ROOT, 'contenu.js')) && !process.argv.includes('--je-sais-ce-que-je-fais')) {
  console.error(`\n⛔ contenu.js existe déjà : extraction déjà faite, rien à refaire.

   Relancer ce script l'écraserait par un fichier quasi vide — il cherche des
   appels L("…","…") et il n'en reste plus dans les fichiers de copie. Les 232
   textes de la page seraient perdus (récupérables dans l'historique Git, mais
   autant ne pas y passer).

   Pour ajouter un texte : écrivez l'appel Txt("cle", "fr", "en") dans le JSX et
   l'entrée correspondante dans contenu.js, puis « cd tests && npm test ».
`);
  process.exit(1);
}

/** Composant → préfixe de clé, et libellé lisible pour les commentaires. */
const SECTIONS = {
  Hero: ['accueil', "Bandeau d'accueil"],
  Logos: ['logos', 'Bandeau des agences pilotes'],
  CTABand: ['bandeau-cta', "Bandeau d'appel à l'action"],
  Pains: ['problemes', 'Ce que vit une agence aujourd’hui'],
  Features: ['fonctionnalites', 'Fonctionnalités'],
  TestiBenefits: ['benefices', 'Bénéfices chiffrés'],
  Testimonials: ['temoignages', 'Témoignages'],
  Pricing: ['tarifs', 'Carte tarifaire et configurateur'],
  TrustBand: ['securite', 'Bloc sécurité et conformité'],
  Faq: ['faq', 'Questions fréquentes'],
  Contact: ['contact', 'Formulaire de contact'],
  Footer: ['pied', 'Pied de page'],
  getAudienceData: ['pour-qui', 'Pour qui ? — les six profils'],
  Audience: ['pour-qui', 'Pour qui ? — enveloppe'],
  AudienceHead: ['pour-qui', 'Pour qui ? — chapeau'],
  AudienceA: ['pour-qui', 'Pour qui ? — variante A'],
  AudienceB: ['pour-qui', 'Pour qui ? — variante B'],
  AudienceC: ['pour-qui', 'Pour qui ? — variante C'],
  Founder: ['fondateur', 'Le mot du fondateur'],
  FeatureCarousel: ['carrousel', 'Carrousel de fonctionnalités'],
};

const FICHIERS = ['sections.jsx', 'audience.jsx', 'founder.jsx', 'features-carousel.jsx'];

/** Slug lisible tiré du texte français : c'est ce qui rend le fichier éditable. */
function slug(fr) {
  return fr
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-').filter(Boolean).slice(0, 6).join('-')
    .slice(0, 44).replace(/-$/, '') || 'texte';
}

/** Composant englobant une position donnée, d'après les bornes de déclaration. */
function bornes(src) {
  const out = [];
  const re = /^(?:const|let|var) ([A-Za-z_$][A-Za-z0-9_$]*) *=/gm;
  let m;
  while ((m = re.exec(src))) out.push({ nom: m[1], debut: m.index });
  return out;
}

const RE_SIMPLE = /(?<![A-Za-z0-9_$.])L\(\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*\)/g;
const RE_AUTRES = /(?<![A-Za-z0-9_$.])L\(\s*[`<]/g;

const contenu = new Map();   // cle → {fr, en, section, libelle}
const vus = new Map();       // slug de base → compteur
const restes = [];           // appels laissés en L()
let total = 0;

for (const f of FICHIERS) {
  const p = path.join(ROOT, f);
  let src = fs.readFileSync(p, 'utf8');
  const decls = bornes(src);
  const composantA = (i) => {
    let nom = null;
    for (const d of decls) if (d.debut <= i) nom = d.nom;
    return nom;
  };

  for (const m of src.matchAll(RE_AUTRES)) {
    restes.push({ fichier: f, composant: composantA(m.index) });
  }

  src = src.replace(RE_SIMPLE, (tout, fr, en, offset) => {
    const comp = composantA(offset);
    const conf = SECTIONS[comp];
    if (!conf) {
      console.warn(`  ⚠️  ${f}: appel hors composant connu (${comp}) → laissé tel quel`);
      return tout;
    }
    const [prefixe, libelle] = conf;
    const base = `${prefixe}.${slug(fr)}`;
    const n = (vus.get(base) || 0) + 1;
    vus.set(base, n);
    const cle = n === 1 ? base : `${base}-${n}`;
    contenu.set(cle, { fr, en, section: prefixe, libelle });
    total++;
    return `Txt("${cle}", "${fr}", "${en}")`;
  });

  fs.writeFileSync(p, src);
  console.log(`  ${f} réécrit`);
}

// ——— Fichier de contenu, groupé par section, annoté ———
const parSection = new Map();
for (const [cle, v] of contenu) {
  if (!parSection.has(v.section)) parSection.set(v.section, { libelle: v.libelle, entrees: [] });
  parSection.get(v.section).entrees.push([cle, v]);
}

const ech = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
let out = `/* ═══════════════════════════════════════════════════════════════════════════
   TEXTES DE LA PAGE DE VENTE — c'est ici qu'on modifie la copie.

   Chaque entrée porte le texte français puis l'anglais. Modifiez ce qui est
   entre guillemets, gardez les guillemets et la virgule, enregistrez : Cloudflare
   redéploie tout seul en une trentaine de secondes.

   FILET DE SÉCURITÉ — ce fichier ne peut pas casser la page. Les textes
   d'origine restent inscrits dans le code comme valeurs de repli. Si une
   accolade manque, si une virgule saute, si une clé est mal écrite, la page
   affiche simplement le texte d'origine à cet endroit. Vous ne verrez jamais
   de page blanche à cause d'une faute de frappe ici.

   Pour vérifier avant de publier : cd tests && npm test

   Ce qui n'est PAS dans ce fichier, et pourquoi :
     · les libellés qui calculent un prix (« Vous économisez 108 € par an ») —
       ce sont des calculs, pas des textes ; ils vivent dans sections.jsx ;
     · les faux contenus des maquettes de l'application (agenda, matériaux,
       assistant, météo, messagerie) — ils font partie de la démonstration ;
     · les noms des trois témoignages et du fondateur, dans sections.jsx et
       founder.jsx, à côté de leurs photos.
   ═══════════════════════════════════════════════════════════════════════════ */
window.ALBA_CONTENU = {
`;

const ordre = ['accueil', 'logos', 'bandeau-cta', 'problemes', 'fonctionnalites', 'carrousel',
  'pour-qui', 'benefices', 'temoignages', 'fondateur', 'tarifs', 'securite', 'faq', 'contact', 'pied'];
const sections = [...parSection.keys()].sort((a, b) => ordre.indexOf(a) - ordre.indexOf(b));

for (const s of sections) {
  const { libelle, entrees } = parSection.get(s);
  out += `\n  /* ——— ${libelle} ——— */\n`;
  for (const [cle, v] of entrees) {
    out += `  "${cle}": {\n    fr: "${ech(v.fr)}",\n    en: "${ech(v.en)}",\n  },\n`;
  }
}
out += '};\n';

fs.writeFileSync(path.join(ROOT, 'contenu.js'), out);

console.log(`\n${total} textes extraits, ${parSection.size} sections.`);
console.log(`${restes.length} appels laissés en L() (gabarits de prix et JSX) :`);
const parComp = {};
for (const r of restes) parComp[`${r.fichier}/${r.composant}`] = (parComp[`${r.fichier}/${r.composant}`] || 0) + 1;
for (const [k, n] of Object.entries(parComp)) console.log(`   ${k} → ${n}`);
