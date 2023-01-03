const request = require("request");
const _joinurlquery = require("./functions/_joinurlquery");
const _requestopts = require("./functions/_requestopts");
const urls = require("./variables/urls");

// request(`${urls.api._base}:${urls.api._port}/test`, (e, r) => {
//     console.log(e || r.body);
// })

// request(urls.twitch.streams + _joinurlquery("user_id", ["263830208", "662967825"], ((100*1)+100)), _requestopts("GET"), (e, r) => {
//     console.log(e || r.body);
// });