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
                it("should show step as '--' if game is not started yet", sinon.test(function () {
                    //    Given
                    this.stub(Game.prototype, "getStatus")
                        .callsFake(() => {
                            return {
                                'isStarted': () => {
                                    return false;
                                }
                            };
                        });

                    //    When
                    const wrapperScore = shallow(<Score/>);
                    const divScore = wrapperScore.find("div").get(0);


                    //    Then
                    chai.expect(divScore.props.children).to.equal("--")
                }));

                it("should show 0 score (from game.getScore) as step '01'", sinon.test(function () {
                    //    Given
                    this.stub(Game.prototype, "getStatus")
                        .callsFake(() => {
                            return {
                                'isStarted': ()=>{
                                    return true;
                                }
                            };
                        });

                    this.stub(Game.prototype, "getScore")
                        .callsFake(() => {
                            return 0;
                        });

                    //    When
                    const wrapperScore = shallow(<Score/>);
                    const divScore = wrapperScore.find("div").get(0);

                    //    Then
                    chai.expect(divScore.props.children).to.equal("01")
                }));
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
