import {expect} from "chai";
import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import jsdom from 'jsdom';
import SystemJS from 'systemjs';
SystemJS.config({
    map: {
        'plugin-babel': require.resolve('../node_modules/systemjs-plugin-babel/plugin-babel.js'),
        'systemjs-babel-build': require.resolve('../node_modules/systemjs-plugin-babel/systemjs-babel-node.js'),
    },
    transpiler: 'plugin-babel'
});

import a_valid_response_obj from '../test/resources/TwitchTV_a_stream_example.json';

describe("TwitchTV - FreeCodeCamp - logic test", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("TwitchTV (logic part)", function () {

            describe('getJsonFromTwitchTV', function () {
                it('should, with request for 1 valid streamer id, get response from TwitchTV API', sinon.test(function (done) {
                    let sinonThis = this;
                    jsdom.env({
                        'html': "<html></html>",
                        scripts: [
                            require.resolve("../../../lib/jquery-1.11.3/jquery-1.11.3.min.js")
                        ],
                        'virtualConsole': jsdom.createVirtualConsole().sendTo(console),
                        'done': function (err, window) {
                            //    Given
                            let a_valid_response = [a_valid_response_obj];
                            let $ = window.$;

                            global.$ = $;

                            let $_getJSON = sinonThis.stub($, "getJSON");
                            $_getJSON.yields(a_valid_response);


                            SystemJS.import('./logic.jsx').then(function (logic) {
                                //    When
                                logic.getJsonFromTwitchTV((data) => {
                                    //    Then
                                    done();
                                });
                            })
                                .catch(function (err) {
                                    console.log(err); // wont be called either
                                });

                        }
                    });
                }));
            });
        });
    });
});
