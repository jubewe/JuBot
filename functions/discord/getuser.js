const getuserbyid = require("./getuserbyid");
const _regex = require("../_regex");

/**
 * @param {number} gumode 
 * @param {string} guinput 
 * @returns 
 */

async function getuser(gumode, guinput){
    return new Promise((resolve, reject) => {
        let files = require("../../variables/files");
        if(_regex.numregex().test(guinput)){
            // id
            if(files.discord.userids.ids[guinput]){
                if(gumode === 0) return resolve({path:[gumode,1,1],msg:"user found"});
                return resolve(files.discord.userids.ids[guinput]);
            } else {
                if(gumode === 0) return reject({path:[gumode,0],msg:"user not found by id"});
                getuserbyid(guinput, false)
                .then(u => {
                    return resolve(u);
                })
                .catch(e => {
                    return reject({path:[gumode,1,0,0],msg:"could not request user"});
                })
            }
        } else {
            return reject({path:[gumode],msg:"getting users by name is not supported"});
        }
    });
};

module.exports = getuser