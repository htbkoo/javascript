/**
 * Created by Hey on 2 Jan 2017
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var Game = srcDirRequire(__dirname, 'bowling_2017Jan02');

describe("2017Jan02 - Bowling Game Kata", function () {
    "use strict";
    var g;

    beforeEach(function(){
        g = new Game();
    });

    describe("First test", function () {
        it("testOutterGame", function () {
            // When
            manyRoll(20, 0);

            // Then
            Test.expect(g.score()).to.equal(0);
        });
    });

    describe("Second test", function () {
        it("testAllOne", function () {
            // When
            manyRoll(20, 1);

            // Then
            Test.expect(g.score()).to.equal(20);
        });
    });

    describe("Third test", function () {
        it("testOneSpare", function () {
            // When
            rollSpare();
            g.roll(3);
            manyRoll(17, 0);

            // Then
            Test.expect(g.score()).to.equal(16);
        });
    });

    describe("Fourth test", function () {
        it("testOneSpike", function () {
            // When
            rollStrike();
            g.roll(3);
            g.roll(4);
            manyRoll(16, 0);

            // Then
            Test.expect(g.score()).to.equal(24);
        });
    });

    describe("Fifth test", function () {
        it("testPerfectGame", function () {
            // When
            manyRoll(12, 10);

            // Then
            Test.expect(g.score()).to.equal(300);
        });
    });

    function manyRoll(n, pins) {
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