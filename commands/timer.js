const _cleantime = require("../functions/_cleantime");
const _converttime = require("../functions/_converttime");
const _splitafter = require("../functions/_splitafter");
const _timer = require("../functions/twitch/_timer");
let j = require("../variables/j");
const _returnerr = require("../functions/_returnerr");

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
    arguments: [{ name: "time", required: true, options: [] }, { name: "message", required: false, options: [] }],
    exec: async (j_) => {
        if (j_.message._.args()[0]) {
            switch (j_.message._.args()[0]) {
                case "update":
                case "edit": {
                    if(!j_.message._.args()[1]) return j_.send(`Error: No Timerid specified`);
                    if(!j_.message._.args()[2]) return j_.send(`Error: No new time specified`);

                    let timerid = j_.message._.args()[1];
                    let newtime = _converttime(j_.message._.args()[2]);

                    _timer(3, j_.message.userstate.id, timerid, newtime)
                    .then(t => {
                        j_.send(`Successfully updated timer time to ${_cleantime(newtime, 5).time.join(" and ")} (ID: ${t.id})`);
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not update timer: ${_returnerr(e, 0)} ${_returnerr(e,1)}`);
                    });
                    
                    break;
                };

                default: {
                    let ttime = _converttime(j_.message._.args()[0], false);
                    let tmsg = "";

                    if (j_.message._.args()[1]) {
                        tmsg = _splitafter(j_.message._.msg, 2)
                    } else {
                        tmsg = "No message";
                    }

                    if (!isNaN(ttime)) {
                        _timer(1, j_.message.userstate.id, ttime, tmsg, j_.message.channel.name, true)
                            .then(t => {
                                j_.send(`Successfully set timer to ${_cleantime(ttime, 5).time.join(" and ")} (ID: ${t.id})`);
                            })
                    } else {
                        j_.send(`Error: Invalid time format`);
                    }

                    break;
                };
            };
        } else {
            j_.send(`Error: Expected time at arg 1`);
        }
    }
}