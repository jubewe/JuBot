const getuser = require("../../functions/getuser");
const _checkmultiplevaliinobj = require("../../functions/_checkmultiplevalinobj");
const _cleantime = require("../../functions/_cleantime");
const _regex = require("../../functions/_regex");
let j = require("../../variables/j");

module.exports = {
    name: "trackers_activemods",
    id: "global_commands_trackers_activemods",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(!j.files().channels.channels[j_.message.channel.id]) return j.send(2, j_, `Error: Channel was not found in the database`);
        if(!_checkmultiplevaliinobj(j.files().channels.channels[j_.message.channel.id], ["trackers", "data", "activemods", "users"])) return j.send(2, j_, `Error: No tracker data found`);
            
        let num = 3;
        if(j_.message._.args()[0] && _regex.numregex().test(j_.message._.args()[0])) num = j_.message._.args()[0];

        let sortedactivemods = Object.keys(j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users).sort((a, b) => {
            return (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[b].active_time) - (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time)
        });

        console.log(sortedactivemods)

        let activemodsmessages = {};
        
        let sortedactivemods_ = [];
        for(let a in sortedactivemods){
            let atimeclean = _cleantime((j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time), 4);
            getuser(1, a)
            .then(() => {
                sortedactivemods_.push([a, this[0], atimeclean, atimeclean.time]);
            })
            .catch()
        }

        console.log(sortedactivemods_);

        console.log(activemodsmessages);

        // j.send(2, j_, `Pag`);
    }
}