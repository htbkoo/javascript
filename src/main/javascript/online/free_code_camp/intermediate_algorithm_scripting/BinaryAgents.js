/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/binary-agents

 Return an English translated sentence of the passed binary string.

 The binary string will be space separated.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 String.prototype.charCodeAt()

 String.fromCharCode()

 * */

module.exports = function binaryAgent(str) {
    "use strict";
    return str.split(" ").map(function (val) {
        return String.fromCharCode(parseInt(val, 2));
    }).join("");
};