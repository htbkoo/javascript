/**
 * Created by Hey on 17 Jan 2017
 */

module.exports = function () {
    "use strict";
    var currentRoll = 0;
    var rolls = new Array(21).fill(0);

    this.roll = function (pins) {
        rolls[currentRoll++] = pins;
    };

    this.score = function () {
        var frame = 0;

        return new Array(10).fill(0).reduce(function (score) {
            if (isStrike()) {
                score += 10 + strikeBonus();
                frame += 1;
            } else if (isSpare()) {
                score += 10 + spareBonus();
                frame += 2;
            } else {
                score += rolls[frame] + rolls[frame + 1];
                frame += 2;
            }
            return score;
        }, 0);

        function isStrike() {
            return rolls[frame] === 10;
        }

        function isSpare() {
            return rolls[frame] + rolls[frame + 1] === 10;
        }

        function strikeBonus() {
            return rolls[frame + 1] + rolls[frame + 2];
        }

        function spareBonus() {
            return rolls[frame + 2];
        }
    };

    return this;
};
