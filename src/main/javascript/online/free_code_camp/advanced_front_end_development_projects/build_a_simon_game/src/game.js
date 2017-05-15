/**
 * Created by Hey on 25 Apr 2017
 */

let scores = new WeakMap();
let statuses = new WeakMap();

let STATUS_ENUM = {
    "isIdle": Symbol("isIdle"),
    "isStarting": Symbol("isStarting"),
    "isDemoing": Symbol("isDemoing"),
    "isPlaying": Symbol("isPlaying"),
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

let createStatusObj = function () {
    "use strict";
    return Object.keys(STATUS_ENUM).reduce((prev, key) => {
        prev[key] = () => isStatus.call(this, STATUS_ENUM[key]);
        return prev;
    }, {});
};

class Game {
    constructor() {
        scores.set(this, 0);
        statuses.set(this, STATUS_ENUM.isIdle);
    };

    getFormattedScore() {
        return scoreFormatter.format(this.getStatus().isIdle(), scores.get(this));
    }

    restart() {
        statuses.set(this, STATUS_ENUM.isStarting);
    }

    started() {
        statuses.set(this, STATUS_ENUM.isDemoing);
    }

    demoed() {
        statuses.set(this, STATUS_ENUM.isPlaying);
    }

    toggleStrict() {

    }

    isInputDisabled() {
        return !this.getStatus().isPlaying();
    }

    getStatus() {
        return createStatusObj.call(this);
    }

}

export default Game;
export {scoreFormatter};
