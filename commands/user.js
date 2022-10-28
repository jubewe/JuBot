const getuser = require("../functions/getuser");
const _pixelize = require("../functions/_pixelize");
let j = require("../variables/j");

module.exports = {
    name: "user",
    id: "global_commands_user",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.msg.split(" ")[1]){
            getuser(1, j.message._.msg.split(" ")[1])
            .then(u => {
                j.send(2, j, `User ${_pixelize(j.message._.msg.split(" ")[1])}: ${_pixelize(u[0])} / ${u[1]}`);
            })
            .catch(e => {
                j.send(2, j, `Error: Could not recieve userid`);
            })
        } else {
            j.send(2, j, `Error: No user given`);
        }
    }
}