import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/local/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage();
await p.setViewport({width:1240,height:1200,deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8899/stage.html',{waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,800));
const cards=await p.$$('ha-music');
for(let i=0;i<cards.length;i++){await cards[i].screenshot({path:`/home/user/hm-dev/harness/stage-${i+1}.png`});}
console.log('ok',cards.length);
await b.close();
