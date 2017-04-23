import React, {Component} from "react";
import "./App.css";
import * as logic from "./logic";

const DUMMY_LOCO_SRC = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
const DUMMY_LOCO_ALT = "0x3F";
const TWITCH_TV_USERNAMES = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "not-a-valid-account"];
const OFFLINE_STATUS = "Offline";

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
                    <div className="twitch-streamer-title">Twitch Streamers</div>
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
        this.state = {
            "streams": {},
            "channels": {},
        };
    }

    componentDidMount() {
        let streams = {}, channels = {};
        TWITCH_TV_USERNAMES.forEach((username) => {
            logic.getStreamJsonFromTwitchTV.call(this, username, (data) => {
                if (isNonNullObject(data)) {
                    streams[username] = data;
                }
                this.setState({
                    streams,
                    channels
                });
            });
            logic.getChannelJsonFromTwitchTV(username, (data) => {
                if (isNonNullObject(data)) {
                    channels[username] = data;
                }
                this.setState({
                    streams,
                    channels
                });
            })
        });
    }

    render() {
        return (
            <tbody>
            {
                Object.keys(this.state.streams).map((streamerId) => {
                    return <TwitchStreamerTableBodyItem key={streamerId}
                                                        id={streamerId}
                                                        stream={this.state.streams[streamerId]}
                                                        channel={this.state.channels[streamerId]}/>
                })
            }
            </tbody>
        )
    }
}

class TwitchStreamerTableBodyItem extends Component {
    render() {
        let stream = this.props.stream;
        let channel = this.props.channel;
        let id = this.props.id;

        function safeGetPathOrElse(root, pathsArray, defaultReturnValue) {
            if (!isNonNullObject(root)) {
                return defaultReturnValue;
            }
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

        function getStreamOrChannelFieldOrElse(field, defaultReturnValue) {
            return safeGetPathOrElse(stream, ['stream', 'channel', field], safeGetPathOrElse(channel, [field], defaultReturnValue));
        }

        let displayName = id, status = OFFLINE_STATUS;
        if (typeof stream !== "undefined") {
            if (!('error' in stream)) {
                displayName = <a href={getStreamOrChannelFieldOrElse('url', "")}>
                    {getStreamOrChannelFieldOrElse('display_name', safeGetPathOrElse(stream, ['display_name'], ""))}
                </a>;
                status = safeGetPathOrElse(stream, ['stream', 'channel', 'status'], OFFLINE_STATUS);
            } else {
                status = safeGetPathOrElse(stream, ['message'], OFFLINE_STATUS)
            }
        }

        return (
            <tr>
                <td>
                    <img src={getStreamOrChannelFieldOrElse('logo', DUMMY_LOCO_SRC)}
                         alt={getStreamOrChannelFieldOrElse('name', DUMMY_LOCO_ALT)}/>
                </td>
                <td>
                    <div>
                        {displayName}
                    </div>
                </td>
                <td>
                    <div>{status}</div>
                </td>
            </tr>
        )
    }
}

function isNonNullObject(possiblyObj) {
    return possiblyObj !== null && typeof possiblyObj === 'object';
}

export default App;
export {TwitchStreamerTable, TwitchStreamerTableHead, TwitchStreamerTableBody, TwitchStreamerTableBodyItem}