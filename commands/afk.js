const _afk = require("../functions/_afk");
let j = require("../variables/j");

module.exports = {
    name: "afk",
    id: "global_commands_afk",
    aliases: [],
    state: 1,
    add_version: "0.0.9",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 5000,
    cooldown_user: 15000,
    exec: async () => {
        j = require("../variables/j");

        if(["afk", "gn"].includes(j.message._.command)){
            let afkmessage = "No message";
            if(j.message._.args()[0]){
                afkmessage = j.message._.args().join(" ");
            };
    
            _afk(1, j.message.userstate.id, afkmessage, j.message._.command, true, j.message._.userperm)
            .then(a => {
                j.send(0, j, `${j.message._.usertag} is now ${getafkopt(a.opt)}: ${afkmessage}`);
            })
            .catch(e => {
                console.error(e);
                j.send(2, j, `Error: Could not set AFK Status Sadge`);
            });
        } else if(["cafk", "rafk"].includes(j.message._.command)){
            _afk(3, j.message.userstate.id, null, null, true)
            .then(a => {
                if([0, 1].includes(a.type)){
                    j.send(0, j, `${j.message._.usertag} Your old AFK status has been resumed: ${a.message}`);
                } else if([2].includes(a.type)){
                    j.send(0, j, `${j.message._.usertag} Your old AFK status has been reused: ${a.message}`);
                }
            })
        } 

        function getafkopt(aopt){
            let afkopts = {
                "gn": "sleeping",
                "afk": "AFK"
            }
            return afkopts[aopt] || "AFK";
        };
    }
}