/**
 * Created by Hey on 13 Aug 2016
 */

require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var number2words = srcDirRequire(__dirname, 'WriteOutNumbers');

//noinspection JSUnresolvedFunction,JSLint
describe('WriteOutNumbers', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Basic Tests:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            "use strict";
            Test.assert.equal(number2words(0), "zero");
            Test.assert.equal(number2words(1), "one");
            Test.assert.equal(number2words(8), "eight");
            Test.assert.equal(number2words(10), "ten");
            Test.assert.equal(number2words(19), "nineteen");
            Test.assert.equal(number2words(20), "twenty");
            Test.assert.equal(number2words(22), "twenty-two");
            Test.assert.equal(number2words(54), "fifty-four");
            Test.assert.equal(number2words(80), "eighty");
            Test.assert.equal(number2words(98), "ninety-eight");
            Test.assert.equal(number2words(100), "one hundred");
            Test.assert.equal(number2words(301), "three hundred one");
            Test.assert.equal(number2words(793), "seven hundred ninety-three");
            Test.assert.equal(number2words(800), "eight hundred");
            Test.assert.equal(number2words(650), "six hundred fifty");
            Test.assert.equal(number2words(1000), "one thousand");
            Test.assert.equal(number2words(1003), "one thousand three");
        });
    });
});