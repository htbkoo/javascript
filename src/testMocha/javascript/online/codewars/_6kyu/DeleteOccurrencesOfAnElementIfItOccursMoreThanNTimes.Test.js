/**
 * Created by Hey on 12 Aug 2016
 */
require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var deleteNth = srcDirRequire(__dirname, 'DeleteOccurrencesOfAnElementIfItOccursMoreThanNTimes');

//noinspection JSUnresolvedFunction,JSLint
describe('DeleteOccurrencesOfAnElementIfItOccursMoreThanNTimes', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe('#Initial_Tests', function () {
        //noinspection JSLint,JSUnresolvedFunction
        it('should run Initial_Tests', function () {
            Test.deepEqual(deleteNth([20, 37, 20, 21], 1), [20, 37, 21]);
            Test.deepEqual(deleteNth([1, 1, 3, 3, 7, 2, 2, 2, 2], 3), [1, 1, 3, 3, 7, 2, 2, 2]);
        });
    });
});