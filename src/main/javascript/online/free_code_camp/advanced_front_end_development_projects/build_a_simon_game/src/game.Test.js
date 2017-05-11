;/**
 * Created by Hey on 25 Apr 2017
 */

import chai from "chai";

import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import Game, {scoreFormatter} from "./game";

describe("SimonGame (logic) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (logic)", function () {
            describe("initialization", function () {
                it("should get score as 0 when initialize", function () {
                    //    Given
                    let game = new Game();

                    //    When

                    //    Then
                    chai.expect(game.getFormattedScore()).to.equal('--', "Score should be '--' when not started");
                });
            });

            describe("status", function () {
                it("should get status as 'STARTING' when start", function () {
                    //    Given
                    let game = new Game();

                    //    When
                    game.restart();

                    //    Then
                    chai.expect(game.getStatus().isStarting()).to.equal(true, "Status should be 'starting' when start");
                });
            });

            describe("isInputDisabled", function () {
                it("should return true if game.getStatus().isPlaying() return false, i.e. when status is not Playing", function () {
                    //    Given
                    //    When
                    let game = new Game();

                    //    Then
                    chai.expect(game.getStatus().isPlaying()).to.equal(false, "Status should not be 'playing' before demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(true, "Input should be disabled when is not Playing");
                });

                it("should return false if game.getStatus().isPlaying() return true, i.e. when status is Playing", function () {
                    //    Given
                    //    When
                    let game = new Game();
                    game.restart();
                    game.started();
                    game.demoed();

                    //    Then
                    chai.expect(game.getStatus().isPlaying()).to.equal(true, "Status should be 'playing' when demo is done");
                    chai.expect(game.isInputDisabled()).to.equal(false, "Input should not be disabled when isPlaying");
                });
            });

            describe("score", function () {
                it("should get formatted score", sinon.test(function () {
                        //    Given
                        const mockScoreFormatter = this.mock(scoreFormatter);
                        mockScoreFormatter.expects("format")
                            .withArgs(false, 0)
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
        });

        describe("scoreFormatter", function () {
            [
                {
                    "testName": "should format score as '--' if game is not started yet",
                    "isStarted": false,
                    "expectedScore": "--"
                },
                {
                    "testName": "should format 0 raw score as '01'",
                    "isStarted": true,
                    "score": 0,
                    "expectedScore": "01"
                },
                {
                    "testName": "should format 1 raw score as '02'",
                    "isStarted": true,
                    "score": 1,
                    "expectedScore": "02"
                },
                {
                    "testName": "should format 9 raw score as '10'",
                    "isStarted": true,
                    "score": 9,
                    "expectedScore": "10"
                },
                {
                    "testName": "should format 19 raw score as '20'",
                    "isStarted": true,
                    "score": 19,
                    "expectedScore": "20"
                }
            ].forEach((testcase) => {
                it(testcase.testName, sinon.test(function () {
                    //    Given
                    //    When
                    //    Then
                    chai.expect(scoreFormatter.format(testcase.isStarted, testcase.score)).to.equal(testcase.expectedScore)
                }));
            });
        });
    });
});