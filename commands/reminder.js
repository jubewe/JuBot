const getuser = require("../functions/twitch/getuser");
const remind = require("../functions/twitch/remind");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "reminder",
    id: "global_commands_reminder",
    aliases: [],
    state: 1,
    add_version: "0.1.2",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: 10000,
    cooldown_user: 5000,
    exec: async (j_) => {
        switch (j_.message._.command){
            case "remind":{
                if(j_.message._.args()[0]){
                    let remind_user = j_.message._.args()[0];
                    if(remind_user === "me"){
                        remind_user = j_.message.userstate.username;
                    }
                    if(j_.message._.args()[1]){
                        let remind_message = j_.message._.msg.substring(j_.message._.prefix.length + j_.message._.command.length +1 + j_.message._.args()[0].length +1);
                        getuser(1, remind_user)
                        .then(u => {
                            remind(1, j_, false, j_.message.userstate.id, u[1], null, remind_message)
                            .then(r => {
                                j_.send(`Successfully set reminder`);
                            })
                            .catch(e => {
                                console.error(e);
                                j_.send(`Error: Could not set reminder ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                            })
                        })
                        .catch(e => {
                            j_.send(`Error: Could not get userid of given user`);
                        })
                    } else {
                        j_.send(`Error: No message given`);
                    }
                } else {
                    j_.send(`Error: No user given`);
                }
                break;
            }

            case "remindme": {
                let remind_user = j_.message.userstate.username;
                if(j_.message._.args()[0]){
                    let remind_message = j_.message._.msg.substring(j_.message._.prefix.length + j_.message._.command.length +1);
                    getuser(1, remind_user)
                    .then(u => {
                        remind(1, j_, false, j_.message.userstate.id, u[1], null, remind_message)
                        .then(r => {
                            j_.send(`Successfully set reminder`);
                        })
                        .catch(e => {
                            console.error(e);
                            j_.send(`Error: Could not set reminder ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    })
                    .catch(e => {
                        j_.send(`Error: Could not get userid of given user`);
                    })
                } else {
                    j_.send(`Error: No message given`);
                }
            }
        }
    }
}