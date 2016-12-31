/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var smallestCommons = srcDirRequire(__dirname, 'SmallestCommonMultiple');

describe('SmallestCommonMultiple', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(smallestCommons([1,5])).to.equal(60);
        });
    });
});