/**
 * Created by Hey on 18 Feb 2017
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

describe("Weather - UI part - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("Weather - UI part", function () {
            describe("Geolocation related", function () {
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
            });

            describe("GettingWeatherInfoByLatLon related", function () {
                it("should get weather information from hey-weather-server with mock position", sinon.test(function (done) {
                    var sinonThis = this;
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        //    Given
                        var mockResponse_weather_byLatLon = fs.readFileSync(getRelativePath("/resources/weather_byLatLon_response.json"));
                        var somePosition = {
                            // coords of Otaru, Japan
                            coords: {
                                latitude: 43.1907,
                                longitude: 140.9947
                            }
                        };
                        var $_getJSON = sinonThis.stub($, "getJSON");
                        $_getJSON.withArgs(sinon.match(function (value) {
                            return [
                                "https://hey-weather-server.herokuapp.com/weather/byLatLon?",
                                "lat=" + somePosition.coords.latitude,
                                "lon=" + somePosition.coords.longitude,
                                "callback=" + "?"
                            ].every(function (part) {
                                return value.indexOf(part) !== -1;
                            });
                        })).yields(JSON.parse(mockResponse_weather_byLatLon));
                        sinonThis.stub(window.Weather, "shouldFetchExternally").returns(true);

                        //    When
                        window.Weather.getWeatherInfoByLatLon(somePosition, assertResponse);

                        //    Then
                        function assertResponse(data) {
                            Test.expect(data).to.deep.equal(JSON.parse(mockResponse_weather_byLatLon), "The message should equals to the mock response");
                            // Sanity check
                            Test.expect(data.name).to.equal("Otaru", "City should be Otaru");
                            Test.expect(data.main.temp).to.equal(272.564, "Temperature should be 272.564K, i.e. -0.586 C");
                            Test.expect(data.weather[0].main).to.equal("Clouds", "Main should be Clouds");
                            Test.expect(data.weather[0].description).to.equal("overcast clouds", "Description should be overcast clouds");

                            done();
                        }
                    });
                }));

                // TODO: warning message not tested yet
                xit("should show warning message instead of fetching externally when flag is disabled", sinon.test(function (done) {
                    var sinonThis = this;
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        //    Given
                        var somePosition = {
                            // coords of Otaru, Japan
                            coords: {
                                latitude: 43.1907,
                                longitude: 140.9947
                            }
                        };
                        var mock_$ = sinonThis.mock($);
                        mock_$.expects("getJSON").never();
                        sinonThis.stub(window.Weather, "shouldFetchExternally").returns(false);

                        //    When
                        window.Weather.getWeatherInfoByLatLon(somePosition);

                        //    Then
                        mock_$.verify();
                        // Test.expect($("#city").text()).to.equal("Otaru", "City should be Otaru");
                    }, done);
                }));
            });

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
                        if (typeof done === "function") {
                            done();
                        }
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