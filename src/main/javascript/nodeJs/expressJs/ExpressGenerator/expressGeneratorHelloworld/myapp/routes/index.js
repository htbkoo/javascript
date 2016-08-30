var express = require('express');
var router = express.Router();
// var router = require('react-router').Route;
// var router = express();

/* GET home page. */
//noinspection JSUnusedLocalSymbols
router.get('/', function (req, res, next) {
    "use strict";
    // res.render();
    res.render('index', {title: 'Express'});
    // res.render('index.html', { title: 'Express with HTML' });
    // res.send("a");
});

module.exports = router;
//,{base: 'index.html'}