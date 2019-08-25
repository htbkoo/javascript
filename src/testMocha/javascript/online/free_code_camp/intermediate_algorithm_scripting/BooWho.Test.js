/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var booWho = srcDirRequire(__dirname, 'BooWho');

describe('BooWho', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(booWho(null)).to.equal(false);
        });
    });
});