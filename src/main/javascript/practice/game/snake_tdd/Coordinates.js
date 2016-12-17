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

Coordinates.newCoordinates = function (x, y) {
    "use strict";
    return new Coordinates(x, y);
};

module.exports = Coordinates;