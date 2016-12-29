/**
 * Created by Hey on 29 Dec 2016
 */

module.exports = Game;

function Game() {
    "use strict";
    var rolls = new Array(21).fill(0);
    var currentRoll = 0;

    this.roll = function (pins) {
        rolls[currentRoll++] = pins;
    };

    this.score = function () {
        var frameIndex = 0;

        return new Array(10).fill(0).reduce(function (score, _, frame) {
            if (isStrike(frameIndex)) {
                score += 10 + calcStrikeBouns(frameIndex);
                frameIndex++;
            } else if (isSpare(frameIndex)) {
                score += 10 + calcSpareBouns(frameIndex);
                frameIndex += 2;
            } else {
                score += calcSumOfBallsInFrame(frameIndex);
                frameIndex += 2;
            }
            return score;
        }, 0);
    };

    function isStrike(frameIndex) {
        return rolls[frameIndex] === 10;
    }

    function isSpare(frameIndex) {
        return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
    }

    function calcStrikeBouns(frameIndex) {
        return rolls[frameIndex + 1] + rolls[frameIndex + 2];
    }

    function calcSpareBouns(frameIndex) {
        return rolls[frameIndex + 2];
    }

    function calcSumOfBallsInFrame(frameIndex) {
        return rolls[frameIndex] + rolls[frameIndex + 1];
    }

    return this;
}