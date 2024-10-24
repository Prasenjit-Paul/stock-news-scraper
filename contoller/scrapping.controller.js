const { getHtml } = require("../utils/cheerio");
const cheerio = require('cheerio');

exports.scrap = async (req, res) => {
    const scrapedData = await getHtml('https://www.moneycontrol.com/news/business/earnings/itc-q2fy25-results-net-profit-jumps-3-1-to-rs-5078-3-crore-revenue-rises-16-12849642.html');

    const $ = cheerio.load(scrapedData);

    res.json({
        status: 'SUCCESS',
        message: "Scraping process started",
        data: $,
        responseCode: 200
    })
}