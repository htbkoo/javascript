import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import * as logic from "./logic";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="App">
                <TwitchStreamerTable />
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.jsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

class TwitchStreamerTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TwitchStreamerTableBody />
        )
    }
}

class TwitchStreamerTableBody extends Component {
    constructor(props) {
        super(props);
        this.onLoadHandler = logic.getJsonFromTwitchTV.bind(this);
    }

    render() {
        return (
            <div onLoad={this.onLoadHandler}/>
        )
    }
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableBody}