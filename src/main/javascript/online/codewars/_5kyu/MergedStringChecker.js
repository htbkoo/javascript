/**
 * Created by Hey on 28 Dec 2016
 */

/*

 https://www.codewars.com/kata/merged-string-checker/train/javascript

 At a job interview, you are challenged to write an algorithm to check if a given string, s, can be formed from two other strings, part1 and part2.

 The restriction is that the characters in part1 and part2 are in the same order as in s.

 The interviewer gives you the following example and tells you to figure out the rest from the given test cases.

 For example:

 'codewars' is a merge from 'cdw' and 'oears':

 s:  c o d e w a r s   = codewars
 part1:  c   d   w         = cdw
 part2:    o   e   a r s   = oears

 * */

module.exports = function isMerge(s, part1, part2) {
    "use strict";
    var i1 = 0, i2 = 0, buffer = [];
    return (s.split("").every(function (c) {
            var cP1 = part1[i1], cP2 = part2[i2];
            if (buffer.length > 0) {
                //return c === buffer.shift();
                if (c === buffer[0]) {
                    buffer.shift();
                    return true;
                }
            }
            if (c === cP1) {
                if (cP1 === cP2) {
                    buffer.push(cP1);
                    ++i1;
                    ++i2;
                    return true;
                } else {
                    ++i1;
                    return true;
                }
            } else if (c === cP2) {
                ++i2;
                return true;
            }
            return false;
        })) && (i1 === part1.length ) && (i2 === part2.length ) && (buffer.length === 0);
};