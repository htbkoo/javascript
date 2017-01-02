/**
 * Created by Hey on 2 Jan 2017
 */

module.exports = function Game() {
    "use strict";
    var currentRoll = 0;
    var rolls = new Array(21).fill(0);

    this.roll = function (pins) {
        rolls[currentRoll++] = pins;
    };

    this.score = function () {
        var index = 0;
        return new Array(10).fill(0).reduce(function (score, _, frameIndex) {
            function isStrike() {
                return rolls[index] === 10;
            }

            function isSpare() {
                return rolls[index] + rolls[index + 1] === 10;
            }

            function strikeBonus() {
                return rolls[index + 1] + rolls[index + 2];
            }

            function spareBonus() {
                return rolls[index + 2];
            }

            if (isStrike()) {
                score += 10 + strikeBonus();
                index += 1;
            } else if (isSpare()) {
                score += 10 + spareBonus();
                index += 2;
            } else {
                score += rolls[index] + rolls[index + 1];
                index += 2;
            }
            return score;
        }, 0);


    };
};