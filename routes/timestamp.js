var express = require('express');
var chrono = require('chrono-node');
var moment = require('moment');

var router = express.Router();


/* GET home page. */
router.get('/:timestr', function(req, res){

    var timestr = req.params.timestr;

    if(isNaN(parseInt(timestr))){
        if(chrono.parse(timestr).length==0){
            res.json({
                unix: null,
                natural: null
            })
        }else{
            var d = chrono.parse(timestr)[0].start.knownValues;
            var datestr = d.year+'-'+ d.month+'-'+d.day;
            var naturalDate = moment(datestr).format('MMMM DD, YYYY');

            var unixTime = Math.round(new Date(datestr).getTime()/1000);
            res.json(JSON.stringify({unix: unixTime, natural: naturalDate}));
        }
    }else{
        var datestr = new Date(timestr*1000);
        console.log(datestr.toDateString())
        var naturalDate = moment(datestr.toDateString()).format('MMMM DD, YYYY');

        res.json(JSON.stringify({unix: timestr, natural: naturalDate}));
    }
});

router.get('/', function(req, res, next) {
    res.render('timestamp');
});

module.exports = router;
