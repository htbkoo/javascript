/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var spinalCase = srcDirRequire(__dirname, 'SpinalTapCase');

describe('SpinalTapCase', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(spinalCase('This Is Spinal Tap')).to.equal("this-is-spinal-tap");
        });
    });

    describe('Submission Tests', function () {
        it("should pass submission tests", function () {
            Test.expect(spinalCase("This Is Spinal Tap")).to.equal("this-is-spinal-tap");
            Test.expect(spinalCase("thisIsSpinalTap")).to.equal("this-is-spinal-tap");
            Test.expect(spinalCase("The_Andy_Griffith_Show")).to.equal("the-andy-griffith-show");
            Test.expect(spinalCase("Teletubbies say Eh-oh")).to.equal("teletubbies-say-eh-oh");
            Test.expect(spinalCase("AllThe-small Things")).to.equal("all-the-small-things");
        });
    });
});