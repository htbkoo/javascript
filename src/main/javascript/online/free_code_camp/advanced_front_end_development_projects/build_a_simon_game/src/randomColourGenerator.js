/**
 * Created by Hey on 23 May 2017
 */

import COLOUR_ENUM from "./ColoursEnum";

const POSSIBLE_COLOURS = Object.keys(COLOUR_ENUM);
const getNextRandomNumber = () => {
    "use strict";
    return parseInt(Math.random() * POSSIBLE_COLOURS.length);
};

const getNextColour = () => {
    "use strict";
    return COLOUR_ENUM[POSSIBLE_COLOURS[getNextRandomNumber()]];
};
export default {
    "getNextColour": getNextColour,
    "getSequenceOfColour": (n) => {
        "use strict";
        return new Array(n).fill(0).map(getNextColour);
    }
};