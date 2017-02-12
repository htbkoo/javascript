/**
 * Created by Hey on 17 Jan 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');
var sinon = require('sinon');
var fs = require('fs');

function getRelativePath(pathFromFile) {
    "use strict";
    return path.normalize(__dirname + pathFromFile);
}
var pathToHtml = getRelativePath("/../../weather.html");

describe("FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("Weather - UI part", function () {
            [
                {name: "#temperature"},
                {name: "#city"},
                {name: "#description"}
            ].forEach(function (selector) {
                it(format("should have {} on the page", selector.name), function (done) {
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        Test.expect($(selector.name).length).equal(1, format("There should be a placeholder for {}", selector.name));
                    }, done);
                });
            });

            it("should check if geolocation is available", function (done) {
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    Test.expect(window.navigator).to.not.be.undefined;
                }, done);
            });

            it("should get geolocation if available", sinon.test(function (done) {
                var sinonThis = this;
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    //    Given
                    var defaultPosition = {
                        // coords of Otaru, Japan
                        coords: {
                            latitude: 43.1907,
                            longitude: 140.9947
                        }
                    };
                    var expectedPosition = {
                        // coords of Tokyo, Japan
                        coords: {
                            latitude: 35.670479,
                            longitude: 139.740921
                        }
                    };

                    (function mock_window_navigator_getCurrentPosition() {
                        if ("getCurrentPosition" in window.navigator) {
                            var window_navigator_getCurrentPosition = sinonThis.stub(window.navigator, "getCurrentPosition");
                            window_navigator_getCurrentPosition.callsArgWith(0, expectedPosition);
                        } else {
                            window.navigator.getCurrentPosition = function (success, error) {
                                success(expectedPosition);
                            };
                        }
                    }());

                    //    When
                    var actualPosition = window.Weather.getGeolocationOrDefault(defaultPosition);

                    //    Then
                    Test.expect(arePositionsEqual(expectedPosition, actualPosition)).to.equal(true, "Should return actual position if geolocation is avaiable");
                }, done);
            }));

            it("should return default position if geolocation not available", sinon.test(function (done) {
                var sinonThis = this;
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    //    Given
                    var defaultPosition = {
                        // coords of Otaru, Japan
                        coords: {
                            latitude: 43.1907,
                            longitude: 140.9947
                        }
                    };

                    //    When
                    var actualPosition = window.Weather.getGeolocationOrDefault(defaultPosition);

                    //    Then
                    Test.expect(arePositionsEqual(defaultPosition, actualPosition)).to.equal(true, "Should return default position if geolocation not avaiable");
                }, done);
            }));

            it("should get woeid from metaweather with mock position", sinon.test(function (done) {
                var sinonThis = this;
                setUpJsdomEnvAndAssertWith(function (err, window, $) {
                    //    Given
                    var mockResponse_metaweather_location_search = fs.readSync(getRelativePath("/resources/metaweather_location_search_response.json"));

                    var defaultPosition = {
                        // coords of Otaru, Japan
                        coords: {
                            latitude: 43.1907,
                            longitude: 140.9947
                        }
                    };

                    //    When
                    var actualPosition = window.Weather.getGeolocationOrDefault(defaultPosition);

                    //    Then
                    Test.expect(arePositionsEqual(defaultPosition, actualPosition)).to.equal(true, "Should return default position if geolocation not avaiable");
                }, done);
            }));

            function setUpJsdomEnvAndAssertWith(furtherAssertion, done) {
                jsdom.env({
                    file: pathToHtml,
                    features: {
                        FetchExternalResources: ['script'],
                        ProcessExternalResources: ['script']
                    },
                    done: function (err, window) {
                        var $ = window.$;
                        Test.expect(window.$).to.be.a('function');

                        try {
                            furtherAssertion(err, window, $);
                        } finally {
                            window.close();
                        }
                        done();
                    }
                });
            }

            function arePositionsEqual(pos1, pos2) {
                return [
                    "latitude",
                    "longitude"
                ].every(function (property) {
                    return (
                            [
                                pos1.coords,
                                pos2.coords
                            ].every(function (pos) {
                                return typeof(pos[property]) !== "undefined";
                            })
                        ) && (pos1.coords[property] === pos2.coords[property]);
                });
            }
        });
    });
});