function getJsonFromTwitchTV(path, streamerId, callback) {
    window.$.getJSON("https://wind-bow.gomix.me/twitch-api/" + path + "/" + streamerId + "?callback=?", {}, callback);
}
function getStreamJsonFromTwitchTV(streamerId, callback) {
    getJsonFromTwitchTV("streams", streamerId, callback);
}
function getChannelJsonFromTwitchTV(streamerId, callback) {
    getJsonFromTwitchTV("channels", streamerId, callback);
}

export {getStreamJsonFromTwitchTV, getChannelJsonFromTwitchTV};