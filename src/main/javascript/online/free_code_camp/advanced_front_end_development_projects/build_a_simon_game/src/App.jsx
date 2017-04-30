import React from 'react';
import Game from './game';
import './App.css';

let game = new Game();

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Dashboard/>
                <ButtonsPanel/>
            </div>
        );
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Title/>
                <Score/>
                <StrictSwitch/>
                <StartButton/>
            </div>
        );

    }
}

class ButtonsPanel extends React.Component {
    render() {
        return (
            <div/>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <div>Simon® Game</div>
        );
    }
}

class Score extends React.Component {
    render() {
        let stepText;
        if (game.getStatus().isStarted()) {
            (function formatScore() {
                const gameScore = game.getScore() + 1;
                if ((gameScore >= 0) && (gameScore < 10)) {
                    stepText = "0" + (gameScore);
                } else {
                    stepText = "" + (gameScore);
                }
            })();

        } else {
            stepText = '--';
        }

        return (
            <div>
                {stepText}
            </div>
        );
    }
}

class StrictSwitch extends React.Component {
    componentDidMount() {
        window.$("[name='strict-mode-checkbox']").bootstrapSwitch();
    }

    render() {
        return (
            <div>
                <input type="checkbox" name="strict-mode-checkbox" data-label-text="Strict"
                       onClick={() => {
                           game.toggleStrict();
                       }}/>
            </div>
        );
    }
}

class StartButton extends React.Component {
    render() {
        return (
            <div/>
        );
    }
}

export default App;
export {Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton};
