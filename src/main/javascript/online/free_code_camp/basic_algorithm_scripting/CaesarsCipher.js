/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/caesars-cipher

 One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

 A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔  'O' and so on.

 Write a function which takes a ROT13 encoded string as input and returns a decoded string.

 All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 String.prototype.charCodeAt()

 String.fromCharCode()

 * */

module.exports = function rot13(str) { // LBH QVQ VG!
    "use strict";
    // var A = 65;
    var A = "A".charCodeAt(0);
    return str.split("").map(function (c) {
        function isUpperCase() {
            return ((c >= "A") && (c <= "Z"));
        }

        if (isUpperCase()) {
            return String.fromCharCode((c.charCodeAt(0) - A + 13) % 26 + A);
        } else {
            return c;
        }
    }).join("");
};
