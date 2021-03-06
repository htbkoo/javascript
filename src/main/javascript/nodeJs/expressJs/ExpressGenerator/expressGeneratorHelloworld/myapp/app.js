var express = require('express');
var consolidate = require('consolidate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var quotes = require('./routes/quotes');

var app = express();

// assign view engine (consolidate.react) to 'html'
app.engine('jsx', consolidate.react);
app.engine('html', consolidate.ejs);
app.engine('ejs', consolidate.ejs);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (app.get('env') === 'development') {
    // Disable Express's Cache
    app.set('view cache', false);
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/quotes', express.static(path.join(__dirname, 'public')));

// for jQuery and BootStrap
app.use('/js/lib', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js/lib', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js/lib', express.static(__dirname + '/node_modules/string-format/lib')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// for require.js
app.use('/js/lib', express.static(__dirname + '/node_modules/requirejs')); // redirect JS jQuery

app.use('/', routes);
app.use('/users', users);
app.use('/quotes', quotes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    "use strict";
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    //noinspection JSUnusedLocalSymbols
    app.use(function (err, req, res, next) {
        "use strict";
        var code = err.status || 500;
        res.status(code);
        console.log("[development] err.status: " + code);
        res.render('error', {
            title: 'Error: ' + code,
            message: err.message,
            error: err
        });
    });
} else {
// production error handler
// no stacktraces leaked to user
    //noinspection JSUnusedLocalSymbols
    app.use(function (err, req, res, next) {
        "use strict";
        res.status(err.status || 500);
        res.render('error', {
            title: 'Error: ' + err.status,
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;

// log
