let j = require("../variables/j");

module.exports = {
    name: "view",
    id: "global_commands_view",
    aliases: [],
    state: 1,
    add_version: "0.0.9",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.args()[0]){
            let viewchan = j.message._.args()[0];
            j.viewclient.join(viewchan);
        } else {
            j.send(2, null, `Error: No channel given`);
        }
    }
}