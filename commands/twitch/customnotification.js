const customnotification = require("../../functions/twitch/customnotification");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "customnotification",
    id: "global_commands_customnotification",
    aliases: [],
    state: 1,
    add_version: "0.1.3",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    parameters: ["channel"],
    cooldown: 3000,
    cooldown_user: 1000,
    exec: async (j_) => {
        let states = ["disabled", "enabled"];

        if(!["notifications"].includes(j_.message._.command) && !j_.message._.args()[0]) return j_.send(`Error: No option given`);
        
        switch (j_.message._.command){
            case "notification": {
                switch (j_.message._.args()[0]){
                    case "add": {addnotification(1); break;}
    
                    case "remove": 
                    case "delete": {deletenotification(1); break;}
                    
                    case "edit": {editnotification(1); break;}

                    case "enable": {statenotification(1, 1); break;}
                    case "disable": {statenotification(1, 0); break;}
    
                    default: {
                        j_.send(`Error: Option not found`);
                    }
                }
                break;
            }

            case "notifications": {getnotifications(); break;}

            case "addnotification": {addnotification(0); break;}
            case "deletenotification":
            case "removenotification": {deletenotification(0); break;}
            case "editnotification": {editnotification(0); break;}
            case "enablenotification": {statenotification(0, 1); break;}
            case "disablenotification": {statenotification(0, 0); break;}
        };
        
        async function addnotification(num){
            if(j_.message._.args()[num]){
                let notificationname = j_.message._.args()[num];
                let notificationmessage = j_.message._.args().splice(num+1).join(" ");
                
                customnotification(1, j_, false, j_.message.channel.id, notificationname, notificationmessage, null, 1)
                .then(n => {
                    j_.send(`Successfully added notification`);
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not add notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No notificationname given`);
            }
        };

        async function editnotification(num){
            if(j_.message._.args()[num]){
                let notificationname = j_.message._.args()[num];
                let notificationmessage = j_.message._.args().splice(num+1).join(" ");
                
                customnotification(3, j_, false, j_.message.channel.id, notificationname, notificationmessage, null, null)
                .then(n => {
                    j_.send(`Successfully edited notification`);
                })
                .catch(e => {
                    j_.send(`Error: Could not edit notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No notificationname given`);
            }
        };

        async function statenotification(num, state){
            if(j_.message._.args()[num]){
                let notificationname = j_.message._.args()[num];
                customnotification(4, j_, false, j_.message.channel.id, notificationname, null, null, state)
                .then(n => {
                    j_.send(`Successfully set notification state to ${state} (${states[state]})`);
                })
                .catch(e => {
                    j_.send(`Error: Could not set notification state to ${state} (${states[state]}): ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No notificationname given`);
            }
        };

        async function deletenotification(num){
            if(j_.message._.args()[num]){
                let notificationname = j_.message._.args()[num];
                
                customnotification(2, j_, false, j_.message.channel.id, notificationname)
                .then(n => {
                    j_.send(`Successfully deleted notification`);
                })
                .catch(e => {
                    j_.send(`Error: Could not delete notification: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: No notificationname given`);
            }
        };

        async function getnotifications(){
            customnotification(0, j_, false, j_.message.channel.id)
            .then(n => {
                j_.send(`Notifications in this channel: ${Object.keys(n)}`);
            })
            .catch(e => {
                j_.send(`Error: Could not get notifications: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
            })
        };
    }
}