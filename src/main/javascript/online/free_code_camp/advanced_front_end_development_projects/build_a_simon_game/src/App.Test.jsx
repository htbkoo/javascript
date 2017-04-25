import React from 'react';
import {shallow} from 'enzyme';

import App from './App';

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
        });
    });
});
