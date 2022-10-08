const paths = require("../variables/paths");
const token = require("./token");
const _rf = require("./_rf");
const _wf = require("./_wf");
const { nonarr } = require("../variables/varstatic");

/**
 * 
 * @param {number} uopt 
 * @param {number} uid 
 * @param {string} utoken 
 * @param {boolean} ureturn 
 * @returns {promise}
 */

async function _usertoken(uopt, uid, utoken, ureturn){
    return new Promise(function(resolve, reject){
        // 0 = get, 1 = set, 2 = delete, 3 = revoke
        uid = (!nonarr.includes(uid) ? uid.toString() : undefined);
        let usertokens = _rf(paths.usertokens, true);
        switch (uopt) {
            case 0: {
                if(!uid) return reject({path:[uopt,0],msg:"uid is undefined"});
                if(Object.keys(usertokens.users).includes(uid)){
                    return resolve(usertokens.users[uid]);
                } else {
                    if(!ureturn){
                        return resolve(null);
                    }
                    return reject({path:[uopt,1,0],msg:"usertokens do not include uid"});
                }

                break;
            }

            case 1: {
                // if(!uid) return reject({path:[uopt,0],msg:"uid is undefined"});
                if(!utoken) return reject({path:[uopt,1,0],msg:"utoken is undefined"});

                token(3, utoken)
                .then(t => {
                    usertokens.users[t.user_id] = {
                        "token":utoken,
                        "client_id":t.client_id,
                        "scopes":t.scopes,
                        "expires_in":t.expires_in,
                        "exp_time":(Date.now() + t.expires_in),
                        "add_time":Date.now()
                    };

                    _wf(paths.usertokens, usertokens);

                    return resolve(usertokens.users[t.user_id]);
                })
                .catch(e => {
                    console.error(new Error(e));
                    return reject({path:[uopt,1,1,0],msg:"could not recieve tokeninfo"});
                })

                break;
            }

            case 2: {
                if(!uid) return reject({path:[uopt,0],msg:"uid is undefined"});

                if(Object.keys(usertokens.users).includes(uid)){
                    delete usertokens.users[uid];

                    _wf(paths.usertokens, usertokens);

                    return resolve(usertokens.users[uid]);
                } else {
                    return reject({path:[uopt,1,0],msg:"usertokens do not include uid"});
                }

                break;
            }

            case 3: {
                if(!uid) return reject({path:[uopt,0],msg:"uid is undefined"});

                if(Object.keys(usertokens.users).includes(uid)){
                    let ut = usertokens.users[uid];
                    token(4, ut.token, ut.client_id)
                    .then(t => {
                        delete usertokens.users[uid];
                        
                        _wf(paths.usertokens, usertokens);

                        return resolve(null);
                    })
                    .catch(e => {
                        return reject(e);
                    })
                } else {
                    return reject({path:[uopt,1,0],msg:"usertokens do not include uid"});
                }

                break;
            }
        }
    })
};

module.exports = _usertoken;