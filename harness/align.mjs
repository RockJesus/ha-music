import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 900));
for (const count of [8, 3]) {
  await page.evaluate((count) => {
    const card = document.getElementById('card');
    const all = ['media_player.mapc','media_player.hass','media_player.imac','media_player.rockjesuspc','media_player.web_chrome_on_windows','media_player.fei_niu_yin_le_lite','media_player.ke_ting_dian_shi_3','media_player.rockjesuspc_de_pc'];
    card.setConfig({ type: 'custom:ha-music', entities: all.slice(0, count) });
  }, count);
  await new Promise((r) => setTimeout(r, 600));
  console.log(count, await page.evaluate(() => {
    const c = document.getElementById('card');
    const root = c.shadowRoot;
    const cardEl = root.querySelector('.hm-card');
    const body = root.querySelector('.hm-body');
    const strip = root.querySelector('.hm-entities');
    const wrap = strip.parentElement;
    const chip = strip.querySelector('.hm-entity-chip').getBoundingClientRect();
    const cr = cardEl.getBoundingClientRect();
    const br = body.getBoundingClientRect();
    const sr = strip.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    return { card: [Math.round(cr.left), Math.round(cr.right)], body: [Math.round(br.left), Math.round(br.right)], wrap: [Math.round(wr.left), Math.round(wr.right)], strip: [Math.round(sr.left), Math.round(sr.right)], chipLeft: Math.round(chip.left), overflow: wrap.dataset.overflow };
  }));
}
await browser.close();
