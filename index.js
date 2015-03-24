var cheerio = require('cheerio'),
    request = require('request'),
    nodemailer = require('nodemailer'),
    authObj = require('./auth.json');

var URL = 'https://sites.fastspring.com/kapeli/instant/dash';
var threshold = 19.99;

function fetchDomContent(url, cb) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            cb(body);
        } else {
            console.log('Unable to visit the page: ' + url);
        }
    });
}

function sendMail(price) {
    var transporter = nodemailer.createTransport({
        service: authObj.service,
        auth: {
            user: authObj.user,
            pass: authObj.pwd
        }
    });
    transporter.sendMail({
        from: authObj.user,
        to: authObj.user,
        subject: 'Dash Price Dropped',
        text: 'Woo! Dash price has dropped from ' + threshold + ' to ' + price + '.'
    });
}

fetchDomContent(URL, function(contentStr) {
    var $ = cheerio.load(contentStr);
    var priceStr = $('.store-value-money-single').text();
    var price = parseFloat(priceStr.replace(/[^\d\.]+/, ''));
    if (price < threshold) {
        sendMail(price);
    }
});
