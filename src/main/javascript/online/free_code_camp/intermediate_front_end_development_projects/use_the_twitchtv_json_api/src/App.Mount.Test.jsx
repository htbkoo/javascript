import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {TwitchStreamerTableBody, TwitchStreamerTableBodyItem} from "./App";
import babelRegister from 'babel-register';
import sinon from 'sinon';
import {jsdom} from 'jsdom';
import sinonTest from "sinon-test";
import a_TwtichTV_API_response from "../test/resources/TwitchTV_sample_API_response.json";
import * as logic from "./logic";

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

// documentRef = document;


describe("TwitchTV - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Intermediate Project", function () {
        describe("Mount - TwitchTV", function () {
            describe('<TwitchStreamerTableBody />', function () {
                function mockLogicMethodToYield(map) {
                    const mockGetJsonFromTwitchTV = this.mock(logic);
                    Object.keys(map).forEach((methodName) => {
                            mockGetJsonFromTwitchTV.expects(methodName).once().yields(map[methodName].data);
                        }
                    );
                    return mockGetJsonFromTwitchTV;
                }

                it('calls componentDidMount', () => {
                    sinon.spy(TwitchStreamerTableBody.prototype, 'componentDidMount');
                    const wrapper = mount(<TwitchStreamerTableBody />);
                    expect(TwitchStreamerTableBody.prototype.componentDidMount.calledOnce).to.equal(true);
                });

                it("should, onLoad, call and handle response from logic.getJsonFromTwitchTV by callback", sinon.test(function () {
                    // Given
                    const mockGetJsonFromTwitchTV = mockLogicMethodToYield.call(this, {
                        "getJsonFromTwitchTV": {
                            "data": a_TwtichTV_API_response
                        }
                    });
                    // expect(wrapper.find('tbody')).to.have.length(1);
                    // expect(wrapper.find('tbody').find(TwitchStreamerTableBodyItem)).to.have.length(0);

                    // When
                    const wrapper = mount(<TwitchStreamerTableBody/>);
                    // wrapper.find('tbody').simulate('load');

                    // Then
                    mockGetJsonFromTwitchTV.verify();
                    const itemsUnderWrapper = wrapper.find('tbody').find(TwitchStreamerTableBodyItem);
                    expect(itemsUnderWrapper).to.have.length(2);

                    itemsUnderWrapper.nodes.forEach((node) => {
                        expect(a_TwtichTV_API_response).deep.include(node.props.response);
                    });
                }));

                /*
                 it('allows us to set props', () => {
                 const wrapper = mount(<Foo bar="baz" />);
                 expect(wrapper.props().bar).to.equal("baz");
                 wrapper.setProps({ bar: "foo" });
                 expect(wrapper.props().bar).to.equal("foo");
                 });
                 */
                /*
                 it('simulates click events', () => {
                 const onButtonClick = sinon.spy();
                 const wrapper = mount(
                 <Foo onButtonClick={onButtonClick} />
                 );
                 wrapper.find('button').simulate('click');
                 expect(onButtonClick.calledOnce).to.equal(true);
                 });
                 */
            });
        });
    });
});