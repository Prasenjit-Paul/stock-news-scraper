const cron = require('node-cron');
const scrapController = require('../controller/scrapping.controller')

cron.schedule('0 13 * * *', async () => {
    console.log("Starting link Removing...");
    await scrapController.deleteDoneItems();
}, { timezone: 'Asia/Kolkata' });

module.exports = cron