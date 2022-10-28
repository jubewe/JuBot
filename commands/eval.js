let j = require("../variables/j");

module.exports = {
    name: "eval",
    id: "global_commands_eval",
    aliases: [],
    state: 1,
    add_version: "0.0.2",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    send_msg_noperm: true,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.msg.split(" ")[1] !== undefined){
            let evalmsg = j.message._.msg.split(" ");
            evalmsg.shift();
            evalmsg = evalmsg.join(" ");
            try {
                let eval_ = await eval(`(async () => {${evalmsg}})()`);
                j.send(2, j, `Successfully executed code [${typeof eval_}]> ${eval_}`);
            } catch(e){
                j.send(2, j, `Error: Could not execute code: ${e.message}`);
            }
        } else {
            j.send(2, j, `Error: Nothing to execute given`);
        }
    }
};