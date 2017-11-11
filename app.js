//this is the code to start the server which is ran by express.js
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var database = require('./config/database');

var app = express();
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(database.url, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.use(express.static(__dirname + '/public'));

//middleware stuff
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(methodOverride());

//setInterval(function(){
//  console.log('hi');
//}, 500);

require('./config/classScrape');

//render home.html from views
app.get('/', function (req, res) {
  res.render('login');
});

//routes
var api = require('./routes/api.js')(app);
var routes = require('./routes/routes')(app);

app.listen(port, function(){
    console.log('running on Port '+ port);
});
