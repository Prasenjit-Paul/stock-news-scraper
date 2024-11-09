const cron = require('node-cron');
const linkController = require('../controller/links.controller')

cron.schedule('*/10 8-20 * * *', async () => {
    console.log("Starting mint link fetching...");
    await linkController.getMarketLinkOfMint();
}, { timezone: 'Asia/Kolkata' });
cron.schedule('*/10 8-20 * * *', async () => {
    console.log("Starting financial express link fetching...");
    await linkController.getMarketLinkOfFinancialExpress();
}, { timezone: 'Asia/Kolkata' });

module.exports = cron