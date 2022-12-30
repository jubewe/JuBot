const getmodlookupuser = require("../other/getmodlookupuser");
const getuser = require("../twitch/getuser");

async function get_user_channels(username){
    return new Promise((resolve, reject) => {
        
        if(!username) return reject({path:[0],msg:"username is undefined"});
        getmodlookupuser(username)
        .then(async (m) => {
            let m2 = {
                modlookup_raw: m,
                modlookup_ids: [],
                modlookup: []
            };
            for(let m3 in m.channels){
                await getuser(1, m.channels[m3].name)
                .then(u => {
                    m2.modlookup_ids.push(u[1]);
                    m2.modlookup.push(u);
                })
                .catch();
            }
            
            return resolve(m2);
        })
        .catch(e => {
            return reject({path:[1,0],msg:"could not get modlookup", e:e});
        })
    });
};

module.exports = get_user_channels;