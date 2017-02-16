/**
 * Created by Hey on 17 Jan 2017
 */

var Weather = {
    "getGeolocationOrDefault": function (defaultPosition) {
        "use strict";
        var returnPosition = defaultPosition;
        if ("getCurrentPosition" in window.navigator) {
            window.navigator.getCurrentPosition(function (position) {
                returnPosition = position;
            });
        }
        return returnPosition;
    },
    "getWeatherInfoByLatLon": function (position, callback) {
        "use strict";
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
                "use strict";
                var temperatureAsString = t.toString();
                var dp = temperatureAsString.length - temperatureAsString.indexOf(".") - 1;
                return +((t - Weather.KELVIN_CONSTANT).toFixed(dp));
            }
        }
    },
    "shouldFetchExternally": function () {
        "use strict";
        return true;
    },
    "KELVIN_CONSTANT": 273.15,

    // Please do not spam this - it is only my little attempt to host a proxy server on a free Heroku dyno :)
    "HEY_WEATHER_SERVER_URL": {
        "basePath": "https://hey-weather-server.herokuapp.com/weather",
        "byLatLon": "https://hey-weather-server.herokuapp.com/weather/byLatLon?callback=?"
    }
};

(
    function () {
        "use strict";
        var somePosition = {
            // coords of Otaru, Japan
            coords: {
                latitude: 43.1907,
                longitude: 140.9947
            }
        };
        Weather.getWeatherInfoByLatLon(somePosition,
            function (data) {
                try {
                    var parsedJsonData = JSON.parse(data);
                    $('#city').text(parsedJsonData.name);
                    var absoluteTemperature = parsedJsonData.main.temp;
                    $('#temperature').text(Weather.convertTemperature.fromK.toC(absoluteTemperature));
                    $('#description').text(parsedJsonData.weather[0].main + " (" + parsedJsonData.weather[0].description + ")");
                } catch (e) {
                    //    TODO: handle exception
                }
            });
    }()
);