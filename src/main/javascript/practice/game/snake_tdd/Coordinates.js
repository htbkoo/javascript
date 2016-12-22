/**
 * Created by Hey on 16 Dec 2016
 */

var format = require("string-format");

function Coordinates(x, y) {
    "use strict";
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };
    this.addAndGetNew = function (coors) {
        return new Coordinates(x + coors.getX(), y + coors.getY());
    };
    this.isSameCoorsTo = function (coors) {
        return (x === coors.getX()) && (y === coors.getY());
    };
}

Coordinates.copyFrom = function (coordinates) {
    "use strict";
    return new Coordinates(coordinates.getX(), coordinates.getY());
};

Coordinates.prototype.toString = function () {
    "use strict";
    return format("[object Coordinates:[{}, {}]]", this.getX(), this.getY());
};

module.exports = Coordinates;