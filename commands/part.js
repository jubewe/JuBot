const pixelize = require("../functions/_pixelize");
const returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

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
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.msg.split(" ")[1] !== undefined){
            let partchan = j.message._.msg.split(" ")[1].toLowerCase();
            j.part(partchan)
            .then(pc => {
                j.send(2, j, `Successfully parted ${pixelize(partchan)} ${returnerr(pc, 1)}`);
            })
            .catch(e => {
                j.send(2, j, `Error: Could not part ${pixelize(partchan)} ${returnerr(e, 0)} ${returnerr(e, 1)}`)
            })
        } else {
            j.send(2, j, `Error: No Channel given`);
        }
    }
}