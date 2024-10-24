const axios = require('axios');

exports.getHtml = async (url) => {
    const { data: html } = await axios.get(url);
    return html;
}