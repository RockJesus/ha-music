import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=2'] });
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 760, deviceScaleFactor: 2 });
const errors=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push('console:'+m.text())});
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise(r=>setTimeout(r,1000));
for (const mode of ['bars','ring','rail','dual']) {
  await page.evaluate((mode)=>{ const c=document.getElementById('card'); c.setConfig({...c._config, visualizer: mode}); }, mode);
  await new Promise(r=>setTimeout(r,900));
  const info=await page.evaluate(()=>{
    const c=document.getElementById('card'); const sr=c.shadowRoot;
    const vis=sr.querySelector('.hm-vis'); const fusion=sr.querySelector('.hm-fusion'); const ring=sr.querySelector('.hm-ring-seek');
    const prog=sr.querySelector('.hm-progress');
    return {mode:c._config.visualizer, visStyle:vis?.dataset.style, visH:vis?.getBoundingClientRect().height, fusion:!!fusion, fusionKind:fusion?.dataset.kind, range:!!fusion?.querySelector('.hm-fusion-range'), ring:!!ring, progress:!!prog, layout:c._layoutKey(), canvas:!!sr.querySelector('.hm-spectrum'), coverEq:!!sr.querySelector('.hm-cover-eq')};
  });
  console.log(JSON.stringify(info));
  const cardRect=await page.evaluate(()=>{const r=document.getElementById('card').getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)}});
  await page.screenshot({path:`/home/user/hm-dev/harness/mode-${mode}.png`, clip:cardRect});
}
console.log('errors', errors);
await browser.close();
