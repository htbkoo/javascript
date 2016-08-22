/**
 * Created by Hey on 22 Aug 2016
 */

var port = 8080;
var http = require('http');

var server = http.createServer(function (req, res) {
    "use strict";
    var receivedData = "";
    req
        .on('data', function (incomingData) {
            receivedData += incomingData;
        })
        .on('end', function () {
            console.log('POST data: %s', receivedData);
        });

    console.log("received request from: ");
    res.writeHead(200);
    res.end(receivedData);
});

console.log("start listening to port: " + port);
server.listen(port);