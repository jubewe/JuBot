const request = require("request");
const _regex = require("../_regex");

/**
 * @param {string} user 
 */

async function getmodlookupuser(user){
    return new Promise(async (resolve, reject) => {
        if(!user) return reject({path:[0],msg:"user is undefined"});
        request(`${j.urls()["3v"].modlookup._base}${j.urls()["3v"].modlookup["user-v3"].replace(":user", user)}`, (e, r) => {
            if(e) return reject(e);
            if(!_regex.jsonreg().test(r.body)) return reject({path:[1,0],msg:"Could not parse response body as JSON"});
            let dat = JSON.parse(r.body);
            if(!dat.status == 200) return reject({path:[1,1,0],msg:"Response status is not OK", e:dat});
            return resolve(dat);
        })
    });
};

module.exports = getmodlookupuser;