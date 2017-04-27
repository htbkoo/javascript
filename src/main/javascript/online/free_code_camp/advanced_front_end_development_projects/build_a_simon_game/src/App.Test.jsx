import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';

import App, {Dashboard, ButtonsPanel} from './App';

describe("SimonGame - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {

            it('shallow renders App without crashing', () => {
                // Given
                shallow(<App/>);

                // When
                // Then
            });

            it('should, under App, have Dashboard and ButtonsPanel', function () {
                // Given
                const wrapperApp = shallow(<App/>);

                // When
                // Then
                chai.expect(wrapperApp.contains(<Dashboard/>)).to.be.true;
                chai.expect(wrapperApp.contains(<ButtonsPanel/>)).to.be.true;
            });
        });
    });
});
