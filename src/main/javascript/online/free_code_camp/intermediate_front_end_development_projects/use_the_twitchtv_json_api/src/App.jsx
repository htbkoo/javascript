import React, {Component} from "react";
import "./App.css";
import * as logic from "./logic";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TwitchStreamerTable />
            </div>
        );
    }
}

class TwitchStreamerTable extends Component {
    render() {
        return (
            <table>
                <TwitchStreamerTableHead />
                <TwitchStreamerTableBody />
            </table>
        )
    }
}

class TwitchStreamerTableHead extends Component {

}

class TwitchStreamerTableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {"responses": []};
        this.onLoadHandler = () => {
            logic.getJsonFromTwitchTV.call(this, (data) => {
                this.setState({
                    "responses": data
                });
            });
        };
    }

    render() {
        return (
            <tbody onLoad={this.onLoadHandler}>
            {
                this.state.responses.map((response) => {
                    let key = (function getDisplayNameFromResponse() {
                        let displayName = "";
                        if ('display_name' in response) {
                            displayName = response.display_name;
                        } else if (('stream' in response ) && ('display_name' in response.stream)) {
                            displayName = response.stream.display_name;
                        } else if ('message' in response) {
                            displayName = response.message;
                        } else {
                            displayName = response.toString();
                        }
                        return displayName;
                    })();
                    return <TwitchStreamerTableBodyItem key={key} response={response}/>
                })
            }
            </tbody>
        )
    }
}

class TwitchStreamerTableBodyItem extends Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.response.stream.logo}/></td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableHead, TwitchStreamerTableBody, TwitchStreamerTableBodyItem}