import format from "string-format";
import {expect} from "chai";
import sinon from "sinon";
import sinonTest from "sinon-test";

import React from "react";
import {shallow} from "enzyme";

import App, {
    TwitchStreamerTable,
    TwitchStreamerTableHead,
    TwitchStreamerTableBody,
    TwitchStreamerTableBodyItem
} from "./App";
import * as logic from "./logic";

import a_TwtichTV_API_response from "../test/resources/TwitchTV_sample_API_response.json";
import a_TwitchTV_stream_example from "../test/resources/TwitchTV_a_stream_example.json";

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
            describe('<TwitchStreamerTable/>', function () {
                it("should have table head and table body within <TwitchStreamerTable/>", function () {
                    //    Given
                    const wrapper = shallow(<TwitchStreamerTable/>);

                    //    When
                    //    Then
                    const tableUnderWrapper = wrapper.find('table');
                    expect(tableUnderWrapper).to.have.length(1);
                    expect(tableUnderWrapper.find('TwitchStreamerTableHead')).to.have.length(1);
                    expect(tableUnderWrapper.find('TwitchStreamerTableBody')).to.have.length(1);
                })
            });

            describe('<TwitchStreamerTableBody />', function () {
                function mockLogicMethodToYield(map) {
                    const mockGetJsonFromTwitchTV = this.mock(logic);
                    Object.keys(map).forEach((methodName) => {
                            mockGetJsonFromTwitchTV.expects(methodName).once().yields(map[methodName].data);
                        }
                    );
                    return mockGetJsonFromTwitchTV;
                }

                it("should, onLoad, call and handle response from logic.getJsonFromTwitchTV by callback", sinon.test(function () {
                    // Given
                    const mockGetJsonFromTwitchTV = mockLogicMethodToYield.call(this, {
                        "getJsonFromTwitchTV": {
                            "data": a_TwtichTV_API_response
                        }
                    });
                    const wrapper = shallow(<TwitchStreamerTableBody/>);
                    expect(wrapper.find('tbody')).to.have.length(1);
                    expect(wrapper.find('tbody').find(TwitchStreamerTableBodyItem)).to.have.length(0);

                    // When
                    wrapper.find('tbody').simulate('load');

                    // Then
                    mockGetJsonFromTwitchTV.verify();
                    const itemsUnderWrapper = wrapper.find('tbody').find(TwitchStreamerTableBodyItem);
                    expect(itemsUnderWrapper).to.have.length(4);

                    itemsUnderWrapper.nodes.forEach((node) => {
                        expect(a_TwtichTV_API_response).deep.include(node.props.response);
                    });
                }));
            });
            describe('<TwitchStreamerTableBodyItem />', function () {
                it("should render normal response as a table row, with logo, display_name, status and url", function () {
                    //    Given
                    let wrapper = shallow(<TwitchStreamerTableBodyItem response={a_TwitchTV_stream_example}/>);

                    //    When
                    //    Then
                    const row = wrapper.find('tr');
                    expect(row).to.have.length(1);
                    const cells = row.find('td');
                    expect(cells).to.have.length(3);

                    (function assertLogo() {
                        const logoImg = shallow(cells.get(0)).find('img');
                        expect(logoImg).to.have.length(1);
                        expect(logoImg.get(0).props.src).to.equal(a_TwitchTV_stream_example.stream.logo);
                    })();
                });
            });

        });
    });
});