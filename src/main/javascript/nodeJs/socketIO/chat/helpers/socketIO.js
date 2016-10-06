/**
 * Created by Hey on 3 Oct 2016
 */

var format = require('string-format');

var createIO = function (server) {
    'use strict';
    // initialize socket.io
    var io = require('socket.io')(server);

    var onConnection = function (socket) {
        console.log('a user connected');
        io.emit("chat message", "[System] Someonen joined!");

        socket.on('disconnect', function () {
            console.log('user disconnected');
            io.emit("chat message", "[System] Someonen left!");
        });
        socket.on('chat message', function (msg) {
            console.log(format('"{}" chatted message: {}', msg.nickname, msg.message));
            io.emit("chat message", format("{}: {}", msg.nickname, msg.message));
        });
    };
    io.on('connection', onConnection);
    return io;
};

module.exports = createIO;