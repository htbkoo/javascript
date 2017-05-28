/**
 * Created by Hey on 28 May 2017
 */

import randomColourGenerator from "./randomColourGenerator";

const sequences = new WeakMap();
const currentSeqIndices = new WeakMap();

function isInputCorrect(expectedNextColour, inputColour) {
    return expectedNextColour === inputColour;
}
function isSequenceCompleted(sequence, currentIndex) {
    const nextIndex = currentIndex + 1;
    return ((nextIndex) >= sequence.length);
}

export default class ColourSequenceManager {
    constructor() {
        sequences.set(this, []);
        currentSeqIndices.set(this, 0);
    }

    check(colour, callbacks) {
        const currentIndex = currentSeqIndices.get(this);
        const sequence = sequences.get(this);
        const expectedNextColour = sequence[currentIndex];
        if (isInputCorrect(expectedNextColour, colour)) {
            if (isSequenceCompleted(sequence, currentIndex)) {
                callbacks.scoreCallback();
            } else {
                currentSeqIndices.set(this, currentIndex + 1);
                callbacks.correctCallback();
            }
        }
    }

    addColour() {
        sequences.get(this).push(randomColourGenerator.getNextColour());
    }

    resetSequence() {
        const newSequence = [randomColourGenerator.getNextColour()];
        sequences.set(this, newSequence);
    }

    getSequence() {
        return sequences.get(this).slice();
    }
}