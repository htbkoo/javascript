/**
 * Created by Hey on 25 Apr 2017
 */

let scores = new WeakMap();
let statuses = new WeakMap();

let STATUS_ENUM = {
    "IDLE": Symbol("IDLE"),
    "STARTING": Symbol("STARTING"),
    "DEMOING": Symbol("DEMOING"),
    "PLAYING": Symbol("PLAYING"),
};

let scoreFormatter = {
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

let isStatus = function (status) {
    "use strict";
    return status === statuses.get(this);
};

class Game {
    constructor() {
        scores.set(this, 0);
        statuses.set(this, STATUS_ENUM.IDLE);
    };

    getFormattedScore() {
        return scoreFormatter.format(this.getStatus().isIdle(), scores.get(this));
    }

    restart() {
        statuses.set(this, STATUS_ENUM.STARTING);
    }

    started() {
        statuses.set(this, STATUS_ENUM.DEMOING);
    }

    demoed() {
        statuses.set(this, STATUS_ENUM.PLAYING);
    }

    toggleStrict() {

    }

    isInputDisabled() {
        return !this.getStatus().isPlaying();
    }

    getStatus() {
        return {
            'isStarting': () => {
                return true;
            },
            "isIdle": () => {
                return isStatus.call(this, STATUS_ENUM.IDLE);
            },
            "isPlaying": () => {
                return isStatus.call(this, STATUS_ENUM.PLAYING);
            }
        }
    }

}

export default Game;
export {scoreFormatter};
