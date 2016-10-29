/**
 * Created by Hey on 28 Oct 2016
 *
 * ---
 *
 * Client side js for quote page
 */

console.log('loaded quotes.js');

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