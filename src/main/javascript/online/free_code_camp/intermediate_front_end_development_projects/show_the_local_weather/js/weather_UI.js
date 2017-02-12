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
    }
};

(
    function () {
        "use strict";

    }()
);