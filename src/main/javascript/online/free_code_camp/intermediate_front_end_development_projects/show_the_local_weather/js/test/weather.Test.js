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

describe("Weather - UI part - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("Weather - logic part", function () {
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
                    // done();
                }));
            });

            function setUpJsdomEnvAndAssertWith(furtherAssertion, done) {
                jsdom.env({
                    html: "",
                    src: [
                        fs.readFileSync(getRelativePath("/../../../../lib/jquery-1.11.3/jquery-1.11.3.min.js")),
                        fs.readFileSync(getRelativePath("/../weather.js"))
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