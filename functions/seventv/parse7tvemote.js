const varnames = require("../../variables/varnames");
const cache = require("../cache");

async function parse7tvemote(emotes, channel){
    return new Promise(function(resolve, reject){
        if(!emotes) return reject({"path":[emoteopt,0],"msg":"emotes is undefined"});
        emotes = [...emotes];
        let emoteurls = [...emotes.filter((e, i) => {return e.startsWith("https://7tv.app/emotes/");})];
        emotes = [...emotes.filter((e, i) => {return !e.startsWith("https://7tv.app/emotes/");})];
        
        // if(emoteurls.length > 0){
        //     [...emoteurls].forEach(em => {
        //         p.modules.request(em, function(e, r){
        //             if(e){
        //                 return reject(new Error(e));
        //             } else {

        //             }
        //         })
        //     })
        // }

        if(emotes.length > 0){
            cache(0, varnames.cache.seventv.v2.channel.emotes(channel))
            .then(seventvemotes => {
                let emotes7tv = seventvemotes.data;
                let emotenames7tv = {};
                Object.keys(emotes7tv).forEach(e2 => {
                    emotenames7tv[emotes7tv[e2]["name"]]=emotes7tv[e2];
                });
                let add_emotes = {};
                [...emotes].forEach(e => {
                    if(Object.keys(emotenames7tv).includes(e)){
                        add_emotes[e] = emotenames7tv[e];
                    }
                });
                return resolve(add_emotes);
            })
            .catch(e => {
                console.error(new Error(e));
                return reject(new Error(e));
            })
        }
    })
};

module.exports = parse7tvemote;