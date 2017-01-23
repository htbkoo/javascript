/**
 * Created by Hey on 17 Jan 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');
var sinon = require('sinon');

var $ = require('jquery');

var fs = require('fs');
var PATH_TO_LIB = "src/main/javascript/online/free_code_camp/lib";
// var $_src = fs.readFileSync(PATH_TO_LIB + "/jquery-1.11.3/jquery-1.11.3.min.js");
// var bootstrap_src = fs.readFileSync(PATH_TO_LIB + "/bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/js/bootstrap.min.js");
// var wikiViewer_src = fs.readFileSync(path.normalize(__dirname + "/../wikiViewer.js"));
// var wikiViewer_UI_src = fs.readFileSync(path.normalize(__dirname + "/../wikiViewer_UI.js"));
var $_src = path.normalize(PATH_TO_LIB + "/jquery-1.11.3/jquery-1.11.3.min.js");
var bootstrap_src = path.normalize(PATH_TO_LIB + "/bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/js/bootstrap.min.js");
var wikiViewer_src = path.normalize(__dirname + "/../wikiViewer.js");
var wikiViewer_UI_src = path.normalize(__dirname + "/../wikiViewer_UI.js");

var Viewer = require("../wikiViewer");

describe("FreeCodeCamp", function () {
    "use strict";
    function setUpJsdomEnvAndAssertWith(furtherAssertion) {
        // TODO: to improve/automate the external scripts fetching
        jsdom.env({
            file: path.normalize(__dirname + "/../../wikiViewer.html"),
            // scripts: [
            //     $_src,
            //     bootstrap_src,
            //     wikiViewer_src,
            //     wikiViewer_UI_src
            // ],
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

        xdescribe("Assert getting random article", function () {
            var xhr, requests;

            before(function () {
                sinon.config = {
                    useFakeTimers: false
                };
            });

            after(function () {
                delete sinon.config.useFakeTimers;
            });

            beforeEach(function () {
                xhr = sinon.useFakeXMLHttpRequest();
                requests = [];
                xhr.onCreate = function (xhr) {
                    requests.push(xhr);
                };
            });

            afterEach(function () {
                xhr.restore();
            });

            it("should fetch from random url from wikipedia when clicked the random button", sinon.test(function (done) {
                this.timeout(1000);
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    // Given


                    // When
                    $('#random').click();

                    // Then
                    // https://en.wikipedia.org/wiki/Special:Random
                    Test.expect(requests.length).to.equal(1, "There should be 1 request sent");


                    window.close();
                    done();
                });
            }));
        });

        describe("Assert getting random article", function () {
            var server;

            before(function () {
                sinon.config = {
                    useFakeTimers: false
                };
            });

            after(function () {
                delete sinon.config.useFakeTimers;
            });

            beforeEach(function () {
                server = sinon.fakeServer.create();
            });

            afterEach(function () {
                server.restore();
            });

            it("should fetch from random url from wikipedia when clicked the random button", sinon.test(function (done) {
                this.timeout(1000);
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    // Given
                    var WIKI_RANDOM_ARTICLE_URL = "https://en.wikipedia.org/wiki/Special:Random";
                    server.respondWith("GET", WIKI_RANDOM_ARTICLE_URL,
                        [200, {"Content-Type": "text/html"},
                            '[{ "id": 12, "comment": "Hey there" }]']);

                    // When
                    $('#random').click();
                    server.respond();

                    // Then
                    // https://en.wikipedia.org/wiki/Special:Random
                    Test.expect($('.panel-body').text()).to.equal('[{ "id": 12, "comment": "Hey there" }]');

                    window.close();
                    done();
                });
            }));
        });
    });
});