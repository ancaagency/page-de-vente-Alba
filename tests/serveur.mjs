/**
 * Serveur de test commun à smoke.mjs et contenu.mjs.
 *
 * Il sert le site EXACTEMENT tel qu'il sera déployé. Plus aucune réécriture.
 *
 * Ce fichier en faisait deux, et elles ont disparu le même jour, pour la même
 * raison : le site ne dépend plus de personne.
 *   · React, GSAP et Lenis étaient rapatriés de node_modules parce qu'unpkg
 *     était inaccessible ici. Ils vivent maintenant dans /vendor, servis par le
 *     site lui-même — le serveur de test les sert donc comme n'importe quel
 *     fichier.
 *   · Les polices Google étaient neutralisées pour ne pas dépendre du réseau.
 *     Inter est maintenant dans /fonts.
 *
 * C'est un gain qui dépasse le confort : tant qu'un serveur de test réécrit le
 * HTML, il éprouve une page qui n'existe nulle part. Ce qui est testé ici est
 * désormais, octet pour octet, ce que Cloudflare servira.
 *
 * La CSP est lue dans `_headers` : celle de production, sans assouplissement.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
export const CSP = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8')
  .split('\n').find((l) => l.trim().startsWith('Content-Security-Policy:'))
  .replace(/^\s*Content-Security-Policy:\s*/, '').trim();

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jsx': 'text/babel', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.xml': 'application/xml', '.txt': 'text/plain',
  '.woff2': 'font/woff2',
};

/**
 * @param {number} port
 * @param {Record<string, (corps: string) => string>} [remplacements]
 *        chemin servi → transformation de son contenu, pour simuler un fichier
 *        modifié (contenu.js réécrit, config.js basculé…) sans toucher au dépôt.
 */
export async function demarrer(port, remplacements = {}) {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);

    const rel = p === '/' ? '/index.html' : p === '/tarifs' ? '/Tarifs.html' : p;
    const f = path.join(ROOT, rel);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404); return res.end('not found');
    }

    const ext = path.extname(f);
    let body = fs.readFileSync(f);
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
