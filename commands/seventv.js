const _channel = require("../functions/_channel");
const seventv = require("../functions/seventv");
let j = require("../variables/j");
const _returnplural = require("../functions/_returnplural");

module.exports = {
    name: "seventv",
    id: "global_commands_seventv",
    aliases: [],
    state: 1,
    add_version: "0.0.8",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 15000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");
        
        let discord_serverid;
        await _channel(0, j.message.channel.id, "discord_serverid")
        .then(dcsid => {
            discord_serverid = dcsid;
        })
        .catch(e => {
            j.send(2, j, `Error: No serverid set`);
            return;
        })

        if(j.message._.args().length >= 1){
            switch (j.message._.args()[0]){
                case "add": {
                    if(j.message._.args()[1]){
                        let emotes = j.message._.msg.substring(j.message._.msg.split(" ")[0].length+1+j.message._.args()[0].length+1).split(" ");
                        seventv(1, j, false, j.message.channel.id, discord_serverid, emotes)
                        .then(e => {
                            // console.log(e)
                            if(Object.keys(e.resolve).length === 0){
                                j.send(2, j, `Error: Could not add ${emotes.length} emote${_returnplural(emotes)} to discord (${e.reject[Object.keys(e.reject)[0]].message})`);
                            } else {
                                j.send(2, j, `Successfully added [${Object.keys(e.resolve).length}] emote${_returnplural(e.resolve)} to discord ${Object.keys(e.resolve).join(", ")} `+
                                `${(Object.keys(e.reject).length > 0 ? `(Failed [${emotes.length}]: ${Object.keys(e.reject).join(", ")}) (${e.reject[Object.keys(e.reject)[0]].message})` : "")}`);
                            }
                        })
                        .catch(e => {
                            console.error(e);
                            j.send(2, j, `Could not add emote${_returnplural(emotes)} to discord`);
                        })
                    } else {
                        j.send(2, j, `Error: No emotes to add given`);
                    }
                    
                    break;
                }

                // case "remove": {


                //     break;
                // }

                default: {
                    j.send(2, j, `Error: Option not found`);
                }
            }
        } else {
            j.send(2, j, `Error: No emote to add given`);
        }
    }
}