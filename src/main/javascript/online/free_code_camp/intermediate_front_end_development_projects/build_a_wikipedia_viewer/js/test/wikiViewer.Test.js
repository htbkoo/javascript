/**
 * Created by Hey on 18 Jan 2017
 */

var Test = require('chai');
var format = require('string-format');
var fs = require('fs');
var path = require('path');

var Viewer = require('../wikiViewer');

describe("WikiViewer - model logic - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("WikiViewer - model logic", function () {
            var URL_PARTS_TO_CHECK = [
                "https://en.wikipedia.org/w/api.php?",
                "action=query",
                "format=json",
                "callback=?",
                "prop=extracts",
                "exintro",
                "explaintext",
                "exsentences=1",
                "exlimit=max"
            ];

            function assertSearchUrl(url) {
                [
                    URL_PARTS_TO_CHECK,
                    Array.prototype.slice.call(arguments, 1)
                ].forEach(function (arr) {
                    arr.forEach(function (part) {
                        Test.expect(url).to.have.string(part);
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
                        assertSearchUrl(url, "gsrsearch=" + keyword);
                    });
                });
            });

            describe("Parser for searching response from wikipedia", function () {
                it("should parse response for searching 'wiki' in wikipedia", function () {
                    // Given
                    var WIKI_QUERY_RESPONSE_DATA = fs.readFileSync(path.normalize(__dirname + "/./resources/search_wiki_response.json"));

                    // When
                    var parseResult = Viewer.parseSearchResponse(JSON.parse(WIKI_QUERY_RESPONSE_DATA));

                    // Then
                    Test.expect(parseResult).to.be.an('Array');
                    Test.expect(parseResult.length).to.equal(10);

                    (function assertFirstAndLastSearchRssults() {
                        [
                            {
                                "pageid": 32851,
                                "ns": 0,
                                "title": "Wiki",
                                "index": 1,
                                "extract": "A wiki (/ˈwɪki/ WIK-ee) is a website that provides collaborative modification of its content and structure directly from the web browser."
                            },
                            {
                                "pageid": 34488787,
                                "ns": 0,
                                "title": "The Hidden Wiki",
                                "index": 9,
                                "extract": "The Hidden Wiki is the name of several censorship-resistant wikis operating as Tor hidden services that anyone can anonymously edit after registering on the site."
                            }
                        ].forEach(function (expectedResults) {
                            var hasExpectedResult = parseResult.some(function (actualResult) {
                                return [
                                    "title",
                                    "extract",
                                    "pageid"
                                ].every(function (param) {
                                    return actualResult[param] === expectedResults[param];
                                });
                            });
                            Test.expect(hasExpectedResult).to.equal(true, format("expected: <{}>, but was not found", JSON.stringify(expectedResults)));
                        });
                    }());
                });
            });
        });
    });
});
