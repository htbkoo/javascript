/**
 * Created by Hey on 15 Aug 2016
 */
/*

 https://www.codewars.com/kata/simplifying-multilinear-polynomials/train/javascript

 When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x" (or usually bigger), and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see!

 Write a function:

 simplify(poly)

 that takes a string in input, representing a multilinear non-constant polynomial in integers coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in the following way ( -> means application of simplify):

 All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:

 "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"

 All monomials appears in order of increasing number of variables, e.g.:

 "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"

 If two monomials have the same number of variables, they appears in lexicographic order, e.g.:

 "a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"

 There is no leading + sign if the first coefficient is positive, e.g.:

 "-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"

 N.B. to keep it simplest, the string in input is restricted to represent only multilinear non-constant polynomials, so you won't find something like `-3+yx^2'. Multilinear means in this context: of degree 1 on each variable.

 Warning: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.

 Good Work :)

 * */

module.exports =
    function simplify(poly) {
        "use strict";
        //your code here
        if (poly === "") {
            return "";
        }

        var polyPlusMinus = poly.replace(/-/gi, "+-");
        var monomials = polyPlusMinus.split(new RegExp("\\+", "g"));
        // var monomials = poly.split(new RegExp("\\+|(-)", "g"));

        var Monomial = function (str) {
            var sign = 1;
            if (str.charAt(0) === "-") {
                sign = -1;
                str = str.substring(1);
            }

            var coefficient = (function getCoefficient() {
                var p = parseInt(str, 10);
                return sign * ((isNaN(p)) ? 1 : p);
            }());
            var variable = (function getVariable() {
                // From http://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr
                // http://stackoverflow.com/a/21420210
                var match = str.match(/[\d]/gi);
                var lastIndex = match === null ? -1 : (str.lastIndexOf(match[match.length - 1]));
                return str.substring(lastIndex + 1).split("").sort();
            }());

            this.getCoefficient = function () {
                return coefficient;
            };

            this.getVariableAsString = function () {
                return variable.join("");
            };

            return this;
        };

        var returnObj = {};

        monomials.filter(function (m) {
            return m !== "";
        }).map(function (m) {
            return new Monomial(m);
        }).forEach(function (m) {
            returnObj[m.getVariableAsString()] = returnObj.hasOwnProperty(m.getVariableAsString()) ? returnObj[m.getVariableAsString()] + m.getCoefficient() : m.getCoefficient();
        });


        var returnString = Object.keys(returnObj).sort(function (a, b) {
            var aLength = a.length;
            var bLength = b.length;

            if (aLength !== bLength) {
                return aLength - bLength;
            }

            return a.localeCompare(b);
        }).map(function (k) {
            var coe = returnObj[k];
            if (coe === 0) {
                return "";
            }
            var coeStr = (function getCoefficientAsString() {
                switch (coe) {
                    case 1:
                        return "+";
                    case -1:
                        return "-";
                    default:
                        return coe < 0 ? coe : ("+" + coe);
                }
            }());
            //noinspection JSLint
            return coeStr + k;
        }).join("");

        return (returnString.charAt(0) === "+") ? returnString.substring(1) : returnString;
    };