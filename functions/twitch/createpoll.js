/**
 * 
 * @param {string} broadcaster_id required
 * @param {string} title required
 * @param {array} choices required
 * @param {number} duration required
 * @param {boolean} channel_points_voting_enabled optional
 * @param {number} channel_points_per_vote optional
 * @param {string} customtoken 
 * @param {string} customclientid 
 * @see https://dev.twitch.tv/docs/api/reference#create-poll
 */

const j = require("../../variables/j");
const _regex = require("../_regex");
const _requestopts = require("../_requestopts");

async function createpoll(broadcaster_id, title, choices, duration, channel_points_voting_enabled, channel_points_per_vote, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        let nonarr = global.variables.varstatic.nonarr
        if(!broadcaster_id || !title || !choices) return reject({path:[0],msg:"required argument not found"});
        if(Array.isArray(choices) && typeof choices[0] === "string"){
            choices = choices.map(a => {a = a.replace(_regex.spacestartendreg(), ""); return {"title":a}});
        };

        let search_params = {};
        search_params["broadcaster_id"] = broadcaster_id;
        search_params["title"] = (title.length <= 25 ? title : title.substring(0, 25));
        search_params["choices"] = choices;
        search_params["duration"] = (duration && _regex.numregex().test(duration) ? (duration < 15 ? 15 : duration > 1800 ? 1800 : duration) : 300);
        if(channel_points_voting_enabled) search_params["channel_points_voting_enabled"] = channel_points_voting_enabled;
        if(channel_points_per_vote) search_params["channel_points_per_vote"] = `${(channel_points_per_vote < 1 ? 1 : channel_points_per_vote > 1000000 ? 1000000 : channel_points_per_vote)}`;

        let reqoptions = _requestopts(j.urls().twitch.poll.create.method, customtoken, customclientid);
        reqoptions["body"] = JSON.stringify(search_params);
        reqoptions.headers["Content-Type"] = "application/json";

        j.modules.request.post(j.urls().twitch.poll.create.url, reqoptions, (e, r) => {
            if(e){
                return reject(e);
            } else {
                let dat = JSON.parse(r.body);

                if(dat.data){
                    return resolve(dat.data);
                } else {
                    return reject(dat);
                }
            }
        });
    });
};

module.exports = createpoll;