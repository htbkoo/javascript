/**
 * Created by Hey on 27 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var pickPeaks = srcDirRequire(__dirname, 'PickPeaks');

describe("PickPeaks", function () {
    "use strict";
    function assertPickPeaks(inputArr, expectedPos, expectedPeaks) {
        Test.assert.deepEqual(pickPeaks(inputArr), {pos: expectedPos, peaks: expectedPeaks});
    }

    describe("given test case", function () {
        it("should assert pickPeaks", function () {
            // Test.assertSimilar(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]),{pos:[3,7],peaks:[6,3]})
            assertPickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3], [3, 7], [6, 3]);
        });
    });

    describe("description test case", function () {
        function assertPickPeaksWithParamObj(param) {
            assertPickPeaks(param.inputArr, param.expectedPos, param.expectedPeaks);
        }

        [
            {
                testName: "should assert pickPeaks with no peaks",
                inputArr: [],
                expectedPos: [],
                expectedPeaks: []
            },
            {
                testName: "should assert pickPeaks with 1 peak",
                inputArr: [0, 1, 2, 5, 1, 0],
                expectedPos: [3],
                expectedPeaks: [5]
            },
            {
                testName: "should assert pickPeaks with plateau-peak",
                inputArr: [1, 2, 2, 2, 1],
                expectedPos: [1],
                expectedPeaks: [2]
            },
            {
                testName: "should assert pickPeaks with plateau but no peaks",
                inputArr: [1, 2, 2, 2, 3],
                expectedPos: [],
                expectedPeaks: []
            }
        ].forEach(function (param) {
            it(param.testName, function () {
                assertPickPeaksWithParamObj(param);
            });
        });


    });

    xdescribe("submission test case", function () {
        it("should assert pickPeaks", function () {

        });
    });
});