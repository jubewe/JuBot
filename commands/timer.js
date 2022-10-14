const _cleantime = require("../functions/_cleantime");
const _converttime = require("../functions/_converttime");
const _regex = require("../functions/_regex");
const _timer = require("../functions/_timer");
let j = require("../variables/j");

module.exports = {
    name: "timer",
    id: "global_commands_timer",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 10000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.msg.split(" ")[1]){
            let ttime = _converttime(j.message._.msg.split(" ")[1], false);
            let tmsg = "";

            if(j.message._.msg.split(" ")[2]){
                tmsg = j.message._.msg;
                tmsg = tmsg.split(tmsg.split(" ").splice(0, 2).join(" ") + " ")[1];
            }

            if(!isNaN(ttime)){
                _timer(1, j.message.userstate.id, ttime, tmsg, j.message.channel.name, true)
                .then(t => {
                    let timecl = _cleantime(ttime, 5, 2);
                    j.send(2, null, `Successfully set timer (${timecl.time.join(" ")})`);
                })
            } else {
                j.send(2, null, `Error: Invalid time format`);
            }
        } else {
            j.send(2, null, `Error: Expected time at arg 1`);
        }
    }
}