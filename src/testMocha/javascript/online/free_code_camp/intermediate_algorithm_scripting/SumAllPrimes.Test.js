/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var sumPrimes = srcDirRequire(__dirname, 'SumAllPrimes');

describe('SumAllPrimes', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(sumPrimes(10)).to.equal(17);
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(sumPrimes(100)).to.equal(1060);
        });
    });
});