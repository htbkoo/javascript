/**
 * Created by Hey on 31 July 2016
 */
require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var isPangram = srcDirRequire(__dirname, 'DetectPangram');

//noinspection JSUnresolvedFunction,JSLint
describe("DetectPangram", function () {
    //noinspection JSLint
    describe("#isPangram()", function () {
        //noinspection JSLint
        it("should test Pangram", function () {
            var string = "The quick brown fox jumps over the lazy dog.";
            Test.equal(isPangram(string), true);
        });
        //noinspection JSLint
        it("should test non Pangram", function () {
            var string = "This is not a pangram.";
            Test.equal(isPangram(string), false);
        });
    });
});