let j = require("../../variables/j");

function applicationcommandhandler(j_){
    let commands = require("../../commands/discord/_");
    if(!commands[j_.message._.command]) return;

    if(true === true){
        (async () => {
            commands[j_.message._.command].exec(j_);
        })();
    }
};

module.exports = applicationcommandhandler;