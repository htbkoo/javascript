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

describe("Weather - logic part - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("Weather - logic part", function () {
            describe("Geolocation related", function () {
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
            });

            function setUpJsdomEnvAndAssertWith(furtherAssertion, done) {
                jsdom.env({
                    html: "",
                    scripts: [
                        getRelativePath("/../../../../lib/jquery-1.11.3/jquery-1.11.3.min.js"),
                        getRelativePath("/../weather.js")
                    ],
                    done: function (err, window) {
                        try {
                            furtherAssertion(err, window, window.$);
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