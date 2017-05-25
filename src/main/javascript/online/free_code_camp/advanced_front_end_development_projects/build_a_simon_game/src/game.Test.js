/**
 * Created by Hey on 25 Apr 2017
 */

import chai from "chai";
import format from "string-format";

import sinon from "sinon";
import sinonTest from "sinon-test";
import Game from "./game";
import STATUS_ENUM from "./StatusesEnum";
import COLOUR_ENUM from "./ColoursEnum";
import scoreFormatter from "./scoreFormatter";
import StatusManager from "./statusManager";
import ColourSequenceManager from "./colourSequenceManager";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

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
                [
                    {
                        "action": "restart",
                        "expectedTargetStatusName": "isStarting",
                    },
                    {
                        "action": "started",
                        "expectedTargetStatusName": "isDemoing",
                    },
                    {
                        "action": "demoed",
                        "expectedTargetStatusName": "isPlaying",
                    },
                    {
                        "action": "won",
                        "expectedTargetStatusName": "isVictory",
                    }
                ].forEach((testCase) => {
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

                Object.keys(STATUS_ENUM).forEach((testStatus) => {
                    it(format("should get true from status().{}() if the status is same from statusManager.getStatus()", testStatus), sinon.test(function () {
                        //    Given
                        stubStatus.call(this, STATUS_ENUM[testStatus]);

                        //    When
                        let game = new Game();

                        //    Then
                        chai.expect(game.status()[testStatus]()).to.be.true;
                    }));

                    it(format("should get false from status().{}() if the status is different from statusManager.getStatus()", testStatus), sinon.test(function () {
                        //    Given
                        const someOtherStatus = (testStatus === "isIdle") ? (STATUS_ENUM.isStarting) : (STATUS_ENUM.isIdle);
                        stubStatus.call(this, someOtherStatus);

                        //    When
                        let game = new Game();

                        //    Then
                        chai.expect(game.status()[testStatus]()).to.be.false;
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
                }));
            });

            describe("strict mode", function () {
                it("should get false for isStrictMode when initialize", function () {
                    //    Given
                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.isStrictMode()).to.be.false;
                });

                it("should get true for isStrictMode after toggleStrict once", function () {
                    //    Given
                    //    When
                    let game = new Game();
                    game.toggleStrict();

                    //    Then
                    chai.expect(game.isStrictMode()).to.be.true;
                });

                it("should get false for isStrictMode after toggleStrict twice", function () {
                    //    Given
                    //    When
                    let game = new Game();
                    game.toggleStrict();
                    game.toggleStrict();

                    //    Then
                    chai.expect(game.isStrictMode()).to.be.false;
                });
            });

            describe("colour buttons", function () {
                function stubColourSequenceManager_check(mockResultObject, enumColour) {
                    let stub = this.stub(ColourSequenceManager.prototype, "check");
                    if (typeof enumColour !== "undefined") {
                        stub = stub.withArgs(COLOUR_ENUM[enumColour])
                    }
                    stub.returns(mockResultObject);
                }

                [
                    {
                        "buttonsColour": "red",
                        "coloursEnumColour": "RED"
                    },
                    {
                        "buttonsColour": "green",
                        "coloursEnumColour": "GREEN"
                    },
                    {
                        "buttonsColour": "blue",
                        "coloursEnumColour": "BLUE"
                    },
                    {
                        "buttonsColour": "yellow",
                        "coloursEnumColour": "YELLOW"
                    }
                ].forEach((testcase) => {
                    [
                        true,
                        false
                    ].forEach((mockIsInputCorrect) => {
                        it(format("should expose buttons.{}() and return returnValue(={}) from colourSequenceManager.check(COLOUR_ENUM.{})", testcase.buttonsColour, mockIsInputCorrect, testcase.coloursEnumColour), sinon.test(function () {
                            //    Given
                            stubColourSequenceManager_check.call(this, {
                                "isInputCorrect": mockIsInputCorrect
                            }, testcase.coloursEnumColour);

                            //    When
                            let game = new Game();
                            let actualCheckResult = game.buttons()[testcase.buttonsColour]();

                            //    Then
                            chai.expect(actualCheckResult.isInputCorrect).to.equal(mockIsInputCorrect);
                        }));
                    });
                });

                it("should, when buttons()[aColour](), handle the isInputCorrect=true and isSequenceCompleteed=false response from check()", sinon.test(function () {
                    //    Given
                    stubColourSequenceManager_check.call(this, {
                        "isInputCorrect": true,
                        "isSequenceCompleteed": false
                    });
                    const aColour = "red";
                    const spyStatusManager_setStatus = this.spy(StatusManager.prototype, "setStatus");

                    //    When
                    let game = new Game();
                    let actualCheckResult = game.buttons()[aColour]();

                    //    Then
                    chai.expect(actualCheckResult.isInputCorrect).to.be.true;
                    chai.expect(actualCheckResult.isSequenceCompleteed).to.be.false;
                    chai.expect(spyStatusManager_setStatus.notCalled).to.be.true;
                }));
            });

            function stubStatus(status) {
                this.stub(StatusManager.prototype, "getStatus").returns(status);
            }

        });
    });
});