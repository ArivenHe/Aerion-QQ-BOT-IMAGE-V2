const express = require('express');
const { takeScreenshot } = require('../helpers/puppeteerHelper');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Function to send and delete screenshot
function sendScreenshot(res, screenshotPath) {
    res.sendFile(screenshotPath, (err) => {
        if (err) {
            // If headers are already sent, just log the error and don't send another response
            if (res.headersSent) {
                console.error('Failed to send screenshot:', err);
                return;
            }
            return res.status(500).send({ error: 'Failed to send screenshot', details: err.message });
        }
        // Delete the screenshot file after sending it
        fs.unlink(screenshotPath, (err) => {
            if (err) {
                console.error('Failed to delete screenshot:', err);
            }
        });
    });
}


router.get('/weather', async (req, res) => {
    const icao = req.query.icao;
    if (!icao) return res.status(400).send({ error: 'ICAO parameter is required' });

    const targetUrl = `YOUR_BOT_FORNT_URL`;
    const screenshotPath = path.join(__dirname, '../screenshots', `${icao}_weather_screenshot.png`);

    try {
        await takeScreenshot(targetUrl, screenshotPath);
        sendScreenshot(res, screenshotPath);
    } catch (err) {
        return res.status(500).send({ error: 'Screenshot failed', details: err.message });
    }
});

router.get('/atis', async (req, res) => {
    const icao = req.query.icao;
    if (!icao) return res.status(400).send({ error: 'ICAO parameter is required' });

    const targetUrl = `YOUR_BOT_FORNT_URL`;
    const screenshotPath = path.join(__dirname, '../screenshots', `${icao}_atis_screenshot.png`);

    try {
        await takeScreenshot(targetUrl, screenshotPath);
        sendScreenshot(res, screenshotPath);
    } catch (err) {
        return res.status(500).send({ error: 'Screenshot failed', details: err.message });
    }
});
router.get('/route', async (req, res) => {
    const {dep,app} = req.query;
    console.log(dep);
    console.log(app);
    if (!dep) return res.status(400).send({ error: 'ICAO parameter is required' });

    const targetUrl = `YOUR_BOT_FORNT_URL`;
    const screenshotPath = path.join(__dirname, '../screenshots', `${dep}${app}_route_screenshot.png`);

    try {
        await takeScreenshot(targetUrl, screenshotPath);
        sendScreenshot(res, screenshotPath);
    } catch (err) {
        return res.status(500).send({ error: 'Screenshot failed', details: err.message });
    }
});


module.exports = router;
