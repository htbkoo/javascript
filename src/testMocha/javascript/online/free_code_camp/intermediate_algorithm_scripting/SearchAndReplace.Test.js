/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var myReplace = srcDirRequire(__dirname, 'SearchAndReplace');

describe('SearchAndReplace', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped")).to.equal("A quick brown fox leaped over the lazy dog");
        });
        it("should pass tests in descrption", function () {
            Test.expect(myReplace("A quick brown fox jumped over the lazy Book", "book", "dog")).to.equal("A quick brown fox jumped over the lazy Dog");
        });
    });
});