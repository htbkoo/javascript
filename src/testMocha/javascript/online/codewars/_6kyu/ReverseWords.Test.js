/**
 * Created by Hey on 31 July 2016
 */
require.main.require('testMocha/javascript/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var reverseWords = srcDirRequire(__dirname, 'ReverseWords');

// DONE: Replace examples and use TDD development by writing your own tests

// These are some of the methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// You can also use Chai (http://chaijs.com/)
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();

//noinspection JSUnresolvedFunction,JSLint
describe("ReverseWords", function () {
    //noinspection JSLint
    describe("Solution", function () {
        //noinspection JSLint
        it("should reverse given example", function () {
            Test.equal(reverseWords("This is an example!"), "sihT si na !elpmaxe");
        });
        //noinspection JSLint
        it("should reverse and keep more than 1 consecutive space", function () {
            Test.equal(reverseWords("now here is         many      spaces!"), "won ereh si         ynam      !secaps");
        });
    });
});