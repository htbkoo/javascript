/**
 * Created by Hey on 31 July 2016
 */
/*

 https://www.codewars.com/kata/who-likes-it/train/javascript

 You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

 Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:

 likes [] // must be "no one likes this"
 likes ["Peter"] // must be "Peter likes this"
 likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
 likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
 likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"

 For more than 4 names, the number in and 2 others simply increases.

 * */

module.exports =
    function likes(names) {
        "use strict";
        // DONE
        if (!String.format) {
            //noinspection JSPrimitiveTypeWrapperUsage
            String.format = function (format) {
                var args = Array.prototype.slice.call(arguments, 1);
                //noinspection JSLint
                return format.replace(/{(\d+)}/g, function (match, number) {
                    //noinspection JSLint
                    return typeof args[number] !== 'undefined'
                        ? args[number]
                        : match
                        ;
                });
            };
        }

        var length = names.length;
        var ppl = (function getPpl() {
            switch (length) {
                case 0:
                    return "no one";
                case 1:
                    return names[0];
                case 2:
                    return String.format("{0} and {1}", names[0], names[1]);
                case 3:
                    return String.format("{0}, {1} and {2}", names[0], names[1], names[2]);
                default:
                    // return names[0] + "," + (length - 2) + " others"
                    return String.format("{0}, {1} and {2} others", names[0], names[1], (length - 2));
            }
        }());

        var like = length > 1 ? " like" : " likes";
        return ppl + like + " this";
    };
