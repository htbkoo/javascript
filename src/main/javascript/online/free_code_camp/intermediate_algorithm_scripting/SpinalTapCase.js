/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/spinal-tap-case

 Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 RegExp

 String.prototype.replace()

 * */

module.exports = function spinalCase(str) {
    "use strict";
    // Ref: http://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
    // http://stackoverflow.com/a/650037

    // And: http://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
    // http://stackoverflow.com/a/4149393
    return str.replace(/([A-Z])/g, ' $1').toLowerCase().split(/[_\s]+/).filter(function (word) {
        return word !== "";
    }).join("-");
};