/**
 * Created by Hey on 15 May 2017
 */

import chai from "chai";

import StatusManager from "./statusManager";
import STATUS_ENUM from "./StatusesEnum";

describe("SimonGame (StatusManager) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (StatusManager)", function () {
            it("should getStatus as STATUS_ENUM.isIdle when initialized", function () {
                //    Given
                //    When
                let statusManager = new StatusManager();

                //    Then
                chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isIdle);
            });
        });
    });
});