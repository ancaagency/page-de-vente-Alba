/**
 * Vérifie la couche de contenu : contenu.js remplace bien les textes, et ne peut
 * pas casser la page.
 *
 * Quatre contrôles, dans cet ordre d'importance :
 *   1. AUCUNE BIBLIOTHÈQUE NE REVENDIQUE « Txt ». GSAP et Lenis sont chargés en
 *      scripts classiques : leurs noms minifiés d'une lettre deviennent des
 *      globaux. La première version de cet utilitaire s'appelait T(), qui est la
 *      classe VirtualScroll de Lenis — la page d'accueil ne montait plus rien.
 *   2. LE FILET TIENT. Un contenu.js volontairement cassé doit laisser la page
 *      intacte, avec les textes d'origine. C'est toute la raison d'être du
 *      dispositif : la page transpile son JSX dans le navigateur, sans build
 *      pour rattraper une faute de frappe.
 *   3. LE REMPLACEMENT MARCHE VRAIMENT. Un filet qui tient parce que rien ne
 *      passe jamais ne servirait à rien.
 *   4. LES CLÉS SE CORRESPONDENT, dans les deux sens : pas de Txt() sans entrée
 *      (l'édition n'aurait aucun effet), pas d'entrée sans Txt() (on éditerait
 *      un texte qui ne s'affiche nulle part).
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { demarrer, ROOT } from './serveur.mjs';

const FICHIERS = ['sections.jsx', 'audience.jsx', 'founder.jsx', 'features-carousel.jsx'];
let echecs = 0;
const ok = (bon, texte) => { console.log(`   ${bon ? '✅' : '❌'} ${texte}`); if (!bon) echecs++; };

// ——— 4. Correspondance des clés (sans navigateur) ———
console.log('\n===== clés =====');

const utilisees = new Set();
for (const f of FICHIERS) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of src.matchAll(/(?<![A-Za-z0-9_$.])Txt\(\s*"((?:\\.|[^"\\])*)"/g)) utilisees.add(m[1]);
}

const contenuSrc = fs.readFileSync(path.join(ROOT, 'contenu.js'), 'utf8');
const bac = {};
new Function('window', contenuSrc)(bac);
const declarees = new Set(Object.keys(bac.ALBA_CONTENU || {}));

const sansEntree = [...utilisees].filter((c) => !declarees.has(c));
const sansUsage = [...declarees].filter((c) => !utilisees.has(c));

console.log(`   ${utilisees.size} clés appelées dans le code, ${declarees.size} déclarées dans contenu.js`);
ok(sansEntree.length === 0, `toute clé appelée a son entrée${sansEntree.length ? ` — manquantes : ${sansEntree.slice(0, 6).join(', ')}` : ''}`);
ok(sansUsage.length === 0, `aucune entrée orpheline${sansUsage.length ? ` — inutilisées : ${sansUsage.slice(0, 6).join(', ')}` : ''}`);

// ——— Contrôles en navigateur ———
const CASSE = '/* volontairement invalide */ window.ALBA_CONTENU = { "accueil.centralisez-vos-projets": { fr: "x"';
const PHARE = 'CE TEXTE VIENT DE CONTENU.JS';
const CLE_PHARE = 'accueil.centralisez-vos-projets';

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

/** Charge l'accueil avec un contenu.js éventuellement transformé. */
async function accueil(port, transformation) {
  const srv = await demarrer(port, transformation ? { '/contenu.js': transformation } : {});
  const page = await browser.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(`${e.name}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/i.test(m.text())) erreurs.push(m.text());
  });
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'load', timeout: 40000 });
  await page.waitForTimeout(6000);
  return { page, srv, erreurs };
}

// ——— 1. Collision de noms globaux ———
console.log('\n===== noms globaux =====');
{
  const { page, srv, erreurs } = await accueil(8794);
  const etat = await page.evaluate(() => ({
    txt: typeof window.Txt,
    // Ce que les bibliothèques laissent fuiter, pour mémoire dans le journal.
    courts: Object.getOwnPropertyNames(window).filter((k) => k.length <= 2 && /^[A-Za-z_]/.test(k)).sort().join(' '),
    lenis: typeof window.Lenis,
  }));
  console.log(`   globaux courts présents : ${etat.courts}`);
  ok(etat.txt === 'function', 'window.Txt est bien notre utilitaire');
  ok(erreurs.length === 0, `aucune erreur JavaScript${erreurs.length ? ` — ${erreurs[0].slice(0, 140)}` : ''}`);
  ok(await page.locator('#fondateur').count() > 0, 'les sections sont montées (Lenis n’est pas cassé)');
  await page.close(); srv.close();
}

// ——— 2. Le filet : contenu.js cassé ———
console.log('\n===== filet de sécurité =====');
{
  const { page, srv, erreurs } = await accueil(8795, () => CASSE);
  const sections = await page.locator('#fondateur, #faq, #contact, .pricing-card').count();
  const titre = (await page.locator('h1.display').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
  console.log(`   titre affiché : « ${titre.slice(0, 60)} »`);
  ok(sections >= 4, 'la page se monte quand même');
  ok(titre.includes('Centralisez vos projets'), 'le texte d’origine est affiché (repli du code)');
  // L'erreur de syntaxe de contenu.js est attendue et n'est PAS une panne :
  // le fichier ne s'exécute pas, window.ALBA_CONTENU reste indéfini, on retombe
  // sur les littéraux. On vérifie seulement qu'aucune AUTRE erreur ne suit.
  const autres = erreurs.filter((e) => !/SyntaxError/i.test(e));
  ok(autres.length === 0, `aucune erreur en cascade${autres.length ? ` — ${autres[0].slice(0, 140)}` : ''}`);
  await page.close(); srv.close();
}

// ——— 3. Le remplacement prend effet ———
console.log('\n===== remplacement =====');
{
  const remplacer = (corps) => corps.replace(
    new RegExp(`("${CLE_PHARE}": \\{\\s*fr: )"(?:\\\\.|[^"\\\\])*"`),
    `$1"${PHARE}"`,
  );
  const avant = remplacer(contenuSrc) !== contenuSrc;
  ok(avant, 'la clé témoin est bien substituable dans contenu.js');

  const { page, srv, erreurs } = await accueil(8796, remplacer);
  const titre = (await page.locator('h1.display').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
  console.log(`   titre affiché : « ${titre.slice(0, 60)} »`);
  ok(titre.includes(PHARE), 'le texte de contenu.js remplace celui du code');
  ok(erreurs.length === 0, `aucune erreur JavaScript${erreurs.length ? ` — ${erreurs[0].slice(0, 140)}` : ''}`);
  await page.close(); srv.close();
}

await browser.close();
console.log(`\n${echecs ? `❌ ${echecs} problème(s)` : '✅ tout est vert'}`);
process.exit(echecs ? 1 : 0);
