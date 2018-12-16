const puppeteer = require('puppeteer');

const express = require('express')
const app = express()
const port = 4000

app.get('/printing', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/', {waitUntil: 'networkidle2'});
    const buffer = await page.pdf({
        path: 'report-puppeteer.pdf', 
        printBackground: true,
        format: 'A4'
    });
  
    await browser.close();
    res.header('Content-type', 'application/pdf');
    res.send(buffer);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))