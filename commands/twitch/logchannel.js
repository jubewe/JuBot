const getuser = require("../../functions/twitch/getuser");
const _pixelize = require("../../functions/_pixelize");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "logchannel",
    id: "global_commands_logchannel",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    arguments: [{ name: "option", required: true, options: ["add", "remove", "delete"] }, { name: "logchannel", required: true, options: ["channel"] }],
    exec: async (j_) => {
        if (j_.message._.args()[0]) {
            if (!j.files().clientchannels.logchannels) j.files().clientchannels.logchannels = [];
            switch (j_.message._.args()[0]) {
                case "add": {
                    if (j_.message._.args()[1]) {
                        getuser(1, j_.message._.args()[1])
                            .then(u => {
                                if (!j.files().clientchannels.logchannels.includes(u[1])) {
                                    j.files().clientchannels.logchannels.push(u[1]);

                                    j_.send(`Successfully added ${_pixelize(u[0])} (${u[1]}) to logchannels`);
                                } else {
                                    j_.send(`Error: Channel already added`);
                                }
                            })
                            .catch(e => {
                                j_.send(`Error: Could not get user: ${_returnerr(e)}`);
                            })
                    } else {
                        j_.send(`Error: No channel to add given`);
                    }

                    break;
                }

                case "remove":
                case "delete": {
                    if (j_.message._.args()[1]) {
                        getuser(1, j_.message._.args()[1])
                            .then(u => {
                                if (j.files().clientchannels.logchannels.includes(u[1])) {
                                    j.files().clientchannels.logchannels.splice(j.files().clientchannels.logchannels.indexOf(u[1]), 1);

                                    j_.send(`Successfully removed ${_pixelize(u[1])} (${u[1]}) from logchannels`);
                                } else {
                                    j_.send(`Error: Channel is not in logchannels`);
                                }
                            })
                            .catch(e => {

                            })
                    } else {
                        j_.send(`Error: No channel to remove given`);
                    }

                    break;
                }
            }
        } else {
            j_.send(`Error: No option given`);
        }
    }
}