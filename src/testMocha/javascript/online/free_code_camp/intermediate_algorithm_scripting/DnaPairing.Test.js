/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var pairElement = srcDirRequire(__dirname, 'DnaPairing');

describe('DnaPairing', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(pairElement("GCG")).to.deep.equal([["G", "C"], ["C", "G"], ["G", "C"]]);
        });
    });
});