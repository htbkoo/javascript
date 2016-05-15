/**
 * Created by Hey on 15 May 2016
 */

/*
 Task

 Your task is to write a function for calculating the score of a 10 pin bowling game. The input for the function is a list of pins knocked down per roll for one player. Output is the player's total score.
 Rules
 General rules

 Rules of bowling in a nutshell:

 A game consists of 10 frames. In each frame the player rolls 1 or 2 balls, except for the 10th frame, where the player rolls 2 or 3 balls.

 The total score is the sum of your scores for the 10 frames

 If you knock down fewer than 10 pins with 2 balls, your frame score is the number of pins knocked down

 If you knock down all 10 pins with 2 balls (spare), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next ball

 If you knock down all 10 pins with 1 ball (strike), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next 2 balls

 Rules for 10th frame

 As the 10th frame is the last one, in case of spare or strike there will be no next balls for the bonus. To account for that:

 if the last frame is a spare, player rolls 1 bonus ball.
 if the last frame is a strike, player rolls 2 bonus balls.

 These bonus balls on 10th frame are only counted as a bonus to the respective spare or strike.
 More information

 http://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring
 Input

 You may assume that the input is always valid. This means:

 input list length is correct
 number of pins knocked out per roll is valid

 * */

var bowlingScore = function (rolls) {
    //TODO: calculate score
    "use strict";
    var score = 0;
    var frame;
    var index = 0;

    function processFrame(roll, next, nextAfterNext) {
        if (roll === 10) {
            score += roll;
            score += next;
            score += nextAfterNext;
            ++index;
        } else if ((roll + next) === 10) {
            score += roll;
            score += next;
            score += nextAfterNext;
            index += 2;
        } else {
            score += roll;
            score += next;
            index += 2;
        }
    }

    for (frame = 1; frame <= 10; ++frame) {
        processFrame(rolls[index], rolls[index + 1], rolls[index + 2]);
    }

    return score;
};

/* Test

 Test.expect( 0 == bowlingScore([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) )
 Test.expect( 190 == bowlingScore([9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9]) )
 Test.expect( 300 == bowlingScore([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]) )
 Test.expect( 11 == bowlingScore([0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 10,1,0]) )
 Test.expect( 12 == bowlingScore([0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 10, 1,0]) )

 * */