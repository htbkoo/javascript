/**
 * Created by Hey on 28 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var cakes = srcDirRequire(__dirname, 'PeteTheBaker');

describe('PeteTheBaker', function () {
    describe('description example', function () {
        var recipe, available;

        it('pass example tests', function () {
            recipe = {flour: 500, sugar: 200, eggs: 1};
            available = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};
            Test.assert.equal(cakes(recipe, available), 2, 'Wrong result for example #1');

            recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
            available = {sugar: 500, flour: 2000, milk: 2000};
            Test.assert.equal(cakes(recipe, available), 0, 'Wrong result for example #2');
        });
    });
});