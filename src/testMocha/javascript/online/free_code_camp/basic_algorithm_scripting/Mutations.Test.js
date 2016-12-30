/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var mutation = srcDirRequire(__dirname, 'Mutations');

describe('Mutations', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(mutation(["hello", "hey"])).to.be.false;
        });
    });
    describe('My Tests', function () {
        it("should pass my tests", function () {
            Test.expect(mutation(["Alien", "line"])).to.be.true;
            Test.expect(mutation(["hello", "Hello"])).to.be.true;
        });
    });
});