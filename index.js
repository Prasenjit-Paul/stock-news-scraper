const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const scrapRoute = require("./routes/scrap.route");
const linkRoute = require("./routes/linkFetch.route")
const { isValidUrl } = require('./utils/checkUrl.util');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,app-id,x-access-token");
    next();
});

require("./models/mongo.db");

require("./cron/linkFetch.cron");
require("./cron/summarizeAndSendMessage.corn")

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use("/scrapping", scrapRoute);

app.use("/link-fetch", linkRoute);

app.listen(process.env.PORT, () => {
    console.log(`Scrapping app listening on port ${process.env.PORT}`);
});

// const token = process.env.TELEGRAM_BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     if (msg?.text) {
//         let urlCheck = isValidUrl(msg?.text);

//         if (urlCheck) {
//             bot.sendMessage(chatId, msg?.text);
//         }

//     }
// });