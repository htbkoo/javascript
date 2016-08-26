/**
 * Created by Hey on 26 Aug 2016
 */

var express = require("express");
var app = express();
var port = 8080;

app.get("/", function (req, res) {
    "use strict";
    res.send("Hello world!");
});

app.listen(port, function () {
    "use strict";
    console.log("Server started: listening to " + port);
});