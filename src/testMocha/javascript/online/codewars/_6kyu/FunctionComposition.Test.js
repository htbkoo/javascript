/**
 * Created by Hey on 14 Aug 2016
 */
'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var compose = srcDirRequire(__dirname, 'FunctionComposition');

//noinspection JSUnresolvedFunction,JSLint
describe('FunctionComposition', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Function Composition", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            var add1 = function (a) {
                return a + 1;
            };
            var id = function (a) {
                return a;
            };

            //noinspection JSUnresolvedVariable,JSUnresolvedVariable,BadExpressionStatementJS,JSLint
            Test.expect(compose(add1, id)(0) === 1).to.be.true;
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass example in description", function () {

        });
    });
});