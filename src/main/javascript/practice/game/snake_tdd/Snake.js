/**
 * Created by Hey on 16 Dec 2016
 */

var Coordinates = require('./Coordinates');

function Snake() {
    "use strict";
    var snakeBodies = [];
    var moveDirection = new Coordinates(0, 0);

    function SnakeBody(head, param_coors) {
        var coors = param_coors;
        var snakeBodyThis = this;

        this.isHead = function () {
            return head;
        };
        this.getCoors = function () {
            return coors;
        };
        this.moveBy = function (dir) {
            coors = coors.addAndGetNew(dir);
        };
        this.getView = function () {
            return {
                'isHead': snakeBodyThis.isHead,
                'getCoors': snakeBodyThis.getCoors
            };
        };
        return this;
    }

    this.initialize = function (coors) {
        snakeBodies = [];
        snakeBodies.push(new SnakeBody(true, coors));
    };

    this.setMoveDirection = function (dir) {
        moveDirection = dir;
    };

    this.move = function () {
        snakeBodies.forEach(function (body) {
            body.moveBy(moveDirection);
        });
    };

    this.getSnakeHead = function () {
        return snakeBodies[0].getView();
    };

    return this;
}

Snake.createSnake = function () {
    "use strict";
    return new Snake();
};

module.exports = Snake;