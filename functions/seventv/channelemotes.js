const request = require("request");
const j = require("../../variables/j");
const urls = require("../../variables/urls");
const varnames = require("../../variables/varnames");
const cache = require("../cache");

async function seventvchannelemotes(channel, ){
    return new Promise((resolve, reject) => {
        let seventvurl = urls.seventv.v2.channel.emotes.replace("${channel}", channel);
        cache(0, varnames.seventv.v2.channel.emotes(channel))
        .then(c => {
            if(Date.now() - c._cache.add_time <= j.c().timeouts.cache){
                request_();
            } else {
                return resolve(c.data);
            }
        })
        .catch(e => {
            request_();
        })
        

        function request_(){
            request(seventvurl, {method: "GET"}, function(e, r){
                if(e){
                    return reject(new Error(e));
                } else {
                    let dat = JSON.parse(r.body);
                    if(!dat.error){
                        cache(1, varnames.seventv.v2.channel.emotes(channel), dat);
                        return resolve(dat);
                    } else {
                        return reject(dat);
                    }
                }
            });
        }
    });
};

module.exports = seventvchannelemotes;