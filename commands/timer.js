const _cleantime = require("../functions/_cleantime");
const _converttime = require("../functions/_converttime");
const _splitafter = require("../functions/_splitafter");
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
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let ttime = _converttime(j_.message._.args()[0], false);
            let tmsg = "";

            if(j_.message._.args()[1]){
                tmsg = _splitafter(j_.message._.msg, 1)
            } else {
                tmsg = "No message";
            }

            if(!isNaN(ttime)){
                _timer(1, j_.message.userstate.id, ttime, tmsg, j_.message.channel.name, true)
                .then(t => {
                    let timecl = _cleantime(ttime, 5, 2);
                    j_.send(`Successfully set timer (${timecl.time.join(" ")})`);
                })
            } else {
                j_.send(`Error: Invalid time format`);
            }
        } else {
            j_.send(`Error: Expected time at arg 1`);
        }
    }
}