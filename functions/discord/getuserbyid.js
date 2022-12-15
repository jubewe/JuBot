let files = require("../../variables/files");

/**
 * @param {string} userid 
 * @param {boolean} noreturn 
 * @returns 
 */

async function getuserbyid(userid, noreturn){
    return new Promise((resolve, reject) => {
        let j = require("../../variables/j");
        try {
            let u = j.dc.client.users.cache.get(userid.toString());
            files.discord.userids.names[encodeURI(u.username)] = u.id;
            files.discord.userids.ids[u.id] = encodeURI(u.username);
            return resolve([encodeURI(u.username), u.id, u]);
        } catch(e) {
            console.error(new Error(e));
            if(noreturn) return resolve({e:e});
            return reject(e);
        };
    });
};

module.exports = getuserbyid;