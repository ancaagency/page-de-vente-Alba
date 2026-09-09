/**
 * Régénère le bloc de données structurées FAQPage à partir de contenu.js.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * CE QU'IL FAUT EMPÊCHER DE REVENIR
 *
 * Ce bloc avait été écrit une fois, à la main, en recopiant les questions de
 * contenu.js. Quand les réponses ont changé — la mention « HT » sur les tarifs,
 * puis le retrait de « sans limite de temps » — le JSON-LD est resté figé sur
 * l'ancienne version. Rien ne le signalait : la page affichait le bon texte,
 * et Google lisait l'ancien.
 *
 * Une donnée structurée qui contredit la page est pire que pas de donnée du
 * tout : elle peut faire afficher dans les résultats de recherche une promesse
 * qu'on vient précisément de retirer.
 *
 * Il est désormais dérivé, jamais saisi. Le prérendu l'appelle à chaque
 * exécution, et un test vérifie qu'il correspond.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ET IL SUIT LA LANGUE DE LA PAGE
 *
 * Il ne l'a pas toujours fait. Les cinq pages anglaises servaient la FAQPage
 * EN FRANÇAIS : outils/anglais.mjs recopie l'entête de la page française, et le
 * prérendu réinjectait ensuite la version française par-dessus. Rien ne le
 * signalait, parce qu'aucun contrôle ne lisait les données structurées des
 * pages anglaises — on ne trouve que ce qu'on regarde.
 *
 * Les questions restent repérées sur le texte FRANÇAIS (c'est la convention de
 * contenu.js : une entrée qui finit par « ? » est une question, la suivante est
 * sa réponse), mais elles sont ÉMISES dans la langue demandée.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const DEBUT = '<!-- FAQ-JSONLD:DEBUT — dérivé de contenu.js, ne pas modifier à la main -->';
const FIN = '<!-- FAQ-JSONLD:FIN -->';

/** Lit contenu.js sans l'exécuter dans le contexte global. */
export function lireContenu() {
  const src = fs.readFileSync(path.join(ROOT, 'contenu.js'), 'utf8');
  const bac = {};
  new Function('window', src)(bac);
  return bac.ALBA_CONTENU || {};
}

/**
 * Les questions sont les entrées `faq.*` qui se terminent par « ? » ; la
 * réponse est l'entrée suivante dans l'ordre du fichier. C'est la convention du
 * fichier, et elle est vérifiée : une question sans réponse fait échouer.
 */
export function questionsReponses(contenu = lireContenu(), lang = 'fr') {
  const cles = Object.keys(contenu).filter((k) => k.startsWith('faq.'));
  const paires = [];
  for (let i = 0; i < cles.length; i++) {
    /* Le repérage se fait TOUJOURS sur le français, quelle que soit la langue
       émise : c'est la convention du fichier, et une traduction anglaise dont
       la ponctuation dériverait ne doit pas décaler les paires. */
    const marqueur = contenu[cles[i]]?.fr || '';
    if (!marqueur.trim().endsWith('?')) continue;
    const q = contenu[cles[i]]?.[lang];
    const r = contenu[cles[i + 1]]?.[lang];
    if (!q) throw new Error(`FAQ : « ${marqueur} » n'a pas de version « ${lang} » dans contenu.js`);
    if (!r) throw new Error(`FAQ : « ${marqueur} » n'a pas de réponse « ${lang} » dans contenu.js`);
    paires.push([q, r]);
  }
  return paires;
}

export function blocJsonLd(contenu = lireContenu(), lang = 'fr') {
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang === 'en' ? 'en-GB' : 'fr-FR',
    mainEntity: questionsReponses(contenu, lang).map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return `${DEBUT}\n  <script type="application/ld+json">${JSON.stringify(donnees)}</script>\n  ${FIN}`;
}

/** Remplace le bloc dans un HTML. Renvoie le HTML, inchangé si rien à faire. */
export function injecter(html, lang = 'fr') {
  const bloc = blocJsonLd(lireContenu(), lang);
  const i = html.indexOf(DEBUT);
  if (i !== -1) {
    const j = html.indexOf(FIN, i);
    return html.slice(0, i) + bloc + html.slice(j + FIN.length);
  }
  // Première exécution : on remplace l'ancien bloc écrit à la main.
  const ancien = /\s*<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/;
  if (ancien.test(html)) return html.replace(ancien, '\n  ' + bloc);
  return html.replace('</head>', '  ' + bloc + '\n</head>');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const chemin = path.join(ROOT, 'index.html');
  const avant = fs.readFileSync(chemin, 'utf8');
  const apres = injecter(avant);
  fs.writeFileSync(chemin, apres);
  console.log(`FAQPage : ${questionsReponses().length} questions dérivées de contenu.js` +
              (avant === apres ? ' (déjà à jour)' : ' — index.html mis à jour'));
}
