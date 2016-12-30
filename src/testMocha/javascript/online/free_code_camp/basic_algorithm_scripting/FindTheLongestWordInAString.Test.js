/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var findLongestWord = srcDirRequire(__dirname, 'FindTheLongestWordInAString');

describe('FindTheLongestWordInAString', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(findLongestWord("The quick brown fox jumped over the lazy dog")).to.equal(6);
        });
    });
});