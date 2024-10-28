const axios = require('axios');
const cheerio = require('cheerio');
const { pages, mintPages } = require('./pageList.utils');

exports.getHtml = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}

exports.mintNews = async () => {
    let url = pages.mint + mintPages.latestNews;
    const { data: news } = await axios.get(url);
    const $ = cheerio.load(news);
    let newsLinkList = [];
    $('.headline').each((index, data) => {
        newsLinkList.push($(data).find('a').attr('href').trim());
    });
    return newsLinkList;
}