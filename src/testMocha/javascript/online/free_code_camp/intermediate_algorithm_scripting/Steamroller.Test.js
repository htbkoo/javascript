/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var steamrollArray = srcDirRequire(__dirname, 'Steamroller');

describe('Steamroller', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(steamrollArray([1, [2], [3, [[4]]]])).to.deep.equal([1, 2, 3, 4]);
        });
    });
});