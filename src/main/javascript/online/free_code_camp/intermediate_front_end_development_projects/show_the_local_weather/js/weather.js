/**
 * Created by Hey on 17 Jan 2017
 */
var Weather = (function () {
    "use strict";
    var KELVIN_CONSTANT = -273.15;
    var IPINFO_URL = "http://ipinfo.io/json?callback=?";
    // Please do not spam this - it is only my little attempt to host a proxy server on a free Heroku dyno :)
    var HEY_WEATHER_SERVER_URL = {
        "basePath": "https://hey-weather-server.glitch.me/weather"
    };
    HEY_WEATHER_SERVER_URL.byLatLon = HEY_WEATHER_SERVER_URL.basePath + "/byLatLon?callback=?";

    var convert = function (t, convertFunc) {
        var temperatureAsString = t.toString();
        var dp = temperatureAsString.length - temperatureAsString.indexOf(".") - 1;
        return +(convertFunc().toFixed(dp));
    };

    var parseResponseFromIpInfo = function (strResponse) {
        // e.g. "37.385999999999996,-122.0838"
        var coords = strResponse.loc.split(",");
        return {
            coords: {
                "latitude": parseFloat(coords[0]),
                "longitude": parseFloat(coords[1])
            }
        };
    };

    var exports = {
        "getGeolocationOrDefault": function (defaultPosition) {
            var returnPosition = defaultPosition;
            if (exports.isGeolocationAvailable()) {
                window.navigator.getCurrentPosition(function (position) {
                    returnPosition = position;
                });
            }
            return returnPosition;
        },
        "getLocationFromIpInfoWithCallBack": function (callback) {
            $.getJSON(IPINFO_URL,
                {},
                function (data) {
                    var pos = parseResponseFromIpInfo(data);
                    callback(pos);
                }
            );
        },
        "getWeatherInfoByLatLon": function (position, callback) {
            if (Weather.shouldFetchExternally()) {
                $.getJSON(HEY_WEATHER_SERVER_URL.byLatLon + "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
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
        }
    };

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());