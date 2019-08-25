/**
 * Created by Hey on 29 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var Kata = srcDirRequire(__dirname, 'VolumeOfACuboid');

//noinspection JSUnresolvedFunction,JSLint
describe('VolumeOfACuboid', function () {
    describe('Given Tests', function () {
        it("should pass example tess", function () {
            Test.assert.equal(Kata.getVolumeOfCuboid(1, 2, 2), 4);
            Test.assert.equal(Kata.getVolumeOfCuboid(6.3, 2, 5), 63);
        });
    });
});