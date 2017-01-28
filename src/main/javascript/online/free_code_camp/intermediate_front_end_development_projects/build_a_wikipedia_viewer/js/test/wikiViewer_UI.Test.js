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
                    var sinonThis = this;

                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        // Given
                        var WIKI_RANDOM_ARTICLE_URL = "https://en.wikipedia.org/wiki/Special:Random";
                        var Viewer_randomArticle = sinonThis.spy(window.Viewer, "randomArticle");
                        var window_open = sinonThis.spy(window, "open");

                        // When
                        $('#random').click();

                        // Then
                        Test.expect(Viewer_randomArticle.calledOnce).to.equal(true, "Should have called randomArticle once");
                        Test.expect(window_open.calledWith(WIKI_RANDOM_ARTICLE_URL)).to.equal(true, format("Should have called window.open with '{}' once", WIKI_RANDOM_ARTICLE_URL));

                        window.close();
                        done();
                    });
                }));
            });

            // https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=search&gsrsearch=meaning
            // https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&generator=search&gsrsearch=meaning
            describe("Assert searching", function () {
                var CALLBACK_NAME = '?';
                var WIKI_HOST_URL = "https://en.wikipedia.org";

                [
                    'wiki',
                    'meaning'
                ].forEach(function (keyword) {
                    it(format("should search for '{}' and get list of result back", keyword), sinon.test(function (done) {
                        this.timeout(1000);
                        var sinonThis = this;

                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            // Given
                            var WIKI_QUERY_URL = "someURL";
                            var WIKI_QUERY_RESPONSE_DATA = JSON.parse(fs.readFileSync(getRelativePath("/./resources/search_wiki_response.json")));

                            var $_getJSON = sinonThis.stub($, "getJSON");
                            $_getJSON.withArgs(WIKI_QUERY_URL).yields(WIKI_QUERY_RESPONSE_DATA);

                            var mockViewer = sinonThis.mock(window.Viewer);
                            mockViewer.expects("parseSearchResponse").once().withArgs(WIKI_QUERY_RESPONSE_DATA).returns([]);
                            mockViewer.expects("newSearchUrlBuilder").returns({
                                "withQuery": function () {
                                    return {
                                        "build": function () {
                                            return WIKI_QUERY_URL;
                                        }
                                    };
                                }
                            });

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
                    var sinonThis = this;

                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        // Given
                        var WIKI_QUERY_RESPONSE_DATA = JSON.parse(fs.readFileSync(getRelativePath("/./resources/search_wiki_response.json")));

                        var $_getJSON = sinonThis.stub($, "getJSON");
                        $_getJSON.yields(WIKI_QUERY_RESPONSE_DATA);

                        var Viewer_parseSearchResponse = sinonThis.stub(window.Viewer, "parseSearchResponse");
                        var searchResults = [{
                            "pageid": 32851,
                            "ns": 0,
                            "title": "Wiki",
                            "index": 1,
                            "extract": "A wiki (/ˈwɪki/ WIK-ee) is a website that provides collaborative modification of its content and structure directly from the web browser."
                        }, {
                            "pageid": 32864,
                            "ns": 0,
                            "title": "WikiWikiWeb",
                            "index": 7,
                            "extract": "The WikiWikiWeb is the first ever wiki, or user-editable website."
                        }, {
                            "pageid": 33164,
                            "ns": 0,
                            "title": "Wiki software",
                            "index": 2,
                            "extract": "Wiki software (also known as a wiki engine or wiki application) is collaborative software that runs a wiki, which allows users to create and collaboratively edit \"pages\" or entries via a web browser."
                        }];
                        Viewer_parseSearchResponse.withArgs(WIKI_QUERY_RESPONSE_DATA).returns(searchResults);

                        // When
                        $('#query').val("wiki");
                        $('#search').click();

                        // Then
                        var $listGroup = $('#resultDisplay').find(".list-group");
                        Test.expect($listGroup.length).to.equal(1, "There should be one list-group to hold the search results");
                        var $a_list_items = $listGroup.find("a");
                        Test.expect($a_list_items.length).to.equal(searchResults.length, format("There should be {} items in the list", searchResults.length));
                        searchResults.forEach(function (result) {
                            var hasExpectedResult = $a_list_items.toArray().some(function (item) {
                                var $item = $(item);
                                var isHrefEqual = ($item.attr("href") === ("https://en.wikipedia.org/?curid=" + result.pageid));
                                var hasTitleAndExtract = [
                                    "title",
                                    "extract"
                                ].every(function (part) {
                                    return $item.html().indexOf(result[part]) !== -1;
                                });

                                return isHrefEqual && hasTitleAndExtract;
                            });

                            Test.expect(hasExpectedResult).to.equal(true, format("expected: <{}>, but was not found", JSON.stringify(result)));
                        });

                        window.close();
                        done();
                    });
                }));
            });


            it("should not search if query is empty", sinon.test(function (done) {
                this.timeout(1000);
                var sinonThis = this;

                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    // Given
                    var $_getJSON = sinonThis.stub($, "getJSON");
                    $_getJSON.yields("[]");

                    var mockViewer = sinonThis.mock(window.Viewer);
                    mockViewer.expects("parseSearchResponse").never().returns([]);

                    $('#query').val("");

                    // When
                    $('#search').click();

                    // Then
                    mockViewer.verify();

                    window.close();
                    done();
                });
            }));

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