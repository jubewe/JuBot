const { _channel } = require("../functions/_");
let j = require("../variables/j");

module.exports = {
    name: "settings",
    id: "global_commands_settings",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.broadcaster,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        const j = require("../variables/j");

        if(!j.message._.args()[0]){
            j.send(2, j, `Error: No option given`);
            return;
        }

        let opt = j.message._.args()[0];

        switch (opt){
            case "prefix": {
                if(!j.message._.args()[1]){
                    j.send(2, j, `Error: No prefix to set given`);
                    return;
                }

                let prefix = j.message._.args()[1];

                if(["reset"].includes(prefix)){
                    _channel(2, j.message.channel.id, "prefix")
                    .then(p => {
                        console.log(p);
                        j.send(2, j, `Successfully resetted (channel-) prefix to ${j.c().prefix}`);
                    })
                    .catch(e => {
                        console.log(e);
                        j.send(2, j, `Error: Could not reset prefix (${e})`);
                    })
                } else {
                    _channel(1, j.message.channel.id, "prefix", prefix)
                    .then(p => {
                        console.log(p);
                        j.send(2, j, `Successfully set (channel-) prefix to ${prefix}`);
                    })
                    .catch(e => {
                        console.log(e);
                        j.send(2, j, `Error: Could not set prefix (${e})`);
                    })
                }

                break;
            }

            case "allowed_commands": {
                if(!j.message._.args()[1]){
                    j.send(2, j, `Error: No option given`);
                    return;
                }
                
                if(!j.message._.args()[2]){
                    j.send(2, j, `Error: No commandname given`);
                    return;
                }

                let opt2 = j.message._.args()[1];
                let cmdname = j.message._.args()[2];

                switch (opt2) {
                    case "add": {
                        _channel(0, j.message.channel.id, "allowed_commands", undefined, true)
                        .then(a => {
                            let b = a;
                            if(!b){b = [];};
                            if(b.includes(cmdname)){
                                j.send(2, j, `Error: Command already in allowed commands`);
                                return;
                            }
                            b.push(cmdname);
                            _channel(1, j.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j.send(2, j, `Successfully added ${cmdname} to allowed commands`);
                            })
                            .catch(e => {
                                j.send(2, j, `Error: Could not add ${cmdname} to allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j.send(2, j, `Error: Could not add ${cmdname} to allowed commands: Could not get allowed commands of channel (${e})`);
                        })
                        break;
                    }

                    case "delete":
                    case "remove": {
                        _channel(0, j.message.channel.id, "allowed_commands", undefined, true)
                        .then(a => {
                            let b = a;
                            if(!Array.isArray(a) || !a.includes(cmdname)){
                                j.send(2, j, `Error: command not found in allowed commands`);
                                return;
                            };
                            b.splice(b.indexOf(cmdname), 1);
                            _channel(1, j.message.channel.id, "allowed_commands", b)
                            .then(() => {
                                j.send(2, j, `Successfully removed ${cmdname} from allowed commands`);
                            })
                            .catch(e => {
                                j.send(2, j, `Error: Could not remove ${cmdname} from allowed commands (${e})`);
                            })
                        })
                        .catch(e => {
                            j.send(2, j, `Error: Could not remove ${cmdname} from allowed commands: Could not get allowed commands of channel (${e})`);
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
                if(!j.message._.args()[1]){
                    j.send(2, j, `Error: No tag given`);
                    return;
                }

                let tag = j.message._.args()[1];

                if(!tag.includes("#")){
                    j.send(2, j, `Error: Invalid format - expected: <riotid>#<tagline>`);
                    return;
                } 

                _channel(1, j.message.channel.id, "valoranttag", tag)
                .then(t => {
                    j.send(2, j, `Successfully set valoranttag to ${tag}`);
                })
                .catch(e => {
                    j.send(2, j, `Error: Could not set valoranttag to ${tag} (${e})`);
                })

                break;
            }

            default: {
                j.send(2, j, `Error: Setting ${opt} not found`);
                break;
            }
        }
    }
}