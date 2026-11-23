import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage(); const errs=[];
p.on('pageerror',e=>errs.push(String(e.message))); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.setViewport({width:1240,height:1200,deviceScaleFactor:1});
await p.goto('http://127.0.0.1:8899/stage.html',{waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,700));
const out=await p.evaluate(()=>{
  const card=document.querySelector('ha-music'); const sr=card.shadowRoot;
  const cover=sr.querySelector('.hm-cover'); cover.click();
  const stage=card.shadowRoot.querySelector('.hm-stage')?.className;
  const overlay=card.shadowRoot.querySelector('.hm-stage-overlay')?.className;
  const coverSize=getComputedStyle(card).getPropertyValue('--hm-cover-size');
  return {stage,overlay,coverSize,stageEls:card.shadowRoot.querySelectorAll('.hm-stage').length,calls:(window.__calls||[]).length};
});
await new Promise(r=>setTimeout(r,300));
console.log(JSON.stringify({out,errs},null,2));
await b.close();
