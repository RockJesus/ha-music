import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 900));
const p = await page.evaluate(() => { const el = document.getElementById('card').shadowRoot.querySelector('[data-entity-id="media_player.mapc"]'); const b = el.getBoundingClientRect(); return {x:b.x+b.width/2,y:b.y+b.height/2}; });
await page.mouse.move(p.x, p.y);
await page.mouse.down();
await new Promise((r) => setTimeout(r, 1100));
for (let i=1;i<=14;i++){ await page.mouse.move(p.x + (12*i), p.y, {steps:1}); await new Promise((r)=>setTimeout(r,40)); }
await new Promise((r)=>setTimeout(r,150));
await page.screenshot({ path: '/home/user/hm-dev/harness/mid-drag.png' });
await page.mouse.up();
await new Promise((r)=>setTimeout(r,700));
await page.screenshot({ path: '/home/user/hm-dev/harness/dropped.png' });
console.log(await page.evaluate(() => { const c=document.getElementById('card'); return { active: c._activeEntity, cfg: c._config.entities.slice(0,4), dom: [...c.shadowRoot.querySelectorAll('.hm-entity-chip')].slice(0,4).map(e=>e.dataset.entityId), orders: [...c.shadowRoot.querySelectorAll('.hm-entity-chip')].map(e=>e.style.order) }; }));
await browser.close();
