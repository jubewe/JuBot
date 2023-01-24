const _appf = require("../functions/_appf");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");
const paths = require("../variables/paths");

module.exports = {
    name: "todo",
    id: "global_commands_todo",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            switch (j_.message._.args()[0]){
                case "add": {
                    if(j_.message._.args()[1]){
                        _appf(paths.todo, `\n${_splitafter(j_.message._.msg, 2)}`);
                        j_.send(`Successfully added ${_splitafter(j_.message._.msg, 1)} to todos`);
                    } else {
                        j_.send(`Error: Nothing to add given`);
                    }
                    break;
                }

                default: {
                    j_.send(`Error: Option not found`);
                }
            }
        } else {
            j_.send(`Error: No option given`);
        }
    }
}