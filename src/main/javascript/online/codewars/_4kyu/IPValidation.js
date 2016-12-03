/**
 * Created by Hey on 3 Dec 2016
 */

/*

 https://www.codewars.com/kata/ip-validation/train/javascript

 Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. Input to the function is guaranteed to be a single string.

 Examples of valid inputs: 1.2.3.4 123.45.67.89

 Examples of invalid inputs: 1.2.3 1.2.3.4.5 123.456.78.90 123.045.067.089

 * */

module.exports =
    function isValidIP(str) {
        "use strict";
        // regex solution
        // copied from answer
        // return /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}$/.test(str);

        // non full regex solution
        // because the descript is not clear enough
        // var regExp_1_to_255 = /^[1-9]$|^[1-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$/;
        var regExp_0_to_255 = /^[0-9]$|^[1-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$/;
        var split = str.split(".");
        if (split.length!==4){
            return false;
        }
        return split.every(function(number){
            return regExp_0_to_255.test(number);
        });
    };
