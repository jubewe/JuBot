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

let j = require("../../variables/j");
const _joinurlquery = require("../_joinurlquery");
const _regex = require("../_regex");
const _requestopts = require("../_requestopts");

async function getstream(user_id, user_login, game_id, type, language, first, before, after, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        let nonarr = global.variables.varstatic.nonarr;
        let search_params = (!nonarr.includes(user_id) && user_id.length > 0 ? _joinurlquery("user_id", (Array.isArray(user_id) ? user_id : [user_id]), true) + (!nonarr.includes(user_login) ? _joinurlquery("user_login", (Array.isArray(user_login) ? user_login : [user_login])) : "") : (!nonarr.includes(user_login) && user_login.length > 0 ? _joinurlquery("user_login", (Array.isArray(user_login) ? user_login : [user_login]), true) : undefined));
        
        if(search_params){
            search_params += (!nonarr.includes(game_id) ? _joinurlquery("game_id", (Array.isArray(game_id) ? game_id : [game_id])) : "");
            search_params += (!nonarr.includes(type) && ["live", "all"].includes(type) ? `&type=${type}` : "");
            search_params += (!nonarr.includes(language) ? _joinurlquery("language", (Array.isArray(language) ? language : [language])) : "");
            search_params += (!nonarr.includes(first) && _regex.numregex().test(first) ? `&first=${(first <= 0 ? 1 : (first > 100 ? 100 : first))}` : "");
            search_params += (!nonarr.includes(before) ? `&before=${before}` : "");
            search_params += (!nonarr.includes(after) ? `&after=${after}` : "");

            j.modules.request(`${j.urls().twitch.streams}${search_params}`, _requestopts("GET", customtoken, customclientid), (e, r) => {
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