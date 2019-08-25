/**
 * Created by Hey on 6 Jan 2017
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var Game = srcDirRequire(__dirname, 'bowling_2017Jan06');

describe("2017Jan06 - Bowling Game Kata", function () {
    "use strict";
    var g;

    beforeEach(function () {
        // Given
        g = new Game();
    });

    describe("First Test", function () {
        it("testOutterGame", function () {
            // When
            rollMany(20, 0);

            // Then
            Test.expect(g.score()).to.equal(0);
        });
    });

    describe("Second Test", function () {
        it("testAllOne", function () {
            // When
            rollMany(20, 1);

            // Then
            Test.expect(g.score()).to.equal(20);
        });
    });

    describe("Third Test", function () {
        it("testOneSpare", function () {
            // When
            rollSpare();
            g.roll(3);
            rollMany(17, 0);

            // Then
            Test.expect(g.score()).to.equal(16);
        });
    });

    describe("Fourth Test", function () {
        it("testOneStrike", function () {
            // When
            rollStrike();
            g.roll(3);
            g.roll(4);
            rollMany(16, 0);

            // Then
            Test.expect(g.score()).to.equal(24);
        });
    });

    describe("Fifth Test", function () {
        it("testPerfectGame", function () {
            // When
            rollMany(12, 10);

            // Then
            Test.expect(g.score()).to.equal(300);
        });
    });

    function rollMany(n, pins) {
        new Array(n).fill(0).forEach(function () {
            g.roll(pins);
        });
    }

    function rollSpare() {
        g.roll(5);
        g.roll(5);
    }

    function rollStrike() {
        g.roll(10);
    }
});