var express = require('express');
var router = express.Router();
var validUrl = require('valid-url');
var shortid = require('shortid');

var Url = require('../models/Urls');

/* GET users listing. */

router.get('/goto/*', function(req, res){
    console.log("into /goto")
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("url:"+url)
    Url.find({shorten: url}, function(err, result){
        if(err){
            res.send({
                error: err
            });
        }else{
            if(result.length==0){
                res.send({
                    error: "Url not registered, please go to /new first"
                });
            }else{
                res.redirect(result[0].original);
            }
        }
    });
});

router.get('/new/*', function(req, res){
    console.log("into /new")
    var urlPrefix = req.protocol + '://' + req.get('host') + '/shorten/goto/';

    var url = req.url.substring(5, req.url.length);
    if(!validUrl.isUri(url)){
        return res.send({
            error: "invalid url string!!!"
        })
    }else{
        //check if it is already in our db
        Url.find({original: url},function(err, existUrl){
            if(err){
                res.send({
                    error: err
                });
            }else{
                if(existUrl.length==0){
                    var newUrl = new Url();
                    newUrl.original = url;
                    newUrl.shorten = urlPrefix+shortid.generate();
                    newUrl.save(function(err, result){
                        if(err){
                            res.send({
                                error: err
                            });
                        }else{
                            res.send({
                                status: "New Url Created",
                                originalUrl: result.original,
                                shortenUrl: result.shorten
                            });
                        }
                    })
                }else{
                    //console.log(existUrl)
                    res.send({
                        status: "Url Already Exists",
                        originalUrl: existUrl[0].original,
                        shortenUrl: existUrl[0].shorten
                    })
                }
            }
        });
    }
});


router.get('/', function(req, res) {
    console.log("into /")
    res.render('shortenurl');
});

module.exports = router;
