/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var rot13 = srcDirRequire(__dirname, 'CaesarsCipher');

describe('CaesarsCipher', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(rot13("SERR PBQR PNZC")).to.equal("FREE CODE CAMP");
        });
        it("should pass tests in description", function () {
            Test.expect(rot13("LBH QVQ VG!")).to.equal("YOU DID IT!");
        });
    });
});