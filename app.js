// var livereload = require('express-livereload')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var formidable = require('formidable')
var ejs = require('ejs')

var routes = require('./routes/index');
var users = require('./routes/users');
var animals = require('./routes/Animals');
var person = require('./routes/Person');
var scienceConcept = require('./routes/ScienceConcept');
var region = require('./routes/Region');

var app = express();

// view engine setup
app.engine('ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/Animals', animals);
app.use('/Person', person);
app.use('/Region', region);
app.use('/ScienceConcept', scienceConcept);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  // mongoose.connect('mongodb:55.55.55.5/mongo')
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

livereload = require('livereload');
server = livereload.createServer({
  exts: ['js', 'css', 'html', 'hjs']
});
server.watch(path.join(__dirname, "views"));
server.watch(path.join(__dirname, "public"));



module.exports = app;
