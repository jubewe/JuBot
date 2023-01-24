const request = require("request");

/**
 * 
 * @param {string} token 
 */

async function revoketoken(token, client_id){
    return new Promise(function(resolve, reject){
        if(!token) return reject({path:[0],msg:"token is undefined"});

        request.post(`https://id.twitch.tv/oauth2/revoke`, {headers: {"Content-Type":"application/x-www-form-urlencoded"}, form: `client_id=${client_id}&token=${token}`}, function(e, r){
            if(e){
                return reject(e);
            } else {
                return resolve(r.body);
            }
        })
    })
};

module.exports = revoketoken;