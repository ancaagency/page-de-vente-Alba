/**
 * Empreinte des pages légales — pour que la date de mise à jour suive le texte.
 *
 *     node tests/empreinte-legale.mjs         vérifie (rien n'est écrit)
 *     node tests/empreinte-legale.mjs --maj   enregistre l'état actuel
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI
 *
 * Les mentions légales annonçaient « 30 juillet 2026 » alors qu'elles venaient
 * de recevoir un hébergeur, un téléphone et une section 6 réécrite. C'est cette
 * date qui dit au lecteur — et à un régulateur — quelle version il consulte :
 * figée sur un texte qui bouge, c'est un faux, même involontaire.
 *
 * Et c'est une dérive silencieuse par nature, parce que personne ne relit une
 * date. On compare donc une empreinte du texte, LIGNE DE DATE EXCLUE, à celle
 * enregistrée. Texte modifié sans la date : échec.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POURQUOI CE FICHIER EXISTE SÉPARÉMENT
 *
 * Ce calcul vivait dans smoke.mjs, avec un drapeau `--maj-legal`. Rafraîchir
 * deux lignes de JSON demandait alors de relancer tout le contrôle de fumée :
 * un serveur, un navigateur, dix pages, plusieurs minutes. On ne rafraîchit pas
 * volontiers ce qui coûte trois minutes — et un garde-fou qu'on rechigne à
 * mettre à jour finit contourné, puis retiré.
 *
 * Il ne lit que des fichiers. Il s'exécute en quelques millisecondes.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
export const REFERENCE = path.join(ROOT, 'tests', 'empreinte-legale.json');

/* Les pages dont la date engage. Les pages éditoriales n'en portent pas : elles
   décrivent le produit, pas les obligations de l'éditeur. */
export const PAGES_LEGALES = [
  'mentions-legales.html',
  'traductions/mentions-legales.en.html',
];

/** Empreinte du texte légal et date affichée, pour un fichier. */
export function relever(fichier) {
  const brut = fs.readFileSync(path.join(ROOT, fichier), 'utf8');
  /* Le prérendu est réengendré à chaque passage et n'est pas du texte légal :
     l'inclure ferait varier l'empreinte sans qu'un mot ait bougé. */
  const i = brut.indexOf('<!-- PRERENDU:DEBUT');
  const sansPrerendu = i === -1
    ? brut
    : brut.slice(0, i) + brut.slice(brut.indexOf('<!-- PRERENDU:FIN -->'));
  const date = (sansPrerendu.match(/class="legal-updated">([^<]*)</) || [])[1] || '';
  /* La date est neutralisée AVANT le calcul : c'est elle qu'on éprouve, elle ne
     peut pas faire partie de ce qu'on mesure. */
  const corps = sansPrerendu.replace(/class="legal-updated">[^<]*</, 'class="legal-updated">DATE<');
  return {
    empreinte: crypto.createHash('sha256').update(corps).digest('hex').slice(0, 16),
    date,
  };
}

/**
 * @returns {{fichier: string, juste: boolean, date: string}[]}
 */
export function verifier() {
  const ref = fs.existsSync(REFERENCE) ? JSON.parse(fs.readFileSync(REFERENCE, 'utf8')) : {};
  return PAGES_LEGALES.map((fichier) => {
    const { empreinte, date } = relever(fichier);
    const avant = ref[fichier];
    /* Sans référence, on ne juge pas : c'est un premier passage.
       Texte identique : rien à dire. Date différente : le changement est
       assumé. Il ne reste que le cas fautif — texte modifié, date inchangée. */
    const juste = !avant || avant.empreinte === empreinte || avant.date !== date;
    return { fichier, juste, date };
  });
}

export function enregistrer() {
  const etat = {};
  for (const fichier of PAGES_LEGALES) etat[fichier] = relever(fichier);
  fs.writeFileSync(REFERENCE, JSON.stringify(etat, null, 2) + '\n');
  return etat;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--maj')) {
    const etat = enregistrer();
    for (const [f, { date }] of Object.entries(etat)) console.log(`   ${f.padEnd(42)} « ${date} »`);
    console.log('\n✅ empreinte-legale.json enregistré');
    process.exit(0);
  }
  let echecs = 0;
  for (const { fichier, juste, date } of verifier()) {
    console.log(`   ${juste ? '✅' : '❌'} ${fichier.padEnd(42)} ${juste ? `« ${date} »` : `TEXTE MODIFIÉ, DATE INCHANGÉE — « ${date} »`}`);
    if (!juste) echecs++;
  }
  console.log(echecs
    ? `\n❌ ${echecs} page(s) : reprenez la date, puis  node tests/empreinte-legale.mjs --maj`
    : '\n✅ la date suit le texte');
  process.exit(echecs ? 1 : 0);
}
