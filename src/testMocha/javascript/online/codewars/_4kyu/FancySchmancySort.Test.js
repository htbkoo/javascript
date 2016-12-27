/**
 * Created by Hey on 25 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var sortByPath = srcDirRequire(__dirname, 'FancySchmancySort');

describe("FancySchmancySort", function () {
    "use strict";

    // From Stack Overflow: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // http://stackoverflow.com/a/2450976
    function shuffle(param_array) {
        var array = param_array.slice();
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    describe("given test case", function () {
        var arr = [
            {a: {b: [0, 1]}},
            {a: {b: [0, 2]}},
            {a: {b: [0, 3]}}
        ];

        it("should assert sortByPath", function () {
            // Test.assert.Similar(sortByPath(Test.randomize(arr), 'a.b[1]'), arr);
            Test.assert.deepEqual(sortByPath(shuffle(arr), 'a.b[1]'), arr);
        });
    });

    describe("description test case", function () {
        var arr = [
            {
                foo: {
                    bar: function (a, b) {
                        return {
                            baz: function (c) {
                                return {qux: [0, 1 + a + b + c]};
                            }
                        };
                    }
                }
            }, {
                foo: {
                    bar: function (a, b) {
                        return {
                            baz: function (c) {
                                return {qux: [0, 2 + a + b + c]};
                            }
                        };
                    }
                }
            }, {
                foo: {
                    bar: function (a, b) {
                        return {
                            baz: function (c) {
                                return {qux: [0, 3 + a + b + c]};
                            }
                        };
                    }
                }
            }, {
                foo: {
                    bar: function (a, b) {
                        return {
                            baz: function (c) {
                                return {qux: [0, 4 + a + b + c]};
                            }
                        };
                    }
                }
            }, {
                foo: {
                    bar: function (a, b) {
                        return {
                            baz: function (c) {
                                return {qux: [0, 5 + a + b + c]};
                            }
                        };
                    }
                }
            }
        ];

        it("should assert sortByPath", function () {
            Test.assert.deepEqual(sortByPath(arr, 'foo.bar(2).baz(1).qux[1]', 1, 2, 3), arr);
        });
    });

    describe("submission test case", function () {
        it("Should handle custom sorting", function () {
            var arr = [
                "yadf",
                "abc",
                "d"
            ];

            Test.assert.deepEqual(sortByPath(arr, 'length', function (a, b) {
                return b - a;
            }), arr);
        });

        it("Should handle custom sorting 2", function () {
            var arr = [
                "d",
                "abc",
                "yadf"
            ];

            Test.assert.deepEqual(sortByPath(arr, 'length', function (a, b) {
                return a - b;
            }), arr);
        });

        it("Should handle methods in the path", function () {
            var arr = [
                "a",
                "b",
                "c",
                "d",
                "e"
            ];
            Test.assert.deepEqual(sortByPath(arr, 'charCodeAt()'), arr);
        });

        it("Should handle method arguments correctly", function () {
            function getString(a, b, str) {
                return a + b + str;
            }

            var arr = [
                {
                    a: function (a, b) {
                        return getString(a, b, "b");
                    }
                },
                {
                    a: function (a, b) {
                        return getString(a, b, "abc");
                    }
                },
                {
                    a: function (a, b) {
                        return getString(a, b, "baabc");
                    }
                },
                {
                    a: function (a, b) {
                        return getString(a, b, "cca");
                    }
                }
            ];
            Test.assert.deepEqual(sortByPath(arr, 'a(2).indexOf(1)', "1", "2", "a"), arr);
        });

        it("Should handle array subscripts", function () {
            var arr = [
                "a/a",
                "a/b",
                "a/c",
                "a/d",
                "a/e"
            ];
            Test.assert.deepEqual(sortByPath(arr, 'split(1)[1]', "/"), arr);
        });
    });
});