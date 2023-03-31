const { j_: cl_j_ } = require("../classes/classes").twitch;

const seventv = require("../functions/seventv");
const _appf = require("../functions/_appf");
const _mainpath = require("../functions/_mainpath");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");
module.exports = {
    name: "seventv",
    id: "global_commands_seventv",
    aliases: [],
    state: 1,
    add_version: "0.2.2",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: -1,
    cooldown_user: -1,
    /** @param {cl_j_} j_ */
    exec: async (j_) => {
        if (!j_.message.messageArguments[1]) return j_.send("Error: Option required");

        switch (j_.message.messageArguments[1]) {
            case "add": { addemote(1); break; }
            case "remove":
            case "delete": { removeemote(1); break; }
        };

        function addemote(n, channelid) {
            if (!j_.message.messageArguments[n + 1]) return j_.send("Error: Emotename required");
            let emotename = j_.message.messageArguments[n + 1];

            seventv.searchemote(j_, emotename)
                .then(emotes => {
                    let emote = emotes.data.emotes.items[0];
                    let emoteid = emote.id;
                    seventv.getchannel(j_, j_.message.channel.id)
                        .then(a => {
                            console.log(a)
                            _appf(_mainpath("./seventvbullshit.json"), a);
                        })

                    seventv.getuserid((channelid ?? j_.message.channel.id))
                        .then(channelid7tv => {
                            seventv.addemote(j_, channelid7tv[2], emoteid)
                                .then(() => {
                                    j_.send(`Successfully added emote ${emote.name} to ${channelid7tv[0]} (${channelid7tv[1]})`);
                                })
                                .catch(e => {
                                    j_.send(`Error: Could not add emote to channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                                });
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get 7tv id of channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        });
                });
        };

        function removeemote(n, channelid) {
            if (!j_.message.messageArguments[n + 1]) return j_.send("Error: Emotename required");
            let emotename = j_.message.messageArguments[n + 1];

            seventv.searchemote(j_, emotename)
                .then(emotes => {
                    let emote = emotes.data.emotes.items[0];
                    let emoteid = emote.id;
                    seventv.getuserid((channelid ?? j_.message.channel.id))
                        .then(channelid7tv => {
                            seventv.addemote(j_, channelid7tv[2], emoteid)
                                .then(() => {
                                    j_.send(`Successfully added emote ${emote.name} to ${channelid7tv[0]} (${channelid7tv[1]})`);
                                })
                                .catch(e => {
                                    j_.send(`Error: Could not add emote to channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                                });
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get 7tv id of channel: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                        });
                });
        };
    }
};