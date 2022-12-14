let j = require("../../../variables/j");
const _joinurlquery = require("../../_joinurlquery");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * 
 * @param {string | array} id required*
 * @param {string | array} broadcaster_id required*
 * @param {string | array} game_id required*
 * @param {string | array} language optional
 * @param {string} period optional
 * @param {string} sort optional
 * @param {string} type optional
 * @param {number} first optional - maximum number of videos (min: 1, max: 100, def: 20)
 * @param {string} after optional
 * @param {string} before optional
 * @param {string} customtoken optional
 * @param {string} customclientid optional
 * @see https://dev.twitch.tv/docs/api/reference#get-videos
 */

async function getvideos(id, broadcaster_id, game_id, language, period, sort, type, first, after, before, customtoken, customclientid){
    return new Promise((resolve, reject) => {
        let nonarr = global.variables.varstatic.nonarr;
        let search_params = (!nonarr.includes(id) ? _joinurlquery("id", (Array.isArray(id) ? id.map(i => {return i.replace(_regex.t_clip_urlreg(), "")}) : [id.replace(_regex.t_clip_urlreg(), "")]), true) : !nonarr.includes(broadcaster_id) ? `?broadcaster_id=${broadcaster_id}` : !nonarr.includes(game_id) ? `?game_id=${game_id}` : undefined);
        
        if(search_params){
            search_params += (!nonarr.includes(first) && _regex.numregex().test(first) ? `&first=${(first <= 0 ? 1 : (first > 100 ? 100 : first))}` : "");
            search_params += (!nonarr.includes(language) ? `&language=${language}` : "");
            search_params += (!nonarr.includes(period) && _regex.t_url_param_period().test(period) ? `&period=${period}` : "");
            search_params += (!nonarr.includes(sort) && _regex.t_url_param_sort().test(sort) ? `&sort=${sort}` : "");
            search_params += (!nonarr.includes(type) && _regex.t_url_param_type().test(type) ? `&type=${type}` : "");
            search_params += (!nonarr.includes(before) ? `&before=${before}` : "");
            search_params += (!nonarr.includes(after) ? `&after=${after}` : "");
            // search_params += (!nonarr.includes(aaaaa) ? `&aaaaa=${aaaaa}` : "");

            j.modules.request(`${j.urls().twitch.video.get.url}${search_params}`, _requestopts(j.urls().twitch.video.get.method, customtoken, customclientid), (e, r) => {
                if(e){
                    return reject(e);
                } else {
                    let dat = JSON.parse(r.body);

                    if(dat.data){
                        return resolve(dat.data)
                    } else {
                        return reject(dat);
                    }
                }
            })
        } else {
            return reject({path:[0],msg:"no of the required params given"});
        }
    });
};

module.exports = getvideos;