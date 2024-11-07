const cron = require('node-cron');
const linkController = require('../controller/links.controller')

cron.schedule('*/20 8-20 * * *', async () => {
    console.log("Starting mint link fetching...");
    await linkController.getMarketLinkOfMint();
});
cron.schedule('*/20 8-20 * * *', async () => {
    console.log("Starting financial express link fetching...");
    await linkController.getMarketLinkOfFinancialExpress();
});

module.exports = cron