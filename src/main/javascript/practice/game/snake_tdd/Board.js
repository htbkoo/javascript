/**
 * Created by Hey on 16 Dec 2016
 */

var Food = require('./Food');
var Snake = require('./Snake');
var NextCoordinatesProvider = require('./NextCoordinatesProvider');

function Board(w, h) {
    "use strict";
    var boardThis = this;
    var control = {
        "LEFT": function (snake) {

        }
    };

    var foods = [];
    var snake = Snake.createSnake();

    this.getWidth = function () {
        return w;
    };
    this.getHeight = function () {
        return h;
    };
    this.getViewOfFood = function () {
        return foods.slice();
    };
    this.getNumOfFood = function () {
        return foods.length;
    };
    this.initialize = function () {
        snake = Snake.createSnake();
        foods = [];
        addFood();
        snake.initialize();
    };

    this.update = function () {
        snake.move();
        var snakeHeadCoors = snake.getSnakeHead().getCoors();
        var ate = foods.some(function (food) {
            var ate = snakeHeadCoors.isSameCoorsTo(food.getCoors());
            if (ate) {
                addFood();
            }
            return ate;
        });

        var gameover = isGameOver(snakeHeadCoors);

        return new Result(ate, gameover);
    };

    this.doCommand = function () {

    };

    function addFood() {
        foods.push(new Food(NextCoordinatesProvider.getNext()));
    }

    function isGameOver(snakeHeadCoors) {
        return snakeHeadCoors.getX() < 0 || snakeHeadCoors.getY() < 0 || snakeHeadCoors.getX() >= boardThis.getWidth() || snakeHeadCoors.getY() >= boardThis.getHeight();
    }

    function Result(bool_ate, bool_gameover) {
        this.ate = bool_ate;
        this.gameover = bool_gameover;
        return this;
    }

}

module.exports = Board;