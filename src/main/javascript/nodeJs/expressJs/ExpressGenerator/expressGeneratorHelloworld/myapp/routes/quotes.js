var express = require("express");
var router = express.Router();

var addMonitoringUnderlyings = require("../helper/HashSet");
var HttpStatus = require('http-status-codes');
var format = require('string-format');

var title = "Quote Page";
var monitoringUnderlyings = {};

router.get("/", function (req, res, next) {
    "use strict";
    res.render("quotes", {"title": title, "underlyings": monitoringUnderlyings});
});

router.post("/add", function (req, res, next) {
    "use strict";
    console.log("Received request body:" + JSON.stringify(req.body));
    var result = addMonitoringUnderlyings(monitoringUnderlyings, req.body);
    var resMessage = format('{} {}: added {}', HttpStatus.OK, HttpStatus.getStatusText(HttpStatus.OK), JSON.stringify(req.body));

    res.send(resMessage);
});

router.delete("/remove", function (req, res, next) {
    "use strict";

});

module.exports = router;

