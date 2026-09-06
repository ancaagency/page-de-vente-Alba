/**
 * Les pages anglaises correspondent-elles encore à leurs jumelles françaises ?
 *
 * Elles sont ENGENDRÉES par outils/anglais.mjs. Comme les .js issus des .jsx et
 * comme les instantanés de prérendu, elles peuvent donc se périmer sans bruit :
 * on corrige un titre dans index.html, on oublie de régénérer, et la page
 * anglaise continue d'annoncer l'ancien — aux visiteurs et à Google.
 *
 * Ce contrôle relance le générateur en mode vérification. Il ne fabrique rien.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './serveur.mjs';

console.log('\n===== les pages anglaises sont-elles à jour ? =====');
const r = spawnSync(process.execPath, [path.join(ROOT, 'outils', 'anglais.mjs'), '--verifier'], { encoding: 'utf8' });
process.stdout.write(r.stdout || '');
if (r.stderr) process.stderr.write(r.stderr);
process.exit(r.status ?? 1);
