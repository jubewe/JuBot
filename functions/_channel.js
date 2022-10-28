const paths = require("../variables/paths");
const _rf = require("./_rf");
const _wf = require("./_wf");

async function channel(opt, id, key, value, noreturn){
    return new Promise((resolve, reject) => {
        if([null, undefined].includes(opt)) return reject({path:[0],msg:"no opt given"});
        if(![0].includes(opt) && !id) return reject({path:[1,0],msg:"no id given"});

        let channels = _rf(paths.channels, true);

        switch (opt) {
            case 0: {
                if(Object.keys(channels.channels).includes(id)){
                    if(key){
                        if(Object.keys(channels.channels[id]).includes(key)){
                            return resolve(channels.channels[id][key]);
                        } else {
                            if(noreturn) return resolve(undefined);
                            return reject({path:[opt,1,1,0],msg:"key not found in channel keys"});
                        }
                    } else {
                        return resolve(channels.channels[id]);
                    }
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"id not found in channels"});
                }
                break;
            }

            case 1: {
                if(!Object.keys(channels.channels).includes(id)){
                    channels.channels[id] = {};
                }
                if(key){
                    if(value){
                        channels.channels[id][key] = value;
                        _wf(paths.channels, channels);
                        return resolve();
                    } else {
                        return reject({path:[opt,1,1,0],msg:"value is undefined"});
                    }
                } else {
                    if(noreturn) return resolve();
                    return reject({path:[opt,1,0],msg:"key is undefined"});
                }
                break;
            }

            case 2: {
                if(Object.keys(channels.channels).includes(id)){
                    if(key){
                        if(Object.keys(channels.channels[id]).includes(key)){
                            delete channels.channels[id][key];
                            _wf(paths.channels, channels);
                            return resolve();
                        } else {
                            if(noreturn) return resolve(null);
                            return reject({path:[opt,1,1,0],msg:"key not found in channel"});
                        }
                    } else {
                        return reject({path:[opt,1,0],msg:"key is undefined"});
                    }
                } else {
                    return reject({path:[opt,0],msg:"id not found in channels"});
                }
                break;
            }
        }
    });
};

module.exports = channel;