const request = require("request");
const _requestopts = require("../_requestopts");

/**
 * @param {string} chtoken 
 * @readonly {client_id:"",login:"",scopes:[],user_id:"",expires_in:0}
 */

async function gettoken(chtoken){
    return new Promise(function(resolve, reject){
        if(!chtoken) return reject({path:[0],msg:"chtoken is undefined"});
        request("https://id.twitch.tv/oauth2/validate", _requestopts("GET", chtoken.toLowerCase().replace("oauth:", "")), function(e, r){
            if(e){
                return reject(e);
            } else {
                let dat = JSON.parse(r.body);
                if(dat.error || dat.status){
                    return reject(dat);
                } else {
                    return resolve(dat);
                }
            }
        })
    })
};

module.exports = gettoken;