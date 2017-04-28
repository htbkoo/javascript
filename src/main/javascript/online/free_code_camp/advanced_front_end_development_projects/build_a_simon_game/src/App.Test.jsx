import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';

import App, {Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton} from './App';

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

            let containsAllComponents = (wrapper, components) => {
                components.forEach((component) => {
                    chai.expect(wrapper.contains(component)).to.be.true;
                });

            }
        });
    });
});
