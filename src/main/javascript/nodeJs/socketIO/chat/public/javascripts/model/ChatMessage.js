/**
 * Created by Hey on 13 Oct 2016
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

if (typeof requirejs !== 'function') {
    var requirejs = require('requirejs');
}

if (typeof format !== 'function') {
    var format = require('string-format');
}

define([], function () {
    "use strict";
    function ChatMessage(_message, _sender) {
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
        return new ChatMessageBuilder();
    };

    //The value returned from the function is
    //used as the module export visible to Node.
    return ChatMessage;
});