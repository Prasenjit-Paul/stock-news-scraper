const { getHtml } = require("../utils/cheerio");
const cheerio = require('cheerio');

exports.scrap = async (req, res) => {
    const scrapedData = await getHtml('https://www.moneycontrol.com/news/business/earnings/itc-q2fy25-results-net-profit-jumps-3-1-to-rs-5078-3-crore-revenue-rises-16-12849642.html');

    let result = {};

    const $ = cheerio.load(scrapedData);

    let keyWords = $('meta[name="Keywords"]').attr('content');
    console.log(keyWords.includes('itc cigarette price'));

    let heading = $('.article_title').text();

    let allPTags = [];

    $('.content_wrapper').each((index, data) => {
        allPTags.push($(data).find('p').text() + "~");
    });

    result.heading = heading;
    result.keyWords = keyWords;
    result.content = allPTags;

    res.json({
        status: 'SUCCESS',
        message: "Scraping Successfully",
        data: result,
        responseCode: 200
    })
}