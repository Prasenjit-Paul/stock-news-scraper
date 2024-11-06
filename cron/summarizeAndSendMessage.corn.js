const cron = require('node-cron');
const scrapController = require('../controller/scrapping.controller')

cron.schedule('*/5 * * * *', async () => {
    console.log("Starting Summarization");
    await scrapController.mintNewsScrap();
});

module.exports = cron