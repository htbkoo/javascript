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
}

class ButtonsPanel extends React.Component {
}

export default App;
export {Dashboard, ButtonsPanel};
