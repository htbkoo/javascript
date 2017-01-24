/**
 * Created by Hey on 17 Jan 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');
var sinon = require('sinon');

var pathToHtml = path.normalize(__dirname + "/../../wikiViewer.html");

describe("FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("WikiViewer - UI part", function () {
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

            describe("Assert getting random article", function () {
                it("should fetch from random url from wikipedia when clicked the random button", sinon.test(function (done) {
                    this.timeout(1000);
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        // Given
                        var WIKI_RANDOM_ARTICLE_URL = "https://en.wikipedia.org/wiki/Special:Random";
                        var Viewer_randomArticle = sinon.spy(window.Viewer, "randomArticle");

                        // When
                        $('#random').click();

                        // Then
                        // https://en.wikipedia.org/wiki/Special:Random
                        // Test.expect($('.panel-body').text()).to.equal('[{ "id": 12, "comment": "Hey there" }]');
                        Test.expect(Viewer_randomArticle.calledOnce).to.equal(true, "Should have called randomArticle once");

                        window.close();
                        done();
                    });
                }));
            });

            function setUpJsdomEnvAndAssertWith(furtherAssertion) {
                jsdom.env({
                    file: pathToHtml,
                    features: {
                        FetchExternalResources: ['script'],
                        ProcessExternalResources: ['script']
                    },
                    done: function (err, window) {
                        Test.expect(window.$).to.be.a('function');
                        furtherAssertion(err, window, window.$);
                    }
                });
            }
        });
    });
});