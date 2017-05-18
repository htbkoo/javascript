/**
 * Created by Hey on 25 Apr 2017
 */

import STATUS_ENUM from "./StatusesEnum"

export default class StatusManager{
    getStatus(){
        return STATUS_ENUM.isIdle;
    }
    setStatus(){

    }
}