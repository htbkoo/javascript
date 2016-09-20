var express = require("express");
var router = express.Router();

var HashSet = require("../helper/HashSet");
var HttpStatus = require('http-status-codes');
var format = require('string-format');

var title = "Quote Page";
var monitoringUnderlyings = new HashSet();

router.get("/", function (req, res, next) {
    "use strict";
    res.render("quotes", {"title": title, "underlyings": monitoringUnderlyings});
});

router.post("/add", function (req, res, next) {
    "use strict";
    console.log(format("Received request body:{}", JSON.stringify(req.body)));
    var resMessage = "";
    if (!Array.isArray(req.body)) {
        resMessage = format('{0} {1}: parameter "{2}" is not an array! Expecting array of underlying IDs', HttpStatus.BAD_REQUEST, HttpStatus.getStatusText(HttpStatus.BAD_REQUEST), JSON.stringify(req.body));
        var err = new TypeError(resMessage);
        err.status = HttpStatus.BAD_REQUEST;
        next(err);
    } else {
        req.body.forEach(function (item) {
            var isAdded = monitoringUnderlyings.add(item);
            var itemAsString = (item == null) ? "" : item.toString(); // jshint ignore:line
            console.log(format("{0}dded item \"{1}\", number of monitoring underlyings: {2}", isAdded ? "A" : "Not a", itemAsString, monitoringUnderlyings.size()));
        });
        resMessage = format('{} {}: processed input {}', HttpStatus.OK, HttpStatus.getStatusText(HttpStatus.OK), JSON.stringify(req.body));
        res.send(resMessage);
    }
});

router.delete("/remove", function (req, res, next) {
    "use strict";

});

module.exports = router;

