const request = require("request");
let { nonarr } = require("../variables/varstatic");
const requestopts = require("./_requestopts");

async function getuserbyid(gubiuserid){
    return new Promise(function(resolve, reject){
        request(`https://api.twitch.tv/helix/users?id=${gubiuserid}`, requestopts("GET", 0), function(e, r){
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
                    return resolve(dat.data[0].login)
                }
            }
        })
    })
};

module.exports = getuserbyid;