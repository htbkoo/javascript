/**
 * Created by Hey on 15 May 2017
 */

const WIN_SCORE = 20;
const WIN_MESSAGE = "WIN";

export default {
    "format": function (rawScore, isIdle) {
        let stepText;
        if (isIdle) {
            stepText = '--';
        } else {
            if (rawScore >= WIN_SCORE) {
                return WIN_MESSAGE;
            }

            (function formatScore() {
                const gameScore = rawScore + 1;
                if ((gameScore >= 0) && (gameScore < 10)) {
                    stepText = "0" + (gameScore);
                } else {
                    stepText = "" + (gameScore);
                }
            })();

        }
        return stepText;
    }
};