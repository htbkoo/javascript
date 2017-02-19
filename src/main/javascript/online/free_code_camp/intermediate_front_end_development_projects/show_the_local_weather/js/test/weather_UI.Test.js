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
                                "getWeatherInfoByLatLon": function(){
                                },
                                "convertTemperature": {
                                    "fromK":{
                                        "toC": function(t){
                                            if (t===272.564){
                                                return -0.586;
                                            }
                                        }
                                    }
                                }
                            };
                            var Weather_getWeatherInfoByLatLon = sinonThis.stub(window.Weather, "getWeatherInfoByLatLon");
                            Weather_getWeatherInfoByLatLon.withArgs(sinon.match(function (value) {
                                return [
                                    "latitude",
                                    "longitude"
                                ].every(function (field) {
                                    return value.coords[field] === somePosition.coords[field];
                                });
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