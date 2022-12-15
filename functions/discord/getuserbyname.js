/**
 * @param {string} username 
 * @param {boolean} noreturn 
 * @returns 
 */

async function getuserbyname(username, noreturn){
    return new Promise((resolve, reject) => {
        if(noreturn) return resolve({e:{path:[0],msg:"cannot get user by tag yet"}});
        return reject({path:[0],msg:"cannot get user by tag yet"});
    });
};

module.exports = getuserbyname;