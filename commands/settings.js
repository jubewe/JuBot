const _channel = require("../functions/_channel");
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
    cooldown: 1000,
    cooldown_user: 1000,
    exec: async (j_) => {
        if(!j_.message._.args()[0]){
            j.send(2, j_, `Error: No option given`);
            return;
        }

        let opt = j_.message._.args()[0];

        switch (opt){
            case "prefix": {
                if(!j_.message._.args()[1]){
                    j.send(2, j_, `Error: No prefix to set given`);
                    return;
                }

                let prefix = j_.message._.args()[1];

                if(["reset"].includes(prefix)){
                    _channel(2, j_.message.channel.id, "prefix")
                    .then(p => {
                        j.send(2, j_, `Successfully resetted (channel-) prefix to ${j.c().prefix}`);
                    })
                    .catch(e => {
                        j.send(2, j_, `Error: Could not reset prefix: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    _channel(1, j_.message.channel.id, "prefix", prefix)
                    .then(p => {
                        j.send(2, j_, `Successfully set (channel-) prefix to ${prefix}`);
                    })
                    .catch(e => {
                        j.send(2, j_, `Error: Could not set prefix: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                }

                break;
            }

            case "allowed_commands": {
                if(!j_.message._.args()[1]){
                    j.send(2, j_, `Error: No option given`);
                    return;
                }
                
                if(!j_.message._.args()[2]){
                    j.send(2, j_, `Error: No commandname given`);
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
                                j.send(2, j_, `Error: Command already in allowed commands`);
                                return;
                            }
                            b.push(cmdname);
                            _channel(1, j_.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j.send(2, j_, `Successfully added ${cmdname} to allowed commands`);
                            })
                            .catch(e => {
                                j.send(2, j_, `Error: Could not add ${cmdname} to allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j.send(2, j_, `Error: Could not add ${cmdname} to allowed commands: Could not get allowed commands of channel (${e})`);
                        })
                        break;
                    }

                    case "delete":
                    case "remove": {
                        _channel(0, j_.message.channel.id, "allowed_commands", undefined, true)
                        .then(a => {
                            let b = a;
                            if(!Array.isArray(a) || !a.includes(cmdname)){
                                j.send(2, j_, `Error: command not found in allowed commands`);
                                return;
                            };
                            b.splice(b.indexOf(cmdname), 1);
                            _channel(1, j_.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j.send(2, j_, `Successfully removed ${cmdname} from allowed commands`);
                            })
                            .catch(e => {
                                j.send(2, j_, `Error: Could not remove ${cmdname} from allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j.send(2, j_, `Error: Could not remove ${cmdname} from allowed commands: Could not get allowed commands of channel (${e})`);
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
                    j.send(2, j_, `Error: No tag given`);
                    return;
                }

                let tag = _splitafter(j_.message._.msg, 2).toLowerCase();
                console.log(tag)

                if(!tag.includes("#")){
                    j.send(2, j_, `Error: Invalid format - expected: <riotid>#<tagline>`);
                    return;
                } 

                _channel(1, j_.message.channel.id, "valoranttag", encodeURI(tag))
                .then(t => {
                    j.send(2, j_, `Successfully set valoranttag to ${tag}`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not set valoranttag to ${tag} (${e})`);
                })

                break;
            }
            
            case "discord": {
                if(!j_.message._.args()[1]){
                    j.send(2, j_, `Error: No id given`);
                    break;
                };

                let discord_serverid = j_.message._.args()[1];
                // console.log(discord_serverid)

                if(!isNaN(discord_serverid)){
                    j.dc.client.guilds.fetch(discord_serverid)
                    .then(() => {
                        _channel(1, j_.message.channel.id, "discord_serverid", discord_serverid)
                        .then(t => {
                            j.send(2, j_, `Successfully set discord serverid to ${discord_serverid}`);
                        })
                        .catch(e => {
                            j.send(2, j_, `Error: Could not set discord serverid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    })
                    .catch(e => {
                        console.error(e);
                        j.send(2, j_, `Error: Could not fetch guild - check the given id and try again`);
                    })
                } else {
                    j.send(2, j_, `Error: Given ID id not a number (Expected: Server-ID)`);
                }
                break;
            }

            case "discord_clipchannel": 
            case "clipchannel": {
                if(!j_.message._.args()[1]){
                    j.send(2, j_, `Error: No ID given`);
                    break;
                }

                let discord_clipchannelid = j_.message._.args()[1];

                if(!j.functions()._regex.numregex().test(discord_clipchannelid)){
                    j.send(2, j_, `Error: Channel does not match ChannelID-Regex`);
                    return;
                }

                _channel(1, j_.message.channel.id, "discord_clipchannelid", discord_clipchannelid)
                .then(t => {
                    j.send(2, j_, `Successfully set discord clipchannelid to ${discord_clipchannelid}`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not set discord clipchannelid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })

                break;
            }

            case "youtube_channel":
            case "youtubechannel": {
                if(!j_.message._.args()[1]){
                    j.send(2, j_, `Error: No ChannelID given`);
                    break;
                }

                let youtube_channelid = j_.message._.args()[1];

                if(!j.functions()._regex.yt_channelreg().test(youtube_channelid)){
                    j.send(2, j_, `Error: Channel does not match ChannelID-Regex`);
                    return;
                }

                _channel(1, j_.message.channel.id, "youtube_channelid", youtube_channelid)
                .then(t => {
                    j.send(2, j_, `Successfully set youtube channelid to ${youtube_channelid}`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not set youtube channelid: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })

                break;
            }

            case "get": {
                if(!j_.message._.args()[1]) return j.send(2, j_, `Error: No setting to get given`);

                _channel(0, j_.message.channel.id, j_.message._.args()[1])
                .then(sett => {
                    j.send(2, j_, `Setting ${j_.message._.args()[1]}: ${sett}`);
                })
                .catch(e => {
                    j.send(2, j_, `Error: Could not get setting ${j_.message._.args()[1]}: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                })
                break;
            }

            default: {
                j.send(2, j_, `Error: Setting ${opt} not found`);
                break;
            }
        }
    }
}