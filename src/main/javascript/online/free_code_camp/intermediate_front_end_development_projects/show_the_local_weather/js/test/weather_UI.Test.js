/**
 * Created by Hey on 18 Feb 2017
 */

var Test = require("chai");
var jsdom = require("jsdom");
var path = require("path");
var format = require('string-format');
var sinon = require('sinon');
var fs = require('fs');

var Weather = require('../weather');

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

                    var Weather_getWeatherInfoByLatLon = sinonThis.stub(Weather, "getWeatherInfoByLatLon");
                    Weather_getWeatherInfoByLatLon.withArgs(sinon.match(function (value) {
                        return arePositionsEqual(somePosition, value);
                    })).yields(JSON.parse(mockResponse_weather_byLatLon));
                    var Weather_convertTemperatureFromKToC = sinonThis.stub(Weather.convertTemperature.fromK, "toC");
                    Weather_convertTemperatureFromKToC.withArgs(272.564).returns(-0.586);
                    var Weather_getGeolocationOrDefault = sinonThis.stub(Weather, "getGeolocationOrDefault");
                    Weather_getGeolocationOrDefault.returnsArg(0);

                    //    When
                    // Loaded
                    setUpJsdomEnvAndAssertWith(function (err, window, $) {
                        //    Then
                        Test.expect($("#city").text()).to.equal("Otaru", "City should be Otaru");
                        Test.expect($("#temperature").text()).to.equal("-0.586", "Temperature should be 272.564K, i.e. -0.586 C");
                        Test.expect($("#description").text()).to.equal("Clouds (overcast clouds)", "Description should be 'Clouds (overcast clouds)'");
                        Test.expect($("#icon").attr("src")).to.equal("http://openweathermap.org/img/w/04n.png", "Icon src should be 'http://openweathermap.org/img/w/04n.png'");
                        done();
                    }, undefined, overrideCreated);
                }));

                // TODO: refactor this
                xit("should get weather information from hey-weather-server with 'local' position", sinon.test(function (done) {
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
                    // sinonThis.stub(Weather.convertTemperature.from)

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
                    }, undefined, overrideCreated);
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

            describe("Temperature scale change related", function () {
                [
                    {
                        from: "Celsius",
                        to: "Fahrenheit",
                        expectedSymbol: "F",
                        fromTemperature: "40",
                        expectedTemperature: "104",
                        doMock: function (sinonThis) {
                            var Weather_convertTemperatureFromCToF = sinonThis.stub(Weather.convertTemperature.fromC, "toF");
                            Weather_convertTemperatureFromCToF.withArgs(40.0).returns(104.0);
                        }
                    },
                    {
                        from: "Fahrenheit",
                        to: "Celsius",
                        expectedSymbol: "C",
                        fromTemperature: "104",
                        expectedTemperature: "40",
                        doMock: function (sinonThis) {
                            var Weather_convertTemperatureFromCToF = sinonThis.stub(Weather.convertTemperature.fromF, "toC");
                            Weather_convertTemperatureFromCToF.withArgs(104.0).returns(40.0);
                        }
                    }
                ].forEach(function (params) {
                    it(format("should switch from {} to {} when clicked", params.from, params.to), sinon.test(function (done) {
                        var sinonThis = this;

                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            //    Given
                            $(format("#radio_{}", params.from.toLowerCase())).prop("checked", true);
                            var $temperature = $("#temperature");
                            $temperature.text(params.fromTemperature);
                            params.doMock(sinonThis);

                            //    When
                            selectRadio($(format("#radio_{}", params.to.toLowerCase())));

                            //    Then
                            Test.expect($("#symbol").text()).to.equal(params.expectedSymbol, format("Temperature symbol should have changed to {}", params.expectedSymbol));
                            Test.expect($temperature.text()).to.equal(params.expectedTemperature, format("{}{} should equal to {}{}", params.fromTemperature, params.from[0], params.expectedTemperature, params.to[0]));
                        }, done, overrideCreated);
                    }));
                });

                function selectRadio($elem) {
                    // $elem.prop("checked", true).trigger("click").change();
                    $elem.prop("checked", true).change();
                }
            });

            function overrideCreated(err, window) {
                if (typeof window.Weather === "undefined") {
                    window.Weather = Weather;
                }
            }

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