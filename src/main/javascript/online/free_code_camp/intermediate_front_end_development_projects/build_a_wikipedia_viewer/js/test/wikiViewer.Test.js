/**
 * Created by Hey on 17 Jan 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');

var fs = require('fs');
var PATH_TO_LIB = "src/main/javascript/online/free_code_camp/lib/";
var $_src = fs.readFileSync(PATH_TO_LIB + "jquery-1.11.3/jquery-1.11.3.min.js");
var bootstrap_src = fs.readFileSync(PATH_TO_LIB + "bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/js/bootstrap.min.js");

var Viewer = require("../wikiViewer");

describe("FreeCodeCamp", function () {
    "use strict";
    function setUpJsdomEnvAndAssertWith(furtherAssertion) {
        // TODO: to improve/automate the external scripts fetching
        jsdom.env({
            file: path.normalize(__dirname + "/../../wikiViewer.html"),
            src: [
                $_src,
                bootstrap_src
            ],
            done: function (err, window) {
                Test.expect(window.$).to.be.a('function');
                furtherAssertion(err, window, window.$);
            }
        });
    }

    describe("FrontEnd - Intermediate Project", function () {
        describe("WikiViewer", function () {

            describe("Assert page elements", function () {
                // try using jsdom
                [
                    createSelector('#viewer'),
                    createSelector('#query', 'input'),
                    createSelector('#search', 'button'),
                    createSelector('#random', 'button')
                ].forEach(function (selector) {
                    it(format("should be able to find {} in the page with jQuery", selector.name), function (done) {
                        this.timeout(1000);

                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            // Given
                            // When
                            // Then
                            var $elems = $(selector.name);
                            Test.expect($elems.length).to.equal(1, format("There should be an element '{}'", selector.name));
                            if (typeof selector.type !== 'undefined') {
                                Test.expect($elems.is(selector.type)).to.be.true;
                            }

                            // Clean Up
                            window.close();
                            done();
                        });
                    });
                });

                function createSelector(name, type) {
                    return {
                        name: name,
                        type: type
                    };
                }
            });
        });
    });
});