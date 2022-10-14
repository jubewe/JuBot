let j = require("../variables/j");

module.exports = {
    name: "seventv",
    id: "global_commands_seventv",
    aliases: [],
    state: 1,
    add_version: "0.0.8",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 15000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.args().length >= 1){
            switch (j.message._.args()[1]){
                case "add": {

                    
                    break;
                }

                case "remove": {


                    break;
                }


            }
        } else {

        }
    }
}