const axios = require('axios');
const cheerio = require('cheerio');
const { pages, mintPages } = require('../utils/pageList.utils');

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
            source: url,
            url: linkData,
            status: 'PENDING'
        })

        if (linkData) {
            console.log("here", linkData);
            const findUrl = await linkModel.findOne({ url: linkData });
            console.log(findUrl);

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
        message: "Scraping for mint news",
        data: null,
        responseCode: 200
    })
}