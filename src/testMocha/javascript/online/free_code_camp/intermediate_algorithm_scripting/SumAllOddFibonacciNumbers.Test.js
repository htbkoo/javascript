/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var sumFibs = srcDirRequire(__dirname, 'SumAllOddFibonacciNumbers');

describe('SumAllOddFibonacciNumbers', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(sumFibs(4)).to.equal(5);
        });
    });
});