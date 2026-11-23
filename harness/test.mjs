import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: '/usr/local/bin/chromium',
  headless: true,
  args: ['--no-sandbox','--disable-gpu','--window-size=1200,900','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1800));
const info = await page.evaluate(() => {
  const card = document.getElementById('card');
  const strip = card.shadowRoot.querySelector('.hm-entities');
  const wrap = strip.parentElement;
  return {
    chips: [...strip.querySelectorAll('.hm-entity-chip')].map((el) => el.dataset.entityId),
    overflow: wrap.dataset.overflow,
    scrollWidth: strip.scrollWidth,
    clientWidth: strip.clientWidth,
    prev: wrap.querySelector('[data-dir="prev"]').disabled,
    next: wrap.querySelector('[data-dir="next"]').disabled,
    log: document.getElementById('log').textContent,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: '/home/user/hm-dev/harness/before.png' });

const rects = await page.evaluate(() => {
  const card = document.getElementById('card');
  const chips = [...card.shadowRoot.querySelectorAll('.hm-entity-chip')];
  return chips.slice(0, 3).map((el) => {
    const r = el.getBoundingClientRect();
    return { id: el.dataset.entityId, x: r.x + r.width / 2, y: r.y + r.height / 2, left: r.left, width: r.width };
  });
});
console.log('rects', rects);

// 长按第一个胶囊并拖到第三个的位置
const first = rects[0];
const target = rects[2];
await page.mouse.move(first.x, first.y);
await page.mouse.down();
await new Promise((r) => setTimeout(r, 480));
for (let i = 1; i <= 12; i += 1) {
  await page.mouse.move(first.x + ((target.x - first.x) * i) / 12, first.y, { steps: 1 });
  await new Promise((r) => setTimeout(r, 25));
}
await new Promise((r) => setTimeout(r, 120));
await page.mouse.up();
await new Promise((r) => setTimeout(r, 900));
const after = await page.evaluate(() => {
  const card = document.getElementById('card');
  const strip = card.shadowRoot.querySelector('.hm-entities');
  return {
    dom: [...strip.querySelectorAll('.hm-entity-chip')].map((el) => el.dataset.entityId),
    config: (card._config.entities || []).slice(),
    inlineLeft: getComputedStyle(strip.querySelector(`[data-entity-id="media_player.mapc"]`)).transform,
  };
});
console.log('after', JSON.stringify(after, null, 2));
await page.screenshot({ path: '/home/user/hm-dev/harness/after.png' });
console.log('errors', errors.slice(0, 8));
await browser.close();
