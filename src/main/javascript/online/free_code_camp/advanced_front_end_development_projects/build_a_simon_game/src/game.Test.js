/**
 * Created by Hey on 25 Apr 2017
 */

import chai from "chai";
import format from 'string-format';

import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import Game from "./game";
import StatusesEnum from "./StatusesEnum";
import scoreFormatter from "./scoreFormatter";
import StatusManager from "./statusManager";

let testCases = {
    "status": [
        {
            "testName": "'isIdle' before start",
            "expectedTrueStatusName": "isIdle",
            "errorMessage": "Status should be 'idle' before start"
        },
        {
            "testName": "'isStarting' when start",
            "expectedTrueStatusName": "isStarting",
            "errorMessage": "Status should be 'starting' when start"
        },
        {
            "testName": "'isDemoing' when started",
            "expectedTrueStatusName": "isDemoing",
            "errorMessage": "Status should be 'demoing' when started"
        },
        {
            "testName": "'isPlaying' when demoed",
            "expectedTrueStatusName": "isPlaying",
            "errorMessage": "Status should be 'playing' when demoed"
        }
    ]
};

describe("SimonGame (logic) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (logic)", function () {
            describe("initialization", function () {
                it("should get score as 0 when initialize", sinon.test(function () {
                    //    Given
                    stubStatus.call(this, StatusesEnum.isIdle);
                    this.stub(scoreFormatter, "format").withArgs(true, 0).returns('someScore');

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.getFormattedScore()).to.equal('someScore', "isIdle should be true and score should be 0 when not started");
                }));
            });

            describe("status", function () {
                testCases.status.forEach((testCase) => {
                    it(format("should get status as {}", testCase.testName), sinon.test(function () {
                        //    Given
                        stubStatus.call(this, StatusesEnum[testCase.expectedTrueStatusName]);

                        //    When
                        let game = new Game();
                        // testCase.performAction(game);

                        //    Then
                        Object.keys(game.getStatus()).forEach((statusFnName) => {
                            const expectedStatus = (statusFnName === testCase.expectedTrueStatusName);
                            const actualStatus = game.getStatus()[statusFnName]();
                            chai.expect(actualStatus).to.equal(expectedStatus, format("{} - wrong status for <'{}'>", testCase.errorMessage, statusFnName));
                        });
                    }));
                });
            });

            describe("isInputDisabled", function () {
                it("should return true if game.getStatus().isPlaying() return false, i.e. when status is not Playing", sinon.test(function () {
                    //    Given
                    stubStatus.call(this, StatusesEnum.isIdle);

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.getStatus().isPlaying()).to.equal(false, "Status should not be 'playing' before demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(true, "Input should be disabled when is not Playing");
                }));

                it("should return false if game.getStatus().isPlaying() return true, i.e. when status is Playing", sinon.test(function () {
                    //    Given
                    stubStatus.call(this, StatusesEnum.isPlaying);

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.getStatus().isPlaying()).to.equal(true, "Status should be 'playing' when demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(false, "Input should not be disabled when isPlaying");
                }));
            });

            describe("score", function () {
                it("should get formatted score", sinon.test(function () {
                        //    Given
                        const mockScoreFormatter = this.mock(scoreFormatter);
                        stubStatus.call(this, StatusesEnum.isIdle);
                        mockScoreFormatter.expects("format")
                            .withArgs(true, 0)
                            .once()
                            .returns('formatted score');

                        //    When
                        let game = new Game();

                        //    Then
                        chai.expect(game.getFormattedScore()).to.equal('formatted score');
                        mockScoreFormatter.verify();
                    }
                ))
                ;
            });

            function stubStatus(status) {
                this.stub(StatusManager.prototype, "checkStatus").returns(status);
            }

        });
    });
});