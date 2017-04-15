import a_TwtichTV_API_response from "../test/resources/TwitchTV_sample_API_response.json";

function getJsonFromTwitchTV(callback) {
    callback(a_TwtichTV_API_response);
}

export default getJsonFromTwitchTV;
export {getJsonFromTwitchTV};
