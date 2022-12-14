let j = require("../../../variables/j");
const urls = require("../../../variables/urls");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {number} broadcaster_id 
 * @param {number} moderator_id 
 * @param {string} message_id 
 * @param {string | undefined} customtoken 
 * @param {string | undefined} customclientid 
 * @see https://api.twitch.tv/helix/moderation/bans
 */

async function deletemessage(broadcaster_id, moderator_id, message_id, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        if(global.variables.varstatic.nonarr.includes(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(global.variables.varstatic.nonarr.includes(moderator_id) || !_regex.numregex().test(moderator_id)) moderator_id = j.e().T_USERID;
        if(global.variables.varstatic.nonarr.includes(message_id)) return reject({path:[1,1,0],msg:"message_id is undefined"});

        let reqheaders = {
            ..._requestopts(urls.twitch.moderation.delete.method, customtoken || undefined, customclientid || undefined), 
        };

        j.modules.request.delete(`${urls.twitch.moderation.delete.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&message_id=${message_id}`, reqheaders, (e, r) => {
            if(e){
                return reject(e);
            } else {
                if(!_regex.jsonreg().test(r.body)){
                    return resolve();
                } else {
                    return reject(JSON.parse(r.body));
                }
            }
        })
    });
};

module.exports = deletemessage;