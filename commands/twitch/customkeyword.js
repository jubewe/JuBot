const customkeyword = require("../../functions/twitch/customkeyword");
const getuser = require("../../functions/twitch/getuser");
const _cleantime = require("../../functions/_cleantime");
const _pixelize = require("../../functions/_pixelize");
const _regex = require("../../functions/_regex");
const _returnerr = require("../../functions/_returnerr");
const _splitafter = require("../../functions/_splitafter");
let j = require("../../variables/j");

module.exports = {
    name: "customkeyword",
    id: "global_commands_customkeyword",
    aliases: [],
    state: 1,
    add_version: "0.1.1",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    parameters: ["channel"],
    cooldown: 1000,
    cooldown_user: 2000,
    arguments: [{name:"keywordoption",required:true,options:["add","delete","edit","rename","permission","cooldown","enable","disable","yoink","copy","list","get","info"]},{name:"keywordname",required:true,options:["name"]},{name:"keywordoptions",required:false,options:["options"]}],
    exec: async (j_) => {
        let permissions = j.files().permissions;
        let keystates = ["disabled", "enabled"];

        switch (j_.message._.command){
            case "keyword": {
                if(j_.message._.args()[0]){
                    let keyopt = j_.message._.args()[0];
                    switch (keyopt){
                        case "add": {addkeyword(1); break;}
                        case "delete": {deletekeyword(1); break;}
                        case "edit": {editkeyword(1); break;}
                        case "rename": {renamekeyword(1); break;}
                        case "permission": {permissionkeyword(1); break;}
                        case "cooldown": {cooldownkeyword(1); break;}
                        case "enable": {togglestate(1, 1); break;}
                        case "disable": {togglestate(1, 0); break;}
                        case "yoink": 
                        case "copy": {copykeyword(1); break;}
                        case "list":
                        case "get":
                        case "info": {getkeyword(1); break;}

                        default: {j_.send(`Error: Option not found`); return;}
                    };
                } else {
                    j_.send(`Error: No option given`);
                }
                break;
            }

            case "keywords": {getkeyword(); break;}

            case "addkey": {addkeyword(0); break;}
            case "delkey": {deletekeyword(0); break;}
            case "editkey": {editkeyword(0); break;}
            case "renamekey": {renamekeyword(0); break;}
            case "permkey": {permissionkeyword(0); break;}
            case "permkey": {cooldownkeyword(0); break;}
            case "enablekey": {togglestate(0, 1); break;}
            case "disablekey": {togglestate(0, 0); break;}
            case "getkey":
            case "infokey":
            case "listkey": {getkeyword(0); break;}
            case "copykey":
            case "yoinkkey": {copykeyword(0); break;}
        };

        async function addkeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                await customkeyword(0, j_, true)
                .then(keys => {
                    if(typeof keys === "object"){
                        if(Object.keys(keys).length >= j.c().keywords.custom.max && !j_.message._.userperms._default){
                            j_.send(`Error: Maximum number of keywords (${j.c().keywords.custom.max}) reached`);
                            return;
                        }
                    }
                })
                await customkeyword(0, j_, false, null, null, keyname)
                .then(key => {
                    j_.send(`Error: Keyword with name already exists`);
                    return;
                })
                .catch(() => {
                    if(j_.message._.args()[num+1]){
                        let keyresponse = j_.message._.args().splice(num+1).join(" ");
                        customkeyword(1, j_, false, null, null, keyname, keyresponse)
                        .then(key => {
                            j_.send(`Successfully created keyword ${key.name} (${key.id}): ${key.response}`);
                        })
                        .catch(e => {
                            console.error(e);
                            j_.send(`Error: Could not create keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j_.send(`Error: No keywordresponse given`);
                    }
                })
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function deletekeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                customkeyword(2, j_, false, null, null, keyname)
                .then(key => {
                    j_.send(`Successfully deleted keyword ${key.name} (${key.id})`);
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not delete keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function editkeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                if(j_.message._.args()[num+1]){
                    let keyresponse = j_.message._.args().splice(num+1).join(" ");
                    customkeyword(3, j_, false, null, null, keyname, keyresponse)
                    .then(key => {
                        j_.send(`Successfully edited keyword ${key.name} (${key.id}): ${key.response}`);
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not edit keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j_.send(`Error: No keywordresponse given`);
                }
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function renamekeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                if(j_.message._.args()[num+1]){
                    let keynew = j_.message._.args()[num+1];
                    customkeyword(4, j_, false, null, null, keyname, keynew)
                    .then(key => {
                        j_.send(`Successfully renamed keyword ${keyname} to ${key.name} (${key.id})`);
                        // : ${key.response}
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not rename keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j_.send(`Error: No keywordresponse given`);
                }
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function permissionkeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                if(j_.message._.args()[num+1]){
                    let keyperm = j_.message._.args()[num+1];
                    keyperm = (Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === keyperm || k[1].includes(keyperm))}));
                    if(keyperm && keyperm[0]){
                        customkeyword(3, j_, false, null, null, keyname, null, null, null, keyperm[0][0])
                        .then(key => {
                            j_.send(`Successfully set permission of keyword ${keyname} (${key.id}) to ${keyperm[0][0]} (${keyperm[0][1][0]})`);
                        })
                        .catch(e => {
                            console.error(e);
                            j_.send(`Error: Could not set permission of keyword ${keyname} to ${keyperm[0][0]} (${keyperm[0][1][0]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j_.send(`Error: no valid permission given`);
                    }
                } else {
                    j_.send(`Error: No keywordresponse given`);
                }
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function cooldownkeyword(num){
            if(!j_.message._.args()[num]) return j_.send(`Error: No keywordname given`);
            if(!j_.message._.args()[num+1]) return j_.send(`Error: No cooldownopt given`);
            if(!j_.message._.args()[num+2] && isNaN(j_.message._.args()[num+1])) return j_.send(`Error: No keywordtime given`);
            
            let keyname = j_.message._.args()[num].toLowerCase();
            let keycooldownopt = j_.message._.args()[num+1].toLowerCase();
            if(isNaN(keycooldownopt) && !["channel", "user"].includes(keycooldownopt)) return j_.send(`Error: Cooldown option not found (expected user|channel)`);
            if(!isNaN(keycooldownopt) || j_.message._.args()[num+2]){
                let keycooldowntime;
                if(!isNaN(keycooldownopt)){
                    keycooldownopt = "channel";
                    keycooldowntime = j_.message._.args()[num+1];
                } else {
                    keycooldowntime = j_.message._.args()[num+2];
                }
                if(isNaN(keycooldowntime)){
                    if(keycooldowntime === _cleantime(keycooldowntime, 0)){
                        return j_.send(`Error: Invalid time inputted, please use x<s|m|h> or just x in ms`);
                    } else {
                        keycooldowntime = _cleantime(keycooldowntime, 0)
                    }
                }
                customkeyword(3, j_, false, j_.message.channel.id, null, keyname, null, null, null, null, (["channel"].includes(keycooldownopt) ? keycooldowntime : null), (["user"].includes(keycooldownopt) ? keycooldowntime : null))
                .then(cmd => {
                    j_.send(`Successfully set ${keycooldownopt} cooldown of keyword ${keyname} (${cmd.id}) to ${keycooldowntime} (${_cleantime(keycooldowntime, 4).time.join(" and ")})`);
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not set ${keycooldownopt} cooldown of keyword ${keyname} to ${keycooldowntime}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No cooldowntime given`);
            }
        };
        async function togglestate(num, state){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                customkeyword(3, j_, false, null, (_regex.j_id_custom_keywordreg().test(keyname) ? keyname : null), (_regex.j_id_custom_keywordreg().test(keyname) ? null : keyname), null, null, state)
                .then(key => {
                    j_.send(`Successfully set keyword state to ${state} (${keystates[state]})`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set keyword state to ${state} (${keystates[state]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No keywordname given`);
            }
        };
        async function getkeyword(num){
            let keyname = undefined;
            if(j_.message._.args()[num]){
                keyname = j_.message._.args()[num];
                customkeyword(0, j_, false, null, (_regex.j_id_custom_keywordreg().test(keyname) ? keyname : null), (_regex.j_id_custom_keywordreg().test(keyname) ? null : keyname))
                .then(key => {
                    j_.send(`Keywordinfo for keyword ${keyname} (${key.id}): Aliases [${key.aliases.length}]: ${key.aliases.join(", ") || "[]"}, State: ${key.state} (${keystates[key.state]}), Permission: ${key.permission} `+
                    `(${(Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === key.permission || k[1].includes(key.permission))}))[0][1][0]}) `+
                    `Created: ${_cleantime((Date.now()-key.create_time), 4, 2).time.join(" and ")} ago, Edited: ${_cleantime((Date.now()-key.update_time), 4, 2).time.join(" and ")} ago, `+
                    `Cooldown (channel): ${global.functions._numberspacer(key.cooldown)} ms, Cooldown (user): ${global.functions._numberspacer(key.cooldown_user)} ms, Response: ${key.response}`, null, null, null, false);
                })
                .catch(e => {
                    j_.send(`Error: keyword not found: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                customkeyword(0, j_, false, null)
                .then(keys => {
                    j_.send(`Custom keywords in this channel: ${Object.keys(keys).map(key => {return keys[key].name})}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not get keywords of this channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`)
                })
            }
        };
        async function copykeyword(num){
            let copychanreg = new RegExp(`(\-chan\:+\\w+|from\:\\w+)`, "i");
            let copychanreg2 = new RegExp(`(\-chan\:+|from\:)`, "i");
            let copychan = _splitafter(j_.message._.msg, num+1).match(copychanreg);
            if(copychan !== null && _splitafter(j_.message._.msg, num+1).replace(copychan, "").length > 0){
                copychan = copychan[0].split(copychanreg2)[2];
                let copykey = _splitafter(j_.message._.msg, num+1).replace(copychanreg, "").replace(_regex.spacestartendreg(), "");

                getuser(1, copychan)
                .then(u => {
                    if(Object.keys(j.files().channels.channels).includes(u[1])){
                        let ch = j.files().channels.channels[u[1]];
                        if(!ch.keywords) return j_.send(`Error: Keyword not found in ${_pixelize(u[0])} (${u[1]})`);
                        customkeyword(0, j_, false, u[1], null, copykey)
                        .then(key => {
                            key.create_time = key.update_time = Date.now();
                            customkeyword(1, j_, false, j_.message.channel.id, null, key.name, key.response, key.aliases, key.state, key.permission, key.cooldown, key.cooldown_user)
                            .then(key2 => {
                                j_.send(`Successfully copied keyword ${copykey} from ${_pixelize(u[0])} (${u[1]})`);
                            })
                            .catch(e => {
                                console.error(e);
                                j_.send(`Error: Could not re-create copied keyword: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                            })
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get keyword ${copykey} in ${_pixelize(u[0])} (${u[1]}): ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    } else {
                        j_.send(`Error: Channel ${_pixelize(u[0])} (${u[1]}) not found in channels`);
                    }
                })
                .catch(e => {
                    j_.send(`Error: Could not recieve channel id`);
                })
            } else {
                j_.send(`Error: No Channel or keyword to copy from given`);
            }
        };
    }
}