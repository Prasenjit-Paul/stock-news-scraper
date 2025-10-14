const axios = require("axios");

exports.getHtml = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
            },
            timeout: 10000,
            validateStatus: (status) => status < 500, // treat 404 as handled, not crash
        });

        if (response.status !== 200) {
            console.warn(`⚠️ Skipping ${url} (status ${response.status})`);
            return null;
        }

        return response.data;
    } catch (error) {
        console.error(`❌ Failed to fetch ${url}:`, error.message);
        return null;
    }
};