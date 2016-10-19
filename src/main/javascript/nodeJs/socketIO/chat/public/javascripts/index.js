/**
 * Created by Hey on 4 Oct 2016
 */

console.log("loaded index.js");

requirejs.config({
    //By default load any module IDs from javascripts/lib
    baseUrl: 'javascripts/lib',
    //except, if the module ID starts with "index",
    //load it from the javascripts/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    shim: {
        "bootstrap": {"deps": ['jquery']}
    },
    paths: {
        model: '../model'
    }
});

// Start the main app logic.
requirejs(['jquery', 'bootstrap', 'socket.io', 'model/ChatMessage'],
    function ($, bootstrap, io, ChatMessage) {
        'use strict';
        //jQuery, bootstrap and the model/ChatMessage module are all
        //loaded and can be used here now.

        var socket = io();
        var displayMessage = function (msg) {
            $('#messages').append($('<li>').text(msg));
        };

        $('#messages_input_form').submit(function () {
            var $m = $('#m');
            var msg = $m.val();
            if (msg !== '') {
                var chatMessage = ChatMessage.getBuilder().withMessage(msg).withSender($('#nickname').val()).build();
                socket.emit('chat message', {
                    "nickname": chatMessage.getSender(),
                    "message": chatMessage.getMessage(),
                    "formatted": chatMessage.printReceivedMessage()
                });
                displayMessage(chatMessage.printYourMessage());
            }
            $m.val('');
            return false;
        });

        socket.on("chat message", function (msg) {
            displayMessage(msg);
        });

        /*
         var socket = io('http://localhost:3000');
         socket.on('news', function (data) {
         console.log(data);
         socket.emit('my other event', { my: 'data' });
         });
         */

    }
);
