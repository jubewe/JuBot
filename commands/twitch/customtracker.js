const customtracker = require("../../functions/twitch/customtracker");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "customtracker",
    id: "global_commands_customtracker",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    parameters: ["channel"],
    arguments: [{name:"option",required:true,options:["add","remove","delete","enable","disable"]},{name:"trackerchannel",required:true,options:["channel"]}],
    exec: async (j_) => {
        switch (j_.message._.command){
            case "tracker": {
                if(j_.message._.args()[0]){
                    switch (j_.message._.args()[0]){
                        case "add": {addtracker(1); break;}
                        case "remove":
                        case "delete": {removetracker(1); break;}
                        case "enable": {statetracker(1, 1); break;}
                        case "disable": {statetracker(1, 0); break;}
        
                        default: {
                            j_.send(`Error: Option not found`);
                        }
                    }
                } else {
                    j_.send(`Error: No option given`);
                }
                break;
            }
        }

        function addtracker(num){
            if(j_.message._.args()[num]){
                if(j.c().trackers.names.includes(j_.message._.args()[num])){
                    customtracker(1, j_, false, null, j_.message._.args()[num])
                    .then(t => {
                        j_.send(`Successfully added tracker ${j_.message._.args()[num]}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not add tracker ${j_.message._.args()[num]}: ${_returnerr(e,0)} ${_returnerr(e,1)}`)
                    })
                } else {
                    j_.send(`Error: Tracker not found`);
                }
            } else {
                j_.send(`Error: No tracker to add given`);
            }
        };

        function removetracker(num){
            if(j_.message._.args()[num]){
                if(j.c().trackers.names.includes(j_.message._.args()[num])){
                    customtracker(2, j_, false, null, j_.message._.args()[num])
                    .then(t => {
                        j_.send(`Successfully removed tracker ${j_.message._.args()[num]}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not remove tracker: ${j_.message._.args()[num]}: ${_returnerr(e,0)} ${_returnerr(e,1)}`)
                    })
                } else {
                    j_.send(`Error: Tracker not found`);
                }
            } else {
                j_.send(`Error: No tracker to add given`);
            }
        };

        const trackerstates = ["disabled", "enabled"];

        function statetracker(num, state){
            if(j_.message._.args()[num]){
                if(j.c().trackers.names.includes(j_.message._.args()[num])){
                    customtracker(3, j_, false, null, j_.message._.args()[num], state)
                    .then(t => {
                        j_.send(`Successfully set tracker state of ${j_.message._.args()[num]} to ${trackerstates[state]}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not set tracker state of ${j_.message._.args()[num]} to ${trackerstates[state]}: ${_returnerr(e,0)} ${_returnerr(e,1)}`)
                    })
                } else {
                    j_.send(`Error: Tracker not found`);
                }
            } else {
                j_.send(`Error: No tracker to add given`);
            }
        };
    }
};