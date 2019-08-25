/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var confirmEnding = srcDirRequire(__dirname, 'ConfirmTheEnding');

describe('ConfirmTheEnding', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(confirmEnding("Bastian", "n")).to.equal(true);
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(confirmEnding("Bastian", "an")).to.equal(true);
        });
    });
});