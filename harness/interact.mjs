import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));

const box = async (sel) => page.evaluate((sel) => {
  const card = document.getElementById('card');
  const el = sel.startsWith('nav:') ? card.shadowRoot.querySelector(`[data-dir="${sel.slice(4)}"]`) : card.shadowRoot.querySelector(`[data-entity-id="${sel}"]`);
  const b = el.getBoundingClientRect();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}, sel);

// 短按第二个胶囊 -> 应立即切换当前播放器
const hassChip = await box('media_player.hass');
await page.mouse.click(hassChip.x, hassChip.y);
await new Promise((r) => setTimeout(r, 500));
console.log('click switch:', await page.evaluate(() => document.getElementById('card')._activeEntity));

// 点右箭头 -> 列表整体右移，左箭头变为可用
const next = await box('nav:next');
await page.mouse.click(next.x, next.y);
await new Promise((r) => setTimeout(r, 700));
console.log('after next:', await page.evaluate(() => {
  const c = document.getElementById('card');
  const strip = c.shadowRoot.querySelector('.hm-entities');
  const wrap = strip.parentElement;
  return { scrollLeft: Math.round(strip.scrollLeft), prevDisabled: wrap.querySelector('[data-dir="prev"]').disabled, nextDisabled: wrap.querySelector('[data-dir="next"]').disabled };
}));
await page.screenshot({ path: '/home/user/hm-dev/harness/after-next.png' });

// 点左箭头 -> 回滚
const prev = await box('nav:prev');
await page.mouse.click(prev.x, prev.y);
await new Promise((r) => setTimeout(r, 700));
console.log('after prev:', await page.evaluate(() => {
  const c = document.getElementById('card');
  const strip = c.shadowRoot.querySelector('.hm-entities');
  return { scrollLeft: Math.round(strip.scrollLeft), overflow: strip.parentElement.dataset.overflow };
}));
console.log('pageerrors', errs);
await browser.close();
