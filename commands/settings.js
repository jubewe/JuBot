const _channel = require("../functions/twitch/_channel");
const _returnerr = require("../functions/_returnerr");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");

module.exports = {
    name: "settings",
    id: "global_commands_settings",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.broadcaster,
    parameters: ["channel"],
    cooldown: 1000,
    cooldown_user: 1000,
    exec: async (j_) => {
        if(!j_.message._.args()[0]){
            j_.send(`Error: No option given`);
            return;
        }

        let opt = j_.message._.args()[0];

        switch (opt){
            case "prefix": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No prefix to set given`);
                    return;
                }

                let prefix = j_.message._.args()[1];

                if(["reset"].includes(prefix)){
                    _channel(2, j_.message.channel.id, "prefix")
                    .then(p => {
                        j_.send(`Successfully resetted (channel-) prefix to ${j.c().prefix}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not reset prefix: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    _channel(1, j_.message.channel.id, "prefix", prefix)
                    .then(p => {
                        j_.send(`Successfully set (channel-) prefix to ${prefix}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not set prefix: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                }

                break;
            }

            case "allowed_commands": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No option given`);
                    return;
                }
                
                if(!j_.message._.args()[2]){
                    j_.send(`Error: No commandname given`);
                    return;
                }

                let opt2 = j_.message._.args()[1];
                let cmdname = j_.message._.args()[2];

                switch (opt2) {
                    case "add": {
                        _channel(0, j_.message.channel.id, "allowed_commands", undefined, true)
                        .then(a => {
                            let b = a;
                            if(!b){b = [];};
                            if(b.includes(cmdname)){
                                j_.send(`Error: Command already in allowed commands`);
                                return;
                            }
                            b.push(cmdname);
                            _channel(1, j_.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j_.send(`Successfully added ${cmdname} to allowed commands`);
                            })
                            .catch(e => {
                                j_.send(`Error: Could not add ${cmdname} to allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j_.send(`Error: Could not add ${cmdname} to allowed commands: Could not get allowed commands of channel (${e})`);
                        })
                        break;
                    }

                    case "delete":
                    case "remove": {
                        _channel(0, j_.message.channel.id, "allowed_commands", undefined, true)
                        .then(a => {
                            let b = a;
                            if(!Array.isArray(a) || !a.includes(cmdname)){
                                j_.send(`Error: command not found in allowed commands`);
                                return;
                            };
                            b.splice(b.indexOf(cmdname), 1);
                            _channel(1, j_.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j_.send(`Successfully removed ${cmdname} from allowed commands`);
                            })
                            .catch(e => {
                                j_.send(`Error: Could not remove ${cmdname} from allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j_.send(`Error: Could not remove ${cmdname} from allowed commands: Could not get allowed commands of channel (${e})`);
                        })
                        break;
                    }

                    case "get": {

                        break;
                    }
                }

                break;
            }

            case "valoranttag": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No tag given`);
                    return;
                };

                let tag = _splitafter(j_.message._.msg, 2).toLowerCase();

                if(!tag.includes("#")){
                    j_.send(`Error: Invalid format - expected: <riotid>#<tagline>`);
                    return;
                } 

                _channel(1, j_.message.channel.id, "valoranttag", encodeURI(tag))
                .then(t => {
                    j_.send(`Successfully set valoranttag to ${tag}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set valoranttag to ${tag} (${e})`);
                })

                break;
            }
            
            case "discord": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No id given`);
                    break;
                };

                let discord_serverid = j_.message._.args()[1];
                // console.log(discord_serverid)

                if(!isNaN(discord_serverid)){
                    j.dc.client.guilds.fetch(discord_serverid)
                    .then(() => {
                        _channel(1, j_.message.channel.id, "discord_serverid", discord_serverid)
                        .then(t => {
                            j_.send(`Successfully set discord serverid to ${discord_serverid}`);
                        })
                        .catch(e => {
                            j_.send(`Error: Could not set discord serverid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    })
                    .catch(e => {
                        console.error(e);
                        j_.send(`Error: Could not fetch guild - check the given id and try again`);
                    })
                } else {
                    j_.send(`Error: Given ID id not a number (Expected: Server-ID)`);
                }
                break;
            }

            case "discord_clipchannel": 
            case "clipchannel": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No ID given`);
                    break;
                }

                let discord_clipchannelid = j_.message._.args()[1];

                if(!j.functions()._regex.numregex().test(discord_clipchannelid)){
                    j_.send(`Error: Channel does not match ChannelID-Regex`);
                    return;
                }

                _channel(1, j_.message.channel.id, "discord_clipchannelid", discord_clipchannelid)
                .then(t => {
                    j_.send(`Successfully set discord clipchannelid to ${discord_clipchannelid}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set discord clipchannelid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })

                break;
            }

            case "youtube_channel":
            case "youtubechannel": {
                if(!j_.message._.args()[1]){
                    j_.send(`Error: No ChannelID given`);
                    break;
                }

                let youtube_channelid = j_.message._.args()[1];

                if(!j.functions()._regex.yt_channelreg().test(youtube_channelid)){
                    j_.send(`Error: Channel does not match ChannelID-Regex`);
                    return;
                }

                _channel(1, j_.message.channel.id, "youtube_channelid", youtube_channelid)
                .then(t => {
                    j_.send(`Successfully set youtube channelid to ${youtube_channelid}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set youtube channelid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })

                break;
            }

            case "send_clips_to_discord":
            case "sendclipstodiscord": {
                let send_clips_to_discord;

                if(j_.message._.args()[1]){
                    if(["true", "enable", "enabled", "1", "on"].includes(j_.message._.args()[1])){
                        send_clips_to_discord = true;
                    } else if(["false", "disable", "disabled", "0", "off"].includes(j_.message._.args()[1])){
                        send_clips_to_discord = false;
                    }
                }

                _channel(1, j_.message.channel.id, "send_clips_to_discord", send_clips_to_discord)
                .then(t => {
                    j_.send(`Successfully set send_clips_to_discord to ${send_clips_to_discord}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set send_clips_to_discord: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })
                break;
            }

            case "get": {
                if(!j_.message._.args()[1]) return j_.send(`Error: No setting to get given`);

                _channel(0, j_.message.channel.id, j_.message._.args()[1])
                .then(sett => {
                    j_.send(`Setting ${j_.message._.args()[1]}: ${sett}`);
                })
                .catch(e => {
                    j_.send(`Error: Could not get setting ${j_.message._.args()[1]}: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })
                break;
            }

            default: {
                j_.send(`Error: Setting ${opt} not found`);
                break;
            }
        }
    }
}