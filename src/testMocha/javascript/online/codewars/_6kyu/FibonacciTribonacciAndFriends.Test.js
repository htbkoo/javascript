/**
 * Created by Hey on 24 Oct 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var Xbonacci = srcDirRequire(__dirname, 'FibonacciTribonacciAndFriends');

//noinspection JSUnresolvedFunction,JSLint
describe('FibonacciTribonacciAndFriends', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Fibonacci, Tribonacci and friends", function () {
        it("Basic tests", function () {
            Test.assert.sameMembers(Xbonacci([0, 1], 10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
            Test.assert.sameMembers(Xbonacci([1, 1], 10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
            Test.assert.sameMembers(Xbonacci([0, 0, 0, 0, 1], 10), [0, 0, 0, 0, 1, 1, 2, 4, 8, 16]);
            Test.assert.sameMembers(Xbonacci([1, 0, 0, 0, 0, 0, 1], 10), [1, 0, 0, 0, 0, 0, 1, 2, 3, 6]);
            Test.assert.sameMembers(Xbonacci([1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 20), [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256]);
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass example in description", function () {
            Test.assert.sameMembers(Xbonacci([1, 1, 1, 1], 10), [1, 1, 1, 1, 4, 7, 13, 25, 49, 94]);
            Test.assert.sameMembers(Xbonacci([0, 0, 0, 0, 1], 10), [0, 0, 0, 0, 1, 1, 2, 4, 8, 16]);
            Test.assert.sameMembers(Xbonacci([1, 0, 0, 0, 0, 0, 1], 10), [1, 0, 0, 0, 0, 0, 1, 2, 3, 6]);
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should work for random inputs too ", function () {
            Test.assert.sameMembers(Xbonacci([2, 1, 15, 2, 10, 8, 6, 13, 2, 20, 5, 5, 9], 12), [2, 1, 15, 2, 10, 8, 6, 13, 2, 20, 5, 5]);
            Test.assert.sameMembers(Xbonacci([13, 14, 19, 4, 11, 5, 1, 20, 10, 15, 0, 16, 5, 5, 15, 2, 16], 7), [13, 14, 19, 4, 11, 5, 1]);
        });
    });
});