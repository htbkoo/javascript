/**
 * Created by Hey on 16 Dec 2016
 */

var Coordinates = require('./Coordinates');

function Food(param_coordinates) {
    "use strict";
    var coordinates = Coordinates.copyFrom(param_coordinates);

    this.getCoors = function () {
        return coordinates;
    };
    return this;
}

module.exports = Food;