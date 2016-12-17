/**
 * Created by Hey on 16 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var Board = srcDirRequire(__dirname, 'Board');
var Food = srcDirRequire(__dirname, 'Food');

describe("Board - SnakeGame", function () {
    "use strict";
    describe("construct game board", function () {
        it("should expose width and height of board same as initialization", function () {
            var board = new Board(40, 50);
            Test.expect(board.getWidth()).to.equal(40, "Width of board should be equal to 40");
            Test.expect(board.getHeight()).to.equal(50, "Height of board should be equal to 50");
        });
    });
    describe("food related", function () {
        it("should expose Food and number of Food as 0 when initialized", function () {
            var board = new Board();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Food);
            Test.expect(board.getNumOfFood()).to.equal(0);
        });
        it("should expose ", function () {
            var board = new Board();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Food);
        });
    });
});

