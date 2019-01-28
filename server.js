const Koa = require('koa');
const app = new Koa();
const fs = require("fs");
const puppeteer = require('puppeteer');

const main = ctx => {
    var url = ctx.request.url;
    var method = ctx.request.method;
    var reqData = ctx.request.body;
    if(url == '/'){
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('index.html');
    }else if(url == '/a'){

        (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://baidu.com', {waitUntil: 'networkidle2'});
        await page.pdf({path: 'hn.pdf', format: 'A3'});
        
        await browser.close();
        })()

        ctx.response.type = 'pdf';
        ctx.response.body = fs.createReadStream('hn.pdf');
    }       
};
app.use(main);
app.listen(3000,()=>{
    console.log("http://localhost:3000");

});