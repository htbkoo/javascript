/**
 * Created by Hey on 17 Jan 2017
 */
var Weather = (function () {
    "use strict";
    var KELVIN_CONSTANT = -273.15;
    var convert = function (t, convertFunc) {
        var temperatureAsString = t.toString();
        var dp = temperatureAsString.length - temperatureAsString.indexOf(".") - 1;
        return +(convertFunc().toFixed(dp));
    };

    var exports = {
        "getCurrentLocationOrDefault": function (defaultPosition) {
            var returnPosition = defaultPosition;
            if (exports.isGeolocationAvailable()) {
                window.navigator.getCurrentPosition(function (position) {
                    returnPosition = position;
                });
            }
            return returnPosition;
        },
        "getWeatherInfoByLatLon": function (position, callback) {
            if (Weather.shouldFetchExternally()) {
                $.getJSON(Weather.HEY_WEATHER_SERVER_URL.byLatLon + "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
                    {},
                    callback
                );
            }
        },
        //TODO: add unit test
        "convertTemperature": {
            "fromK": {
                "toC": function (t) {
                    return convert(t, function () {
                        return t + KELVIN_CONSTANT;
                    });
                }
            },
            "fromC": {
                "toF": function (t) {
                    return convert(t, function () {
                        return 9 * t / 5 + 32;
                    });
                }
            },
            "fromF": {
                "toC": function (t) {
                    return convert(t, function () {
                        return 5 * (t - 32) / 9;
                    });
                }
            }
        },
        "shouldFetchExternally": function () {
            return false;
        },
        "isGeolocationAvailable": function () {
            return "getCurrentPosition" in window.navigator;
        },
        // Please do not spam this - it is only my little attempt to host a proxy server on a free Heroku dyno :)
        "HEY_WEATHER_SERVER_URL": {
            "basePath": "https://hey-weather-server.herokuapp.com/weather",
            "byLatLon": "https://hey-weather-server.herokuapp.com/weather/byLatLon?callback=?"
        }
    };

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());