/**
 * Created by Hey on 16 Dec 2016
 */

var Food = require('./Food');

function Board(w, h) {
    "use strict";
    this.getWidth = function () {
        return w;
    };
    this.getHeight = function () {
        return h;
    };
    this.getViewOfFood = function () {
        return new Food();
    };
    this.getNumOfFood = function () {
        return 0;
    };
}

module.exports = Board;