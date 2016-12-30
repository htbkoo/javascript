/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var reverseString = srcDirRequire(__dirname, 'ReverseAString');

describe('ReverseAString', function () {
    describe('Given Tests', function () {
        it("should pass example tess", function () {
            Test.expect(reverseString("hello")).to.equal("olleh");
        });
    });
});