/**
 * Created by Hey on 6 Jan 2017
 */

module.exports = function () {
    "use strict";
    var currentRoll = 0;
    var rolls = new Array(21).fill(0);

    this.roll = function (pins) {
        rolls[currentRoll++] = pins;
    };

    this.score = function () {
        var frameIndex = 0;
        return new Array(10).fill(0).reduce(function (score, _, frame) {
            function isSpare() {
                return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
            }

            function isStrike() {
                return rolls[frameIndex] === 10;
            }

            function strikeBonus() {
                return rolls[frameIndex + 1] + rolls[frameIndex + 2];
            }

            function spareBonus() {
                return rolls[frameIndex + 2];
            }

            if (isStrike()) {
                score += 10 + strikeBonus();
                frameIndex += 1;
            } else if (isSpare()) {
                score += 10 + spareBonus();
                frameIndex += 2;
            } else {
                score += rolls[frameIndex] + rolls[frameIndex + 1];
                frameIndex += 2;
            }
            return score;
        }, 0);
    };

    return this;
};