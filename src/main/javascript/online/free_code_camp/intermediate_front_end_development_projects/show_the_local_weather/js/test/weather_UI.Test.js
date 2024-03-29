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

            describe("IPInfo related", function () {
                it("should get location information from IPInfo if geolocation not available", sinon.test(function (done) {
                    var sinonThis = this;
                    // Given
                    var params = {
                        testCaseName: "mock position",
                        relativePathToMockResponse: "/resources/weather_byLatLon_response_ipinfo.json",
                        obtainedPos: {
                            // coords of Mountain View, California
                            coords: {
                                latitude: 37.385999999999996,
                                longitude: -122.0838
                            }
                        },
                        fromTemperatureInK: 288.26,
                        toTemperatureInC: 15.11,
                        expected: {
                            city: "Mountain View",
                            description: "Clear (clear sky)",
                            icon: "http://openweathermap.org/img/w/01d.png"
                        }
                    };

                    var stub_Weather_getLocationFromIpInfoWithCallBack = sinonThis.stub(Weather, "getLocationFromIpInfoWithCallBack");
                    stub_Weather_getLocationFromIpInfoWithCallBack.yields(params.obtainedPos);
                    var mockResponse_weather_byLatLon = fs.readFileSync(getRelativePath(params.relativePathToMockResponse));

                    mockWeather.call(this,
                        {
                            "getWeatherInfoByLatLon": function (stub) {
                                stub.withArgs(sinon.match(function (value) {
                                    return arePositionsEqual(params.obtainedPos, value);
                                })).yields(JSON.parse(mockResponse_weather_byLatLon));
                            },
                            "toC": function (stub) {
                                stub.withArgs(params.fromTemperatureInK).returns(params.toTemperatureInC);
                            },
                            "isGeolocationAvailable": function (stub) {
                                stub.returns(false);
                            }
                        }
                    );

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
                    },
                    {
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

                        mockWeather.call(this,
                            {
                                "getWeatherInfoByLatLon": function (stub) {
                                    stub.withArgs(sinon.match(function (value) {
                                        return arePositionsEqual(params.obtainedPos, value);
                                    })).yields(JSON.parse(mockResponse_weather_byLatLon));
                                },
                                "toC": function (stub) {
                                    stub.withArgs(params.fromTemperatureInK).returns(params.toTemperatureInC);
                                },
                                "getGeolocationOrDefault": function (stub) {
                                    stub.returns(params.obtainedPos);
                                },
                                "isGeolocationAvailable": function (stub) {
                                    stub.returns(true);
                                }
                            }
                        );

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
                        mockWeather.call(this,
                            {
                                "isGeolocationAvailable": function (stub) {
                                    stub.returns(true);
                                }
                            }
                        );

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
                    $elem.prop("checked", true).change();
                }
            });

            function overrideCreated(err, window) {
                if (typeof window.Weather === "undefined") {
                    window.Weather = Weather;
                }
            }

            function setUpJsdomEnvAndAssertWith(furtherAssertion, done, created) {
                return jsdom.JSDOM.fromFile(pathToHtml, {
                    scripts: [
                        getRelativePath("/../../../../lib/jquery-1.11.3/jquery-1.11.3.min.js"),
                        getRelativePath("/../weather_UI.js")
                    ],
                    created: created,
                }).then(dom=>{
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

            function mockWeather(stubFunctions) {
                [
                    {
                        "method": "getWeatherInfoByLatLon"
                    },
                    {
                        "method": "toC",
                        "obj": Weather.convertTemperature.fromK
                    },
                    {
                        "method": "getGeolocationOrDefault"
                    },
                    {
                        "method": "isGeolocationAvailable"
                    }
                ].forEach((function (param) {
                    var method = param.method,
                        obj = 'obj' in param ? param.obj : Weather,
                        stub = this.stub(obj, method); // jshint ignore:line
                    if (param.method in stubFunctions) {
                        stubFunctions[param.method](stub);
                    } else {
                        stub.returns();
                    }
                }).bind(this)); // jshint ignore:line
            }
        });
    });
});