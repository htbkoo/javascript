/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var convertHTML = srcDirRequire(__dirname, 'ConvertHtmlEntities');

describe('ConvertHtmlEntities', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(convertHTML("Dolce & Gabbana")).to.equal("Dolce &amp; Gabbana");
        });
    });
});