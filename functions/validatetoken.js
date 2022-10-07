const request = require("request");

/**
 * 
 * @param {string} token 
 * @returns {object} {client_id:"",login:"",scopes:[],user_id:"",expires_in:0}
 */

async function validatetoken(token){
    return new Promise(function(resolve, reject){
        request(`https://id.twitch.tv/oauth2/validate`, {headers: {"Authorization": `Bearer ${token}`}}, function(e, r){
            if(e){
                return reject(e);
            } else {
                let dat = JSON.parse(r.body);
                return resolve(dat);
            }
        })
    })
};

/**
 * 
 */

module.exports = validatetoken;