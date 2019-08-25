/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var binaryAgent = srcDirRequire(__dirname, 'BinaryAgents');

describe('BinaryAgents', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111")).to.equal("Aren\'t bonfires fun!?");
        });
    });
});