/**
 * Created by Hey on 18 Jan 2017
 */

var Test = require('chai');
var format = require('string-format');

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
                // "sroffset=10",
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
        });
    });
});
