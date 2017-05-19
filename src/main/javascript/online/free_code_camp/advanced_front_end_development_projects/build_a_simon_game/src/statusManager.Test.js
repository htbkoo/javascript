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
            describe("Initialization", function () {
                it("should getStatus as STATUS_ENUM.isIdle when initialized", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isIdle);
                });
            });

            describe("setStatus(isIdle)", function () {
                it("should return false when setStatus(isIdle)", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isIdle);
                    chai.expect(statusManager.setStatus(STATUS_ENUM.isIdle)).to.equal(false);
                    chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isIdle);
                });
            });

            describe("setStatus(isStarting)", function () {
                it("should return true by setStatus(isStarting) when status isIdle", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isIdle);
                    chai.expect(statusManager.setStatus(STATUS_ENUM.isStarting)).to.equal(true);
                    chai.expect(statusManager.getStatus()).to.equal(STATUS_ENUM.isStarting);
                });
            });
        });
    });
});