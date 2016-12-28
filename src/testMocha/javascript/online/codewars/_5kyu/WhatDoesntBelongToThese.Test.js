/**
 * Created by Hey on 28 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var format = require('string-format');

var findTheNotFittingElement = srcDirRequire(__dirname, 'WhatDoesntBelongToThese');

describe('WhatDoesntBelongToThese', function () {
    describe("Solution", function () {
        it("exampleTests", function () {
            Test.assert.equal(findTheNotFittingElement([1, 2, 2, 2, 2]), 1);
            Test.assert.equal(findTheNotFittingElement([true, true, true, false, true]), false);
            Test.assert.equal(findTheNotFittingElement(['a', 'a', 'b', 'a', 'a', 'a', 'a']), 'b');
            Test.assert.equal(findTheNotFittingElement(['1', 2, '4', '6', '8']), 2);
            Test.assert.equal(findTheNotFittingElement([2, 2, 2, 2, 2, '2']), '2');
            Test.assert.equal(findTheNotFittingElement([1, 2, 4, 6, true]), true);
            Test.assert.equal(findTheNotFittingElement([1, 2, 4, 6, 10]), 1);
            Test.assert.equal(findTheNotFittingElement([2, 2, -2, 6, 10]), -2);
            Test.assert.equal(findTheNotFittingElement(['Z', 'L', 'P', 't', 'G']), 't');
            Test.assert.equal(findTheNotFittingElement(['Z', 'L', '3', 't', 'G']), '3');
            Test.assert.equal(findTheNotFittingElement(['Z', 'L', '3', 't', 4]), 4);
            Test.assert.equal(findTheNotFittingElement(['Z', 'l', '3', 't', 4]), 4);
            Test.assert.equal(findTheNotFittingElement(['Z', 'e', '.', 'a', 'G']), '.');
        });

        [
            {"series": [-2, 2, 2, 6, 10], "expected": -2},
            {"series": [2, -2, 2, 6, 10], "expected": -2},
            {"series": [2, 2, 6, -2, 10], "expected": -2},
            {"series": [2, 2, 6, 10, -2], "expected": -2}
        ].forEach(function (param, index) {
            it(format("[#{}] - my test", index), function () {
                Test.assert.equal(findTheNotFittingElement(param.series), param.expected);
            });
        });
    });
});