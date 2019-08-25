/**
 * Created by Hey on 17 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var LinkedListsPushBuildOneTwoThree = srcDirRequire(__dirname, 'LinkedListsPushBuildOneTwoThree');
var Node = LinkedListsPushBuildOneTwoThree.Node;
var push = LinkedListsPushBuildOneTwoThree.push;
var buildOneTwoThree = LinkedListsPushBuildOneTwoThree.buildOneTwoThree;

//noinspection JSUnresolvedFunction,JSLint
describe('LinkedListsPushBuildOneTwoThree', function () {

    //noinspection JSLint,JSUnresolvedFunction
    describe("tests for inserting a node before another node.", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("", function () {
            Test.assert.equal(push(null, 1).data, 1, "Should be able to create a new linked list with push().");
            Test.assert.equal(push(null, 1).next, null, "Should be able to create a new linked list with push().");
            Test.assert.equal(push(new Node(1), 2).data, 2, "Should be able to prepend a node to an existing node.");
            Test.assert.equal(push(new Node(1), 2).next.data, 1, "Should be able to prepend a node to an existing node.");
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("tests for building a linked list.", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("", function () {
            Test.assert.equal(buildOneTwoThree().data, 1, "First node should should have 1 as data.");
            Test.assert.equal(buildOneTwoThree().next.data, 2, "First node should should have 1 as data.");
            Test.assert.equal(buildOneTwoThree().next.next.data, 3, "Second node should should have 2 as data.");
            Test.assert.equal(buildOneTwoThree().next.next.next, null, "Third node should should have 3 as data.");
        });
    });
});