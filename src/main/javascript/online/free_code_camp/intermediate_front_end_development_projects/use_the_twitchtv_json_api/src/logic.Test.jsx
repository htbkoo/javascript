import format from "string-format";
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
import an_invalid_response_obj from '../test/resources/TwitchTV_an_invalid_stream_example.json';
import an_offline_response_obj from '../test/resources/TwitchTV_an_offline_stream_example.json';

describe("TwitchTV - FreeCodeCamp - logic test", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("TwitchTV (logic part)", function () {

            describe('getJsonFromTwitchTV', function () {
                [
                    {
                        'testName': 'should, with request for 1 valid streamer id, get response from TwitchTV API',
                        'mock_getJSON_response': a_valid_response_obj,
                        'streamer_id': "freecodecamp",
                    },
                    {
                        'testName': 'should, with request for 1 invalid streamer id, get response from TwitchTV API',
                        'mock_getJSON_response': an_invalid_response_obj,
                        'streamer_id': "not-a-valid-account",
                    },
                    {
                        'testName': 'should, with request for 1 offline streamer id, get response from TwitchTV API',
                        'mock_getJSON_response': an_offline_response_obj,
                        'streamer_id': "ogamingsc2",
                    }
                ].forEach((params) => {
                    it(params.testName, sinon.test(function (done) {
                        setupJsdomAndAssertWith((err, window, $) => {
                            //    Given
                            let $_getJSON = this.stub($, "getJSON");
                            $_getJSON.withArgs(sinon.match((actualUrl) => {
                                return [
                                    format("https://wind-bow.gomix.me/twitch-api/streams/{}\?", params.streamer_id),
                                    "callback=?"
                                ].every((expectedPart) => {
                                    return actualUrl.indexOf(expectedPart) !== -1;
                                });
                            })).yields(params.mock_getJSON_response);

                            SystemJS.import('./logic.jsx').then(function (logic) {
                                //    When
                                logic.getJsonFromTwitchTV(params.streamer_id, (data) => {
                                    //    Then
                                    expect(data).to.equal(params.mock_getJSON_response);
                                    done();
                                });
                            }).catch(function (err) {
                                console.log(err); // wont be called either
                            });
                        });
                    }));
                });
            });
        });

        function setupJsdomAndAssertWith(doAssertionPart) {
            jsdom.env({
                'html': "<html></html>",
                scripts: [
                    require.resolve("../../../lib/jquery-1.11.3/jquery-1.11.3.min.js")
                ],
                'virtualConsole': jsdom.createVirtualConsole().sendTo(console),
                'done': (err, window) => {
                    let $ = window.$;
                    global.$ = $;

                    doAssertionPart(err, window, $);
                }
            });
        }
    });
});

