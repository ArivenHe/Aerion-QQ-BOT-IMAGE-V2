const puppeteer = require('puppeteer');

async function takeScreenshot(targetUrl, screenshotPath, wait = null) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
        slowMo: 100,
    });
    const page = await browser.newPage();


    await page.goto(targetUrl, {waitUntil: 'networkidle0'});
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.scrollWidth * 2,
            height: document.documentElement.scrollHeight * 1.5
        };
    });
    if (wait) {
        await new Promise(resolve => setTimeout(resolve, wait));
    }


    // Set the viewport with the retrieved dimensions
    await page.setViewport({width: dimensions.width, height: dimensions.height});
    await page.screenshot({path: screenshotPath, fullPage: true});

    // Close the browser
    await browser.close();
}

module.exports = {takeScreenshot};
