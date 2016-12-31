/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/convert-html-entities

 Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 RegExp

 HTML Entities

 String.prototype.replace()

 * */

module.exports = function convertHTML(str) {
    "use strict";
    // &colon;&rpar;

    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};