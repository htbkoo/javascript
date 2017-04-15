import React, {Component} from "react";
import "./App.css";
import * as logic from "./logic";

const DUMMY_LOCO_SRC = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
const DUMMY_LOCO_ALT = "0x3F";

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
    render() {
        return (
            <thead>
            <tr>
                <th>
                    <div className="twitch-streamer-table">Twitch Streamers</div>
                </th>
                <th/>
            </tr>
            </thead>
        )
    }
}

class TwitchStreamerTableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {"responses": []};
    }

    componentDidMount() {
        function isNonNullObject(possiblyObj) {
            return possiblyObj !== null && typeof possiblyObj === 'object';
        }

        logic.getJsonFromTwitchTV.call(this, (data) => {
            data = Array.isArray(data) ? data : isNonNullObject(data) ? [data] : [];
            this.setState({
                "responses": data
            });
        });
    }

    render() {
        return (
            <tbody>
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
        function getStreamFieldOrElse(field, defaultReturnValue) {
            function isFieldValid(field) {
                return ('stream' in response) && (response.stream !== null)
                    && (field in response.stream) && (response.stream[field] !== null);
            }

            return isFieldValid(field) ? response.stream[field] : defaultReturnValue;
        }

        function getResponseFieldOrElse(field) {
            return field in response ? response[field] : "";
        }

        let response = this.props.response;

        return (
            <tr>
                <td>
                    <img src={getStreamFieldOrElse('logo', DUMMY_LOCO_SRC)}
                         alt={getStreamFieldOrElse('name', DUMMY_LOCO_ALT)}/>
                </td>
                <td>
                    <div>
                        <a href={getStreamFieldOrElse('url', "")}>{getStreamFieldOrElse('display_name', getResponseFieldOrElse('display_name'))}</a>
                    </div>
                </td>
                <td>
                    <div>{getStreamFieldOrElse('status', getResponseFieldOrElse('message'))}</div>
                </td>
            </tr>
        )
    }
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableHead, TwitchStreamerTableBody, TwitchStreamerTableBodyItem}