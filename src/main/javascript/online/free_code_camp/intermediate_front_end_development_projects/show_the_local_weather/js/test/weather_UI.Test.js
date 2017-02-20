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
            describe("page setup related", function () {
                [
                    {name: "#city", type: "h2"},
                    {name: "#temperature", type: "h1"},
                    {name: "#description", type: "h3"},
                    {name: "#icon", type: "img"}
                ].forEach(function (selector) {
                    it(format("should have {} on the page", selector.name), function (done) {
                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            var $elems = $(selector.name);
                            Test.expect($elems.length).equal(1, format("There should be a placeholder for {}", selector.name));
                            if (typeof selector.type !== 'undefined') {
                                Test.expect($elems.is(selector.type)).to.equal(true, format("Element $('{}') should be a {}", selector.name, selector.type));
                            }
                        }, done);
                    });
                });
            });

            describe("GettingWeatherInfoByLatLon related", function () {
                it("should get weather information from hey-weather-server with mock position", sinon.test(function (done) {
                    var sinonThis = this;
                    //    Given
                    var mockResponse_weather_byLatLon = fs.readFileSync(getRelativePath("/resources/weather_byLatLon_response.json"));
                    var somePosition = {
                        // coords of Otaru, Japan
                        coords: {
                            latitude: 43.1907,
                            longitude: 140.9947
                        }
                    };

                    var created = function (err, window) {
                        if (typeof window.Weather === "undefined") {
                            window.Weather = {
                                "getWeatherInfoByLatLon": function () {
                                },
                                "convertTemperature": {
                                    "fromK": {
                                        "toC": function (t) {
                                            if (t === 272.564) {
                                                return -0.586;
                                            }
                                        }
                                    }
                                },
                                "getGeolocationOrDefault": function (def) {
                                    return def;
                                }
                            };
                            var Weather_getWeatherInfoByLatLon = sinonThis.stub(window.Weather, "getWeatherInfoByLatLon");
                            Weather_getWeatherInfoByLatLon.withArgs(sinon.match(function (value) {
                                return arePositionsEqual(somePosition, value);
                            })).yields(JSON.parse(mockResponse_weather_byLatLon));
                        }
                    };

                    //    When
                    // Loaded
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        //    Then
                        Test.expect($("#city").text()).to.equal("Otaru", "City should be Otaru");
                        Test.expect($("#temperature").text()).to.equal("-0.586", "Temperature should be 272.564K, i.e. -0.586 C");
                        Test.expect($("#description").text()).to.equal("Clouds (overcast clouds)", "Description should be 'Clouds (overcast clouds)'");
                        Test.expect($("#icon").attr("src")).to.equal("http://openweathermap.org/img/w/04n.png", "Icon src should be 'http://openweathermap.org/img/w/04n.png'");
                        done();
                    }, undefined, created);
                }));

                it("should get weather information from hey-weather-server with 'local' position", sinon.test(function (done) {
                    var sinonThis = this;
                    //    Given
                    var mockResponse_weather_byLatLon = fs.readFileSync(getRelativePath("/resources/weather_byLatLon_response_local.json"));
                    var defaultPosition = {
                        // coords of Otaru, Japan
                        coords: {
                            latitude: 43.1907,
                            longitude: 140.9947
                        }
                    };
                    var localPosition = {
                        // coords of Taipei
                        coords: {
                            latitude: 25.0330,
                            longitude: 121.5654
                        }
                    };

                    var created = function (err, window) {
                        if (typeof window.Weather === "undefined") {
                            window.Weather = {
                                "getWeatherInfoByLatLon": function () {
                                },
                                "convertTemperature": {
                                    "fromK": {
                                        "toC": function (t) {
                                            if (t === 291.467) {
                                                return 18.317;
                                            }
                                        }
                                    }
                                },
                                "getGeolocationOrDefault": function () {
                                    return localPosition;
                                }
                            };
                            var Weather_getWeatherInfoByLatLon = sinonThis.stub(window.Weather, "getWeatherInfoByLatLon");
                            Weather_getWeatherInfoByLatLon.withArgs(sinon.match(function (value) {
                                return arePositionsEqual(localPosition, value);
                            })).yields(JSON.parse(mockResponse_weather_byLatLon));
                        }
                    };

                    //    When
                    // Loaded
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        //    Then
                        Test.expect($("#city").text()).to.equal("Xianeibu", "City should be Xianeibu");
                        Test.expect($("#temperature").text()).to.equal("18.317", "Temperature should be 291.467K, i.e. 18.317 C");
                        Test.expect($("#description").text()).to.equal("Clouds (scattered clouds)", "Description should be 'Clouds (scattered clouds)'");
                        Test.expect($("#icon").attr("src")).to.equal("http://openweathermap.org/img/w/03n.png", "Icon src should be 'http://openweathermap.org/img/w/03n.png'");
                        done();
                    }, undefined, created);
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

            function setUpJsdomEnvAndAssertWith(furtherAssertion, done, created) {
                jsdom.env({
                    file: pathToHtml,
                    scripts: [
                        getRelativePath("/../../../../lib/jquery-1.11.3/jquery-1.11.3.min.js"),
                        getRelativePath("/../weather_UI.js")
                    ],
                    created: created,
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