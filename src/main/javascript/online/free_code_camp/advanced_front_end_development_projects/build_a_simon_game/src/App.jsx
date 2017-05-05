import React from 'react';
import Game from './game';
import './App.css';

let game = new Game();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'score': game.getFormattedScore(),
            'status': game.getStatus()
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState() {
        this.setState({
            'score': game.getFormattedScore(),
            'status': game.getStatus()
        })
    }

    render() {
        return (
            <div className="App">
                <Title/>
                <Dashboard onRestartClicked={this.updateState} score={this.state.score}/>
                <ButtonsPanel/>
            </div>
        );
    }
}

class Container extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <Score score={this.props.score}/>
                <StrictSwitch/>
                <StartButton onClick={this.props.onRestartClicked}/>
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

export default App;
export {Container, Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton};
