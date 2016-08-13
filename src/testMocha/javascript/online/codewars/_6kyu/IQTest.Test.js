/**
 * Created by Hey on 13 Aug 2016
 */
require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var iqTest = srcDirRequire(__dirname, 'IQTest');

//noinspection JSUnresolvedFunction,JSLint
describe('IQTest', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("IQ Test", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.equal(iqTest("2 4 7 8 10"), 3);
            Test.assert.equal(iqTest("1 2 2"), 1);
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass example in description", function () {
            "use strict";
            Test.assert.equal(iqTest("1 2 1 1"), 2, "Second number is even, while the rest of the numbers are odd");
        });
    });
});