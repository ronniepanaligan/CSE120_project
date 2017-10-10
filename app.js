//this is the code to start the server which is ran by express.js
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

var db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cse120', { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//middleware stuff
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(port, function(){
    console.log('running on Port '+ port);
});
