/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var sumAll = srcDirRequire(__dirname, 'SumAllNumbersInARange');

describe('SumAllNumbersInARange', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(sumAll([1, 4])).to.equal(10);
        });
    });
});