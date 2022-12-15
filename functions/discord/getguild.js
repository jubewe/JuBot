const _regex = require("../_regex");

/**
 * @param {number} gumode 
 * @param {string} guinput 
 * @returns 
 */

async function getguild(gumode, guinput){
    return new Promise((resolve, reject) => {
        let j = require("../../variables/j");
        if(_regex.numregex().test(guinput)){
            // id
            j.dc.client.guilds.fetch(guinput)
            .then(g => {
                return resolve(g);
            })
            .catch(e => {
                return reject(e);
            })
        } else {
            return reject({path:[gumode],msg:"getting guilds by name is not supported"});
        }
    });
};

module.exports = getguild;