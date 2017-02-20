/**
 * Created by Hey on 18 Feb 2017
 */
var Weather = Weather || ((typeof require !== "undefined") ? require("./weather") : {});

(
    function () {
        "use strict";
        var defaultPosition = {
            // coords of Otaru, Japan
            coords: {
                latitude: 43.1907,
                longitude: 140.9947
            }
        };
        var localPosition = Weather.getGeolocationOrDefault(defaultPosition);
        Weather.getWeatherInfoByLatLon(localPosition,
            function (data) {
                try {
                    $('#city').text(data.name);
                    var absoluteTemperature = data.main.temp;
                    $('#temperature').text(Weather.convertTemperature.fromK.toC(absoluteTemperature));
                    var weather = data.weather[0];
                    $('#description').text(weather.main + " (" + weather.description + ")");
                    var iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
                    $('#icon').attr("src", iconUrl);
                } catch (e) {
                    //    TODO: handle exception
                }
            });
    }()
);