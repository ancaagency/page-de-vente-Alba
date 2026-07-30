/**
 * Serveur de test commun à smoke.mjs et contenu.mjs.
 *
 * Il sert le site tel qu'il sera déployé, à deux nuances près, toutes deux
 * nécessaires pour que la page s'exécute vraiment dans ce bac à sable :
 *   · React, Babel, GSAP et Lenis viennent de node_modules et non d'unpkg, qui
 *     est bloqué ici. Les empreintes `integrity` sont CONSERVÉES : les fichiers
 *     proviennent du même paquet npm, donc Chromium doit les valider. Une
 *     empreinte fausse fait refuser le script — c'est ce qu'on veut détecter ;
 *   · les polices Google sont neutralisées, pour ne pas dépendre du réseau.
 *
 * La CSP est lue dans `_headers` : c'est celle de production qui est éprouvée,
 * pas une version assouplie pour les besoins du test.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const NM = path.resolve(new URL('.', import.meta.url).pathname, 'node_modules');

const CDN = {
  '/vendor/react.js': `${NM}/react/umd/react.production.min.js`,
  '/vendor/react-dom.js': `${NM}/react-dom/umd/react-dom.production.min.js`,
  '/vendor/babel.js': `${NM}/@babel/standalone/babel.min.js`,
  '/vendor/gsap.js': `${NM}/gsap/dist/gsap.min.js`,
  '/vendor/scrolltrigger.js': `${NM}/gsap/dist/ScrollTrigger.min.js`,
  '/vendor/lenis.js': `${NM}/lenis/dist/lenis.min.js`,
};

export const CSP = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8')
  .split('\n').find((l) => l.trim().startsWith('Content-Security-Policy:'))
  .replace(/^\s*Content-Security-Policy:\s*/, '').trim()
  // Les bibliothèques sont servies depuis 'self' pendant le test ; on retire
  // unpkg pour ne rien assouplir par rapport à la production.
  .replace(/https:\/\/unpkg\.com/g, '');

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jsx': 'text/babel', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.xml': 'application/xml', '.txt': 'text/plain',
};

function reecrireHtml(html) {
  return html
    .replace(/https:\/\/unpkg\.com\/react@[^"]*/g, '/vendor/react.js')
    .replace(/https:\/\/unpkg\.com\/react-dom@[^"]*/g, '/vendor/react-dom.js')
    .replace(/https:\/\/unpkg\.com\/@babel\/standalone@[^"]*/g, '/vendor/babel.js')
    .replace(/https:\/\/unpkg\.com\/gsap@[^"]*ScrollTrigger\.min\.js/g, '/vendor/scrolltrigger.js')
    .replace(/https:\/\/unpkg\.com\/gsap@[^"]*gsap\.min\.js/g, '/vendor/gsap.js')
    .replace(/https:\/\/unpkg\.com\/lenis@[^"]*/g, '/vendor/lenis.js')
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, '');
}

/**
 * @param {number} port
 * @param {Record<string, (corps: string) => string>} [remplacements]
 *        chemin servi → transformation de son contenu, pour simuler un fichier
 *        modifié (contenu.js réécrit, config.js basculé…) sans toucher au dépôt.
 */
export async function demarrer(port, remplacements = {}) {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);

    if (CDN[p]) {
      res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Security-Policy': CSP });
      return res.end(fs.readFileSync(CDN[p]));
    }

    const rel = p === '/' ? '/index.html' : p === '/tarifs' ? '/Tarifs.html' : p;
    const f = path.join(ROOT, rel);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404); return res.end('not found');
    }

    const ext = path.extname(f);
    let body = fs.readFileSync(f);
    if (ext === '.html') body = Buffer.from(reecrireHtml(body.toString('utf8')));
    if (remplacements[p]) body = Buffer.from(remplacements[p](body.toString('utf8')));

    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Content-Security-Policy': CSP,
    });
    res.end(body);
  });

  await new Promise((r) => server.listen(port, r));
  return server;
}
