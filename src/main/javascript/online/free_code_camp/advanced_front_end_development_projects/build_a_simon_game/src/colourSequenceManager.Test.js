/**
 * Created by Hey on 28 May 2017
 */

import chai from "chai";
import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import COLOUR_ENUM from "./ColoursEnum";
import randomColourGenerator from "./randomColourGenerator";

import ColourSequenceManager from "./colourSequenceManager";

describe("SimonGame (ColourSequenceManager) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (ColourSequenceManager)", function () {
            describe("Initialization", function () {
                it("should get empty list for getSequence when initialized", function () {
                    //    Given
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    const sequence = colourSequenceManager.getSequence();

                    //    Then
                    chai.expect(sequence).to.be.an('array');
                    chai.expect(sequence).to.have.length(0);
                });
            });

            describe("resetSequence", function () {
                it("should get list of 1 random colour for getSequence after resetSequence", sinon.test(function () {
                    //    Given
                    const randomColour = COLOUR_ENUM.RED;
                    this.stub(randomColourGenerator, "getNextColour").callsFake(() => randomColour);
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    colourSequenceManager.resetSequence();
                    const sequence = colourSequenceManager.getSequence();

                    //    Then
                    chai.expect(sequence).to.be.an('array');
                    chai.expect(sequence).to.have.length(1);
                    chai.expect(sequence[0]).to.equal(randomColour);
                }));
            });


        });
    });
});