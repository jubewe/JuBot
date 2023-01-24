const urls = require("../../../variables/urls");
const getuser = require("../getuser");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {number} broadcaster_id
 * @param {number} moderator_id 
 * @param {number} user_id 
 * @param {string | null} reason 
 * @param {string | null} customtoken
 * @param {string | null} customclientid
 * @see https://api.twitch.tv/helix/moderation/bans
 */

async function ban(broadcaster_id, moderator_id, user_id, reason, customtoken, customclientid){
    return new Promise(async (resolve, reject) => {
        let j = require("../../../variables/j");
        if(global.variables.varstatic.nonarr.includes(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(_regex.usernamereg().test(user_id)) user_id = await getuser(1, user_id);
        if(global.variables.varstatic.nonarr.includes(user_id)) return reject({path:[1,0],msg:"user_id is undefined"});
        if(!_regex.numregex().test(user_id)) return reject({path:[0],msg:"user_id is does not match number regex"});
        if(global.variables.varstatic.nonarr.includes(moderator_id) || !_regex.numregex().test(moderator_id)) moderator_id = j.e().T_USERID;

        if(global.variables.varstatic.nonarr.includes(reason)) reason = "[Automated by JuBot]";
        if(global.variables.varstatic.nonarr.includes(moderator_id) && global.variables.varstatic.nonarr.includes(customtoken) && global.variables.varstatic.nonarr.includes(customclientid)) moderator_id = j.e().T_USERID;
        if(global.variables.varstatic.nonarr.includes(customtoken) || global.variables.varstatic.nonarr.includes(customclientid)) customtoken = undefined; customclientid = undefined; moderator_id = j.e().T_USERID;

        let reqheaders = {
            ..._requestopts(urls.twitch.moderation.ban.method, customtoken || undefined, customclientid || undefined), 
            body: JSON.stringify({data: { user_id: user_id, reason: reason}})
        };
        reqheaders.headers["content-type"] = "application/json";

        j.modules.request.post(
            `${urls.twitch.moderation.ban.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, reqheaders, (e, r) => {
                if(e){
                    return reject(e);
                } else {
                    if(_regex.jsonreg().test(r.body)){
                        let dat = JSON.parse(r.body);
                        if(!dat.error)  return resolve(dat);
                        return reject(dat);
                    } else {
                        return reject({
                            _j_msg: "request response not in JSON format",
                            error: r.body
                        });
                    }
                }
            }
        )
    })
};

module.exports = ban;