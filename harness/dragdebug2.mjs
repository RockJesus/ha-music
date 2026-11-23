import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));
const r = await page.evaluate(() => { const el = document.getElementById('card').shadowRoot.querySelector('[data-entity-id="media_player.mapc"]'); const b = el.getBoundingClientRect(); return { x: b.x + b.width/2, y: b.y + b.height/2 }; });
await page.mouse.move(r.x, r.y);
await page.mouse.down();
await new Promise((res) => setTimeout(res, 480));
console.log('after hold', await page.evaluate(() => { const c=document.getElementById('card'); return { drag: !!c._chipDrag, press: !!c._chipPress, dt: c._chipDrag && performance.now() }; }));
for (let i = 1; i <= 12; i += 1) { await page.mouse.move(r.x + ((155 * i) / 12), r.y, { steps: 1 }); await new Promise((res)=>setTimeout(res,25)); }
await new Promise((res)=>setTimeout(res,120));
console.log('before up', await page.evaluate(() => { const c=document.getElementById('card'); return { drag: !!c._chipDrag, idx: c._chipDrag?.index, dom: [...c.shadowRoot.querySelectorAll('.hm-entity-chip')].map(e=>e.dataset.entityId) }; }));
await page.mouse.up();
await new Promise((res)=>setTimeout(res,900));
console.log('end', await page.evaluate(() => { const c=document.getElementById('card'); return { drag: !!c._chipDrag, dom: [...c.shadowRoot.querySelectorAll('.hm-entity-chip')].map(e=>e.dataset.entityId), cfg: c._config.entities?.slice(), save: window.__lovelace.views[0].cards[0].entities }; }));
await browser.close();
