import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=2'] });
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 760, deviceScaleFactor: 2 });
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise(r=>setTimeout(r,900));

// rail: drive range to 75%
await page.evaluate(()=>{ const c=document.getElementById('card'); c.setConfig({...c._config, visualizer:'rail'}); });
await new Promise(r=>setTimeout(r,800));
await page.evaluate(()=>{
  const c=document.getElementById('card'); const sr=c.shadowRoot;
  const input=sr.querySelector('.hm-fusion-range');
  input.value=String(Number(input.max)*0.75);
  input.dispatchEvent(new Event('input',{bubbles:true}));
  input.dispatchEvent(new Event('change',{bubbles:true}));
});
await new Promise(r=>setTimeout(r,300));
console.log('rail', await page.evaluate(()=>({calls:(window.__calls||[]).slice(-2), pct:document.getElementById('card').shadowRoot.querySelector('.hm-fusion').style.getPropertyValue('--pct'), label:document.getElementById('card').shadowRoot.querySelector('[data-role="fusion-start"]').textContent, preview:document.getElementById('card')._seekPreview})));

// ring: pointer at 3 o'clock (25%)
await page.evaluate(()=>{ const c=document.getElementById('card'); c.setConfig({...c._config, visualizer:'ring'}); });
await new Promise(r=>setTimeout(r,800));
await page.evaluate(()=>{
  const c=document.getElementById('card'); const sr=c.shadowRoot;
  const el=sr.querySelector('.hm-ring-seek'); const r=el.getBoundingClientRect();
  const cx=r.left+r.width/2, cy=r.top+r.height/2;
  const x=cx+r.width/2-4, y=cy;
  const opt={bubbles:true,pointerId:7,clientX:x,clientY:y,pointerType:'mouse'};
  el.dispatchEvent(new PointerEvent('pointerdown',opt));
  el.dispatchEvent(new PointerEvent('pointerup',opt));
});
await new Promise(r=>setTimeout(r,300));
console.log('ring', await page.evaluate(()=>({calls:(window.__calls||[]).slice(-2), label:document.getElementById('card').shadowRoot.querySelector('[data-role="ring-start"]').textContent, preview:document.getElementById('card')._seekPreview})));
console.log('errors',errors);
await browser.close();
