/**
 * Created by Hey on 13 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var find_the_ball = srcDirRequire(__dirname, 'TheShellGame');

//noinspection JSUnresolvedFunction,JSLint
describe('TheShellGame', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("An empty swap does nothing", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.equal(find_the_ball(5, []), 5);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Finding the ball with sequences", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.equal(find_the_ball(0, [[0, 1], [2, 1], [0, 1]]), 2);
        });
    });
});