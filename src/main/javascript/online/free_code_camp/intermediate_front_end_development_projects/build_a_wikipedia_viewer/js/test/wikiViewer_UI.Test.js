/**
 * Created by Hey on 17 Jan 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');
var sinon = require('sinon');
var fs = require('fs');

describe("FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("WikiViewer - UI part", function () {
            function getRelativePath(pathFromDirName) {
                return path.normalize(__dirname + pathFromDirName);
            }

            var pathToHtml = getRelativePath("/../../wikiViewer.html");

            describe("Assert page elements", function () {
                // try using jsdom
                [
                    createSelector('#viewer'),
                    createSelector('#resultDisplay'),
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

            // https://en.wikipedia.org/wiki/Special:Random
            describe("Assert getting random article", function () {
                it("should open random page from wikipedia when clicked the random button", sinon.test(function (done) {
                    this.timeout(1000);
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        // Given
                        var WIKI_RANDOM_ARTICLE_URL = "https://en.wikipedia.org/wiki/Special:Random";
                        var Viewer_randomArticle = sinon.spy(window.Viewer, "randomArticle");
                        var window_open = sinon.spy(window, "open");

                        // When
                        $('#random').click();

                        // Then
                        // Test.expect($('.panel-body').text()).to.equal('[{ "id": 12, "comment": "Hey there" }]');
                        Test.expect(Viewer_randomArticle.calledOnce).to.equal(true, "Should have called randomArticle once");
                        Test.expect(window_open.calledWith(WIKI_RANDOM_ARTICLE_URL)).to.equal(true, format("Should have called window.open with '{}' once", WIKI_RANDOM_ARTICLE_URL));

                        window.close();
                        done();
                    });
                }));
            });

            // https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=search&gsrsearch=meaning
            describe("Assert searching", function () {
                var CALLBACK_NAME = '?';
                var WIKI_HOST_URL = "https://en.wikipedia.org";

                [
                    'wiki',
                    'meaning'
                ].forEach(function (keyword) {
                    it(format("should search for '{}' and get list of result back", keyword), sinon.test(function (done) {
                        this.timeout(1000);

                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            // Given
                            var WIKI_QUERY_URL = format("{}/w/api.php?action=query&format=json&list=search&srprop=snippet&callback={}&srsearch={}", WIKI_HOST_URL, CALLBACK_NAME, keyword);
                            var WIKI_QUERY_RESPONSE_DATA = fs.readFileSync(getRelativePath("/./resources/search_wiki_response.json"));
                            var WIKI_QUERY_RESPONSE = '/**/' + CALLBACK_NAME + '(' + WIKI_QUERY_RESPONSE_DATA + ')';

                            var $_getJSON = sinon.stub($, "getJSON");
                            $_getJSON.withArgs(WIKI_QUERY_URL).yields(WIKI_QUERY_RESPONSE);

                            var mockViewer = sinon.mock(window.Viewer);
                            mockViewer.expects("parseSearchResponse").once().withArgs(WIKI_QUERY_RESPONSE).returns([]);

                            // When
                            $('#query').val(keyword);
                            $('#search').click();

                            // Then
                            mockViewer.verify();

                            window.close();
                            done();
                        });
                    }));
                });


                it("should display response data", sinon.test(function (done) {
                    this.timeout(1000);

                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        // Given
                        var WIKI_QUERY_RESPONSE_DATA = fs.readFileSync(getRelativePath("/./resources/search_wiki_response.json"));
                        var WIKI_QUERY_RESPONSE = '/**/' + CALLBACK_NAME + '(' + WIKI_QUERY_RESPONSE_DATA + ')';

                        var $_getJSON = sinon.stub($, "getJSON");
                        $_getJSON.yields(WIKI_QUERY_RESPONSE);

                        var Viewer_parseSearchResponse = sinon.stub(window.Viewer, "parseSearchResponse");
                        var searchResults = [
                            {
                                "ns": 0,
                                "title": "Wiki (disambiguation)",
                                "snippet": "Wikipedia:Glossary. A <span class=\"searchmatch\">wiki</span> (or <span class=\"searchmatch\">wiki</span> <span class=\"searchmatch\">wiki</span>) is a collaborative website. <span class=\"searchmatch\">Wiki</span> or <span class=\"searchmatch\">wiki</span> <span class=\"searchmatch\">wiki</span> may also refer to the following:   <span class=\"searchmatch\">Wiki</span><span class=\"searchmatch\">Wiki</span>Web, the original <span class=\"searchmatch\">wiki</span> website,"
                            },
                            {
                                "ns": 0,
                                "title": "WikiProject",
                                "snippet": "project page on <span class=\"searchmatch\">Wiki</span>Projects, see Wikipedia:<span class=\"searchmatch\">Wiki</span>Project. A <span class=\"searchmatch\">Wiki</span>Project (or Wikiproject) is the organization of a group of participants in a <span class=\"searchmatch\">wiki</span> established"
                            },
                            {
                                "ns": 0,
                                "title": "Comparison of wiki hosting services",
                                "snippet": "This comparison of <span class=\"searchmatch\">wiki</span> hosting services details notable online services which host <span class=\"searchmatch\">wiki</span>-style editable web pages. General characteristics of cost, presence"
                            }];
                        Viewer_parseSearchResponse.withArgs(WIKI_QUERY_RESPONSE).returns(searchResults);

                        // When
                        $('#search').click();

                        // Then
                        var $listGroup = $('#resultDisplay').find(".list-group");
                        Test.expect($listGroup.length).to.equal(1, "There should be one list-group to hold the search results");
                        var $a_list_items = $listGroup.find("a");
                        Test.expect($a_list_items.length).to.equal(searchResults.length, format("There should be {} items in the list", searchResults.length));

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