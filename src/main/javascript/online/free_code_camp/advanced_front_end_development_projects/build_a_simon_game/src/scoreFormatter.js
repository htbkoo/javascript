/**
 * Created by Hey on 15 May 2017
 */

export default {
    "format": function (isIdle, rawScore) {
        let stepText;
        if (isIdle) {
            stepText = '--';
        } else {
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