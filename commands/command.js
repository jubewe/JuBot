const customcommand = require("../functions/customcommand");
const _combineArr = require("../functions/_combineArr");
const _returnerr = require("../functions/_returnerr");
const _rf = require("../functions/_rf");
let j = require("../variables/j");
const paths = require("../variables/paths");

module.exports = {
    name: "command",
    id: "global_commands_command",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    // permission: j.c().perm.moderator,
    permission: j.c().perm.bot,
    cooldown: 5000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        switch (j.message._.command){
            case "command": {
                if(j.message._.args()[0]){
                    let cmdopt = j.message._.args()[0];
                    switch (cmdopt){
                        case "add": {addcommand(1); break;}
                        case "delete": {deletecommand(1); break;}
                        case "edit": {editcommand(1); break;}
                        case "rename": {renamecommand(1); break;}
                        case "permission": {permissioncommand(1); break;}

                        default: {j.send(2, j, `Error: Option not found`); return;}
                    };
                } else {
                    j.send(2, j, `Error: No option given`);
                }
                break;
            }

            case "addcmd": {addcommand(0); break;}
            case "delcmd": {deletecommand(0); break;}
            case "editcmd": {editcommand(0); break;}
            case "renamecmd": {renamecommand(0); break;}
            case "permcmd": {permissioncommand(0); break;}
        };

        function addcommand(num){
            if(j.message._.args()[num]){
                let cmdname = j.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j.send(2, j, `Error: Restricted bot-command, you cannot overwrite this`); 
                    return;
                }
                if(j.message._.args()[num+1]){
                    let cmdresponse = j.message._.args().splice(num+1).join(" ");
                    customcommand(1, j, false, null, null, cmdname, cmdresponse)
                    .then(cmd => {
                        j.send(2, j, `Successfully created command ${cmd.name} (${cmd.id}): ${cmd.response}`);
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j, `Error: Could not create command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 0)}`);
                    })
                } else {
                    j.send(2, j, `Error: No commandresponse given`);
                }
            } else {
                j.send(2, j, `Error: No commandname given`);
            }
        };
        function deletecommand(num){
            if(j.message._.args()[num]){
                let cmdname = j.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j.send(2, j, `Error: Restricted bot-command, you cannot delete this`); 
                    return;
                }
                customcommand(2, j, false, null, null, cmdname)
                .then(cmd => {
                    j.send(2, j, `Successfully deleted command ${cmd.name} (${cmd.id})`);
                })
                .catch(e => {
                    console.error(e);
                    j.send(2, j, `Error: Could not delete command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 0)}`);
                })
            } else {
                j.send(2, j, `Error: No commandname given`);
            }
        };
        function editcommand(num){
            if(j.message._.args()[num]){
                let cmdname = j.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j.send(2, j, `Error: Restricted bot-command, you cannot edit this`); 
                    return;
                }
                if(j.message._.args()[num+1]){
                    let cmdresponse = j.message._.args().splice(num+1).join(" ");
                    customcommand(3, j, false, null, null, cmdname, cmdresponse)
                    .then(cmd => {
                        j.send(2, j, `Successfully edited command ${cmd.name} (${cmd.id}): ${cmd.response}`);
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j, `Error: Could not edit command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 0)}`);
                    })
                } else {
                    j.send(2, j, `Error: No commandresponse given`);
                }
            } else {
                j.send(2, j, `Error: No commandname given`);
            }
        };
        function renamecommand(num){
            if(j.message._.args()[num]){
                let cmdname = j.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j.send(2, j, `Error: Restricted bot-command, you cannot rename this`); 
                    return;
                }
                if(j.message._.args()[num+1]){
                    let cmdnew = j.message._.args()[num+1];
                    customcommand(4, j, false, null, null, cmdname, cmdnew)
                    .then(cmd => {
                        j.send(2, j, `Successfully renamed command ${cmdname} to ${cmd.name} (${cmd.id})`);
                        // : ${cmd.response}
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j, `Error: Could not rename command ${cmdname}: ${_returnerr(e, 0)} ${_returnerr(e, 0)}`);
                    })
                } else {
                    j.send(2, j, `Error: No commandresponse given`);
                }
            } else {
                j.send(2, j, `Error: No commandname given`);
            }
        };
        function permissioncommand(num){
            if(j.message._.args()[num]){
                let cmdname = j.message._.args()[num].toLowerCase();
                if(j.c().commands.custom.restricted.includes(cmdname)) {
                    j.send(2, j, `Error: Restricted bot-command, you cannot edit this`); 
                    return;
                }
                if(j.message._.args()[num+1]){
                    let cmdperm = j.message._.args()[num+1];
                    let permissions = _rf(paths.permissions, true);
                    cmdperm = (Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === cmdperm || k[1].includes(cmdperm))}));
                    if(cmdperm && cmdperm[0]){
                        customcommand(3, j, false, null, null, cmdname, null, null, null, cmdperm[0][0])
                        .then(cmd => {
                            j.send(2, j, `Successfully set permission of command ${cmdname} (${cmd.id}) to ${cmdperm[0][0]} (${cmdperm[0][1][0]})`);
                        })
                        .catch(e => {
                            console.error(e);
                            j.send(2, j, `Error: Could not set permission of command ${cmdname} to ${cmdperm[0][0]} (${cmdperm[0][1][0]}): ${_returnerr(e, 0)} ${_returnerr(e, 0)}`);
                        })
                    } else {
                        j.send(2, j, `Error: no valid permission given`);
                    }
                } else {
                    j.send(2, j, `Error: No commandresponse given`);
                }
            } else {
                j.send(2, j, `Error: No commandname given`);
            }
        };
    }
}