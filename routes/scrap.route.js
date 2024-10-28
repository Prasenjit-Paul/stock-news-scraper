const express = require('express');
const router = express.Router();

const scrapController = require("../contoller/scrapping.controller");

router.get('/scrap', scrapController.scrap);
router.get('/mint-news-scrap', scrapController.mintNewsScrap);

module.exports = router;