/**
 * Created by Hey on 28 May 2017
 */

import randomColourGenerator from "./randomColourGenerator";

const sequences = new WeakMap();

export default class ColourSequenceManager {
    constructor() {
        sequences.set(this, []);
    }

    check() {

    }

    resetSequence() {
        const newSequence = [randomColourGenerator.getNextColour()];
        sequences.set(this, newSequence);
    }

    getSequence() {
        return sequences.get(this);
    }
}