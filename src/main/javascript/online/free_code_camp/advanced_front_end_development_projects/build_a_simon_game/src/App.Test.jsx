import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';

import App, {Dashboard, ButtonsPanel} from './App';

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
                    [
                        <Dashboard/>,
                        <ButtonsPanel/>
                    ].forEach((component) => {
                        chai.expect(wrapperApp.contains(component)).to.be.true;
                    });

                    // chai.expect(wrapperApp.contains(<ButtonsPanel/>)).to.be.true;
                });
            });

        });
    });
});
