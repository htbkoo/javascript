import React from 'react';
import './App.css';

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
        return (
            <div/>
        );
    }
}

class StrictSwitch extends React.Component {
    render() {
        return (
            <div/>
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
