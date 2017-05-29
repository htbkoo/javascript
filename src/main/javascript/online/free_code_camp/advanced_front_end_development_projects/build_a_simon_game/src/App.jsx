import React from "react";
import Game from "./game";
import "./App.css";

let game = new Game();

const BUTTON_COLOUR_MAPPING = {
    "red": "btn-danger",
    "green": "btn-success",
    "blue": "btn-primary",
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
                <ButtonsPanel areButtonsDisabled={this.state.areButtonsDisabled}
                              onUpdateStateFromGameButton={this.updateState}/>
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
                            <GameButton colour={colour} isDisabled={this.props.areButtonsDisabled}
                                        updateState={this.props.onUpdateStateFromGameButton}/>
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

function wait(timeout, runBeforeTimeout) {
    return new Promise(resolve => {
        if (typeof runBeforeTimeout === "function") {
            runBeforeTimeout();
        }
        setTimeout(() => {
            resolve()
        }, timeout);
    })
}

function setAllContainersColoursTo(colour) {
    Object.keys(containersColours).forEach(key => containersColours[key] = colour);
}

function restartingAnimation(triggerDisplayRefresh, animationDone) {
    wait(500, () => {
        setAllContainersColoursTo(COLOURS_CSS_CLASSES.WHITE);
        triggerDisplayRefresh();
    }).then(() => {
        setAllContainersColoursTo("");
        triggerDisplayRefresh();
        wait(500).then(() => animationDone());
    });
}

function performDemo(updateState) {
    new Promise((demoDone) => demoAnimation(game.getSequenceAsLowerCaseStrings(), updateState, demoDone)).then(() => {
        game.notifyStatus().demoed();
        updateState();
    });
}

function demoAnimation(sequence, triggerDisplayRefresh, allDemosDone) {
    Promise.all(sequence.map(colour => new Promise(demoDone => {
        wait(500, () => {
            console.log("colour: " + colour);
            setAllContainersColoursTo("");
            containersColours[colour] = COLOURS_CSS_CLASSES[colour.toUpperCase()];
            triggerDisplayRefresh();
        }).then(() => {
            wait(300, () => {
                console.log("cleaning");
                setAllContainersColoursTo("");
                triggerDisplayRefresh();
            }).then(() => {
                console.log("1 demo done");
                demoDone()
            });
        })
    }))).then(() => {
        wait(200, () => {
            console.log("resolving");
            setAllContainersColoursTo("");
            triggerDisplayRefresh();
        }).then(() => allDemosDone());
    });
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
                        performDemo(updateState);
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
                <input type="button" className={"btn GameButton " + btnClassName} disabled={this.props.isDisabled}
                       onClick={() => {
                           let updateState = this.props.updateState;
                           game.buttons()[this.props.colour]({
                               "correctCallback": () => {
                                   updateState();
                               },
                               "scoreCallback": () => {
                                   performDemo(updateState);
                               },
                               "winCallback": () => {
                                   updateState();
                               },
                               "wrongCallback": () => {
                                   performDemo(updateState);
                               },
                               "restartCallback": () => {
                                   performDemo(updateState);
                               }
                           });
                       }}
                />
            </div>
        );
    }
}

export default App;
export {Container, Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton, GameButton};
