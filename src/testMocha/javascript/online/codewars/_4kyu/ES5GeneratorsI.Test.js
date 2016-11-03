/**
 * Created by Hey on 31 Oct 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var generator = srcDirRequire(__dirname, 'ES5GeneratorsI').generator;
var dummySeq = srcDirRequire(__dirname, 'ES5GeneratorsI').dummySeq;
var factorialSeq = srcDirRequire(__dirname, 'ES5GeneratorsI').factorialSeq;
var fibonacciSeq = srcDirRequire(__dirname, 'ES5GeneratorsI').fibonacciSeq;
var rangeSeq = srcDirRequire(__dirname, 'ES5GeneratorsI').rangeSeq;
var primeSeq = srcDirRequire(__dirname, 'ES5GeneratorsI').primeSeq;
var partialSumSeq = srcDirRequire(__dirname, 'ES5GeneratorsI').partialSumSeq;

describe("ES5GeneratorsI", function () {
    'use strict';

    describe("ES5 Dummy generator", function () {
        it("Test dummy generator", function () {
            var seq = generator(dummySeq);
            Test.assert.equal(seq.next(), 'dummy');
            Test.assert.equal(seq.next(), 'dummy');
            Test.assert.equal(seq.next(), 'dummy');
        });
    });

    describe("ES5 Simple Generators", function () {

        it("Test factorial generator", function () {
            var seq = generator(factorialSeq);
            Test.assert.equal(seq.next(), 1); // 0! = 1
            Test.assert.equal(seq.next(), 1); // 1! = 1
            Test.assert.equal(seq.next(), 2); // 2! = 2
            Test.assert.equal(seq.next(), 6); // 3! = 6
            Test.assert.equal(seq.next(), 24); // 4! = 6
        });

        it("Test Fibonacci generator", function () {
            var seq = generator(fibonacciSeq);
            Test.assert.equal(seq.next(), 1); // fib(0) = 1
            Test.assert.equal(seq.next(), 1); // fib(1) = 1
            Test.assert.equal(seq.next(), 2); // fib(2) = 2
            Test.assert.equal(seq.next(), 3); // fib(3) = 3
            Test.assert.equal(seq.next(), 5); // fib(4) = 5
            Test.assert.equal(seq.next(), 8); // fib(5) = 8
            Test.assert.equal(seq.next(), 13); // fib(6) = 13
        });

        it("Test Range generator", function () {
            var seq = generator(rangeSeq, 5, 3); // 5,8,11,14,17
            Test.assert.equal(seq.next(), 5);
            Test.assert.equal(seq.next(), 8);
            Test.assert.equal(seq.next(), 11);
            Test.assert.equal(seq.next(), 14);
        });

        it("Test Prime Numbers generator", function () {
            var seq = generator(primeSeq);
            Test.assert.equal(seq.next(), 2);
            Test.assert.equal(seq.next(), 3);
            Test.assert.equal(seq.next(), 5);
            Test.assert.equal(seq.next(), 7);
            Test.assert.equal(seq.next(), 11);
            Test.assert.equal(seq.next(), 13);
            Test.assert.equal(seq.next(), 17);
            Test.assert.equal(seq.next(), 19);
        });

        it("Test partial sum generator", function () {
            var seq = generator(partialSumSeq, -1, 4, 2, 5);
            Test.assert.equal(seq.next(), -1);
            Test.assert.equal(seq.next(), 3);
            Test.assert.equal(seq.next(), 5);
            Test.assert.equal(seq.next(), 10); //End of sequence
            // Test.expectError('End of sequence error expected', seq.next);
            Test.assert.throws(seq.next, 'Sequence has ended');
        });
    });
});