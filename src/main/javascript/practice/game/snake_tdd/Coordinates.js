/**
 * Created by Hey on 16 Dec 2016
 */

function Coordinates(x, y) {
    "use strict";
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };
}

Coordinates.copyFrom = function (coordinates) {
    "use strict";
    return new Coordinates(coordinates.getX(), coordinates.getY());
};

module.exports = Coordinates;