import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage(); await p.setViewport({width:430,height:900,deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8899/index.html',{waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,300));
await p.evaluate(()=>{
  const c=window.__card;
  document.querySelector('#stage').style.width='390px';
  c.style.width='390px'; c.style.height='760px';
  for (const id of window.__ids) c.hass.states[id].attributes.supported_features=2147483647;
  c.hass.states['media_player.mapc'].attributes.queue=[{title:'Everglow',artist:'Coldplay',duration:271},{title:'Next',artist:'X',duration:200}];
  c.hass.services={ha_music_studio:{}};
  c.setConfig({type:'custom:ha-music',entities:window.__ids,layout:'full',visualizer:'bars',show_lyrics:false});
  c.hass=Object.assign({},c.hass);
});
await new Promise(r=>setTimeout(r,900));
const card=await p.$('ha-music'); await card.screenshot({path:'mobile-controls.png'}); await b.close();
