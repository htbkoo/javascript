/**
 * Created by Hey on 24 Oct 2016
 */
'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var ConcatenatingFunctions = srcDirRequire(__dirname, 'ConcatenatingFunctions');

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

// describe("ConcatenatingFunctions", function () {
//     describe("Solution", function () {
//         it("should test for something", function () {
//             Test.expect("actual", "expected", "This is just an example of how you can write your own TDD tests");
//         });
//     });
// });

describe("ConcatenatingFunctions", function () {
    describe("Solution", function () {
        it("should test there is a pipe() method in Function prototype chain", function () {
            var testFunction = function(){
            };
            Test.expect(testFunction).is.not.undefined;
            Test.expect(testFunction.pipe).is.not.undefined;
            Test.expect(testFunction.pipe).is.a('function');
        });
        it("could test addOne() and square() in description are exposed", function () {
            Test.expect(ConcatenatingFunctions.addOne).is.a('function');
            Test.expect(ConcatenatingFunctions.square).is.a('function');
        });
        it("should test pipe() with test case in description", function () {
            var result = [1,2,3,4,5].map(ConcatenatingFunctions.addOne.pipe(ConcatenatingFunctions.square)); //-> [4,9,16,25,36]
            Test.expect(result).eql([4,9,16,25,36]);
        });
        it("should be able to pipe() more than 1 time", function () {
            var result = [1,2,3,4,5].map(ConcatenatingFunctions.addOne.pipe(ConcatenatingFunctions.square.pipe(ConcatenatingFunctions.addOne)));
            Test.expect(result).eql([5,10,17,26,37]);
        });
    });
});