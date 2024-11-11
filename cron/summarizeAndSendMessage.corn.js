const cron = require('node-cron');
const scrapController = require('../controller/scrapping.controller')

const date = new Date();
const kolkataTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to false for 24-hour format
}).format(date);

cron.schedule('*/12 8-20 * * *', async () => {
    console.log("Starting Mint Summarization", kolkataTime);
    await scrapController.mintNewsScrap();
}, { timezone: 'Asia/Kolkata' });

cron.schedule('*/12 8-20 * * *', async () => {
    console.log("Starting Financial Express Summarization", kolkataTime);
    await scrapController.financialExpressMarketNewsScrap();
}, { timezone: 'Asia/Kolkata' });

cron.schedule('0 * * * *', async () => {
    console.log("Checking...,kolkataTime");
}, { timezone: 'Asia/Kolkata' });

module.exports = cron