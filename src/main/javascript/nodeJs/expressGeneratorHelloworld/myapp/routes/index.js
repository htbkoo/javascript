var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
    //res.render('index.html', { title: 'Express with HTML' });
    //res.send("a");
});

module.exports = router;
