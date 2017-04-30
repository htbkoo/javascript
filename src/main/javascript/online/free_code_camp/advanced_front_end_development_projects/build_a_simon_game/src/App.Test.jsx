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
                    }
                ].forEach((testcase) => {
                    it(testcase.testName, sinon.test(function () {
                        //    Given
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

                        //    When
                        const wrapperScore = shallow(<Score/>);
                        const divScore = wrapperScore.find("div").get(0);


                        //    Then
                        chai.expect(divScore.props.children).to.equal(testcase.expectedScore)
                    }));
                });
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
