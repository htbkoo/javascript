import React from 'react';
import {mount} from 'enzyme';
import {jsdom} from 'jsdom';

import App from './App';

before(function () {
    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
            global[property] = document.defaultView[property];
        }
    });

    global.navigator = {
        userAgent: 'node.js'
    };
});


describe("SimonGame (Full render test) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {
            describe("<App/>", function () {
                it('shallow renders App without crashing', () => {
                    // Given
                    mount(<App/>);

                    // When
                    // Then
                });
            });
        });
    });
});
