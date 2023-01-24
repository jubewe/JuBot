const message_parser = require("../../functions/discord/message_parser");
const replacevariables = require("../../functions/discord/replacevariables");
const { discord } = require("../../functions/_");
const _log = require("../../functions/_log");
const _staticspacer = require("../../functions/_staticspacer");
const commandhandler = require("./commandhandler");
const getuserperm = require("../../functions/discord/getuserperm");
const userperms = require("../../functions/discord/userperms");
const { Message } = require("discordjs13.11.0");

/**
 * @param {Message} response 
 */

module.exports = async (response) => {
    try {
        let j = require("../../variables/j");
        let j_ = {message:{"_":{}}};
        let message_ = message_parser(response);
        let message = j_.message.message = message_.message;
        let userstate = j_.message.userstate = message_.userstate;
        let channel = j_.message.channel  = message_.channel;
        let server = j_.message.server = message_.server;
        j_.message.response = message_.response;
        
        if(j.files().discord.clientguilds.logguilds.includes(response.guild.id)){
            _log(0, `${_staticspacer(1, `messageCreate`)} ${_staticspacer(1, response.guild.name)} ${_staticspacer(1, response.author.tag)} ${_staticspacer(2, `[M: ${response.mentions.users.size + response.mentions.roles.size} | A: ${response.attachments.size} | E: ${response.embeds.length}]`)}: ${response.content}`);
        };
    
        let msg = j_.message._.msg = message.messageText;
        let user = j_.message._.user = userstate.username;
        let chan = j_.message._.chan = channel.name;
        let usertag = j_.message._.usertag = `${userstate.username} > `;
        let userperm = j_.message._.userperm = await getuserperm(j_.message.userstate.id);
        let userperms_ = j_.message._.userperms = await userperms(j_);
        let args = j_.message._.args = () => {return require("../../functions/discord/messageargs")(j_, j)};
    
        j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {return require("../../functions/discord/actions/send_")(j_, response, sendopt, sendmessage, sendmulti, sendreplacer)};
    
        let prefix = j_.message._.prefix = j.c().prefix;
        if(new RegExp(`^${j.c().prefix}`).test(msg)){
            let command = j_.message._.command = msg.split(" ")[0].split(prefix)[1];
            if(command.length > 0){
                (async () => {
                    commandhandler(j_);
                })();
            }
        };
    } catch(e){
        console.error(e);
    }
};