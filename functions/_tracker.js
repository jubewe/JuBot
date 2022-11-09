const files = require("../variables/files");
const paths = require("../variables/paths");
const _wf = require("./_wf");

async function _trackers(opt, channelid, trackername, trackerkey, trackerstate){
    return new Promise((resolve, reject) => {
        let channels = files.channels;
        if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
        if(!channels.channels[channelid]) channels.channels[channelid] = {};
        switch (opt) {
            case 0: {
                if(!trackername){
                    if(channels.channels.trackers){
                        return resolve(channels.channels[channelid].trackers);
                    } 
                    return reject({path:[opt,1,0],msg:"no trackers found in channel"});
                } else {
                    if(!channels.channels[channelid].trackers) channels.channels[channelid].trackers = {};
                    if(channels.channels[channelid].trackers[trackername]){
                        if(trackerkey){
                            if(channels.channels[channelid].trackers[trackername][trackerkey]){
                                return resolve(channels.channels[channelid].trackers[trackername]);
                            } 
                            return reject({path:[opt,1,1,0],msg:"trackerkey not found in tracker"});
                        }
                        return resolve(channels.channels[channelid].trackers[trackername]);
                    } 
                    return reject({path:[opt,1,0],msg:"tracker not found"});
                }

                break;
            }

            case 1: {
                if(!trackername) return reject({path:[opt,0],msg:"trackername is undefined"});

                channels.channels[channelid].trackers[trackername] = {
                    state: trackerstate || 1
                };

                _wf(paths.channels, channels);

                return resolve(channels.channels[channelid].trackers[trackername]);
                break;
            }

            case 2: {

                break;
            }
        }
    });
};

module.exports = _trackers;