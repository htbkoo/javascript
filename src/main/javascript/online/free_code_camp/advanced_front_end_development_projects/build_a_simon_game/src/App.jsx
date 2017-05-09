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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'score': game.getFormattedScore(),
            'status': game.getStatus(),
            'areButtonsDisabled': game.isInputDisabled()
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState() {
        this.setState({
            'score': game.getFormattedScore(),
            'status': game.getStatus(),
            'areButtonsDisabled': game.isInputDisabled()
        })
    }

    render() {
        return (
            <div className="App">
                <Title/>
                <Dashboard onRestartClicked={this.updateState}
                           score={this.state.score}/>
                <ButtonsPanel areButtonsDisabled={this.state.areButtonsDisabled}/>
            </div>
        );
    }
}

class Container extends React.Component {
    render() {
        return (
            <div className="App-container">
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
                    <StartButton onClick={this.props.onRestartClicked}/>
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
                        <Container key={colour}>
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

class StartButton extends React.Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={() => {
                    game.restart();
                    this.props.onClick();
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
