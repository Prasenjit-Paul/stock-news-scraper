const express = require('express')
const app = express();
const dotenv = require('dotenv').config();

const scrapRoute = require("./routes/scrap.route");

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,app-id,x-access-token");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use("/scrapping", scrapRoute)

app.listen(process.env.PORT, () => {
    console.log(`Scrapping app listening on port ${process.env.PORT}`);
})