/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/sum-all-odd-fibonacci-numbers

 Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

 The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

 For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Remainder

 * */

module.exports = function sumFibs(num) {
    "use strict";
    var fib = [1, 1];
    var next;
    while ((next = fib[fib.length - 2] + fib[fib.length - 1]) <= num) {
        fib.push(next);
    }
    return fib.filter(function (n) {
        return (n % 2) !== 0;
    }).reduce(function (prev, curr) {
        return prev + curr;
    }, 0);
};