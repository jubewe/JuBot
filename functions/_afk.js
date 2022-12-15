async function _afk(amode, j_, auserid, amsg, aopt, perm, areturn){
    return new Promise((resolve, reject) => {
        let c = require("../config.json");
        let j = require("../variables/j");
        let files = require("../variables/files");
        aopt = aopt || "AFK";
        auserid = auserid ?? j_.message.userstate.id;

        switch (amode) {
            case 0: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
    
                if(Object.keys(files.afkusers.users).includes(auserid)){
                    return files.afkusers.users[auserid];
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
    
                files.afkusers.users[auserid] = {
                    "message":amsg,
                    "start":Date.now(),
                    "end":-1,
                    "type":0,
                    "opt":aopt
                };

                // _wf(paths.afkusers, j.files().afkusers);

                return resolve(files.afkusers.users[auserid]);
    
                break;
            }

            case 2: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
                if(Object.keys(files.afkusers.users).includes(auserid)){
                    files.afkusers.old[auserid] = files.afkusers.users[auserid];
                    files.afkusers.old[auserid].end = Date.now();
                    delete files.afkusers.users[auserid];

                    // _wf(paths.afkusers, j.files().afkusers);

                    return resolve(files.afkusers.old[auserid]);
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
                if(Object.keys(files.afkusers.old).includes(auserid)){
                    if(Date.now()-files.afkusers.old[auserid].end > c.timeouts.afk.resume && !j_.message._.userperms._default){
                        files.afkusers.old[auserid].start = Date.now();
                        files.afkusers.old[auserid].end = -1;
                        files.afkusers.old[auserid].type = 2;
                    } else {
                        files.afkusers.old[auserid].type = 1;
                    }
                    files.afkusers.users[auserid] = files.afkusers.old[auserid];
                    delete files.afkusers.old[auserid];

                    // _wf(paths.afkusers, j.files().afkusers);

                    return resolve(files.afkusers.users[auserid]);
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