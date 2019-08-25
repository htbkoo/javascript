/**
 * Created by Hey on 15 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var EmptyList = srcDirRequire(__dirname, 'FunctionalLists');

describe("FunctionalLists", function () {
    "use strict";
    describe("Example list tests", function () {
        var mt, l1, l2, l3, l4;

        before(function () {
            mt = new EmptyList();
            l1 = mt.push('c').push('b').push('a');
            l2 = l1.append(l1);
            l3 = l1.remove('b');
            l4 = l2.remove('b');
        });

        it("Simple checks", function () {
            Test.expect(mt.isEmpty()).to.equal(true, "Empty List is empty");
            Test.expect(!l1.isEmpty()).to.equal(true, "Non-empty list is not empty");
            Test.expect(mt.toString() === "()").to.equal(true, "()");
            Test.expect(l3.toString() === "(a c)").to.equal(true, "(a c)");
            Test.expect(mt.length() === 0).to.equal(true, "Empty list has length zero");
            Test.expect(l1.length() === 3).to.equal(true, "(a b c) length 3");
        });

        it("Shared structure", function () {
            Test.expect(l2.tail().tail().tail() === l1).to.equal(true, "(a b c a b c) shares");
            Test.expect(l2 !== l1).to.equal(true, "(a b c a b c) doesn't share too much");
            Test.expect(l3.tail() === l1.tail().tail()).to.equal(true, "(a b c) remove b shares c");
        });
        describe("Submission test cases", function () {
            it("should test removing 'a' from '(a)' ", function () {
                var list = new EmptyList().push('a');
                var removedA = list.remove('a');
                Test.expect(removedA.isEmpty()).to.equal(true, "list.remove(first) is empty");
                Test.expect(removedA).to.equal(list.tail(), "the empty node should exactly be the tail of the original list");
            });
        });
    });
});