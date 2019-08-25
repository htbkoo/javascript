/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var uniteUnique = srcDirRequire(__dirname, 'SortedUnion');

describe('SortedUnion', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])).to.deep.equal([1, 3, 2, 5, 4]);
        });
    });
    describe('Submission Tests', function () {
        it("should pass submission tests", function () {
            Test.expect(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])).to.deep.equal([1, 3, 2, 5, 4]);
            Test.expect(uniteUnique([1, 3, 2], [1, [5]], [2, [4]])).to.deep.equal([1, 3, 2, [5], [4]]);
            Test.expect(uniteUnique([1, 2, 3], [5, 2, 1])).to.deep.equal([1, 2, 3, 5]);
            Test.expect(uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])).to.deep.equal([1, 2, 3, 5, 4, 6, 7, 8]);
        });
    });
});