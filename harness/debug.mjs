import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
page.on('console', (m) => console.log('CONSOLE', m.type(), m.text()));
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('requestfailed', (r) => console.log('REQFAIL', r.url(), r.failure()?.errorText));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));
console.log(await page.evaluate(() => ({
  defined: !!customElements.get('ha-music-card'),
  tag: document.getElementById('card')?.constructor?.name,
  shadow: !!document.getElementById('card')?.shadowRoot,
  log: document.getElementById('log')?.textContent,
  body: document.body.innerText.slice(0, 200),
})));
await page.screenshot({ path: '/home/user/hm-dev/harness/debug.png' });
await browser.close();
