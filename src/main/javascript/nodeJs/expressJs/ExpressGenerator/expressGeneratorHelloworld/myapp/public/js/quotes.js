/**
 * Created by Hey on 28 Oct 2016
 *
 * ---
 *
 * Client side js for quote page
 */

console.log('loaded quotes.js');

if (typeof requirejs === 'undefined'){
    var requirejs = require('requirejs');
}

if (typeof define === 'undefined'){
    var define = require('amdefine');
}

requirejs.config({
    'baseUrl': '/js/lib',
    'shim': {
        'bootstrap': {"deps": ["jquery"]}
    },
    'paths': {}
});

define(['jquery','bootstrap'], function ($, bootstrap) {
    "use strict";

});