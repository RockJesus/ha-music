import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => {
  const card = document.getElementById('card');
  const ids = ['media_player.mapc','media_player.hass','media_player.imac'];
  card.setConfig({ type: 'custom:ha-music', entities: ids });
  card.hass = { ...card.hass, states: card.hass.states };
});
await new Promise((r) => setTimeout(r, 800));
console.log(await page.evaluate(() => {
  const c = document.getElementById('card');
  const strip = c.shadowRoot.querySelector('.hm-entities');
  const wrap = strip.parentElement;
  const nav = wrap.querySelector('[data-dir="next"]');
  const first = strip.querySelector('.hm-entity-chip').getBoundingClientRect();
  const card = c.shadowRoot.querySelector('.hm-card').getBoundingClientRect();
  return { overflow: wrap.dataset.overflow, navDisplay: getComputedStyle(nav).display, scrollW: strip.scrollWidth, clientW: strip.clientWidth, firstLeft: Math.round(first.left), cardLeft: Math.round(card.left) };
}));
await page.screenshot({ path: '/home/user/hm-dev/harness/short.png' });
await browser.close();
