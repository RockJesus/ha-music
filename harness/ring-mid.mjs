import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage(); await p.setViewport({width:1160,height:1080,deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8899/index.html',{waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,400));
await p.evaluate(()=>{
  const c=window.__card; c._config={...c._config,layout:'full',visualizer:'ring',show_lyrics:false};
  c.setConfig({type:'custom:ha-music',entities:window.__ids,layout:'full',visualizer:'ring',show_lyrics:false});
  const id='media_player.mapc'; c.hass.states[id]={...c.hass.states[id],state:'playing',attributes:{...c.hass.states[id].attributes,media_position:63,media_duration:158,media_position_updated_at:new Date().toISOString()}}; c.hass=Object.assign({},c.hass);
});
await new Promise(r=>setTimeout(r,900));
await p.screenshot({path:'ring-mid.png'}); await b.close();
