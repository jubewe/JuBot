let files = require("../../variables/files");
let paths = require("../../variables/paths");
const { nonarr } = require("../../variables/varstatic");
const _appf = require("../_appf");
const _id = require("./_id");
const _nonarr = require("../_nonarr");
const _stackname = require("../_stackname");
let j = require("../../variables/j");

/**
 * @param {number} opt 
 * @param {object | undefined} j_ 
 * @param {boolean | null} noreturn 
 * @param {number | null} channelid 
 * @param {string | null} keywordid 
 * @param {string} keywordname 
 * @param {string} keywordresponse 
 * @param {array} keywordaliases 
 * @param {0 | 1} keywordstate 
 * @param {number | string} keywordpermission 
 * @param {number} keywordcooldown 
 * @param {number} keywordcooldownuser 
 * @returns {promise}
 */

async function customkeyword(opt, j_, noreturn, channelid, keywordid, keywordname, keywordresponse, keywordaliases, keywordstate, keywordpermission, keywordcooldown, keywordcooldownuser){
    return new Promise((resolve, reject) => {
        if(nonarr.includes(opt)) return reject({path:[0],msg:"opt is undefined"});

        channelid = _nonarr(channelid, j_.message.channel.id);
        keywordaliases = _nonarr(keywordaliases, []);
        // keywordstate = _nonarr(keywordstate, 1);
        keywordstate = (global.variables.varstatic.nonarr.includes(keywordstate) ? 1 : keywordstate);
        keywordpermission = _nonarr(keywordpermission, "10");
        keywordcooldown = _nonarr(keywordcooldown, 10000);
        keywordcooldownuser = _nonarr(keywordcooldownuser, 30000);
        if(isNaN(keywordpermission)){
            let keywordpermission_ = Object.keys(files.permissions.permissions).map(k => {if(files.permissions.permissions[k].tag) return [k, files.permissions.permissions[k].tag]}).filter(k => {return k !== undefined && (k[0] === keywordpermission || k[1].includes(keywordpermission))});
            if(!keywordpermission_){
                keywordpermission = "10";
            } else {
                keywordpermission = keywordpermission_[0][0];
            }
        }

        switch (opt){
            case 0: {
                if(!Object.keys(files.channels.channels).includes(channelid)){
                    files.channels.channels[channelid] = {};
                };
                if(!Object.keys(files.channels.channels[channelid]).includes("keywords")){
                    files.channels.channels[channelid]["keywords"] = {};
                };

                if(keywordid){
                    if(Object.keys(files.channels.channels[channelid]["keywords"]).includes(keywordid)){
                        return resolve(files.channels.channels[channelid]["keywords"][keywordid]);
                    } else {
                        return reject({path:[opt,1,1,1,0],msg:"keyword not found by id"});
                    }
                } else if(keywordname){
                    if(getkeywordidbyname()){
                        return resolve(files.channels.channels[channelid]["keywords"][getkeywordidbyname()])
                    } else {
                        return reject({path:[opt,1,1,1,0],msg:"keyword not found by name"});
                    }
                } else {
                    return resolve(files.channels.channels[channelid]["keywords"]);
                }
                break;
            }

            case 1: {
                if(!keywordname) return reject({path:[opt,0],msg:"keywordname is undefined"});
                if(!keywordresponse) return reject({path:[opt,1,0],msg:"keywordresponse is undefined"});
                _id(1, "channel", channelid, "keyword")
                .then(id => {
                    let keyword = {
                        name: keywordname,
                        id: id[0],
                        aliases: keywordaliases,
                        state: keywordstate,
                        add_user: j_.message.userstate.id,
                        permission: keywordpermission,
                        create_time: Date.now(),
                        update_time: Date.now(),
                        cooldown: keywordcooldown,
                        cooldown_user: keywordcooldownuser,
                        response: keywordresponse
                    };
                    if(!Object.keys(files.channels.channels).includes(channelid)) files.channels.channels[channelid] = {};
                    if(!Object.keys(files.channels.channels[channelid]).includes("keywords")) files.channels.channels[channelid]["keywords"] = {};
                    files.channels.channels[channelid]["keywords"][id[0]] = keyword;
                    
                    // _wf(paths.channels, files.channels);
                    
                    _appf(paths.keywordlog, `\n${Date.now()} ${_stackname(0, "keywords", "add")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)}`);
                    _appf(paths.log, `\n${Date.now()} ${_stackname(0, "keywords", "add")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)}`);
                    
                    return resolve(keyword);
                })
                .catch(e => {
                    console.error(e);
                    return reject({path:[opt,1,1,0],msg:"could not create id"});
                })
                break;
            }

            case 2: {
                if(!keywordid && !getkeywordidbyname()){
                    return reject({path:[opt,0],msg:"could not find keyword"});
                } else {
                    keywordid = keywordid || getkeywordidbyname();
                    if(Object.keys(files.channels.channels).includes(channelid)){
                        if(Object.keys(files.channels.channels[channelid]).includes("keywords")){
                            if(Object.keys(files.channels.channels[channelid]["keywords"]).includes(keywordid)){
                                let keyword = files.channels.channels[channelid]["keywords"][keywordid];
                                delete files.channels.channels[channelid]["keywords"][keywordid];
                                
                                // _wf(paths.channels, files.channels);
                                
                                _appf(paths.keywordlog, `\n${Date.now()} ${_stackname(0, "keywords", "delete")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)}`);
                                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "keywords", "delete")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)}`);
                                
                                return resolve(keyword);
                            } else {
                                return reject({path:[opt,1,1,0],msg:"keywords of channel do not include keywordid"});
                            }
                        } else {
                            return reject({path:[opt,1,0],msg:"keys of channel do not include keywords"});
                        }
                    } else {
                        return reject({path:[opt,1],msg:"channels do not include channelid"});
                    }
                }
                break;
            }

            case 3: {
                if(!keywordid && !getkeywordidbyname()){
                    return reject({path:[opt,0],msg:"could not find keyword"});
                } else {
                    if(!Object.keys(files.channels.channels).includes(channelid)) files.channels.channels[channelid] = {};
                    if(!Object.keys(files.channels.channels[channelid]).includes("keywords")) files.channels.channels[channelid]["keywords"] = {};
                    keywordid = keywordid || getkeywordidbyname();
                    if(Object.keys(files.channels.channels[channelid]["keywords"]).includes(keywordid)){
                        let keyword_ = files.channels.channels[channelid]["keywords"][keywordid];
                        let keyword = {
                            name: _nonarr(keywordname, keyword_.name),
                            id: keyword_.id,
                            aliases: _nonarr(keywordaliases, keyword_.aliases),
                            state: _nonarr(keywordstate, keyword_.state),
                            add_user: keyword_.add_user,
                            permission: _nonarr(keywordpermission, keyword_.permission),
                            create_time: keyword_.create_time,
                            update_time: Date.now(),
                            cooldown: _nonarr(keywordcooldown, keyword_.cooldown),
                            cooldown_user: _nonarr(keywordcooldownuser, keyword_.cooldown_user),
                            response: _nonarr(keywordresponse, keyword_.response)
                        };

                        files.channels.channels[channelid]["keywords"][keywordid] = keyword;
                        
                        // _wf(paths.channels, files.channels);
                        
                        _appf(paths.keywordlog, `\n${Date.now()} ${_stackname(0, "keywords", "edit")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)} ${JSON.stringify(keyword_)}`);
                        _appf(paths.log, `\n${Date.now()} ${_stackname(0, "keywords", "edit")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword)} ${JSON.stringify(keyword_)}`);
                        
                        return resolve(keyword);
                    } else {
                        return reject({path:[opt,0],msg:"keywords of channel do not include keyword"});
                    }
                }
                break;
            }

            case 4: {
                if(!keywordid && !getkeywordidbyname()){
                    return reject({path:[opt,0],msg:"could not find keyword"});
                } else {
                    if(!keywordresponse) return reject({path:[opt,1,0],msg:"new keywordname is undefined"});

                    if(!Object.keys(files.channels.channels).includes(channelid)) files.channels.channels[channelid] = {};
                    if(!Object.keys(files.channels.channels[channelid]).includes("keywords")) files.channels.channels[channelid]["keywords"] = {};
                    keywordid = keywordid || getkeywordidbyname();
                    if(getkeywordidbyname(keywordresponse)) return reject({path:[opt,1,1,0],msg:"keyword already exists"});
                    if(j.c().keywords.custom.restricted.includes(keywordresponse)) return reject({path:[opt,1,1,1,0],msg:"restrictedkeyword"});
                    
                    if(Object.keys(files.channels.channels[channelid]["keywords"]).includes(keywordid)){
                        let keyword = files.channels.channels[channelid]["keywords"][keywordid];
                        let keyword_ = keyword;
                        keyword.name = keywordresponse;
                        
                        // _wf(paths.channels, files.channels);
                        
                        _appf(paths.keywordlog, `\n${Date.now()} ${_stackname(0, "keywords", "rename")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword_)} ${JSON.stringify(keyword)}`);
                        _appf(paths.log, `\n${Date.now()} ${_stackname(0, "keywords", "rename")[0]} ${channelid} ${keyword.id} ${keyword.name} ${JSON.stringify(keyword_)} ${JSON.stringify(keyword)}`);
                        
                        return resolve(files.channels.channels[channelid]["keywords"][keywordid]);
                    } else {
                        return reject({path:[opt,0],msg:"keywords of channel do not include keyword"});
                    }
                }
                break;
            }
        };

        function getkeywordidbyname(name){
            name = name || keywordname;
            let ret = undefined;
            if(!files.channels.channels[channelid] || !files.channels.channels[channelid]["keywords"]) return ret;
            Object.keys(files.channels.channels[channelid]["keywords"]).map(cmdid => {
                if(files.channels.channels[channelid]["keywords"][cmdid].name === name || files.channels.channels[channelid]["keywords"][cmdid].aliases.includes(name)){
                    ret = cmdid;
                }
            });
            return ret;
        };
    });
};

module.exports = customkeyword;