/**
 * Created by Hey on 30 Dec 2016
 */
function Game() {
    "use strict";
    var roll = 0;
    var rolls = new Array(21).fill(0);

    this.roll = function (pins) {
        rolls[roll++] = pins;
    };

    this.score = function () {
        var frameIndex = 0;
        return new Array(10).fill(0).reduce(function (score, _, frame) {
            if (isStrike(frameIndex)) {
                score += rolls[frameIndex] + strikeBonus(frameIndex);
                frameIndex += 1;
            } else if (isSpare(frameIndex)) {
                score += rolls[frameIndex] + rolls[frameIndex + 1] + spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += rolls[frameIndex] + rolls[frameIndex + 1];
                frameIndex += 2;
            }
            return score;
        }, 0);
    };

    function isSpare(frameIndex) {
        return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
    }

    function isStrike(frameIndex) {
        return rolls[frameIndex] === 10;
    }

    function spareBonus(frameIndex) {
        return rolls[frameIndex + 2];
    }

    function strikeBonus(frameIndex) {
        return rolls[frameIndex + 1] + rolls[frameIndex + 2];
    }

    return this;
}

module.exports = Game;