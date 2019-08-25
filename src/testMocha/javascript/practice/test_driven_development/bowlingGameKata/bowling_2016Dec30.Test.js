/**
 * Created by Hey on 30 Dec 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var Game = srcDirRequire(__dirname, 'bowling_2016Dec30');

describe("2016Dec30 - Bowling Game Kata", function () {
    "use strict";
    var g;

    beforeEach(function () {
        g = new Game();
    });

    describe("First test", function () {
        it("outterGameTest", function () {
            manyRoll(20, 0);

            Test.expect(g.score()).to.equal(0);
        });
    });

    describe("Second test", function () {
        it("allOneTest", function () {
            manyRoll(20, 1);

            Test.expect(g.score()).to.equal(20);
        });
    });

    describe("Third test", function () {
        it("oneSpareTest", function () {
            rollSpare();
            g.roll(3);

            manyRoll(17, 0);

            Test.expect(g.score()).to.equal(16);
        });
    });

    describe("Fourth test", function () {
        it("oneStrikeTest", function () {
            rollStrike();
            g.roll(3);
            g.roll(4);

            manyRoll(16, 0);

            Test.expect(g.score()).to.equal(24);
        });
    });

    describe("Fifth test", function () {
        it("perfectGameTest", function () {
            manyRoll(12, 10);

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