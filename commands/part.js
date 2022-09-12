const pixelize = require("../functions/_pixelize");
const returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "part",
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
                j.send(2, null, `Successfully parted ${pixelize(partchan)} ${returnerr(pc, 1)}`);
            })
            .catch(e => {
                j.send(2, null, `Error: Could not part ${pixelize(partchan)} ${returnerr(e, 0)} ${returnerr(e, 1)}`)
            })
        } else {
            j.send(2, null, `Error: No Channel given`);
        }
    }
}