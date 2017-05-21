/**
 * Created by Hey on 25 Apr 2017
 */

import scoreFormatter from "./scoreFormatter";
import STATUS_ENUM from "./StatusesEnum"
import StatusManager from "./statusManager";

let scores = new WeakMap();
let statusManagers = new WeakMap();

let SIMPLE_NOTIFY_ACTIONS = {
    "restart": STATUS_ENUM.isStarting,
    "started": STATUS_ENUM.isDemoing,
    "demoed": STATUS_ENUM.isPlaying,
    "won": STATUS_ENUM.isVictory
};

class Game {
    constructor() {
        scores.set(this, 0);
        statusManagers.set(this, new StatusManager());
    };

    getFormattedScore() {
        return scoreFormatter.format(this.status().isIdle(), scores.get(this));
    }

    toggleStrict() {

    }

    isInputDisabled() {
        return !this.status().isPlaying();
    }

    notifyStatus() {
        return Object.keys(SIMPLE_NOTIFY_ACTIONS)
            .reduce((prev, key) => {
                prev[key] = () => statusManagers.get(this).setStatus(SIMPLE_NOTIFY_ACTIONS[key]);
                return prev;
            }, {});
    }

    status() {
        return Object.keys(STATUS_ENUM).reduce((prev, key) => {
            prev[key] = () => (STATUS_ENUM[key] === statusManagers.get(this).getStatus());
            return prev;
        }, {});
    }
}

export default Game;