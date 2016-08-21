/**
 * Created by Hey on 14 May 2016
 */

/*
 Is Prime

 Define a function isPrime that takes one integer argument and returns true or false depending on if the integer is a prime.

 Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
 Example

 isPrime(5)
 => true

 Assumptions

 You can assume you will be given an integer input.
 You can not assume that the integer will be only positive. You may be given negative numbers.

 Bug!

 The Haskell version uses a wrong test case, where negative primes should also return True, e.g. it expects isPrime (-2) == True. Use abs or similar measures to take care of negative numbers. The test cases cannot get changed at this point. Sorry for the inconvenience.

 * */

function isPrime(num) {
    //TODO
    "use strict";
    if (num <= 1) {
        return false;
    }
    var i;
    for (i = 2; (i * i) <= num; ++i) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}


/*
 Test:

 Test.expect(isPrime(0) === false, '0 is not prime');
 Test.expect(isPrime(1) === false, '1 is not prime');
 Test.expect(isPrime(2) === true, '2 is prime');

 * */