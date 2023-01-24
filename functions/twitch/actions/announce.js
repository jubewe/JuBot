const request = require("request");
const urls = require("../../../variables/urls");
const { e } = require("../../../variables/varstatic");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * @param {number} broadcaster_id *required
 * @param {number} moderator_id *required
 * @param {string} message *required
 * @param {string} color *optional: blue, green, orange, purple, primary (default)
 * @param {string} customtoken *optional
 * @param {string} customclientid *optional
 * @returns {promise | boolean} true if successful
 */

async function announce(broadcaster_id, moderator_id, message, color, customtoken, customclientid){
    return new Promise(async (resolve, reject) => {
        if(!broadcaster_id) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(!(moderator_id ?? undefined) || !_regex.numregex().test(moderator_id)) moderator_id = e().T_USERID;
        if(!message) return reject({path:[0],msg:"message is undefined"});
        if(!color || !["blue", "green", "orange", "purple"].includes(color)) color = "primary";
        if(!customtoken || !customclientid) customtoken = undefined; customclientid = undefined; moderator_id = e().T_USERID;

        let reqbody = {
            ..._requestopts(urls.twitch.announcement.method, customtoken, customclientid),
            body: JSON.stringify({message:message,color:color})
        };
        reqbody["headers"]["Content-Type"] = "application/json";

        request(`${urls.twitch.announcement.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, reqbody, (e, r) => {
            if(e){
                return reject(e);
            } else {
                if(r.body == ""){
                    return resolve(true);
                } else {
                    return reject(r.body);
                }
            }
        })
    });
};

module.exports = announce;