/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var addTogether = srcDirRequire(__dirname, 'ArgumentsOptional');

describe('ArgumentsOptional', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(addTogether(2, 3)).to.equal(5);
        });
    });
    describe('Submission Tests', function () {
        it("should pass submission tests", function () {
            Test.expect(addTogether(2, 3)).to.equal(5);
            Test.expect(addTogether(2)(3)).to.equal(5);
            Test.expect(addTogether("http://bit.ly/IqT6zt")).to.equal(undefined);
            Test.expect(addTogether(2, "3")).to.equal(undefined);
            Test.expect(addTogether(2)([3])).to.equal(undefined);
        });
    });
});