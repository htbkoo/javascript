function getJsonFromTwitchTV(callback) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?", {}, callback);
}

export {getJsonFromTwitchTV};