/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var destroyer = srcDirRequire(__dirname, 'SeekAndDestroy');

describe('SeekAndDestroy', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(destroyer([1, 2, 3, 1, 2, 3], 2, 3)).to.deep.equal([1, 1]);
        });
    });
});