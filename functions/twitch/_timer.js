let files = require("../../variables/files");
const getuser = require("./getuser");
const executetimers = require("./executetimers");
const _id = require("./_id");

/**
 * 
 * @param {number} tmode 
 * @param {number} tuser 
 * @param {number | string} targ id or time
 * @param {string} targ2 message
 * @param {string} targ3 channelname
 * @param {boolean} treturn
 * @returns 
 */

async function _timer(tmode, tuser, targ, targ2, targ3, treturn){
    return new Promise(function(resolve, reject){
        if(!tmode) return reject({"path":[tmode,0],"msg":"tmode is undefined"});
        if([1].includes(tmode) && !tuser) return reject({"path":[tmode,1,0],"msg":"tuser is undefined"});
        if([1].includes(tmode) && !targ2) return reject({"path":[tmode,1,1,0],"msg":"targ2 is undefined"});
        if([1].includes(tmode) && !targ3) return reject({"path":[tmode,1,1,1,0],"msg":"targ3 is undefined"});

        switch (tmode) {
            case 0: {
                if(targ){
                    if(files.timers.ids.includes(targ)){
                        return resolve(files.timers.ids[targ]);
                    } else {
                        if(!treturn){
                            return resolve();
                        } 
                        return reject({"path":[tmode,1,0],"msg":"targ not found in timers.ids"});
                    }
                } else if(tuser){
                    if(Object.keys(files.timers.users).includes(tuser)){
                        return resolve(files.timers.users[tuser]);
                    } else {
                        if(!treturn){
                            return resolve();
                        } 
                        return reject({"path":[tmode,0,0],"msg":"tuser not found in timers.users"});
                    }
                }

                break;
            }

            case 1: {
                getuser(1, targ3)
                .then(ch => {
                    getuser(1, tuser)
                    .then(u => {
                        _id(1, "timers", null, "timers")
                        .then(i => {
                            files.timers.ids[i[1].toString()] = {
                                "id":i[1].toString(),
                                "set_time":Date.now().toString(),
                                "channel":{
                                    "name":ch[0],
                                    "id":ch[1]
                                },
                                "time":Date.now()+targ,
                                "message":targ2,
                                "user":{
                                    "name":u[0],
                                    "id":u[1]
                                }
                            };

                            if(!files.timers.users[tuser] || !Array.isArray(files.timers.users[tuser])){
                                files.timers.users[tuser] = [];
                            };

                            files.timers.users[tuser].push(i[1]);

                            // _wf(paths.timers, files.timers);

                            executetimers(i[1]);

                            return resolve(files.timers.ids[i[1]])
                        })
                        .catch(e => {
                            throw e;
                        })
                    })
                    .catch(e => {
                        throw e;
                    })
                })
                .catch(e => {
                    throw e;
                })

                break;
            }

            case 2: {
                if(!targ) return reject({"path":[tmode,0],"msg":"targ is undefined"});

                if(Object.keys(files.timers.ids).includes(targ)){
                    delete files.timers.ids[targ];

                    // _wf(paths.timers, files.timers);

                    return resolve();
                } else {
                    if(!treturn){
                        return resolve();
                    }
                    return reject({"path":[tmode,0,0],"msg":"targ not found in timers.ids"});
                }

                break;
            }

            default: {
                return reject({"path":[0],"msg":"tmode not found"});
            }
        }
    });
};

module.exports = _timer;