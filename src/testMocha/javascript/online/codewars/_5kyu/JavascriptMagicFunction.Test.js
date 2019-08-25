/**
 * Created by Hey on 20 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var MagicFunction = srcDirRequire(__dirname, 'JavascriptMagicFunction');

//noinspection JSUnresolvedFunction,JSLint
describe('JavascriptMagicFunction', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Given Tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(0 == MagicFunction()).to.be.true;
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(3 == MagicFunction(1, 2)).to.be.true;
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(6 == MagicFunction(1, 3)(2)).to.be.true;
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(6 == MagicFunction(1)(2, 3)).to.be.true;
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(6 == MagicFunction(1)(2)(3)).to.be.true;
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(38 == MagicFunction(1, 2)(3, 4, 5)(6)(7, 10)).to.be.true;
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Submission Test cases:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass test in submission", function () {
            //noinspection JSLint,BadExpressionStatementJS,JSHint
            Test.expect(3.33 == MagicFunction(3.33)).to.be.true;
        });
    });
});