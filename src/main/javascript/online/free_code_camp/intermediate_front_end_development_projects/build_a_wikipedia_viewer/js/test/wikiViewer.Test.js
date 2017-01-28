/**
 * Created by Hey on 18 Jan 2017
 */

var Test = require('chai');
var format = require('string-format');
var fs = require('fs');
var path = require('path');

var Viewer = require('../wikiViewer');

describe("FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("WikiViewer - model logic", function () {
            var URL_PARTS_TO_CHECK = [
                "https://en.wikipedia.org/w/api.php?",
                "action=query",
                "format=json",
                "list=search",
                "callback=?",
                "srprop=snippet"
            ];

            function assertSearchUrl(url) {
                [
                    URL_PARTS_TO_CHECK,
                    Array.prototype.slice.call(arguments, 1)
                ].forEach(function (arr) {
                    arr.forEach(function (part) {
                        Test.expect(url).to.have.string(part, format("Built URL '{}' does not contains part '{}'", url, part));
                    });
                });
            }

            describe("URL Builder for searching in wikipedia", function () {
                it("should expose builder for searching in wikipedia", function () {
                    // Given
                    var builder = Viewer.newSearchUrlBuilder();

                    // When

                    // Then
                    assertSearchUrl(builder.build());
                });

                [
                    'wiki',
                    'meaning'
                ].forEach(function (keyword) {
                    //https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&callback=processWikiResponse&srsearch=wiki&sroffset=10&srprop=snippet
                    it(format("should build url for searching '{}' in wikipedia", keyword), function () {
                        // Given

                        // When
                        var url = Viewer.newSearchUrlBuilder().withQuery(keyword).build();

                        // Then
                        assertSearchUrl(url, "srsearch=" + keyword);
                    });
                });
            });

            describe("Parser for searching response from wikipedia", function () {
                it("should parse response for searching 'wiki' in wikipedia", function () {
                    // Given
                    var WIKI_QUERY_RESPONSE_DATA = fs.readFileSync(path.normalize(__dirname + "/./resources/search_wiki_response.json"));

                    // When
                    var parseResult = Viewer.parseSearchResponse(WIKI_QUERY_RESPONSE_DATA);

                    // Then
                    Test.expect(parseResult).to.be.an('Array');
                    Test.expect(parseResult.length).to.equal(10);

                    (function assertFirstAndLastSearchRssults() {
                        [
                            {
                                "title": "Wiki (disambiguation)",
                                "snippet": "Wikipedia:Glossary. A <span class=\"searchmatch\">wiki</span> (or <span class=\"searchmatch\">wiki</span> <span class=\"searchmatch\">wiki</span>) is a collaborative website. <span class=\"searchmatch\">Wiki</span> or <span class=\"searchmatch\">wiki</span> <span class=\"searchmatch\">wiki</span> may also refer to the following:   <span class=\"searchmatch\">Wiki</span><span class=\"searchmatch\">Wiki</span>Web, the original <span class=\"searchmatch\">wiki</span> website,"
                            },
                            {
                                "title": "Ruben Wiki",
                                "snippet": "Ruben James <span class=\"searchmatch\">Wiki</span>, ONZM (born 21 January 1973) is a former professional rugby league footballer of the 1990s and 2000s. A New Zealand national representative"
                            }
                        ].forEach(function (expectedResults) {
                            var hasExpectedResult = parseResult.some(function (actualResult) {
                                return (actualResult.title === expectedResults.title) && (actualResult.snippet === expectedResults.snippet);
                            });
                            Test.expect(hasExpectedResult).to.equal(true, format("expected: <{}>, but was not found", JSON.stringify(expectedResults)));
                        });
                    }());
                });
            });
        });
    });
});
