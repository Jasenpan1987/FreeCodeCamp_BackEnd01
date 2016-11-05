var express = require('express');

var router = express.Router();

var getClientIp = function(req) {
    return (req.headers["X-Forwarded-For"] ||
        req.headers["x-forwarded-for"] ||
        '').split(',')[0] ||
        req.client.remoteAddress;
};

router.get('/', function(req, res){
    getClientIp(req);
    var userObj = {
        ipaddress: req.client.remoteAddress,
        system: req.useragent.os,
        platform: req.useragent.platform,
        browser: req.useragent.browser+ ' V'+req.useragent.version,
        language: req.headers["accept-language"].split(",")[0]
    };
    res.send(userObj);
});

module.exports = router;