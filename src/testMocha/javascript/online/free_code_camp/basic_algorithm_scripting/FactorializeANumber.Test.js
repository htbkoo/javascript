/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var factorialize = srcDirRequire(__dirname, 'FactorializeANumber');

describe('FactorializeANumber', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(factorialize(5)).to.equal(120);
        });
    });
    describe('My Tests', function () {
        it("should pass my test cases", function () {
            Test.expect(factorialize(0)).to.equal(1);
            Test.expect(factorialize(1)).to.equal(1);
            Test.expect(factorialize(2)).to.equal(2);
            Test.expect(factorialize(3)).to.equal(6);
            Test.expect(factorialize(4)).to.equal(24);
        });
    });
});