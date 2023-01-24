const applicationcommand_parser = require("../../functions/discord/applicationcommand_parser");
const replacevariables = require("../../functions/discord/replacevariables");
const { discord } = require("../../functions/_");
const _log = require("../../functions/_log");
const _staticspacer = require("../../functions/_staticspacer");
const commandhandler = require("./commandhandler");
const getuserperm = require("../../functions/discord/getuserperm");
const userperms = require("../../functions/discord/userperms");
const { Interaction } = require("discordjs13.11.0");

/**
 * @param {Interaction} response 
 */

module.exports = async (response) => {
    let j = require("../../variables/j");
    let j_ = {message:{"_":{}}};
    // console.log(response.options.data);
    let message_ = applicationcommand_parser(response);
    let message = j_.message.message = message_.message;
    let userstate = j_.message.userstate = message_.userstate;
    let channel = j_.message.channel  = message_.channel;
    let server = j_.message.server = message_.server;
    j_.message.response = message_.response;
    
    // if(response.guildId && j.files().discord.clientguilds.logguilds.includes(response.guildId)){
    if(true){
        _log(0, `${_staticspacer(1, `applicationcommand`)} ${_staticspacer(1, (response.guild ? response.guild.name : response.user.username))} ${_staticspacer(1, response.user.tag)}: ${response.commandName} (${response.commandId})`);
        // console.log(j.dc.client.application.commands.cache.get(response.id));
    };

    let msg = j_.message._.msg = message.messageText;
    let user = j_.message._.user = userstate.username;
    let chan = j_.message._.chan = channel.name;
    let usertag = j_.message._.usertag = `${userstate.username} > `;
    let userperm = j_.message._.userperm = await getuserperm(j_.message.userstate.id);
    let userperms_ = j_.message._.userperms = await userperms(j_);
    let args = j_.message._.args = () => {return response.options._hoistedOptions.map(a => {return a.value})};

    j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {return require("../../functions/discord/actions/send_")(j_, response, sendopt, sendmessage, sendmulti, sendreplacer)};

    let command = j_.message._.command = response.commandName;
    if(command.length > 0){
        (async () => {
            commandhandler(j_);
        })();
    };
};