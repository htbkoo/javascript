/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var slasher = srcDirRequire(__dirname, 'SlasherFlick');

describe('SlasherFlick', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(slasher([1, 2, 3], 2)).to.deep.equal([3]);
        });
    });
});