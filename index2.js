const request = require("request");
const _requestopts = require("./functions/_requestopts");

request("https://api.twitch.tv/helix/streams?user_id=461098086&user_id=263830208&user_id=187528776", _requestopts(), (e, r) => {
    if(e){
        console.error(e);
    } else {
        console.log(r.body);
    }
})