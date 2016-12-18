/**
 * Created by Hey on 16 Dec 2016
 */

var Food = require('./Food');
var Snake = require('./Snake');
var NextCoordinatesProvider = require('./NextCoordinatesProvider');

function Board(w, h) {
    "use strict";

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
        addFood();
        snake.initialize();
    };

    function addFood() {
        foods.push(new Food(NextCoordinatesProvider.getNext()));
    }
}

module.exports = Board;