const urls = require("../../../variables/urls");
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
        let search_params = ((id ?? undefined) 
        ? _joinurlquery("id", (Array.isArray(id) ? id.map(i => {return i.replace(_regex.t_clip_urlreg(), "")}) 
        : [id.replace(_regex.t_clip_urlreg(), "")]), true) : (broadcaster_id ?? undefined) ? `?broadcaster_id=${broadcaster_id}` : 
        (game_id ?? undefined) ? `?game_id=${game_id}` : undefined);
        if(search_params){
            search_params += ((first ?? undefined) && _regex.numregex().test(first) ? `&first=${(first <= 0 ? 1 : (first > 100 ? 100 : first))}` : "");
            search_params += ((started_at ?? undefined) && new Date(started_at) instanceof Date ? `&started_at=${started_at}` : "");
            search_params += ((ended_at ?? undefined) && new Date(ended_at) instanceof Date ? `&ended_at=${ended_at}` : "");
            search_params += ((before ?? undefined) ? `&before=${before}` : "");
            search_params += ((after ?? undefined) ? `&after=${after}` : "")
            
            j.modules.request(`${j.urls().twitch.clip.get.url}${search_params}`, _requestopts(urls.twitch.clip.get.method, customtoken, customclientid), (e, r) => {
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