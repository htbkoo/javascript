"use strict";

var express = require("express");
var router = express.Router();

var HashSet = require("../helper/HashSet");
var HttpStatus = require('http-status-codes');
var format = require('string-format');

var title = "Quote Page";
var monitoringUnderlyings = new HashSet();

router.get("/", function (req, res, next) {
    res.render("quotes", {"title": title, "underlyings": monitoringUnderlyings});
});

function isRequestBodyValid(req) {
    return Array.isArray(req.body);
}
router.post("/add", function (req, res, next) {
    console.log(format("add: Received request body:{}", JSON.stringify(req.body)));
    var resMessage = "";
    var err;
    if (!isRequestBodyValid(req)) {
        resMessage = format('{0} {1}: parameter \'{2}\' is not an array! Expecting array of underlying IDs', HttpStatus.BAD_REQUEST, HttpStatus.getStatusText(HttpStatus.BAD_REQUEST), JSON.stringify(req.body));
        err = new TypeError(resMessage);
        err.status = HttpStatus.BAD_REQUEST;
        next(err);
        return;
    }

    req.body.forEach(function (item) {
        var isAdded = monitoringUnderlyings.add(item);
        var itemAsString = (item == null) ? "" : item.toString(); // jshint ignore:line
        console.log(format("{0}dded item \"{1}\", number of monitoring underlyings: {2}", isAdded ? "A" : "Not a", itemAsString, monitoringUnderlyings.size()));
    });
    resMessage = format('{} {}: processed input {}', HttpStatus.OK, HttpStatus.getStatusText(HttpStatus.OK), JSON.stringify(req.body));
    res.send(resMessage);
});

router.post("/remove", function (req, res, next) {
    // TODO: to improve logging
    console.log(format("remove: Received request body:{}", JSON.stringify(req.body)));

    // TODO: to improve by reducing duplication
    var resMessage = "";
    var err;
    if (!isRequestBodyValid(req)) {
        resMessage = format('{0} {1}: parameter \'{2}\' is not an array! Expecting array of underlying IDs', HttpStatus.BAD_REQUEST, HttpStatus.getStatusText(HttpStatus.BAD_REQUEST), JSON.stringify(req.body));
        err = new TypeError(resMessage);
        err.status = HttpStatus.BAD_REQUEST;
        next(err);
        return;
    }

    req.body.forEach(function (item) {
        var isRemoved = monitoringUnderlyings.remove(item);
        var itemAsString = (item == null) ? "" : item.toString(); // jshint ignore:line
        console.log(format("{0}emoved item \"{1}\", number of monitoring underlyings: {2}", isRemoved ? "R" : "Not r", itemAsString, monitoringUnderlyings.size()));
    });
    resMessage = format('{} {}: processed input {}', HttpStatus.OK, HttpStatus.getStatusText(HttpStatus.OK), JSON.stringify(req.body));
    res.send(resMessage);

});

module.exports = router;

