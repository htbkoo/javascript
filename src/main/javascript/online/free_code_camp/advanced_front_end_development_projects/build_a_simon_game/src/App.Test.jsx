import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';

import sinon from 'sinon';
import sinonTest from 'sinon-test';
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import App, {Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton} from './App';
import Game from './game';

describe("SimonGame - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {
            describe("<App/>", function () {
                it("should contain <Dashboard/> and <ButtonsPanel/>", function () {
                    // Given
                    const wrapperApp = shallow(<App/>);

                    // When
                    // Then
                    containsAllComponents(wrapperApp,
                        [
                            <Dashboard/>,
                            <ButtonsPanel/>
                        ]
                    );
                });
            });

            describe("<Dashboard/>", function () {
                it("should contain <Title/>, <Score/>, <StrictSwitch/>, <StartButton/>", function () {
                    //    Given
                    const wrapperDashboard = shallow(<Dashboard/>);

                    //    When
                    //    Then
                    containsAllComponents(wrapperDashboard,
                        [
                            <Title/>,
                            <Score/>,
                            <StrictSwitch/>,
                            <StartButton/>
                        ]
                    );
                });
            });

            describe("<Title/>", function () {
                it("should contain <div>{title}</div>", function () {
                    //    Given
                    const wrapperTitle = shallow(<Title/>);

                    //    When
                    const divTitle = wrapperTitle.find("div").get(0);

                    //    Then
                    chai.expect(divTitle.props.children).to.equal("Simon® Game")
                });
            });

            describe("<Score/>", function () {
                [
                    {
                        "testName": "should show step as '--' if game is not started yet",
                        "isStarted": false,
                        "expectedScore": "--"
                    },
                    {
                        "testName": "should show 0 score (from game.getScore) as step '01'",
                        "isStarted": true,
                        "score": 0,
                        "expectedScore": "01"
                    },
                    {
                        "testName": "should show 1 score (from game.getScore) as step '02'",
                        "isStarted": true,
                        "score": 1,
                        "expectedScore": "02"
                    },
                    {
                        "testName": "should show 9 score (from game.getScore) as step '10'",
                        "isStarted": true,
                        "score": 9,
                        "expectedScore": "10"
                    },
                    {
                        "testName": "should show 19 score (from game.getScore) as step '20'",
                        "isStarted": true,
                        "score": 19,
                        "expectedScore": "20"
                    }
                ].forEach((testcase) => {
                    it(testcase.testName, sinon.test(function () {
                        //    Given
                        // stubGame
                        (function () {
                            [
                                {
                                    "method": "getStatus",
                                    "fn": () => {
                                        return {
                                            'isStarted': () => {
                                                return testcase.isStarted;
                                            }
                                        };
                                    }
                                },
                                {
                                    "method": "getScore",
                                    "fn": () => {
                                        return testcase.score;
                                    }
                                }
                            ].forEach((params) => {
                                this.stub(Game.prototype, params.method)
                                    .callsFake(params.fn);
                            });
                        }).call(this);

                        //    When
                        const wrapperScore = shallow(<Score/>);
                        const divScore = wrapperScore.find("div").get(0);


                        //    Then
                        chai.expect(divScore.props.children).to.equal(testcase.expectedScore)
                    }));
                });
            });

            describe("<StrictSwitch/>", function () {
                it("should have a checkbox (unselected by default)", function () {
                    //    Given
                    //    When
                    const wrapperStrictSwitch = shallow(<StrictSwitch/>);
                    const inputCheckbox = wrapperStrictSwitch.find("input").get(0);

                    //    Then
                    chai.expect("checked" in inputCheckbox.props).to.be.false;
                    chai.expect(inputCheckbox.props.type).to.equal("checkbox");
                });

                it("should call game.toggleStrict() when clicked checkbox", sinon.test(function () {
                    //    Given
                    const wrapperStrictSwitch = shallow(<StrictSwitch/>);
                    const inputCheckbox = shallow(wrapperStrictSwitch.find("input").get(0));
                    const mockGame = this.mock(Game.prototype);
                    mockGame.expects("toggleStrict").once().returns("");

                    //    When
                    inputCheckbox.simulate('click');

                    //    Then
                    mockGame.verify();
                }));
            });

            describe("<StartButton/>", function () {
            });

            // TODO: to improve error message when failed comparison
            let containsAllComponents = (wrapper, components) => {
                components.forEach((component) => {
                    chai.expect(wrapper.contains(component)).to.be.true;
                });

            }
        });
    });
});
