var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var xml = require('xml');
var xml2js = require('xml2js');
var fs = require('fs');
var config = require(__dirname + '/lib/config.js').config;
var index = require('./routes/index');
var login = require('./routes/login');
var mysql = require('mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(__dirname + '/public'));

// Register the callback to be fired every time auth state changes
app.use('/',index);
app.get('/login',login);

app.listen(3003);


app.get('/sitemap.xml', function(req, res) {
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + '/views/sitemap.xml', function (err, data) {
		parser.parseString(data, function (err, result) {
		res.send(result);
		});
	});
	
});

app.get('/robots.txt', function(req, res) {
	fs.readFile(__dirname + '/robots.txt', 'utf-8',function (err, data) {
		res.send(data);
	});
	
});

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


module.exports = app;
