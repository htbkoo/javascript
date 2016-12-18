/**
 * Created by Hey on 16 Dec 2016
 */

var Coordinates = require('./Coordinates');

function Snake() {
    "use strict";

    function SnakeBody() {
        return this;
    }

    this.initialize = function(){

    };

    return this;
}

Snake.createSnake = function () {
    "use strict";
    return new Snake();
};

module.exports = Snake;