let files = require("../../variables/files");

async function _channel(opt, id, key, value, noreturn){
    return new Promise((resolve, reject) => {
        if([null, undefined].includes(opt)) return reject({path:[0],msg:"no opt given"});
        if(![0].includes(opt) && !id) return reject({path:[1,0],msg:"no id given"});

        switch (opt) {
            case 0: {
                if(Object.keys(files.channels.channels).includes(id)){
                    if(key){
                        if(Object.keys(files.channels.channels[id]).includes(key)){
                            return resolve(files.channels.channels[id][key]);
                        } else {
                            if(noreturn) return resolve(undefined);
                            return reject({path:[opt,1,1,0],msg:"key not found in channel keys"});
                        }
                    } else {
                        return resolve(files.channels.channels[id]);
                    }
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"id not found in channels"});
                }
                break;
            }

            case 1: {
                if(!Object.keys(files.channels.channels).includes(id)) files.channels.channels[id] = {};
                if(key){
                    if(value){
                        files.channels.channels[id][key] = value;
                        // _wf(paths.channels, files.channels);
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
                if(Object.keys(files.channels.channels).includes(id)){
                    if(key){
                        if(Object.keys(files.channels.channels[id]).includes(key)){
                            delete files.channels.channels[id][key];

                            // _wf(paths.channels, files.channels);
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

module.exports = _channel;