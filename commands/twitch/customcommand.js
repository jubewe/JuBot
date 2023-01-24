const customcommand = require("../../functions/twitch/customcommand");
const getuser = require("../../functions/twitch/getuser");
const _cleantime = require("../../functions/_cleantime");
const _pixelize = require("../../functions/_pixelize");
const _regex = require("../../functions/_regex");
const _returnerr = require("../../functions/_returnerr");
const _splitafter = require("../../functions/_splitafter");
let j = require("../../variables/j");
const paths = require("../../variables/paths");

module.exports = {
    name: "customcommand",
    id: "global_commands_customcommand",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    parameters: ["channel"],
    cooldown: 1000,
    cooldown_user: 2000,
    exec: async (j_) => {
        let permissions = j.files().permissions;
        let cmdstates = ["disabled", "enabled"];

        switch (j_.message._.command){
            case "command": {
                if(j_.message._.args()[0]){
                    let cmdopt = j_.message._.args()[0];
                    switch (cmdopt){
                        case "add": {addcommand(1); break;}
                        case "delete": {deletecommand(1); break;}
                        case "edit": {editcommand(1); break;}
                        case "rename": {renamecommand(1); break;}
                        case "permission": {permissioncommand(1); break;}
                        case "cooldown": {cooldowncommand(1); break;}
                        case "enable": {togglestate(1, 1); break;}
                        case "disable": {togglestate(1, 0); break;}
                        case "copy":
                        case "yoink": {copycommand(1); break;}
                        case "list":
                        case "info":
                        case "get": {getcommand(1); break;}

                        default: {j_.send(`Error: Option not found`); return;}
                    };
                } else {
                    j_.send(`Error: No option given`);
                }
                break;
            }

            case "commands": {getcommand(); break;}

            case "addcmd": {addcommand(0); break;}
            case "delcmd": {deletecommand(0); break;}
            case "editcmd": {editcommand(0); break;}
            case "renamecmd": {renamecommand(0); break;}
            case "permcmd": {permissioncommand(0); break;}
            case "cooldowncmd": {cooldowncommand(0); break;}
            case "enablecmd": {togglestate(0, 1); break;}
            case "disablecmd": {togglestate(0, 0); break;}
            case "getcmd":
            case "infocmd":
            case "listcmd": {getcommand(0); break;}
            case "copycmd": 
            case "yoinkcmd": {copycommand(0); break;}
        };

        async function addcommand(num){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot overwrite this`); 
                    return;
                }
                await customcommand(0, j_, true)
                .then(cmds => {
                    if(typeof cmds === "object"){
                        if(Object.keys(cmds).length >= j.c().commands.custom.max && !j_.message._.userperms._default){
                            j_.send(`Error: Maximum number of commands (${j.c().commands.custom.max}) reached`);
                            return;
                        }
                    }
                })
                await customcommand(0, j_, false, null, null, cmdname)
                .then(cmd => {
                    j_.send(`Error: Command with name already exists`);
                    return;
                })
                .catch(() => {
                    if(j_.message._.args()[num+1]){
                        let cmdresponse = j_.message._.args().splice(num+1).join(" ");
                        customcommand(1, j_, false, null, null, cmdname, cmdresponse)
                        .then(cmd => {
                            j_.send(`Successfully created command ${cmd.name} (${cmd.id}): ${cmd.response}`);
                        })
                        .catch(e => {
                            console.error(e);
                            j_.send(`Error: Could not create command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j_.send(`Error: No commandresponse given`);
                    }
                })
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function deletecommand(num){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot delete this`); 
                    return;
                }
                customcommand(2, j_, false, null, null, cmdname)
                .then(cmd => {
                    j_.send(`Successfully deleted command ${cmd.name} (${cmd.id})`);
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not delete command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function editcommand(num){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot edit this`); 
                    return;
                }
                if(j_.message._.args()[num+1]){
                    let cmdresponse = j_.message._.args().splice(num+1).join(" ");
                    customcommand(3, j_, false, null, null, cmdname, cmdresponse)
                    .then(cmd => {
                        j_.send(`Successfully edited command ${cmd.name} (${cmd.id}): ${cmd.response}`);
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not edit command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j_.send(`Error: No commandresponse given`);
                }
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function renamecommand(num){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot rename this`); 
                    return;
                }
                if(j_.message._.args()[num+1]){
                    let cmdnew = j_.message._.args()[num+1];
                    customcommand(4, j_, false, null, null, cmdname, cmdnew)
                    .then(cmd => {
                        j_.send(`Successfully renamed command ${cmdname} to ${cmd.name} (${cmd.id})`);
                        // : ${cmd.response}
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not rename command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j_.send(`Error: No commandresponse given`);
                }
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function permissioncommand(num){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot edit this`); 
                    return;
                }
                if(j_.message._.args()[num+1]){
                    let cmdperm = j_.message._.args()[num+1];
                    cmdperm = (Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === cmdperm || k[1].includes(cmdperm))}));
                    if(cmdperm && cmdperm[0]){
                        customcommand(3, j_, false, null, null, cmdname, null, null, null, cmdperm[0][0])
                        .then(cmd => {
                            j_.send(`Successfully set permission of command ${cmdname} (${cmd.id}) to ${cmdperm[0][0]} (${cmdperm[0][1][0]})`);
                        })
                        .catch(e => {
                            console.error(e);
                            j_.send(`Error: Could not set permission of command ${cmdname} to ${cmdperm[0][0]} (${cmdperm[0][1][0]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j_.send(`Error: no valid permission given`);
                    }
                } else {
                    j_.send(`Error: No commandresponse given`);
                }
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function cooldowncommand(num){
            if(!j_.message._.args()[num]) return j_.send(`Error: No commandname given`);
            if(!j_.message._.args()[num+1]) return j_.send(`Error: No cooldownopt given`);
            if(!j_.message._.args()[num+2] && isNaN(j_.message._.args()[num+1])) return j_.send(`Error: No cooldowntime given`);
            
            let cmdname = j_.message._.args()[num].toLowerCase();
            let cmdcooldownopt = j_.message._.args()[num+1].toLowerCase();
            if(isNaN(cmdcooldownopt) && !["channel", "user"].includes(cmdcooldownopt)) return j_.send(`Error: Cooldown option not found (expected user|channel)`);
            if(!isNaN(cmdcooldownopt) || j_.message._.args()[num+2]){
                let cmdcooldowntime;
                if(!isNaN(cmdcooldownopt)){
                    cmdcooldownopt = "channel";
                    cmdcooldowntime = j_.message._.args()[num+1];
                } else {
                    cmdcooldowntime = j_.message._.args()[num+2];
                }
                if(isNaN(cmdcooldowntime)){
                    if(cmdcooldowntime === _cleantime(cmdcooldowntime, 0)){
                        return j_.send(`Error: Invalid time inputted, please use x<s|m|h> or just x in ms`);
                    } else {
                        cmdcooldowntime = _cleantime(cmdcooldowntime, 0)
                    }
                }
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j_.send(`Error: Restricted bot-command, you cannot edit this`); 
                    return;
                }
                customcommand(3, j_, false, j_.message.channel.id, null, cmdname, null, null, null, null, (["channel"].includes(cmdcooldownopt) ? cmdcooldowntime : null), (["user"].includes(cmdcooldownopt) ? cmdcooldowntime : null))
                .then(cmd => {
                    j_.send(`Successfully set ${cmdcooldownopt} cooldown of command ${cmdname} (${cmd.id}) to ${cmdcooldowntime} (${_cleantime(cmdcooldowntime, 4).time.join(" and ")})`);
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not set ${cmdcooldownopt} cooldown of command ${cmdname} to ${cmdcooldowntime}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No cooldowntime given`);
            }
        };
        async function togglestate(num, state){
            if(j_.message._.args()[num]){
                let cmdname = j_.message._.args()[num].toLowerCase();
                customcommand(3, j_, false, null, (_regex.j_id_custom_commandreg().test(cmdname) ? cmdname : null), (_regex.j_id_custom_commandreg().test(cmdname) ? null : cmdname), null, null, state)
                .then(cmd => {
                    j_.send(`Successfully set command state to ${state} (${cmdstates[state]})`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set command state to ${state} (${cmdstates[state]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No commandname given`);
            }
        };
        async function getcommand(num){
            let cmdname = undefined;
            if(j_.message._.args()[num]){
                cmdname = j_.message._.args()[num];
                customcommand(0, j_, false, null, (_regex.j_id_custom_commandreg().test(cmdname) ? cmdname : null), (_regex.j_id_custom_commandreg().test(cmdname) ? null : cmdname))
                .then(cmd => {
                    j_.send(`Commandinfo for command ${cmdname} (${cmd.id}): Aliases [${cmd.aliases.length}]: ${cmd.aliases.join(", ") || "[]"}, State: ${cmd.state} (${cmdstates[cmd.state]}), Permission: ${cmd.permission} `+
                    `(${(Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === cmd.permission || k[1].includes(cmd.permission))}))[0][1][0]}) `+
                    `Created: ${_cleantime((Date.now()-cmd.create_time), 4, 2).time.join(" and ")} ago, Edited: ${_cleantime((Date.now()-cmd.update_time), 4, 2).time.join(" and ")} ago, `+
                    `Cooldown (channel): ${global.functions._numberspacer(cmd.cooldown)} ms, Cooldown (user): ${global.functions._numberspacer(cmd.cooldown_user)} ms, Response: ${cmd.response}`, null, null, null, false);
                })
                .catch(e => {
                    j_.send(`Error: Command not found: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                customcommand(0, j_, false, null)
                .then(cmds => {
                    j_.send(`Custom Commands in this channel: ${Object.keys(cmds).map(cmd => {return cmds[cmd].name})}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not get commands of this channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`)
                })
            }
        };
        async function copycommand(num){
            let copychanreg = new RegExp(`(\-chan\:+\\w+|from\:\\w+)`, "i");
            let copychanreg2 = new RegExp(`(\-chan\:+|from\:)`, "i");
            let copychan = _splitafter(j_.message._.msg, num+1).match(copychanreg);
            if(copychan !== null && _splitafter(j_.message._.msg, num+1).replace(copychan, "").length > 0){
                copychan = copychan[0].split(copychanreg2)[2];
                let copycmd = _splitafter(j_.message._.msg, num+1).replace(copychanreg, "").replace(_regex.spacestartendreg(), "");

                getuser(1, copychan)
                .then(u => {
                    if(Object.keys(j.files().channels.channels).includes(u[1])){
                        let ch = j.files().channels.channels[u[1]];
                        if(!ch.commands) return j_.send(`Error: Command not found in ${_pixelize(u[0])} (${u[1]})`);
                        customcommand(0, j_, false, u[1], null, copycmd)
                        .then(cmd => {
                            cmd.create_time = cmd.update_time = Date.now();
                            customcommand(1, j_, false, j_.message.channel.id, null, cmd.name, cmd.response, cmd.aliases, cmd.state, cmd.permission, cmd.cooldown, cmd.cooldown_user)
                            .then(cmd2 => {
                                j_.send(`Successfully copied command ${copycmd} from ${_pixelize(u[0])} (${u[1]})`);
                            })
                            .catch(e => {
                                console.error(e);
                                j_.send(`Error: Could not re-create copied command: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                            })
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get command ${copycmd} in ${_pixelize(u[0])} (${u[1]}): ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    } else {
                        j_.send(`Error: Channel ${_pixelize(u[0])} (${u[1]}) not found in channels`);
                    }
                })
                .catch(e => {
                    j_.send(`Error: Could not recieve channel id`);
                })
            } else {
                j_.send(`Error: No Channel or command to copy from given`);
            }
        };
    }
};