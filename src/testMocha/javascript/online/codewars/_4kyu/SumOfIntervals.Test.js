/**
 * Created by Hey on 25 Oct 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var sumIntervals = srcDirRequire(__dirname, 'SumOfIntervals');

//noinspection JSUnresolvedFunction,JSLint
describe('SumOfIntervals', function () {
    describe('TDD attempt', function(){
        it('should be able to count 1 interval',function(){
            Test.expect(sumIntervals([[1,2]])).eql(1);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe('sumIntervals', function () {
        it('should return the correct sum for non overlapping intervals', function () {
            var test1 = [[1, 5]];
            var test2 = [[1, 5], [6, 10]];
            Test.assert.equal(sumIntervals(test1), 4);
            Test.assert.equal(sumIntervals(test2), 8);
        });

        it('should return the correct sum for overlapping intervals', function () {
            var test1 = [[1, 5], [1, 5]];
            var test2 = [[1, 4], [7, 10], [3, 5]];
            Test.assert.equal(sumIntervals(test1), 4);
            Test.assert.equal(sumIntervals(test2), 7);
        });
    });
});