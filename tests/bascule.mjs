/* Simule le jour de la bascule : config.js est servi avec app.alba-studio.co
   et l'on vérifie que TOUS les liens vers l'application suivent. */
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { chromium } from 'playwright-core';
const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const NOUVELLE = 'https://app.alba-studio.co';
const T = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jsx':'text/babel',
           '.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
const srv = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p==='/') p='/index.html'; if (p==='/tarifs') p='/Tarifs.html';
  const f = path.join(ROOT,p);
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end();}
  let body = fs.readFileSync(f);
  // Le seul changement du jour J : la valeur dans config.js.
  if (p==='/config.js') body = Buffer.from(String(body).replace('https://alba-studio.co', NOUVELLE));
  res.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});
  res.end(body);
});
await new Promise(r=>srv.listen(8788,r));
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const page = await b.newPage();
let ko = 0;
for (const route of ['/','/tarifs','/mentions-legales.html']) {
  await page.goto('http://localhost:8788'+route,{waitUntil:'load',timeout:30000});
  await page.waitForTimeout(400);
  const liens = await page.$$eval('a[href*="alba-studio.co"]', as => as.map(a=>a.getAttribute('href')));
  const restants = liens.filter(h => h && !h.startsWith('mailto:') && !h.startsWith('https://app.alba-studio.co'));
  console.log(`\n===== ${route} =====`);
  console.log(`liens vers l'app trouvés : ${liens.length}`);
  console.log(restants.length ? `❌ NON BASCULÉS (${restants.length}) : ${restants.join(' , ')}`
                              : `✅ tous bascules vers ${NOUVELLE}`);
  if (restants.length) ko++;
}
await b.close(); srv.close();
process.exit(ko ? 1 : 0);
