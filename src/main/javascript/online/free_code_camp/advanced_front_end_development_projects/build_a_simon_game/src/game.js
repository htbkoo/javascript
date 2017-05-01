/**
 * Created by Hey on 25 Apr 2017
 */


class Game {
    initialize() {

    };

    getScore() {
        return 0;
    }

    restart() {

    }

    toggleStrict() {

    }

    getStatus() {
        return {
            'isStarting': () => {
                return true;
            },
            'isStarted': () => {
                return false;
            }
        }
    }

}


let scoreFormatter = {
    "format": function (isStarted, rawScore) {
        let stepText;
        if (isStarted) {
            (function formatScore() {
                const gameScore = rawScore + 1;
                if ((gameScore >= 0) && (gameScore < 10)) {
                    stepText = "0" + (gameScore);
                } else {
                    stepText = "" + (gameScore);
                }
            })();

        } else {
            stepText = '--';
        }
        return stepText;
    }
};

export default Game;
export {scoreFormatter};
