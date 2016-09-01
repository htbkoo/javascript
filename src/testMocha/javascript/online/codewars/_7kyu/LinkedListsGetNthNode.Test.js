/**
 * Created by Hey on 18 Aug 2016
 */
'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var LinkedListsPushBuildOneTwoThree = srcDirRequire(__dirname, 'LinkedListsPushBuildOneTwoThree');
var buildOneTwoThree = LinkedListsPushBuildOneTwoThree.buildOneTwoThree;

//noinspection JSLint
var LinkedListsGetNthNode = srcDirRequire(__dirname, 'LinkedListsGetNthNode');
var getNth = LinkedListsGetNthNode.getNth;

//noinspection JSUnresolvedFunction,JSLint
describe('LinkedListsGetNthNode', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("tests for getting the Nth node in a linked list.", function () {
        var list = buildOneTwoThree();
        //noinspection JSLint,JSUnresolvedFunction
        it("", function () {
            Test.assert.equal(getNth(list, 0).data, 1, "First node should be located at index 0.");
            Test.assert.equal(getNth(list, 1).data, 2, "Second node should be located at index 1.");
            Test.assert.equal(getNth(list, 2).data, 3, "Third node should be located at index 2.");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Invalid index value (3) should throw error.", function () {
            Test.expect(getNth.bind(this, list, 3)).to.throw(Error);
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Invalid index value (100) should throw error.", function () {
            Test.expect(getNth.bind(this, list, 100)).to.throw(Error);
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("Null linked list should throw error.", function () {
            Test.expect(getNth.bind(this, null, 0)).to.throw(Error);
        });
    });
});