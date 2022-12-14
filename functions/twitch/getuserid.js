const request = require("request");
let { nonarr, replacer } = require("../../variables/varstatic");
const _requestopts = require("../_requestopts");

async function getuserid(gusidusername){
    return new Promise(function(resolve, reject){
        if(isNaN(gusidusername)){
            request(`https://api.twitch.tv/helix/users?login=${gusidusername.replace(replacer, "")}`, _requestopts("GET", null), function(e, r){
                if(e){
                    return reject("0 " + e)
                } else {
                    let dat = JSON.parse(r.body)
                    // console.log(dat)
                    if(r.body.length < 60){
                        return reject("1 " + r.body)
                    } else if(!nonarr.includes(dat.error)){
                        return reject("2 " + r.body)
                    } else if(dat.data[0].length === 0){
                        return reject("3 " + r.body)
                    } else {
                        return resolve(dat.data[0].id)
                    }
                }
            })
        } else {
            return reject("0");
        }
    })
};

module.exports = getuserid;