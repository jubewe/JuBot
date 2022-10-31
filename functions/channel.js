const paths = require("../variables/paths");
const _rf = require("./_rf");
const _wf = require("./_wf");

/**
 * 
 * @param {number} opt 
 * @param {number} channel 
 * @param {string | null} key 
 * @param {string | null} value 
 * @param {boolean | undefined} return_ 
 * @returns 
 */

async function _channel(opt, channel, key, value, return_){
    return new Promise((resolve, reject) => {
        let chans = _rf(paths.channels, true);
        switch (opt){
            case 0: {
                if(channel){
                    if(Object.keys(chans).includes(channel)){
                        if(key){
                            if(Object.keys(chans[channel]).includes(key)){
                                return resolve(chans[channel][key]);
                            } else {
                                if(!return_) return resolve({});
                                return reject({"path":[opt,1,1,1,0],"msg":"keys of channel do not include key"});
                            }
                        } else {
                            if(!return_) return resolve(chans[channel]);
                            return reject({"path":[opt,1,1,0],"msg":"key is undefined"});
                        }
                    } else {
                        if(!return_) return resolve({});
                        return reject({"path":[opt,1,0],"msg":"keys of chans do not include channel"});
                    }
                } else {
                    if(!return_) return resolve(chans);
                    return reject({"path":[opt,0],"msg":"channel is undefined"});
                }

                break;
            }

            case 1: {
                if(channel){
                    if(Object.keys(chans).includes(channel)){
                        if(key){
                            if(value){
                                chans[channel][key] = value;
                                _wf(paths.channels, chans);
                                return resolve(true);
                            } else {
                                return reject({"path":[opt,1,1,1,0],"msg":"value is undefined"});
                            }
                        } else {
                            return reject({"path":[opt,1,1,0],"msg":"key is undefined"});
                        }
                    } else {
                        return reject({"path":[opt,1,0],"msg":"object keys of chans do not include channel"});
                    }
                } else {
                    return reject({"path":[opt,0],"msg":"channel is undefined"});
                }

                break;
            }

            default: {
                return reject({"path":[0],"msg":"option not found"});
            }
        }
    })
};

module.exports = _channel;