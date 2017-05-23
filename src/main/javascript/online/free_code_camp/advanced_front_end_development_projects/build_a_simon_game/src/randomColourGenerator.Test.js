/**
 * Created by Hey on 23 May 2017
 */

import chai from "chai";
import format from "string-format";

import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import randomColourGenerator from "./randomColourGenerator";
import COLOUR_ENUM from "./ColoursEnum";

describe("randomColourGenerator", function () {
    "use strict";
    describe("getNextColour", function () {
        let random;

        beforeEach(() => randomColourGenerator.__Rewire__('getNextRandomNumber', () => random));
        afterEach(() => randomColourGenerator.__ResetDependency__('getNextRandomNumber'));
        [
            {"random": 0, "expectedNextColour": "RED"},
            {"random": 1, "expectedNextColour": "GREEN"},
            {"random": 2, "expectedNextColour": "BLUE"},
            {"random": 3, "expectedNextColour": "YELLOW"},
        ].forEach((testCase) => {
            it(format("should, when Math.random() returns {}, get next colour as '{}' from randomColourGenerator.getNextColour()", testCase.random, testCase.expectedNextColour.toString()),
                sinon.test(function () {
                    //Given
                    random = testCase.random;

                    //When
                    const actualNextColour = randomColourGenerator.getNextColour();

                    //Then
                    chai.expect(actualNextColour).to.equal(COLOUR_ENUM[testCase.expectedNextColour]);
                })
            );
        });
    });
});