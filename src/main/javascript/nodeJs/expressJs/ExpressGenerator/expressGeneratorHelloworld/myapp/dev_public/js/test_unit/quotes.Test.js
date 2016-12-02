/**
 * Created by Hey on 28 Oct 2016
 */

'use strict';

var $ = require('jquery');
// var sinon = require('sinon');

define(['chai'], function(Test){
    describe("quotes", function () {
        beforeEach(function() {
            console.log('a');
            this.xhr = sinon.useFakeXMLHttpRequest(); // jshint ignore:line

            this.requests = [];
            this.xhr.onCreate = function(xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function() {
            this.xhr.restore();
        });

        describe("add underlying", function () {
            var quotes = require('../quotes');

            it("should provide add function", function(){
                // quotes.
                Test.expect($('#add_button').length).is.greaterThan(0);
            });
            it("should call the add underlying api when clicked button", function(){
                Test.assert.fail("not implemented yet");
            });
        });
    });
});