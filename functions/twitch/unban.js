const urls = require("../../variables/urls");
const _regex = require("../_regex");
const _requestopts = require("../_requestopts");

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
        let j = require("../../variables/j");
        if(broadcaster_id in global.variables.varstatic.nonarr) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(user_id in global.variables.varstatic.nonarr) return reject({path:[1,0],msg:"user_id is undefined"});
        if(!_regex.numregex().test(user_id)) return reject({path:[0],msg:"user_id is does not match number regex"});
        if(moderator_id in global.variables.varstatic.nonarr || !_regex.numregex().test(moderator_id)) moderator_id = j.e().T_USERID;

        if(moderator_id in global.variables.varstatic.nonarr && customtoken in global.variables.varstatic.nonarr && customclientid in global.variables.varstatic.nonarr) moderator_id = j.e().T_USERID;
        if(customtoken in global.variables.varstatic.nonarr || customclientid in global.variables.varstatic.nonarr) customtoken = undefined; customclientid = undefined;

        let reqheaders = {
            ..._requestopts(urls.twitch.moderation.unban.method, customtoken || undefined, customclientid || undefined), 
        };

        j.modules.request.delete(
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