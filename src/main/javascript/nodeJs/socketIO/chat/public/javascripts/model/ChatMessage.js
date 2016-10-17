/**
 * Created by Hey on 13 Oct 2016
 */


var format = require('string-format');

function ChatMessage(_message, _sender) {
    "use strict";
    var message = _message, sender = _sender;

    this.getMessage = function () {
        return message;
    };

    this.getSender = function () {
        return sender;
    };

    this.printReceivedMessage = function () {
        return format("{}: {}", sender, message);
    };

    this.printYourMessage = function () {
        return format("{}", message);
    };

    return this;
}

var ChatMessageBuilder = function () {
    "use strict";
    var message, sender;

    this.withMessage = function (msg) {
        message = msg;
        return this;
    };
    this.withSender = function (s) {
        sender = s;
        return this;
    };
    this.build = function (s) {
        return new ChatMessage(message, sender);
    };

    return this;
};

ChatMessage.getBuilder = function () {
    "use strict";
    return new ChatMessageBuilder();
};

module.exports = ChatMessage;

// if (typeof define !== 'function') { var define = require('amdefine')(module); }
//
// define(function(require, exports, module) {
//     var dep = require('dependency');
//
//     //The value returned from the function is
//     //used as the module export visible to Node.
//     return function () {};
// });
//
//
// /**
//  * Created by Hey on 13 Oct 2016
//  */
//
//
// var requirejs = require('requirejs');
//
// requirejs.config({
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require
// });
//
// var ChatMessage;
// var ChatMessageBuilder;
//
// // Start the main app logic.
// requirejs(['string-format'],
//     function (format) {
//         ChatMessage = function (_message, _sender) {
//             "use strict";
//             var message = _message, sender = _sender;
//
//             this.getMessage = function () {
//                 return message;
//             };
//
//             this.getSender = function () {
//                 return sender;
//             };
//
//             this.printReceivedMessage = function () {
//                 return format("{}: {}", sender, message);
//             };
//
//             this.printYourMessage = function () {
//                 return format("{}", message);
//             };
//
//             return this;
//         };
//
//         ChatMessageBuilder = function () {
//             "use strict";
//             var message, sender;
//
//             this.withMessage = function (msg) {
//                 message = msg;
//                 return this;
//             };
//             this.withSender = function (s) {
//                 sender = s;
//                 return this;
//             };
//             this.build = function (s) {
//                 return new ChatMessage(message, sender);
//             };
//
//             return this;
//         };
//
//         ChatMessage.getBuilder = function () {
//             "use strict";
//             return new ChatMessageBuilder();
//         };
//     }
// );
//
//
// module.exports = ChatMessage;

// define(function(require, exports, module) {
// // Start the main app logic.
//     requirejs(['jquery', 'bootstrap', 'socket.io', 'model/ChatMessage'],
//         function ($, bootstrap, io, ChatMessage) {
//             'use strict';
//             //jQuery, bootstrap and the model/ChatMessage module are all
//             //loaded and can be used here now.
//
//             var socket = io();
//             var displayMessage = function (msg) {
//                 $('#messages').append($('<li>').text(msg));
//             };
//
//             $('#messages_input_form').submit(function () {
//                 var $m = $('#m');
//                 var msg = $m.val();
//                 if (msg !== '') {
//                     var chatMessage = ChatMessage.getBuilder().withMessage('msg').withSender($('#nickname').val()).build();
//                     socket.emit('chat message', chatMessage);
//                     displayMessage(chatMessage.printYourMessage());
//                 }
//                 $m.val('');
//                 return false;
//             });
//
//             socket.on("chat message", function (msg) {
//                 displayMessage(msg);
//             });
//
//             /*
//              var socket = io('http://localhost:3000');
//              socket.on('news', function (data) {
//              console.log(data);
//              socket.emit('my other event', { my: 'data' });
//              });
//              */
//
//         }
//     );
// });