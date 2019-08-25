/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var palindrome = srcDirRequire(__dirname, 'CheckForPalindromes');

describe('CheckForPalindromes', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(palindrome("eye")).to.be.true;
        });
    });
    describe('My Tests', function () {
        it("should pass my test cases", function () {
            Test.expect(palindrome("aav")).to.be.false;
            Test.expect(palindrome("a2A3*3a2A")).to.be.true;
        });
    });
    describe('Submission Tests', function () {
        it("should pass submission test cases", function () {
            Test.expect(palindrome("1 eye for of 1 eye.")).to.be.false;
        });
    });
});