import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => {
  const card = document.getElementById('card');
  const strip = card.shadowRoot.querySelector('.hm-entities');
  window.__events = [];
  for (const type of ['pointerdown','pointermove','pointerup','click']) {
    strip.addEventListener(type, (e) => {
      window.__events.push(type + ':' + e.pointerId + ':' + Math.round(e.clientX) + ':' + (e.target.className || ''));
    }, true);
  }
});
const r = await page.evaluate(() => {
  const card = document.getElementById('card');
  const el = card.shadowRoot.querySelector('[data-entity-id="media_player.mapc"]');
  const b = el.getBoundingClientRect();
  return { x: b.x + b.width/2, y: b.y + b.height/2 };
});
await page.mouse.move(r.x, r.y);
await page.mouse.down();
await new Promise((res) => setTimeout(res, 500));
console.log('after hold', await page.evaluate(() => ({ drag: !!document.getElementById('card')._chipDrag, press: !!document.getElementById('card')._chipPress })));
for (let i=1;i<=8;i++){ await page.mouse.move(r.x + i*20, r.y, {steps:1}); await new Promise((res)=>setTimeout(res,30)); }
console.log('mid', await page.evaluate(() => ({ drag: !!document.getElementById('card')._chipDrag, translate: document.getElementById('card')._chipDrag?.translate, idx: document.getElementById('card')._chipDrag?.index, events: window.__events.slice(-12) })));
await page.mouse.up();
await new Promise((res) => setTimeout(res, 800));
console.log('end', await page.evaluate(() => ({ dom: [...document.getElementById('card').shadowRoot.querySelectorAll('.hm-entity-chip')].map(e=>e.dataset.entityId), events: window.__events.slice(0,10) })));
await page.screenshot({ path: '/home/user/hm-dev/harness/dragdebug.png' });
await browser.close();
