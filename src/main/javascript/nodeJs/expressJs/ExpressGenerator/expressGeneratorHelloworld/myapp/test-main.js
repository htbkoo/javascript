var allTestFiles = [];
// var TEST_REGEXP = /(spec|test)\.js$/i
var TEST_REGEXP = /\.(Test)\.js$/i;
var EXCLUDED_REGEXP = /(node_modules\/)/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) { // jshint ignore:line
    'use strict';
    if (!EXCLUDED_REGEXP.test(file)) {
        // console.log(file);
        if (TEST_REGEXP.test(file)) {
            // console.log("matched: " + file);

            // Normalize paths to RequireJS module names.
            // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
            // then do not normalize the paths
            var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');

            // console.log("normalized: " + normalizedTestModule);
            allTestFiles.push(normalizedTestModule);
        }
    }
});

//noinspection SpellCheckingInspection,JSHint
require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        "chai": "node_modules/chai/chai"
    },

    shim: {},

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
