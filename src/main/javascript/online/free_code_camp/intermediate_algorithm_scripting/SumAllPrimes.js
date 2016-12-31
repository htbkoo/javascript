/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/sum-all-primes

 Sum all the prime numbers up to and including the provided number.

 A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.

 The provided number may not be a prime.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 For Loops

 Array.prototype.push()

 * */

module.exports = function sumPrimes(num) {
    "use strict";
    var primes = [2, 3];

    function isPrime(x) {
        return !primes.some(function (p) {
            return (((p * p) <= x) && ((x % p) === 0));
        });
    }

    var quickCache = {
        0: 0,
        1: 0,
        2: 2,
        3: 5,
        4: 5,
        5: 10,
        6: 10,
        7: 17,
        8: 17,
        9: 17,
        10: 17,
        11: 28,
        12: 28,
        13: 41
    };

    if (num in quickCache) {
        return quickCache[num];
    }

    // From a hint from Codewars, other than 2,3, all primes must be either 6n+1 or 6n-1
    // and proof: https://primes.utm.edu/notes/faq/six.html

    var n = 1;
    var smaller, larger;
    while ((smaller = (6 * n - 1)) <= num) {
        if (isPrime(smaller)) {
            primes.push(smaller);
        }

        larger = 6 * n + 1;
        if (larger <= num) {
            if (isPrime(larger)) {
                primes.push(larger);
            }
        }
        ++n;
    }

    return primes.reduce(function (a, b) {
        return a + b;
    }, 0);
};