// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); // 추가

app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
