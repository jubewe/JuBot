const _cache = require("./_cache");
const request = require("request");
const urls = require("../variables/urls");
const _regex = require("./_regex");
const _appf = require("./_appf");
const paths = require("../variables/paths");
const _stackname = require("./_stackname");
const j = require("../variables/j");

class seventv {
    static getchannel = async (j_, channelid) => {
        return new Promise((resolve, reject) => {
            if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
    
            request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), {method: "GET"}, (e, r) => {
                if(e){
                    return reject(e);
                } else {
                    if(_regex.jsonreg().test(r.body)){
                        let dat = JSON.parse(r.body);
                        _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))
                        .then(e => {
                            return resolve(e);
                        })
                        .catch(e => {
                            console.error(e);
                            return reject(e);
                        })
                    } else {
                        return reject(r.body);
                    }
                }
            });
        });
    }

    static addemotediscord = async (j_, channelid, emoteids, discord_serverid) => {
        return new Promise((resolve, reject) => {
            if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
            if(!emoteids) return reject({path:[opt,1,0],msg:"emoteids is undefined"});
            if(!discord_serverid) return reject({path:[opt,1,1,0],msg:"discord_serverid is undefined"});
            if(!Array.isArray(emoteids)) emoteids = [emoteids];
            
            let emotes = {
                "names": emoteids.filter(e => {return !_regex.seventv_emote_urlreg().test(e)}),
                "urls": emoteids.filter(e => {return _regex.seventv_emote_urlreg().test(e)})
            };
    
            request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), {method: "GET"}, (e, r) => {
                if(e){
                    return reject(e);
                } else {
                    if(_regex.arrayreg().test(r.body)){
                        let dat = JSON.parse(r.body);
                        (async () => {
                            _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))
    
                            let emotenames = {};
                            Object.keys(dat).forEach(k => {emotenames[[...dat][k].name] = [...dat][k]})
                            let addemotes = {};
                            emotes.names.forEach(name => {
                                if(Object.keys(emotenames).includes(name)){
                                    addemotes[name] = emotenames[name];
                                }
                            });
    
                            for(i = 0; i < emotes.urls.length; i++){
                                let url = emotes.urls[i];
                                await new Promise((resolve2) => {
                                    request(urls.seventv.v2.emote.replace(":id", url.replace(_regex.seventv_emote_urlreg_2(), "")), {method: "GET"}, (e,r) => {
                                        if(e){return resolve2();} else {
                                            if(_regex.jsonreg().test(r.body)){
                                                let dat = JSON.parse(r.body);
                                                addemotes[dat.name] = dat;
                                            }
                                            return resolve2();
                                        }
                                    });
                                })
                            };
                            
                            // console.log(addemotes);
    
                            let addemotes2 = {
                                "resolve": {},
                                "reject": {}
                            };
    
                            for(let addemote in addemotes){
                                await new Promise((resolve2) => {
                                    (async() => {
                                        await new Promise((resolve3) => {
                                            addemotes[addemote].urls2 = [addemotes[addemote].urls[2][1]];
                                            request(addemotes[addemote].urls[3][1].replace(".webp", ".gif"), (e,r) => {
                                                if(e){
                                                    return resolve3();
                                                } else {
                                                    let emotebuffer = Buffer.from(r.body);
                                                    if(emotebuffer.byteLength !== 21854){
                                                        let emoteurlnum = 3;
                                                        if(emotebuffer.byteLength > 33554432){
                                                            emoteurlnum = 0;
                                                        }
                                                        addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif")];
                                                        // addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif"), emotebuffer];
                                                    } 
                                                    return resolve3();
                                                }
                                            });
                                        })
                                        .then(() => {
                                            // console.log(addemotes)
                                            if(!j.dc.client) return reject();
                                            j.dc.client.guilds.fetch(discord_serverid)
                                            .then(guild => {
                                                // (addemotes[addemote].urls2[1] ? addemotes[addemote].urls2[1].toString() : addemotes[addemote].urls2[0]), 
                                                guild.emojis.create(
                                                    addemotes[addemote].urls2[0],
                                                    addemotes[addemote].name.replace(new RegExp(`[^\\w]`, "g"), ""), 
                                                    {reason:`Add via chat command by ${j_.message.userstate.username}`}
                                                )
                                                .then(em => {
                                                    addemotes2.resolve[addemotes[addemote].name] = em;
                                                    _appf(paths.seventvlog, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                    _appf(paths.log, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                    return resolve2(em);
                                                })
                                                .catch(e => {
                                                    addemotes2.reject[addemotes[addemote].name] = e;
                                                    return resolve2(e);
                                                })
                                            })
                                            .catch(e => {
                                                addemotes2.reject[addemotes[addemote].name] = e;
                                                return resolve2(e);
                                            })
                                        })
                                    })();
                                })
                            }
    
                            return resolve(addemotes2);
                        })();
                    } else {
                        return reject(r.body);
                    }
                }
            });
            
        });
    }
};
/*
async function seventv(opt, j_, noreturn, channelid, discord_serverid, emoteids){
    return new Promise((resolve, reject) => {
        let j = require("../variables/j");
        switch (opt){
            case 0: {
                // get and cache channel 
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});

                request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), {method: "GET"}, (e, r) => {
                    if(e){
                        return reject(e);
                    } else {
                        if(_regex.jsonreg().test(r.body)){
                            let dat = JSON.parse(r.body);
                            _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))
                            .then(e => {
                                return resolve(e);
                            })
                            .catch(e => {
                                console.error(e);
                                return reject(e);
                            })
                        } else {
                            return reject(r.body);
                        }
                    }
                });
                
                break;
            }

            case 1: {
                // add emote(s) to channel
                if(!emoteids) return reject({path:[opt,0],msg:"emoteids is undefined"});
                if(!discord_serverid) return reject({path:[opt,1,0],msg:"discord_serverid is undefined"});
                if(!Array.isArray(emoteids)) emoteids = [emoteids];
                
                let emotes = {
                    "names": emoteids.filter(e => {return !_regex.seventv_emote_urlreg().test(e)}),
                    "urls": emoteids.filter(e => {return _regex.seventv_emote_urlreg().test(e)})
                };

                request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), {method: "GET"}, (e, r) => {
                    if(e){
                        return reject(e);
                    } else {
                        if(_regex.arrayreg().test(r.body)){
                            let dat = JSON.parse(r.body);
                            (async () => {
                                _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))

                                let emotenames = {};
                                Object.keys(dat).forEach(k => {emotenames[[...dat][k].name] = [...dat][k]})
                                let addemotes = {};
                                emotes.names.forEach(name => {
                                    if(Object.keys(emotenames).includes(name)){
                                        addemotes[name] = emotenames[name];
                                    }
                                });

                                for(i = 0; i < emotes.urls.length; i++){
                                    let url = emotes.urls[i];
                                    await new Promise((resolve2) => {
                                        request(urls.seventv.v2.emote.replace(":id", url.replace(_regex.seventv_emote_urlreg_2(), "")), {method: "GET"}, (e,r) => {
                                            if(e){return resolve2();} else {
                                                if(_regex.jsonreg().test(r.body)){
                                                    let dat = JSON.parse(r.body);
                                                    addemotes[dat.name] = dat;
                                                }
                                                return resolve2();
                                            }
                                        });
                                    })
                                };
                                
                                // console.log(addemotes);

                                let addemotes2 = {
                                    "resolve": {},
                                    "reject": {}
                                };

                                for(let addemote in addemotes){
                                    await new Promise((resolve2) => {
                                        (async() => {
                                            await new Promise((resolve3) => {
                                                addemotes[addemote].urls2 = [addemotes[addemote].urls[2][1]];
                                                request(addemotes[addemote].urls[3][1].replace(".webp", ".gif"), (e,r) => {
                                                    if(e){
                                                        return resolve3();
                                                    } else {
                                                        let emotebuffer = Buffer.from(r.body);
                                                        if(emotebuffer.byteLength !== 21854){
                                                            let emoteurlnum = 3;
                                                            if(emotebuffer.byteLength > 33554432){
                                                                emoteurlnum = 0;
                                                            }
                                                            addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif")];
                                                            // addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif"), emotebuffer];
                                                        } 
                                                        return resolve3();
                                                    }
                                                });
                                            })
                                            .then(() => {
                                                // console.log(addemotes)
                                                j.dc.client.guilds.fetch(discord_serverid)
                                                .then(guild => {
                                                    // (addemotes[addemote].urls2[1] ? addemotes[addemote].urls2[1].toString() : addemotes[addemote].urls2[0]), 
                                                    guild.emojis.create(
                                                        addemotes[addemote].urls2[0],
                                                        addemotes[addemote].name.replace(new RegExp(`[^\\w]`, "g"), ""), 
                                                        {reason:`Add via chat command by ${j_.message.userstate.username}`}
                                                    )
                                                    .then(em => {
                                                        addemotes2.resolve[addemotes[addemote].name] = em;
                                                        _appf(paths.seventvlog, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                        _appf(paths.log, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                        return resolve2(em);
                                                    })
                                                    .catch(e => {
                                                        addemotes2.reject[addemotes[addemote].name] = e;
                                                        return resolve2(e);
                                                    })
                                                })
                                                .catch(e => {
                                                    addemotes2.reject[addemotes[addemote].name] = e;
                                                    return resolve2(e);
                                                })
                                            })
                                        })();
                                    })
                                }

                                return resolve(addemotes2);
                            })();
                        } else {
                            return reject(r.body);
                        }
                    }
                });

                break;
            }
        };
    });
};
*/
module.exports = seventv;