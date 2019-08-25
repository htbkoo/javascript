/**
 * Created by Hey on 13 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var duplicateEncode = srcDirRequire(__dirname, 'DuplicateEncoder');

//noinspection JSUnresolvedFunction,JSLint
describe('DuplicateEncoder', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Basic Tests:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.equal(duplicateEncode("din"), "(((");
            Test.assert.equal(duplicateEncode("recede"), "()()()");
            Test.assert.equal(duplicateEncode("Success"), ")())())", "should ignore case");
            Test.assert.equal(duplicateEncode("(( @"), "))((");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass random test", function () {
            // Random test case is WRONG! - '!' only appeared once
            // Test.assert.equal(duplicateEncode(")!dSyTPwcv"), "()((((((((");
            Test.assert.equal(duplicateEncode(")!dSyTPwcv"), "((((((((((");
        });
    });
});