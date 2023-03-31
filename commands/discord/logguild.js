const getuser = require("../../functions/discord/getuser");
const _pixelize = require("../../functions/_pixelize");
const _returnerr = require("../../functions/_returnerr");
let files = require("../../variables/files");
let j = require("../../variables/j");

module.exports = {
    name: "logchannel",
    id: "global_discord_commands_logguild",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    description: "Adds or removes a guild from the guilds which messages are shown in the console",
    arguments: [
        {
            type: 3,
            name: "Option",
            description: "Option of command",
            required: true,
            choices: [
                {
                    name: "Add",
                    value: "Option to add a guild to the guilds which messages are being logged in the console"
                },
                {
                    name: "Remove",
                    value: "Option to remove a guild from the guilds which messages are being logged in the console"
                }
            ]
        }
    ],
    exec: async (j_) => {
        if (j_.message._.args()[0]) {
            switch (j_.message._.args()[0]) {
                case "add": {
                    // if(j_.message._.args()[1]){
                    //     getguild(1, j_.message._.args()[1])
                    //     .then(u => {
                    //         if(!files.discord.clientguilds.logguilds.includes(u[1])){
                    //             files.discord.clientguilds.logguilds.push(u[1]);

                    //             j_.send(`Successfully added ${_pixelize(u[0])} (${u[1]}) to logguilds`);
                    //         } else {
                    //             j_.send(`Error: Guild already added`);
                    //         };
                    //     })
                    //     .catch(e => {
                    //         j_.send(`Error: Could not get user: ${_returnerr(e)}`);
                    //     })
                    // } else {
                    // }
                    j_.send(`Error: In production`);

                    break;
                }

                case "remove":
                case "delete": {
                    if (j_.message._.args()[1]) {
                        getuser(1, j_.message._.args()[1])
                            .then(u => {
                                if (files.discord.clientguilds.logguilds.includes(u[1])) {
                                    files.discord.clientguilds.logguilds.splice(files.discord.clientguilds.logguilds.indexOf(u[1]), 1);

                                    j_.send(`Successfully removed ${_pixelize(u[1])} (${u[1]}) from logchannels`);
                                } else {
                                    j_.send(`Error: Channel is not in logchannels`);
                                }
                            })
                            .catch(e => {
                                j_.send(`Error: Could not get channel: ${_returnerr(e)}`);
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