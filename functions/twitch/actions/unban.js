const request = require("request");
const urls = require("../../../variables/urls");
const { e } = require("../../../variables/varstatic");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {number} broadcaster_id
 * @param {number} moderator_id 
 * @param {number} user_id 
 * @param {string | null} customtoken
 * @param {string | null} customclientid
 * @see https://api.twitch.tv/helix/moderation/bans
 */

async function unban(broadcaster_id, moderator_id, user_id, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        if(!(broadcaster_id ?? undefined)) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(!(user_id ?? undefined)) return reject({path:[1,0],msg:"user_id is undefined"});
        if(!_regex.numregex().test(user_id)) return reject({path:[0],msg:"user_id is does not match number regex"});
        if(!(moderator_id ?? undefined) || !_regex.numregex().test(moderator_id)) moderator_id = e().T_USERID;

        if(!(moderator_id ?? undefined) && !(customtoken ?? undefined) && !(customclientid ?? undefined)) moderator_id = e().T_USERID;
        if(!(customtoken ?? undefined) || !(customclientid ?? undefined)) customtoken = undefined; customclientid = undefined;

        let reqheaders = {
            ..._requestopts(urls.twitch.moderation.unban.method, customtoken || undefined, customclientid || undefined), 
        };

        request.delete(
            `${urls.twitch.moderation.unban.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&user_id=${user_id}`, reqheaders, (e, r) => {
                if(e){
                    return reject(e);
                } else {
                    if(_regex.jsonreg().test(r.body)){
                        return reject({
                            _j_msg: "request response in JSON format",
                            error: r.body
                        });
                    } else {
                        return resolve();
                    }
                }
            }
        )
    })
};

module.exports = unban;