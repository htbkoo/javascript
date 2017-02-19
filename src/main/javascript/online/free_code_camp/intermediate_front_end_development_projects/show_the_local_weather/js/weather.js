/**
 * Created by Hey on 17 Jan 2017
 */
var Weather = (function () {
    "use strict";
    var exports = {
        "getGeolocationOrDefault": function (defaultPosition) {
            var returnPosition = defaultPosition;
            if ("getCurrentPosition" in window.navigator) {
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
        "convertTemperature": {
            "fromK": {
                "toC": function (t) {
                    var temperatureAsString = t.toString();
                    var dp = temperatureAsString.length - temperatureAsString.indexOf(".") - 1;
                    return +((t - Weather.KELVIN_CONSTANT).toFixed(dp));
                }
            }
        },
        "shouldFetchExternally": function () {
            return true;
        },
        "KELVIN_CONSTANT": 273.15,

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