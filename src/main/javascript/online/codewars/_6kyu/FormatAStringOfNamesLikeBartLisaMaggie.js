/**
 * Created by Hey on 31 July 2016
 */
/*

 https://www.codewars.com/kata/format-a-string-of-names-like-bart-lisa-and-maggie/train/javascript

 Given: an array containing hashes of names

 Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

 Example:

 list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
 // returns 'Bart, Lisa & Maggie'

 list([ {name: 'Bart'}, {name: 'Lisa'} ])
 // returns 'Bart & Lisa'

 list([ {name: 'Bart'} ])
 // returns 'Bart'

 list([])
 // returns ''

 Note: all the hashes are pre-validated and will only contain A-Z, a-z, '-' and '.'.

 * */

module.exports =
    function list(names) {
        'use strict';
        //your code here
        function getListByRecursion(ns) {
            if (!(ns === undefined)) {
                var length = ns.length;
                switch (length) {
                    case 0:
                        return '';
                    case 1:
                        return ns[0].name;
                    case 2:
                        return ns[0].name + " & " + ns[1].name;
                    default:
                        return ns.splice(0, 1)[0].name + ", " + getListByRecursion(ns);
                }
            }
        }

        return getListByRecursion(names);
    };