/**
 * Created by Hey on 29 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var Game = srcDirRequire(__dirname, 'bowling_2016Dec29');

describe("2016Dec29 - Bowling Game Kata", function () {
    "use strict";

    var game;

    beforeEach(function () {
        // Given
        game = new Game();
    });

    describe("First test", function () {
        it("testOutterGame", function () {
            // When
            rollMany(20, 0);

            // Then
            Test.expect(game.score()).to.equal(0);
        });
    });

    describe("Second test", function () {
        it("testAllOnes", function () {
            // When
            rollMany(20, 1);

            // Then
            Test.expect(game.score()).to.equal(20);

        });
    });

    describe("Third test", function () {
        it("testOneSpare", function () {
            // When
            rollSpare();
            game.roll(3);
            rollMany(17, 0);

            // Then
            Test.expect(game.score()).to.equal(16);
        });
    });

    describe("Fourth test", function () {
        it("testOneStrike", function () {
            // When
            rollStrike();
            game.roll(3);
            game.roll(4);
            rollMany(16, 0);

            // Then
            Test.expect(game.score()).to.equal(24);
        });
    });

    describe("Fifth test", function () {
        it("testPerfectGame", function () {
            // When
            rollMany(12, 10);

            // Then
            Test.expect(game.score()).to.equal(300);
        });
    });

    function rollMany(n, pins) {
        new Array(n).fill(0).forEach(function (_, i) {
            game.roll(pins);
        });
    }

    function rollSpare() {
        game.roll(5);
        game.roll(5);
    }

    function rollStrike() {
        game.roll(10);
    }
});