// Karma configuration
// Generated on Thu Nov 03 2016 23:37:23 GMT+0800 (China Standard Time)
'use strict';
var webpackConfig = require('./webpack.config');
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs', 'chai', 'chai-sinon'],

        // list of files / patterns to load in the browser
        files: [
            // {pattern: 'dev_public/**/[!test]*/*.js', included: false},
            {pattern: 'dev_public/**/*.js', included: false},
            // {pattern: 'test/**/*.Test.js', included: false},

            {pattern: 'node_modules/chai/**/*.js', included: false},

            'test-main.js'
        ],

        // list of files to exclude
        exclude: ['app.js'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            // 'dev_public/**/*.js': ['coverage'],
            'test/**/*.Test.js': ['coverage'],

            // "./dev_public/js/quotes.js": ['webpack'],
            "./dev_public/js/test_unit/quotes.Test.js": ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
