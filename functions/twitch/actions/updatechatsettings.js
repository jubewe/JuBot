const request = require("request");
const urls = require("../../../variables/urls");
const { e } = require("../../../variables/varstatic");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * @param {number} broadcaster_id *required
 * @param {number} moderator_id *optional
 * @param {boolean} emote_mode *optional
 * @param {boolean} follower_mode *optional
 * @param {number} follower_mode_duration *optional
 * @param {boolean} non_moderator_chat_delay *optional
 * @param {number} non_moderator_chat_delay_duration *optional
 * @param {boolean} slow_mode *optional
 * @param {number} slow_mode_wait_time*optional
 * @param {boolean} subscriber_mode *optional
 * @param {boolean} unique_chat_mode *optional
 * @param {string} customtoken *optional
 * @param {string} customclientid *optional
 * @returns {object}
 */

async function updatechatsettings(broadcaster_id, moderator_id, emote_mode, follower_mode, follower_mode_duration, non_moderator_chat_delay, non_moderator_chat_delay_duration, slow_mode, slow_mode_wait_time, subscriber_mode, unique_chat_mode, customtoken, customclientid){
    return new Promise(async (resolve, reject) => {
        if(!broadcaster_id ?? undefined) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!(moderator_id ?? undefined) || !_regex.numregex().test(moderator_id)) moderator_id = j.e().T_USERID;
        if(!customtoken || !customclientid) customtoken = undefined; customclientid = undefined; moderator_id = e().T_USERID;

        let args = {};
        if((emote_mode ?? undefined)) args["emote_mode"] = emote_mode;
        if((follower_mode ?? undefined)) args["follower_mode"] = follower_mode;
        if((follower_mode_duration ?? undefined)) args["follower_mode_duration"] = follower_mode_duration;
        if((non_moderator_chat_delay ?? undefined)) args["non_moderator_chat_delay"] = non_moderator_chat_delay;
        if((non_moderator_chat_delay_duration ?? undefined)) args["non_moderator_chat_delay_duration"] = non_moderator_chat_delay_duration;
        if((slow_mode ?? undefined)) args["slow_mode"] = slow_mode;
        if((slow_mode_wait_time ?? undefined)) args["slow_mode_wait_time"] = slow_mode_wait_time;
        if((subscriber_mode ?? undefined)) args["subscriber_mode"] = subscriber_mode;
        if((unique_chat_mode ?? undefined)) args["unique_chat_mode"] = unique_chat_mode;

        let reqopts = {
            ..._requestopts(j.urls().twitch.chat_settings.update.method, customtoken, customclientid),
            body: JSON.stringify(args)
        };
        reqopts.headers["Content-Type"] = "application/json";

        request(`${urls.twitch.chat_settings.update.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, reqopts, (e, r) => {
            if(e){
                return reject();
            } else {
                if(_regex.jsonreg().test(r.body)){
                    let dat = JSON.parse(r.body);
                    if(dat.error) return reject(dat);
                    return resolve(dat);
                } else {
                    return reject(r.body);
                }
            }
        });
    });
};

module.exports = updatechatsettings;