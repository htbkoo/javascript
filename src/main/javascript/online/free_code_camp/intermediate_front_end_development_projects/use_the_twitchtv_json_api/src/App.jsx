import React, {Component} from "react";
import "./App.css";
import * as logic from "./logic";

const DUMMY_LOCO_SRC = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
const DUMMY_LOCO_ALT = "0x3F";
const TWITCH_TV_USERNAMES = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "not-a-valid-account"];

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
        this.state = {"streams": []};
    }

    componentDidMount() {
        function isNonNullObject(possiblyObj) {
            return possiblyObj !== null && typeof possiblyObj === 'object';
        }

        let streams = {};
        TWITCH_TV_USERNAMES.forEach((username) => {
            logic.getStreamJsonFromTwitchTV.call(this, username, (data) => {
                if (isNonNullObject(data)) {
                    streams[username] = data;
                }
                this.setState({
                    "streams": streams
                });
            });
        });
    }

    render() {
        return (
            <tbody>
            {
                Object.keys(this.state.streams).map((streamerId) => {
                    return <TwitchStreamerTableBodyItem key={streamerId}
                                                        id={streamerId}
                                                        stream={this.state.streams[streamerId]}/>
                })
            }
            </tbody>
        )
    }
}

class TwitchStreamerTableBodyItem extends Component {
    render() {
        let stream = this.props.stream;

        function safeGetPathOrElse(root, pathsArray, defaultReturnValue) {
            let shouldReturnDefault = false;
            return pathsArray.reduce((prev, path) => {
                if (!shouldReturnDefault) {
                    if (path in prev) {
                        let next = prev[path];
                        if (next !== null) {
                            return next;
                        }
                    }
                }
                shouldReturnDefault = true;
                return defaultReturnValue;
            }, root);
        }

        function getStreamChannelFieldOrElse(field, defaultReturnValue) {
            return safeGetPathOrElse(stream, ['stream', 'channel', field], defaultReturnValue);
        }

        return (
            <tr>
                <td>
                    <img src={getStreamChannelFieldOrElse('logo', DUMMY_LOCO_SRC)}
                         alt={getStreamChannelFieldOrElse('name', DUMMY_LOCO_ALT)}/>
                </td>
                <td>
                    <div>
                        <a href={getStreamChannelFieldOrElse('url', "")}>{getStreamChannelFieldOrElse('display_name', safeGetPathOrElse(stream, ['display_name'], ""))}</a>
                    </div>
                </td>
                <td>
                    <div>{getStreamChannelFieldOrElse('status', safeGetPathOrElse(stream, ['message'], ""))}</div>
                </td>
            </tr>
        )
    }
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableHead, TwitchStreamerTableBody, TwitchStreamerTableBodyItem}