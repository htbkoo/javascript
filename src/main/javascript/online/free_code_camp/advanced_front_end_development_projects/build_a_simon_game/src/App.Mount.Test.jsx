import React from 'react';
import {mount} from 'enzyme';
import jsdom from 'jsdom';

import sinon from 'sinon';
import sinonTest from 'sinon-test';
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import App from './App';
import Game from './game';

before(function () {
    jsdom.env('', [
        require.resolve("../public/jquery-1.11.3/jquery-1.11.3.min.js"),
        require.resolve("../public/bootstrap-switch-3.3.4/bootstrap-switch-master/js/bootstrap-switch.js")
    ], function (err, window) {
        // global.window = document.defaultView;
        global.window = window;
        global.document = window.document;
        Object.keys(document.defaultView).forEach((property) => {
            if (typeof global[property] === 'undefined') {
                global[property] = document.defaultView[property];
            }
        });

        global.navigator = {
            userAgent: 'node.js'
        };
    });
});


describe("SimonGame (Full render test) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {
            describe("<App/>", function () {
                it('shallow renders App without crashing', sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getStatus").callsFake(() => {
                        return {
                            "isStarted": () => {
                                return false;
                            }
                        }
                    });

                    // When
                    mount(<App/>);

                    // Then
                }));
            });
        });
    });
});
