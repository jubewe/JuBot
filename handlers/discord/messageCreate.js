const { discord } = require("../../functions/_");
const _log = require("../../functions/_log");
const _staticspacer = require("../../functions/_staticspacer");
const commandhandler = require("./commandhandler");

module.exports = (message) => {
    let j = require("../../variables/j");
    let j_ = {message:{"_":{}}};

    if(j.files().discord.clientguilds.logguilds.includes(message.guild.id)){
        _log(0, `${_staticspacer(1, message.guild.name)} ${_staticspacer(1, message.author.tag)} ${_staticspacer(2, `[M: ${message.mentions.users.size + message.mentions.roles.size} | A: ${message.attachments.size} | E: ${message.embeds.length}]`)}: ${message.content}`);
    };

    let msg = j_.message._.msg = message.content;
    let user = j_.message._.user = message.author.tag;
    let chan = j_.message._.chan = message.channel.name;
    let usertag = j_.message._.usertag = `${message.author.tag} > `;
    let args = j_.message._.args = require("../../functions/discord/messageargs")(j_, j);

    j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
        if(typeof sendopt !== "number" && !(sendmessage ?? undefined)){
            sendmessage = sendopt;
            sendopt = 2;
        };
        sendopt = (sendopt ?? 2);
        // if(typeof sendmessage === "string") message.channel.send(sendmessage);
        // if(typeof sendmessage === "object") if(!Array.isArray(sendmessage)) sendmessage = [sendmessage]; message.channel.send({embeds: sendmessage});
        switch (sendopt){
            case 0: {
                message.channel.send(sendmessage);
                break;
            }

            case 1: {
                message.author.send(sendmessage);
                break;
            }

            case 2: {
                if(typeof sendmessage === "string") sendmessage = [discord.messageembed(null, sendmessage)];
                message.channel.send({embeds: sendmessage});
                break;
            }
        }
    };

    let prefix = j_.message._.prefix = j.c().prefix;
    if(new RegExp(`^${j.c().prefix}`).test(message.content)){
        let command = j_.message._.command = message.content.split(" ")[0].split(prefix)[1];
        if(command.length > 0){
            (async () => {
                commandhandler(j_);
            })();
        }
    };
};