let j = require("../variables/j");

module.exports = {
    name: "cache",
    id: "global_commands_cache",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            
        } else {
            j.send(2, j_, `Error: No option given`);
        }
    }
}