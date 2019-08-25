/**
 * Created by Hey on 15 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var EmptyBinaryTree = srcDirRequire(__dirname, 'FunctionalBinaryTrees');

describe("FunctionalBinaryTrees", function () {
    "use strict";
    describe("Simple tree operations", function() {
        var mt, t1, t2, t3, _ref;

        // beforeEach(function() {
        before(function() {
            mt = new EmptyBinaryTree();
            t1 = mt.insert('b').insert('a').insert('c');
            t2 = t1.remove('a');
            t3 = t1.remove('z');
        });

        it("Basic tree counting", function() {
            Test.expect(mt.isEmpty()).to.equal(true, "Empty tree isEmpty()");
            Test.expect(!t1.isEmpty()).to.equal(true, "Non-empty tree is not isEmpty()");
            Test.expect(mt.depth() === 0).to.equal(true, "Empty tree has depth zero.");
            Test.expect(t1.depth() === 2).to.equal(true, "Tree [ a, [ b [] [] ] [ c [] [] ] ] depth 2");
            Test.expect(mt.count() === 0).to.equal(true, "Empty tree has zero non-empty nodes");
            Test.expect(t1.count() === 3).to.equal(true, "Tree a, b, c has three nodes");
        });

        it("Simple tests of insert", function() {
            Test.expect(!mt.contains('a')).to.equal(true, "Empty tree does not contain 'a'");
            Test.expect(t1.contains('a')).to.equal(true, "Tree a, b, c contains 'a'");
            Test.expect(t1.contains('b')).to.equal(true, "Tree a, b, c contains 'b'");
            Test.expect(t1.contains('c')).to.equal(true, "Tree a, b, c contains 'c'");
        });

        it("Simple tests of remove", function() {
            Test.expect(!t2.contains('a')).to.equal(true, "Tree a, b, c no longer contains 'a' after remove");
            Test.expect(t2.right === t1.right).to.equal(true, "Tree a, b, c with 'a' removed shares 'c'");
            Test.expect(t3 === t1).to.equal(true, "Removing an absent item leaves tree untouched.");
        });

        it("Traversal", function() {
            var doTraversal = function(tree, traversal) {
                var nodes = [];
                tree[traversal](function(x) { return nodes.push(x); });
                return nodes.join('');
            };

            Test.expect(doTraversal(mt, 'inorder') === '').to.equal(true, "Traverse empty tree");
            Test.expect(doTraversal(t1, 'inorder') === 'abc').to.equal(true, "Traverse inorder");
            Test.expect(doTraversal(t1, 'preorder') === 'bac').to.equal(true, "Traverse preorder");
            Test.assert.equal(doTraversal(t1, 'postorder'), 'acb', "Traverse postorder");
        });
    });
});