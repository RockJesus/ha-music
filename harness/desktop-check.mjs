import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage(); await p.setViewport({width:700,height:800,deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8899/index.html',{waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,600));
const card=await p.$('ha-music'); await card.screenshot({path:'desktop-check.png'}); await b.close();
