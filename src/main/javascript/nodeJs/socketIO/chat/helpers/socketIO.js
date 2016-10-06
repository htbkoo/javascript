/**
 * Created by Hey on 3 Oct 2016
 */

var createIO = function (server) {
    'use strict';
    // initialize socket.io
    var io = require('socket.io')(server);

    var onConnection = function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('chat message', function (msg) {
            console.log('message: ' + msg);
            io.emit("chat message", msg);
        });
    };
    io.on('connection', onConnection);
    return io;
};

module.exports = createIO;