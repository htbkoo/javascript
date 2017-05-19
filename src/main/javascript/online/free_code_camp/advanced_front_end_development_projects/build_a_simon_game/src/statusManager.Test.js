/**
 * Created by Hey on 15 May 2017
 */

import chai from "chai";

import StatusManager from "./statusManager";
import STATUS_ENUM from "./StatusesEnum";

let isIdle = STATUS_ENUM.isIdle,
    isStarting = STATUS_ENUM.isStarting,
    isDemoing = STATUS_ENUM.isDemoing,
    isPlaying = STATUS_ENUM.isPlaying;

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
                    assertStatusChange(statusManager).from(isIdle);
                });
            });

            describe("setStatus(isIdle)", function () {
                it("should return false when setStatus(isIdle)", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    assertStatusChange(statusManager).from(isIdle)
                        .after(() => {
                            chai.expect(statusManager.setStatus(isIdle)).to.equal(false);
                        })
                        .to(isIdle);
                });
            });

            describe("setStatus(isStarting)", function () {
                it("should return true by setStatus(isStarting) when status isIdle", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    assertStatusChange(statusManager).from(isIdle)
                        .after(() => {
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                        })
                        .to(isStarting);
                });
            });

            function assertStatusChange(statusManager) {
                let assertStatus = (status) => {
                    chai.expect(statusManager.getStatus()).to.equal(status);
                };
                return {
                    from(fromStatus){
                        assertStatus(fromStatus);
                        return {
                            after(action){
                                action();
                                return {
                                    to(toStatus){
                                        assertStatus(toStatus);
                                        return {
                                            then(){
                                                return assertStatusChange(statusManager);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    });
});