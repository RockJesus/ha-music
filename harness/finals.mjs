import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/usr/local/bin/chromium', headless: true, args: ['--no-sandbox','--disable-gpu','--force-device-scale-factor=2'] });
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 760, deviceScaleFactor: 2 });
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'networkidle0' });
await new Promise(r=>setTimeout(r,700));
for (const mode of ['bars','ring','rail','dual']) {
  await page.evaluate((mode)=>{
    const c=document.getElementById('card');
    const st=c.hass.states['media_player.mapc'];
    st.state='paused'; st.attributes.media_position=112; st.attributes.media_position_updated_at=new Date().toISOString();
    c.setConfig({...c._config, visualizer:mode});
    c.hass={...c.hass};
  }, mode);
  await new Promise(r=>setTimeout(r,700));
  const info=await page.evaluate(()=>{
    const c=document.getElementById('card'); const sr=c.shadowRoot;
    return {mode:c._config.visualizer, progress:!!sr.querySelector('.hm-progress'), ring:!!sr.querySelector('.hm-ring-seek'), fusion:!!sr.querySelector('.hm-fusion'), start:sr.querySelector('[data-role="ring-start"]')?.textContent||sr.querySelector('[data-role="fusion-start"]')?.textContent};
  });
  console.log(JSON.stringify(info));
  const rect=await page.evaluate(()=>{const r=document.getElementById('card').getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height)}});
  await page.screenshot({path:`/home/user/hm-dev/harness/final-${mode}.png`, clip:rect});
}
console.log('errors',errors);
await browser.close();
