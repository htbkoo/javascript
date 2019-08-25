/**
 * Created by Hey on 13 Oct 2016
 */

var Test = require('chai');
var ChatMessage = require('testMocha/testInfrastructure')(__dirname, "ChatMessage");

describe('ChatMessage', function () {
    "use strict";
    describe('Builder', function () {
        it('should be able to export builder', function () {
            Test.expect(ChatMessage.getBuilder).is.a('function');
            // Test.expect(ChatMessage.getBuilder).to.be.instanceOf('ChatMessageBuilder');
        });
        it('should be able build ChatMessage with Builder', function () {
            Test.expect(ChatMessage.getBuilder).is.a('function');
            var builder = ChatMessage.getBuilder();
            var chatMessage = builder.withMessage("message").withSender("sender").build();
            Test.expect(chatMessage).to.be.instanceof(ChatMessage);
            Test.expect(chatMessage.getMessage()).to.equal('message');
        });
    });
    describe('ChatMessage', function () {
        it('should be able to export ChatMessage', function () {
            Test.expect(ChatMessage).is.a('function');
            Test.expect(new ChatMessage()).to.be.instanceOf(ChatMessage);
        });
        it('should print received message and your message', function () {
            var chatMessage = new ChatMessage("message", "sender");
            Test.expect(chatMessage.printReceivedMessage()).to.equal('sender: message');
            Test.expect(chatMessage.printYourMessage()).to.equal('message');
        });
    });
});