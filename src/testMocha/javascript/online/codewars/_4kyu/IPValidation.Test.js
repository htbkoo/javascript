/**
 * Created by Hey on 3 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var format = require('string-format');

var ipValidation = srcDirRequire(__dirname, 'IPValidation');

// DONE: Replace examples and use TDD development by writing your own tests

// These are some CW specific test methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// NodeJS assert is also automatically required for you.
//    assert(true)
//    assert.strictEqual({a: 1}, {a: 1})
//    assert.deepEqual({a: [{b: 1}]}, {a: [{b: 1}]})

// You can also use Chai (http://chaijs.com/) by requiring it yourself
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();


describe('IPValidation', function () {

    describe("Test regex", function () {
        it("should test regex for number cases", function () {
            Test.expect(/1/.test('1')).to.equal(true, format("{} should be valid", 1));

            function range(incStart, excEnd) {
                incStart = incStart ? incStart : 0;
                return Array.apply(null, new Array(excEnd - incStart)).map(function (_, i) {
                    return i + incStart;
                });
            }

            range(1, 10).forEach(function (value) {
                Test.expect(/^[1-9]$/.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });

            range(10, 100).forEach(function (value) {
                Test.expect(/^[1-9][0-9]$/.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });

            range(1, 100).forEach(function (value) {
                Test.expect(/^[1-9]$|^[1-9][0-9]$/.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });

            range(100, 200).forEach(function (value) {
                Test.expect(/^1[0-9][0-9]$/.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });

            var regExp_100 = /^[1-9]$|^[1-9][0-9]$|^1[0-9][0-9]$/;
            range(1, 200).forEach(function (value) {
                Test.expect(regExp_100.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });
            Test.expect(regExp_100.test(256)).to.equal(false, format("{} should be invalid", 256));

            var regExp_200 = /^[1-9]$|^[1-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$/;
            range(1, 256).forEach(function (value) {
                Test.expect(regExp_200.test(value.toString())).to.equal(true, format("{} should be valid", value));
            });
            Test.expect(regExp_200.test(256)).to.equal(false, format("{} should be invalid", 256));
        });
        xit("should test regex for full cases", function () {
            var regExp_200_with_dot = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
            Test.expect(regExp_200_with_dot.test("1.1.1.1")).to.equal(true, format("{} should be valid", "1.1.1.1"));
            Test.expect(regExp_200_with_dot.test("255.255.255.255")).to.equal(true, format("{} should be valid", "255.255.255.255"));
            Test.expect(regExp_200_with_dot.test("256.256.256.256")).to.equal(true, format("{} should be invalid", "256.256.256.256"));
            Test.expect(regExp_200_with_dot.test("01.1.1.1")).to.equal(true, format("{} should be invalid", "01.1.1.1"));
        });
    });

    describe("Description Test cases", function () {
        describe("Test for - Valid inputs", function () {
            [
                '1.2.3.4',
                '123.45.67.89'
            ].forEach(function (value, index) {
                it(format("[{}] - {}", index, value), function () {
                    Test.expect(ipValidation(value)).to.equal(true, format("{} should be valid", value));
                });
            });
        });
        describe("Test for - Invalid inputs", function () {
            [
                '1.2.3',
                '1.2.3.4.5',
                '123.456.78.90',
                '123.045.067.089'
            ].forEach(function (value, index) {
                it(format("[{}] - {}", index, value), function () {
                    Test.expect(ipValidation(value)).to.equal(false, format("{} should be invalid", value));
                });
            });
        });

        describe("Test for - submission cases", function () {
            [
                '0.0.0.0',
                '82.0.97.49'
            ].forEach(function (value, index) {
                it(format("[{}] - {}", index, value), function () {
                    Test.expect(ipValidation(value)).to.equal(true, format("{} should be valid", value));
                });
            });
        });
    });
});