import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage(); const errs=[];
p.on('pageerror',e=>errs.push(String(e.message))); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.setViewport({width:600,height:700});
const out=[];
for (const v of ['bars','ring','rail','wave','orbit','dual','none']) {
  await p.goto('http://127.0.0.1:8899/index.html',{waitUntil:'domcontentloaded'});
  await new Promise(r=>setTimeout(r,400));
  out.push(await p.evaluate((v)=>{
    const c=window.__card; c.setConfig({type:'custom:ha-music',entities:window.__ids,layout:'full',visualizer:v}); c.hass=window.__card.hass;
    return new Promise(r=>setTimeout(()=>{
      const s=c.shadowRoot;
      r({v, style:s.querySelector('.hm-vis')?.dataset.style||null, spectrum:!!s.querySelector('.hm-spectrum'), ring:!!s.querySelector('.hm-ring-seek'), fusion:!!s.querySelector('.hm-fusion')});
    },300));
  },v));
}
console.log(JSON.stringify({out,errs},null,2)); await b.close();
