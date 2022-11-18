let j = require("../variables/j");

module.exports = {
    name: "say",
    id: "global_commands_say",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.msg.split(" ")[1] !== undefined){
            let saymsg = j_.message._.msg.substring(j_.message._.msg.split(" ")[0].length, j_.message._.msg.length);
            j.send(0, j_, saymsg, null, false);
        } else {
            j.send(2, j_, `Error: Nothing to say given`);
        }
    }
}