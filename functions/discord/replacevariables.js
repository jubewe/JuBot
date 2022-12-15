const _channel = require("../twitch/_channel");
const customcommand = require("../twitch/customcommand");
const customcounter = require("../twitch/customcounter");
const customkeyword = require("../twitch/customkeyword");
const request = require("request");

const _regex = require("../_regex");
const _pickrandom = require("../_pickrandom");
const _randomnum = require("../_randomnum");

async function replacevariables(){
    let files = require("../../variables/files");
    
    let j_ = [...arguments][0];
    let msg = [...arguments][1] || j_.message.content;

    if([null, undefined].includes(j_.message._.msg)) return msg;

    let msgcommandreg = new RegExp(`\\$\\(commands+\\s+[^\\)]+\\)`, "gi");
    let msgkeywordreg = new RegExp(`\\$\\(keywords+\\s+[^\\)]+\\)`, "gi");
    let msgsettingsreg = new RegExp(`\\$\\(settings+\\s+[\\w]+\\)`, "gi");
    let msgindexreg = new RegExp(`\\$\\(message\\[[\\d]+\\]\\)`, "gi");
    let msgrequestreg = new RegExp(`\\$\\(request+\\s+[^\\)]+\\)`, "gi");
    let msgrequestreg2 = new RegExp(`\\$\\(request+\\s+[^\\)]+\\)(\\.+[\\w]+)*`, "gi");
    let msgevalreg = new RegExp(`\\$\\(eval+\\s+[^\\)]+\\)`, "gi");
    let msgcountreg = new RegExp(`\\$\\(count+(er)*\\s+(increment|update|set|get)+\\s+[\\w]+(\\s+[\\d]+)*\\)`, "gi");
    let msgpickreg = new RegExp(`\\$\\((random|choose|pick)+\\s[^\\)]+\\)`, "gi");
    let msgrandomnumreg = new RegExp(`\\$\\((randomnumber)+(\\s+[\\d]+){0,2}\\)`, "gi");

    let replacements = {
        "user": j_.message._.usertag_,
        "user2": j_.message._.usertag,

        "sender": j_.message.userstate.username,
        "sendername": j_.message.userstate.username,
        "senderdisplayname": j_.message.userstate.displayname,
        "senderid": j_.message.userstate.id,
        "senderismod": j_.message.userstate.ismod,
        "senderismodraw": j_.message.userstate.mod,
        "sendercolor": j_.message.userstate.color,
        "senderissubscriber": j_.message.userstate.subscriber,
        "senderusertype": j_.message.userstate.usertype,
        "senderisturbo": j_.message.userstate.turbo,
        "senderbadges": j_.message.userstate.badges,
        "senderbadgesinfo": j_.message.userstate.badgesinfo,
        
        "channel": j_.message.channel.name,
        "channelname": j_.message.channel.name,
        "channeldisplayname": j_.message.channel.name,
        "channelid": j_.message.channel.id,
        
        "message": j_.message.message.content,
        "messageid": j_.message.message.id,
        "messagetype": j_.message.message.type,
        "messageisaction": j_.message.message.isAction,
        "messageisfirstmsg": j_.message.userstate.firstmsg,
        "messageischeer": j_.message.message.isCheer,
        "messagebits": j_.message.message.bits,
        "messagebitsraw": j_.message.message.bitsraw,
        "messageemotes": j_.message.message.emotesraw,
        "messageemotescount": j_.message.message.emotecount,

        "timestamp": j_.message.server.timestampRaw,
        "timestampraw": j_.message.server.timestamp,

        "prefix": j_.message._.prefix,
        "command": j_.message._.command,
        "valorantmaps": files.defaults.valorant.maps["1"],
        "valorantagents": files.defaults.valorant.agents["1"]
        
    };

    for(let replacement in replacements){
        msg = msg.replace(new RegExp(`\\$\\(${replacement}\\)`, "gi"), replacements[replacement]);
    };

    if(msgcommandreg.test(msg)){
        msg = msg.replace(msgcommandreg, "");
        return;
        let msgcommand = msg.match(msgcommandreg);
        for(let msgcommand2 in msgcommand){
            let commandname = msgcommand[msgcommand2].split(new RegExp(`\\$\\(commands+\\s+`, "i"))[1].split(new RegExp(`\\)`, "i"))[0].toLowerCase();
            let referenceidtest = _regex.j_id_custom_commandreg().test(commandname);
            await customcommand(0, j_, false, j_.message.channel.id, (referenceidtest ? commandname : null), (referenceidtest ? null : commandname))
            .then(cmd => {
                msg = msg.replace(msgcommand[msgcommand2], cmd.response);
            })
            .catch(e => {
                console.error(e)
                msg = msg.replace(msgcommand[msgcommand2], "");
            })
        }
    };
    
    if(msgkeywordreg.test(msg)){
        msg = msg.replace(msgkeywordreg, "");
        return;
        let msgkeyword = msg.match(msgkeywordreg);
        for(let msgkeyword2 in msgkeyword){
            let keywordname = msgkeyword[msgkeyword2].split(new RegExp(`\\$\\(keywords+\\s+`, "i"))[1].split(new RegExp(`\\)`, "i"))[0].toLowerCase();
            let referenceidtest = _regex.j_id_custom_keywordreg().test(keywordname);
            console.log(keywordname)
            await customkeyword(0, j_, false, j_.message.channel.id, (referenceidtest ? keywordname : null), (referenceidtest ? null : keywordname))
            .then(key => {
                msg = msg.replace(msgkeyword[msgkeyword2], key.response);
            })
            .catch(e => {
                console.error(e)
                msg = msg.replace(msgkeyword[msgkeyword2], "");
            })
        }
    };

    if(msgsettingsreg.test(msg)){
        msg = msg.replace(msgsettingsreg, "");
        return;
        let msgsettings = msg.match(msgsettingsreg);
        for(let msgsettings2 in msgsettings){
            let msgsetting = msgsettings[msgsettings2].split(new RegExp(`^\\$\\(settings+\\s+`, "i"))[1].split(new RegExp(`\\)$`))[0].toLowerCase();
            await new Promise((resolve) => {
                _channel(0, null)
                .then(ch => {
                    if(Object.keys(ch).includes(msgsetting)){
                        msg = msg.replace(msgsettings[msgsettings2], ch[msgsetting]);
                    } else {
                        msg = msg.replace(msgsettings[msgsettings2], `[Error: Setting not found]`);
                    }
                    return resolve();
                })
                .catch(e => {
                    msg = msg.replace(msgsettings[msgsettings2], `[Error: Could not find setting]`);
                    return resolve();
                })
            })
        }
    };

    if(msgindexreg.test(msg)){
        let msgindex = msg.match(msgindexreg);
        for(let msgindex2 in msgindex){
            let indexnum = msgindex[msgindex2].split(new RegExp(`\\$\\(message\\[`))[1].split(new RegExp(`\\]\\)`))[0];
            msg = msg.replace(msgindex[msgindex2], (j_.message.message.messageText.split(" ")[indexnum] || ""));
        }
    };

    if(msgrequestreg.test(msg)){
        let msgrequest = msg.match(msgrequestreg2);
        for(let msgrequest2 in msgrequest){
            let msgurl = msgrequest[msgrequest2].split(new RegExp(`\\$\\(request+\\s+`, "i"))[1].split(new RegExp(`\\)`, "i"))[0];
            let msgjsonkey = (msgrequestreg2.test(msg) ? msgrequest[msgrequest2].split(msgrequestreg)[1].split(".")[1] : null);
            if(_regex.urlreg().test(msgurl)){
                await new Promise((resolve) => {
                    request(msgurl, {method: "GET"}, (e, r) => {
                        if(e){
                            msg = msg.replace(new RegExp(`\\$\\(request+\\s+${msgurl}\\)`, "i"), `[Error: ${e.code}]`);
                        } else {
                            let dat = r.body;
                            if(_regex.jsonreg().test(dat)){
                                dat = JSON.parse(dat);
                                if(msgjsonkey){
                                    dat = dat[msgjsonkey];
                                }

                                if(typeof dat === "object"){
                                    dat = JSON.stringify(dat);
                                }
                            }
                            msg = msg.replace(msgrequest[msgrequest2], dat);
                        }
                        return resolve();
                    });
                })
            } else {
                msg = msg.replace(new RegExp(`\\$\\(request+\\s+${msgurl}\\)`, "i"), `[Error: URL does not match urlregex]`);
            }
        }
    };

    if(msgevalreg.test(msg)){
        msg = msg.replace(msgevalreg, `[Error: Not finished yet]`);
        /*
        let msgeval = msg.match(msgevalreg);
        for(let msgeval2 in msgeval){
            let msgeval_ = msgeval[msgeval2].split(new RegExp(`^\\$\\(eval+\\s+`, "i"))[1].split(new RegExp(`\\)$`, "i"))[0]
            try {
                let a = "a";
                function exec_(resolve){
                    "use strict";
                    let b = "b";
                    // Object.assign(this.j_, undefined);
                    // Object.assign(this.require, undefined);
                    var msgevalexec = eval(msgeval_);
                    return resolve(msgevalexec);
                };
                await new Promise(exec_)
                .then(msgevalexec => {
                    msg = msg.replace(msgeval[msgeval2], `[EVAL] ${msgevalexec}`);
                })
            } catch(e) {
                msg = msg.replace(msgeval[msgeval2], `[Error: Could not execute script: ${e.message}`);
            }
        }
        */
    };

    if(msgcountreg.test(msg)){
        msg = msg.replace(msgcountreg, "");
        return;
        let msgcountmatch = msg.match(msgcountreg);
        for(let msgcount2 in msgcountmatch){
            let msgcountopt = msgcountmatch[msgcount2].split(new RegExp(`\\$\\(count+(er)*\\s+`, "i"))[2].split(new RegExp(`\\s+[\\w]+(\\s+[\\d]+)*\\)`, "i"))[0];
            let msgcountname = msgcountmatch[msgcount2].split(new RegExp(`\\$\\(count+(er)*\\s+(increment|update|set|get)+\\s+`))[3].split(new RegExp(`(\\s+[\\d]+)*\\)`, "i"))[0];
            let msgcountnum = msgcountmatch[msgcount2].split(new RegExp(`\\$\\(count+(er)*\\s+(increment|update|set|get)+\\s+[\\w]+\\s*`, "i"))[3].split(new RegExp(`\\)`, "i"))[0];
            msgcountnum = (msgcountnum.length > 0 ? msgcountnum : undefined);

            let msgcountidtest = _regex.j_id_custom_counterreg().test(msgcountname);
            switch (msgcountopt){
                case "increment": {
                    await customcounter(5, j_, false, j_.message.channel.id, (msgcountidtest ? msgcountname : undefined), (msgcountidtest ? undefined : msgcountname), msgcountnum)
                    .then(counter => {
                        msg = msg.replace(msgcountmatch[msgcount2], counter.num);
                    })
                    .catch(e => {
                        msg = msg.replace(msgcountmatch[msgcount2], `[Error: ${e.msg || "code error"}]`);
                    })
                    break;
                }

                case "get": {
                    await customcounter(0, j_, false, j_.message.channel.id, (msgcountidtest ? msgcountname : undefined), (msgcountidtest ? undefined : msgcountname), msgcountnum)
                    .then(counter => {
                        msg = msg.replace(msgcountmatch[msgcount2], counter.num);
                    })
                    .catch(e => {
                        msg = msg.replace(msgcountmatch[msgcount2], `[Error: ${e.msg || "code error"}]`);
                    })
                    break;
                }

                case "set":
                case "update": {
                    await customcounter(4, j_, false, j_.message.channel.id, (msgcountidtest ? msgcountname : undefined), (msgcountidtest ? undefined : msgcountname), msgcountnum)
                    .then(counter => {
                        msg = msg.replace(msgcountmatch[msgcount2], counter.num);
                    })
                    .catch(e => {
                        msg = msg.replace(msgcountmatch[msgcount2], `[Error: ${e.msg || "code error"}]`);
                    })
                    break;
                }
            }
        }
    };

    if(msgpickreg.test(msg)){
        let msgpickmatch = msg.match(msgpickreg);
        for(let msgpick2 in msgpickmatch){
            let msgpickentries = msgpickmatch[msgpick2].split(new RegExp(`\\$\\((random|choose|pick)+\\s+`, "i"))[2].split(new RegExp(`\\)`, "i"))[0].split(",");
            msg = msg.replace(msgpickmatch[msgpick2], _pickrandom(msgpickentries, 1));
        }
    };

    if(msgrandomnumreg.test(msg)){
        let msgrandomnummatch = msg.match(msgrandomnumreg);
        for(let msgrandomnum2 in msgrandomnummatch){
            let msgrandomnummin = msgrandomnummatch[msgrandomnum2].split(new RegExp(`\\$\\(randomnumber+\\s+`))[1].split(new RegExp(`(\\s|\\))`))[0];
            let msgrandomnummax = msgrandomnummatch[msgrandomnum2].split(new RegExp(`\\$\\(randomnumber+\\s+\\d+\\s+`))[1].split(new RegExp(`(\\))`))[0];
            msg = msg.replace(msgrandomnummatch[msgrandomnum2], _randomnum(msgrandomnummin, msgrandomnummax));
        }
    };

    msg = msg.replace("$(test)", `$\(${Object.keys(replacements).join("\) $\(")}\)`);

    met = msg.replace(msgindexreg, "");
    msg = msg.replace(msgcommandreg, "");
    msg = msg.replace(msgkeywordreg, "");

    return msg;
};

module.exports = replacevariables;