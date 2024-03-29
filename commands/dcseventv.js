const _channel = require("../functions/twitch/_channel");
const seventv = require("../functions/seventv");
let j = require("../variables/j");
const _returnplural = require("../functions/_returnplural");
const _regex = require("../functions/_regex");
const _pixelize = require("../functions/_pixelize");
const _returnerr = require("../functions/_returnerr");

module.exports = {
    name: "dcseventv",
    id: "global_commands_dcseventv",
    aliases: [],
    state: 1,
    add_version: "0.0.8",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    parameters: ["channel"],
    send_msg_nochan: true,
    cooldown: 15000,
    cooldown_user: 5000,
    arguments: [{ name: "option", required: true, options: ["add", "getuser"] }],
    exec: async (j_) => {
        let discord_serverid;
        await _channel(0, j_.message.channel.id, "discord_serverid")
            .then(dcsid => {
                discord_serverid = dcsid;
            })
            .catch(e => {
                j_.send(2, `Error: Could not get serverid: ${_returnerr(e)}`);
                return;
            })

        if (j_.message._.args().length >= 1) {
            switch (j_.message._.args()[0]) {
                case "add": {
                    if (j_.message._.args()[1]) {
                        let emotes = j_.message._.msg.substring(j_.message._.msg.split(" ")[0].length + 1 + j_.message._.args()[0].length + 1).split(" ");
                        seventv.addemotediscord(j_, j_.message.channel.id, emotes, discord_serverid)
                            .then(e => {
                                if (Object.keys(e.resolve).length === 0) {
                                    j_.send(2, `Error: Could not add ${emotes.length} emote${_returnplural(emotes)} to discord (${e.reject[Object.keys(e.reject)[0]].message || "-"})`);
                                } else {
                                    j_.send(2, `Successfully added [${Object.keys(e.resolve).length}] emote${_returnplural(e.resolve)} to discord ${Object.keys(e.resolve).join(", ")} ` +
                                        `${(Object.keys(e.reject).length > 0 ? `(Failed [${emotes.length}]: ${Object.keys(e.reject).join(", ")}) (${e.reject[Object.keys(e.reject)[0]].message || "-"})` : "")}`);
                                }
                            })
                            .catch(e => {
                                j_.send(2, `Could not add emote${_returnplural(emotes)} to discord: ${_returnerr(e)}`);
                            })
                    } else {
                        j_.send(2, `Error: No emotes to add given`);
                    }

                    break;
                }

                case "getuser": {
                    let getuser = j_.message.userstate.username;
                    if (j_.message._.args()[1] && _regex.usernamereg().test(j_.message._.args()[1])) getuser = j_.message._.args()[1];

                    seventv.getuserid(getuser)
                        .then(u => {
                            j_.send(`7TV-ID of ${(getuser == j_.message.userstate.username ? "yourself" : _pixelize(getuser))} (${u[1]}): ${u[2]}`);
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get userid: ${_returnerr(e)}`);
                        })

                    break;
                }

                default: {
                    j_.send(2, `Error: Option not found`);
                }
            }
        } else {
            j_.send(2, `Error: No emote to add given`);
        }
    }
}