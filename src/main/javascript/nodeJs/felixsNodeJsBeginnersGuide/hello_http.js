// http://nodeguide.com/beginner.html
/**
 * Created by Hey on 30 Jul 2016
 */

var port = 8080;
var http = require('http');

//noinspection JSLint
var server = http.createServer(function (req, res) {
    "use strict";
    console.log("received request from: ");
    res.writeHead(200);
    res.end('Hello Http!');
});

console.log("start listening to port: " + port);
server.listen(port);