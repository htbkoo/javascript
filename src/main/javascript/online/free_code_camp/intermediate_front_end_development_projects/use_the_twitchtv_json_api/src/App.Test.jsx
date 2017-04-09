import format from "string-format";
import {expect} from "chai";

import React from "react";
import {shallow} from "enzyme";

import App, {TwitchStreamerTable, TwitchStreamerTableBody} from "./App";

describe("TwitchTV - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("TwitchTV", function () {
            describe('<App />', function () {
                describe("Import test", function () {
                    [
                        {
                            "obj": App,
                            "name": "App"
                        },
                        {
                            "obj": TwitchStreamerTable,
                            "name": "TwitchStreamerTable"
                        },
                        {
                            "obj": TwitchStreamerTableBody,
                            "name": "TwitchStreamerTableBody"
                        }
                    ].forEach((params) => {
                        it(format("should have correctly exported {}", params.name), function () {
                            expect(params.obj).to.not.be.undefined;
                        });

                    });
                });

                describe("Basic React Component tests", function () {
                    it("should contain a TwitchStreamerTable under App", function () {
                        expect(shallow(<App />).contains(<TwitchStreamerTable/>)).to.equal(true);
                    });
                    it("should contain a TwitchStreamerTableBody under TwitchStreamerTable", function () {
                        expect(shallow(<TwitchStreamerTable />).contains(<TwitchStreamerTableBody/>)).to.equal(true);
                    });
                });
            });
            describe('<TwitchStreamerTableBody />', function () {
                it("should onload call props.onLoadHandler", function (done) {
                    // Given
                    let mockOnLoadHandler = function () {
                        // Then
                        done();
                    };

                    const wrapper = shallow(<TwitchStreamerTableBody onLoadHandler={mockOnLoadHandler}/>);

                    // When
                    wrapper.find('div').simulate('load')


                });
            });
        });
    });
});