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
import STATUS_ENUM from "./StatusesEnum";
import scoreFormatter from "./scoreFormatter";
import StatusManager from "./statusManager";

let testCases = {
    "status": [
        {
            "action": "restart",
            "expectedTargetStatusName": "isStarting",
            "errorMessage": "Status should be set to 'isStarting' after restart"
        },
        {
            "action": "started",
            "expectedTargetStatusName": "isDemoing",
            "errorMessage": "Status should be set to 'demoing' when started"
        },
        {
            "action": "demoed",
            "expectedTargetStatusName": "isPlaying",
            "errorMessage": "Status should be set to 'playing' when demoed"
        },
        {
            "action": "won",
            "expectedTargetStatusName": "isVictory",
            "errorMessage": "Status should be set to 'victory' when won"
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
                    stubStatus.call(this, STATUS_ENUM.isIdle);
                    this.stub(scoreFormatter, "format").withArgs(true, 0).returns('someScore');

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.getFormattedScore()).to.equal('someScore', "isIdle should be true and score should be 0 when not started");
                }));
            });

            describe("status", function () {
                testCases.status.forEach((testCase) => {
                    it(format("should set status as {} when notifyStatus().{}()", testCase.expectedTargetStatusName, testCase.action), sinon.test(function () {
                        //    Given
                        const mockStatusManager = this.mock(StatusManager.prototype);
                        mockStatusManager.expects("setStatus").withArgs(STATUS_ENUM[testCase.expectedTargetStatusName]);

                        //    When
                        let game = new Game();
                        game.notifyStatus()[testCase.action]();

                        //    Then
                        mockStatusManager.verify();
                    }));
                });
            });

            describe("isInputDisabled", function () {
                it("should return true if game.status().isPlaying() return false, i.e. when status is not Playing", sinon.test(function () {
                    //    Given
                    stubStatus.call(this, STATUS_ENUM.isIdle);

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.status().isPlaying()).to.equal(false, "Status should not be 'playing' before demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(true, "Input should be disabled when is not Playing");
                }));

                it("should return false if game.status().isPlaying() return true, i.e. when status is Playing", sinon.test(function () {
                    //    Given
                    stubStatus.call(this, STATUS_ENUM.isPlaying);

                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.status().isPlaying()).to.equal(true, "Status should be 'playing' when demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(false, "Input should not be disabled when isPlaying");
                }));
            });

            describe("score", function () {
                it("should get formatted score", sinon.test(function () {
                        //    Given
                        const mockScoreFormatter = this.mock(scoreFormatter);
                        stubStatus.call(this, STATUS_ENUM.isIdle);
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
                this.stub(StatusManager.prototype, "getStatus").returns(status);
            }

        });
    });
});