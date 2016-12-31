/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var convertToRoman = srcDirRequire(__dirname, 'RomanNumeralConverter');

describe('RomanNumeralConverter', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(convertToRoman(36)).to.equal("XXXVI");
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(convertToRoman(99)).to.equal("XCIX");
            Test.expect(convertToRoman(999)).to.equal("CMXCIX");
            Test.expect(convertToRoman(3499)).to.equal("MMMCDXCIX");
            Test.expect(convertToRoman(3999)).to.equal("MMMCMXCIX");
        });
    });
});