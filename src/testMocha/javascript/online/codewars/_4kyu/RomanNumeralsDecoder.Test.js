/**
 * Created by Hey on 20 Aug 2016
 */


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

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint,JSHint
var solution = srcDirRequire(__dirname, 'RomanNumeralsDecoder');

//noinspection JSUnresolvedFunction,JSLint
describe('RomanNumeralsDecoder', function () {
    //noinspection JSLint,JSUnresolvedFunction,JSHint
    describe("Given tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should decode roman numerals", function () {
            "use strict";
            Test.assert.equal(solution("MCMXC"), 1990);
            Test.assert.equal(solution("MMVIII"), 2008);
            Test.assert.equal(solution("MDCLXVI"), 1666);
            Test.assert.equal(solution("XXI"), 21);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Customer tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should decode roman numerals", function () {
            "use strict";
            Test.assert.equal(solution("I"), 1);
            Test.assert.equal(solution("II"), 2);
            Test.assert.equal(solution("III"), 3);
            Test.assert.equal(solution("IV"), 4);
            Test.assert.equal(solution("V"), 5);
            Test.assert.equal(solution("VI"), 6);
            Test.assert.equal(solution("VII"), 7);
            Test.assert.equal(solution("VIII"), 8);
            Test.assert.equal(solution("IX"), 9);
            Test.assert.equal(solution("X"), 10);
            Test.assert.equal(solution("XI"), 11);
            Test.assert.equal(solution("XX"), 20);
            Test.assert.equal(solution("XXXIV"), 34);
            Test.assert.equal(solution("XLII"), 42);
            Test.assert.equal(solution("XCVII"), 97);
            Test.assert.equal(solution("CMXCIX"), 999);
            Test.assert.equal(solution("MMMCMXCIX"), 3999);
        });
    });
});



