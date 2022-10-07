const paths = require("../variables/paths");
const getuser = require("./getuser");
const _executetimers = require("./_executetimers");
const _id = require("./_id");
const _syncfile = require("./_syncfile");
const _wf = require("./_wf");

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
        /**
         * get, set, delete
         */
        let tfile = _syncfile(5, paths.timers)
        if(!tmode) return reject({"path":[tmode,0],"msg":"tmode is undefined"});
        if([1].includes(tmode) && !tuser) return reject({"path":[tmode,1,0],"msg":"tuser is undefined"});
        if([1].includes(tmode) && !targ2) return reject({"path":[tmode,1,1,0],"msg":"targ2 is undefined"});
        if([1].includes(tmode) && !targ3) return reject({"path":[tmode,1,1,1,0],"msg":"targ3 is undefined"});

        switch (tmode) {
            case 0: {
                if(targ){
                    if(tfile.ids.includes(targ)){
                        return resolve(tfile.ids[targ]);
                    } else {
                        if(!treturn){
                            return resolve();
                        } 
                        return reject({"path":[tmode,1,0],"msg":"targ not found in timers.ids"});
                    }
                } else if(tuser){
                    if(Object.keys(tfile.users).includes(tuser)){
                        return resolve(tfile.users[tuser]);
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
                            tfile.ids[i[1].toString()] = {
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

                            if(!tfile.users[tuser] || !Array.isArray(tfile.users[tuser])){
                                tfile.users[tuser] = [];
                            };

                            tfile.users[tuser].push(i[1]);

                            _wf(paths.timers, tfile);

                            _executetimers(i[1]);

                            return resolve(tfile.ids[i[1]])
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

                if(Object.keys(tfile.ids).includes(targ)){
                    delete tfile.ids[targ];

                    _wf(paths.timers, tfile);

                    return resolve();
                } else {
                    if(!treturn){
                        return resolve();
                    }
                    return reject({"path":[tmode,0,0],"msg":"targ not found in tfile.ids"});
                }

                break;
            }

            default: {
                return reject({"path":[0],"msg":"tmode not found"});
            }
        }
    });
};

// _timer(1, "263830208", "1664257470270", "test", "jubewe", false)
// .then(t => {
//     console.log(t);
// })
// .catch(e => {
//     console.error(e);
// })

module.exports = _timer;