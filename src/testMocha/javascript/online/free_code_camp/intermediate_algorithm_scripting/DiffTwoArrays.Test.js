/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var diffArray = srcDirRequire(__dirname, 'DiffTwoArrays');

describe('DiffTwoArrays', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5])).to.deep.equal([4]);
        });
    });
});