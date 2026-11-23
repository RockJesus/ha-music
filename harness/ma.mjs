import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => {
  const card = document.getElementById('card');
  card.setConfig({ type: 'custom:ha-music', entities: card._config.entities, music_assistant: true });
});
await new Promise((r) => setTimeout(r, 500));
const ma = await page.evaluate(() => { const b = document.getElementById('card').shadowRoot.querySelector('.hm-ma').getBoundingClientRect(); return {x:b.x+b.width/2,y:b.y+b.height/2}; });
const beforeUrl = page.url();
await page.mouse.click(ma.x, ma.y);
await new Promise((r) => setTimeout(r, 700));
console.log(await page.evaluate(() => {
  const c = document.getElementById('card');
  return { drawerOpen: c._drawer.open, mode: c._drawer.mode, title: c._drawer.title, loading: c._drawer.loading, error: c._drawer.error, url: location.href };
}));
console.log('before', beforeUrl, 'errors', errors);
await page.screenshot({ path: '/home/user/hm-dev/harness/ma-drawer.png' });
await browser.close();
