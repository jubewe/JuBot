const request = require("request");
const urls = require("../../../variables/urls");
const { e } = require("../../../variables/varstatic");
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
        if(!(broadcaster_id ?? undefined)) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});
        if(!(moderator_id ?? undefined) || !_regex.numregex().test(moderator_id)) moderator_id = e().T_USERID;
        if(!(message_id ?? undefined)) return reject({path:[1,1,0],msg:"message_id is undefined"});

        let reqheaders = {
            ..._requestopts(urls.twitch.moderation.delete.method, customtoken || undefined, customclientid || undefined), 
        };

        request.delete(`${urls.twitch.moderation.delete.url}?broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&message_id=${message_id}`, reqheaders, (e, r) => {
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