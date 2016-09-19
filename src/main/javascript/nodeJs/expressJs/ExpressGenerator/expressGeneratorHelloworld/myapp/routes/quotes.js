var express = require("express");
var router = express.Router();

var addMonitoringUnderlyings = require("../helper/addIfNotExist");

var title = "Quote Page";
var monitoringUnderlyings = {};

router.get("/", function (req, res, next) {
    "use strict";
    res.render("quotes", {"title": title, "underlyings": monitoringUnderlyings});
});

router.post("/add", function (req, res, next) {
    "use strict";
    console.log("Received request body:" + JSON.stringify(req.body));
    var resMessage = addMonitoringUnderlyings(monitoringUnderlyings, req.body);
    res.send(resMessage);
});

router.delete("/remove", function (req, res, next) {
    "use strict";

});

module.exports = router;

