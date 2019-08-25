/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var dropElements = srcDirRequire(__dirname, 'DropIt');

describe('DropIt', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(dropElements([1, 2, 3], function (n) {
                return n < 3;
            })).to.deep.equal([1, 2, 3]);
        });
    });
});