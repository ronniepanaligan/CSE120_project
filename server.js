//this is the code to start the server which is ran by express.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const database = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(database.url, { useMongoClient: true });

app.use(express.static(path.join(__dirname, 'dist')));

//middleware stuff
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'views')));
app.use(methodOverride());

//setInterval(function(){
//  console.log('hi');
//}, 500);

//require('./config/classScrape');
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

//routes
const api = require('./routes/api.js')(app);
const routes = require('./routes/routes')(app);

app.listen(port, function(){
    console.log('running on Port '+ port);
});
