const getuser = require("../functions/twitch/getuser");
const _pixelize = require("../functions/_pixelize");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "knownbots",
    id: "global_commands_knownbots",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    arguments: [{ name: "option", required: true, options: ["add", "remove", "delete", "get", "list"] }, { name: "botname", required: false, options: [] }],
    exec: async (j_) => {
        switch (j_.message._.command) {
            case "knownbots": {
                if (j_.message._.args()[0]) {
                    switch (j_.message._.args()[0]) {
                        case "add": { addknownbot(1); break; }
                        case "remove":
                        case "delete": { removeknownbot(1); break; }

                        case "get":
                        case "list": { getknownbots(); break; }
                        default: {
                            j_.send(`Error: Option not found`);
                        }
                    }
                } else {
                    j_.send(`Error: No option given`);
                }

                break;
            }

            case "getknownbot":
            case "getknownbots": { getknownbots(); break; }
            case "addknownbot": { addknownbot(0); break; }
            case "removeknownbot":
            case "deleteknownbot": { removeknownbot(0); break; }
        }


        async function addknownbot(num) {
            if (j_.message._.args()[num]) {
                getuser(1, j_.message._.args()[num])
                    .then(u => {
                        if (!j.files().twitch_knownbots.bots.includes(u[1])) {
                            j.files().twitch_knownbots.bots.push(u[1]);
                            j_.send(`Successfully added ${_pixelize(u[0])} (${u[1]}) to known bots`);
                        } else {
                            j_.send(`Error: Bot ${u[1]} already in known bots`);
                        }
                    })
                    .catch(e => {
                        j_.send(`Error: Could not get bot ${_returnerr(e)}`);
                    })
            } else {
                j_.send(`Error: No bot given`);
            }
        };

        async function removeknownbot(num) {
            if (j_.message._.args()[num]) {
                getuser(1, j_.message._.args()[num])
                    .then(u => {
                        if (j.files().twitch_knownbots.bots.includes(u[1])) {
                            j.files().twitch_knownbots.bots.splice(j.files().twitch_knownbots.bots.indexOf(u[1]), 1);
                            j_.send(`Successfull removed ${_pixelize(u[0])} (${u[1]}) from known bots`);
                        } else {
                            j_.send(`Error: Bot ${u[1]} not found in known bots`);
                        }
                    })
                    .catch(e => {
                        j_.send(`Error: Could not get bot ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
            } else {
                j_.send(`Error: No bot given`);
            }
        };

        async function getknownbots() {
            j_.send(`Known bots (ids): ${j.files().twitch_knownbots.bots.join(", ")}`);
        };
    }
};