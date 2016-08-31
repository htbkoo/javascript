/**
 * Created by Hey on 18 Aug 2016
 */

require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');


//noinspection JSLint
var LinkedListsPushBuildOneTwoThree = srcDirRequire(__dirname, '../_7kyu/LinkedListsPushBuildOneTwoThree');
var buildOneTwoThree = LinkedListsPushBuildOneTwoThree.buildOneTwoThree;

//noinspection JSLint
var LinkedListsLengthCount = srcDirRequire(__dirname, 'LinkedListsLengthCount');
var Node = LinkedListsLengthCount.Node;
var length = LinkedListsLengthCount.length;
var count = LinkedListsLengthCount.count;

//noinspection JSUnresolvedFunction,JSLint
describe('LinkedListsLengthCount', function () {

    //noinspection JSLint,JSUnresolvedFunction
    describe("tests for counting the length of a linked list.", function () {
        var list = buildOneTwoThree();
        //noinspection JSLint,JSUnresolvedFunction
        it("", function () {
            Test.assert.equal(length(null), 0, "Length of null list should be zero.");
            Test.assert.equal(length(new Node(99)), 1, "Length of single node list should be one.");
            Test.assert.equal(length(list), 3, "Length of the three node list should be three.");
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("tests for building a linked list.", function () {
        var list = buildOneTwoThree();
        //noinspection JSLint,JSUnresolvedFunction
        it("", function () {
            Test.assert.equal(count(list, 1), 1, "list should only contain one 1.");
            Test.assert.equal(count(list, 2), 1, "list should only contain one 2.");
            Test.assert.equal(count(list, 3), 1, "list should only contain one 3.");
            Test.assert.equal(count(list, 99), 0, "list should return zero for integer not found in list.");
            Test.assert.equal(count(null, 1), 0, "null list should always return count of zero.");
        });
    });
});