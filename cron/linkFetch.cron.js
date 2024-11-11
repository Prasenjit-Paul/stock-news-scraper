const cron = require('node-cron');
const linkController = require('../controller/links.controller');

const date = new Date();
const kolkataTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Set to false for 24-hour format
}).format(date);

cron.schedule('*/10 8-20 * * *', async () => {
    console.log("Starting mint link fetching...", kolkataTime);
    await linkController.getMarketLinkOfMint();
}, { timezone: 'Asia/Kolkata' });
cron.schedule('*/10 8-20 * * *', async () => {
    console.log("Starting financial express link fetching...", kolkataTime);
    await linkController.getMarketLinkOfFinancialExpress();
}, { timezone: 'Asia/Kolkata' });

module.exports = cron