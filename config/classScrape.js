//this file scrapes data from ucm class listing page, currently having problems saving to database
var request = require('request');
var cheerio = require('cheerio');

request.post(
  'https://mystudentrecord.ucmerced.edu/pls/PROD/xhwschedule.P_ViewSchedule',
  { form : { validterm : '201810', subjcode : 'CSE', openclasses : 'Y'} },
  function(err, res, body) {
    console.log(err);
    if(!err && res.statusCode == 200) {
      var $ = cheerio.load(body);
      $('tr').each(function(i, element){
        var title = $(element).children().first().text();
        console.log(title);
      });
    }
  });
