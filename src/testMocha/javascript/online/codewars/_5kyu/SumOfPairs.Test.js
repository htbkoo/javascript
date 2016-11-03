/**
 * Created by Hey on 2 Aug 2016
 */

var assert = require('chai').assert;
var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');

var sum_pairs = srcDirRequire(__dirname, 'SumOfPairs');


describe("SumOfPairs", function () {
    'use strict';
    describe("Testing For Sum of Pairs", function () {
        describe("should #sum_pairs()", function () {
            var tests = [
                {
                    args: [1, 4, 8, 7, 3, 15],
                    target: 8,
                    message: "Basic: [" + this.args + "] should return [1, 7] for sum = 8",
                    expected: [1, 7]
                },
                {
                    args: [1, -2, 3, 0, -6, 1],
                    target: -6,
                    message: "Negatives: [" + this.args + "] should return [0, -6] for sum = -6",
                    expected: [0, -6]
                },
                {
                    args: [20, -13, 40],
                    target: -7,
                    message: "No Match: [" + this.args + "] should return undefined for sum = -7",
                    expected: undefined
                },
                {
                    args: [1, 2, 3, 4, 1, 0],
                    target: 2,
                    message: "First Match From Left: [" + this.args + "] should return [1, 1] for sum = 2 ",
                    expected: [1, 1]
                },
                {
                    args: [10, 5, 2, 3, 7, 5],
                    target: 10,
                    message: "First Match From Left REDUX!: [" + this.args + "] should return [3, 7] for sum = 10 ",
                    expected: [3, 7]
                },
                {
                    args: [4, -2, 3, 3, 4],
                    target: 8,
                    message: "Duplicates: [" + this.args + "] should return [4, 4] for sum = 8",
                    expected: [4, 4]
                },
                {
                    args: [0, 2, 0], target: 0, message: "Zeroes: [" + this.args + "] should return [0, 0] for sum = 0",
                    expected: [0, 0]
                },
                {
                    args: [5, 9, 13, -3],
                    target: 10,
                    message: "Subtraction: [" + this.args + "] should return [13, -3] for sum = 10",
                    expected: [13, -3]
                }
            ];

            tests.forEach(function (test) {
                it(test.message, function () {
                    assert.deepEqual(sum_pairs(test.args, test.target), test.expected);
                });
            });
        });

    });
});