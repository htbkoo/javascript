/**
 * Created by Hey on 25 Apr 2017
 */


class Game {
    initialize() {

    };

    getScore() {
        return 0;
    }

    start() {

    }

    toggleStrict(){

    }

    getStatus() {
        return {
            'isStarting': () => {
                return true;
            },
            'isStarted': () => {
                return false;
            }
        }
    }

}

export default Game;