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
                    chai.expect(game.getScore()).to.equal(0, "Score should be 0 when initialized");
                });
            });

            describe("status", function () {
                it("should get status as 'STARTING' when start", function () {
                    //    Given
                    let game = new Game();

                    //    When
                    game.restart();

                    //    Then
                    chai.expect(game.getScore()).to.equal(0, "Score should be 0 when initialized");
                    chai.expect(game.getStatus().isStarting()).to.equal(true, "Status should be 'starting' when start");
                });
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
                    "testName": "should format 0 score (from game.getScore) as '01'",
                    "isStarted": true,
                    "score": 0,
                    "expectedScore": "01"
                },
                {
                    "testName": "should format 1 score (from game.getScore) as '02'",
                    "isStarted": true,
                    "score": 1,
                    "expectedScore": "02"
                },
                {
                    "testName": "should format 9 score (from game.getScore) as '10'",
                    "isStarted": true,
                    "score": 9,
                    "expectedScore": "10"
                },
                {
                    "testName": "should format 19 score (from game.getScore) as '20'",
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