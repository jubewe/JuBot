const request = require("request");
const urls = require("../../../variables/urls");
const _joinurlquery = require("../../_joinurlquery");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {string | array} user_id required*
 * @param {string | array} user_login required*
 * @param {string | array} game_id required*
 * @param {string} type optional
 * @param {string | array} language optional
 * @param {number} first optional
 * @param {string} before optional
 * @param {string} after optional
 * @param {string} customtoken
 * @param {string} customclientid
 * @see https://dev.twitch.tv/docs/api/reference#get-streams
*/

async function getstream(user_id, user_login, game_id, type, language, first, before, after, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        let search_params = ((user_id ?? undefined) && user_id.length > 0 ? _joinurlquery("user_id", (Array.isArray(user_id) ? user_id : [user_id]), true) + ((user_login ?? undefined) ? _joinurlquery("user_login", (Array.isArray(user_login) ? user_login : [user_login])) : "") : ((user_login ?? undefined) && user_login.length > 0 ? _joinurlquery("user_login", (Array.isArray(user_login) ? user_login : [user_login]), true) : undefined));
        
        if(search_params){
            search_params += ((game_id ?? undefined) ? _joinurlquery("game_id", (Array.isArray(game_id) ? game_id : [game_id])) : "");
            search_params += ((type ?? undefined) && ["live", "all"].includes(type) ? `&type=${type}` : "");
            search_params += ((language ?? undefined) ? _joinurlquery("language", (Array.isArray(language) ? language : [language])) : "");
            search_params += ((first ?? undefined) && _regex.numregex().test(first) ? `&first=${(first <= 0 ? 1 : (first > 100 ? 100 : first))}` : "");
            search_params += ((before ?? undefined) ? `&before=${before}` : "");
            search_params += ((after ?? undefined) ? `&after=${after}` : "");

            request(`${urls.twitch.streams}${search_params}`, _requestopts("GET", customtoken, customclientid), (e, r) => {
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
        } else {
            return reject({path:[0],msg:"no of the required params given"});
        }
    });
};

module.exports = getstream;