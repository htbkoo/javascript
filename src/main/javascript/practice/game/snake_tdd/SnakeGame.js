/**
 * Created by Hey on 6 Dec 2016
 */

var Board = require('./Board');

function SnakeGame(wOrBoard, h) {
    'use strict';
    var gameStarted = false;
    var board = (wOrBoard instanceof Board) ? wOrBoard : new Board(wOrBoard, h);
    var interval = 1000;

    this.startGame = function () {
        if (!gameStarted) {
            gameStarted = true;
            board.initialize();

            setInterval(function(){
                board.update();
            }, interval);
        }
    };

    this.isGameStarted = function () {
        return gameStarted;
    };

    this.getViewOfBoard = function () {
        return board;
    };

    this.getInterval = function(){
        return interval;
    };

    this.setInterval = function(i){
        interval = i;
    };

    return this;
}

SnakeGame.createWithDimensions = function (w, h) {
    "use strict";
    return new SnakeGame(w, h);
};

module.exports = SnakeGame.createWithDimensions;