let files = require("../../variables/files");

async function _trackers(opt, channelid, trackername, trackerkey, trackerstate){
    return new Promise((resolve, reject) => {
        if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
        if(!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
        switch (opt) {
            case 0: {
                if(!trackername){
                    if(files.channels.channels.trackers){
                        return resolve(files.channels.channels[channelid].trackers);
                    } 
                    return reject({path:[opt,1,0],msg:"no trackers found in channel"});
                } else {
                    if(!files.channels.channels[channelid].trackers) files.channels.channels[channelid].trackers = {};
                    if(files.channels.channels[channelid].trackers[trackername]){
                        if(trackerkey){
                            if(files.channels.channels[channelid].trackers[trackername][trackerkey]){
                                return resolve(files.channels.channels[channelid].trackers[trackername]);
                            } 
                            return reject({path:[opt,1,1,0],msg:"trackerkey not found in tracker"});
                        }
                        return resolve(files.channels.channels[channelid].trackers[trackername]);
                    } 
                    return reject({path:[opt,1,0],msg:"tracker not found"});
                }

                break;
            }

            case 1: {
                if(!trackername) return reject({path:[opt,0],msg:"trackername is undefined"});

                files.channels.channels[channelid].trackers[trackername] = {
                    state: trackerstate || 1
                };

                // _wf(paths.channels, chanfiles.channelsnels);

                return resolve(files.channels.channels[channelid].trackers[trackername]);
                break;
            }
        }
    });
};

module.exports = _trackers;