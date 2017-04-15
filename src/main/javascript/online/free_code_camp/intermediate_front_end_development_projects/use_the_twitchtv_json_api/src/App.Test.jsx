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
            describe('<TwitchStreamerTableHead/>', function () {
                it("should have <thead/> within <TwitchStreamerTableHead/>", function () {
                    //    Given
                    const wrapper = shallow(<TwitchStreamerTableHead/>);

                    //    When
                    //    Then
                    const tableUnderWrapper = wrapper.find('thead');
                    expect(tableUnderWrapper).to.have.length(1);
                    expect(tableUnderWrapper.find('tr')).to.have.length(1);
                    expect(tableUnderWrapper.find('th')).to.have.length(2);
                })
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
                        expect(logoImg.get(0).props.alt).to.equal(a_TwitchTV_stream_example.stream.name);
                    })();

                    (function assertDisplayName() {
                        const displayNameDiv = shallow(cells.get(1)).find('div');
                        expect(displayNameDiv).to.have.length(1);
                        expect(displayNameDiv.get(0).props.children).to.equal(a_TwitchTV_stream_example.stream.display_name);
                    })();

                    (function assertStatus() {
                        const statusDiv = shallow(cells.get(2)).find('div');
                        expect(statusDiv).to.have.length(1);
                        expect(statusDiv.get(0).props.children).to.equal(a_TwitchTV_stream_example.stream.status);
                    })();
                });
            });

        });
    });
});