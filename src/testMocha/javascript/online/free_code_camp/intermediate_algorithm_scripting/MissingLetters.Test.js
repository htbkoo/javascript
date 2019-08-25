/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var fearNotLetter = srcDirRequire(__dirname, 'MissingLetters');

describe('MissingLetters', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(fearNotLetter("abce")).to.equal("d");
        });
    });
});