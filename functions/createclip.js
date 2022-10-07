const request = require("request");
const _requestopts = require("./_requestopts");

async function createclip(broadcaster_id, token, client_id){
    return new Promise(function(resolve, reject){
        request(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcaster_id}`, _requestopts("POST", token, client_id), function(e, r){
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