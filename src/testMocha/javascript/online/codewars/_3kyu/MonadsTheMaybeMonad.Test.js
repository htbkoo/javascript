/**
 * Created by Hey on 27 Dec 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var MonadsTheMaybeMonad = srcDirRequire(__dirname, 'MonadsTheMaybeMonad');
var Maybe = MonadsTheMaybeMonad.Maybe;
var Just = MonadsTheMaybeMonad.Just;
var Nothing = MonadsTheMaybeMonad.Nothing;

// DONE: Replace examples and use TDD development by writing your own tests

// These are some CW specific test methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// NodeJS assert is also automatically required for you.
//    assert(true)
//    assert.strictEqual({a: 1}, {a: 1})
//    assert.deepEqual({a: [{b: 1}]}, {a: [{b: 1}]})

// You can also use Chai (http://chaijs.com/) by requiring it yourself
// var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();

// describe("Solution", function(){
//     it("should test for something", function(){
//         Test.assertEquals("actual", "expected", "This is just an example of how you can write your own TDD tests");
//     });
// });

describe("MonadsTheMaybeMonad", function () {
    "use strict";
    function assertJust(mDupAbc, just) {
        Test.expect(mDupAbc instanceof Just).to.be.true;
        Test.expect(mDupAbc.just).to.equal(just);
    }

    describe("Solution", function () {
        describe("Description tests", function () {
            it("should support do function", function () {
                var f = function (x) {
                    return new Just(x + 1);
                }, g = function (x) {
                    return new Just(2 * x);
                }, h = function (x) {
                    return new Just(x - 10);
                };

                var m = Maybe.unit(5);

                var bf = Maybe.bind(f);
                var bg = Maybe.bind(g);
                var bh = Maybe.bind(h);

                assertJust(Maybe.do(m, f, g, h), bh(bg(bf(m))).just);
            });
            it("(@unit function) should return a Maybe subclass instance which wraps the value x", function () {
                var x = "abc";
                Test.expect(Maybe.unit(x) instanceof Maybe).to.be.true;
            });
            it("(@bind function) should take function and return function according to specification", function () {
                function mDup(str) {
                    return new Just(str + str);
                }

                var mDupAbc = mDup("abc");           // => new Just("abcabc")
                assertJust(mDupAbc, "abcabc");

                var bmDup = Maybe.bind(mDup);
                var bmDupNothing = bmDup(new Nothing());   // => new Nothing
                Test.expect(bmDupNothing instanceof Nothing).to.be.true;

                var bmDupJustAbc = bmDup(new Just("abc")); // => new Just("abcabc")            });
                assertJust(bmDupJustAbc, "abcabc");
            });
            it("(@lift function)", function () {
                function nonnegative(x) {
                    if (isNaN(x) || 0 <= x) {
                        return x;
                    } else {
                        throw "Argument " + x + " must be non-negative";
                    }
                }

                var mNonnegative = Maybe.lift(nonnegative);
                assertJust(mNonnegative(2), 2);           // => new Just 2
                Test.expect(mNonnegative(-1) instanceof Nothing).to.be.true;          // => new Nothing
                assertJust(mNonnegative(undefined), undefined);   // => new Just undefined
            });
            it("(@do function)", function () {
                var mDup = Maybe.lift(function (s) {
                    return s + s;
                });
                var mTrim = Maybe.lift(function (s) {
                    return s.replace(/\s+$/, '');
                });

                assertJust(Maybe.do(Maybe.unit("abc "), mDup, mTrim, mDup), "abc abcabc abc");   // => new Just "abc abcabc abc"            });
            });
        });

        describe("Submission tests", function () {
            describe("Simple Maybe Monad Tests", function () {
                // describe("Bound functions evaluated on Nothing", function () {
                // });
                describe("Bound functions evaluated on Something", function () {
                    it("bound function should raise an error if input is not a Maybe subclass instance", function () {
                        function valueFunction(str) {
                            return str + str;
                        }

                        Test.expect(function () {
                            Maybe.bind(valueFunction)("anyString");
                        }).to.throws();
                    });
                });
                // describe("Do", function () {
                // });
                // describe("Monad laws", function () {
                // });
            });
        });
    });
});