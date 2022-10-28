const paths = require("../variables/paths");
const { nonarr } = require("../variables/varstatic");
const _id = require("./_id");
const _nonarr = require("./_nonarr");
const _rf = require("./_rf");
const _wf = require("./_wf");

/**
 * 
 * @param {number} opt 
 * @param {object} j 
 * @param {boolean | null} noreturn 
 * @param {number | null} channelid 
 * @param {string | null} commandid 
 * @param {string} commandname 
 * @param {string} commandresponse 
 * @param {array} commandaliases 
 * @param {0 | 1} commandstate 
 * @param {number | string} commandpermission 
 * @param {number} commandcooldown 
 * @param {number} commandcooldownuser 
 * @returns {promise}
 */

async function customcommand(opt, j, noreturn, channelid, commandid, commandname, commandresponse, commandaliases, commandstate, commandpermission, commandcooldown, commandcooldownuser){
    return new Promise((resolve, reject) => {
        if(nonarr.includes(opt)) return reject({path:[0],msg:"opt is undefined"});
        j = j || require("../variables/j");

        let permissions = _rf(paths.permissions, true);

        channelid = _nonarr(channelid, j.message.channel.id);
        commandaliases = _nonarr(commandaliases, []);
        commandstate = _nonarr(commandstate, 1);
        commandpermission = _nonarr(commandpermission, "10");
        commandcooldown = _nonarr(commandcooldown, 10000);
        commandcooldownuser = _nonarr(commandcooldownuser, 30000);
        if(isNaN(commandpermission)){
            let commandpermission_ = Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === commandpermission || k[1].includes(commandpermission))});
            if(!commandpermission_){
                commandpermission = "10";
            } else {
                commandpermission = commandpermission_[0][0];
            }
        }

        let channels = _rf(paths.channels, true);
        switch (opt){
            case 0: {
                if(Object.keys(channels.channels).includes(channelid)){
                    if(Object.keys(channels.channels[channelid]).includes("commands")){
                        if(commandid){
                            if(Object.keys(channels.channels[channelid]["commands"]).includes(commandid)){
                                return resolve(channels.channels[channelid]["commands"][commandid]);
                            } else {
                                return reject({path:[opt,1,1,1,0],msg:"command not found by id"});
                            }
                        } else if(commandname){
                            if(getcommandidbyname()){
                                return resolve(channels.channels[channelid]["commands"][getcommandidbyname()])
                            } else {
                                return reject({path:[opt,1,1,1,0],msg:"command not found by name"});
                            }
                        } else {
                            return resolve(channels.channels[channelid]["commands"]);
                        }
                    } else {
                        if(noreturn) return resolve({});
                        return reject({path:[opt,1,0],msg:"channel keys do not include commands"});
                    }
                } else {
                    return reject({path:[opt,0],msg:"channels do not include channelid"});
                }
                break;
            }

            case 1: {
                if(!commandname) return reject({path:[opt,0],msg:"commandname is undefined"});
                if(!commandresponse) return reject({path:[opt,1,0],msg:"commandresponse is undefined"});
                if(j.c().commands.custom.restricted.includes(commandname)) return reject({path:[opt,1,1,0],msg:"restricted command"});
                _id(1, "channel", channelid, "command")
                .then(id => {
                    let command = {
                        name: commandname,
                        id: id[0],
                        aliases: commandaliases,
                        state: commandstate,
                        add_user: j.message.userstate.id,
                        permission: commandpermission,
                        create_time: Date.now(),
                        update_time: Date.now(),
                        cooldown: commandcooldown,
                        cooldown_user: commandcooldownuser,
                        response: commandresponse
                    };
                    if(!Object.keys(channels.channels).includes(channelid)) channels.channels[channelid] = {};
                    if(!Object.keys(channels.channels[channelid]).includes("commands")) channels.channels[channelid]["commands"] = {};

                    channels.channels[channelid]["commands"][id[0]] = command;
                    _wf(paths.channels, channels);

                    return resolve(command);
                })
                .catch(e => {
                    console.error(e);
                    return reject({path:[opt,1,1,0],msg:"could not create id"});
                })
                break;
            }

            case 2: {
                if(!commandid && !getcommandidbyname()){
                    return reject({path:[opt,0],msg:"commandid is undefined and could not find id"});
                } else {
                    commandid = commandid || getcommandidbyname();
                    if(Object.keys(channels.channels).includes(channelid)){
                        if(Object.keys(channels.channels[channelid]).includes("commands")){
                            if(Object.keys(channels.channels[channelid]["commands"]).includes(commandid)){
                                let command = channels.channels[channelid]["commands"][commandid];
                                delete channels.channels[channelid]["commands"][commandid];
                                _wf(paths.channels, channels);

                                return resolve(command);
                            } else {
                                return reject({path:[opt,1,1,0],msg:"commands of channel do not include commandid"});
                            }
                        } else {
                            return reject({path:[opt,1,0],msg:"keys of channel do not include commands"});
                        }
                    } else {
                        return reject({path:[opt,1],msg:"channels do not include channelid"});
                    }
                }
                break;
            }

            case 3: {
                if(!commandid && !getcommandidbyname()){
                    return reject({path:[opt,0],msg:"commandid is undefined and could not find id"});
                } else {
                    if(!Object.keys(channels.channels).includes(channelid)) channels.channels[channelid] = {};
                    if(!Object.keys(channels.channels[channelid]).includes("commands")) channels.channels[channelid]["commands"] = {};
                    commandid = commandid || getcommandidbyname();
                    if(Object.keys(channels.channels[channelid]["commands"]).includes(commandid)){
                        let command_ = channels.channels[channelid]["commands"][commandid];
                        let command = {
                            name: commandname || command_.name,
                            id: command_.id,
                            aliases: commandaliases || command_.aliases,
                            state: commandstate || command_.state,
                            add_user: command_.add_user,
                            permission: commandpermission || command_.permission,
                            create_time: command_.create_time,
                            update_time: Date.now(),
                            cooldown: commandcooldown || command_.cooldown,
                            cooldown_user: commandcooldownuser || command_.cooldown_user,
                            response: commandresponse || command_.response
                        };

                        channels.channels[channelid]["commands"][commandid] = command;
                        _wf(paths.channels, channels);

                        return resolve(command);
                    } else {
                        return reject({path:[opt,0],msg:"commands of channel do not include command"});
                    }
                }
                break;
            }

            case 4: {
                if(!commandid && !getcommandidbyname()){
                    return reject({path:[opt,0],msg:"commandid is undefined and could not find id"});
                } else {
                    if(!commandresponse) return reject({path:[opt,1,0],msg:"new commandname is undefined"});

                    if(!Object.keys(channels.channels).includes(channelid)) channels.channels[channelid] = {};
                    if(!Object.keys(channels.channels[channelid]).includes("commands")) channels.channels[channelid]["commands"] = {};
                    commandid = commandid || getcommandidbyname();
                    if(getcommandidbyname(commandresponse)) return reject({path:[opt,1,1,0],msg:"command already exists"});
                    if(j.c().commands.custom.restricted.includes(commandresponse)) return reject({path:[opt,1,1,1,0],msg:"restrictedcommand"});
                    
                    if(Object.keys(channels.channels[channelid]["commands"]).includes(commandid)){
                        channels.channels[channelid]["commands"][commandid].name = commandresponse;
                        _wf(paths.channels, channels);
                        return resolve(channels.channels[channelid]["commands"][commandid]);
                    } else {
                        return reject({path:[opt,0],msg:"commands of channel do not include command"});
                    }
                }
                break;
            }
        };

        function getcommandidbyname(name){
            name = name || commandname;
            let ret = undefined;
            Object.keys(channels.channels[channelid]["commands"]).map(cmdid => {
                if(channels.channels[channelid]["commands"][cmdid].name === name || channels.channels[channelid]["commands"][cmdid].aliases.includes(name)){
                    ret = cmdid;
                }
            });
            return ret;
        };
    });
};

module.exports = customcommand;