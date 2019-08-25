/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var getIndexToIns = srcDirRequire(__dirname, 'WhereDoIBelong');

describe('WhereDoIBelong', function () {
    describe('Given Tests', function () {

        it("should pass example tests", function () {
            Test.expect(getIndexToIns([40, 60], 50)).to.equal(1);
        });
        it("should pass tests in description", function () {
            Test.expect(getIndexToIns([1, 2, 3, 4], 1.5)).to.equal(1);
            Test.expect(getIndexToIns([20, 3, 5], 19)).to.equal(2);
        });
        describe('Given Tests', function () {
            it("should pass tests in submission", function () {
                Test.expect(getIndexToIns([2, 5, 10], 15)).to.equal(3);
            });
        });
    });
});