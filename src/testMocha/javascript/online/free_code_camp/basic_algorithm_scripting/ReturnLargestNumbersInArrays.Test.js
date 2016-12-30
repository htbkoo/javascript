/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var largestOfFour = srcDirRequire(__dirname, 'ReturnLargestNumbersInArrays');

describe('ReturnLargestNumbersInArrays', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]])).to.deep.equal([5, 27, 39, 1001]);
        });
    });
});