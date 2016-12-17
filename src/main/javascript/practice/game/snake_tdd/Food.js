/**
 * Created by Hey on 16 Dec 2016
 */

var Coordinates = require('./Coordinates');

function Food(x, y) {
    "use strict";
    this.getCoors = function () {
        return new Coordinates(x, y);
    };
    return this;
}

module.exports = Food;