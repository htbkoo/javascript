/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var chunkArrayInGroups = srcDirRequire(__dirname, 'ChunkyMonkey');

describe('ChunkyMonkey', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(chunkArrayInGroups(["a", "b", "c", "d"], 2)).to.deep.equal([["a", "b"], ["c", "d"]]);
        });
    });
});