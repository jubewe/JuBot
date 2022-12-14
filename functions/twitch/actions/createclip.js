let j = require("../../../variables/j");
const urls = require("../../../variables/urls");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");

/**
 * @param {number} broadcaster_id 
 * @param {string | undefined} customtoken 
 * @param {string |undefined} customclientid 
 * @see https://api.twitch.tv/helix/clips
*/

async function createclip(broadcaster_id, customtoken, customclientid){
    return new Promise(function(resolve, reject){
        if(global.variables.varstatic.nonarr.includes(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is undefined"});
        if(!_regex.numregex().test(broadcaster_id)) return reject({path:[0],msg:"broadcaster_id is does not match number regex"});

        let reqheaders = {
            ..._requestopts(urls.twitch.clip.create.method, customtoken || undefined, customclientid || undefined), 
        };

        j.modules.request.post(`${urls.twitch.clip.create.url}?broadcaster_id=${broadcaster_id}`, reqheaders, (e, r) => {
            if(e){
                return reject(e);
            } else {
                let dat = JSON.parse(r.body);
                if(dat.error || dat.status || dat.data.length === 0){
                    return reject(dat);
                } 
                return resolve(dat.data[0]);
            }
        })
    })
};

module.exports = createclip;