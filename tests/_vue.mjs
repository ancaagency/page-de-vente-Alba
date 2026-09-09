import { chromium } from 'playwright-core';
import { demarrer } from './serveur.mjs';
const srv = await demarrer(0);
const base = `http://127.0.0.1:${srv.address().port}`;
const nav = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const D = '/tmp/claude-0/-home-user-page-de-vente-Alba/4383a354-f9b1-5661-acac-93bf9a00504a/scratchpad';
for (const v of [{n:'t-bureau', w:1280, h:1400, m:false}, {n:'t-mobile', w:390, h:1600, m:true}]) {
  const ctx = await nav.newContext({ viewport:{width:v.w,height:v.h}, isMobile:v.m, hasTouch:v.m, deviceScaleFactor:2 });
  const page = await ctx.newPage();
  const err = [];
  page.on('console', (m) => { if (m.type()==='error') err.push(m.text().slice(0,140)); });
  page.on('pageerror', (e) => err.push('PAGE ERROR: '+String(e).slice(0,160)));
  await page.goto(base + '/tarifs', { waitUntil:'load' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${D}/${v.n}.png`, fullPage: false });
  console.log(`${v.n} : ${err.length ? 'ERREURS → '+err.join(' | ') : 'aucune erreur console'}`);
  await ctx.close();
}
await nav.close(); srv.close(); process.exit(0);
