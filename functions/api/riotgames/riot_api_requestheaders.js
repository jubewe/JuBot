const { e } = require("../../../variables/j");

function riot_api_requestheaders(bearer){
    bearer = bearer ?? e().RIOT_API_KEY;
    return {
        "method": "GET",
        "headers": {
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": bearer
        }
    };
};

module.exports = riot_api_requestheaders;