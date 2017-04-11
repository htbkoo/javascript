import format from "string-format";
import {expect} from "chai";
import sinon from "sinon";
import sinonTest from "sinon-test";

import React from "react";
import {shallow} from "enzyme";

import App, {TwitchStreamerTable, TwitchStreamerTableBody} from "./App";
import * as logic from "./logic";

import a_TwtichTV_API_response from "../test/resources/TwitchTV_sample_API_response.json";

sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

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
                it("should, onLoad, call logic.getJsonFromTwitchTV", sinon.test(function () {
                    // Given
                    const mockGetJsonFromTwitchTV = this.mock(logic);
                    mockGetJsonFromTwitchTV.expects("getJsonFromTwitchTV").once().yields();
                    const wrapper = shallow(<TwitchStreamerTableBody/>);
                    expect(wrapper.find('div')).to.have.length(1);

                    // When
                    wrapper.find('div').simulate('load');

                    // Then
                    mockGetJsonFromTwitchTV.verify();
                }));
                it("should, onLoad, call and handle response from logic.getJsonFromTwitchTV by callback", sinon.test(function () {
                    // Given
                    const mockGetJsonFromTwitchTV = this.mock(logic);
                    mockGetJsonFromTwitchTV.expects("getJsonFromTwitchTV").once().yields(a_TwtichTV_API_response);
                    const wrapper = shallow(<TwitchStreamerTableBody/>);
                    expect(wrapper.find('div')).to.have.length(1);
                    expect(wrapper.find('div').find('li')).to.have.length(0);

                    // When
                    wrapper.find('div').simulate('load');

                    // Then
                    mockGetJsonFromTwitchTV.verify();
                    expect(wrapper.find('div').find('li')).to.have.length(5);
                }));
            });
        });
    });
});