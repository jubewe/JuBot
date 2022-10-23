const paths = require("../variables/paths");
const _rf = require("./_rf");
const _wf = require("./_wf");
const c = require("../config.json");

async function _afk(amode, auserid, amsg, aopt, perm, areturn){
    return new Promise((resolve, reject) => {
        let afks = _rf(paths.afkusers, true);
        aopt = aopt || "AFK";

        switch (amode) {
            case 0: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
    
                if(Object.keys(afks.users).includes(auserid)){
                    return afks.users[auserid];
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
    
                afks.users[auserid] = {
                    "message":amsg,
                    "start":Date.now(),
                    "end":-1,
                    "type":0,
                    "opt":aopt
                };

                _wf(paths.afkusers, afks);

                return resolve(afks.users[auserid]);
    
                break;
            }

            case 2: {
                if(!auserid) return reject({"path":[amode,0],"msg":"No userid given"});
                if(Object.keys(afks.users).includes(auserid)){
                    afks.old[auserid] = afks.users[auserid];
                    afks.old[auserid].end = Date.now();
                    delete afks.users[auserid];

                    _wf(paths.afkusers, afks);

                    return resolve(afks.old[auserid]);
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
                if(Object.keys(afks.old).includes(auserid)){
                    if(Date.now()-afks.old[auserid].end > c.timeouts.afk.resume || perm.num >= c.perm.botdefault){
                        afks.old[auserid].start = Date.now();
                        afks.old[auserid].end = -1;
                        afks.old[auserid].type = 2;
                    } else {
                        afks.old[auserid].type = 1;
                    }
                    afks.users[auserid] = afks.old[auserid];
                    delete afks.old[auserid];

                    _wf(paths.afkusers, afks);

                    return resolve(afks.users[auserid]);
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