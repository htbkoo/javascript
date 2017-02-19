/**
 * Created by Hey on 18 Feb 2017
 */
var Weather = Weather || ((typeof require !== "undefined") ? require("./weather") : {});

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