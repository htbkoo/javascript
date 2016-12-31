/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var truthCheck = srcDirRequire(__dirname, 'EverythingBeTrue');

describe('EverythingBeTrue', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(
                truthCheck([
                    {"user": "Tinky-Winky", "sex": "male"},
                    {"user": "Dipsy", "sex": "male"},
                    {"user": "Laa-Laa", "sex": "female"},
                    {"user": "Po", "sex": "female"}
                ], "sex")).to.equal(true);
        });
    });
});