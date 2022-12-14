const c = require("../config.json");
let j = require("../variables/j");

async function _afk(amode, j_, auserid, amsg, aopt, perm, areturn){
    return new Promise((resolve, reject) => {
        aopt = aopt || "AFK";
        auserid = auserid ?? j_.message.userstate.id;

        switch (amode) {
            case 0: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
    
                if(Object.keys(j.files().afkusers.users).includes(auserid)){
                    return j.files().afkusers.users[auserid];
                } else {
                    if(!areturn){
                        return resolve({});
                    } 
                    return reject({"path":[amode,1,0],"msg":"user not found"});
                }
    
                break;
            }
    
            case 1: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
                amsg = (amsg ? amsg : "");
    
                j.files().afkusers.users[auserid] = {
                    "message":amsg,
                    "start":Date.now(),
                    "end":-1,
                    "type":0,
                    "opt":aopt
                };

                // _wf(paths.afkusers, j.files().afkusers);

                return resolve(j.files().afkusers.users[auserid]);
    
                break;
            }

            case 2: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
                if(Object.keys(j.files().afkusers.users).includes(auserid)){
                    j.files().afkusers.old[auserid] = j.files().afkusers.users[auserid];
                    j.files().afkusers.old[auserid].end = Date.now();
                    delete j.files().afkusers.users[auserid];

                    // _wf(paths.afkusers, j.files().afkusers);

                    return resolve(j.files().afkusers.old[auserid]);
                } else {
                    if(areturn){
                        return resolve({});
                    } 
                    return reject({"path":[amode,1,0],"msg":"user not found"});
                }

                break;
            }

            case 3: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
                if(Object.keys(j.files().afkusers.old).includes(auserid)){
                    if(Date.now()-j.files().afkusers.old[auserid].end > c.timeouts.afk.resume && !j_.message._.userperms._default){
                        j.files().afkusers.old[auserid].start = Date.now();
                        j.files().afkusers.old[auserid].end = -1;
                        j.files().afkusers.old[auserid].type = 2;
                    } else {
                        j.files().afkusers.old[auserid].type = 1;
                    }
                    j.files().afkusers.users[auserid] = j.files().afkusers.old[auserid];
                    delete j.files().afkusers.old[auserid];

                    // _wf(paths.afkusers, j.files().afkusers);

                    return resolve(j.files().afkusers.users[auserid]);
                } else {
                    if(!areturn){
                        return resolve({});
                    } 
                    return reject({"path":[amode,1,0],"msg":"user not found"});
                }
            }
        }
    })
};

module.exports = _afk;