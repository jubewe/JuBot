const paths = require("../variables/paths");
const _wf = require("./_wf");

/**
 * 
 * @param {number} opt 
 * @param {object | undefined} j_ 
 * @param {boolean | null} noreturn 
 * @param {number | string} channelid 
 * @param {string} notificationname 
 * @param {string} notificationmessage 
 * @param {any} notificationsettings 
 * @param {0 | 1} notificationstate 
 * @returns {promise}
 */

async function customnotification(opt, j_, noreturn, channelid, notificationname, notificationmessage, notificationsettings, notificationstate){
    return new Promise((resolve, reject) => {
        let channels = j.files().channels;
        let j = require("../variables/j");
        switch (opt) {
            case 0: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(Object.keys(channels.channels).includes(channelid)){
                    if(!Object.keys(channels.channels[channelid]).includes("notifications")){
                        channels.channels[channelid]["notifications"] = {};
                    }
                    if(notificationname){
                        if(Object.keys(channels.channels.notifications).includes(notificationname)){
                            return resolve(channels.channels[channelid].notifications);
                        } else {
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,0],msg:"noitfication not found in channel notifications"});
                        }
                    } else {
                        return resolve(channels.channels[channelid].notifications);
                    }
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"channel not found"});
                }
                break;
            }
            case 1: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                // if(!notificationmessage) return reject({path:[opt,1,1,0],msg:"notificationmessage is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(channels.channels).includes(channelid)){
                    channels.channels[channelid] = {};
                }
                if(!Object.keys(channels.channels[channelid]).includes("notifications")){
                    channels.channels[channelid]["notifications"] = {};
                }

                let notification = {
                    "state": (!global.variables.varstatic.nonarr.includes(notificationstate) ? notificationstate : 1) || 1,
                    "message": (!global.variables.varstatic.nonarr.includes(notificationmessage) ? notificationmessage : null) || null,
                    "settings": (!global.variables.varstatic.nonarr.includes(notificationsettings) ? notificationsettings : {}) || {}
                };

                channels.channels[channelid]["notifications"][notificationname] = notification;

                _wf(paths.channels, channels);

                return resolve(notification)
                break;
            }
            case 2: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(channels.channels).includes(channelid)){
                    channels.channels[channelid] = {};
                }
                if(!Object.keys(channels.channels[channelid]).includes("notifications")){
                    channels.channels[channelid]["notifications"] = {};
                }

                if(Object.keys(channels.channels[channelid]["notifications"]).includes(notificationname)){
                    delete channels.channels[channelid]["notifications"][notificationname];
                    _wf(paths.channels, channels);

                    return resolve(true);
                } else {
                    if(noreturn) return resolve(null);
                    return reject({path:[opt,0],msg:"channel notifications do not include notification"});
                }
                break;
            }
            case 3: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                // if(!notificationmessage) return reject({path:[opt,1,1,0],msg:"notificationmessage is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(channels.channels).includes(channelid)){
                    channels.channels[channelid] = {};
                }
                if(!Object.keys(channels.channels[channelid]).includes("notifications")){
                    channels.channels[channelid]["notifications"] = {};
                }

                let notification_ = channels.channels[channelid]["notifications"][notificationname] || {};

                let notification = {
                    "state": (!global.variables.varstatic.nonarr.includes(notificationstate) ? notificationstate : notification_.state) || 1,
                    "message": (!global.variables.varstatic.nonarr.includes(notificationmessage) ? notificationmessage : notification_.message) || null,
                    "settings": (!global.variables.varstatic.nonarr.includes(notificationsettings) ? notificationsettings : notification_.settings) || {}
                };

                channels.channels[channelid]["notifications"][notificationname] = notification;

                _wf(paths.channels, channels);

                return resolve(notification)
                break;
            }
            case 4: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                // if(!notificationmessage) return reject({path:[opt,1,1,0],msg:"notificationmessage is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(channels.channels).includes(channelid)){
                    channels.channels[channelid] = {};
                }
                if(!Object.keys(channels.channels[channelid]).includes("notifications")){
                    channels.channels[channelid]["notifications"] = {};
                }

                if(!Object.keys(channels.channels[channelid]["notifications"]).includes(notificationname)){
                    return reject({path:[opt,0],msg:"notification not found"});
                }

                let notification_ = channels.channels[channelid]["notifications"][notificationname];

                let notification = {
                    "state": notificationstate,
                    "message": notification_.message,
                    "settings": notification_.settings
                };

                channels.channels[channelid]["notifications"][notificationname] = notification;

                _wf(paths.channels, channels);

                return resolve(notification)
                break;
            }
        }
    });
};

module.exports = customnotification;