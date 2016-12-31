/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/search-and-replace

 Perform a search and replace on the sentence using the arguments provided and return the new sentence.

 First argument is the sentence to perform the search and replace on.

 Second argument is the word that you will be replacing (before).

 Third argument is what you will be replacing the second argument with (after).

 NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Array.prototype.splice()

 String.prototype.replace()

 Array.prototype.join()

 * */

module.exports = function myReplace(str, before, after) {
    "use strict";
    function isUpperCase(c) {
        return (c >= "A") && (c <= "Z");
    }

    function toggleCase(c) {
        return (isUpperCase(c)) ? c.toLowerCase() : c.toUpperCase();
    }

    // Ref: http://stackoverflow.com/questions/7313395/case-insensitive-replace-all
    // From http://stackoverflow.com/a/7313467
    var esc = before.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    // var reg = new RegExp(esc, 'i');

    var match, found = [];
    // var found = str.match(reg, after);
    while ((match = reg.exec(str)) !== null) {
        found.push(match);
    }

    found.forEach(function (match) {
        var casedAfter = after.split("").map(function (c, index) {
            if ((isUpperCase(c)) !== (isUpperCase(str.charAt(match.index + index)))) {
                return toggleCase(c);
            } else {
                return c;
            }
        }).join("");

        str = str.replace(match["0"], casedAfter);

    });

    return str;
};