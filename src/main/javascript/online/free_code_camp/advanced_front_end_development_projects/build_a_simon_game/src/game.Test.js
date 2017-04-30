;/**
 * Created by Hey on 25 Apr 2017
 */

import chai from "chai";

import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import Game from "./game";

describe("SimonGame (logic) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (logic)", function () {

            it("should get score as 0 when initialize", function () {
                //    Given
                let game = new Game();

                //    When

                //    Then
                chai.expect(game.getScore()).to.equal(0, "Score should be 0 when initialized");
            });

            it("should get status as 'STARTING' when start", function () {
                //    Given
                let game = new Game();

                //    When
                game.restart();

                //    Then
                chai.expect(game.getScore()).to.equal(0, "Score should be 0 when initialized");
                chai.expect(game.getStatus().isStarting()).to.equal(true, "Status should be 'starting' when start");
            })


        });
    });
});