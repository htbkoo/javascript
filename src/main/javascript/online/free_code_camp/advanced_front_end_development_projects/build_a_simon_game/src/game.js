/**
 * Created by Hey on 25 Apr 2017
 */

import scoreFormatter from "./scoreFormatter";
import STATUS_ENUM from "./StatusesEnum"
import StatusManager from "./statusManager";

let scores = new WeakMap();
let statusManagers = new WeakMap();

let SIMPLE_NOTIFY_ACTIONS = [
    "restart",
    "started",
    "demoed",
    "won",
];

class Game {
    constructor() {
        scores.set(this, 0);
        statusManagers.set(this, new StatusManager());
    };

    getFormattedScore() {
        return scoreFormatter.format(this.status().isIdle(), scores.get(this));
    }

    restart() {
        return statusManagers.get(this).setStatus(STATUS_ENUM.isStarting);
    }

    started() {
        return statusManagers.get(this).setStatus(STATUS_ENUM.isDemoing);
    }

    demoed() {
        return statusManagers.get(this).setStatus(STATUS_ENUM.isPlaying);
    }

    toggleStrict() {

    }

    isInputDisabled() {
        return !this.status().isPlaying();
    }

    status() {
        return Object.keys(STATUS_ENUM).reduce((prev, key) => {
            prev[key] = () => (STATUS_ENUM[key] === statusManagers.get(this).checkStatus());
            return prev;
        }, {});
    }
}

export default Game;