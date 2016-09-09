/**
 * Created by Hey on 19 Aug 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var defaultArguments = srcDirRequire(__dirname, 'DefaultArguments');

//noinspection JSUnresolvedFunction,JSLint
describe('DefaultArguments', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Given tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should set default arguments for add", function () {
            function add(a, b) {
                return a + b;
            }

            var add_ = defaultArguments(add, {b: 9});
            Test.assert.equal(add_(10), 19);
            Test.assert.equal(add_(10, 5), 15);
            add_ = defaultArguments(add_, {b: 3});
            Test.assert.equal(add_(10), 13);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Tests in description", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should set default arguments for add", function () {
            function add(a, b) {
                return a + b;
            }

            var add_ = defaultArguments(add, {b: 9});
            Test.assert.equal(add_(10), 19);
            Test.assert.equal(add_(10, 7), 17);
            //noinspection BadExpressionStatementJS, JSLint - syntax of chai
            Test.expect(add_()).to.be.NaN;

            add_ = defaultArguments(add_, {b: 3, a: 2});
            Test.assert.equal(add_(10), 13);
            Test.assert.equal(add_(), 5);

            add_ = defaultArguments(add_, {c: 3}); // doesn't do anything, since c isn't an argument
            //noinspection BadExpressionStatementJS, JSLint - syntax of chai
            Test.expect(add_(10)).to.be.NaN;
            Test.assert.equal(add_(10, 10), 20);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Self tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should set default arguments for add", function () {
            function add(a, b) {
                return a + b;
            }

            var add_ = defaultArguments(add, {b: 9});
            //noinspection BadExpressionStatementJS, JSLint - syntax of chai
            Test.expect(add_()).to.be.NaN;
            Test.assert.equal(add_(10), 19);
            Test.assert.equal(add_(10, 5), 15);
            add_ = defaultArguments(add_, {b: 3});
            Test.assert.equal(add_(10), 13);
        });
    });
});