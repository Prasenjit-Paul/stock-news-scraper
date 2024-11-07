const cron = require('node-cron');
const scrapController = require('../controller/scrapping.controller')

cron.schedule('*/20 8-20 * * *', async () => {
    console.log("Starting Mint Summarization");
    await scrapController.mintNewsScrap();
});

cron.schedule('*/20 8-20 * * *', async () => {
    console.log("Starting Financial Express Summarization");
    await scrapController.financialExpressMarketNewsScrap();
});

module.exports = cron