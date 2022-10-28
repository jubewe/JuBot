const { returnerr } = require("../functions/_");
const pixelize = require("../functions/_pixelize");
let j = require("../variables/j");

module.exports = {
    name: "join",
    id: "global_commands_join",
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
            let joinchan = j.message._.msg.split(" ")[1].toLowerCase();
            j.join(joinchan)
            .then(jc => {
                j.send(2, j, `Successfully joined ${pixelize(joinchan)}`);
            })
            .catch(e => {
                j.send(2, j, `Error: Could not join ${pixelize(joinchan)} ${returnerr(e, 0)} ${returnerr(e, 1)}`);
            })
        } else {
            j.send(2, j, `Error: No Channel given`);
        }
    }
}