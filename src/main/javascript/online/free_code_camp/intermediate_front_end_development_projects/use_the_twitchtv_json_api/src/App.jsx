import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import * as logic from "./logic";

class App extends Component {
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
    render() {
        return (
            <TwitchStreamerTableBody />
        )
    }
}

class TwitchStreamerTableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {"streams": []};
        this.onLoadHandler = () => {
            logic.getJsonFromTwitchTV.call(this, (data) => {
                this.setState({
                    "streams": data
                });
            });
        };
    }

    render() {
        return (
            <div onLoad={this.onLoadHandler}>
                <ul>
                    {
                        this.state.streams.map((stream) => {
                            return <li key={stream.display_name}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableBody}