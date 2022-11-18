const paths = require("../variables/paths");
const _appf = require("./_appf");
const _stackname = require("./_stackname");
const _wf = require("./_wf");

/**
 * 
 * @param {number} opt 
 * @param {object | undefined} j_ 
 * @param {boolean} noreturn 
 * @param {string | number} channelid 
 * @param {string} trackername 
 * @param {string | number} trackerstate 
 * @param {object} trackersettings
 * @returns {promise}
 */

async function customtracker(opt, j_, noreturn, channelid, trackername, trackerstate, trackersettings){
    return new Promise((resolve, reject) => {
        let j = require("../variables/j");
        channelid = channelid || j_.message.channel.id;

        let channels = j.files().channels;

        switch (opt) {
            case 0: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(Object.keys(channels.channels).includes(channelid)){
                    if(Object.keys(channels.channels[channelid]).includes("trackers")){
                        if(trackername){
                            if(Object.keys(channels.channels[channelid]["trackers"]).includes(trackername)){
                                return resolve(channels.channels[channelid]["trackers"][trackername]);
                            } else {
                                return reject({path:[opt,1,1,1,0],msg:"channel trackers do not include tracker"});
                            }
                        } else {
                            return resolve(channels.channels[channelid]["trackers"]);
                        }
                    } else {
                        if(trackername){
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,1,0],msg:"tracker not found - channel has no trackers"});
                        } else {
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,0],msg:"channel has no trackers"})
                        }
                    }
                } else {
                    return reject({path:[opt,0],msg:"channel not found"});
                }
                break;
            }

            case 1: {
                // add

                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!trackername) return reject({path:[opt,1,0],msg:"trackername is undefined"});

                if(!j.c().trackers.names.includes(trackername)){
                    return reject({path:[opt,1,1,0],msg:"trackername invalid (not found)"})
                }

                if(!Object.keys(channels.channels).includes(channelid)) channels.channels[channelid] = {};
                if(!Object.keys(channels.channels[channelid]).includes("trackers")) channels.channels[channelid]["trackers"] = {};

                let tracker = {
                    state: trackerstate || 1,
                    settings: trackersettings || {}
                };

                channels.channels[channelid]["trackers"][trackername] = tracker;
                
                _appf(paths.trackerlog, `\n${Date.now()} ${_stackname(0, "trackers", "add")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "trackers", "add")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)}`);
                
                _wf(paths.channels, j.files().channels);

                return resolve(tracker);
                break;
            }

            case 2: {
                // delete
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!trackername) return reject({path:[opt,1,0],msg:"trackername is undefined"});

                if(Object.keys(channels.channels[channelid]["trackers"]).includes(trackername)){
                    let tracker = channels.channels[channelid]["trackers"][trackername];
                    delete channels.channels[channelid]["trackers"][trackername];

                    _appf(paths.trackerlog, `\n${Date.now()} ${_stackname(0, "trackers", "delete")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)}`);
                    _appf(paths.log, `\n${Date.now()} ${_stackname(0, "trackers", "delete")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)}`);
                    
                    _wf(paths.channels, channels);
                    return resolve(tracker);
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"tracker not found"});
                }

                break;
            }

            case 3: {
                // state

                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!trackername) return reject({path:[opt,1,0],msg:"trackername is undefined"});

                if(Object.keys(channels.channels[channelid]["trackers"]).includes(trackername)){
                    let tracker = channels.channels[channelid]["trackers"][trackername];
                    let tracker_ = tracker;
                    
                    tracker.state = (!global.variables.varstatic.nonarr.includes(trackerstate) ? trackerstate : 1);

                    _appf(paths.trackerlog, `\n${Date.now()} ${_stackname(0, "trackers", "state")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)} ${JSON.stringify(tracker_)}`);
                    _appf(paths.log, `\n${Date.now()} ${_stackname(0, "trackers", "state")[0]} ${channelid} ${trackername} ${JSON.stringify(tracker)} ${JSON.stringify(tracker_)}`);

                    _wf(paths.channels, channels);
                    return resolve(tracker);
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"tracker not found"});
                }

                break;
            }
        }
    });
};

module.exports = customtracker;