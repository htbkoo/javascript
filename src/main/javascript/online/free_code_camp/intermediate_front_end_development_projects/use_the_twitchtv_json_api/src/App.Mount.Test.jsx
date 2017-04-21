import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {TwitchStreamerTableBody, TwitchStreamerTableBodyItem} from "./App";
import babelRegister from 'babel-register';
import sinon from 'sinon';
import {jsdom} from 'jsdom';
import a_TwtichTV_API_response from "../test/resources/TwitchTV_sample_API_response.json";
import * as logic from "./logic";

import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

babelRegister();

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

describe("TwitchTV - FreeCodeCamp - Mount test", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("TwitchTV (Mount part)", function () {
            describe('<TwitchStreamerTableBody />', function () {
                it('calls componentDidMount', sinon.test(function () {
                    // Given
                    const stubGetJsonFromTwitchTV = this.stub(logic, "getStreamJsonFromTwitchTV");
                    stubGetJsonFromTwitchTV.yields("");
                    sinon.spy(TwitchStreamerTableBody.prototype, 'componentDidMount');

                    // When
                    const wrapper = mount(<TwitchStreamerTableBody />);

                    // Then
                    expect(TwitchStreamerTableBody.prototype.componentDidMount.calledOnce).to.equal(true);
                }));

                it("should, when componentDidMount, call and handle response from logic.getStreamJsonFromTwitchTV by callback", sinon.test(function () {
                    // Given
                    const stubGetJsonFromTwitchTV = this.stub(logic, "getStreamJsonFromTwitchTV");
                    Object.keys(a_TwtichTV_API_response).forEach((key) => {
                        stubGetJsonFromTwitchTV.withArgs(key).yields(a_TwtichTV_API_response[key]);
                    });

                    // When
                    const wrapper = mount(<TwitchStreamerTableBody/>);

                    // Then
                    const itemsUnderWrapper = wrapper.find('tbody').find(TwitchStreamerTableBodyItem);
                    expect(itemsUnderWrapper).to.have.length(4);

                    itemsUnderWrapper.nodes.forEach((node) => {
                        expect(node.props.response).to.deep.equal(a_TwtichTV_API_response[node.props.id]);
                    });
                }));

                it("should render properly even when empty response is returned", sinon.test(function () {
                    // Given
                    const stubGetJsonFromTwitchTV = this.stub(logic, "getStreamJsonFromTwitchTV");
                    stubGetJsonFromTwitchTV.yields("");

                    // When
                    const wrapper = mount(<TwitchStreamerTableBody/>);

                    // Then
                    const itemsUnderWrapper = wrapper.find('tbody').find(TwitchStreamerTableBodyItem);
                    expect(itemsUnderWrapper).to.have.length(0);
                }));
            });
        });
    });
});