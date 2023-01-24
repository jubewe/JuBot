let files = require("../../variables/files");
let paths = require("../../variables/paths");
const _appf = require("../_appf");
const _stackname = require("../_stackname");
let j = require("../../variables/j");

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
        switch (opt) {
            case 0: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(Object.keys(files.channels.channels).includes(channelid)){
                    if(!Object.keys(files.channels.channels[channelid]).includes("notifications")){
                        files.channels.channels[channelid]["notifications"] = {};
                    }
                    if(notificationname){
                        if(Object.keys(files.channels.channels.notifications).includes(notificationname)){
                            return resolve(files.channels.channels[channelid].notifications);
                        } else {
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,0],msg:"notification not found in channel notifications"});
                        }
                    } else {
                        return resolve(files.channels.channels[channelid].notifications);
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

                if(!Object.keys(files.channels.channels).includes(channelid)){
                    files.channels.channels[channelid] = {};
                }
                if(!Object.keys(files.channels.channels[channelid]).includes("notifications")){
                    files.channels.channels[channelid]["notifications"] = {};
                }

                let notification = {
                    "state": (!global.variables.varstatic.nonarr.includes(notificationstate) ? notificationstate : 1) || 1,
                    "message": (!global.variables.varstatic.nonarr.includes(notificationmessage) ? notificationmessage : null) || null,
                    "settings": (!global.variables.varstatic.nonarr.includes(notificationsettings) ? notificationsettings : {}) || {}
                };

                files.channels.channels[channelid]["notifications"][notificationname] = notification;

                // _wf(paths.channels, files.channels);

                _appf(paths.notificationlog, `\n${Date.now()} ${_stackname(0, "notifications", "add")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "notifications", "add")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification)}`);

                return resolve(notification)
                break;
            }
            
            case 2: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(files.channels.channels).includes(channelid)){
                    files.channels.channels[channelid] = {};
                }
                if(!Object.keys(files.channels.channels[channelid]).includes("notifications")){
                    files.channels.channels[channelid]["notifications"] = {};
                }

                if(Object.keys(files.channels.channels[channelid]["notifications"]).includes(notificationname)){
                    let notification_ = files.channels.channels[channelid]["notifications"][notificationname];
                    delete files.channels.channels[channelid]["notifications"][notificationname];
                    
                    // _wf(paths.channels, files.channels);
                    
                    _appf(paths.notificationlog, `\n${Date.now()} ${_stackname(0, "notifications", "delete")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification_)}`);
                    _appf(paths.log, `\n${Date.now()} ${_stackname(0, "notifications", "delete")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification_)}`);

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

                if(!Object.keys(files.channels.channels).includes(channelid)){
                    files.channels.channels[channelid] = {};
                }
                if(!Object.keys(files.channels.channels[channelid]).includes("notifications")){
                    files.channels.channels[channelid]["notifications"] = {};
                }

                let notification_ = files.channels.channels[channelid]["notifications"][notificationname] || {};

                let notification = {
                    "state": (!global.variables.varstatic.nonarr.includes(notificationstate) ? notificationstate : notification_.state) || 1,
                    "message": (!global.variables.varstatic.nonarr.includes(notificationmessage) ? notificationmessage : notification_.message) || null,
                    "settings": (!global.variables.varstatic.nonarr.includes(notificationsettings) ? notificationsettings : notification_.settings) || {}
                };

                files.channels.channels[channelid]["notifications"][notificationname] = notification;
                
                // _wf(paths.channels, files.channels);

                _appf(paths.notificationlog, `\n${_stackname(0, "notifications", "update")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification)} ${JSON.stringify(notification_)}`);
                _appf(paths.log, `\n${_stackname(0, "notifications", "update")[0]} ${channelid} ${notificationname} ${JSON.stringify(notification)} ${JSON.stringify(notification_)}`);

                return resolve(notification);
                break;
            }

            case 4: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!notificationname) return reject({path:[opt,1,0],msg:"notificationname is undefined"});
                // if(!notificationmessage) return reject({path:[opt,1,1,0],msg:"notificationmessage is undefined"});
                if(!j.c().notifications.names.includes(notificationname)) return reject({path:[opt,1,1,1,0],msg:"invalid notification type"});
                notificationname = notificationname.toLowerCase();

                if(!Object.keys(files.channels.channels).includes(channelid)){
                    files.channels.channels[channelid] = {};
                }
                if(!Object.keys(files.channels.channels[channelid]).includes("notifications")){
                    files.channels.channels[channelid]["notifications"] = {};
                }

                if(!Object.keys(files.channels.channels[channelid]["notifications"]).includes(notificationname)){
                    return reject({path:[opt,0],msg:"notification not found"});
                }

                let notification_ = files.channels.channels[channelid]["notifications"][notificationname];

                let notification = {
                    "state": notificationstate,
                    "message": notification_.message,
                    "settings": notification_.settings
                };

                files.channels.channels[channelid]["notifications"][notificationname] = notification;

                // _wf(paths.channels, files.channels);

                _appf(paths.notificationlog, `\n${Date.now()} ${_stackname(0, "notifications", "state")[0]} ${channelid} ${notificationname} ${notificationstate} ${JSON.stringify(notification)} ${JSON.stringify(notification_)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "notifications", "state")[0]} ${channelid} ${notificationname} ${notificationstate} ${JSON.stringify(notification)} ${JSON.stringify(notification_)}`);
                
                return resolve(notification)
                break;
            }
        }
    });
};

module.exports = customnotification;