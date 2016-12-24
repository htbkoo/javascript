/**
 * Created by Hey on 16 Dec 2016
 */

var Coordinates = require('./Coordinates');

function Snake() {
    "use strict";
    var snakeThis = this;

    var snakeBodies = [];
    var moveDirection = new Coordinates(0, 0);

    function SnakeBody(head, param_coors, param_facing) {
        var coors = param_coors;
        var snakeBodyThis = this;
        var facing = param_facing;

        this.moveBy = function (dir) {
            coors = coors.addAndGetNew(dir);
        };
        this.trySetFacing = function (dir) {
            if (!moveDirection.isOppositeTo(dir)){
                facing = Coordinates.copyFrom(dir);
            }
        };
        this.getView = function () {
            return {
                'isHead': function () {
                    return head;
                },
                'getCoors': function () {
                    return coors;
                },
                'getFacing': function () {
                    return facing;
                }
            };
        };
        return this;
    }

    this.initialize = function (coors) {
        snakeBodies = [];
        snakeBodies.push(new SnakeBody(true, coors, new Coordinates(0, 0)));
    };

    this.setMoveDirection = function (dir) {
        snakeBodies[0].trySetFacing(dir);
    };

    this.move = function () {
        moveDirection = snakeThis.getViewOfSnakeHead().getFacing();
        snakeBodies.forEach(function (body) {
            body.moveBy(body.getView().getFacing());
        });
    };

    this.getViewOfSnakeHead = function () {
        return snakeBodies[0].getView();
    };

    return this;
}

Snake.createSnake = function () {
    "use strict";
    return new Snake();
};

module.exports = Snake;