/**
 * Created by Hey on 28 Dec 2016
 */
'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var isMerge = srcDirRequire(__dirname, 'MergedStringChecker');

describe('MergedStringChecker', function () {
    describe("Given Tests:", function () {
        it("should pass given test", function () {
            Test.expect(isMerge('codewars', 'code', 'wars')).to.be.true;
            Test.expect(isMerge('codewars', 'cdw', 'oears')).to.be.true;
            Test.expect(!isMerge('codewars', 'cod', 'wars')).to.be.true;
        });
    });
    describe("Issues Tests:", function () {
        it("should pass tests raised in issues", function () {
            Test.expect(isMerge('banana', 'bana', 'an')).to.be.true;
            Test.expect(isMerge('baanana', 'baana', 'an')).to.be.true;
            Test.expect(isMerge('bananx', 'banx', 'an')).to.be.true;
            Test.expect(isMerge('banxna', 'banx', 'an')).to.be.false;
            Test.expect(isMerge('bananaxxxxx', 'bana', 'anxxxxx')).to.be.true;
            Test.expect(isMerge('ananab', 'anab', 'na')).to.be.true;
            Test.expect(isMerge('banana', 'bana', 'a')).to.be.false;
            Test.expect(isMerge('banana', 'banna', 'a')).to.be.true;
            Test.expect(isMerge('banana', 'bana', 'ana')).to.be.false;
            Test.expect(isMerge('banana', 'bna', 'ana')).to.be.true;
            Test.expect(isMerge('ab', 'ab', 'b')).to.be.false;
            Test.expect(isMerge('codewars', 'code', 'wasr')).to.be.false;
        });
    });
});