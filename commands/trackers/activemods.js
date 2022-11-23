const getuser = require("../../functions/getuser");
const _cache = require("../../functions/_cache");
const _checkmultiplevaliinobj = require("../../functions/_checkmultiplevalinobj");
const _cleantime = require("../../functions/_cleantime");
const _pixelize = require("../../functions/_pixelize");
const _regex = require("../../functions/_regex");
let j = require("../../variables/j");
const varnames = require("../../variables/varnames");

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
        if(!j.files().channels.channels[j_.message.channel.id]) return j_.send(2, j_, `Error: Channel was not found in the database`);
        if(!_checkmultiplevaliinobj(j.files().channels.channels[j_.message.channel.id], ["trackers", "data", "activemods", "users"])) return j_.send(2, j_, `Error: No tracker data found`);

        if(j_.message._.args()[0]){
            switch (j_.message._.args()[0]){
                case "get": {
                    let activemoduser = j_.message.userstate.username;
                    if(j_.message._.args()[1] && _regex.usernamereg().test(j_.message._.args()[1])) activemoduser = j_.message._.args()[1];

                    getactivemod(activemoduser);
                    break;
                }

                default: {
                    getactivemods();
                }
            }
        } else {
            getactivemods();
        }
            
        async function getactivemods(){
            let num = 3;
            if(j_.message._.args()[0] && _regex.numregex().test(j_.message._.args()[0]) || ["all"].includes(j_.message._.args()[0])) num = j_.message._.args()[0];

            let sortedactivemods = Object.keys(j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users).sort((a, b) => {
                return (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[b].active_time) - (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time)
            });

            let knownbots = [];
            await _cache(0, varnames.cache.twitch.knownbots)
            .then(c => {
                knownbots = c.data.map(a => {return a.id})
            }).catch(e => {console.error(e);})
            sortedactivemods = sortedactivemods.filter(a => {
                return (new RegExp(`(\-)*nobot`, "i").test(j_.message._.msg) && !knownbots.includes(a) || !new RegExp(`(\-)*nobot`, "i").test(j_.message._.msg))
            });

            let sortedactivemods_ = {"times":{},"users":[],"users2":[]};
            await Promise.all(sortedactivemods.map(a => {
                return new Promise((resolve, reject) => {
                    let atimeclean = _cleantime((j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time), 5);
                    getuser(1, a)
                    .then(u => {
                        if(!sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time]) sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time] = {};
                        let activeobj = {
                            "username": u[0],
                            "id": u[1],
                            "time": j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time,
                            "timeclean": atimeclean
                        };
                        sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time][u[1]] = activeobj;
                        sortedactivemods_.users.push(activeobj);
                        // sortedactivemods_.users[a] = activeobj;
                        return resolve([u[0], u[1], atimeclean]);
                    })
                    .catch(e => {return reject(e);})
                })
            }));
            sortedactivemods_.users2 = sortedactivemods_.users.map(a => {return a.id});

            let sortedactivelast;
            let sortedactivemods_messages = []; 
            sortedactivemods_.users.slice(0, (isNaN(num) ? sortedactivemods_.users.length : num)).map(a => {
                if(!sortedactivelast || sortedactivelast.time !== a.time){
                    if(sortedactivelast){
                        sortedactivemods_messages.push(` (${sortedactivelast.timeclean.time.join(" and ")}); `)
                    }
                    sortedactivemods_messages.push(` #${Object.keys(sortedactivemods_.times).length-Object.keys(sortedactivemods_.times).indexOf(a.time.toString())}: ${_pixelize(a.username)}`);
                } else {
                    sortedactivemods_messages.push(`, ${_pixelize(a.username)}`);
                }
                sortedactivelast = a;
            });
            sortedactivemods_messages.push(` (${sortedactivelast.timeclean.time.join(" and ")})`);

            j_.send(2, j_, `Top ${num} activemods: ${sortedactivemods_messages.join("")}`);
        };

        async function getactivemod(activemoduser){
            getuser(1, activemoduser)
            .then(async u => {
                let sortedactivemods = Object.keys(j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users).sort((a, b) => {
                    return (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[b].active_time) - (j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time)
                });
    
                let knownbots = [];
                await _cache(0, varnames.cache.twitch.knownbots)
                .then(c => {
                    knownbots = c.data.map(a => {return a.id})
                }).catch(e => {console.error(e);})
                sortedactivemods = sortedactivemods.filter(a => {
                    return (_regex.nobotreg().test(j_.message._.msg) && !knownbots.includes(a) || !_regex.nobotreg().test(j_.message._.msg))
                });

                let sortedactivemods_ = {"times":{},"users":[],"users2":[]};
                await Promise.all(sortedactivemods.map(a => {
                    let atimeclean = _cleantime((j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time), 5);
                    if(!sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time]) sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time] = {};
                    let activeobj = {
                        "username": "<none>",
                        "id": a,
                        "time": j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time,
                        "timeclean": atimeclean
                    };
                    sortedactivemods_.times[j.files().channels.channels[j_.message.channel.id].trackers.data.activemods.users[a].active_time][u[1]] = activeobj;
                    sortedactivemods_.users.push(activeobj);
                }));
                sortedactivemods_.users2 = sortedactivemods_.users.map(a => {return a.id});

                if(sortedactivemods_.users2.indexOf(u[1]) == -1){
                    return j_.send(2, j_, `Error: ${_pixelize(u[0])} was not found in activemods`);
                } else {
                    j_.send(2, j_, `${_pixelize(u[0])}'s rank: #${sortedactivemods_.users2.indexOf(u[1])} (${sortedactivemods_.users[sortedactivemods_.users2.indexOf(u[1])].timeclean.time.join(" and ")})`);
                }

            })
            .catch(e => {
                console.error(e);
                j_.send(2, j_, `Error: Could not get userid of ${activemoduser}`);
            })
        };
    }
}