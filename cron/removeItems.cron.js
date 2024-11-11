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
cron.schedule('0 13 * * *', async () => {
    console.log("Starting link Removing...", kolkataTime);
    await scrapController.deleteDoneItems();
}, { timezone: 'Asia/Kolkata' });

module.exports = cron