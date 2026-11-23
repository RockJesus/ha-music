import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath:'/usr/local/bin/chromium', headless:true, args:['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({width:1800,height:1200,deviceScaleFactor:2});
await page.goto('http://127.0.0.1:8899/premium/rot/index.html',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,500));
const cards=await page.$$('.card');
for(let i=0;i<cards.length;i++){await cards[i].screenshot({path:`/home/user/hm-dev/harness/premium/rot/r${i+1}.png`});}
console.log('ok',cards.length);
await browser.close();
