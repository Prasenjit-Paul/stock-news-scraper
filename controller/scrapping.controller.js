const { getHtml, mintNews } = require("../utils/cheerio");
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const { pages } = require("../utils/pageList.utils");


exports.scrap = async (req, res) => {
    const url = 'https://www.moneycontrol.com/news/business/earnings/itc-q2fy25-results-net-profit-jumps-3-1-to-rs-5078-3-crore-revenue-rises-16-12849642.html'
    const scrapedData = await getHtml(url);

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(token, { polling: true });
    let result = {};

    const $ = cheerio.load(scrapedData);

    let keyWords = $('meta[name="Keywords"]').attr('content');
    console.log(keyWords.includes('itc cigarette price'));

    let heading = $('.article_title').text();

    let allPTags = [];

    $('.content_wrapper').each((index, data) => {
        allPTags.push($(data).find('p').text());
    });

    result.keyWords = keyWords;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptForHeading = "Please summarize this given news Heading in most human readable format within 20 words " + heading;
    const promptForContent = "Please summarize this given news article in most human readable format within 100 words " + allPTags;

    const respHeading = await model.generateContent(promptForHeading);
    const respContent = await model.generateContent(promptForContent);

    result.heading = respHeading.response.text();
    result.content = respContent.response.text();

    const finalMessage = `<b>${result?.heading}</b>\n${result?.content?.toString()}\nSee Full article : <a href='${url}'>Here</a>`;

    bot.sendMessage(process.env.CHAT_ID, finalMessage, { parse_mode: 'HTML' });

    res.json({
        status: 'SUCCESS',
        message: "Scraping Successfully",
        data: result,
        responseCode: 200
    })
};

exports.mintNewsScrap = async (req, res) => {
    let linksList = await mintNews();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    // linksList.forEach(async (url) => {
    //     const scrapedData = await getHtml(pages.mint + url);
    //     const $ = cheerio.load(scrapedData);
    //     let result = {};

    //     let keyWords = $('meta[name="keywords"]').attr('content');
    //     result.keyWords = keyWords;
    //     let heading = $('#article-0').text();

    //     let allPTags = [];

    //     $('.storyPage_storyContent__m_MYl').each((index, data) => {
    //         allPTags.push($(data).find('p').text());
    //     });


    //     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    //     const promptForHeading = "Please summarize this given news Heading in most human readable format within 20 words " + heading;
    //     const promptForContent = "Please summarize this given news article in most human readable format within 100 words " + allPTags;

    //     const respHeading = await model.generateContent(promptForHeading);
    //     const respContent = await model.generateContent(promptForContent);

    //     result.heading = respHeading.response.text();
    //     result.content = respContent.response.text();

    //     const finalMessage = `<b>${result?.heading}</b>\n${result?.content?.toString()}\nSee Full article : <a href='${url}'>Here</a>`;

    //     bot.sendMessage(process.env.CHAT_ID, finalMessage, { parse_mode: 'HTML' });
    // });

    let iterator = 0;
    while (linksList.length > 0) {
        const url = pages.mint + linksList[iterator];
        const scrapedData = await getHtml(url);
        const $ = cheerio.load(scrapedData);
        let result = {};

        let keyWords = $('meta[name="keywords"]').attr('content');
        result.keyWords = keyWords;
        let heading = $('#article-0').text();

        let allPTags = [];

        $('.storyPage_storyContent__m_MYl').each((index, data) => {
            allPTags.push($(data).find('p').text());
        });

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ]


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

        const promptForHeading = "Please summarize this given news Heading in most human readable format within 20 words " + heading;
        const promptForContent = "Please summarize this given news article in most human readable format within 100 words " + allPTags;

        const respHeading = await model.generateContent(promptForHeading);
        const respContent = await model.generateContent(promptForContent);

        if (respContent) {
            iterator++;
        }

        result.heading = respHeading.response.text();
        result.content = respContent.response.text();

        const finalMessage = `<b>${result?.heading}</b>\n${result?.content?.toString()}\nSee Full article : <a href='${url}'>Here</a>`;

        bot.sendMessage(process.env.CHAT_ID, finalMessage, { parse_mode: 'HTML' });

    }


    res.json({
        status: 'SUCCESS',
        message: "Scraping for mint news",
        data: null,
        responseCode: 200
    })
}