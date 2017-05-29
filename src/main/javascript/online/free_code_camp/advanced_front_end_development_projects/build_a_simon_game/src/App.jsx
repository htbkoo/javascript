import React from 'react';
import Game from './game';
import './App.css';

let game = new Game();

const BUTTON_COLOUR_MAPPING = {
    "red": "btn-danger",
    "green": "btn-primary",
    "blue": "btn-success",
    "yellow": "btn-warning"
};

const COLOURS_CSS_CLASSES = {
    'RED': "bg-colour-red",
    'GREEN': "bg-colour-green",
    'BLUE': "bg-colour-blue",
    'YELLOW': "bg-colour-yellow",
    'WHITE': "bg-colour-white",
};

const containersColours = {
    'red': "",
    "green": "",
    "blue": "",
    "yellow": "",
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'score': game.getFormattedScore(),
            'status': game.status(),
            'areButtonsDisabled': game.isInputDisabled()
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState() {
        this.setState({
            'score': game.getFormattedScore(),
            'status': game.status(),
            'areButtonsDisabled': game.isInputDisabled()
        })
    }

    render() {
        return (
            <div className="App">
                <Title/>
                <Dashboard onUpdateStateFromRestart={this.updateState}
                           score={this.state.score}/>
                <ButtonsPanel areButtonsDisabled={this.state.areButtonsDisabled}/>
            </div>
        );
    }
}

class Container extends React.Component {
    render() {
        return (
            <div className={"App-container " + containersColours[this.props.colourKey]}>
                {this.props.children}
            </div>
        )
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <Container>
                    <Score score={this.props.score}/>
                </Container>
                <Container>
                    <StrictSwitch/>
                </Container>
                <Container>
                    <StartButton updateState={this.props.onUpdateStateFromRestart}/>
                </Container>
            </div>
        );

    }
}

class ButtonsPanel extends React.Component {
    render() {
        return (
            <div className="ButtonPanel">
                {
                    [
                        'red',
                        'green',
                        'blue',
                        'yellow'
                    ].map((colour) =>
                        <Container key={colour} colourKey={colour}>
                            <GameButton colour={colour} isDisabled={this.props.areButtonsDisabled}/>
                        </Container>
                    )
                }
            </div>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <div className="App-title">Simon® Game</div>
        );
    }
}

class Score extends React.Component {
    render() {
        return (
            <div>
                {this.props.score}
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
                <input type="checkbox" name="strict-mode-checkbox" data-label-text="Strict" data-on-color="warning"
                       onClick={() => {
                           game.toggleStrict();
                       }}/>
            </div>
        );
    }
}

function setAllContainersColoursTo(colour) {
    Object.keys(containersColours).forEach(key => containersColours[key] = colour);
}

function restartingAnimation(triggerDisplayRefresh, animationDone) {
    new Promise((resolve) => {
        setAllContainersColoursTo(COLOURS_CSS_CLASSES.WHITE);
        triggerDisplayRefresh();
        setTimeout(()=>{
            resolve()
        }, 500);
    }).then(()=>{
        setAllContainersColoursTo("");
        triggerDisplayRefresh();
        animationDone();
    });
}


function demoAnimation(sequence, triggerDisplayRefresh, demoDone) {

    demoDone();
}

class StartButton extends React.Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={() => {
                    const updateState = this.props.updateState;

                    game.notifyStatus().restart();
                    updateState();

                    new Promise((resolve) => {
                        new Promise((animationDone) => restartingAnimation(updateState, animationDone)).then(() => {
                            game.notifyStatus().started();
                            updateState();
                            resolve("started");
                        })
                    }).then((resolveMessage) => {
                        new Promise((demoDone) => demoAnimation(game.getSequence(), updateState, demoDone)).then(() => {
                            game.notifyStatus().demoed();
                            updateState();
                        });
                    })
                }}>
                    Restart
                </button>
            </div>
        );
    }
}

class GameButton extends React.Component {
    render() {
        let btnClassName = (this.props.colour in BUTTON_COLOUR_MAPPING) ? BUTTON_COLOUR_MAPPING[this.props.colour] : "btn-default";

        return (
            <div>
                <input type="button" className={"btn GameButton " + btnClassName} disabled={this.props.isDisabled}/>
            </div>
        );
    }
}

export default App;
export {Container, Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton, GameButton};
