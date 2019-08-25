/**
 * Created by Hey on 1 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var pascalsTriangle = srcDirRequire(__dirname, 'PascalsTriangle');

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

describe("PascalsTriangle", function () {
    "use strict";
    describe("Solution", function () {
        it("should be able to call pascalsTriangle as function", function () {
            Test.expect(pascalsTriangle).is.a('function');
        });
        it("should be able to get pascalsTriangle(1)=[1]", function () {
            Test.expect(pascalsTriangle(1)).eql([1]);
        });
        it("should be able to pass tsst in description", function () {
            Test.expect(pascalsTriangle(1)).eql([1]);
            Test.expect(pascalsTriangle(2)).eql([1, 1, 1]);
            Test.expect(pascalsTriangle(3)).eql([1, 1, 1, 1, 2, 1]);
            Test.expect(pascalsTriangle(4)).eql([1, 1, 1, 1, 2, 1, 1, 3, 3, 1]);
        });
    });
});