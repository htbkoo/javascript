/**
 * Created by Hey on 25 Apr 2017
 */

import scoreFormatter from "./scoreFormatter";

let scores = new WeakMap();
let statuses = new WeakMap();

let STATUS_ENUM = {
    "isIdle": Symbol("isIdle"),
    "isStarting": Symbol("isStarting"),
    "isDemoing": Symbol("isDemoing"),
    "isPlaying": Symbol("isPlaying"),
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
        return Object.keys(STATUS_ENUM).reduce((prev, key) => {
            prev[key] = () => (STATUS_ENUM[key] === statuses.get(this));
            return prev;
        }, {});
    }

}

export default Game;