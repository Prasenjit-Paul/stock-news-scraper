const { getHtml, mintNews } = require("../utils/cheerio");
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");
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
    // let linksList = await mintNews();

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
    // })
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(token, { polling: true });
    const linksList = await mintNews();

    // Recursive function to process each URL with a 1-minute delay
    async function processLinks(index = 0) {
        // Stop recursion if all links have been processed
        if (index >= linksList.length) return;

        const url = linksList[index];

        try {
            const scrapedData = await getHtml(pages.mint + url);
            const $ = cheerio.load(scrapedData);
            let result = {};

            result.keyWords = $('meta[name="keywords"]').attr('content') || "No keywords found";
            const heading = $('#article-0').text().trim();

            const allPTags = [];
            $('.storyPage_storyContent__m_MYl p').each((index, element) => {
                allPTags.push($(element).text());
            });

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const promptForHeading = `Please summarize this news heading in 20 words: ${heading}`;
            const promptForContent = `Please summarize this news article in 100 words: ${allPTags.join(' ')}`;

            const [respHeading, respContent] = await Promise.all([
                model.generateContent(promptForHeading),
                model.generateContent(promptForContent)
            ]);

            result.heading = respHeading?.response?.text() || "No heading summary available";
            result.content = respContent?.response?.text() || "No content summary available";

            const finalMessage = `<b>${result.heading}</b>\n${result.content}\nSee Full article: <a href='${pages.mint + url}'>Here</a>`;

            bot.sendMessage(process.env.CHAT_ID, finalMessage, { parse_mode: 'HTML' });
        } catch (error) {
            console.error(`Error processing URL ${url}:`, error);
        }

        // Set a 1-minute delay before processing the next URL
        setTimeout(() => processLinks(index + 1), 60000);
    }

    // Start processing from the first link
    processLinks();


    res.json({
        status: 'SUCCESS',
        message: "Scraping for mint news",
        data: null,
        responseCode: 200
    })
}