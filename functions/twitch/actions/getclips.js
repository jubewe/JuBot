let j = require("../../../variables/j");
const _joinurlquery = require("../../_joinurlquery");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {string | array} id required *
 * @param {string} broadcaster_id required *
 * @param {string} game_id required *
 * @param {number} first optional - maximum number of clips (min: 1, max: 100, def: 20)
 * @param {date} started_at optional
 * @param {date} ended_at optional
 * @param {pagination} before optional
 * @param {pagination} after optional
 * @param {string} customtoken
 * @param {string} customclientid
 * @see https://dev.twitch.tv/docs/api/reference#get-clips
 */

async function getclips(id, broadcaster_id, game_id, first, started_at, ended_at, before, after, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        let nonarr = global.variables.varstatic.nonarr;
        let search_params = (!nonarr.includes(id) 
        ? _joinurlquery("id", (Array.isArray(id) ? id.map(i => {return i.replace(_regex.t_clip_urlreg(), "")}) 
        : [id.replace(_regex.t_clip_urlreg(), "")]), true) : !nonarr.includes(broadcaster_id) ? `?broadcaster_id=${broadcaster_id}` : !nonarr.includes(game_id) 
        ? `?game_id=${game_id}` : undefined);
        if(search_params){
            search_params += (!nonarr.includes(first) && _regex.numregex().test(first) ? `&first=${(first <= 0 ? 1 : (first > 100 ? 100 : first))}` : "");
            search_params += (!nonarr.includes(started_at) && new Date(started_at) instanceof Date ? `&started_at=${started_at}` : "");
            search_params += (!nonarr.includes(ended_at) && new Date(ended_at) instanceof Date ? `&ended_at=${ended_at}` : "");
            search_params += (!nonarr.includes(before) ? `&before=${before}` : "");
            search_params += (!nonarr.includes(after) ? `&after=${after}` : "")
            
            j.modules.request(`${j.urls().twitch.clip.get.url}${search_params}`, _requestopts(j.urls().twitch.clip.get.method, customtoken, customclientid), (e, r) => {
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

module.exports = getclips;