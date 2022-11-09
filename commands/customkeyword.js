const customkeyword = require("../functions/customkeyword");
const _cleantime = require("../functions/_cleantime");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");
const paths = require("../variables/paths");

module.exports = {
    name: "customkeyword",
    id: "global_commands_customkeyword",
    aliases: [],
    state: 1,
    add_version: "0.1.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_, j) => {
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
                        case "enable": {togglestate(1, 1); break;}
                        case "disable": {togglestate(1, 0); break;}
                        case "list":
                        case "get": {getkeyword(1); break;}

                        default: {j.send(2, j_, `Error: Option not found`); return;}
                    };
                } else {
                    j.send(2, j_, `Error: No option given`);
                }
                break;
            }

            case "keywords": {getkeyword(); break;}

            case "addkey": {addkeyword(0); break;}
            case "delkey": {deletekeyword(0); break;}
            case "editkey": {editkeyword(0); break;}
            case "renamekey": {renamekeyword(0); break;}
            case "permkey": {permissionkeyword(0); break;}
            case "enablekey": {togglestate(0, 1); break;}
            case "disablekey": {togglestate(0, 0); break;}
            case "getkey": {getkeyword(0); break;}
        };

        async function addkeyword(num){
            if(j.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                await customkeyword(0, j_, true)
                .then(keys => {
                    if(typeof keys === "object"){
                        if(Object.keys(keys).length >= j.c().keywords.custom.max && !j_.message._.userperms._default){
                            j.send(2, j_, `Error: Maximum number of keywords (${j.c().keywords.custom.max}) reached`);
                            return;
                        }
                    }
                })
                await customkeyword(0, j_, false, null, null, keyname)
                .then(key => {
                    j.send(2, j_, `Error: Keyword with name already exists`);
                    return;
                })
                .catch(() => {
                    if(j_.message._.args()[num+1]){
                        let keyresponse = j_.message._.args().splice(num+1).join(" ");
                        customkeyword(1, j_, false, null, null, keyname, keyresponse)
                        .then(key => {
                            j.send(2, j_, `Successfully created keyword ${key.name} (${key.id}): ${key.response}`);
                        })
                        .catch(e => {
                            console.error(e);
                            j.send(2, j_, `Error: Could not create keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j.send(2, j_, `Error: No keywordresponse given`);
                    }
                })
            } else {
                j.send(2, j_, `Error: No keywordname given`);
            }
        };
        async function deletekeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                customkeyword(2, j_, false, null, null, keyname)
                .then(key => {
                    j.send(2, j_, `Successfully deleted keyword ${key.name} (${key.id})`);
                })
                .catch(e => {
                    console.error(e);
                    j.send(2, j_, `Error: Could not delete keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j.send(2, j_, `Error: No keywordname given`);
            }
        };
        async function editkeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                if(j_.message._.args()[num+1]){
                    let keyresponse = j_.message._.args().splice(num+1).join(" ");
                    customkeyword(3, j_, false, null, null, keyname, keyresponse)
                    .then(key => {
                        j.send(2, j_, `Successfully edited keyword ${key.name} (${key.id}): ${key.response}`);
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j_, `Error: Could not edit keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j_, `Error: No keywordresponse given`);
                }
            } else {
                j.send(2, j_, `Error: No keywordname given`);
            }
        };
        async function renamekeyword(num){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                if(j_.message._.args()[num+1]){
                    let keynew = j_.message._.args()[num+1];
                    customkeyword(4, j_, false, null, null, keyname, keynew)
                    .then(key => {
                        j.send(2, j_, `Successfully renamed keyword ${keyname} to ${key.name} (${key.id})`);
                        // : ${key.response}
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j_, `Error: Could not rename keyword ${keyname}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j_, `Error: No keywordresponse given`);
                }
            } else {
                j.send(2, j_, `Error: No keywordname given`);
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
                            j.send(2, j_, `Successfully set permission of keyword ${keyname} (${key.id}) to ${keyperm[0][0]} (${keyperm[0][1][0]})`);
                        })
                        .catch(e => {
                            console.error(e);
                            j.send(2, j_, `Error: Could not set permission of keyword ${keyname} to ${keyperm[0][0]} (${keyperm[0][1][0]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        })
                    } else {
                        j.send(2, j_, `Error: no valid permission given`);
                    }
                } else {
                    j.send(2, j_, `Error: No keywordresponse given`);
                }
            } else {
                j.send(2, j_, `Error: No keywordname given`);
            }
        };
        async function togglestate(num, state){
            if(j_.message._.args()[num]){
                let keyname = j_.message._.args()[num].toLowerCase();
                customkeyword(3, j_, false, null, (_regex.j_id_custom_keywordreg().test(keyname) ? keyname : null), (_regex.j_id_custom_keywordreg().test(keyname) ? null : keyname), null, null, state)
                .then(key => {
                    j.send(2, j_, `Successfully set keyword state to ${state} (${keystates[state]})`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not set keyword state to ${state} (${keystates[state]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j.send(2, j_, `Error: No keywordname given`);
            }
        };
        async function getkeyword(num){
            let keyname = undefined;
            if(j_.message._.args()[num]){
                keyname = j_.message._.args()[num];
                customkeyword(0, j_, false, null, (_regex.j_id_custom_keywordreg().test(keyname) ? keyname : null), (_regex.j_id_custom_keywordreg().test(keyname) ? null : keyname))
                .then(key => {
                    j.send(2, j_, `Keywordinfo for keyword ${keyname} (${key.id}): Aliases [${key.aliases.length}]: ${key.aliases.join(", ") || "[]"}, State: ${key.state} (${keystates[key.state]}), Permission: ${key.permission} `+
                    `(${(Object.keys(permissions.permissions).map(k => {if(permissions.permissions[k].tag) return [k, permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === key.permission || k[1].includes(key.permission))}))[0][1][0]}) `+
                    `Created: ${_cleantime((Date.now()-key.create_time), 4, 2).time.join(" and ")} ago, Edited: ${_cleantime((Date.now()-key.update_time), 4, 2).time.join(" and ")} ago, `+
                    `Cooldown (channel): ${global.functions._numberspacer(key.cooldown)} ms, Cooldown (user): ${global.functions._numberspacer(key.cooldown_user)} ms, Response: ${key.response}`, null, null, null, false);
                })
                .catch(e => {
                    j.send(2, j_, `Error: keyword not found: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                customkeyword(0, j_, false, null)
                .then(keys => {
                    j.send(2, j_, `Custom keywords in this channel: ${Object.keys(keys).map(key => {return keys[key].name})}`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not get keywords of this channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`)
                })
            }
        };
    }
}