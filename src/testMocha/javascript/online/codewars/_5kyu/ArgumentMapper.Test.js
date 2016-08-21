/**
 * Created by Hey on 17 Aug 2016
 */

require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var createArgumentMap = srcDirRequire(__dirname, 'ArgumentMapper');

//noinspection JSUnresolvedFunction,JSLint
describe('ArgumentMapper', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Given Tests:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            "use strict";
            // intentional, from given test
            //noinspection JSLint
            var ft1 = createArgumentMap(function () {
            });
            Test.assert.equal(Object.keys(ft1).length, 0, "Should return []");

            // intentional, from given test
            //noinspection JSLint
            var ft2 = createArgumentMap(function (a1) {
            }, 'a1 argvalue');
            Test.assert.equal(Object.keys(ft2).length, 1, "Should have 1 element");
            //noinspection JSLint
            Test.assert.equal(ft2['a1'], 'a1 argvalue', "Should return 'a1 argvalue'");
        });
    });
});