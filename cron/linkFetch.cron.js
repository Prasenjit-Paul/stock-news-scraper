const cron = require('node-cron');
const linkController = require('../controller/links.controller')

cron.schedule('*/5 * * * *', async () => {
    console.log("Starting");

    await linkController.getLinksOfMint();
});

module.exports = cron