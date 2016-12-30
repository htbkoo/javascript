/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var truncateString = srcDirRequire(__dirname, 'TruncateAstring');

describe('TruncateAstring', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(truncateString("A-tisket a-tasket A green and yellow basket", 11)).to.equal("A-tisket...");
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(truncateString("A-tisket a-tasket A green and yellow basket", 3)).to.equal("A-t...");
            Test.expect(truncateString("A-tisket a-tasket A green and yellow basket", 2)).to.equal("A-...");
            Test.expect(truncateString("A-tisket a-tasket A green and yellow basket", 1)).to.equal("A...");
            Test.expect(truncateString("A-tisket a-tasket A green and yellow basket", 99)).to.equal("A-tisket a-tasket A green and yellow basket");
        });
    });
});