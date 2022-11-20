const gettoken = require("./gettoken");
const revoketoken = require("./revoketoken");
const validatetoken = require("./validatetoken");

/**
 * 
 * @param {number} topt 
 * @param {string | undefined} ttoken 
 * @param {boolean | undefined} treturn 
 * @returns 
 */

async function token(topt, ttoken, tclientid, treturn){
    return new Promise((resolve, reject) => {
        // 0 = get token, 1 = get valid, 2 = get scopes, 3 = validate, 4 = revoke
    
        switch (topt) {
            case 0: 
            case 2: {
                gettoken(ttoken)
                .then(t => {
                    if(topt === 0){
                        return resolve(t);
                    } else if(topt === 2){
                        return resolve(t.scopes);
                    }
                })
                .catch(e => {
                    console.error(e);
                    return reject(e);
                })
                
                break;
            }
            
            case 1: {
                gettoken(ttoken)
                .then(t => {
                    if(t.expires_in && t.expires_in > 0){
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                })
                .catch(e => {
                    console.error(new Error(e));
                    if(!treturn) {
                        return resolve(false);
                    }
                    return reject(e);
                })
                
                break;
            }

            case 3: {
                validatetoken(ttoken)
                .then(t => {
                    return resolve(t);
                })
                .catch(e => {
                    return reject(e);
                })
                
                break;
            }

            case 4: {
                revoketoken(ttoken, tclientid)
                .then(t => {
                    return resolve(t);
                })
                .catch(e => {
                    return reject(e);
                })
            }
        }
    })
};

module.exports = token;