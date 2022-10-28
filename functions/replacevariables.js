const paths = require("../variables/paths");
const customcommand = require("./customcommand");
const _rf = require("./_rf");

async function replacevariables(j, msg){
    j = j || require("../variables/j");
    msg = msg || j.message.content;

    if([null, undefined].includes(j.message.message.messageText)) return msg;

    let replacements = {
        "user": j.message._.usertag_,
        "user2": j.message._.usertag,

        "sender": j.message.userstate.username,
        "sendername": j.message.userstate.username,
        "senderdisplayname": j.message.userstate.displayname,
        "senderid": j.message.userstate.id,
        "senderismod": j.message.userstate.ismod,
        "senderismodraw": j.message.userstate.mod,
        "sendercolor": j.message.userstate.color,
        "senderissubscriber": j.message.userstate.subscriber,
        "senderusertype": j.message.userstate.usertype,
        "senderisturbo": j.message.userstate.turbo,
        "senderbadges": j.message.userstate.badges,
        "senderbadgesinfo": j.message.userstate.badgesinfo,
        
        "channel": j.message.channel.name,
        "channelname": j.message.channel.name,
        "channeldisplayname": j.message.channel.name,
        "channelid": j.message.channel.id,
        
        "message": j.message.message.content,
        "messageid": j.message.message.id,
        "messagetype": j.message.message.type,
        "messageisaction": j.message.message.isAction,
        "messageisfirstmsg": j.message.userstate.firstmsg,
        "messageischeer": j.message.message.isCheer,
        "messagebits": j.message.message.bits,
        "messagebitsraw": j.message.message.bitsraw,
        "messageemotes": j.message.message.emotesraw,
        "messageemotescount": j.message.message.emotecount,

        "timestamp": j.message.server.timestampRaw,
        "timestampraw": j.message.server.timestamp,
    };

    msg = msg.replace("$(test)", `$\(${Object.keys(replacements).join("\) $\(")}\)`);

    for(let replacement in replacements){
        msg = msg.replace(new RegExp(`\\$\\(${replacement}\\)`, "gi"), replacements[replacement]);
    };

    let msgindexreg = new RegExp(`\\$\\(message\\[[\\d]+\\]\\)`, "gi");
    if(msgindexreg.test(msg)){
        let msgindex = msg.match(msgindexreg);
        if(msgindex !== null){
            for(let msgindex2 in msgindex){
                let indexnum = msgindex[msgindex2].split(new RegExp(`\\$\\(message\\[`))[1].split(new RegExp(`\\]\\)`))[0];
                msg = msg.replace(new RegExp(`\\$\\(message\\[${indexnum}\\]\\)`, "i"), (j.message.message.messageText.split(" ")[indexnum] || ""));
            }
        }
    }

    let msgreferencereg = new RegExp(`\\$\\(references+\\s+[^\\)]+\\)`, "gi");
    if(msgreferencereg.test(msg)){
        let msgreference = msg.match(msgreferencereg);
        if(msgreference !== null){
            for(let msgreference2 in msgreference){
                let referencename = msgreference[msgreference2].split(new RegExp(`\\$\\(references+\\s+`, "i"))[1].split(new RegExp(`\\)`, "i"))[0].toLowerCase();
                await customcommand(0, j, false, j.message.channel.id, null, referencename)
                .then(cmd => {
                    msg = msg.replace(new RegExp(`\\$\\(references+\\s+${referencename}\\)`), cmd.response);
                })
                .catch(e => {})
            }
        }
    }

    return msg;
};

module.exports = replacevariables;