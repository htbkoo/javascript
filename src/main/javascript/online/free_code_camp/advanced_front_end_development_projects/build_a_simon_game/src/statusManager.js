/**
 * Created by Hey on 25 Apr 2017
 */

import STATUS_ENUM from "./StatusesEnum"

const statuses = new WeakMap();

export default class StatusManager {
    constructor() {
        statuses.set(this, STATUS_ENUM.isIdle);
    }

    getStatus() {
        return statuses.get(this);
    }

    setStatus(status) {
        if (status === STATUS_ENUM.isStarting) {
            statuses.set(this, STATUS_ENUM.isStarting);
            return true;
        }
        return false;
    }
}