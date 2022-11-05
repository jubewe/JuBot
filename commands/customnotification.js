const customnotification = require("../functions/customnotification");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "customnotification",
    id: "global_commands_customnotification",
    aliases: [],
    state: 1,
    add_version: "0.1.3",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 3000,
    cooldown_user: 1000,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.args()[0]){
            switch (j.message._.command){
                case "notification": {
                    switch (j.message._.args()[0]){
                        case "add": {addnotification(1); break;}
        
                        case "remove": 
                        case "delete": {deletenotification(1); break;}
                        
                        case "edit": {editnotification(1); break;}

                        case "enable": {statenotification(1, 1); break;}
                        case "disable": {statenotification(1, 0); break;}
        
                        default: {
                            j.send(2, j, `Error: Option not found`);
                        }
                    }
                }

                case "addnotification": {addnotification(0); break;}
                case "deletenotification":
                case "removenotification": {deletenotification(0); break;}
                case "editnotification": {editnotification(0); break;}
                case "enablenotification": {statenotification(0, 1); break;}
                case "disablenotification": {statenotification(0, 0); break;}
            }

            let states = ["disabled", "enabled"];
            async function addnotification(num){
                if(j.message._.args()[num]){
                    let notificationname = j.message._.args()[num];
                    let notificationmessage = j.message._.args().splice(num+1).join(" ");
                    
                    customnotification(1, j, false, j.message.channel.id, notificationname, notificationmessage, null, 1)
                    .then(n => {
                        j.send(2, j, `Successfully added notification`);
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not add notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j, `Error: No notificationname given`);
                }
            };
            async function editnotification(num){
                if(j.message._.args()[num]){
                    let notificationname = j.message._.args()[num];
                    let notificationmessage = j.message._.args().splice(num+1).join(" ");
                    
                    customnotification(3, j, false, j.message.channel.id, notificationname, notificationmessage, null, null)
                    .then(n => {
                        j.send(2, j, `Successfully added notification`);
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not add notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j, `Error: No notificationname given`);
                }
            };
            async function statenotification(num, state){
                if(j.message._.args()[num]){
                    let notificationname = j.message._.args()[num];
                    customnotification(4, j, false, j.message.channel.id, notificationname, null, null, state)
                    .then(n => {
                        j.send(2, j, `Successfully set notification state to ${state} (${states[state]})`);
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not set notification state to ${state} (${states[state]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j, `Error: No notificationname given`);
                }
            };
            async function deletenotification(num){
                if(j.message._.args()[num]){
                    let notificationname = j.message._.args()[num];
                    
                    customnotification(2, j, false, j.message.channel.id, notificationname)
                    .then(n => {
                        j.send(2, j, `Successfully deleted notification`);
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not delete notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                } else {
                    j.send(2, j, `Error: No notificationname given`);
                }
            };
        } else {
            j.send(2, j, `Error: No option given`)
        }
    }
}