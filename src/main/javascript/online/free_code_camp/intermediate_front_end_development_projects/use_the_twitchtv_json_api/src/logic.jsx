function getJsonFromTwitchTV(streamerId, callback) {
    window.$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamerId + "?callback=?", {}, callback);
}

export {getJsonFromTwitchTV};