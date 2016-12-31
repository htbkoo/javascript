/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var findElement = srcDirRequire(__dirname, 'FindersKeepers');

describe('FindersKeepers', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; })).to.equal(2);
        });
    });
});