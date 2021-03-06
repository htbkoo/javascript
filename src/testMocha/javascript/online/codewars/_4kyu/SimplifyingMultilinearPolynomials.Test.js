/**
 * Created by Hey on 12 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var simplify = srcDirRequire(__dirname, 'SimplifyingMultilinearPolynomials');

//noinspection JSUnresolvedFunction,JSLint
describe('SimplifyingMultilinearPolynomials', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Sample tests", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("Test reduction by equivalence", function () {
            
            Test.assert.equal(simplify("dc+dcba"), "cd+abcd");
            Test.assert.equal(simplify("2xy-yx"), "xy");
            Test.assert.equal(simplify("-a+5ab+3a-c-2a"), "-c+5ab");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Test monomial length ordering", function () {
            
            Test.assert.equal(simplify("-abc+3a+2ac"), "3a+2ac-abc");
            Test.assert.equal(simplify("xyz-xz"), "-xz+xyz");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Test lexicographic ordering", function () {
            
            Test.assert.equal(simplify("a+ca-ab"), "a-ab+ac");
            Test.assert.equal(simplify("xzy+zby"), "byz+xyz");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Test no leading +", function () {
            
            Test.assert.equal(simplify("-y+x"), "x-y");
            Test.assert.equal(simplify("y-x"), "-x+y");
        });
    });
});