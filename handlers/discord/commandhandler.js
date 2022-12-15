const j = require("../../variables/j");

function commandhandler(j_){
    let commands = require("../../commands/discord/_");
    if(!commands[j_.message._.command]) return;

    if(true === true){
        (async () => {
            j_.message.response.react(j.c().discord.emojis.load);
            commands[j_.message._.command].exec(j_);
        })();
    }
};

module.exports = commandhandler;