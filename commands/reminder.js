const getuser = require("../functions/getuser");
const remind = require("../functions/remind");
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
    exec: async () => {
        j = require("../variables/j");

        switch (j.message._.command){
            case "remind":{
                if(j.message._.args()[0]){
                    let remind_user = j.message._.args()[0];
                    if(remind_user === "me"){
                        remind_user = j.message.userstate.username;
                    }
                    if(j.message._.args()[1]){
                        let remind_message = j.message._.msg.substring(j.message._.prefix.length + j.message._.command.length +1 + j.message._.args()[0].length +1);
                        getuser(1, remind_user)
                        .then(u => {
                            remind(1, j, false, j.message.userstate.id, u[1], null, remind_message)
                            .then(r => {
                                j.send(2, j, `Successfully set reminder`);
                            })
                            .catch(e => {
                                console.error(e);
                                j.send(2, j, `Error: Could not set reminder ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                            })
                        })
                        .catch(e => {
                            j.send(2, j, `Error: Could not get userid of given user`);
                        })
                    } else {
                        j.send(2, j, `Error: No message given`);
                    }
                } else {
                    j.send(2, j, `Error: No user given`);
                }
                break;
            }

            case "remindme": {
                let remind_user = j.message.userstate.username;
                if(j.message._.args()[0]){
                    let remind_message = j.message._.msg.substring(j.message._.prefix.length + j.message._.command.length +1);
                    getuser(1, remind_user)
                    .then(u => {
                        remind(1, j, false, j.message.userstate.id, u[1], null, remind_message)
                        .then(r => {
                            j.send(2, j, `Successfully set reminder`);
                        })
                        .catch(e => {
                            console.error(e);
                            j.send(2, j, `Error: Could not set reminder ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                        })
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not get userid of given user`);
                    })
                } else {
                    j.send(2, j, `Error: No message given`);
                }
            }
        }
    }
}