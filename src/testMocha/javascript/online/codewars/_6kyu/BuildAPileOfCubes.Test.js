/**
 * Created by Hey on 31 July 2016
 */
require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var findNb = srcDirRequire(__dirname, 'BuildAPileOfCubes');

//noinspection JSUnresolvedFunction,JSLint
describe("BuildAPileOfCubes", function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe('Basic tests', function () {
        //noinspection JSLint,JSUnresolvedFunction
        it('should findNb()', function () {
            Test.equal(findNb(4183059834009), 2022);
            Test.equal(findNb(24723578342962), -1);
            Test.equal(findNb(135440716410000), 4824);
            Test.equal(findNb(40539911473216), 3568);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe('Own tests', function () {
        //noinspection JSLint,JSUnresolvedFunction
        it('should findNb()', function () {
            Test.equal(findNb(1), 1);
            Test.equal(findNb(24723578342962), -1);
            Test.equal(findNb(9), 2);
            Test.equal(findNb(36), 3);
        });
    });
});