const pixelize = require("../../functions/_pixelize");
const returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "part",
    id: "global_commands_part",
    aliases: ["leave"],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.msg.split(" ")[1] !== undefined){
            let partchan = j_.message._.msg.split(" ")[1].toLowerCase();
            j.part(partchan)
            .then(pc => {
                j_.send(`Successfully parted ${pixelize(partchan)} ${returnerr(pc, 1)}`);
            })
            .catch(e => {
                j_.send(`Error: Could not part ${pixelize(partchan)} ${returnerr(e, 0)} ${returnerr(e, 1)}`)
            })
        } else {
            j_.send(`Error: No Channel given`);
        }
    }
}