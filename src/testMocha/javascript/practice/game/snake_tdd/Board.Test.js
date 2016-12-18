/**
 * Created by Hey on 16 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
Test.use(sinonChai);

var Board = srcDirRequire(__dirname, 'Board');
var Food = srcDirRequire(__dirname, 'Food');
var Coordinates = srcDirRequire(__dirname, 'Coordinates');
var NextCoordinatesProvider = srcDirRequire(__dirname, 'NextCoordinatesProvider');

describe("Board - SnakeGame", function () {
    "use strict";
    describe("construct game board", function () {
        it("should expose width and height of board same as initialization", function () {
            var board = new Board(40, 50);
            Test.expect(board.getWidth()).to.equal(40, "Width of board should be equal to 40");
            Test.expect(board.getHeight()).to.equal(50, "Height of board should be equal to 50");
        });
    });
    describe("initialize related", function () {

        //    assert randomnesss?
        //    ref: http://softwareengineering.stackexchange.com/questions/147134/how-should-i-test-randomness

        it("should create food at random position within width and height when initialized", sinon.test(function () {
            // given
            var WIDTH = 20;
            var HEIGHT = 30;
            var providedX = 0, providedY = 5;
            var board = new Board(WIDTH, HEIGHT);
            var stubNextCoordinatesProvider = this.stub(NextCoordinatesProvider, "getNext", function () {
                return new Coordinates(providedX, providedY);
            });

            // when
            board.initialize();

            // then
            Test.expect(board.getNumOfFood()).to.equal(1, "Should have created 1 food when initialized");
            var foods = board.getViewOfFood();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Array);

            foods.forEach(function (food) {
                var coors = food.getCoors();
                Test.expect(coors.getX()).to.equal(providedX, "X of food should be same as provided");
                Test.expect(coors.getY()).to.equal(providedY, "Y of food should be same as provided");
            });
        }));

    });
    describe("food related", function () {
        it("should expose view of Food as array and number of Food", function () {
            var board = new Board();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Array);
            Test.expect(board.getNumOfFood()).to.equal(0);
        });
    });
});

