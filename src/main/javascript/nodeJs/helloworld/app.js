/**
 * Created by Hey on 7 May 2016.
 *
 * ---
 *
 * Helloworld express+nodeJs
 */

var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req, res) {
    "use strict";
    res.send('Hello world!');
});

app.listen(PORT, function () {
    "use strict";
    console.log("Listening on port " + PORT);
});