import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1000));
const next = await page.evaluate(() => { const b = document.getElementById('card').shadowRoot.querySelector('[data-dir="next"]').getBoundingClientRect(); return {x:b.x+b.width/2,y:b.y+b.height/2}; });
await page.mouse.click(next.x, next.y);
await new Promise((r) => setTimeout(r, 600));
console.log(await page.evaluate(() => {
  const c = document.getElementById('card');
  const strip = c.shadowRoot.querySelector('.hm-entities');
  const wrap = strip.parentElement;
  const arrow = wrap.querySelector('[data-dir="next"]').getBoundingClientRect();
  const chips = [...strip.querySelectorAll('.hm-entity-chip')].map(el => { const r = el.getBoundingClientRect(); return {id: el.dataset.entityId.slice(13), left: Math.round(r.left), right: Math.round(r.right)}; });
  const sr = strip.getBoundingClientRect();
  return { strip: {left: Math.round(sr.left), right: Math.round(sr.right)}, padRight: getComputedStyle(strip).paddingRight, arrow: {left: Math.round(arrow.left), right: Math.round(arrow.right)}, chips };
}));
await browser.close();
