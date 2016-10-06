/**
 * Created by Hey on 4 Oct 2016
 */

console.log("loaded index.js");

var socket = io();
$('#messages_input_form').submit(function () {
    "use strict";
    var $m = $('#m');
    if ($m.val() !== '') {
        socket.emit('chat message', {"nickname": $('#nickname').val(), "message": $m.val()});
    }
    $m.val('');
    return false;
});

socket.on("chat message", function (msg) {
    "use strict";
    $('#messages').append($('<li>').text(msg));
});

/*
 var socket = io('http://localhost:3000');
 socket.on('news', function (data) {
 console.log(data);
 socket.emit('my other event', { my: 'data' });
 });
 */
