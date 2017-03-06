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
                [
                    {
                        testCaseName: "mock position",
                        relativePathToMockResponse: "/resources/weather_byLatLon_response.json",
                        obtainedPos: {
                            // coords of Otaru, Japan
                            coords: {
                                latitude: 43.1907,
                                longitude: 140.9947
                            }
                        },
                        fromTemperatureInK: 272.564,
                        toTemperatureInC: -0.586,
                        expected: {
                            city: "Otaru",
                            description: "Clouds (overcast clouds)",
                            icon: "http://openweathermap.org/img/w/04n.png"
                        }
                    }, {
                    testCaseName: "local position",
                    relativePathToMockResponse: "/resources/weather_byLatLon_response_local.json",
                    obtainedPos: {
                        // coords of Taipei
                        coords: {
                            latitude: 25.0330,
                            longitude: 121.5654
                        }
                    },
                    fromTemperatureInK: 291.467,
                    toTemperatureInC: 18.317,
                    expected: {
                        city: "Xianeibu",
                        description: "Clouds (scattered clouds)",
                        icon: "http://openweathermap.org/img/w/03n.png"
                    }
                }
                ].forEach(function (params) {
                    it(format("should get weather information from hey-weather-server with {}", params.testCaseName), sinon.test(function (done) {
                        var sinonThis = this;
                        //    Given
                        var mockResponse_weather_byLatLon = fs.readFileSync(getRelativePath(params.relativePathToMockResponse));
                        var somePosition = {
                            // coords of Otaru, Japan
                            coords: {
                                latitude: 43.1907,
                                longitude: 140.9947
                            }
                        };
                        mockWeather(sinonThis,
                            function (stub) {
                                stub.withArgs(sinon.match(function (value) {
                                    return arePositionsEqual(params.obtainedPos, value);
                                })).yields(JSON.parse(mockResponse_weather_byLatLon));
                            },
                            function (stub) {
                                stub.withArgs(params.fromTemperatureInK).returns(params.toTemperatureInC);
                            },
                            function (stub) {
                                stub.returns(params.obtainedPos);
                            });

                        //    When
                        // Loaded
                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            //    Then
                            Test.expect($("#city").text()).to.equal(params.expected.city, format("City should be {}", params.expected.city));
                            Test.expect($("#temperature").text()).to.equal(params.toTemperatureInC.toString(), format("Temperature should be {}K, i.e. {}C", params.fromTemperatureInK, params.toTemperatureInC));
                            Test.expect($("#description").text()).to.equal(params.expected.description, format("Description should be '{}'", params.expected.description));
                            Test.expect($("#icon").attr("src")).to.equal(params.expected.icon, format("Icon src should be '{}'", params.expected.icon));
                            done();
                        }, undefined, overrideCreated);
                    }));
                });

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
                        fromSymbol: "C",
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
                        fromSymbol: "F",
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
                        mockWeather(sinonThis);

                        setUpJsdomEnvAndAssertWith(function (err, window, $) {
                            //    Given
                            $(format("#radio_{}", params.from.toLowerCase())).prop("checked", true);
                            var $temperature = $("#temperature");
                            var $symbol = $("#symbol");
                            $symbol.text(params.fromSymbol);
                            $temperature.text(params.fromTemperature);
                            params.doMock(sinonThis);

                            //    When
                            selectRadio($(format("#radio_{}", params.to.toLowerCase())));

                            //    Then
                            Test.expect($symbol.text()).to.equal(params.expectedSymbol, format("Temperature symbol should have changed to {}", params.expectedSymbol));
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

            function mockWeather(sinonThis, stubGetWeatherInfoByLatLon, stubConvertTemperatureFromKToC, stubGetGeolocationOrDefault) {
                stubByFunctionOrBlankByDefault(Weather, "getWeatherInfoByLatLon", stubGetWeatherInfoByLatLon);
                stubByFunctionOrBlankByDefault(Weather.convertTemperature.fromK, "toC", stubConvertTemperatureFromKToC);
                stubByFunctionOrBlankByDefault(Weather, "getGeolocationOrDefault", stubGetGeolocationOrDefault);

                function stubByFunctionOrBlankByDefault(obj, method, stubFunc) {
                    var stub = sinonThis.stub(obj, method);
                    if (typeof stubFunc !== "undefined") {
                        stubFunc(stub);
                    } else {
                        stub.returns();
                    }
                }
            }
        });
    });
});