const axios = require('axios');
const cheerio = require('cheerio');
const { pages, mintPages } = require('./pageList.utils');

exports.getHtml = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}