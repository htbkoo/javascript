/**
 * Created by Hey on 25 Apr 2017
 */

import scoreFormatter from "./scoreFormatter";
import STATUS_ENUM from "./StatusesEnum"
import COLOUR_ENUM from "./ColoursEnum"
import StatusManager from "./statusManager";
import ColourSequenceManager from "./colourSequenceManager";

let scores = new WeakMap();
let strictModes = new WeakMap();
let statusManagers = new WeakMap();
let colourSequenceManagers = new WeakMap();

let SIMPLE_NOTIFY_ACTIONS = {
    "restart": STATUS_ENUM.isStarting,
    "started": STATUS_ENUM.isDemoing,
    "demoed": STATUS_ENUM.isPlaying,
    "won": STATUS_ENUM.isVictory
};

function incScore() {
    scores.set(this, scores.get(this) + 1);
}
function isVictory() {
    return scores.get(this) >= 20;
}

function setStatusAndPropagateCallback(status, callbackToCall) {
    statusManagers.get(this).setStatus(status);
    callbackToCall();
}
export default class Game {
    constructor() {
        scores.set(this, 0);
        strictModes.set(this, false);
        statusManagers.set(this, new StatusManager());
        colourSequenceManagers.set(this, new ColourSequenceManager());
    };

    getFormattedScore() {
        return scoreFormatter.format(this.status().isIdle(), scores.get(this));
    }

    isStrictMode() {
        return strictModes.get(this);
    }

    toggleStrict() {
        strictModes.set(this, !this.isStrictMode());
    }

    isInputDisabled() {
        return !this.status().isPlaying();
    }

    buttons() {
        return Object.keys(COLOUR_ENUM)
            .reduce((prev, key) => {
                prev[key.toLowerCase()] = (callbacks) => {
                    const result = colourSequenceManagers.get(this).check(COLOUR_ENUM[key], {
                        "correctCallback": callbacks.correctCallback,
                        "scoreCallback": () => {
                            incScore.call(this);
                            if (isVictory.call(this)) {
                                setStatusAndPropagateCallback.call(this, STATUS_ENUM.isVictory, callbacks.winCallback);
                            } else {
                                setStatusAndPropagateCallback.call(this, STATUS_ENUM.isDemoing, callbacks.scoreCallback);
                            }
                        },
                        "wrongCallback": () => {
                            setStatusAndPropagateCallback.call(this, STATUS_ENUM.isDemoing, callbacks.wrongCallback);
                        }
                    });
                };

                return prev;
            }, {});
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
};