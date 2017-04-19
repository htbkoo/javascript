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

import a_valid_response_obj from "../test/resources/TwitchTV_a_stream_example.json";

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
                    const theadUnderWrapper = wrapper.find('thead');
                    expect(theadUnderWrapper).to.have.length(1);
                    expect(theadUnderWrapper.find('tr')).to.have.length(1);
                    expect(theadUnderWrapper.find('th')).to.have.length(2);
                });

                it("should show 'Twitch Streamers' within <TwitchStreamerTableHead/>", function () {
                    //    Given
                    const wrapper = shallow(<TwitchStreamerTableHead/>);

                    //    When
                    //    Then
                    const tableUnderWrapper = wrapper.find('thead');
                    const thTitle = shallow(tableUnderWrapper.find('th').get(0));
                    const titleDiv = thTitle.find('div');
                    expect(titleDiv).to.have.length(1);
                    expect(titleDiv.hasClass('twitch-streamer-table')).to.be.true;
                    assertChildrenContent(titleDiv.get(0), "Twitch Streamers");
                });
            });

            describe('<TwitchStreamerTableBodyItem />', function () {
                [{
                    'test_name': "should render normal response as a table row, with logo, display_name, status and url",
                    'mock_response': a_valid_response_obj,
                    'assertion': {
                        'logo': (cells) => {
                            const logoImg = shallow(cells.get(0)).find('img');
                            expect(logoImg).to.have.length(1);
                            expect(logoImg.get(0).props.src).to.equal(a_valid_response_obj.stream.channel.logo);
                            expect(logoImg.get(0).props.alt).to.equal(a_valid_response_obj.stream.channel.name);
                        },
                        'display_name': (cells) => {
                            const displayNameDiv = shallow(cells.get(1)).find('div');
                            expect(displayNameDiv).to.have.length(1);
                            const displayNameA = shallow(displayNameDiv.get(0)).find('a');
                            expect(displayNameA).to.have.length(1);
                            expect(displayNameA.get(0).props.href).to.equal(a_valid_response_obj.stream.channel.url);
                            assertChildrenContent(displayNameA.get(0), a_valid_response_obj.stream.channel.display_name);
                        },
                        'status': (cells) => {
                            const statusDiv = shallow(cells.get(2)).find('div');
                            expect(statusDiv).to.have.length(1);
                            assertChildrenContent(statusDiv.get(0), a_valid_response_obj.stream.channel.status);
                        },
                    }
                },
                    {
                        'test_name': "should render offline response with logo, display_name, url and 'offline' message as status",
                        'mock_response': a_valid_response_obj,
                        'assertion': {}
                    }
                ].forEach((params) => {
                    it(params.test_name, function () {
                        //    Given
                        let wrapper = shallow(<TwitchStreamerTableBodyItem response={params.mock_response}/>);

                        //    When
                        //    Then
                        const row = wrapper.find('tr');
                        expect(row).to.have.length(1);
                        const cells = row.find('td');
                        expect(cells).to.have.length(3);

                        Object.keys(params.assertion).forEach((key) => {
                            params.assertion[key](cells);
                        });
                    });
                });
            });

            function assertChildrenContent(element, expectedString) {
                expect(element.props.children).to.equal(expectedString);
            }

        });
    });
});