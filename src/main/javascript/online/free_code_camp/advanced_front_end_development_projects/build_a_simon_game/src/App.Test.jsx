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
                    chai.expect(wrapperApp.containsAllMatchingElements([
                        <Dashboard/>,
                        <ButtonsPanel/>
                    ])).to.equal(true, "<App/> should contain <Dashboard/> and <ButtonsPanel/>");
                });

                it("should set score and status obtained from game on construction", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getScore").returns(0);
                    this.stub(Game.prototype, "getStatus").returns("initial Status");

                    // When
                    const wrapperApp = shallow(<App/>);

                    // Then
                    chai.expect(wrapperApp.state().score).to.equal(0);
                    chai.expect(wrapperApp.state('status')).to.equal("initial Status");

                }));

                it("should pass onRestartClicked callback to Dashboard which would trigger state reset", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getScore")
                        .onFirstCall().returns(0)
                        .onSecondCall().returns(100);
                    this.stub(Game.prototype, "getStatus")
                        .onFirstCall().returns("initial")
                        .onSecondCall().returns("someStatus");

                    // When
                    const wrapperApp = shallow(<App/>);

                    const wrapperDashboard = wrapperApp.find("Dashboard").get(0);
                    wrapperDashboard.props.onRestartClicked();

                    // Then
                    chai.expect(wrapperApp.state().score).to.equal(100);
                    chai.expect(wrapperApp.state().status).to.equal("someStatus");
                }));
            });

            describe("<Dashboard/>", function () {
                it("should contain <Title/>, <Score/>, <StrictSwitch/>, <StartButton/>", function () {
                    //    Given
                    const wrapperDashboard = shallow(<Dashboard/>);

                    //    When
                    //    Then
                    chai.expect(wrapperDashboard.containsAllMatchingElements([
                        <Title/>,
                        <Score/>,
                        <StrictSwitch/>,
                        <StartButton/>
                    ])).to.equal(true, "<Dashboard/> should contain <Title/>, <Score/>, <StrictSwitch/>, <StartButton/>");
                });

                it("should pass handleRestart callback to onClick at <StartButton/>", function () {
                    //    Given
                    let mockHandleRestartTriggered = false;
                    const mockHandleRestart = () => {
                        mockHandleRestartTriggered = true
                    };

                    const wrapperDashboard = shallow(<Dashboard onRestartClicked={mockHandleRestart}/>);
                    const wrapperStartButton = wrapperDashboard.find("StartButton").get(0);

                    //    When
                    wrapperStartButton.props.onClick();

                    //    Then
                    chai.expect(mockHandleRestartTriggered).to.be.true;
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
                it("should have a button for restarting, i.e. calling game.restart() when clicked and cause state update", sinon.test(function () {
                    //    Given
                    const mockGame = this.mock(Game.prototype);
                    mockGame.expects("restart").once().returns("");

                    let mockClickCallbackTriggered = false;
                    const mockClickCallback = () => {
                        // ensure game.restart() is triggered first
                        mockGame.verify();
                        mockClickCallbackTriggered = true;
                    };

                    const wrapperStartButton = shallow(<StartButton onClick={mockClickCallback}/>);
                    const buttonRestart = shallow(wrapperStartButton.find("button").get(0));

                    //    When
                    buttonRestart.simulate('click');

                    //    Then
                    chai.expect(mockClickCallbackTriggered).to.be.true;
                }));
            });
        });
    });
});
