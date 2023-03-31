const pixelize = require("../../functions/_pixelize");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "part",
    id: "global_commands_part",
    aliases: ["leave"],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    arguments: [{ name: "partchannel", required: true, options: ["channel"] }],
    exec: async (j_) => {
        if (j_.message._.msg.split(" ")[1] !== undefined) {
            let partchan = j_.message._.msg.split(" ")[1].toLowerCase();
            j.part(partchan)
                .then(pc => {
                    j_.send(`Successfully parted ${pixelize(partchan)}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not part ${pixelize(partchan)}: ${_returnerr(e)}`);
                })
        } else {
            j_.send(`Error: No Channel given`);
        }
    }
}