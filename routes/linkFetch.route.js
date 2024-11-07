const express = require('express');
const router = express.Router();

const linkController = require("../controller/links.controller");

router.get('/mint-market', linkController.getMarketLinkOfMint);
router.get('/financial-express-market', linkController.getMarketLinkOfFinancialExpress);

module.exports = router;