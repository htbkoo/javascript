;/**
 * Created by Hey on 25 Apr 2017.
 */

import chai from "chai";
import game from "./game";

describe("SimonGame (logic) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (logic)", function () {

            it("should get score as 0 when initialize", function () {
                //    Given

                //    When
                game.initialize();

                //    Then
                chai.expect(game.getScore()).to.equal(0, "Score should be 0 when initialized");
            })
        });
    });
});