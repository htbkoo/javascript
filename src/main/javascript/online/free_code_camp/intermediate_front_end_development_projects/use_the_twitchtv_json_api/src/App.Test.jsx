import format from "string-format";
import {expect} from "chai";

import React from "react";
import {shallow} from "enzyme";

import App, {
    TwitchStreamerTable,
    TwitchStreamerTableHead,
    TwitchStreamerTableBody,
    TwitchStreamerTableBodyItem
} from "./App";

import a_valid_stream_obj from "../test/resources/TwitchTV_a_stream_example.json";
import an_offline_stream_obj from "../test/resources/TwitchTV_an_offline_stream_example.json";
import an_invalid_stream_obj from "../test/resources/TwitchTV_an_invalid_stream_example.json";
import a_valid_channel_obj from "../test/resources/TwitchTV_a_channel_example.json";
import an_invalid_channel_obj from "../test/resources/TwitchTV_an_invalid_channel_example.json";

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
                    expect(theadUnderWrapper.find('th')).to.have.length(1);
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
                    expect(titleDiv.hasClass('twitch-streamer-title')).to.be.true;
                    assertChildrenContent(titleDiv.get(0), "TWITCH STREAMERS");
                });
            });

            describe('<TwitchStreamerTableBodyItem />', function () {
                [
                    {
                        'test_name': "should render normal stream response as a table row, with logo, display_name, status and url",
                        "mock_stream_response": a_valid_stream_obj,
                        "mock_channel_response": a_valid_channel_obj,
                        "row_status": "tr-online",
                        'assertion': {
                            'logo': (cells) => {
                                assertLogo(cells, a_valid_stream_obj.stream.channel.logo, a_valid_stream_obj.stream.channel.name);
                            },
                            'display_name': (cells) => {
                                assertDisplayName(cells, a_valid_stream_obj.stream.channel.url, a_valid_stream_obj.stream.channel.display_name)
                            },
                            'status': (cells) => {
                                assertStatus(cells, a_valid_stream_obj.stream.channel.status);
                            }
                        }
                    },
                    {
                        'test_name': "should render offline response with logo, display_name, url and 'offline' message as status",
                        "mock_stream_response": an_offline_stream_obj,
                        "mock_channel_response": a_valid_channel_obj,
                        "row_status": "tr-offline",
                        'assertion': {
                            'logo': (cells) => {
                                assertLogo(cells, a_valid_channel_obj.logo, a_valid_channel_obj.name);
                            },
                            'display_name': (cells) => {
                                assertDisplayName(cells, a_valid_channel_obj.url, a_valid_channel_obj.display_name)
                            },
                            'status': (cells) => {
                                assertStatus(cells, "Offline");
                            }
                        }
                    },
                    {
                        'test_name': "should render invalid response with logo, display_name, url and 'offline' message as status",
                        "mock_stream_response": an_invalid_stream_obj,
                        "mock_channel_response": an_invalid_channel_obj,
                        "row_status": "tr-offline",
                        "streamer_id": "not-a-valid-account",
                        'assertion': {
                            'logo': (cells) => {
                                assertLogo(cells, "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F", "0x3F");
                            },
                            'display_name': (cells) => {
                                const displayNameDiv = shallow(cells.get(1)).find('div');
                                expect(displayNameDiv).to.have.length(1);
                                assertChildrenContent(displayNameDiv.get(0), "not-a-valid-account");
                            },
                            'status': (cells) => {
                                assertStatus(cells, an_invalid_stream_obj.message);
                            }
                        }
                    },
                    {
                        'test_name': "should render corrupted or missing response with default values",
                        "streamer_id": "not-exist",
                        "mock_stream_response": undefined,
                        "mock_channel_response": undefined,
                        "row_status": "tr-offline",
                        'assertion': {
                            'logo': (cells) => {
                                assertLogo(cells, "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F", "0x3F");
                            },
                            'display_name': (cells) => {
                                const displayNameDiv = shallow(cells.get(1)).find('div');
                                expect(displayNameDiv).to.have.length(1);
                                assertChildrenContent(displayNameDiv.get(0), "not-exist");
                            },
                            'status': (cells) => {
                                assertStatus(cells, "Offline");
                            }
                        }
                    }
                ].forEach((params) => {
                    it(params.test_name, function () {
                        //    Given
                        let wrapper = shallow(<TwitchStreamerTableBodyItem stream={params.mock_stream_response}
                                                                           channel={params.mock_channel_response}
                                                                           id={params.streamer_id}/>);

                        //    When
                        //    Then
                        const row = wrapper.find('tr');
                        expect(row).to.have.length(1);
                        expect(row.get(0).props.className).to.equal(params.row_status);
                        const cells = row.find('td');
                        expect(cells).to.have.length(3);

                        Object.keys(params.assertion).forEach((key) => {
                            params.assertion[key](cells);
                        });
                    });
                });

                let assertLogo = (cells, expectedSrc, expectedUrl) => {
                    const logoImg = shallow(cells.get(0)).find('img');
                    expect(logoImg).to.have.length(1);
                    expect(logoImg.get(0).props.src).to.equal(expectedSrc);
                    expect(logoImg.get(0).props.alt).to.equal(expectedUrl);
                };
                let assertDisplayName = (cells, expectedUrl, expectedText) => {
                    const displayNameDiv = shallow(cells.get(1)).find('div');
                    expect(displayNameDiv).to.have.length(1);
                    const displayNameA = shallow(displayNameDiv.get(0)).find('a');
                    expect(displayNameA).to.have.length(1);
                    expect(displayNameA.get(0).props.href).to.equal(expectedUrl);
                    assertChildrenContent(displayNameA.get(0), expectedText);
                };
                let assertStatus = (cells, expectedStatus) => {
                    const statusDiv = shallow(cells.get(2)).find('div');
                    expect(statusDiv).to.have.length(1);
                    assertChildrenContent(statusDiv.get(0), expectedStatus);
                }
            });

            function assertChildrenContent(element, expectedString) {
                expect(element.props.children).to.equal(expectedString);
            }

        });
    });
});