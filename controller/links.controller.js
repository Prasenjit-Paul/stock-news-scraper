const axios = require('axios');
const cheerio = require('cheerio');
const { pages, mintPages, financialExpressPages } = require('../utils/pageList.utils');

const linkModel = require('../models/links.model')

exports.getLinksOfMint = async (req, res) => {
    let url = pages.mint + mintPages.latestNews;
    const { data: news } = await axios.get(url);
    const $ = cheerio.load(news);
    let newsLinkList = [];
    $('.headline').each(async (index, data) => {
        let linkData = $(data).find('a').attr('href').trim();
        newsLinkList.push(linkData);
        const link = new linkModel({
            sourceLink: url,
            source: 'MINT-LATEST',
            url: linkData,
            status: 'PENDING'
        })

        if (linkData) {
            const findUrl = await linkModel.findOne({ url: linkData });
            if (findUrl) {
                return;
            } else {
                try {
                    await link.save();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });

    res.json({
        status: 'SUCCESS',
        message: "Scraping for mint latest news",
        data: null,
        responseCode: 200
    })
}

exports.getMarketLinkOfMint = async (req, res) => {
    let url = pages.mint + mintPages.marketPage;
    const { data: market } = await axios.get(url);
    const $ = cheerio.load(market);
    let marketLinkList = [];
    $('.market-news_news_row__5THDw h2').each(async (index, data) => {
        let linkData = $(data).find('a').attr('href').trim();
        marketLinkList.push(linkData);
        const link = new linkModel({
            sourceLink: url,
            source: 'MINT-MARKET',
            url: linkData,
            status: 'PENDING'
        })

        if (linkData) {
            const findUrl = await linkModel.findOne({ url: linkData });
            if (findUrl) {
                return;
            } else {
                try {
                    await link.save();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
    res.json({
        status: 'SUCCESS',
        message: "Scraping for mint market news",
        data: null,
        responseCode: 200
    })
}

exports.getMarketLinkOfFinancialExpress = async (req, res) => {
    let url = pages.financialExpress + financialExpressPages.marketPage;
    const { data: market } = await axios.get(url);
    const $ = cheerio.load(market);
    const marketLinkList = $('.ie-network-grid__lhs').first().find('.entry-title a').map((i, link) => $(link).attr('href')).get();

    if (marketLinkList.length > 0) {
        marketLinkList.forEach(async (linkData) => {
            const link = new linkModel({
                sourceLink: url,
                source: 'FINANCIAL-EXPRESS-MARKET',
                url: linkData,
                status: 'PENDING'
            })

            if (linkData) {
                const findUrl = await linkModel.findOne({ url: linkData });
                if (findUrl) {
                    return;
                } else {
                    try {
                        await link.save();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        })
    }

    res.json({
        status: 'SUCCESS',
        message: "Scraping for financial express market news",
        data: null,
        responseCode: 200
    })

}