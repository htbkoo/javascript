/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var repeatStringNumTimes = srcDirRequire(__dirname, 'RepeatAStringRepeatAString');

describe('RepeatAStringRepeatAString', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(repeatStringNumTimes("abc", 3)).to.equal("abcabcabc");
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(repeatStringNumTimes("abc", 1)).to.equal("abc");
            Test.expect(repeatStringNumTimes("abc", 2)).to.equal("abcabc");
            Test.expect(repeatStringNumTimes("abc", 0)).to.equal("");
        });
    });
});