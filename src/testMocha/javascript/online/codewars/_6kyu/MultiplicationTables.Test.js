/**
 * Created by Hey on 13 Aug 2016
 */

require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var multiplicationTable = srcDirRequire(__dirname, 'MultiplicationTables');

//noinspection JSUnresolvedFunction,JSLint
describe('MultiplicationTables', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("should get correct arrays", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.deepEqual(multiplicationTable(2, 2), [[1, 2], [2, 4]]);
            Test.assert.deepEqual(multiplicationTable(3, 3), [[1, 2, 3], [2, 4, 6], [3, 6, 9]]);
            Test.assert.deepEqual(multiplicationTable(3, 4), [[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12]]);
            Test.assert.deepEqual(multiplicationTable(4, 4), [[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12], [4, 8, 12, 16]]);
            Test.assert.deepEqual(multiplicationTable(2, 5), [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]);
        });
    });
});