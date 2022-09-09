let j = require("../variables/j");

module.exports = {
    name: "join",
    aliases: [],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.msg.split(" ")[1] !== undefined){
            let joinchan = j.message._.msg.split(" ")[1];
            
        } else {
            j.send(2, null, `Error: No Channel given`);
        }
    }
}