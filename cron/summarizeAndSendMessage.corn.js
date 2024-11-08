const cron = require('node-cron');
const scrapController = require('../controller/scrapping.controller')

cron.schedule('*/30 8-20 * * *', async () => {
    console.log("Starting Mint Summarization");
    await scrapController.mintNewsScrap();
}, { timezone: 'Asia/Kolkata' });

cron.schedule('*/32 8-20 * * *', async () => {
    console.log("Starting Financial Express Summarization");
    await scrapController.financialExpressMarketNewsScrap();
}, { timezone: 'Asia/Kolkata' });

module.exports = cron